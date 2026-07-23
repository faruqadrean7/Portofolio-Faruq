"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CertificationSchema, type Certification } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import type { CertificationRow } from "@/types/database";

export function CertificationForm({ cert }: { cert?: CertificationRow }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Certification>({
    resolver: zodResolver(CertificationSchema),
    defaultValues: {
      name: cert?.name ?? "",
      issuer: cert?.issuer ?? "",
      year: cert?.year ?? "",
      url: cert?.url ?? "",
      sort_order: cert?.sort_order ?? 100,
      active: cert?.active ?? true,
    },
  });

  async function onSubmit(values: Certification) {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload = { ...values, url: values.url || null };
    const { error } = cert
      ? await supabase.from("certifications").update(payload).eq("id", cert.id)
      : await supabase.from("certifications").insert(payload);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/certifications");
    router.refresh();
  }

  async function onDelete() {
    if (!cert) return;
    if (!confirm(`Hapus sertifikat "${cert.name}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from("certifications").delete().eq("id", cert.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/certifications");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-5 rounded-2xl border border-line bg-surface p-6">
      <div>
        <label className="text-sm text-muted">Nama sertifikat</label>
        <input className="input-field mt-1.5" placeholder="Belajar Dasar Pemrograman Web" {...register("name")} />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-muted">Issuer</label>
          <input className="input-field mt-1.5" placeholder="Dicoding" {...register("issuer")} />
          {errors.issuer && <p className="mt-1 text-xs text-red-600">{errors.issuer.message}</p>}
        </div>
        <div>
          <label className="text-sm text-muted">Tahun</label>
          <input className="input-field mt-1.5" placeholder="2024" {...register("year")} />
          {errors.year && <p className="mt-1 text-xs text-red-600">{errors.year.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm text-muted">URL verifikasi (opsional)</label>
        <input className="input-field mt-1.5" {...register("url")} />
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
        {cert ? (
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
