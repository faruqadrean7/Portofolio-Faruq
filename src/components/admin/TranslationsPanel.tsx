"use client";

import { useState } from "react";
import { locales as allLocales, type Locale } from "@/lib/i18n/dictionary";

const NON_ID_LOCALES = allLocales.filter((l) => l.code !== "id") as {
  code: Exclude<Locale, "id">;
  label: string;
  flag: string;
  dir: "ltr" | "rtl";
}[];

export type FieldKind = "text" | "textarea" | "list";

export type FieldDef<K extends string> = {
  key: K;
  label: string;
  kind: FieldKind;
  placeholder?: string;
};

type Translatable<K extends string> = Partial<Record<K, string | string[]>>;

export type TranslationsValue<K extends string> = Partial<
  Record<Exclude<Locale, "id">, Translatable<K>>
>;

export function TranslationsPanel<K extends string>({
  value,
  onChange,
  fields,
}: {
  value: TranslationsValue<K> | undefined;
  onChange: (next: TranslationsValue<K>) => void;
  fields: FieldDef<K>[];
}) {
  const [active, setActive] = useState<Exclude<Locale, "id">>("en");
  const current: Translatable<K> = value?.[active] ?? {};

  function update(key: K, raw: string) {
    const f = fields.find((x) => x.key === key);
    const v: string | string[] =
      f?.kind === "list"
        ? raw.split("|").map((t) => t.trim()).filter(Boolean)
        : raw;
    const nextLocale: Translatable<K> = { ...current, [key]: v };
    const next: TranslationsValue<K> = { ...(value ?? {}), [active]: nextLocale };
    onChange(next);
  }

  return (
    <div className="rounded-2xl border border-line bg-bg p-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium">Translations</div>
          <p className="text-xs text-muted">
            Default columns adalah Bahasa Indonesia. Isi field yang ingin
            ditampilkan dalam bahasa lain — kosong = pakai Indonesia.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {NON_ID_LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => setActive(l.code)}
              className={`rounded-full border px-2.5 py-1 text-xs ${
                active === l.code
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-line text-muted hover:text-ink"
              }`}
            >
              <span className="mr-1">{l.flag}</span>
              {l.code.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-3" dir={active === "ar" ? "rtl" : "ltr"}>
        {fields.map((f) => {
          const raw = current[f.key];
          const display = Array.isArray(raw) ? raw.join(" | ") : (raw ?? "");
          if (f.kind === "textarea") {
            return (
              <div key={f.key}>
                <label className="text-xs text-muted">{f.label}</label>
                <textarea
                  className="input-field mt-1 min-h-[80px]"
                  placeholder={f.placeholder}
                  value={display}
                  onChange={(e) => update(f.key, e.target.value)}
                />
              </div>
            );
          }
          return (
            <div key={f.key}>
              <label className="text-xs text-muted">
                {f.label}
                {f.kind === "list" ? " (pisahkan dengan |)" : ""}
              </label>
              <input
                className="input-field mt-1"
                placeholder={f.placeholder}
                value={display}
                onChange={(e) => update(f.key, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
