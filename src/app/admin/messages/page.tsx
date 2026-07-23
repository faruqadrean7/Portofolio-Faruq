import { createClient } from "@/lib/supabase/server";
import type { MessageRow } from "@/types/database";
import { formatDate } from "@/lib/utils";
import { MarkReadButton } from "./mark-read-button";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("messages")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  const messages = (data as MessageRow[] | null) ?? [];

  return (
    <div>
      <h1 className="font-serif text-3xl">Messages</h1>
      <p className="mt-2 text-sm text-muted">
        100 pesan terakhir dari form kontak.
      </p>

      <div className="mt-8 space-y-4">
        {messages.length === 0 && (
          <div className="rounded-2xl border border-dashed border-line p-12 text-center text-muted">
            Belum ada pesan masuk.
          </div>
        )}
        {messages.map((m) => (
          <article
            key={m.id}
            className={`rounded-2xl border bg-surface p-5 ${m.read ? "border-line" : "border-accent/40"}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="font-medium">
                  {m.name}{" "}
                  {!m.read && (
                    <span className="ml-2 rounded-full bg-accent px-2 py-0.5 text-xs text-white">
                      Baru
                    </span>
                  )}
                </div>
                <div className="text-sm text-muted">{m.email}</div>
              </div>
              <div className="text-xs text-muted">{formatDate(m.created_at)}</div>
            </div>
            {m.subject && (
              <div className="mt-3 text-sm font-medium">{m.subject}</div>
            )}
            <p className="mt-2 whitespace-pre-wrap text-sm text-ink">{m.body}</p>
            {!m.read && (
              <div className="mt-4 flex justify-end">
                <MarkReadButton id={m.id} />
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
}
