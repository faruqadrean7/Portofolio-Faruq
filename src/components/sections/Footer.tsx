import { Linkedin, Github, Mail, Instagram } from "lucide-react";
import type { SiteSettings } from "@/types/database";

export function Footer({ settings }: { settings?: SiteSettings }) {
  const year = new Date().getFullYear();
  const wa = settings?.whatsapp?.replace(/\D/g, "");
  const links: { href: string; label: string; Icon: typeof Mail }[] = [];
  if (settings?.email) links.push({ href: `mailto:${settings.email}`, label: "Email", Icon: Mail });
  if (settings?.linkedin_url) links.push({ href: settings.linkedin_url, label: "LinkedIn", Icon: Linkedin });
  if (settings?.github_url) links.push({ href: settings.github_url, label: "GitHub", Icon: Github });
  if (settings?.instagram_url) links.push({ href: settings.instagram_url, label: "Instagram", Icon: Instagram });

  return (
    <footer className="border-t border-line bg-bg">
      <div className="container-page flex flex-col items-start justify-between gap-6 py-10 md:flex-row md:items-center">
        <div>
          <div className="font-serif text-sm">
            {settings?.full_name ?? "Faruq Adrean"}
          </div>
          <div className="mt-1 text-sm text-muted italic">
            © {year} — &ldquo;As long as we are in this world, nothing is impossible.&rdquo;
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition hover:border-accent hover:text-accent"
              aria-label={label}
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          {wa && (
            <a
              href={`https://wa.me/${wa}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line px-3 py-1.5 text-xs text-muted transition hover:border-accent hover:text-accent"
            >
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
