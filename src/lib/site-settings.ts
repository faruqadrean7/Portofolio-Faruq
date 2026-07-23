import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/types/database";

export const defaultSettings: SiteSettings = {
  id: 1,
  full_name: "Faruq Adrean",
  headline: "IT Developer & IT Support",
  email: null,
  phone: null,
  whatsapp: null,
  location: "Malang, Indonesia",
  linkedin_url: null,
  github_url: null,
  instagram_url: null,
  cv_url: null,
  avatar_url: null,
  open_to_work: true,
  updated_at: new Date(0).toISOString(),
};

export async function getSiteSettings(): Promise<SiteSettings> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("id", 1)
      .maybeSingle();
    return (data as SiteSettings | null) ?? defaultSettings;
  } catch {
    return defaultSettings;
  }
}

export function whatsappLink(whatsapp: string | null | undefined, message?: string): string | null {
  if (!whatsapp) return null;
  const num = whatsapp.replace(/\D/g, "");
  if (!num) return null;
  const q = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${num}${q}`;
}
