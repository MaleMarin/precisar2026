"use client";

import { useTranslations } from "next-intl";
import styles from "../PrecisarHome.module.css";

type BandGroup = {
  line1: string;
  line2: string;
  by: string;
};

const GROUPS_FALLBACK: readonly BandGroup[] = [
  { line1: "Seleccionada", line2: "y comunicada", by: "por medios e instituciones" },
  { line1: "Ordenada", line2: "y priorizada", by: "por plataformas y algoritmos" },
  { line1: "Resumida", line2: "o generada", by: "por inteligencia artificial" },
];

function parseGroups(raw: unknown): readonly BandGroup[] {
  if (!Array.isArray(raw) || raw.length !== 3) return GROUPS_FALLBACK;
  const ok = raw.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof (item as BandGroup).line1 === "string" &&
      typeof (item as BandGroup).line2 === "string" &&
      typeof (item as BandGroup).by === "string",
  );
  return ok ? (raw as BandGroup[]) : GROUPS_FALLBACK;
}

export function PrecisarHomeMarquee() {
  const t = useTranslations("homeMarquee");
  const groups = parseGroups(t.raw("groups"));

  return (
    <>
      <div className={styles.marqueeGap} aria-hidden />
      <section id="recorrido" className={styles.marqueeWrap} aria-labelledby="recorrido-heading">
        <div className={styles.marqueeLayout}>
          <h2 id="recorrido-heading" className={styles.marqueeHeadline}>
            {t("headline")}
          </h2>
          <p className={styles.marqueeLead}>{t("lead")}</p>
          <div className={styles.marqueeGrid}>
            {groups.map((group) => (
              <div key={group.line1} className={styles.marqueeCol}>
                <p className={styles.marqueeAction}>
                  <span>{group.line1}</span>
                  <span>{group.line2}</span>
                </p>
                <p className={styles.marqueeBy}>{group.by}</p>
              </div>
            ))}
          </div>
          <p className={styles.marqueeClose}>
            {t("closeBefore")}
            <span className={styles.marqueeCloseAccent}>{t("closeAccent")}</span>
            {t("closeAfter")}
          </p>
        </div>
      </section>
    </>
  );
}
