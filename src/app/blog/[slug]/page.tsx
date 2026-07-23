import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { PostRow } from "@/types/database";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { Markdown } from "@/components/Markdown";
import { getSiteSettings } from "@/lib/site-settings";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("posts")
      .select("slug")
      .eq("published", true);
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
      .from("posts")
      .select("title, excerpt, cover_url")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle();
    if (!data) return { title: "Tulisan" };
    return {
      title: `${data.title} — Faruq Adrean`,
      description: data.excerpt,
      openGraph: data.cover_url ? { images: [data.cover_url] } : undefined,
    };
  } catch {
    return { title: "Tulisan" };
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const [{ data }, settings] = await Promise.all([
    supabase
      .from("posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .maybeSingle(),
    getSiteSettings(),
  ]);
  if (!data) notFound();
  const post = data as PostRow;

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <div className="container-page max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke daftar tulisan
          </Link>

          <div className="mt-6 text-xs uppercase tracking-wider text-muted">
            {post.published_at ? formatDate(post.published_at) : "—"}
          </div>
          <h1 className="mt-2 font-serif text-4xl leading-tight md:text-5xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted">{post.excerpt}</p>

          {post.tags.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                  {t}
                </span>
              ))}
            </div>
          )}

          {post.cover_url && (
            <div className="mt-10 overflow-hidden rounded-2xl border border-line bg-surface">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={post.cover_url} alt={post.title} className="h-auto w-full" />
            </div>
          )}

          <article className="mt-12">
            <Markdown>{post.body}</Markdown>
          </article>

          <div className="mt-16 border-t border-line pt-8">
            <Link href="/blog" className="btn-outline">
              Tulisan lainnya
            </Link>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
