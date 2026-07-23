import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { CertificationRow } from "@/types/database";

export default async function AdminCertificationsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("certifications")
    .select("*")
    .order("sort_order", { ascending: true });

  const items = (data as CertificationRow[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Certifications</h1>
        <Link href="/admin/certifications/new" className="btn-primary">
          + Sertifikat Baru
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-bg text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Issuer</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Belum ada sertifikat.
                </td>
              </tr>
            )}
            {items.map((c) => (
              <tr key={c.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium">{c.name}</td>
                <td className="px-4 py-3 text-muted">{c.issuer}</td>
                <td className="px-4 py-3 text-muted">{c.year}</td>
                <td className="px-4 py-3 text-muted">{c.sort_order}</td>
                <td className="px-4 py-3">
                  {c.active ? (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">Active</span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/certifications/${c.id}`} className="text-sm text-accent hover:underline">
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
