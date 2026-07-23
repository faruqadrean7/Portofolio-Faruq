import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { TestimonialRow, ProjectRow } from "@/types/database";
import { TestimonialForm } from "./testimonial-form";

export default async function EditTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from("projects")
    .select("id, title")
    .order("sort_order", { ascending: true });
  const projectList = (projects as Pick<ProjectRow, "id" | "title">[] | null) ?? [];

  if (id === "new") {
    return (
      <div>
        <h1 className="font-serif text-3xl">Testimoni baru</h1>
        <div className="mt-8">
          <TestimonialForm projects={projectList} />
        </div>
      </div>
    );
  }

  const { data } = await supabase.from("testimonials").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const item = data as TestimonialRow;

  return (
    <div>
      <h1 className="font-serif text-3xl">Edit testimoni</h1>
      <p className="mt-1 text-sm text-muted">{item.name}</p>
      <div className="mt-8">
        <TestimonialForm item={item} projects={projectList} />
      </div>
    </div>
  );
}
