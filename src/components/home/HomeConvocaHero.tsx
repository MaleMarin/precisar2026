"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./HomeConvocaHero.module.css";

const FRAGMENTS = [
  {
    id: "recommend",
    textKey: "recommend" as const,
    noteKey: "why" as const,
    noteShortKey: "whyShort" as const,
    place: styles.fragRecommend,
  },
  {
    id: "urgent",
    textKey: "urgent" as const,
    textShortKey: "urgentShort" as const,
    noteKey: "source" as const,
    place: styles.fragUrgent,
  },
  {
    id: "ai",
    textKey: "ai" as const,
    noteKey: "how" as const,
    place: styles.fragAi,
  },
  {
    id: "request",
    textKey: "request" as const,
    noteKey: "now" as const,
    place: styles.fragRequest,
  },
];

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

          <p className={styles.lead}>{th("lead")}</p>
          <p className={styles.body}>{th("body")}</p>

          <Link href="/#programas" className={styles.cta} aria-label={th("ctaAria")}>
            {th("cta")}
            <span className={styles.ctaArrow} aria-hidden>
              →
            </span>
          </Link>

          <p className={styles.sign}>{th("right")}</p>
        </div>

        <div className={styles.visual}>
          <ul className={styles.field} aria-label={th("visualAria")}>
            {FRAGMENTS.map((fragment) => (
              <li key={fragment.id} className={`${styles.frag} ${fragment.place}`.trim()} tabIndex={0}>
                <p className={styles.fragText}>
                  {"textShortKey" in fragment ? (
                    <>
                      <span className={styles.textLong}>{th(`fragments.${fragment.textKey}`)}</span>
                      <span className={styles.textShort}>{th(`fragments.${fragment.textShortKey}`)}</span>
                    </>
                  ) : (
                    th(`fragments.${fragment.textKey}`)
                  )}
                </p>
                <p className={styles.note}>
                  <span className={styles.noteMark} aria-hidden>
                    ↳
                  </span>{" "}
                  {"noteShortKey" in fragment ? (
                    <>
                      <span className={styles.textLong}>{th(`notes.${fragment.noteKey}`)}</span>
                      <span className={styles.textShort}>{th(`notes.${fragment.noteShortKey}`)}</span>
                    </>
                  ) : (
                    th(`notes.${fragment.noteKey}`)
                  )}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
