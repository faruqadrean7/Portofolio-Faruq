import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { CertificationRow } from "@/types/database";
import { CertificationForm } from "./certification-form";

export default async function EditCertificationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === "new") {
    return (
      <div>
        <h1 className="font-serif text-3xl">Sertifikat baru</h1>
        <div className="mt-8">
          <CertificationForm />
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase.from("certifications").select("*").eq("id", id).maybeSingle();
  if (!data) notFound();
  const cert = data as CertificationRow;

  return (
    <div>
      <h1 className="font-serif text-3xl">Edit sertifikat</h1>
      <p className="mt-1 text-sm text-muted">{cert.name}</p>
      <div className="mt-8">
        <CertificationForm cert={cert} />
      </div>
    </div>
  );
}
