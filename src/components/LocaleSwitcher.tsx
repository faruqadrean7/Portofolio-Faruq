"use client";

import { useEffect, useRef, useState } from "react";
import { Languages, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/provider";
import { locales } from "@/lib/i18n/dictionary";

export function LocaleSwitcher() {
  const { locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const current = locales.find((l) => l.code === locale);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-1.5 rounded-full border border-line px-3 text-xs text-muted transition hover:border-accent hover:text-accent"
        aria-label="Change language"
        aria-expanded={open}
      >
        <Languages className="h-3.5 w-3.5" />
        <span className="font-medium">{current?.flag}</span>
        <span className="hidden sm:inline uppercase tracking-wider">{current?.code}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-line bg-bg shadow-lg z-50">
          <ul className="py-1">
            {locales.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  onClick={() => {
                    setLocale(l.code);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between gap-3 px-3 py-2 text-sm text-muted transition hover:bg-surface hover:text-ink"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-base">{l.flag}</span>
                    <span>{l.label}</span>
                  </span>
                  {locale === l.code && <Check className="h-3.5 w-3.5 text-accent" />}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
