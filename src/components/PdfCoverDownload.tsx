"use client";

import { useState } from "react";
import type { PdfPreviewMode } from "@/lib/pdfDownloads";
import styles from "./PdfCoverDownload.module.css";

function pdfFirstPageUrl(href: string): string {
  if (href.includes("#")) return href;
  return `${href}#page=1&toolbar=0&navpanes=0`;
}

export type PdfCoverDownloadProps = {
  pdfHref: string;
  coverAlt: string;
  description: string;
  ctaLabel?: string;
  className?: string;
  compact?: boolean;
  /** `image`: `coverSrc` requerida. `embed`: primera página vía iframe (mismo origen o PDFs servidos sin X-Frame-Options restrictivo). */
  preview?: PdfPreviewMode;
  coverSrc?: string;
  /** Texto sobre fondos oscuros (p. ej. panel Saberes u Hub ediciones). */
  tone?: "default" | "onDark";
};

export function PdfCoverDownload({
  pdfHref,
  coverAlt,
  description,
  ctaLabel = "Descargar PDF",
  className = "",
  compact = false,
  preview = "image",
  coverSrc = "",
  tone = "default",
}: PdfCoverDownloadProps) {
  const [coverFailed, setCoverFailed] = useState(false);
  const wrapClass = [
    compact ? styles.compact : "",
    tone === "onDark" ? styles.onDark : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const coverInner =
    preview === "embed" ? (
      <span className={styles.coverEmbedShell}>
        <iframe
          src={pdfFirstPageUrl(pdfHref)}
          title={coverAlt}
          className={styles.coverIframe}
          loading="lazy"
        />
      </span>
    ) : !coverFailed ? (
      <img
        src={coverSrc}
        alt={coverAlt}
        className={styles.coverImg}
        width={400}
        height={566}
        loading="lazy"
        decoding="async"
        onError={() => setCoverFailed(true)}
      />
    ) : (
      <span className={styles.coverFallback} role="img" aria-label={coverAlt}>
        PDF
      </span>
    );

  return (
    <div className={wrapClass.trim()}>
      <div className={styles.block}>
        <a
          href={pdfHref}
          target="_blank"
          rel="noreferrer"
          className={styles.coverLink}
          aria-label={`${ctaLabel} — ${coverAlt}`}
        >
          {coverInner}
        </a>
        <div className={styles.body}>
          <p className={styles.text}>{description}</p>
          <a href={pdfHref} target="_blank" rel="noreferrer" className={styles.cta}>
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
