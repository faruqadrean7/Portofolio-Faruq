"use client";

import { useI18n } from "@/lib/i18n/provider";
import { tField } from "@/lib/i18n/translate-row";
import type { ExperienceRow, ExperienceTranslation } from "@/types/database";

type Item = Pick<ExperienceRow, "period" | "role" | "org" | "description"> & { id?: string };

export function Experience({ experiences }: { experiences?: ExperienceRow[] }) {
  const { t, locale } = useI18n();
  const fallback: Item[] = t.experience.items.map((it) => ({
    period: it.period,
    role: it.role,
    org: it.org,
    description: it.description,
  }));
  const translated: Item[] | undefined = experiences?.map((it) => ({
    id: it.id,
    period: tField<ExperienceRow, ExperienceTranslation, "period">(it, locale, "period"),
    role: tField<ExperienceRow, ExperienceTranslation, "role">(it, locale, "role"),
    org: tField<ExperienceRow, ExperienceTranslation, "org">(it, locale, "org"),
    description: tField<ExperienceRow, ExperienceTranslation, "description">(it, locale, "description"),
  }));
  const items: Item[] = translated && translated.length > 0 ? translated : fallback;

  return (
    <section id="experience" className="section bg-surface border-y border-line">
      <div className="container-page">
        <div className="eyebrow">{t.experience.eyebrow}</div>
        <h2 className="mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">
          {t.experience.headlineLine1}
          <span className="italic text-accent"> {t.experience.headlineLine2}</span>
        </h2>

        <ol className="mt-12 relative space-y-10 border-l border-line pl-8 md:pl-12">
          {items.map((it) => (
            <li key={it.id ?? it.role + it.period} className="relative">
              <span className="absolute -left-[33px] top-2 h-3 w-3 rounded-full border-2 border-bg bg-accent md:-left-[49px]" />
              <div className="text-xs uppercase tracking-wider text-muted">
                {it.period}
              </div>
              <h3 className="mt-1 font-serif text-2xl">{it.role}</h3>
              <div className="text-sm text-muted">{it.org}</div>
              <p className="mt-2 max-w-2xl text-muted">{it.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
