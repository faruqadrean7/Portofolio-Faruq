"use client";

import { useEffect } from "react";

export function VisitTracker() {
  useEffect(() => {
    // Fire-and-forget. Failures are intentionally swallowed.
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname,
        referrer: document.referrer || "",
      }),
      keepalive: true,
    }).catch(() => {});
  }, []);

  return null;
}
