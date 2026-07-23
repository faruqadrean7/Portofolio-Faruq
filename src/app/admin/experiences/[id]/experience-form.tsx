"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ExperienceSchema, type Experience } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import type { ExperienceRow } from "@/types/database";
import { TranslationsPanel, type FieldDef, type TranslationsValue } from "@/components/admin/TranslationsPanel";

const EXPERIENCE_TRANSLATABLE: FieldDef<"period" | "role" | "org" | "description">[] = [
  { key: "period", label: "Period", kind: "text" },
  { key: "role", label: "Role", kind: "text" },
  { key: "org", label: "Organization", kind: "text" },
  { key: "description", label: "Description", kind: "textarea" },
];

export function ExperienceForm({ exp }: { exp?: ExperienceRow }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Experience>({
    resolver: zodResolver(ExperienceSchema),
    defaultValues: {
      period: exp?.period ?? "",
      role: exp?.role ?? "",
      org: exp?.org ?? "",
      description: exp?.description ?? "",
      sort_order: exp?.sort_order ?? 100,
      active: exp?.active ?? true,
      translations: (exp?.translations ?? {}) as Experience["translations"],
    },
  });

  const translationsValue = watch("translations") as TranslationsValue<"period" | "role" | "org" | "description"> | undefined;

  async function onSubmit(values: Experience) {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const { error } = exp
      ? await supabase.from("experiences").update(values).eq("id", exp.id)
      : await supabase.from("experiences").insert(values);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/experiences");
    router.refresh();
  }

  async function onDelete() {
    if (!exp) return;
    if (!confirm(`Hapus experience "${exp.role}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from("experiences").delete().eq("id", exp.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/experiences");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5 rounded-2xl border border-line bg-surface p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-muted">Period</label>
          <input className="input-field mt-1.5" placeholder="2022 — Sekarang" {...register("period")} />
          {errors.period && <p className="mt-1 text-xs text-red-600">{errors.period.message}</p>}
        </div>
        <div>
          <label className="text-sm text-muted">Sort order</label>
          <input type="number" className="input-field mt-1.5" {...register("sort_order", { valueAsNumber: true })} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-muted">Role</label>
          <input className="input-field mt-1.5" {...register("role")} />
          {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role.message}</p>}
        </div>
        <div>
          <label className="text-sm text-muted">Organization</label>
          <input className="input-field mt-1.5" placeholder="PT XYZ · Jakarta" {...register("org")} />
          {errors.org && <p className="mt-1 text-xs text-red-600">{errors.org.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm text-muted">Description</label>
        <textarea className="input-field mt-1.5 min-h-[120px]" {...register("description")} />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("active")} />
        Tampilkan di landing
      </label>

      <TranslationsPanel
        value={translationsValue}
        onChange={(next) => setValue("translations", next as Experience["translations"])}
        fields={EXPERIENCE_TRANSLATABLE}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between border-t border-line pt-4">
        {exp ? (
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
