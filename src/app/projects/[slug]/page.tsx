import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { ProjectRow } from "@/types/database";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Markdown } from "@/components/Markdown";
import { getSiteSettings } from "@/lib/site-settings";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const supabase = await createClient();
    const { data } = await supabase.from("projects").select("slug");
    return ((data as { slug: string }[] | null) ?? []).map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select("title, description, thumbnail_url")
      .eq("slug", slug)
      .maybeSingle();
    if (!data) return { title: "Project" };
    return {
      title: `${data.title} — Faruq Adrean`,
      description: data.description,
      openGraph: data.thumbnail_url ? { images: [data.thumbnail_url] } : undefined,
    };
  } catch {
    return { title: "Project" };
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const [{ data }, settings] = await Promise.all([
    supabase.from("projects").select("*").eq("slug", slug).maybeSingle(),
    getSiteSettings(),
  ]);
  if (!data) notFound();
  const p = data as ProjectRow;

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <div className="container-page max-w-3xl">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke daftar project
          </Link>

          <div className="mt-6 text-xs uppercase tracking-wider text-accent">
            {p.category}
          </div>
          <h1 className="mt-2 font-serif text-4xl leading-tight md:text-5xl">{p.title}</h1>
          <p className="mt-4 text-lg text-muted">{p.description}</p>

          {(p.demo_url || p.repo_url) && (
            <div className="mt-6 flex flex-wrap gap-3">
              {p.demo_url && (
                <a
                  href={p.demo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink className="h-4 w-4" /> Live demo
                </a>
              )}
              {p.repo_url && (
                <a
                  href={p.repo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                >
                  <Github className="h-4 w-4" /> Source code
                </a>
              )}
            </div>
          )}

          {p.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {p.thumbnail_url && (
            <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.thumbnail_url} alt={p.title} className="h-auto w-full" />
            </div>
          )}

          {p.body ? (
            <article className="mt-12">
              <Markdown>{p.body}</Markdown>
            </article>
          ) : (
            <p className="mt-12 rounded-2xl border border-dashed border-line p-8 text-center text-muted">
              Detail case study belum tersedia.
            </p>
          )}

          <div className="mt-16 border-t border-line pt-8">
            <Link href="/#contact" className="btn-outline">
              Diskusikan project serupa
            </Link>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
