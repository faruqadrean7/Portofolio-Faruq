import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/sections/Nav";

export const metadata = {
  title: "Halaman tidak ditemukan",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="flex min-h-[80vh] items-center pt-32 pb-24">
        <div className="container-page max-w-xl text-center">
          <div className="font-mono text-sm uppercase tracking-widest text-muted">
            404
          </div>
          <h1 className="mt-4 font-serif text-5xl leading-tight md:text-6xl">
            Halaman tidak ditemukan.
          </h1>
          <p className="mt-4 text-lg text-muted">
            Sepertinya tautan yang Anda buka sudah dipindah atau tidak ada.
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
    </>
  );
}
