"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProjectSchema, type Project } from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import type { ProjectRow } from "@/types/database";
import { UploadField } from "@/components/admin/UploadField";
import { TranslationsPanel, type FieldDef, type TranslationsValue } from "@/components/admin/TranslationsPanel";

const PROJECT_TRANSLATABLE: FieldDef<"title" | "description" | "category">[] = [
  { key: "title", label: "Title", kind: "text" },
  { key: "description", label: "Description", kind: "textarea" },
  { key: "category", label: "Category label", kind: "text" },
];

export function ProjectForm({ project }: { project?: ProjectRow }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<Project>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      slug: project?.slug ?? "",
      title: project?.title ?? "",
      category: project?.category ?? "Web",
      description: project?.description ?? "",
      thumbnail_url: project?.thumbnail_url ?? "",
      tags: project?.tags ?? [],
      featured: project?.featured ?? false,
      sort_order: project?.sort_order ?? 100,
      demo_url: project?.demo_url ?? "",
      repo_url: project?.repo_url ?? "",
      body: project?.body ?? "",
      translations: (project?.translations ?? {}) as Project["translations"],
    },
  });

  const tagsValue = watch("tags");
  const translationsValue = watch("translations") as TranslationsValue<"title" | "description" | "category"> | undefined;

  async function onSubmit(values: Project) {
    setSaving(true);
    setError(null);
    const supabase = createClient();
    const payload = {
      ...values,
      thumbnail_url: values.thumbnail_url || null,
      demo_url: values.demo_url || null,
      repo_url: values.repo_url || null,
      body: values.body || null,
    };
    const { error } = project
      ? await supabase.from("projects").update(payload).eq("id", project.id)
      : await supabase.from("projects").insert(payload);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/projects");
    router.refresh();
  }

  async function onDelete() {
    if (!project) return;
    if (!confirm(`Hapus project "${project.title}"?`)) return;
    const supabase = createClient();
    const { error } = await supabase.from("projects").delete().eq("id", project.id);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin/projects");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl space-y-5 rounded-2xl border border-line bg-surface p-6"
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

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-muted">Category</label>
          <select className="input-field mt-1.5" {...register("category")}>
            <option value="Web">Web</option>
            <option value="App">App</option>
            <option value="System">System</option>
            <option value="Electronics">Electronics</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-muted">Sort order</label>
          <input
            type="number"
            className="input-field mt-1.5"
            {...register("sort_order", { valueAsNumber: true })}
          />
        </div>
      </div>

      <div>
        <label className="text-sm text-muted">Description</label>
        <textarea
          className="input-field mt-1.5 min-h-[100px]"
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-xs text-red-600">{errors.description.message}</p>
        )}
      </div>

      <UploadField
        label="Thumbnail"
        value={watch("thumbnail_url") ?? ""}
        onChange={(v) => setValue("thumbnail_url", v, { shouldDirty: true })}
        folder="projects"
        accept="image/*"
      />

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-muted">Demo URL (opsional)</label>
          <input className="input-field mt-1.5" placeholder="https://demo.example.com" {...register("demo_url")} />
          {errors.demo_url && <p className="mt-1 text-xs text-red-600">{errors.demo_url.message}</p>}
        </div>
        <div>
          <label className="text-sm text-muted">Repo URL (opsional)</label>
          <input className="input-field mt-1.5" placeholder="https://github.com/..." {...register("repo_url")} />
          {errors.repo_url && <p className="mt-1 text-xs text-red-600">{errors.repo_url.message}</p>}
        </div>
      </div>

      <div>
        <label className="text-sm text-muted">Case study / body (opsional, markdown ok)</label>
        <textarea
          className="input-field mt-1.5 min-h-[160px] font-mono text-xs"
          placeholder="## Problem&#10;...&#10;## Solusi&#10;...&#10;## Hasil&#10;..."
          {...register("body")}
        />
      </div>

      <div>
        <label className="text-sm text-muted">Tags (pisahkan dengan koma)</label>
        <input
          className="input-field mt-1.5"
          defaultValue={(project?.tags ?? []).join(", ")}
          onChange={(e) =>
            setValue(
              "tags",
              e.target.value
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            )
          }
        />
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tagsValue?.map((t) => (
            <span
              key={t}
              className="rounded-full border border-line px-2 py-0.5 text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" {...register("featured")} />
        Tampilkan di landing page (featured)
      </label>

      <TranslationsPanel
        value={translationsValue}
        onChange={(next) => setValue("translations", next as Project["translations"])}
        fields={PROJECT_TRANSLATABLE}
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex items-center justify-between border-t border-line pt-4">
        {project ? (
          <button
            type="button"
            onClick={onDelete}
            className="text-sm text-red-600 hover:underline"
          >
            Hapus project
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={saving}
          className="btn-primary disabled:opacity-60"
        >
          {saving ? "Menyimpan..." : "Simpan"}
        </button>
      </div>
    </form>
  );
}
