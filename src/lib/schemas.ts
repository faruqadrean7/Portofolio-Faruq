import { z } from "zod";

const NonIdLocales = ["en", "ar", "ja", "zh"] as const;
type NonIdLocale = (typeof NonIdLocales)[number];

function makeTranslationsField<T extends z.ZodRawShape>(shape: T) {
  const entries = Object.fromEntries(
    NonIdLocales.map((l) => [l, z.object(shape).partial().optional()]),
  ) as unknown as Record<NonIdLocale, z.ZodOptional<z.ZodObject<T>>>;
  return z.object(entries).partial().optional();
}

export const ContactFormSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(80),
  email: z.string().email("Email tidak valid"),
  subject: z.string().max(120).optional().or(z.literal("")),
  body: z.string().min(10, "Pesan minimal 10 karakter").max(2000),
  // Honeypot — must be empty
  website: z.string().max(0).optional().or(z.literal("")),
});
export type ContactForm = z.infer<typeof ContactFormSchema>;

export const ProjectSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(2).max(80).regex(/^[a-z0-9-]+$/, "Lowercase, angka, dash saja"),
  title: z.string().min(2).max(120),
  category: z.enum(["Web", "App", "System", "Electronics"]),
  description: z.string().min(10).max(500),
  thumbnail_url: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string().min(1).max(40)).max(10),
  featured: z.boolean(),
  sort_order: z.number().int().min(0).max(9999),
  demo_url: z.string().url().optional().or(z.literal("")),
  repo_url: z.string().url().optional().or(z.literal("")),
  body: z.string().max(10000).optional().or(z.literal("")),
  translations: makeTranslationsField({
    title: z.string().max(120),
    description: z.string().max(500),
    category: z.string().max(60),
  }),
});
export type Project = z.infer<typeof ProjectSchema>;

export const SiteSettingsSchema = z.object({
  full_name: z.string().min(2).max(120),
  headline: z.string().min(2).max(200),
  email: z.string().email().optional().or(z.literal("")),
  phone: z.string().max(40).optional().or(z.literal("")),
  whatsapp: z.string().max(40).optional().or(z.literal("")),
  location: z.string().max(120).optional().or(z.literal("")),
  linkedin_url: z.string().url().optional().or(z.literal("")),
  github_url: z.string().url().optional().or(z.literal("")),
  instagram_url: z.string().url().optional().or(z.literal("")),
  cv_url: z.string().url().optional().or(z.literal("")),
  avatar_url: z.string().url().optional().or(z.literal("")),
  open_to_work: z.boolean(),
});
export type SiteSettingsInput = z.infer<typeof SiteSettingsSchema>;

export const TestimonialSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2).max(120),
  role: z.string().max(160).optional().or(z.literal("")),
  quote: z.string().min(10).max(800),
  avatar_url: z.string().url().optional().or(z.literal("")),
  project_id: z.string().uuid().optional().or(z.literal("")),
  sort_order: z.number().int().min(0).max(9999),
  active: z.boolean(),
});
export type Testimonial = z.infer<typeof TestimonialSchema>;

export const PostSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(2).max(120).regex(/^[a-z0-9-]+$/, "Lowercase, angka, dash saja"),
  title: z.string().min(2).max(200),
  excerpt: z.string().min(10).max(400),
  body: z.string().max(50000),
  cover_url: z.string().url().optional().or(z.literal("")),
  tags: z.array(z.string().min(1).max(40)).max(10),
  published: z.boolean(),
  published_at: z.string().optional().or(z.literal("")),
});
export type Post = z.infer<typeof PostSchema>;

export const CertificationSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2).max(160),
  issuer: z.string().min(2).max(120),
  year: z.string().min(2).max(20),
  url: z.string().url().optional().or(z.literal("")),
  sort_order: z.number().int().min(0).max(9999),
  active: z.boolean(),
});
export type Certification = z.infer<typeof CertificationSchema>;

export const ServiceSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2).max(120),
  icon: z.string().min(1).max(40),
  description: z.string().min(10).max(500),
  bullets: z.array(z.string().min(1).max(120)).max(10),
  price: z.string().max(80).optional().or(z.literal("")),
  sort_order: z.number().int().min(0).max(9999),
  active: z.boolean(),
  translations: makeTranslationsField({
    title: z.string().max(120),
    description: z.string().max(500),
    bullets: z.array(z.string().max(120)).max(10),
  }),
});
export type Service = z.infer<typeof ServiceSchema>;

export const SkillSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2).max(80),
  icon: z.string().min(1).max(40),
  description: z.string().min(10).max(400),
  level: z.number().int().min(0).max(100),
  sort_order: z.number().int().min(0).max(9999),
  active: z.boolean(),
  translations: makeTranslationsField({
    name: z.string().max(80),
    description: z.string().max(400),
  }),
});
export type Skill = z.infer<typeof SkillSchema>;

export const ExperienceSchema = z.object({
  id: z.string().uuid().optional(),
  period: z.string().min(2).max(60),
  role: z.string().min(2).max(120),
  org: z.string().min(2).max(160),
  description: z.string().min(10).max(600),
  sort_order: z.number().int().min(0).max(9999),
  active: z.boolean(),
  translations: makeTranslationsField({
    period: z.string().max(60),
    role: z.string().max(120),
    org: z.string().max(160),
    description: z.string().max(600),
  }),
});
export type Experience = z.infer<typeof ExperienceSchema>;

export const HeroObjectSchema = z.object({
  id: z.string().uuid().optional(),
  label: z.string().min(1).max(80),
  image_url: z.string().url(),
  size: z.number().int().min(24).max(160),
  sort_order: z.number().int().min(0).max(9999),
  active: z.boolean(),
});
export type HeroObject = z.infer<typeof HeroObjectSchema>;

export const AnalyticsSchema = z.object({
  path: z.string().min(1).max(500),
  referrer: z.string().max(500).optional().or(z.literal("")),
});
export type Analytics = z.infer<typeof AnalyticsSchema>;
