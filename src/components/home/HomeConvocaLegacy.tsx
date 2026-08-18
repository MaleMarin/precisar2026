"use client";

import { useTranslations } from "next-intl";
import styles from "@/components/motion/MotionStackPanels.module.css";

/**
 * Versión anterior del panel “Qué nos convoca” (Menos ruido, más criterio).
 * Se conserva para comparar con la propuesta nueva.
 */
export function HomeConvocaLegacy() {
  const t = useTranslations("homeConvoca");

  return (
    <div className={styles.convocaStackRoot}>
      <header className={styles.convocaStackHeader}>
        <p className={styles.convocaStackKicker}>
          <span className={styles.convocaStackKickerSq} aria-hidden />
          <span>{t("kickerLine1")}</span>
          <span className={styles.convocaStackKickerSep} aria-hidden>
            ·
          </span>
          <span>{t("kickerLine2")}</span>
        </p>
        <h2 className={styles.convocaStackHeadline} id="stack-convoca-heading">
          <span className={styles.convocaStackHeadlineLine}>{t("headline.line1")}</span>
          <span className={styles.convocaStackHeadlineAccent}>{t("headline.line2")}</span>
        </h2>
      </header>

      <div className={styles.convocaStackMetricsIntro}>
        <div className={styles.convocaStackImpact}>
          <div className={styles.convocaStackImpactItem}>
            <span className={styles.convocaStackImpactNum}>{t("metrics.exabytesValue")}</span>
            <span className={styles.convocaStackImpactCap}>{t("metrics.exabytesLabel")}</span>
          </div>
          <div className={styles.convocaStackImpactItem}>
            <span className={styles.convocaStackImpactNum}>{t("metrics.yearsValue")}</span>
            <span className={styles.convocaStackImpactCap}>{t("metrics.yearsLabel")}</span>
          </div>
        </div>
        <p className={styles.convocaStackIntroSlate}>{t("intro")}</p>
      </div>

      <section className={styles.convocaStackPropuesta} aria-labelledby="convoca-propuesta-lead">
        <div className={styles.convocaStackPropuestaCopy}>
          <p className={styles.convocaStackPropuestaLead} id="convoca-propuesta-lead">
            {t("propuesta.body1")}
          </p>
          <p className={styles.convocaStackPropuestaClosing}>{t("propuesta.body2")}</p>
        </div>
      </section>

      <section className={styles.convocaStackChile} aria-labelledby="convoca-chile-heading">
        <h3 className={styles.convocaStackChileEyebrow} id="convoca-chile-heading">
          {t("chile.eyebrow")}
        </h3>
        <div className={styles.convocaStackChileGrid}>
          <div className={styles.convocaStackChileItem}>
            <span className={styles.convocaStackChileNum}>{t("chile.stat1Value")}</span>
            <span className={styles.convocaStackChileCap}>{t("chile.stat1Label")}</span>
          </div>
          <div className={styles.convocaStackChileItem}>
            <span className={styles.convocaStackChileNum}>{t("chile.stat2Value")}</span>
            <span className={styles.convocaStackChileCap}>{t("chile.stat2Label")}</span>
          </div>
          <div className={styles.convocaStackChileItem}>
            <span className={styles.convocaStackChileNum}>{t("chile.stat3Value")}</span>
            <span className={styles.convocaStackChileCap}>{t("chile.stat3Label")}</span>
          </div>
        </div>
        <p className={styles.convocaStackChileOutro}>{t("chile.outro")}</p>
      </section>
    </div>
  );
}
