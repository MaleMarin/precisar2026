"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./HomeConvocaList.module.css";

const stackEase = [0.22, 1, 0.36, 1] as const;

const CASES = [
  { id: "platform", mobile: true },
  { id: "media", mobile: false },
  { id: "ai", mobile: true },
  { id: "institution", mobile: true },
] as const;

const ROW_STAGGER = 0.12;
const CELL_GAP = 0.2;
const REVEAL_DURATION = 0.45;

export function HomeConvocaList({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const t = useTranslations("homeConvoca");
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.22 });
  const revealed = reduceMotion || inView;

  return (
    <div ref={rootRef} className={styles.root}>
      <div className={styles.head} aria-hidden>
        <span>{t("colArrives")}</span>
        <span>{t("colIntervenes")}</span>
        <span>{t("colAsk")}</span>
      </div>
      <ul className={styles.list} aria-label={t("visualAria")}>
        {CASES.map((item, i) => {
          const base = i * ROW_STAGGER;
          return (
            <li
              key={item.id}
              className={`${styles.row}${item.mobile ? "" : ` ${styles.hideOnMobile}`}`}
            >
              <p className={styles.category}>{t(`cases.${item.id}.origin`)}</p>
              <motion.p
                className={styles.arrives}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: REVEAL_DURATION, ease: stackEase, delay: reduceMotion ? 0 : base }}
              >
                <span className={styles.colLabel}>{t("colArrives")}</span>
                {t(`cases.${item.id}.arrives`)}
              </motion.p>
              <motion.p
                className={styles.intervenes}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{
                  duration: REVEAL_DURATION,
                  ease: stackEase,
                  delay: reduceMotion ? 0 : base + CELL_GAP,
                }}
              >
                <span className={styles.colLabel}>{t("colIntervenes")}</span>
                {t(`cases.${item.id}.intervenes`)}
              </motion.p>
              <motion.p
                className={styles.ask}
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{
                  duration: REVEAL_DURATION,
                  ease: stackEase,
                  delay: reduceMotion ? 0 : base + CELL_GAP * 2,
                }}
              >
                <span className={styles.colLabel}>{t("colAsk")}</span>
                {t(`cases.${item.id}.ask`)}
              </motion.p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
