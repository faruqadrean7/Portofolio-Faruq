import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { ProjectRow } from "@/types/database";
import { formatDate } from "@/lib/utils";

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("sort_order", { ascending: true });

  const projects = (data as ProjectRow[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Projects</h1>
        <Link href="/admin/projects/new" className="btn-primary">
          + Project Baru
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-bg text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Featured</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Belum ada project.
                </td>
              </tr>
            )}
            {projects.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-muted">{p.category}</td>
                <td className="px-4 py-3">
                  {p.featured ? (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">
                      Featured
                    </span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">{p.sort_order}</td>
                <td className="px-4 py-3 text-muted">{formatDate(p.created_at)}</td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/projects/${p.id}`}
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
