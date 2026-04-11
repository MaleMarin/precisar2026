"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { escapeHtml, useTextScramble } from "@/lib/use-text-scramble";
import {
  STAIN_TO_CORNER_MS,
  VERB_CYCLE_GAP_MS,
  VERB_SHOWN_MS,
} from "./heroVerbCycle";
import styles from "./PotenciaHeadline.module.css";

/**
 * Puntos de salida de la mancha (% del contenedor hero), en orden rotativo por verbo.
 * Repartidos por los bordes para que no siempre salga del mismo lado.
 */
const FLAME_EXIT_CORNERS = [
  { x: 88, y: 12 },
  { x: 12, y: 14 },
  { x: 92, y: 76 },
  { x: 10, y: 80 },
  { x: 50, y: 7 },
  { x: 7, y: 48 },
  { x: 93, y: 44 },
] as const;

/** Esquina de salida asociada al verbo actual. */
export function flameExitCornerForIndex(i: number): { x: number; y: number } {
  return FLAME_EXIT_CORNERS[((i % FLAME_EXIT_CORNERS.length) + FLAME_EXIT_CORNERS.length) % FLAME_EXIT_CORNERS.length];
}

export type PotenciaHeadlineSurface = "light" | "dark";

/** `home`: tipografía grande del inicio inmersivo. `lab`: Explora. `precisarHome`: portada con stack. */
export type PotenciaHeadlineScale = "home" | "lab" | "precisarHome";

