"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center pt-24 pb-24">
      <div className="container-page max-w-xl text-center">
        <div className="font-mono text-sm uppercase tracking-widest text-muted">
          500
        </div>
        <h1 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
          Ada yang salah di sisi kami.
        </h1>
        <p className="mt-4 text-lg text-muted">
          Coba muat ulang halaman. Jika masih bermasalah, kembali ke beranda.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-muted">
            ref: {error.digest}
          </p>
        )}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button onClick={reset} className="btn-primary">
            <RotateCcw className="h-4 w-4" /> Muat ulang
          </button>
          <Link href="/" className="btn-outline">
            <Home className="h-4 w-4" /> Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
