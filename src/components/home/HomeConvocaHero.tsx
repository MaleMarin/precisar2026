"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./HomeConvocaHero.module.css";

const CASES = [
  { id: "recommend", kind: "feed", mobile: true },
  { id: "message", kind: "bubble", mobile: true },
  { id: "ai", kind: "generated", mobile: true },
  { id: "public", kind: "document", mobile: false },
] as const;

const ACTORS = ["institution", "media", "platform", "algorithm", "ai"] as const;

const kindClass = {
  feed: "caseFeed",
  bubble: "caseBubble",
  generated: "caseGenerated",
  document: "caseDocument",
} as const;

export function HomeConvocaHero() {
  const t = useTranslations("homeConvoca");
  const th = useTranslations("homeConvoca.hero");
  const reduceMotion = useReducedMotion() ?? false;
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { once: true, amount: 0.28 });

  return (
    <div
      ref={panelRef}
      className={[styles.panel, inView || reduceMotion ? styles.inView : "", reduceMotion ? styles.reduceMotion : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.kicker}>{t("eyebrow")}</p>
          <h2 className={styles.headline} id="stack-convoca-heading">
            {th("headline")}
          </h2>
          <p className={styles.intro}>{th("intro")}</p>
          <ul className={styles.actors}>
            {ACTORS.map((actor) => (
              <li key={actor}>{th(`actors.${actor}`)}</li>
            ))}
          </ul>
          <p className={styles.close}>{th("close")}</p>
        </div>

        <ul className={styles.cases} aria-label={th("visualAria")}>
          {CASES.map((item) => (
            <li
              key={item.id}
              className={[
                styles.case,
                styles[kindClass[item.kind]],
                item.mobile ? "" : styles.caseDesktopOnly,
              ]
                .filter(Boolean)
                .join(" ")}
              tabIndex={0}
            >
              <p className={styles.caseText}>{th(`cases.${item.id}.text`)}</p>
              <p className={styles.question}>
                <span className={styles.questionMark} aria-hidden>
                  ↳
                </span>{" "}
                {th(`cases.${item.id}.question`)}
              </p>
              <p className={styles.layer}>{th(`cases.${item.id}.layer`)}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
