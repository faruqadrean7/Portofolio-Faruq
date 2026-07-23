"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function MarkReadButton({ id }: { id: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function onClick() {
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase
        .from("messages")
        .update({ read: true })
        .eq("id", id);
      if (error) {
        setError(error.message);
        return;
      }
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-3">
      {error && <span className="text-xs text-red-600">{error}</span>}
      <button
        onClick={onClick}
        disabled={pending}
        className="rounded-lg border border-line px-3 py-1.5 text-xs transition hover:border-ink disabled:opacity-60"
      >
        {pending ? "..." : "Tandai sudah dibaca"}
      </button>
    </div>
  );
}
