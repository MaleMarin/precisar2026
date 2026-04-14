import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const alt = "Precisar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f5f3ed",
          padding: 72,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 20, height: 20, background: "#0c0c0b" }} />
          <span style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", color: "#0c0c0b" }}>
            Precisar
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <span style={{ fontSize: 42, fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.03em", color: "#0c0c0b" }}>
            {SITE.socialDefault.ogImageLine1}
          </span>
          <span style={{ fontSize: 22, color: "#5c5b54", lineHeight: 1.4 }}>
            {SITE.socialDefault.ogImageLine2}
          </span>
        </div>
        <div style={{ width: 120, height: 4, background: "#b83812" }} />
      </div>
    ),
    { ...size },
  );
}
