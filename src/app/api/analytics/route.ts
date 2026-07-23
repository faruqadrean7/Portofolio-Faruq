import { NextResponse, type NextRequest } from "next/server";
import { AnalyticsSchema } from "@/lib/schemas";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Body tidak valid" }, { status: 400 });
  }

  const parsed = AnalyticsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validasi gagal" }, { status: 400 });
  }

  // Skip noise: bot user agents and prefetch requests.
  const userAgent = req.headers.get("user-agent") ?? "";
  if (/bot|crawler|spider|preview/i.test(userAgent)) {
    return NextResponse.json({ ok: true });
  }

  const country =
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    null;

  const supabase = createAdminClient();
  await supabase.from("visits").insert({
    path: parsed.data.path,
    referrer: parsed.data.referrer || null,
    user_agent: userAgent.slice(0, 500),
    country,
  });

  return NextResponse.json({ ok: true });
}
