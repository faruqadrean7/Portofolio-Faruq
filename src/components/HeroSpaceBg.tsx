"use client";

import { useMemo } from "react";
import type { HeroObjectRow } from "@/types/database";

/**
 * Lightweight, CSS-only "space tech" hero background.
 * - Two starfield layers + nebula glow + grid horizon
 * - CMS-driven floating logo objects (image_url + size)
 * Position & motion are deterministic per item id, so movement is preset
 * and not configurable per-item — keeps CMS simple.
 */
export function HeroSpaceBg({ objects }: { objects: HeroObjectRow[] }) {
  const items = useMemo(() => {
    return (objects ?? [])
      .filter((o) => o.active && o.image_url)
      .slice(0, 12)
      .map((o, i) => {
        const seed = hash(o.id || o.label || String(i));
        const left = 6 + (seed % 88); // 6%..94%
        const top = 8 + ((seed >> 3) % 78); // 8%..86%
        const delay = -((seed >> 5) % 12);
        const duration = 14 + ((seed >> 7) % 10); // 14s..23s
        const drift = (seed >> 9) % 3; // pick drift class 0..2
        return { ...o, left, top, delay, duration, drift };
      });
  }, [objects]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Deep space gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, #1b2a55 0%, #0a1230 35%, #060a1d 70%, #03050f 100%)",
        }}
      />

      {/* Nebula blobs */}
      <div
        className="absolute -left-32 top-10 h-[480px] w-[480px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #4f46e5 0%, transparent 60%)" }}
      />
      <div
        className="absolute -right-32 top-40 h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 60%)" }}
      />
      <div
        className="absolute bottom-0 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(ellipse, #8b5cf6 0%, transparent 65%)" }}
      />

      {/* Starfield — two layers, parallax via different sizes */}
      <div className="absolute inset-0 hero-stars hero-stars-1" />
      <div className="absolute inset-0 hero-stars hero-stars-2" />

      {/* Tech grid horizon */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99,179,237,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(99,179,237,0.35) 1px, transparent 1px)",
          backgroundSize: "60px 60px, 60px 60px",
          maskImage:
            "linear-gradient(to top, #000 10%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, #000 10%, transparent 100%)",
          transform: "perspective(600px) rotateX(60deg)",
          transformOrigin: "bottom",
        }}
      />

      {/* Floating CMS objects */}
      {items.map((it) => (
        <div
          key={it.id}
          className={`absolute hero-float hero-float-${it.drift}`}
          style={{
            left: `${it.left}%`,
            top: `${it.top}%`,
            width: it.size,
            height: it.size,
            animationDelay: `${it.delay}s`,
            animationDuration: `${it.duration}s`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={it.image_url}
            alt={it.label}
            className="hero-float-img h-full w-full object-contain"
            loading="lazy"
            draggable={false}
          />
        </div>
      ))}

      {/* Soft vignette to push content readability up */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 30% 50%, transparent 0%, rgba(3,5,15,0.55) 75%)",
        }}
      />
    </div>
  );
}

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}