export function PotenciaRotatingHeadline({
  reduceMotion,
  surface,
  scale = "home",
  flameSyncContainerRef,
  onFlamePercent,
}: {
  reduceMotion: boolean;
  surface: PotenciaHeadlineSurface;
  scale?: PotenciaHeadlineScale;
  /** Contenedor (p.ej. `<header className={hero}>`) para medir el verbo respecto al hero. */
  flameSyncContainerRef?: React.RefObject<HTMLElement | null>;
  /** Explora: posición % + si el objetivo es el rincón (`stainOut` / `out`). */
  onFlamePercent?: (p: { x: number; y: number; toCorner: boolean }) => void;
}) {
  const t = useTranslations("PotenciaHeadline");
  const locale = useLocale();
  const verbsRaw = t.raw("verbs");
  const verbs = Array.isArray(verbsRaw) && verbsRaw.length > 0 ? (verbsRaw as string[]) : ["—"];
  const verbCount = verbs.length;

  const [index, setIndex] = useState(0);
  const [mode, setMode] = useState<"in" | "shown" | "stainOut" | "out">(reduceMotion ? "shown" : "in");
  const [clientReady, setClientReady] = useState(false);
  const verbRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setClientReady(true);
    });
  }, []);

  const verbDud =
    surface === "dark" ? styles.scrambleDudVerbDark : styles.scrambleDudVerbLight;

  const currentVerb = verbs[index % verbCount];

  const handleVerbSettle = useCallback(() => {
    if (reduceMotion) return;
    setMode((m) => (m === "in" ? "shown" : m));
  }, [reduceMotion]);

  const verbHtml = useTextScramble(currentVerb, reduceMotion, verbDud, {
    enabled: clientReady,
    variant: "swap",
    swapResetKey: locale,
    swapQuick: scale === "precisarHome",
    onSettle: handleVerbSettle,
  });

  useEffect(() => {
    queueMicrotask(() => {
      setIndex(0);
      setMode(reduceMotion ? "shown" : "in");
    });
  }, [locale, reduceMotion]);

  /**
   * `stainOut`: mancha va al rincón, palabra naranja sigue quieta.
   * `out`: solo animación de salida del verbo (mancha ya en rincón).
   * `in` / `shown`: mancha en / hacia el verbo.
   */
  const flameToCorner = !reduceMotion && (mode === "stainOut" || mode === "out");

  const applyFlamePosition = useCallback(() => {
    const container = flameSyncContainerRef?.current;
    if (!container) return;
    let x: number;
    let y: number;
    if (flameToCorner) {
      const c = flameExitCornerForIndex(index);
      x = c.x;
      y = c.y;
    } else {
      const verb = verbRef.current;
      if (!verb) return;
      const cr = container.getBoundingClientRect();
      const vr = verb.getBoundingClientRect();
      if (cr.width < 1 || cr.height < 1) return;
      x = ((vr.left + vr.width / 2 - cr.left) / cr.width) * 100;
      y = ((vr.top + vr.height / 2 - cr.top) / cr.height) * 100;
      if (!Number.isFinite(x)) x = 50;
      if (!Number.isFinite(y)) y = 45;
    }
    onFlamePercent?.({ x, y, toCorner: flameToCorner });
    if (!onFlamePercent) {
      container.style.setProperty("--verb-flame-x", `${x}%`);
      container.style.setProperty("--verb-flame-y", `${y}%`);
    }
  }, [flameSyncContainerRef, flameToCorner, onFlamePercent, index]);

  useLayoutEffect(() => {
    const container = flameSyncContainerRef?.current;
    if (!container) return;
    let rafFollow = 0;
    let cancelled = false;

    const tickFollow = () => {
      applyFlamePosition();
      if (!cancelled && mode === "in" && !reduceMotion) {
        rafFollow = requestAnimationFrame(tickFollow);
      }
    };

    applyFlamePosition();
    if (mode === "in" && !reduceMotion) {
      rafFollow = requestAnimationFrame(tickFollow);
    }

    const ro = new ResizeObserver(() => applyFlamePosition());
    ro.observe(container);
    const v = verbRef.current;
    if (v) ro.observe(v);
    window.addEventListener("resize", applyFlamePosition);
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafFollow);
      ro.disconnect();
      window.removeEventListener("resize", applyFlamePosition);
    };
  }, [index, mode, reduceMotion, flameSyncContainerRef, applyFlamePosition]);

  useEffect(() => {
    if (reduceMotion) return;
    if (mode === "in") {
      if (!clientReady) {
        const id = window.setTimeout(() => setMode("shown"), 400);
        return () => window.clearTimeout(id);
      }
      return;
    }
    if (mode === "shown") {
      const id = window.setTimeout(() => setMode("stainOut"), VERB_SHOWN_MS);
      return () => window.clearTimeout(id);
    }
    if (mode === "stainOut") {
      const id = window.setTimeout(() => setMode("out"), STAIN_TO_CORNER_MS);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => {
      setIndex((i) => (i + 1) % verbCount);
      setMode("in");
    }, VERB_CYCLE_GAP_MS);
    return () => window.clearTimeout(id);
  }, [mode, reduceMotion, verbCount, clientReady]);

  const verbClass =
    reduceMotion || mode !== "out" ? styles.verbShown : styles.verbOut;

  const line1Class = surface === "dark" ? styles.line1Dark : styles.line1Light;
  const line1ListTypo = scale === "precisarHome" ? styles.line1PrecisarList : "";
  const line1CombinedClass = [line1Class, line1ListTypo].filter(Boolean).join(" ");
  const scaleClass =
    scale === "lab"
      ? styles.scaleLab
      : scale === "precisarHome"
        ? styles.scalePrecisarHome
        : styles.scaleHome;

  const line1 =
    scale === "lab" || scale === "precisarHome" ? (
      <>
        {t("lineLabA")}{" "}
        <br />
        {t("lineLabB")}
      </>
    ) : (
      t("lineHome")
    );

  return (
    <div className={`${styles.headline} ${scaleClass}`} aria-live="polite">
      <span className={line1CombinedClass}>{line1}</span>
      <span className={styles.line2}>
        <span className={styles.verbSlot}>
          <span key={index} className={`${verbClass} ${styles.verbLine}`}>
            <span ref={verbRef} className={styles.verbWord}>
              {clientReady ? (
                <span
                  dangerouslySetInnerHTML={{
                    __html: verbHtml || escapeHtml(currentVerb),
                  }}
                />
              ) : (
                currentVerb
              )}
            </span>
            <span
              className={surface === "dark" ? styles.verbPeriodWhite : styles.verbPeriodLight}
              aria-hidden
            >
              .
            </span>
          </span>
        </span>
      </span>
    </div>
  );
}
