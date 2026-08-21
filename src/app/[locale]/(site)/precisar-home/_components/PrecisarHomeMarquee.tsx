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

/** Lista 01/02/03 de la columna derecha de `#recorrido` (mismo aside que Programas). */
export function RecorridoList() {
  const t = useTranslations("homeMarquee");
  const groups = parseGroups(t.raw("groups"));

  return (
    <ol className={styles.marqueeList}>
      {groups.map((group, i) => (
        <li key={group.action} className={styles.marqueeItem}>
          <span className={styles.marqueeIndex} aria-hidden>
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className={styles.marqueePhrase}>
            {group.action}
            <span aria-hidden> – </span>
            {group.by}
          </p>
        </li>
      ))}
    </ol>
  );
}
