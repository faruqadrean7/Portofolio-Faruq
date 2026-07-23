"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostSchema, type Post } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import type { PostRow } from "@/types/database";
import { UploadField } from "@/components/admin/UploadField";

export function PostForm({ post }: { post?: PostRow }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Post>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      slug: post?.slug ?? "",
      title: post?.title ?? "",
      excerpt: post?.excerpt ?? "",
      body: post?.body ?? "",
      cover_url: post?.cover_url ?? "",
      tags: post?.tags ?? [],
      published: post?.published ?? false,
      published_at: post?.published_at ?? "",
    },
  });

  const tagsValue = watch("tags");

  async function onSubmit(values: Post) {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload = {
      ...values,
      cover_url: values.cover_url || null,
      published_at:
        values.published && !values.published_at
          ? new Date().toISOString()
          : values.published_at || null,
    };
    const { error } = post
      ? await supabase.from("posts").update(payload).eq("id", post.id)
      : await supabase.from("posts").insert(payload);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  async function onDelete() {
    if (!post) return;
    if (!confirm(`Hapus tulisan "${post.title}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from("posts").delete().eq("id", post.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/posts");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-3xl space-y-5 rounded-2xl border border-line bg-surface p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-muted">Title</label>
          <input className="input-field mt-1.5" {...register("title")} />
          {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title.message}</p>}
        </div>
        <div>
          <label className="text-sm text-muted">Slug</label>
          <input className="input-field mt-1.5" {...register("slug")} />
          {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm text-muted">Excerpt (ringkasan)</label>
        <textarea className="input-field mt-1.5 min-h-[80px]" {...register("excerpt")} />
        {errors.excerpt && <p className="mt-1 text-xs text-red-600">{errors.excerpt.message}</p>}
      </div>

      <UploadField
        label="Cover image"
        value={watch("cover_url") ?? ""}
        onChange={(v) => setValue("cover_url", v, { shouldDirty: true })}
        folder="posts"
        accept="image/*"
      />

      <div>
        <label className="text-sm text-muted">Body (markdown)</label>
        <textarea
          className="input-field mt-1.5 min-h-[400px] font-mono text-xs"
          placeholder="## Heading&#10;&#10;Paragraf...&#10;&#10;- list&#10;- item"
          {...register("body")}
        />
        {errors.body && <p className="mt-1 text-xs text-red-600">{errors.body.message}</p>}
      </div>

      <div>
        <label className="text-sm text-muted">Tags (pisahkan dengan koma)</label>
        <input
          className="input-field mt-1.5"
          defaultValue={(post?.tags ?? []).join(", ")}
          onChange={(e) =>
            setValue(
              "tags",
              e.target.value.split(",").map((t) => t.trim()).filter(Boolean),
            )
          }
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tagsValue?.map((t) => (
            <span key={t} className="rounded-full border border-line px-2 py-0.5 text-xs text-muted">
              {t}
            </span>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("published")} />
        Publish (tampilkan di /blog)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between border-t border-line pt-4">
        {post ? (
          <button type="button" onClick={onDelete} className="text-sm text-red-600 hover:underline">
            Hapus
          </button>
        ) : (
          <span />
        )}
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
