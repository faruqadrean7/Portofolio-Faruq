import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const now = new Date();

  const urls: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
  ];

  try {
    const supabase = await createClient();
    const [{ data: projects }, { data: posts }] = await Promise.all([
      supabase.from("projects").select("slug, updated_at"),
      supabase.from("posts").select("slug, published_at, updated_at").eq("published", true),
    ]);

    for (const p of (projects ?? []) as { slug: string; updated_at?: string }[]) {
      urls.push({
        url: `${base}/projects/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }

    for (const p of (posts ?? []) as {
      slug: string;
      published_at?: string;
      updated_at?: string;
    }[]) {
      urls.push({
        url: `${base}/blog/${p.slug}`,
        lastModified: p.updated_at
          ? new Date(p.updated_at)
          : p.published_at
            ? new Date(p.published_at)
            : now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  } catch {
    // ignore — return base urls
  }

  return urls;
}
