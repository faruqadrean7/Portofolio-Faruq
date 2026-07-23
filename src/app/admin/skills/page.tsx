import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { SkillRow } from "@/types/database";

export default async function AdminSkillsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("skills")
    .select("*")
    .order("sort_order", { ascending: true });

  const skills = (data as SkillRow[] | null) ?? [];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl">Skills</h1>
        <Link href="/admin/skills/new" className="btn-primary">
          + Skill Baru
        </Link>
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-surface">
        <table className="w-full text-sm">
          <thead className="border-b border-line bg-bg text-left text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Icon</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Active</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {skills.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Belum ada skill.
                </td>
              </tr>
            )}
            {skills.map((s) => (
              <tr key={s.id} className="border-b border-line last:border-0">
                <td className="px-4 py-3 font-medium">{s.name}</td>
                <td className="px-4 py-3 text-muted">{s.icon}</td>
                <td className="px-4 py-3 text-muted">{s.level}%</td>
                <td className="px-4 py-3 text-muted">{s.sort_order}</td>
                <td className="px-4 py-3">
                  {s.active ? (
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-xs text-accent">Active</span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link href={`/admin/skills/${s.id}`} className="text-sm text-accent hover:underline">
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
