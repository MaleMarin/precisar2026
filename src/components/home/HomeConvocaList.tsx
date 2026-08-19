"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./HomeConvocaList.module.css";

const stackEase = [0.22, 1, 0.36, 1] as const;

const STEPS = ["media", "institution", "platform", "algorithm", "ai"] as const;
const SETTLE_INDEX = 3;
const HOLD_MS = 1200;

export function HomeConvocaList({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const t = useTranslations("homeConvoca");
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.28 });
  const [index, setIndex] = useState(reduceMotion ? SETTLE_INDEX : 0);
  const [done, setDone] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setIndex(SETTLE_INDEX);
      setDone(true);
      return;
    }
    if (!inView) return;

    let step = 0;
    setIndex(0);
    setDone(false);
    const id = window.setInterval(() => {
      step += 1;
      if (step >= STEPS.length) {
        window.clearInterval(id);
        setIndex(SETTLE_INDEX);
        setDone(true);
        return;
      }
      setIndex(step);
    }, HOLD_MS);

    return () => window.clearInterval(id);
  }, [inView, reduceMotion]);

  const current = STEPS[index] ?? STEPS[SETTLE_INDEX];

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.stage} aria-live="polite">
        <p className={styles.actor}>{t(`cycle.${current}.actor`)}</p>
        <motion.p
          key={current}
          className={styles.verb}
          initial={reduceMotion ? false : { opacity: 0, y: 18, color: "var(--stack-accent, #db5227)" }}
          animate={{ opacity: 1, y: 0, color: "#ffffff" }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.52,
                  ease: stackEase,
                  color: { duration: 0.28, delay: 0.22, ease: stackEase },
                }
          }
        >
          {t(`cycle.${current}.verb`)}
        </motion.p>
      </div>

      <p className={`${styles.roster} ${done ? styles.rosterOn : ""}`} aria-hidden={!done}>
        {STEPS.map((id, i) => (
          <span key={id}>
            {i > 0 ? <span className={styles.rosterSep}>·</span> : null}
            {t(`cycle.${id}.actor`)}
          </span>
        ))}
      </p>

      <motion.p
        className={styles.question}
        initial={false}
        animate={done ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: stackEase }}
      >
        {t("question")}
      </motion.p>
    </div>
  );
}
