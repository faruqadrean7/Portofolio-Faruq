-- ============================================================
-- Add per-row JSONB translations to user-facing tables.
-- Run once in Supabase Dashboard > SQL Editor.
--
-- Shape of `translations` (all keys optional — fallback to default columns):
--   services:     { en: { title, description, bullets:[] }, ar: {...}, ja: {...}, zh: {...} }
--   skills:       { en: { name, description },               ar: {...}, ja: {...}, zh: {...} }
--   experiences:  { en: { period, role, org, description },  ar: {...}, ja: {...}, zh: {...} }
--   projects:     { en: { title, description, category },    ar: {...}, ja: {...}, zh: {...} }
--
-- The default ID columns (title/description/etc.) remain the source of truth
-- for Indonesian. Other locales read from `translations.<locale>.<field>`.
-- ============================================================

alter table services     add column if not exists translations jsonb not null default '{}'::jsonb;
alter table skills       add column if not exists translations jsonb not null default '{}'::jsonb;
alter table experiences  add column if not exists translations jsonb not null default '{}'::jsonb;
alter table projects     add column if not exists translations jsonb not null default '{}'::jsonb;
