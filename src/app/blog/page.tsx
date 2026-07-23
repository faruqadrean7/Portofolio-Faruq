import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import type { PostRow } from "@/types/database";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { getSiteSettings } from "@/lib/site-settings";
import { formatDate } from "@/lib/utils";

export const revalidate = 60;

export const metadata = {
  title: "Blog — Faruq Adrean",
  description: "Catatan teknis, pembelajaran, dan refleksi tentang web, IT support, dan teknologi.",
};

export default async function BlogIndexPage() {
  const settings = await getSiteSettings();
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });

  const posts = (data as PostRow[] | null) ?? [];

  return (
    <>
      <Nav />
      <main className="pt-32 pb-24">
        <div className="container-page max-w-3xl">
          <div className="eyebrow">Blog</div>
          <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">
            Catatan
            <span className="italic text-accent"> teknis & pembelajaran.</span>
          </h1>
          <p className="mt-4 text-lg text-muted">
            Hal-hal yang saya pelajari dari project nyata: bug yang menyebalkan,
            keputusan teknis, dan refleksi.
          </p>

          {posts.length === 0 ? (
            <div className="mt-12 rounded-2xl border border-dashed border-line p-12 text-center text-muted">
              Belum ada tulisan dipublikasi.
            </div>
          ) : (
            <ul className="mt-12 divide-y divide-line border-y border-line">
              {posts.map((p) => (
                <li key={p.id}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex flex-col gap-2 py-6 transition hover:bg-accent-soft/40 md:flex-row md:items-start md:gap-6"
                  >
                    <div className="w-32 flex-shrink-0 text-xs uppercase tracking-wider text-muted md:pt-1.5">
                      {p.published_at ? formatDate(p.published_at).split(",")[0] : "—"}
                    </div>
                    <div className="flex-1">
                      <h2 className="font-serif text-2xl group-hover:text-accent">{p.title}</h2>
                      <p className="mt-1 text-muted">{p.excerpt}</p>
                      {p.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-line px-2 py-0.5 text-xs text-muted"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ArrowRight className="hidden h-4 w-4 self-center text-muted opacity-0 transition group-hover:opacity-100 md:block" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
