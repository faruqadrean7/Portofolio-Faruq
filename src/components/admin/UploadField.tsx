"use client";

import { useState, type ChangeEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  accept?: string;
  helper?: string;
};

export function UploadField({
  label,
  value,
  onChange,
  folder = "uploads",
  accept = "image/*",
  helper,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setErr(null);
    try {
      const supabase = createClient();
      const ext = file.name.split(".").pop() || "bin";
      const safeName = file.name
        .replace(/\.[^.]+$/, "")
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 60);
      const path = `${folder}/${Date.now()}-${safeName}.${ext}`;

      const { error: upErr } = await supabase.storage
        .from("media")
        .upload(path, file, { upsert: false, cacheControl: "31536000" });
      if (upErr) throw upErr;

      const { data } = supabase.storage.from("media").getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Upload gagal";
      setErr(msg);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  const isImage = !!value && /\.(png|jpe?g|webp|gif|avif|svg)(\?|$)/i.test(value);

  return (
    <div>
      <label className="text-sm text-muted">{label}</label>
      <div className="mt-1.5 space-y-2">
        <div className="flex items-center gap-2">
          <input
            type="text"
            className="input-field flex-1"
            placeholder="https://... atau upload"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <label className="cursor-pointer rounded-lg border border-line bg-bg px-3 py-2 text-xs font-medium text-ink hover:bg-accent-soft">
            {uploading ? "Mengunggah..." : "Upload"}
            <input
              type="file"
              accept={accept}
              className="hidden"
              onChange={handleFile}
              disabled={uploading}
            />
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-lg border border-line px-3 py-2 text-xs text-muted hover:text-red-600"
            >
              Hapus
            </button>
          )}
        </div>
        {value && isImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={value}
            alt="preview"
            className="h-24 w-24 rounded-lg border border-line object-cover"
          />
        )}
        {helper && !err && <p className="text-xs text-muted">{helper}</p>}
        {err && <p className="text-xs text-red-600">{err}</p>}
      </div>
    </div>
  );
}
