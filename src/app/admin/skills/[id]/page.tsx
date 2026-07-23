import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { SkillRow } from "@/types/database";
import { SkillForm } from "./skill-form";

export default async function EditSkillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div>
        <h1 className="font-serif text-3xl">Skill baru</h1>
        <div className="mt-8">
          <SkillForm />
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase.from("skills").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const skill = data as SkillRow;

  return (
    <div>
      <h1 className="font-serif text-3xl">Edit skill</h1>
      <p className="mt-1 text-sm text-muted">{skill.name}</p>
      <div className="mt-8">
        <SkillForm skill={skill} />
      </div>
    </div>
  );
}
