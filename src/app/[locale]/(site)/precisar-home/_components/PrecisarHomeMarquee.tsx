"use client";

import { useTranslations } from "next-intl";
import styles from "../PrecisarHome.module.css";

type BandGroup = {
  action: string;
  by: string;
};

const GROUPS_FALLBACK: readonly BandGroup[] = [
  { action: "Seleccionada y comunicada", by: "por medios e instituciones" },
  { action: "Ordenada y recomendada", by: "por plataformas y algoritmos" },
  { action: "Resumida o generada", by: "por sistemas de inteligencia artificial" },
];

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

/** Columna derecha de `#recorrido`: encabezado + lista 01/02/03 (sin links ni flechas). */
export function RecorridoList() {
  const t = useTranslations("homeMarquee");
  const groups = parseGroups(t.raw("groups"));
  const leadId = "recorrido-list-lead";

  return (
    <div className={styles.marqueeAside}>
      <p id={leadId} className={styles.marqueeLead}>
        {t("lead")}
      </p>
      <ol className={styles.marqueeList} aria-labelledby={leadId}>
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
      <p className={styles.marqueeClose}>
        {t("closeBefore")}
        <span className={styles.marqueeCloseCause}>{t("closeCause")}</span>
        {t("closeAfter")}
      </p>
    </div>
  );
}
