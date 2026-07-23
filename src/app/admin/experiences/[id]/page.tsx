import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ExperienceRow } from "@/types/database";
import { ExperienceForm } from "./experience-form";

export default async function EditExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div>
        <h1 className="font-serif text-3xl">Experience baru</h1>
        <div className="mt-8">
          <ExperienceForm />
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase.from("experiences").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const exp = data as ExperienceRow;

  return (
    <div>
      <h1 className="font-serif text-3xl">Edit experience</h1>
      <p className="mt-1 text-sm text-muted">{exp.role} · {exp.org}</p>
      <div className="mt-8">
        <ExperienceForm exp={exp} />
      </div>
    </div>
  );
}
