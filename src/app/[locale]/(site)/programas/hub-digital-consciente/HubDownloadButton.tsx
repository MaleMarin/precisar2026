"use client";

import { useTranslations } from "next-intl";

export function HubDownloadButton() {
  const t = useTranslations("programsHub.cylinder");

  return (
    <button
      type="button"
      onClick={() => window.print()}
      style={{
        alignSelf: "flex-start",
        marginBottom: "1.5rem",
        padding: "14px 24px",
        border: "none",
        borderRadius: "4px",
        background: "#DB5227",
        color: "#F5F2EC",
        fontFamily: 'var(--font-sans-family), sans-serif',
        fontSize: "12px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      {t("downloadButton")}
    </button>
  );
}
