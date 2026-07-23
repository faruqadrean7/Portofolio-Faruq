"use client";

import { Briefcase, MapPin, Clock, Mail, GraduationCap, Languages, Linkedin, Github } from "lucide-react";
import { useI18n } from "@/lib/i18n/provider";
import type { SiteSettings } from "@/types/database";

export function About({ settings }: { settings: SiteSettings }) {
  const { t } = useI18n();
  const initials = settings.full_name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  const wa = settings.whatsapp?.replace(/\D/g, "");
  const tags = ["IT Developer", "IT Support", "Problem Solver", "Fast Learner", "Fullstack", "Always Give My Best"];

  return (
    <section id="about" className="section">
      <div className="container-page grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
        <div className="space-y-6">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-surface">
            {settings.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.avatar_url} alt={settings.full_name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-8">
                <div className="flex h-28 w-28 items-center justify-center rounded-full border border-line bg-accent-soft font-serif text-3xl text-accent">
                  {initials}
                </div>
                <div className="mt-3 font-serif text-xl">{settings.full_name}</div>
                <div className="text-sm text-muted text-center">
                  {t.about.facts.education}
                </div>
                {settings.open_to_work && (
                  <div className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-1 text-xs text-green-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    {t.hero.openToWork}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quick facts card */}
          <div className="rounded-2xl border border-line bg-surface p-5">
            <div className="text-xs uppercase tracking-wider text-muted">{t.about.quickFacts}</div>
            <ul className="mt-3 space-y-2.5 text-sm">
              <li className="flex items-start gap-2.5">
                <Briefcase className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <span><span className="text-ink">{t.about.facts.experienceHighlight}</span> {t.about.facts.experience}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <GraduationCap className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <span>{t.about.facts.education}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <span>{settings.location || "Malang, Jawa Timur"} — {t.about.facts.relocation}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <span>{t.about.facts.noticePeriod} <span className="text-ink">{t.about.facts.noticePeriodValue}</span></span>
              </li>
              <li className="flex items-start gap-2.5">
                <Languages className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                <span>{t.about.facts.languages}</span>
              </li>
              {settings.email && (
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <a href={`mailto:${settings.email}`} className="hover:text-accent break-all">
                    {settings.email}
                  </a>
                </li>
              )}
              {settings.linkedin_url && (
                <li className="flex items-start gap-2.5">
                  <Linkedin className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    LinkedIn
                  </a>
                </li>
              )}
              {settings.github_url && (
                <li className="flex items-start gap-2.5">
                  <Github className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <a href={settings.github_url} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    GitHub
                  </a>
                </li>
              )}
              {wa && (
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="hover:text-accent">
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div>
          <div className="eyebrow">{t.about.eyebrow}</div>
          <h2 className="mt-3 text-4xl leading-tight md:text-5xl">
            {t.about.headlineLine1}
            <br />
            <span className="italic text-accent">{t.about.headlineLine2}</span>
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-ink">
            {t.about.tagline}
          </p>

          <div className="mt-8 space-y-5 text-lg text-muted">
            <p>{t.about.paragraphs.p1Body}</p>
            <p>
              <span className="text-ink">{t.about.paragraphs.p2Bold}</span>
              {t.about.paragraphs.p2Body}
            </p>
            <p>
              <span className="text-ink">{t.about.paragraphs.p3Bold}</span>
              {t.about.paragraphs.p3Body}
            </p>
            <p>
              <span className="text-ink">{t.about.paragraphs.p4Bold}</span>
              {t.about.paragraphs.p4Body}
            </p>
            <p>
              <span className="text-ink">{t.about.paragraphs.p5Bold}</span>
              {t.about.paragraphs.p5Body}
            </p>
          </div>

          {/* Three pillars */}
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-line bg-accent-soft/40 p-5">
              <div className="text-xs uppercase tracking-wider text-accent">{t.about.pillars.label} 01</div>
              <div className="mt-2 font-serif text-lg text-ink">{t.about.pillars.p1Title}</div>
              <p className="mt-1.5 text-sm text-muted">{t.about.pillars.p1Desc}</p>
            </div>
            <div className="rounded-2xl border border-line bg-accent-soft/40 p-5">
              <div className="text-xs uppercase tracking-wider text-accent">{t.about.pillars.label} 02</div>
              <div className="mt-2 font-serif text-lg text-ink">{t.about.pillars.p2Title}</div>
              <p className="mt-1.5 text-sm text-muted">{t.about.pillars.p2Desc}</p>
            </div>
            <div className="rounded-2xl border border-line bg-accent-soft/40 p-5">
              <div className="text-xs uppercase tracking-wider text-accent">{t.about.pillars.label} 03</div>
              <div className="mt-2 font-serif text-lg text-ink">{t.about.pillars.p3Title}</div>
              <p className="mt-1.5 text-sm text-muted">{t.about.pillars.p3Desc}</p>
            </div>
          </div>

          {/* What I bring */}
          <div className="mt-6 rounded-2xl border border-line bg-surface p-6">
            <div className="text-xs uppercase tracking-wider text-accent">{t.about.bring.title}</div>

            <div className="mt-4">
              <div className="text-xs font-medium text-ink">{t.about.bring.technicalTitle}</div>
              <ul className="mt-2 grid gap-2 text-sm md:grid-cols-2">
                {t.about.bring.technical.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-muted">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 border-t border-line pt-4">
              <div className="text-xs font-medium text-ink">{t.about.bring.attitudeTitle}</div>
              <ul className="mt-2 grid gap-2 text-sm md:grid-cols-2">
                {t.about.bring.attitude.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-muted">
                    <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 text-sm text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={settings.cv_url || "/cv-faruq-adrean.pdf"} download className="btn-primary">
              {t.about.cta.downloadCv}
            </a>
            <a href="#contact" className="btn-outline">
              {t.about.cta.startDiscussion}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
