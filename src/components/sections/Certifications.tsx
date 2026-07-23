import type { CertificationRow } from "@/types/database";
import { Award, ExternalLink } from "lucide-react";

export function Certifications({ items }: { items: CertificationRow[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section id="certifications" className="section bg-surface border-y border-line">
      <div className="container-page">
        <div className="eyebrow">Sertifikat & Pelatihan</div>
        <h2 className="mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">
          Bukti
          <span className="italic text-accent"> belajar terus.</span>
        </h2>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {items.map((c) => (
            <article
              key={c.id}
              className="flex items-start gap-4 rounded-2xl border border-line bg-bg p-5 transition hover:border-accent/40"
            >
              <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-line bg-accent-soft text-accent">
                <Award className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-ink">{c.name}</h3>
                <div className="mt-0.5 text-sm text-muted">
                  {c.issuer} · {c.year}
                </div>
                {c.url && (
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs text-accent hover:underline"
                  >
                    Verifikasi <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
