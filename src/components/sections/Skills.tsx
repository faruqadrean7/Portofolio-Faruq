"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type MouseEvent } from "react";
import { Parallax } from "@/components/Parallax";
import { getIcon } from "@/lib/icon-map";
import { useI18n } from "@/lib/i18n/provider";
import { tField } from "@/lib/i18n/translate-row";
import type { SkillRow, SkillTranslation } from "@/types/database";

type SkillItem = Pick<SkillRow, "name" | "icon" | "description" | "level"> & { id?: string };

const fallbackIcons = ["Globe", "Smartphone", "Cpu", "Database", "Cloud", "Zap", "Settings", "Wrench", "Rocket"];

function SkillCard({ s, index }: { s: SkillItem; index: number }) {
  const Icon = getIcon(s.icon);
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

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
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
        transformPerspective: 1000,
      }}
      className="card"
    >
      <div style={{ transform: "translateZ(20px)" }} className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-line text-accent">
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-serif text-xl">{s.name}</h3>
      </div>
      <p style={{ transform: "translateZ(10px)" }} className="mt-3 text-sm text-muted">
        {s.description}
      </p>
    </motion.article>
  );
}

export function Skills({ skills }: { skills?: SkillRow[] }) {
  const { t, locale } = useI18n();
  const fallback: SkillItem[] = t.skills.items.map((it, i) => ({
    name: it.name,
    description: it.description,
    icon: fallbackIcons[i] ?? "Rocket",
    level: 80,
  }));
  const translated: SkillItem[] | undefined = skills?.map((s) => ({
    id: s.id,
    name: tField<SkillRow, SkillTranslation, "name">(s, locale, "name"),
    description: tField<SkillRow, SkillTranslation, "description">(s, locale, "description"),
    icon: s.icon,
    level: s.level,
  }));
  const items: SkillItem[] = translated && translated.length > 0 ? translated : fallback;

  return (
    <section id="skills" className="section">
      <div className="container-page">
        <Parallax offset={40}>
          <div className="eyebrow">{t.skills.eyebrow}</div>
          <h2 className="mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">
            {t.skills.headlineLine1}
            <br />
            <span className="italic text-accent">{t.skills.headlineLine2}</span>
          </h2>
        </Parallax>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <SkillCard key={s.id ?? s.name} s={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
