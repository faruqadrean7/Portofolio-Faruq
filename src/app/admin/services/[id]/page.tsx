import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { ServiceRow } from "@/types/database";
import { ServiceForm } from "./service-form";

export default async function EditServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div>
        <h1 className="font-serif text-3xl">Service baru</h1>
        <div className="mt-8">
          <ServiceForm />
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase.from("services").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const service = data as ServiceRow;

  return (
    <div>
      <h1 className="font-serif text-3xl">Edit service</h1>
      <p className="mt-1 text-sm text-muted">{service.title}</p>
      <div className="mt-8">
        <ServiceForm service={service} />
      </div>
    </div>
  );
}
