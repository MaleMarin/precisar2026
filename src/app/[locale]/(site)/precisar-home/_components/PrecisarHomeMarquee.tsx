"use client";

import { useTranslations } from "next-intl";
import styles from "../PrecisarHome.module.css";

type BandGroup = {
  action: string;
  by: string;
};

const GROUPS_FALLBACK: readonly BandGroup[] = [
  { action: "Seleccionada y comunicada", by: "por medios e instituciones" },
  { action: "Ordenada y priorizada", by: "por plataformas y algoritmos" },
  { action: "Resumida o generada", by: "por inteligencia artificial" },
];

const HEADLINE_LINES_FALLBACK = ["La información", "que recibes ya pasó", "por decisiones."] as const;

function parseGroups(raw: unknown): readonly BandGroup[] {
  if (!Array.isArray(raw) || raw.length !== 3) return GROUPS_FALLBACK;
  const ok = raw.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof (item as BandGroup).action === "string" &&
      typeof (item as BandGroup).by === "string",
  );
  return ok ? (raw as BandGroup[]) : GROUPS_FALLBACK;
}

function parseHeadlineLines(raw: unknown): readonly string[] {
  if (!Array.isArray(raw) || raw.length === 0) return HEADLINE_LINES_FALLBACK;
  const lines = raw.filter((item): item is string => typeof item === "string" && item.length > 0);
  return lines.length > 0 ? lines : HEADLINE_LINES_FALLBACK;
}

/** Contenido del primer panel del stack (mismo card sticky que Programas). */
export function PrecisarHomeMarquee() {
  const t = useTranslations("homeMarquee");
  const groups = parseGroups(t.raw("groups"));
  const headlineLines = parseHeadlineLines(t.raw("headlineLines"));

  return (
    <div className={styles.marqueeLayout}>
      <p className={styles.marqueeBridge}>
        {t("bridgeBefore")}
        <span className={styles.marqueeBridgeAccent}>{t("bridgeName")}</span>
        {t("bridgeAfter")}
      </p>
      <h2 id="recorrido-heading" className={styles.marqueeHeadline} aria-label={t("headline")}>
        {headlineLines.map((line) => (
          <span key={line} className={styles.marqueeHeadlineLine}>
            {line}
          </span>
        ))}
      </h2>
      <p className={styles.marqueeLead}>{t("lead")}</p>
      <ol className={styles.marqueeList}>
        {groups.map((group, i) => (
          <li key={group.action} className={styles.marqueeItem}>
            <span className={styles.marqueeIndex} aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <p className={styles.marqueeAction}>{group.action}</p>
            <p className={styles.marqueeBy}>{group.by}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
