"use client";

import { useEffect, useRef, useState } from "react";
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
const ENTRY_DURATION = 0.52;
const QUESTION_PAUSE = 0.4;
const QUESTION_STAGGER = 0.14;
const QUESTION_DURATION = 0.5;

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HomeConvocaList({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const t = useTranslations("homeConvoca");
  const rootRef = useRef<HTMLUListElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.28 });
  const [questionsOn, setQuestionsOn] = useState(reduceMotion);
  const [layersReady, setLayersReady] = useState(reduceMotion);

  useEffect(() => {
    if (reduceMotion) {
      setQuestionsOn(true);
      setLayersReady(true);
      return;
    }
    if (!inView) return;

    const lastEntryMs = (CASES.length - 1) * ENTRY_STAGGER * 1000 + ENTRY_DURATION * 1000;
    const questionsAt = lastEntryMs + QUESTION_PAUSE * 1000;
    const layersAt = questionsAt + (CASES.length - 1) * QUESTION_STAGGER * 1000 + QUESTION_DURATION * 1000;

    const qTimer = window.setTimeout(() => setQuestionsOn(true), questionsAt);
    const lTimer = window.setTimeout(() => setLayersReady(true), layersAt);
    return () => {
      window.clearTimeout(qTimer);
      window.clearTimeout(lTimer);
    };
  }, [inView, reduceMotion]);

  return (
    <ul
      ref={rootRef}
      className={`${styles.list}${layersReady ? ` ${styles.listReady}` : ""}`}
      aria-label={t("visualAria")}
    >
      {CASES.map((item, i) => (
        <motion.li
          key={item.id}
          className={`${styles.entry}${item.mobile ? "" : ` ${styles.desktopOnly}`}`}
          tabIndex={0}
          initial={reduceMotion ? false : { opacity: 0, x: 36 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: ENTRY_DURATION, ease: stackEase, delay: i * ENTRY_STAGGER }}
        >
          <div className={styles.entryMain}>
            <p className={styles.origin}>{t(`cases.${item.id}.origin`)}</p>
            <p className={styles.text}>{t(`cases.${item.id}.text`)}</p>
            <motion.p
              className={styles.question}
              initial={false}
              animate={
                reduceMotion || questionsOn
                  ? { opacity: 0.88, height: "auto" }
                  : { opacity: 0, height: 0 }
              }
              transition={{
                duration: reduceMotion ? 0 : QUESTION_DURATION,
                ease: stackEase,
                delay: reduceMotion || !questionsOn ? 0 : i * QUESTION_STAGGER,
              }}
            >
              {t(`cases.${item.id}.question`)}
            </motion.p>
            <p className={styles.layer}>
              <span className={styles.layerInner}>{t(`cases.${item.id}.layer`)}</span>
            </p>
          </div>
          <ArrowIcon className={styles.arrow} />
        </motion.li>
      ))}
    </ul>
  );
}
