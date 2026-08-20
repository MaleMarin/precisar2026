"use client";

import { useTranslations } from "next-intl";
import styles from "../PrecisarHome.module.css";

type BandGroup = {
  line1: string;
  line2: string;
  accent: "line1" | "line2";
  by: string;
};

const GROUPS_FALLBACK: readonly BandGroup[] = [
  { line1: "Qué contarte y qué dejar fuera", line2: "", accent: "line1", by: "medios e instituciones" },
  { line1: "Qué mostrarte primero", line2: "", accent: "line1", by: "plataformas y algoritmos" },
  { line1: "Cómo resumírtelo o crearlo desde cero", line2: "", accent: "line1", by: "inteligencia artificial" },
];

function parseGroups(raw: unknown): readonly BandGroup[] {
  if (!Array.isArray(raw) || raw.length !== 3) return GROUPS_FALLBACK;
  const ok = raw.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof (item as BandGroup).line1 === "string" &&
      typeof (item as BandGroup).line2 === "string" &&
      typeof (item as BandGroup).by === "string" &&
      ((item as BandGroup).accent === "line1" || (item as BandGroup).accent === "line2"),
  );
  return ok ? (raw as BandGroup[]) : GROUPS_FALLBACK;
}

export function PrecisarHomeMarquee() {
  const t = useTranslations("homeMarquee");
  const groups = parseGroups(t.raw("groups"));

  return (
    <div className={styles.marqueeWrap}>
      <div className={styles.marqueeLayout}>
        <h2 className={styles.marqueeHeadline}>{t("headline")}</h2>
        <p className={styles.marqueeLead}>{t("lead")}</p>
        <div className={styles.marqueeGrid}>
          {groups.map((group) => (
            <div key={group.line1} className={styles.marqueeCol}>
              <p className={styles.marqueeAction}>
                <span className={group.accent === "line1" ? styles.marqueeAccent : ""}>{group.line1}</span>
                {group.line2 ? (
                  <span className={group.accent === "line2" ? styles.marqueeAccent : ""}>{group.line2}</span>
                ) : null}
              </p>
              <p className={styles.marqueeBy}>{group.by}</p>
            </div>
          ))}
        </div>
        <p className={styles.marqueeClose}>{t("close")}</p>
        <p className={styles.marqueeClose}>{t("bajada")}</p>
      </div>
    </div>
  );
}
