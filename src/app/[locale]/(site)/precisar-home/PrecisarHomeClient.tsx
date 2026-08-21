"use client";

import { useReducedMotion } from "framer-motion";
import styles from "./PrecisarHome.module.css";
import { PrecisarHomeHero } from "./_components/PrecisarHomeHero";
import { PrecisarHomeStackPanelsSection } from "./_components/PrecisarHomeStackPanelsSection";

export function PrecisarHomeClient() {
  const reduceMotion = useReducedMotion() ?? false;
  const rootClass = [styles.root, reduceMotion ? styles.reduceMotion : ""].filter(Boolean).join(" ");

  return (
    <div className={rootClass}>
      <PrecisarHomeHero />
      <PrecisarHomeStackPanelsSection reduceMotion={reduceMotion} />
    </div>
  );
}
