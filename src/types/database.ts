// Hand-written types matching supabase/schema.sql.
// To regenerate from a live Supabase project:
//   npx supabase gen types typescript --project-id YOUR_REF > src/types/database.ts

export type ProjectCategory = "Web" | "App" | "System" | "Electronics";

export type LocaleCode = "id" | "en" | "ar" | "ja" | "zh";

export type ProjectTranslation = Partial<{
  title: string;
  description: string;
  category: string;
}>;

export type ServiceTranslation = Partial<{
  title: string;
  description: string;
  bullets: string[];
}>;

export type SkillTranslation = Partial<{
  name: string;
  description: string;
}>;

export type ExperienceTranslation = Partial<{
  period: string;
  role: string;
  org: string;
  description: string;
}>;

export type Translations<T> = Partial<Record<Exclude<LocaleCode, "id">, T>>;

export type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  thumbnail_url: string | null;
  tags: string[];
  featured: boolean;
  sort_order: number;
  demo_url: string | null;
  repo_url: string | null;
  body: string | null;
  created_at: string;
  translations?: Translations<ProjectTranslation>;
};

export type MessageRow = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  body: string;
  read: boolean;
  created_at: string;
};

export type VisitRow = {
  id: number;
  path: string;
  referrer: string | null;
  user_agent: string | null;
  country: string | null;
  created_at: string;
};

export type ServiceRow = {
  id: string;
  title: string;
  icon: string;
  description: string;
  bullets: string[];
  price: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
  translations?: Translations<ServiceTranslation>;
};

export type SkillRow = {
  id: string;
  name: string;
  icon: string;
  description: string;
  level: number;
  sort_order: number;
  active: boolean;
  created_at: string;
  translations?: Translations<SkillTranslation>;
};

export type ExperienceRow = {
  id: string;
  period: string;
  role: string;
  org: string;
  description: string;
  sort_order: number;
  active: boolean;
  created_at: string;
  translations?: Translations<ExperienceTranslation>;
};

export type SiteSettings = {
  id: number;
  full_name: string;
  headline: string;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  location: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  instagram_url: string | null;
  cv_url: string | null;
  avatar_url: string | null;
  open_to_work: boolean;
  updated_at: string;
};

export type TestimonialRow = {
  id: string;
  name: string;
  role: string | null;
  quote: string;
  avatar_url: string | null;
  project_id: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
};

export type PostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  cover_url: string | null;
  tags: string[];
  published: boolean;
  published_at: string | null;
  created_at: string;
};

export type HeroObjectRow = {
  id: string;
  label: string;
  image_url: string;
  size: number;
  sort_order: number;
  active: boolean;
  created_at: string;
};

export type CertificationRow = {
  id: string;
  name: string;
  issuer: string;
  year: string;
  url: string | null;
  sort_order: number;
  active: boolean;
  created_at: string;
};
