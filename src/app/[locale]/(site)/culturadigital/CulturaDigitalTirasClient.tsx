"use client";

import type { CSSProperties } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./CulturaDigitalTiras.module.css";
import { CULTURA_DIGITAL_HOME_COLORS, CULTURA_DIGITAL_STRIPS, type CulturaDigitalStrip } from "./data";

function playIfReady(synth: { triggerAttackRelease: (n: string, d: string) => void } | null, note: string) {
  try {
    synth?.triggerAttackRelease(note, "8n");
  } catch {
    /* ignore */
  }
}

function SectionPanel({
  d,
  phase,
  onBack,
  onNext,
}: {
  d: CulturaDigitalStrip;
  phase: "hidden" | "visible" | "exiting";
  onBack: () => void;
  onNext: () => void;
}) {
  const sectionClass =
    phase === "hidden"
      ? `${styles.contentSection} ${styles.hidden}`
      : phase === "exiting"
        ? `${styles.contentSection} ${styles.exiting}`
        : `${styles.contentSection} ${styles.visible}`;

  return (
    <section className={sectionClass} aria-labelledby={`cd-h1-${d.slug}`} role="region">
      <div className={styles.innerScroll}>
        <div className={styles.contentMeasure}>
          <h1 id={`cd-h1-${d.slug}`} className={styles.displayH1}>
            {d.h1}
          </h1>
          {d.subhead ? <p className={styles.subhead}>{d.subhead}</p> : null}
          {d.body ? <p className={styles.bodyText}>{d.body}</p> : null}
          <div className={styles.grid2}>
            <div>
              {d.left_title ? <h2 className={styles.sectionH2}>{d.left_title}</h2> : null}
              <ul className={styles.listLeft}>
                {d.left_bullets.map((t) => (
                  <li key={t.slice(0, 48)}>
                    <span className={styles.bulletDot} aria-hidden />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.colRight}>
              {d.right_title ? <h2 className={styles.sectionH2}>{d.right_title}</h2> : null}
              <ul className={styles.listRight}>
                {d.right_bullets.map((t) => (
                  <li key={t.slice(0, 48)}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <footer className={styles.contentFooter} style={{ backgroundColor: d.palette }}>
        <div className={styles.footerNav}>
          <button type="button" className={styles.footerBtn} onClick={onBack}>
            ← Volver
          </button>
          <button type="button" className={styles.footerBtn} onClick={onNext}>
            Seguir →
          </button>
        </div>
      </footer>
    </section>
  );
}

export function CulturaDigitalTirasClient() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [mouse, setMouse] = useState({ x: "50%", y: "50%" });
  const busyRef = useRef(false);
  const synthRef = useRef<{ triggerAttackRelease: (n: string, d: string) => void } | null>(null);

  const initSound = useCallback(async () => {
    if (typeof window === "undefined" || synthRef.current) return;
    const Tone = await import("tone");
    await Tone.start();
    synthRef.current = new Tone.Synth({
      oscillator: { type: "sine" },
      envelope: { attack: 0.01, decay: 0.2, sustain: 0.25, release: 1.2 },
    }).toDestination();
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({ x: `${e.clientX}px`, y: `${e.clientY}px` });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const phaseFor = (slug: string): "hidden" | "visible" | "exiting" => {
    if (activeSlug !== slug) return "hidden";
    return leaving ? "exiting" : "visible";
  };

  const goToSlug = useCallback(
    (slug: string): boolean => {
      if (busyRef.current) return false;
      void initSound();

      if (activeSlug === null) {
        setActiveSlug(slug);
        setLeaving(false);
        playIfReady(synthRef.current, "A4");
        return true;
      }

      if (activeSlug === slug) return false;

      busyRef.current = true;
      setLeaving(true);
      window.setTimeout(() => {
        setActiveSlug(slug);
        setLeaving(false);
        playIfReady(synthRef.current, "A4");
        busyRef.current = false;
      }, 400);
      return true;
    },
    [activeSlug, initSound],
  );

  const goHome = useCallback(() => {
    if (busyRef.current || activeSlug === null) return;
    busyRef.current = true;
    void initSound();
    setLeaving(true);
    window.setTimeout(() => {
      setActiveSlug(null);
      setLeaving(false);
      busyRef.current = false;
    }, 400);
  }, [activeSlug, initSound]);

  const goNext = useCallback(() => {
    if (activeSlug === null) return;
    const idx = CULTURA_DIGITAL_STRIPS.findIndex((d) => d.slug === activeSlug);
    const next = CULTURA_DIGITAL_STRIPS[(idx + 1) % CULTURA_DIGITAL_STRIPS.length];
    if (!goToSlug(next.slug)) return;
    playIfReady(synthRef.current, "D5");
  }, [activeSlug, goToSlug]);

  const showHomeChrome = activeSlug === null && !leaving;

  return (
    <div
      className={`${styles.root} ${showHomeChrome ? styles.homeBg : styles.sectionBg}`}
      style={
        {
          "--mouse-x": mouse.x,
          "--mouse-y": mouse.y,
        } as CSSProperties
      }
    >
      <p className={styles.skipHint}>
        Treinta y seis tiras: elegí un tema para leer reflexiones y acciones sugeridas.
      </p>

      <div
        className={`${styles.titleAboveStrips} ${!showHomeChrome ? styles.titleAboveStripsHidden : ""}`}
      >
        <h1 className={styles.pageTitleTop}>Cultura Digital</h1>
      </div>

      <div
        className={`${styles.stripsContainer} ${!showHomeChrome ? styles.stripsHidden : ""}`}
        role="navigation"
        aria-label="Temas de cultura digital"
      >
        {CULTURA_DIGITAL_STRIPS.map((d, i) => (
          <button
            key={d.slug}
            type="button"
            className={styles.stripLink}
            style={{
              animationDelay: `${i * 0.05}s`,
              animationDuration: `${(0.8 + (i % 5) * 0.08).toFixed(2)}s`,
            }}
            onClick={() => goToSlug(d.slug)}
          >
            <div className={styles.stripContent} style={{ backgroundColor: CULTURA_DIGITAL_HOME_COLORS[i] }}>
              <div className={styles.verticalText}>{d.h1}</div>
            </div>
          </button>
        ))}
      </div>

      <div className={`${styles.lightEffect} ${!showHomeChrome ? styles.lightHidden : ""}`} aria-hidden />

      <div
        className={`${styles.overlayTitle} ${!showHomeChrome ? styles.overlayHidden : ""}`}
        aria-hidden="true"
      >
        <p className={styles.outlineTitle}>Cultura Digital</p>
      </div>

      <div className={`${styles.mainStage} ${!showHomeChrome ? styles.mainStageOpen : ""}`}>
        {CULTURA_DIGITAL_STRIPS.map((d) => (
          <SectionPanel
            key={d.slug}
            d={d}
            phase={phaseFor(d.slug)}
            onBack={goHome}
            onNext={goNext}
          />
        ))}
      </div>
    </div>
  );
}
