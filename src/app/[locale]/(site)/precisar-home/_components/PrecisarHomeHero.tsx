"use client";

import type { CSSProperties } from "react";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  flameExitCornerForIndex,
  PotenciaRotatingHeadline,
} from "@/components/potencia-headline/PotenciaRotatingHeadline";
import styles from "../PrecisarHome.module.css";
import { ease } from "./constants";
import { HeroFlameMoteTrack } from "./HeroFlameMoteTrack";

export function PrecisarHomeHero() {
  const heroFlameRef = useRef<HTMLElement | null>(null);
  const [heroFlame, setHeroFlame] = useState(() => {
    const c = flameExitCornerForIndex(0);
    return { x: c.x, y: c.y, toCorner: false };
  });
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <header
      ref={heroFlameRef}
      className={styles.hero}
      style={
        {
          ["--verb-flame-x" as string]: `${heroFlame.x}%`,
          ["--verb-flame-y" as string]: `${heroFlame.y}%`,
          ["--verb-flame-dur" as string]: heroFlame.toCorner ? "2.35s" : "0.58s",
        } as CSSProperties
      }
    >
      {!reduceMotion ? (
        <>
          <HeroFlameMoteTrack
            className={styles.heroFlameMote}
            targetX={heroFlame.x}
            targetY={heroFlame.y}
            quickBlend={!heroFlame.toCorner}
          />
          <div className={`${styles.heroOrb} ${styles.heroOrb2}`} aria-hidden />
        </>
      ) : null}
      <div className={styles.heroInner}>
        <motion.h1
          className={styles.heroPotenciaH1}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease }}
        >
          <PotenciaRotatingHeadline
            reduceMotion={reduceMotion}
            surface="dark"
            scale="precisarHome"
            flameSyncContainerRef={heroFlameRef}
            onFlamePercent={setHeroFlame}
          />
        </motion.h1>
      </div>
    </header>
  );
}
