import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { HeroObjectRow } from "@/types/database";
import { HeroObjectForm } from "./hero-object-form";

export default async function EditHeroObjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div>
        <h1 className="font-serif text-3xl">Objek hero baru</h1>
        <p className="mt-1 text-sm text-muted">
          Upload logo/ikon (PNG/SVG transparan disarankan).
        </p>
        <div className="mt-8">
          <HeroObjectForm />
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("hero_objects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!data) notFound();
  const obj = data as HeroObjectRow;

  return (
    <div>
      <h1 className="font-serif text-3xl">Edit objek hero</h1>
      <p className="mt-1 text-sm text-muted">{obj.label}</p>
      <div className="mt-8">
        <HeroObjectForm obj={obj} />
      </div>
    </div>
  );
}
