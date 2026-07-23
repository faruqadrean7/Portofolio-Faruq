import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { TestimonialRow } from "@/types/database";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .order("sort_order", { ascending: true });

  const items = (data as TestimonialRow[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Testimonials</h1>
        <Link href="/admin/testimonials/new" className="btn-primary">
          + Testimoni Baru
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-bg text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Quote</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Belum ada testimoni.
                </td>
              </tr>
            )}
            {items.map((t) => (
              <tr key={t.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium">{t.name}</td>
                <td className="px-4 py-3 text-muted">{t.role ?? "—"}</td>
                <td className="px-4 py-3 text-muted truncate max-w-xs">{t.quote}</td>
                <td className="px-4 py-3 text-muted">{t.sort_order}</td>
                <td className="px-4 py-3">
                  {t.active ? (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">Active</span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/testimonials/${t.id}`} className="text-sm text-accent hover:underline">
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
