"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { useI18n } from "@/lib/i18n/provider";
import type { SiteSettings } from "@/types/database";

export function Nav({ settings }: { settings?: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useI18n();
  const links = [
    { href: "/#about", label: t.nav.about },
    { href: "/#services", label: t.nav.services },
    { href: "/#projects", label: t.nav.projects },
    { href: "/blog", label: t.nav.blog },
    { href: "/#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wa = settings?.whatsapp?.replace(/\D/g, "");
  const hireHref = wa
    ? `https://wa.me/${wa}?text=${encodeURIComponent("Halo Faruq, saya tertarik berdiskusi tentang peluang kerja.")}`
    : settings?.email
      ? `mailto:${settings.email}?subject=${encodeURIComponent("Peluang kerja")}`
      : "/#contact";
  const isExternal = hireHref.startsWith("http") || hireHref.startsWith("mailto:");

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all",
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-lg"
          : "border-b border-transparent",
      )}
    >
      <nav className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="font-serif text-lg tracking-tight">
          Faruq <span className="text-accent">Adrean</span>
        </Link>
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm text-muted transition hover:text-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <a
            href={hireHref}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="btn-primary hidden md:inline-flex"
          >
            {t.nav.hireMe}
          </a>
        </div>
      </nav>
    </header>
  );
}
