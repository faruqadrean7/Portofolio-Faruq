"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SkillSchema, type Skill } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import type { SkillRow } from "@/types/database";
import { TranslationsPanel, type FieldDef, type TranslationsValue } from "@/components/admin/TranslationsPanel";

const SKILL_TRANSLATABLE: FieldDef<"name" | "description">[] = [
  { key: "name", label: "Name", kind: "text" },
  { key: "description", label: "Description", kind: "textarea" },
];

export function SkillForm({ skill }: { skill?: SkillRow }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Skill>({
    resolver: zodResolver(SkillSchema),
    defaultValues: {
      name: skill?.name ?? "",
      icon: skill?.icon ?? "Rocket",
      description: skill?.description ?? "",
      level: skill?.level ?? 80,
      sort_order: skill?.sort_order ?? 100,
      active: skill?.active ?? true,
      translations: (skill?.translations ?? {}) as Skill["translations"],
    },
  });

  const translationsValue = watch("translations") as TranslationsValue<"name" | "description"> | undefined;

  async function onSubmit(values: Skill) {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const { error } = skill
      ? await supabase.from("skills").update(values).eq("id", skill.id)
      : await supabase.from("skills").insert(values);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/skills");
    router.refresh();
  }

  async function onDelete() {
    if (!skill) return;
    if (!confirm(`Hapus skill "${skill.name}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from("skills").delete().eq("id", skill.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/skills");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5 rounded-2xl border border-line bg-surface p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-muted">Name</label>
          <input className="input-field mt-1.5" {...register("name")} />
          {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm text-muted">Icon (lucide name)</label>
          <input className="input-field mt-1.5" placeholder="Globe / Database / Wrench" {...register("icon")} />
        </div>
      </div>

      <div>
        <label className="text-sm text-muted">Description</label>
        <textarea className="input-field mt-1.5 min-h-[100px]" {...register("description")} />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-muted">Level (0-100)</label>
          <input type="number" min={0} max={100} className="input-field mt-1.5" {...register("level", { valueAsNumber: true })} />
        </div>
        <div>
          <label className="text-sm text-muted">Sort order</label>
          <input type="number" className="input-field mt-1.5" {...register("sort_order", { valueAsNumber: true })} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("active")} />
        Tampilkan di landing
      </label>

      <TranslationsPanel
        value={translationsValue}
        onChange={(next) => setValue("translations", next as Skill["translations"])}
        fields={SKILL_TRANSLATABLE}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between border-t border-line pt-4">
        {skill ? (
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
