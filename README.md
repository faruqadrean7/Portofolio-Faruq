# Faruq Adrean — Portfolio

Portfolio personal dengan **Next.js 15 (App Router) + TypeScript + Tailwind + Supabase**.
Mendukung CMS untuk projects, contact form yang tersimpan ke database, admin auth, dan visitor analytics — semuanya bisa dikelola lewat dashboard `/admin` tanpa edit kode.

## Fitur

- Landing page dengan palet **Editorial Light** (off-white + ink + deep navy)
- Section: Hero, Stats, About, Services, Skills, Experience, Projects, Process, Contact
- Projects fetched dari Supabase (CMS)
- Contact form → tabel `messages` di Supabase
- Visitor analytics → tabel `visits`
- Dashboard admin di `/admin`: overview, CRUD projects, baca pesan, lihat analytics 30 hari
- Auth Supabase email + password (admin saja, tidak ada signup public)

## Stack

- Next.js 15 · React 19 · TypeScript (strict)
- Tailwind CSS v3 · Framer Motion · Lucide icons
- Supabase (Postgres + Auth + RLS) via `@supabase/ssr`
- React Hook Form + Zod

## Setup

### 1. Install dependencies

```bash
pnpm install
# atau: npm install / yarn install
```

### 2. Buat project Supabase

1. Buka <https://supabase.com>, **New Project**.
2. Buka **Project Settings → API**, salin:
   - `Project URL`
   - `anon public` key
   - `service_role` key (rahasia)

### 3. Setup database

Buka **SQL Editor** di Supabase dashboard, lalu:

1. Paste isi `supabase/schema.sql` → **Run**.
2. (Opsional) Paste `supabase/seed.sql` → **Run** untuk mengisi 3 project contoh.

### 4. Buat user admin

Di Supabase: **Authentication → Users → Add user → Create new user**.
Isi email + password yang kuat. Tidak ada halaman signup public — admin dibuat manual di sini.

### 5. Environment variables

```bash
cp .env.local.example .env.local
```

Isi `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> **PENTING**: `SUPABASE_SERVICE_ROLE_KEY` bypass RLS — jangan pernah ditaruh di variabel `NEXT_PUBLIC_*` dan jangan commit `.env.local`.

### 6. Jalankan dev server

```bash
pnpm dev
```

Buka <http://localhost:3000>.

### 7. Akses admin

<http://localhost:3000/login> → masuk dengan email + password yang dibuat di langkah 4.

## Deploy ke Vercel

1. Push repo ke GitHub.
2. <https://vercel.com> → **Import Project**.
3. Set 4 env vars yang sama seperti `.env.local`, ganti `NEXT_PUBLIC_SITE_URL` ke domain produksi.
4. Deploy.

## Struktur project

```
src/
├── app/
│   ├── page.tsx              # Landing (RSC, fetch projects)
│   ├── layout.tsx            # Root layout, fonts, metadata
│   ├── globals.css           # Palet Editorial Light + Tailwind
│   ├── login/                # Halaman login admin
│   ├── admin/                # Dashboard (protected)
│   │   ├── projects/         # CRUD projects
│   │   ├── messages/         # Inbox kontak
│   │   └── analytics/        # Visits 30 hari
│   └── api/
│       ├── contact/          # POST simpan ke messages
│       └── analytics/        # POST simpan ke visits
├── components/
│   ├── sections/             # Nav, Hero, About, Services, Skills, dll
│   └── VisitTracker.tsx      # Fire POST /api/analytics on mount
├── lib/
│   ├── supabase/
│   │   ├── client.ts         # Browser client
│   │   ├── server.ts         # Server client (cookies)
│   │   └── admin.ts          # Service-role client (server only!)
│   ├── schemas.ts            # Zod schemas
│   └── utils.ts
├── types/database.ts         # Type schema database
└── middleware.ts             # Refresh session token

supabase/
├── schema.sql                # Tables + RLS policies
└── seed.sql                  # Seed projects awal
```

## TODO sebelum production

- [ ] Ganti email kontak (`hello@faruqadrean.dev`) di `src/components/sections/Contact.tsx`
- [ ] Ganti nomor WhatsApp (`62xxx`) di `src/components/sections/Contact.tsx`
- [ ] Isi link LinkedIn & GitHub di `src/components/sections/Contact.tsx`
- [ ] Upload `public/avatar.jpg` (opsional, ganti placeholder inisial "FA")
- [ ] Upload `public/cv-faruq-adrean.pdf` (opsional, untuk tombol download CV)
- [ ] Upload `public/og-image.png` (1200×630, untuk preview share medsos)
- [ ] Custom domain di Vercel + update `NEXT_PUBLIC_SITE_URL`

## License

© 2026 Faruq Adrean. Personal use only.
# Portofolio-Faruq
