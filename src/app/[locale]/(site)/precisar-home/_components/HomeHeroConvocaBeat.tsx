"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "../PrecisarHome.module.css";
import { ease } from "./constants";

const STEPS_DESKTOP = ["media", "platform", "algorithm", "ai"] as const;
const STEPS_MOBILE = ["platform", "algorithm", "ai"] as const;
const SETTLE = "algorithm";
const HOLD_MS = 1000;

export function HomeHeroConvocaBeat({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const t = useTranslations("homeConvoca");
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.35 });
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(reduceMotion);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const steps = mobile ? STEPS_MOBILE : STEPS_DESKTOP;

  useEffect(() => {
    if (reduceMotion) {
      setDone(true);
      return;
    }
    if (!inView) return;

    let step = 0;
    setIndex(0);
    setDone(false);
    const id = window.setInterval(() => {
      step += 1;
      if (step >= steps.length) {
        window.clearInterval(id);
        setDone(true);
        return;
      }
      setIndex(step);
    }, HOLD_MS);

    return () => window.clearInterval(id);
  }, [inView, reduceMotion, steps.length]);

  const current = reduceMotion || done ? SETTLE : (steps[index] ?? SETTLE);

  return (
    <div ref={rootRef} className={styles.heroBeat} id="convoca">
      <div className={styles.heroBeatRule} aria-hidden />
      <motion.div
        className={styles.heroBeatGrid}
        initial={reduceMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.32 }}
        transition={{ duration: 0.55, ease }}
      >
        <div className={styles.heroBeatCopy}>
          <h2 className={styles.heroBeatTitle}>{t("beatHeadline")}</h2>
          <p className={styles.heroBeatBody}>{t("beatBody")}</p>
          <p className={styles.heroBeatClose}>{t("beatClose")}</p>
        </div>
        <div className={styles.heroBeatStage} aria-live="polite">
          <p className={styles.heroBeatActor}>{t(`cycle.${current}.actor`)}</p>
          <motion.p
            key={current}
            className={styles.heroBeatVerb}
            initial={reduceMotion ? false : { opacity: 0, y: 12, color: "var(--flame)" }}
            animate={{ opacity: 1, y: 0, color: "var(--mist)" }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { duration: 0.48, ease, color: { duration: 0.26, delay: 0.2, ease } }
            }
          >
            {t(`cycle.${current}.verb`)}
          </motion.p>
          <p className={`${styles.heroBeatRoster} ${done || reduceMotion ? styles.heroBeatRosterOn : ""}`}>
            {steps.map((id, i) => (
              <span key={id}>
                {i > 0 ? <span className={styles.heroBeatRosterSep}>·</span> : null}
                {t(`cycle.${id}.actor`)}
              </span>
            ))}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
