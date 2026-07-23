import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/types/database";
import { SettingsForm } from "./settings-form";

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  return (
    <div>
      <h1 className="font-serif text-3xl">Site Settings</h1>
      <p className="mt-1 text-sm text-muted">
        Identitas, kontak, dan link sosial yang tampil di website.
      </p>
      <div className="mt-8">
        <SettingsForm settings={data as SiteSettings | null} />
      </div>
    </div>
  );
}
