"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./HomeConvocaList.module.css";

const stackEase = [0.22, 1, 0.36, 1] as const;

const CASES = [
  { id: "platform", mobile: true },
  { id: "ai", mobile: true },
  { id: "institution", mobile: true },
  { id: "message", mobile: false },
] as const;

const ENTRY_STAGGER = 0.12;
const ENTRY_DURATION = 0.5;
const UNSEEN_DELAY = 0.4;
const QUESTION_DELAY = 0.85;
const REVEAL_DURATION = 0.5;

export function HomeConvocaList({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const t = useTranslations("homeConvoca");
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.28 });
  const revealed = reduceMotion || inView;

  return (
    <div ref={rootRef} className={styles.root}>
      <p className={styles.legend} aria-hidden>
        <span>{t("seenGuide")}</span>
        <span>{t("unseenGuide")}</span>
      </p>
      <ul className={styles.list} aria-label={t("visualAria")}>
        {CASES.map((item, i) => {
          const baseDelay = i * ENTRY_STAGGER;
          return (
            <motion.li
              key={item.id}
              className={`${styles.entry}${item.mobile ? "" : ` ${styles.desktopOnly}`}`}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: ENTRY_DURATION, ease: stackEase, delay: reduceMotion ? 0 : baseDelay }}
            >
              <p className={styles.origin}>{t(`cases.${item.id}.origin`)}</p>
              <p className={styles.seen}>{t(`cases.${item.id}.seen`)}</p>
              <motion.p
                className={styles.unseen}
                initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                animate={
                  revealed
                    ? { opacity: 1, height: "auto" }
                    : { opacity: 0, height: 0 }
                }
                transition={{
                  duration: reduceMotion ? 0 : REVEAL_DURATION,
                  ease: stackEase,
                  delay: reduceMotion ? 0 : baseDelay + UNSEEN_DELAY,
                }}
              >
                {t(`cases.${item.id}.unseen`)}
              </motion.p>
              <motion.p
                className={styles.question}
                initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                animate={
                  revealed
                    ? { opacity: 1, height: "auto" }
                    : { opacity: 0, height: 0 }
                }
                transition={{
                  duration: reduceMotion ? 0 : REVEAL_DURATION,
                  ease: stackEase,
                  delay: reduceMotion ? 0 : baseDelay + QUESTION_DELAY,
                }}
              >
                {t(`cases.${item.id}.question`)}
              </motion.p>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
