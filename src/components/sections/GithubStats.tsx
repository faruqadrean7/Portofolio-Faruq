import type { SiteSettings } from "@/types/database";
import { Github, ExternalLink } from "lucide-react";

function extractUsername(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (!/github\.com$/i.test(u.hostname)) return null;
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[0] || null;
  } catch {
    return null;
  }
}

export function GithubStats({ settings }: { settings: SiteSettings }) {
  const username = extractUsername(settings.github_url);
  if (!username) return null;

  const enc = encodeURIComponent(username);
  const stats = `https://github-readme-stats.vercel.app/api?username=${enc}&show_icons=true&hide_border=true&hide_title=true&card_width=480&include_all_commits=true&count_private=true&bg_color=FAFAF7&text_color=0F1115&icon_color=1E3A8A&title_color=1E3A8A`;
  const langs = `https://github-readme-stats.vercel.app/api/top-langs/?username=${enc}&layout=compact&hide_border=true&hide_title=true&card_width=320&bg_color=FAFAF7&text_color=0F1115&title_color=1E3A8A&langs_count=8`;
  const streak = `https://streak-stats.demolab.com?user=${enc}&hide_border=true&background=FAFAF7&stroke=E5E5E0&ring=1E3A8A&fire=1E3A8A&currStreakLabel=1E3A8A&sideLabels=5C606B&dates=5C606B&currStreakNum=0F1115&sideNums=0F1115`;

  return (
    <section id="github" className="section">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="eyebrow">Aktivitas Coding</div>
            <h2 className="mt-3 max-w-2xl text-4xl leading-tight md:text-5xl">
              Bukti dari
              <span className="italic text-accent"> GitHub.</span>
            </h2>
          </div>
          <a
            href={settings.github_url ?? `https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            <Github className="h-4 w-4" /> @{username}{" "}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[3fr_2fr]">
          <div className="overflow-hidden rounded-2xl border border-line bg-surface p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stats}
              alt={`${username} GitHub stats`}
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden rounded-2xl border border-line bg-surface p-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={langs}
              alt={`${username} top languages`}
              className="h-auto w-full"
              loading="lazy"
            />
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-surface p-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={streak}
            alt={`${username} contribution streak`}
            className="h-auto w-full"
            loading="lazy"
          />
        </div>

        <p className="mt-4 text-xs text-muted">
          Stat real-time dari github-readme-stats & demolab streak-stats.
        </p>
      </div>
    </section>
  );
}
