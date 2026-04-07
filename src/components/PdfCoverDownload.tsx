"use client";

import { useState } from "react";
import styles from "./PdfCoverDownload.module.css";

export type PdfCoverDownloadProps = {
  pdfHref: string;
  coverSrc: string;
  coverAlt: string;
  description: string;
  ctaLabel?: string;
  /** Añade clase al wrapper para integrar en layouts existentes */
  className?: string;
  compact?: boolean;
};

export function PdfCoverDownload({
  pdfHref,
  coverSrc,
  coverAlt,
  description,
  ctaLabel = "Descargar PDF",
  className = "",
  compact = false,
}: PdfCoverDownloadProps) {
  const [coverFailed, setCoverFailed] = useState(false);

  return (
    <div className={`${compact ? styles.compact : ""} ${className}`.trim()}>
      <div className={styles.block}>
        <a href={pdfHref} target="_blank" rel="noreferrer" className={styles.coverLink} aria-label={`${ctaLabel} — ${coverAlt}`}>
          {!coverFailed ? (
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
          )}
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
