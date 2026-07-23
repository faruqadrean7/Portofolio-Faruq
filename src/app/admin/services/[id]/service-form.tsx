"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ServiceSchema, type Service } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import type { ServiceRow } from "@/types/database";
import { TranslationsPanel, type FieldDef, type TranslationsValue } from "@/components/admin/TranslationsPanel";

const SERVICE_TRANSLATABLE: FieldDef<"title" | "description" | "bullets">[] = [
  { key: "title", label: "Title", kind: "text" },
  { key: "description", label: "Description", kind: "textarea" },
  { key: "bullets", label: "Bullets", kind: "list" },
];

export function ServiceForm({ service }: { service?: ServiceRow }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Service>({
    resolver: zodResolver(ServiceSchema),
    defaultValues: {
      title: service?.title ?? "",
      icon: service?.icon ?? "Code2",
      description: service?.description ?? "",
      bullets: service?.bullets ?? [],
      price: service?.price ?? "",
      sort_order: service?.sort_order ?? 100,
      active: service?.active ?? true,
      translations: (service?.translations ?? {}) as Service["translations"],
    },
  });

  const bulletsValue = watch("bullets");
  const translationsValue = watch("translations") as TranslationsValue<"title" | "description" | "bullets"> | undefined;

  async function onSubmit(values: Service) {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload = { ...values, price: values.price || null };
    const { error } = service
      ? await supabase.from("services").update(payload).eq("id", service.id)
      : await supabase.from("services").insert(payload);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/services");
    router.refresh();
  }

  async function onDelete() {
    if (!service) return;
    if (!confirm(`Hapus service "${service.title}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from("services").delete().eq("id", service.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/services");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl space-y-5 rounded-2xl border border-line bg-surface p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-muted">Title</label>
          <input className="input-field mt-1.5" {...register("title")} />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
        </div>
        <div>
          <label className="text-sm text-muted">Icon (lucide name)</label>
          <input className="input-field mt-1.5" placeholder="Code2 / Smartphone / Wrench" {...register("icon")} />
          {errors.icon && <p className="mt-1 text-xs text-red-600">{errors.icon.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm text-muted">Description</label>
        <textarea className="input-field mt-1.5 min-h-[100px]" {...register("description")} />
        {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>}
      </div>

      <div>
        <label className="text-sm text-muted">Bullets (pisahkan dengan |)</label>
        <input
          className="input-field mt-1.5"
          defaultValue={(service?.bullets ?? []).join(" | ")}
          onChange={(e) =>
            setValue(
              "bullets",
              e.target.value.split("|").map((t) => t.trim()).filter(Boolean),
            )
          }
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {bulletsValue?.map((b, i) => (
            <span key={i} className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">{b}</span>
          ))}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-muted">Price label (opsional)</label>
          <input className="input-field mt-1.5" placeholder="Mulai Rp 2,5 jt" {...register("price")} />
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
        onChange={(next) => setValue("translations", next as Service["translations"])}
        fields={SERVICE_TRANSLATABLE}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between border-t border-line pt-4">
        {service ? (
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
