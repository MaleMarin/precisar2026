"use client";

import type { CSSProperties, RefObject } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import {
  STAIN_TO_CORNER_MS,
  VERB_CYCLE_GAP_MS,
  VERB_SHOWN_MS,
} from "@/components/potencia-headline/heroVerbCycle";
import headline from "@/components/potencia-headline/PotenciaHeadline.module.css";
import { escapeHtml, useTextScramble } from "@/lib/use-text-scramble";
import styles from "../PrecisarHome.module.css";
import { HeroFlameMoteTrack } from "./HeroFlameMoteTrack";

const FLAME_PATH = ["wordStart", "wordEnd", "corner"] as const;
type FlameStation = (typeof FLAME_PATH)[number];

const FLAME_LEG_MS = 2600;
const FLAME_TRAVEL_CSS = "2.5s";
const FLAME_CORNER = { x: 92, y: 8 };

function percentInHero(
  container: HTMLElement,
  el: HTMLElement,
  station: FlameStation,
): { x: number; y: number } | null {
  if (station === "corner") return FLAME_CORNER;
  const cr = container.getBoundingClientRect();
  const r = el.getBoundingClientRect();
  if (cr.width < 1 || cr.height < 1) return null;
  const along = station === "wordStart" ? 0.08 : 0.92;
  const x = ((r.left + r.width * along - cr.left) / cr.width) * 100;
  const y = ((r.top + r.height / 2 - cr.top) / cr.height) * 100;
  if (!Number.isFinite(x) || !Number.isFinite(y)) return null;
  return { x, y };
}

function CauseFlameWord({
  word,
  reduceMotion,
  wordRef,
}: {
  word: string;
  reduceMotion: boolean;
  wordRef: RefObject<HTMLSpanElement | null>;
}) {
  const locale = useLocale();
  const [cycle, setCycle] = useState(0);
  const [mode, setMode] = useState<"in" | "shown" | "stainOut" | "out">(reduceMotion ? "shown" : "in");
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setClientReady(true);
    });
  }, []);

  const handleSettle = useCallback(() => {
    if (reduceMotion) return;
    setMode((m) => (m === "in" ? "shown" : m));
  }, [reduceMotion]);

  const verbHtml = useTextScramble(word, reduceMotion, styles.causeScrambleDud, {
    enabled: clientReady,
    variant: "swap",
    swapResetKey: `${locale}-${cycle}`,
    swapStartMax: 16,
    swapSpanMax: 22,
    swapTickEvery: 1,
    dudRefresh: 0.08,
    onSettle: handleSettle,
  });

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
      setCycle((c) => c + 1);
      setMode("in");
    }, VERB_CYCLE_GAP_MS);
    return () => window.clearTimeout(id);
  }, [mode, reduceMotion, clientReady]);

  const verbClass = reduceMotion || mode !== "out" ? headline.verbShown : headline.verbOut;

  return (
    <span ref={wordRef} className={styles.causeFlameRow}>
      <span className={styles.causeFlameSizer} aria-hidden>
        {word}.
      </span>
      <span key={cycle} className={`${verbClass} ${headline.verbLine} ${styles.causeFlameAnim}`}>
        <span className={`${headline.verbWord} ${styles.causeFlameWord}`}>
          {clientReady ? (
            <span
              dangerouslySetInnerHTML={{
                __html: verbHtml || escapeHtml(word),
              }}
            />
          ) : (
            word
          )}
        </span>
        <span className={styles.causeFlamePeriod} aria-hidden>
          .
        </span>
      </span>
    </span>
  );
}

export function PrecisarHomeCauseHero() {
  const t = useTranslations("HomeHero");
  const heroFlameRef = useRef<HTMLElement | null>(null);
  const wordRef = useRef<HTMLSpanElement | null>(null);
  const [heroFlame, setHeroFlame] = useState({ x: 22, y: 42 });
  const [flameStep, setFlameStep] = useState(0);
  const reduceMotion = useReducedMotion() ?? false;
  const flameWord = t("h1Line2");
  const flameAt = FLAME_PATH[flameStep % FLAME_PATH.length]!;

  const applyFlamePosition = useCallback(() => {
    const container = heroFlameRef.current;
    if (!container) return;
    if (flameAt === "corner") {
      setHeroFlame(FLAME_CORNER);
      container.style.setProperty("--verb-flame-dur", FLAME_TRAVEL_CSS);
      return;
    }
    const word = wordRef.current;
    if (!word) return;
    const next = percentInHero(container, word, flameAt);
    if (!next) return;
    setHeroFlame(next);
    container.style.setProperty("--verb-flame-dur", FLAME_TRAVEL_CSS);
  }, [flameAt]);

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setFlameStep((s) => s + 1);
    }, FLAME_LEG_MS);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useLayoutEffect(() => {
    applyFlamePosition();
    const container = heroFlameRef.current;
    if (!container) return;
    const ro = new ResizeObserver(() => applyFlamePosition());
    ro.observe(container);
    const word = wordRef.current;
    if (word) ro.observe(word);
    window.addEventListener("resize", applyFlamePosition);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", applyFlamePosition);
    };
  }, [applyFlamePosition]);

  return (
    <header
      ref={heroFlameRef}
      className={`${styles.hero} ${styles.causeFlameHost}`}
      style={
        {
          ["--verb-flame-x" as string]: `${heroFlame.x}%`,
          ["--verb-flame-y" as string]: `${heroFlame.y}%`,
          ["--verb-flame-dur" as string]: FLAME_TRAVEL_CSS,
        } as CSSProperties
      }
    >
      {!reduceMotion ? (
        <>
          <HeroFlameMoteTrack
            className={styles.heroFlameMote}
            targetX={heroFlame.x}
            targetY={heroFlame.y}
            followGain={0.011}
          />
          <div className={`${styles.heroOrb} ${styles.heroOrb2}`} aria-hidden />
        </>
      ) : null}
      <div className={`${styles.heroInner} ${styles.causeHeroInner}`}>
        <div className={styles.causeHero}>
          <h1 className={styles.causeH1SrOnly}>{t("h1Accessible")}</h1>
          <p className={styles.causeTitleVisual} aria-hidden="true">
            <span className={styles.causeTitleLine}>{t("h1Line1")}</span>
            <span className={styles.causeTitleLine}>{t("h1Line1b")}</span>
            <span className={`${styles.causeTitleLine} ${styles.causeTitleLineFlame}`}>
              <CauseFlameWord word={flameWord} reduceMotion={reduceMotion} wordRef={wordRef} />
            </span>
          </p>
          <div className={styles.causeCopy}>
            <div className={styles.causeLead}>
              <p className={styles.causeLeadLine}>{t("leadLine1")}</p>
              <p className={styles.causeLeadLine}>{t("leadLine2")}</p>
              <p className={styles.causeLeadLine}>{t("leadLine3")}</p>
            </div>
            <p className={styles.causeSecondary}>{t("secondary")}</p>
          </div>
          <a href="#convoca" className={styles.causeCta}>
            {t("cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
