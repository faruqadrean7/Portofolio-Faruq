"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HeroObjectSchema, type HeroObject } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import { UploadField } from "@/components/admin/UploadField";
import type { HeroObjectRow } from "@/types/database";

export function HeroObjectForm({ obj }: { obj?: HeroObjectRow }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<HeroObject>({
    resolver: zodResolver(HeroObjectSchema),
    defaultValues: {
      label: obj?.label ?? "",
      image_url: obj?.image_url ?? "",
      size: obj?.size ?? 56,
      sort_order: obj?.sort_order ?? 100,
      active: obj?.active ?? true,
    },
  });

  async function onSubmit(values: HeroObject) {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const { error } = obj
      ? await supabase.from("hero_objects").update(values).eq("id", obj.id)
      : await supabase.from("hero_objects").insert(values);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/hero-objects");
    router.refresh();
  }

  async function onDelete() {
    if (!obj) return;
    if (!confirm(`Hapus objek "${obj.label}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from("hero_objects").delete().eq("id", obj.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/hero-objects");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl space-y-5 rounded-2xl border border-line bg-surface p-6"
    >
      <div>
        <label className="text-sm text-muted">Label</label>
        <input
          className="input-field mt-1.5"
          placeholder="React, Docker, Laravel, ..."
          {...register("label")}
        />
        {errors.label && (
          <p className="mt-1 text-xs text-red-600">{errors.label.message}</p>
        )}
      </div>

      <Controller
        control={control}
        name="image_url"
        render={({ field }) => (
          <UploadField
            label="Gambar logo / ikon"
            value={field.value}
            onChange={field.onChange}
            folder="hero-objects"
            accept="image/png,image/svg+xml,image/webp"
            helper="Disarankan PNG/SVG dengan latar transparan."
          />
        )}
      />
      {errors.image_url && (
        <p className="-mt-3 text-xs text-red-600">{errors.image_url.message}</p>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm text-muted">Ukuran (px)</label>
          <input
            type="number"
            min={24}
            max={160}
            className="input-field mt-1.5"
            {...register("size", { valueAsNumber: true })}
          />
          {errors.size && (
            <p className="mt-1 text-xs text-red-600">{errors.size.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm text-muted">Sort order</label>
          <input
            type="number"
            className="input-field mt-1.5"
            {...register("sort_order", { valueAsNumber: true })}
          />
        </div>
        <label className="flex items-center gap-2 text-sm md:mt-7">
          <input type="checkbox" {...register("active")} />
          Tampilkan di hero
        </label>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between border-t border-line pt-4">
        {obj ? (
          <button
            type="button"
            onClick={onDelete}
            className="text-sm text-red-600 hover:underline"
          >
            Hapus
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={saving}
          className="btn-primary disabled:opacity-60"
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
