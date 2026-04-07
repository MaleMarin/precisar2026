"use client";

import { useState } from "react";
import { useReducedMotion } from "framer-motion";
import { getPreguntaDiaPair, PREGUNTA_DIA_PUBLIC_BASE } from "@/lib/preguntaDiaAssets";
import styles from "./PreguntaDiaCards.module.css";

const COUNT = 30;

export function PreguntaDiaCards({ pdfHref }: { pdfHref: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section className={styles.section} aria-label="Tarjetas interactivas">
      <div
        className={`${styles.grid} ${reduceMotion ? styles.reduceMotion : ""}`}
        role="list"
        aria-label="Tarjetas numeradas"
      >
        {Array.from({ length: COUNT }, (_, i) => (
          <PreguntaCard
            key={i}
            index={i + 1}
            pair={getPreguntaDiaPair(i + 1)}
            reduceMotion={!!reduceMotion}
          />
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
  pair,
  reduceMotion,
}: {
  index: number;
  pair: [string, string] | null;
  reduceMotion: boolean;
}) {
  const n = String(index).padStart(2, "0");

  if (reduceMotion) {
    if (pair) {
      const frontSrc = `${PREGUNTA_DIA_PUBLIC_BASE}/${pair[0]}`;
      const backSrc = `${PREGUNTA_DIA_PUBLIC_BASE}/${pair[1]}`;
      return (
        <div
          role="listitem"
          className="flex min-h-0 flex-col gap-2 border border-[var(--border)] bg-[var(--elevated)] p-2"
        >
          <span className="font-[family-name:var(--font-display)] text-lg font-bold tabular-nums text-[var(--fg)]">
            {n}
          </span>
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-[var(--border)] bg-[var(--bg)]">
            <img
              src={frontSrc}
              alt={`Pregunta ${index}, frente`}
              className={styles.imageFill}
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="font-mono text-[0.65rem] uppercase leading-snug tracking-wide text-[var(--muted)]">
            Reverso (animación reducida):
          </p>
          <div className="relative aspect-[3/4] w-full overflow-hidden border border-[var(--border)] bg-[var(--fg)]">
            <img
              src={backSrc}
              alt={`Pregunta ${index}, reverso`}
              className={styles.imageFill}
              loading="lazy"
              decoding="async"
            />
          </div>
          <p className="font-mono text-[0.6rem] leading-snug text-[var(--muted-2)]">
            El PDF completo está al final de la página.
          </p>
        </div>
      );
    }
    return (
      <div
        role="listitem"
        className="flex aspect-[3/4] flex-col justify-between border border-[var(--border)] bg-[var(--elevated)] p-3"
      >
        <span className="font-[family-name:var(--font-display)] text-xl font-bold tabular-nums text-[var(--fg)]">
          {n}
        </span>
        <p className="font-mono text-[0.65rem] uppercase leading-snug tracking-wide text-[var(--muted)]">
          Pregunta {index}. Usá la descarga al final de la página.
        </p>
      </div>
    );
  }

  return (
    <div role="listitem" className="min-h-0">
      <FlipCard index={index} n={n} pair={pair} />
    </div>
  );
}

function FlipCard({
  index,
  n,
  pair,
}: {
  index: number;
  n: string;
  pair: [string, string] | null;
}) {
  const [open, setOpen] = useState(false);

  if (pair) {
    const frontSrc = `${PREGUNTA_DIA_PUBLIC_BASE}/${pair[0]}`;
    const backSrc = `${PREGUNTA_DIA_PUBLIC_BASE}/${pair[1]}`;
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
          <span className={`${styles.face} ${styles.front} ${styles.faceBleed}`}>
            <span className="sr-only">
              Pregunta {index}, frente. Toca para voltear.
            </span>
            <div className={styles.imageArea}>
              <img
                src={frontSrc}
                alt={`Pregunta ${index}, frente de la tarjeta`}
                className={styles.imageFill}
                loading="lazy"
                decoding="async"
              />
            </div>
            <span className={`${styles.hint} px-2 pb-1 pt-1`}>Toca para voltear</span>
          </span>
          <span className={`${styles.face} ${styles.back} ${styles.faceBleed}`}>
            <span className="sr-only">Pregunta {index}, reverso.</span>
            <div className={styles.imageArea}>
              <img
                src={backSrc}
                alt={`Pregunta ${index}, reverso de la tarjeta`}
                className={styles.imageFill}
                loading="lazy"
                decoding="async"
              />
            </div>
          </span>
        </span>
      </button>
    );
  }

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
            <span className={styles.backTitle}>Más en el PDF</span>
            <span className={styles.backText}>
              Reflexión, desafío y otra mirada: descargá el documento al final de esta página.
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}
