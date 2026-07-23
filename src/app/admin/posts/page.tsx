import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { PostRow } from "@/types/database";
import { formatDate } from "@/lib/utils";

export default async function AdminPostsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  const posts = (data as PostRow[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Blog</h1>
        <Link href="/admin/posts/new" className="btn-primary">
          + Tulisan Baru
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-bg text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Published</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  Belum ada tulisan.
                </td>
              </tr>
            )}
            {posts.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium">{p.title}</td>
                <td className="px-4 py-3 text-muted">/{p.slug}</td>
                <td className="px-4 py-3">
                  {p.published ? (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">
                      Published
                    </span>
                  ) : (
                    <span className="text-muted">Draft</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">{formatDate(p.created_at)}</td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/posts/${p.id}`} className="text-sm text-accent hover:underline">
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
