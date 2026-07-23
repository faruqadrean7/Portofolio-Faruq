import { createClient } from "@/lib/supabase/server";
import type { VisitRow } from "@/types/database";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const { data } = await supabase
    .from("visits")
    .select("*")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(2000);

  const visits = (data as VisitRow[] | null) ?? [];

  // Aggregate per day
  const perDay = new Map<string, number>();
  for (const v of visits) {
    const day = v.created_at.slice(0, 10);
    perDay.set(day, (perDay.get(day) ?? 0) + 1);
  }
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (29 - i));
    return d.toISOString().slice(0, 10);
  });
  const counts = days.map((d) => perDay.get(d) ?? 0);
  const max = Math.max(1, ...counts);

  // Aggregate by referrer & path
  const byReferrer = new Map<string, number>();
  const byPath = new Map<string, number>();
  for (const v of visits) {
    const ref = v.referrer ? new URL(v.referrer || "http://x").hostname || "direct" : "direct";
    byReferrer.set(ref, (byReferrer.get(ref) ?? 0) + 1);
    byPath.set(v.path, (byPath.get(v.path) ?? 0) + 1);
  }
  const topReferrers = [...byReferrer.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);
  const topPaths = [...byPath.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8);

  return (
    <div>
      <h1 className="font-serif text-3xl">Analytics</h1>
      <p className="mt-2 text-sm text-muted">
        Kunjungan 30 hari terakhir · total {visits.length}.
      </p>

      <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
        <div className="text-sm text-muted">Visits per hari</div>
        <div className="mt-4 flex h-40 items-end gap-1.5">
          {counts.map((c, i) => (
            <div
              key={days[i]}
              className="flex-1 rounded-t bg-accent/80 transition hover:bg-accent"
              style={{ height: `${(c / max) * 100}%`, minHeight: c ? "2px" : "0" }}
              title={`${days[i]}: ${c}`}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-muted">
          <span>{days[0]}</span>
          <span>{days[days.length - 1]}</span>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="text-sm text-muted">Top referrers</div>
          <ul className="mt-4 space-y-2 text-sm">
            {topReferrers.length === 0 && <li className="text-muted">Belum ada data.</li>}
            {topReferrers.map(([k, v]) => (
              <li key={k} className="flex justify-between">
                <span className="truncate">{k}</span>
                <span className="text-muted">{v}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-6">
          <div className="text-sm text-muted">Top paths</div>
          <ul className="mt-4 space-y-2 text-sm">
            {topPaths.length === 0 && <li className="text-muted">Belum ada data.</li>}
            {topPaths.map(([k, v]) => (
              <li key={k} className="flex justify-between">
                <span className="truncate">{k}</span>
                <span className="text-muted">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
