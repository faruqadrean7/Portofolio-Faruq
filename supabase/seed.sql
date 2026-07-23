-- Seed data: 3 project unggulan dari versi HTML lama.
-- Run sekali setelah schema.sql.

insert into projects (slug, title, category, description, thumbnail_url, tags, featured, sort_order)
values
  (
    'ecommerce-umkm',
    'Sistem E-Commerce UMKM',
    'Web',
    'Platform toko online untuk usaha kecil dengan fitur manajemen produk, order, dan pembayaran digital.',
    null,
    array['PHP', 'MySQL', 'Bootstrap'],
    true,
    10
  ),
  (
    'sistem-informasi-manajemen',
    'Sistem Informasi Manajemen',
    'System',
    'Aplikasi manajemen data karyawan, laporan, dan monitoring real-time untuk perusahaan skala menengah.',
    null,
    array['Laravel', 'Vue.js', 'PostgreSQL'],
    true,
    20
  ),
  (
    'aplikasi-smart-home',
    'Aplikasi Smart Home',
    'App',
    'Kontrol perangkat rumah via smartphone dengan integrasi IoT sensor dan notifikasi real-time.',
    null,
    array['React Native', 'Node.js', 'IoT'],
    true,
    30
  )
on conflict (slug) do nothing;
