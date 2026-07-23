-- ============================================================
-- Portfolio Faruq Adrean — Supabase schema
-- Run this in Supabase Dashboard > SQL Editor (one time setup)
-- ============================================================

-- 1. PROJECTS -------------------------------------------------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (category in ('Web', 'App', 'System', 'Electronics')),
  description text not null,
  thumbnail_url text,
  tags text[] not null default '{}',
  featured boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);
create index if not exists idx_projects_featured on projects (featured, sort_order);

-- 2. MESSAGES (contact submissions) ---------------------------
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  body text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
create index if not exists idx_messages_unread on messages (read, created_at desc);

-- 3. VISITS (analytics) ---------------------------------------
create table if not exists visits (
  id bigserial primary key,
  path text not null,
  referrer text,
  user_agent text,
  country text,
  created_at timestamptz not null default now()
);
create index if not exists idx_visits_created on visits (created_at desc);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table projects enable row level security;
alter table messages enable row level security;
alter table visits enable row level security;

-- Public can read all projects (the app filters featured/order client-side or in query)
drop policy if exists "public read projects" on projects;
create policy "public read projects" on projects
  for select using (true);

-- Authenticated users (admin) can do anything on projects
drop policy if exists "admin write projects" on projects;
create policy "admin write projects" on projects
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Messages: only authenticated admin can read / update read flag
drop policy if exists "admin read messages" on messages;
create policy "admin read messages" on messages
  for select using (auth.role() = 'authenticated');

drop policy if exists "admin update messages" on messages;
create policy "admin update messages" on messages
  for update using (auth.role() = 'authenticated');

-- Visits: only authenticated admin can read
drop policy if exists "admin read visits" on visits;
create policy "admin read visits" on visits
  for select using (auth.role() = 'authenticated');

-- NOTE: INSERT to messages and visits happens via the service-role key
-- inside Next.js API routes — service role bypasses RLS, so no public
-- INSERT policy is needed (and intentionally not granted).

-- 4. SERVICES -------------------------------------------------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  icon text not null default 'Code2',
  description text not null,
  bullets text[] not null default '{}',
  price text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_services_active on services (active, sort_order);

alter table services enable row level security;
drop policy if exists "public read services" on services;
create policy "public read services" on services for select using (true);
drop policy if exists "admin write services" on services;
create policy "admin write services" on services
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 5. SKILLS ---------------------------------------------------
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  icon text not null default 'Rocket',
  description text not null,
  level int not null default 80 check (level between 0 and 100),
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_skills_active on skills (active, sort_order);

alter table skills enable row level security;
drop policy if exists "public read skills" on skills;
create policy "public read skills" on skills for select using (true);
drop policy if exists "admin write skills" on skills;
create policy "admin write skills" on skills
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 6. EXPERIENCES ----------------------------------------------
create table if not exists experiences (
  id uuid primary key default gen_random_uuid(),
  period text not null,
  role text not null,
  org text not null,
  description text not null,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_experiences_active on experiences (active, sort_order);

alter table experiences enable row level security;
drop policy if exists "public read experiences" on experiences;
create policy "public read experiences" on experiences for select using (true);
drop policy if exists "admin write experiences" on experiences;
create policy "admin write experiences" on experiences
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 7. PROJECTS — extra columns -------------------------------
alter table projects add column if not exists demo_url text;
alter table projects add column if not exists repo_url text;
alter table projects add column if not exists body text;

-- 8. SITE SETTINGS (singleton row) --------------------------
create table if not exists site_settings (
  id int primary key default 1,
  full_name text not null default 'Faruq Adrean',
  headline text not null default 'IT Developer & IT Support',
  email text,
  phone text,
  whatsapp text,
  location text,
  linkedin_url text,
  github_url text,
  instagram_url text,
  cv_url text,
  avatar_url text,
  open_to_work boolean not null default true,
  updated_at timestamptz not null default now(),
  constraint singleton check (id = 1)
);
insert into site_settings (id) values (1) on conflict (id) do nothing;

alter table site_settings enable row level security;
drop policy if exists "public read site_settings" on site_settings;
create policy "public read site_settings" on site_settings for select using (true);
drop policy if exists "admin write site_settings" on site_settings;
create policy "admin write site_settings" on site_settings
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 9. TESTIMONIALS -------------------------------------------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text,
  quote text not null,
  avatar_url text,
  project_id uuid references projects(id) on delete set null,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_testimonials_active on testimonials (active, sort_order);

alter table testimonials enable row level security;
drop policy if exists "public read testimonials" on testimonials;
create policy "public read testimonials" on testimonials for select using (true);
drop policy if exists "admin write testimonials" on testimonials;
create policy "admin write testimonials" on testimonials
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 12. POSTS (blog) -----------------------------------------
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  body text not null default '',
  cover_url text,
  tags text[] not null default '{}',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);
create index if not exists idx_posts_published on posts (published, published_at desc);

alter table posts enable row level security;
drop policy if exists "public read posts" on posts;
create policy "public read posts" on posts for select using (published = true);
drop policy if exists "admin all posts" on posts;
create policy "admin all posts" on posts
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 11. STORAGE BUCKET ---------------------------------------
-- Public bucket for avatar, CV, project thumbnails, testimonial avatars,
-- and post covers. Run once.
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "public read media" on storage.objects;
create policy "public read media" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "admin write media" on storage.objects;
create policy "admin write media" on storage.objects
  for all using (bucket_id = 'media' and auth.role() = 'authenticated')
  with check (bucket_id = 'media' and auth.role() = 'authenticated');

-- 13. HERO OBJECTS (floating logos/icons di hero) -----------
create table if not exists hero_objects (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  image_url text not null,
  size int not null default 56 check (size between 24 and 160),
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_hero_objects_active on hero_objects (active, sort_order);

alter table hero_objects enable row level security;
drop policy if exists "public read hero_objects" on hero_objects;
create policy "public read hero_objects" on hero_objects for select using (true);
drop policy if exists "admin write hero_objects" on hero_objects;
create policy "admin write hero_objects" on hero_objects
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 10. CERTIFICATIONS ---------------------------------------
create table if not exists certifications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  issuer text not null,
  year text not null,
  url text,
  sort_order int not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index if not exists idx_certifications_active on certifications (active, sort_order);

alter table certifications enable row level security;
drop policy if exists "public read certifications" on certifications;
create policy "public read certifications" on certifications for select using (true);
drop policy if exists "admin write certifications" on certifications;
create policy "admin write certifications" on certifications
  for all using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');
