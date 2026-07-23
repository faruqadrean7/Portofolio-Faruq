"use client";

import { useI18n } from "@/lib/i18n/provider";

export function Stats() {
  const { t } = useI18n();
  const stats = [
    { value: "5+", label: t.stats.yearsExperience },
    { value: "20+", label: t.stats.softwareProjects },
    { value: "100+", label: t.stats.electronicsServiced },
    { value: "10+", label: t.stats.stacksMastered },
  ];

  return (
    <section className="border-y border-line bg-surface">
      <div className="container-page grid grid-cols-2 gap-y-8 py-12 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="text-center md:text-left">
            <div className="font-serif text-4xl text-ink md:text-5xl">
              {s.value}
            </div>
            <div className="mt-1 text-sm text-muted">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
