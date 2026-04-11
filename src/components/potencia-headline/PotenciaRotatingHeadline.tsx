"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { escapeHtml, useTextScramble } from "@/lib/use-text-scramble";
import {
  FLAME_SYNC_TO_VERB_MS,
  FLAME_VERB_PULSE_MS,
  STAIN_TO_CORNER_MS,
  VERB_CYCLE_GAP_MS,
  VERB_FLAME_IN_SCRAMBLE_FOLLOW_CSS,
  VERB_FLAME_SHOWN_DRIFT_CSS,
  VERB_SHOWN_MS,
  verbFlameToCornerCssDuration,
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
  /** Evita resetear `mode` en el primer mount (corría con el scramble y podía dejar el ciclo en "in"). */
  const lastLocaleResetRef = useRef<string | null>(null);
  /** Objetivo % mientras el verbo está fijo (`shown`): vaga por el hero. */
  const randomFlameRef = useRef({ x: 50, y: 45 });
  /** Inicio de `mode === "in"` para ventana de sync 0.4s y `--verb-flame-dur`. */
  const inModeStartedAtRef = useRef(0);

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
    /** Portada: scramble más corto que el default; la pausa fija la define `VERB_SHOWN_MS` en `heroVerbCycle.ts`. */
    swapQuick: scale === "precisarHome",
    onSettle: handleVerbSettle,
  });

  useEffect(() => {
    if (lastLocaleResetRef.current === null) {
      lastLocaleResetRef.current = locale;
      return;
    }
    if (lastLocaleResetRef.current === locale) return;
    lastLocaleResetRef.current = locale;
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

  useLayoutEffect(() => {
    if (mode === "in" && !reduceMotion) {
      inModeStartedAtRef.current = performance.now();
    }
  }, [mode, reduceMotion]);

  const applyFlamePosition = useCallback(() => {
    const container = flameSyncContainerRef?.current;
    if (!container) return;
    let x: number;
    let y: number;
    if (flameToCorner) {
      const c = flameExitCornerForIndex(index);
      x = c.x;
      y = c.y;
    } else if (mode === "shown" && !reduceMotion) {
      ({ x, y } = randomFlameRef.current);
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
  }, [flameSyncContainerRef, flameToCorner, onFlamePercent, index, mode, reduceMotion]);

  /** Mantiene `--verb-flame-dur` tras cada render del padre (el inline style lo resetea). */
  useEffect(() => {
    const el = flameSyncContainerRef?.current;
    if (!el || reduceMotion) return;
    let raf = 0;
    let lastDur = "";
    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      let dur: string;
      if (flameToCorner) {
        dur = verbFlameToCornerCssDuration();
      } else if (mode === "in") {
        const tIn = performance.now() - inModeStartedAtRef.current;
        dur =
          tIn < FLAME_SYNC_TO_VERB_MS ? `${FLAME_SYNC_TO_VERB_MS / 1000}s` : VERB_FLAME_IN_SCRAMBLE_FOLLOW_CSS;
      } else if (mode === "shown") {
        dur = VERB_FLAME_SHOWN_DRIFT_CSS;
      } else {
        dur = "0.72s";
      }
      if (dur !== lastDur) {
        el.style.setProperty("--verb-flame-dur", dur);
        lastDur = dur;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [flameSyncContainerRef, reduceMotion, mode, flameToCorner]);

  /** Durante `shown`, nueva posición aleatoria periódica en el hero. */
  useEffect(() => {
    if (reduceMotion || mode !== "shown" || !flameSyncContainerRef?.current) return;
    const container = flameSyncContainerRef.current;
    const verb = verbRef.current;
    if (verb) {
      const cr = container.getBoundingClientRect();
      const vr = verb.getBoundingClientRect();
      if (cr.width > 1 && cr.height > 1) {
        randomFlameRef.current = {
          x: ((vr.left + vr.width / 2 - cr.left) / cr.width) * 100,
          y: ((vr.top + vr.height / 2 - cr.top) / cr.height) * 100,
        };
      }
    }
    applyFlamePosition();

    let cancelled = false;
    let timeoutId = 0;

    const pickAndApply = () => {
      if (cancelled) return;
      randomFlameRef.current = {
        x: 14 + Math.random() * 72,
        y: 16 + Math.random() * 68,
      };
      applyFlamePosition();
      timeoutId = window.setTimeout(pickAndApply, 780 + Math.random() * 520);
    };

    timeoutId = window.setTimeout(pickAndApply, 520);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, [mode, reduceMotion, flameSyncContainerRef, applyFlamePosition]);

  /** Tras alinear con el verbo, pulso de resplandor en el contenedor hero. */
  useEffect(() => {
    const el = flameSyncContainerRef?.current;
    if (!el || reduceMotion || mode !== "in") return;
    const tPulseOn = window.setTimeout(() => {
      el.setAttribute("data-verb-flame-pulse", "");
    }, FLAME_SYNC_TO_VERB_MS);
    const tPulseOff = window.setTimeout(() => {
      el.removeAttribute("data-verb-flame-pulse");
    }, FLAME_SYNC_TO_VERB_MS + FLAME_VERB_PULSE_MS);
    return () => {
      window.clearTimeout(tPulseOn);
      window.clearTimeout(tPulseOff);
      el.removeAttribute("data-verb-flame-pulse");
    };
  }, [mode, index, reduceMotion, flameSyncContainerRef]);

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
