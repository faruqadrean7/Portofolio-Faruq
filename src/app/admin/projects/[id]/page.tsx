import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ProjectRow } from "@/types/database";
import { ProjectForm } from "./project-form";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div>
        <h1 className="font-serif text-3xl">Project baru</h1>
        <div className="mt-8">
          <ProjectForm />
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) notFound();
  const project = data as ProjectRow;

  return (
    <div>
      <h1 className="font-serif text-3xl">Edit project</h1>
      <p className="mt-1 text-sm text-muted">{project.title}</p>
      <div className="mt-8">
        <ProjectForm project={project} />
      </div>
    </div>
  );
}
