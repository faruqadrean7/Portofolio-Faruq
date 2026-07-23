import { NextResponse, type NextRequest } from "next/server";
import { ContactFormSchema } from "@/lib/schemas";
import { createAdminClient } from "@/lib/supabase/admin";

// In-memory rate limit (best-effort; resets on cold start).
const hits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimit(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Terlalu banyak permintaan. Coba lagi sebentar." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid" }, { status: 400 });
  }

  const parsed = ContactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validasi gagal" },
      { status: 400 },
    );
  }

  // Honeypot — bots fill this; humans don't.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("messages").insert({
    name: parsed.data.name,
    email: parsed.data.email,
    subject: parsed.data.subject || null,
    body: parsed.data.body,
  });

  if (error) {
    console.error("[contact] insert failed:", error);
    return NextResponse.json({ error: "Gagal menyimpan pesan" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
