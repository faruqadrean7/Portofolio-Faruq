import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { Nav } from "@/components/sections/Nav";
import { Footer } from "@/components/sections/Footer";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata = {
  title: "Pesan terkirim — Faruq Adrean",
  description: "Terima kasih, pesan Anda sudah saya terima.",
  robots: { index: false, follow: false },
};

export default async function ThanksPage() {
  const settings = await getSiteSettings();
  return (
    <>
      <Nav />
      <main className="flex min-h-[70vh] items-center pt-32 pb-24">
        <div className="container-page max-w-xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-soft text-accent">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <h1 className="mt-6 font-serif text-4xl leading-tight md:text-5xl">
            Pesan terkirim.
          </h1>
          <p className="mt-4 text-lg text-muted">
            Terima kasih sudah menghubungi. Saya akan baca dan balas via email
            dalam 24 jam — biasanya jauh lebih cepat.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn-primary">
              <ArrowLeft className="h-4 w-4" /> Kembali ke beranda
            </Link>
            <Link href="/blog" className="btn-outline">
              Baca tulisan
            </Link>
          </div>
        </div>
      </main>
      <Footer settings={settings} />
    </>
  );
}
