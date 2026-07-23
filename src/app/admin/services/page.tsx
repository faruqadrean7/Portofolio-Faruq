import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { ServiceRow } from "@/types/database";

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .order("sort_order", { ascending: true });

  const services = (data as ServiceRow[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Services</h1>
        <Link href="/admin/services/new" className="btn-primary">
          + Service Baru
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-bg text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Icon</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {services.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Belum ada service.
                </td>
              </tr>
            )}
            {services.map((s) => (
              <tr key={s.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium">{s.title}</td>
                <td className="px-4 py-3 text-muted">{s.icon}</td>
                <td className="px-4 py-3 text-muted">{s.price ?? "—"}</td>
                <td className="px-4 py-3 text-muted">{s.sort_order}</td>
                <td className="px-4 py-3">
                  {s.active ? (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">Active</span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/services/${s.id}`} className="text-sm text-accent hover:underline">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
