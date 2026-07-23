"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, MapPin, Briefcase, Globe } from "lucide-react";
import { useRef } from "react";
import { HeroSpaceBg } from "@/components/HeroSpaceBg";
import { useI18n } from "@/lib/i18n/provider";
import type { SiteSettings, HeroObjectRow } from "@/types/database";

export function Hero({
  settings,
  objects = [],
}: {
  settings: SiteSettings;
  objects?: HeroObjectRow[];
}) {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative overflow-hidden pt-48 pb-24 md:pt-56 md:pb-32 text-white"
    >
      {/* Space-tech background with CMS-driven floating objects */}
      <motion.div
        aria-hidden
        style={{ y: sceneY }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <HeroSpaceBg objects={objects} />
      </motion.div>

      {/* Subtle scanline overlay over space bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.4) 0px, rgba(255,255,255,0.4) 1px, transparent 1px, transparent 3px)",
        }}
      />

      <motion.div style={{ y }} className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-white/80 backdrop-blur"
        >
          {settings.open_to_work && (
            <>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
              <span className="font-medium text-white">{t.hero.openToWork}</span>
              <span className="text-white/60">— {t.hero.availableImmediately}</span>
            </>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.04 }}
          className="mt-6 font-serif text-2xl text-cyan-300 md:text-3xl"
        >
          {t.hero.name}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-3 max-w-4xl text-5xl font-medium leading-[1.05] text-white md:text-7xl lg:text-8xl"
        >
          <span className="italic text-cyan-300">{t.hero.headline1}</span>
          <br />
          {t.hero.headline2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-3xl text-xl leading-relaxed text-white/85 md:text-2xl"
        >
          {t.hero.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/70"
        >
          {t.hero.bridgeIntro}
          <span className="text-white">{t.hero.programming}</span>
          {t.hero.and}
          <span className="text-white">{t.hero.electronics}</span>
          {t.hero.bridgeOutro}
          <br />
          <br />
          <span className="text-white">{t.hero.seekingPrimary}</span>
          {t.hero.seekingAlt}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="mt-6 flex flex-wrap gap-2"
        >
          {[
            "Fullstack",
            "AI/ML Engineer",
            "DevOps",
            "IT Support",
            "Mobile (Kotlin)",
            "Rust · Go",
            "Problem Solver",
            "Fast Learner",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/90 shadow-sm backdrop-blur"
            >
              {t}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/75"
        >
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="h-4 w-4 text-cyan-300" /> {t.hero.fullTimeContractFreelance}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Globe className="h-4 w-4 text-cyan-300" /> {t.hero.workMode}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-cyan-300" />{" "}
            {settings.location || "Malang"} {t.hero.locationSuffix}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a href="#projects" className="text-sm text-white/60 hover:text-white inline-flex items-center gap-1">
            {t.hero.viewPortfolio} <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
