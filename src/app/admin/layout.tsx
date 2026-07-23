import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-bg">
      <header className="border-b border-line bg-surface">
        <div className="container-page flex h-14 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-serif text-base">
              Admin
            </Link>
            <nav className="flex gap-5 text-sm text-muted">
              <Link href="/admin" className="hover:text-ink">Overview</Link>
              <Link href="/admin/settings" className="hover:text-ink">Settings</Link>
              <Link href="/admin/projects" className="hover:text-ink">Projects</Link>
              <Link href="/admin/posts" className="hover:text-ink">Blog</Link>
              <Link href="/admin/services" className="hover:text-ink">Services</Link>
              <Link href="/admin/skills" className="hover:text-ink">Skills</Link>
              <Link href="/admin/experiences" className="hover:text-ink">Experience</Link>
              <Link href="/admin/testimonials" className="hover:text-ink">Testimonials</Link>
              <Link href="/admin/certifications" className="hover:text-ink">Certs</Link>
              <Link href="/admin/hero-objects" className="hover:text-ink">Hero</Link>
              <Link href="/admin/messages" className="hover:text-ink">Messages</Link>
              <Link href="/admin/analytics" className="hover:text-ink">Analytics</Link>
            </nav>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted">
            <span className="hidden md:inline">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="container-page py-10">{children}</main>
    </div>
  );
}
