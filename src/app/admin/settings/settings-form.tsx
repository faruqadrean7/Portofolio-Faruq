"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SiteSettingsSchema, type SiteSettingsInput } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import type { SiteSettings } from "@/types/database";
import { UploadField } from "@/components/admin/UploadField";

export function SettingsForm({ settings }: { settings: SiteSettings | null }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SiteSettingsInput>({
    resolver: zodResolver(SiteSettingsSchema),
    defaultValues: {
      full_name: settings?.full_name ?? "Faruq Adrean",
      headline: settings?.headline ?? "IT Developer & IT Support",
      email: settings?.email ?? "",
      phone: settings?.phone ?? "",
      whatsapp: settings?.whatsapp ?? "",
      location: settings?.location ?? "",
      linkedin_url: settings?.linkedin_url ?? "",
      github_url: settings?.github_url ?? "",
      instagram_url: settings?.instagram_url ?? "",
      cv_url: settings?.cv_url ?? "",
      avatar_url: settings?.avatar_url ?? "",
      open_to_work: settings?.open_to_work ?? true,
    },
  });

  async function onSubmit(values: SiteSettingsInput) {
    setSaving(true);
    setError(null);
    setSaved(false);
    const supabase = createClient();
    const payload = {
      ...values,
      email: values.email || null,
      phone: values.phone || null,
      whatsapp: values.whatsapp || null,
      location: values.location || null,
      linkedin_url: values.linkedin_url || null,
      github_url: values.github_url || null,
      instagram_url: values.instagram_url || null,
      cv_url: values.cv_url || null,
      avatar_url: values.avatar_url || null,
      updated_at: new Date().toISOString(),
    };
    const { error } = await supabase
      .from("site_settings")
      .upsert({ id: 1, ...payload });
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSaved(true);
    router.refresh();
  }

  const Field = ({
    label,
    name,
    placeholder,
    type = "text",
  }: {
    label: string;
    name: keyof SiteSettingsInput;
    placeholder?: string;
    type?: string;
  }) => (
    <div>
      <label className="text-sm text-muted">{label}</label>
      <input
        type={type}
        className="input-field mt-1.5"
        placeholder={placeholder}
        {...register(name as never)}
      />
      {errors[name] && (
        <p className="mt-1 text-xs text-red-600">{errors[name]?.message as string}</p>
      )}
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl space-y-6 rounded-2xl border border-line bg-surface p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Nama lengkap" name="full_name" />
        <Field label="Headline" name="headline" placeholder="IT Developer & IT Support" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Email" name="email" type="email" placeholder="you@email.com" />
        <Field label="Phone" name="phone" placeholder="+62..." />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="WhatsApp (no. + kode negara)" name="whatsapp" placeholder="62812xxxx" />
        <Field label="Location" name="location" placeholder="Malang, Indonesia" />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="LinkedIn URL" name="linkedin_url" />
        <Field label="GitHub URL" name="github_url" />
      </div>

      <Field label="Instagram URL" name="instagram_url" />

      <UploadField
        label="CV (PDF)"
        value={watch("cv_url") ?? ""}
        onChange={(v) => setValue("cv_url", v, { shouldDirty: true })}
        folder="cv"
        accept="application/pdf"
        helper="Upload PDF CV terbaru — atau paste URL eksternal."
      />

      <UploadField
        label="Avatar / foto profil"
        value={watch("avatar_url") ?? ""}
        onChange={(v) => setValue("avatar_url", v, { shouldDirty: true })}
        folder="avatar"
        accept="image/*"
        helper="Foto persegi / portrait, ukuran wajar (≤ 2MB)."
      />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("open_to_work")} />
        Tampilkan badge &quot;Open to Work&quot;
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && <p className="text-sm text-green-600">Tersimpan.</p>}

      <div className="flex justify-end border-t border-line pt-4">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
