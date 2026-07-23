import type { TestimonialRow } from "@/types/database";
import { Quote } from "lucide-react";

export function Testimonials({ items }: { items: TestimonialRow[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section id="testimonials" className="section">
      <div className="container-page">
        <div className="eyebrow">Testimoni</div>
        <h2 className="mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">
          Apa kata
          <span className="italic text-accent"> klien.</span>
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => {
            const initials = t.name
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("");
            return (
              <article
                key={t.id}
                className="card flex h-full flex-col"
              >
                <Quote className="h-6 w-6 text-accent/60" />
                <p className="mt-4 flex-1 text-sm leading-relaxed text-ink">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                  {t.avatar_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.avatar_url}
                      alt={t.name}
                      className="h-10 w-10 rounded-full border border-line object-cover"
                    />
                  ) : (
                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-accent-soft text-sm font-medium text-accent">
                      {initials}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    {t.role && <div className="text-xs text-muted">{t.role}</div>}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
