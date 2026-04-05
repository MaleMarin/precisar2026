"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./PreguntaDiaCards.module.css";

const COUNT = 30;

export function PreguntaDiaCards({ pdfHref }: { pdfHref: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-labelledby="pregunta-dia-grid-title">
      <div className={styles.sectionHead}>
        <h2 id="pregunta-dia-grid-title" className={styles.sectionTitle}>
          Las 30 preguntas, tarjeta por tarjeta
        </h2>
        <p className={styles.sectionLead}>
          Tocá o hacé clic para voltear. En el PDF encontrás el texto completo de cada pregunta y el
          reverso con ideas, desafíos y otras miradas — como en{" "}
          <a
            href="https://www.precisar.net/unapreguntaaldia"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--accent)] underline underline-offset-2"
          >
            precisar.net
          </a>
          .
        </p>
      </div>
      <div
        className={`${styles.grid} ${reduceMotion ? styles.reduceMotion : ""}`}
        role="list"
        aria-label="Treinta tarjetas numeradas"
      >
        {Array.from({ length: COUNT }, (_, i) => (
          <PreguntaCard key={i} index={i + 1} pdfHref={pdfHref} reduceMotion={!!reduceMotion} />
        ))}
      </div>
      <div className={styles.footerStrip}>
        <p>Descargá el recurso completo para imprimir, proyectar o compartir en clase o en familia.</p>
        <a
          href={pdfHref}
          target="_blank"
          rel="noreferrer"
          className="prec-btn border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] hover:opacity-90"
        >
          DESCARGA PDF
        </a>
      </div>
    </section>
  );
}

function PreguntaCard({
  index,
  pdfHref,
  reduceMotion,
}: {
  index: number;
  pdfHref: string;
  reduceMotion: boolean;
}) {
  const n = String(index).padStart(2, "0");

  if (reduceMotion) {
    return (
      <div
        role="listitem"
        className="flex aspect-[3/4] flex-col justify-between border border-[var(--border)] bg-[var(--elevated)] p-3"
      >
        <span className="font-[family-name:var(--font-display)] text-xl font-bold tabular-nums text-[var(--fg)]">
          {n}
        </span>
        <p className="font-mono text-[7px] uppercase leading-snug tracking-wider text-[var(--muted)]">
          Pregunta {index}. Contenido en el PDF.
        </p>
        <a
          href={pdfHref}
          target="_blank"
          rel="noreferrer"
          className="mt-2 font-mono text-[8px] font-semibold uppercase tracking-wider text-[var(--accent)] underline underline-offset-2"
        >
          Abrir PDF
        </a>
      </div>
    );
  }

  return (
    <div role="listitem" className="min-h-0">
      <FlipCard index={index} n={n} pdfHref={pdfHref} />
    </div>
  );
}

function FlipCard({ index, n, pdfHref }: { index: number; n: string; pdfHref: string }) {
  const [open, setOpen] = useState(false);

  return (
    <button
      type="button"
      className={styles.card}
      data-open={open}
      aria-expanded={open}
      aria-label={
        open
          ? `Pregunta ${index}, reverso visible. Clic para volver al frente.`
          : `Pregunta ${index}. Clic para ver el reverso.`
      }
      onClick={() => setOpen((o) => !o)}
    >
      <span className={styles.inner}>
        <span className={`${styles.face} ${styles.front}`}>
          <span className={styles.num}>{n}</span>
          <span className={styles.hint}>Pregunta · toca para voltear</span>
        </span>
        <span className={`${styles.face} ${styles.back}`}>
          <span className={styles.num}>{n}</span>
          <span>
            <span className={styles.backTitle}>Reverso en el PDF</span>
            <span className={styles.backText}>
              Reflexión, desafío y otra mirada sobre tu vida digital están en el documento descargable.
            </span>
          </span>
          <a
            href={pdfHref}
            target="_blank"
            rel="noreferrer"
            className={styles.pdfLink}
            onClick={(e) => e.stopPropagation()}
          >
            Ver en PDF
          </a>
        </span>
      </span>
    </button>
  );
}
