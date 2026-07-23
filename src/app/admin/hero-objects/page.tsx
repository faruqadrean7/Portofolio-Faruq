import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { HeroObjectRow } from "@/types/database";

export default async function AdminHeroObjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("hero_objects")
    .select("*")
    .order("sort_order", { ascending: true });

  const items = (data as HeroObjectRow[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl">Hero Objects</h1>
          <p className="mt-1 text-sm text-muted">
            Logo / ikon yang melayang di hero (latar angkasa). Aktifkan untuk ditampilkan.
          </p>
        </div>
        <Link href="/admin/hero-objects/new" className="btn-primary">
          + Objek Baru
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-bg text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Preview</th>
              <th className="px-4 py-3">Label</th>
              <th className="px-4 py-3">Size</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Belum ada objek. Tambahkan logo/ikon untuk muncul di hero.
                </td>
              </tr>
            )}
            {items.map((o) => (
              <tr key={o.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3">
                  {o.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={o.image_url}
                      alt={o.label}
                      className="h-10 w-10 rounded-md border border-line bg-bg object-contain p-1"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-md border border-line bg-bg" />
                  )}
                </td>
                <td className="px-4 py-3 font-medium">{o.label}</td>
                <td className="px-4 py-3 text-muted">{o.size}px</td>
                <td className="px-4 py-3 text-muted">{o.sort_order}</td>
                <td className="px-4 py-3">
                  {o.active ? (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">
                      Active
                    </span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/hero-objects/${o.id}`}
                    className="text-sm text-accent hover:underline"
                  >
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
