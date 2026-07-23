import { ImageResponse } from "next/og";
import { getSiteSettings } from "@/lib/site-settings";

export const runtime = "nodejs";
export const alt = "Faruq Adrean — IT Developer & IT Support";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const s = await getSiteSettings();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #0b1220 0%, #0f172a 50%, #111827 100%)",
          color: "#e5e7eb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#22d3ee",
              boxShadow: "0 0 24px #22d3ee",
            }}
          />
          <div style={{ fontSize: 22, color: "#94a3b8", letterSpacing: 2 }}>
            {s.open_to_work ? "OPEN TO WORK" : "PORTFOLIO"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 84, fontWeight: 600, lineHeight: 1.05 }}>
            {s.full_name}
          </div>
          <div style={{ fontSize: 44, color: "#22d3ee", lineHeight: 1.15 }}>
            {s.headline}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#94a3b8",
              maxWidth: 980,
              lineHeight: 1.4,
            }}
          >
            Problem solver. Membangun web & aplikasi, memperbaiki perangkat
            elektronik. Selalu memberikan yang terbaik.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#64748b",
          }}
        >
          <div>{s.location ?? "Malang, Indonesia"}</div>
          <div style={{ fontFamily: "monospace" }}>{"</>"} faruq.dev</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
