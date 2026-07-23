"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactFormSchema, type ContactForm } from "@/lib/schemas";
import { Mail, MessageCircle, Github, Linkedin } from "lucide-react";
import type { SiteSettings } from "@/types/database";

export function Contact({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: { name: "", email: "", subject: "", body: "", website: "" },
  });

  async function onSubmit(data: ContactForm) {
    setStatus("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Gagal mengirim pesan");
      router.push("/thanks");
    } catch (e) {
      setStatus("error");
      setErrorMsg(e instanceof Error ? e.message : "Terjadi kesalahan");
    }
  }

  const wa = settings.whatsapp?.replace(/\D/g, "");

  return (
    <section id="contact" className="section bg-surface border-t border-line">
      <div className="container-page grid gap-12 md:grid-cols-2 md:gap-16">
        <div>
          <div className="eyebrow">Kontak</div>
          <h2 className="mt-3 text-4xl leading-tight md:text-5xl">
            Tertarik kerja sama?
            <br />
            <span className="italic text-accent">Mari bicarakan.</span>
          </h2>
          <p className="mt-6 max-w-md text-lg text-muted">
            Saya membaca setiap pesan dan biasanya membalas dalam 24 jam. Cocok
            untuk lamaran kerja, project freelance, kolaborasi, atau diskusi.
          </p>

          <div className="mt-8 space-y-3">
            {settings.email && (
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-3 rounded-xl border border-line p-4 transition hover:border-ink"
              >
                <Mail className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-sm text-muted">Email</div>
                  <div className="font-medium">{settings.email}</div>
                </div>
              </a>
            )}
            {wa && (
              <a
                href={`https://wa.me/${wa}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl border border-line p-4 transition hover:border-ink"
              >
                <MessageCircle className="h-5 w-5 text-accent" />
                <div>
                  <div className="text-sm text-muted">WhatsApp</div>
                  <div className="font-medium">+{wa}</div>
                </div>
              </a>
            )}
            {(settings.linkedin_url || settings.github_url) && (
              <div className="flex gap-3 pt-2">
                {settings.linkedin_url && (
                  <a
                    href={settings.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-line transition hover:border-ink"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {settings.github_url && (
                  <a
                    href={settings.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-line transition hover:border-ink"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-line bg-bg p-6 md:p-8"
        >
          {/* Honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            {...register("website")}
          />

          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted">Nama</label>
              <input className="input-field mt-1.5" {...register("name")} />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-muted">Email</label>
              <input className="input-field mt-1.5" type="email" {...register("email")} />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm text-muted">Subjek (opsional)</label>
              <input className="input-field mt-1.5" {...register("subject")} />
            </div>
            <div>
              <label className="text-sm text-muted">Pesan</label>
              <textarea
                className="input-field mt-1.5 min-h-[140px] resize-y"
                {...register("body")}
              />
              {errors.body && (
                <p className="mt-1 text-xs text-red-600">{errors.body.message}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-primary mt-6 w-full justify-center disabled:opacity-60"
          >
            {status === "submitting" ? "Mengirim..." : "Kirim Pesan"}
          </button>

          {status === "error" && (
            <p className="mt-4 text-sm text-red-600">{errorMsg ?? "Gagal mengirim."}</p>
          )}
        </form>
      </div>
    </section>
  );
}
