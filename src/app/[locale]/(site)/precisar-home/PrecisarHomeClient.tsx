"use client";

import { useReducedMotion } from "framer-motion";
import styles from "./PrecisarHome.module.css";
import { PrecisarHomeCauseHero } from "./_components/PrecisarHomeCauseHero";
import { PrecisarHomeStackPanelsSection } from "./_components/PrecisarHomeStackPanelsSection";

export function PrecisarHomeClient() {
  const reduceMotion = useReducedMotion() ?? false;
  const rootClass = [styles.root, reduceMotion ? styles.reduceMotion : ""].filter(Boolean).join(" ");

  return (
    <div className={rootClass}>
      <PrecisarHomeCauseHero />
      <div className={styles.heroStackBreak} aria-hidden />
      <PrecisarHomeStackPanelsSection reduceMotion={reduceMotion} />
    </div>
  );
}
