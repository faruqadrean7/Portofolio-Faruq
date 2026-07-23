"use client";

import type { ProjectRow, ProjectTranslation } from "@/types/database";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import Link from "next/link";
import { Parallax } from "@/components/Parallax";
import { useI18n } from "@/lib/i18n/provider";
import { tField } from "@/lib/i18n/translate-row";
import type { Locale } from "@/lib/i18n/dictionary";

function TiltCard({ p, index, labels, locale }: { p: ProjectRow; index: number; labels: { liveDemo: string; source: string }; locale: Locale }) {
  const title = tField<ProjectRow, ProjectTranslation, "title">(p, locale, "title");
  const description = tField<ProjectRow, ProjectTranslation, "description">(p, locale, "description");
  const category = tField<ProjectRow, ProjectTranslation, "category">(p, locale, "category");
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.article
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.06 }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="card group flex flex-col"
    >
      <div
        style={{ transform: "translateZ(40px)" }}
        className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-lg border border-line bg-accent-soft"
      >
        {p.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.thumbnail_url}
            alt={title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="font-serif text-5xl text-accent/60">
            {title.charAt(0)}
          </span>
        )}
      </div>
      <div
        style={{ transform: "translateZ(20px)" }}
        className="mt-5 text-xs uppercase tracking-wider text-muted"
      >
        {category}
      </div>
      <Link
        href={`/projects/${p.slug}`}
        style={{ transform: "translateZ(30px)" }}
        className="mt-1 font-serif text-2xl hover:text-accent"
      >
        {title}
      </Link>
      <p
        style={{ transform: "translateZ(15px)" }}
        className="mt-2 text-sm text-muted"
      >
        {description}
      </p>
      <div
        style={{ transform: "translateZ(25px)" }}
        className="mt-5 flex flex-wrap gap-2"
      >
        {p.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted"
          >
            {t}
          </span>
        ))}
      </div>
      {(p.demo_url || p.repo_url) && (
        <div
          style={{ transform: "translateZ(30px)" }}
          className="mt-5 flex flex-wrap items-center gap-3 border-t border-line pt-4 text-sm"
        >
          {p.demo_url && (
            <a
              href={p.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-accent hover:underline"
            >
              <ExternalLink className="h-3.5 w-3.5" /> {labels.liveDemo}
            </a>
          )}
          {p.repo_url && (
            <a
              href={p.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted hover:text-ink"
            >
              <Github className="h-3.5 w-3.5" /> {labels.source}
            </a>
          )}
        </div>
      )}
    </motion.article>
  );
}

export function Projects({ projects }: { projects: ProjectRow[] }) {
  const { t, locale } = useI18n();
  const labels = { liveDemo: t.projects.liveDemo, source: t.projects.source };

  return (
    <section id="projects" className="section">
      <div className="container-page">
        <Parallax offset={40}>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="eyebrow">{t.projects.eyebrow}</div>
              <h2 className="mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">
                {t.projects.headlineLine1}
                <span className="italic text-accent"> {t.projects.headlineLine2}</span>
              </h2>
            </div>
            <a href="#contact" className="btn-outline">
              {t.projects.discussCta} <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Parallax>

        {projects.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-line p-12 text-center text-muted">
            {t.projects.empty}
          </div>
        ) : (
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <TiltCard key={p.id} p={p} index={i} labels={labels} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
