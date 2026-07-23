"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TestimonialSchema, type Testimonial } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import type { TestimonialRow, ProjectRow } from "@/types/database";
import { UploadField } from "@/components/admin/UploadField";

export function TestimonialForm({
  item,
  projects,
}: {
  item?: TestimonialRow;
  projects: Pick<ProjectRow, "id" | "title">[];
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Testimonial>({
    resolver: zodResolver(TestimonialSchema),
    defaultValues: {
      name: item?.name ?? "",
      role: item?.role ?? "",
      quote: item?.quote ?? "",
      avatar_url: item?.avatar_url ?? "",
      project_id: item?.project_id ?? "",
      sort_order: item?.sort_order ?? 100,
      active: item?.active ?? true,
    },
  });

  async function onSubmit(values: Testimonial) {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload = {
      ...values,
      role: values.role || null,
      avatar_url: values.avatar_url || null,
      project_id: values.project_id || null,
    };
    const { error } = item
      ? await supabase.from("testimonials").update(payload).eq("id", item.id)
      : await supabase.from("testimonials").insert(payload);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/testimonials");
    router.refresh();
  }

  async function onDelete() {
    if (!item) return;
    if (!confirm(`Hapus testimoni dari "${item.name}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from("testimonials").delete().eq("id", item.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/testimonials");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5 rounded-2xl border border-line bg-surface p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-muted">Nama</label>
          <input className="input-field mt-1.5" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm text-muted">Role / posisi (opsional)</label>
          <input className="input-field mt-1.5" placeholder="Owner UMKM XYZ" {...register("role")} />
        </div>
      </div>

      <div>
        <label className="text-sm text-muted">Quote</label>
        <textarea className="input-field mt-1.5 min-h-[120px]" {...register("quote")} />
        {errors.quote && <p className="mt-1 text-xs text-red-600">{errors.quote.message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <UploadField
          label="Avatar (opsional)"
          value={watch("avatar_url") ?? ""}
          onChange={(v) => setValue("avatar_url", v, { shouldDirty: true })}
          folder="testimonials"
          accept="image/*"
        />
        <div>
          <label className="text-sm text-muted">Project terkait (opsional)</label>
          <select className="input-field mt-1.5" {...register("project_id")}>
            <option value="">— tidak ada —</option>
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-muted">Sort order</label>
          <input type="number" className="input-field mt-1.5" {...register("sort_order", { valueAsNumber: true })} />
        </div>
        <label className="flex items-center gap-2 text-sm md:mt-7">
          <input type="checkbox" {...register("active")} />
          Tampilkan di landing
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between border-t border-line pt-4">
        {item ? (
          <button type="button" onClick={onDelete} className="text-sm text-red-600 hover:underline">
            Hapus
          </button>
        ) : (
          <span />
        )}
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
