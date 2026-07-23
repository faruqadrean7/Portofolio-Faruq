import { createClient } from "@/lib/supabase/server";

export default async function AdminOverview() {
  const supabase = await createClient();

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [{ count: projectCount }, { count: unreadCount }, { count: visitCount }] =
    await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase
        .from("messages")
        .select("*", { count: "exact", head: true })
        .eq("read", false),
      supabase
        .from("visits")
        .select("*", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgo),
    ]);

  const cards = [
    { label: "Total projects", value: projectCount ?? 0 },
    { label: "Pesan belum dibaca", value: unreadCount ?? 0 },
    { label: "Kunjungan 7 hari", value: visitCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">Ringkasan aktivitas portfolio.</p>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-line bg-surface p-6">
            <div className="text-sm text-muted">{c.label}</div>
            <div className="mt-2 font-serif text-4xl">{c.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
