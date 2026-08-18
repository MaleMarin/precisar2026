"use client";

import { useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./HomeConvocaHero.module.css";

const FRAGMENTS = [
  { key: "message", className: styles.cardMessage, kind: "msg" },
  { key: "notice", className: styles.cardNotice, kind: "alert" },
  { key: "search", className: styles.cardSearch, kind: "search" },
  { key: "recommend", className: styles.cardRecommend, kind: "feed" },
  { key: "public", className: styles.cardPublic, kind: "doc" },
  { key: "generated", className: styles.cardGenerated, kind: "ai" },
] as const;

const LAYERS = ["source", "context", "algorithm", "ai", "intent", "evidence"] as const;

function InformacionEcosystem({ reduceMotion }: { reduceMotion: boolean }) {
  const t = useTranslations("homeConvoca.hero");

  return (
    <div className={`${styles.eco} ${reduceMotion ? styles.reduceMotion : ""}`.trim()} aria-hidden>
      <div className={styles.ecoStage}>
        <p className={styles.ecoInfo}>{t("infoLabel")}</p>

        <div className={styles.fragments}>
          {FRAGMENTS.map((item) => (
            <article key={item.key} className={`${styles.card} ${item.className}`.trim()}>
              <span className={styles.cardKind}>{t(`fragmentKinds.${item.kind}`)}</span>
              <span className={styles.cardLabel}>{t(`fragments.${item.key}`)}</span>
              {item.key === "search" ? <span className={styles.cardHint}>{t("fragmentHints.search")}</span> : null}
              {item.key === "generated" ? <span className={styles.cardHint}>{t("fragmentHints.generated")}</span> : null}
              {item.key === "public" ? <span className={styles.cardHint}>{t("fragmentHints.public")}</span> : null}
            </article>
          ))}
        </div>

        <p className={styles.mediation}>{t("mediation")}</p>

        <div className={styles.layers}>
          {LAYERS.map((layer) => (
            <span key={layer} className={styles.layer}>
              {t(`layers.${layer}`)}
            </span>
          ))}
        </div>

        <div className={styles.convergeWrap}>
          <p className={styles.converge}>{t("converge")}</p>
          <p className={styles.people}>{t("peopleLabel")}</p>
        </div>
      </div>
    </div>
  );
}

export function HomeConvocaHero() {
  const t = useTranslations("homeConvoca");
  const th = useTranslations("homeConvoca.hero");
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <div className={styles.panel}>
      <div className={styles.layout}>
        <div className={styles.copy}>
          <p className={styles.kicker}>
            <span className={styles.kickerSq} aria-hidden />
            <span>{t("kickerLine1")}</span>
            <span className={styles.kickerSep} aria-hidden>
              ·
            </span>
            <span>{t("kickerLine2")}</span>
          </p>

          <h2 className={styles.headline} id="stack-convoca-heading">
            <span className={styles.headlineLead}>{th("headlineLead")}</span>
            <span className={styles.headlineRest}>{th("headlineRest")}</span>
          </h2>

          <p className={styles.lead}>{th("lead")}</p>
          <p className={styles.body}>{th("body")}</p>

          <p className={styles.right}>{th("right")}</p>

          <div className={styles.ctas}>
            <Link href="/#programas" className={`${styles.cta} ${styles.ctaPrimary}`} aria-label={th("ctaPrimaryAria")}>
              {th("ctaPrimary")}
            </Link>
            <Link
              href="/saberes/recursos"
              className={`${styles.cta} ${styles.ctaSecondary}`}
              aria-label={th("ctaSecondaryAria")}
            >
              {th("ctaSecondary")}
            </Link>
          </div>

          <aside className={styles.micro}>
            <p className={styles.microTitle}>{th("microTitle")}</p>
            <p className={styles.microBody}>{th("microBody")}</p>
          </aside>
        </div>

        <div className={styles.visual}>
          <p className={styles.visualAria}>{th("visualAria")}</p>
          <InformacionEcosystem reduceMotion={reduceMotion} />
        </div>
      </div>
    </div>
  );
}
