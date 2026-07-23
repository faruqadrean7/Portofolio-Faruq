"use client";

import { ArrowRight } from "lucide-react";
import type { ServiceRow, ServiceTranslation } from "@/types/database";
import { getIcon } from "@/lib/icon-map";
import { useI18n } from "@/lib/i18n/provider";
import { tField } from "@/lib/i18n/translate-row";

const fallbackIcons = ["Code2", "Smartphone", "Wrench"];

type ServiceItem = Pick<ServiceRow, "title" | "icon" | "description" | "bullets" | "price"> & { id?: string };

export function Services({ services }: { services?: ServiceRow[] }) {
  const { t, locale } = useI18n();
  const fallback: ServiceItem[] = t.services.items.map((it, i) => ({
    title: it.title,
    description: it.description,
    bullets: it.bullets,
    icon: fallbackIcons[i] ?? "Wrench",
    price: "",
  }));
  const translated: ServiceItem[] | undefined = services?.map((s) => ({
    id: s.id,
    title: tField<ServiceRow, ServiceTranslation, "title">(s, locale, "title"),
    description: tField<ServiceRow, ServiceTranslation, "description">(s, locale, "description"),
    bullets: tField<ServiceRow, ServiceTranslation, "bullets">(s, locale, "bullets"),
    icon: s.icon,
    price: s.price,
  }));
  const items: ServiceItem[] = translated && translated.length > 0 ? translated : fallback;

  return (
    <section id="services" className="section bg-surface border-y border-line">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">{t.services.eyebrow}</div>
            <h2 className="mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">
              {t.services.headlineLine1}
              <br />
              <span className="italic text-accent">{t.services.headlineLine2}</span>
            </h2>
          </div>
          <a href="#contact" className="btn-outline">
            {t.services.consultCta} <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((s, i) => {
            const Icon = getIcon(s.icon);
            const key = s.id ?? `${s.title}-${i}`;
            return (
              <article key={key} className="card flex flex-col">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted">{s.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-ink">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <span className="mt-2 h-1 w-1 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
