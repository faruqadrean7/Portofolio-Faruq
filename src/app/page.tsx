import { createClient } from "@/lib/supabase/server";
import type {
  ProjectRow,
  ServiceRow,
  SkillRow,
  ExperienceRow,
  TestimonialRow,
  CertificationRow,
  HeroObjectRow,
} from "@/types/database";
import { getSiteSettings } from "@/lib/site-settings";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Stats } from "@/components/sections/Stats";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Testimonials } from "@/components/sections/Testimonials";
import { Certifications } from "@/components/sections/Certifications";
import { GithubStats } from "@/components/sections/GithubStats";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { VisitTracker } from "@/components/VisitTracker";

export const revalidate = 60;

export default async function HomePage() {
  const settings = await getSiteSettings();

  let projects: ProjectRow[] = [];
  let services: ServiceRow[] = [];
  let skills: SkillRow[] = [];
  let experiences: ExperienceRow[] = [];
  let testimonials: TestimonialRow[] = [];
  let certifications: CertificationRow[] = [];
  let heroObjects: HeroObjectRow[] = [];

  try {
    const supabase = await createClient();
    const [p, s, k, e, t, c, h] = await Promise.all([
      supabase.from("projects").select("*").eq("featured", true).order("sort_order", { ascending: true }),
      supabase.from("services").select("*").eq("active", true).order("sort_order", { ascending: true }),
      supabase.from("skills").select("*").eq("active", true).order("sort_order", { ascending: true }),
      supabase.from("experiences").select("*").eq("active", true).order("sort_order", { ascending: true }),
      supabase.from("testimonials").select("*").eq("active", true).order("sort_order", { ascending: true }),
      supabase.from("certifications").select("*").eq("active", true).order("sort_order", { ascending: true }),
      supabase.from("hero_objects").select("*").eq("active", true).order("sort_order", { ascending: true }),
    ]);
    projects = (p.data as ProjectRow[] | null) ?? [];
    services = (s.data as ServiceRow[] | null) ?? [];
    skills = (k.data as SkillRow[] | null) ?? [];
    experiences = (e.data as ExperienceRow[] | null) ?? [];
    testimonials = (t.data as TestimonialRow[] | null) ?? [];
    certifications = (c.data as CertificationRow[] | null) ?? [];
    heroObjects = (h.data as HeroObjectRow[] | null) ?? [];
  } catch {
    // fallback handled in sections
  }

  return (
    <>
      <Nav settings={settings} />
      <main>
        <Hero settings={settings} objects={heroObjects} />
        <Stats />
        <About settings={settings} />
        <Services services={services} />
        <Skills skills={skills} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <GithubStats settings={settings} />
        <Testimonials items={testimonials} />
        <Certifications items={certifications} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
      <VisitTracker />
    </>
  );
}
