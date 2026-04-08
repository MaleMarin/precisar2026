"use client";

import { concernLabel, trustLabel } from "@/lib/consulta-viva/aggregations";
import { SOURCE_LABELS } from "@/lib/consulta-viva/sourceColors";
import type { CountrySignal } from "@/lib/consulta-viva/types";
import styles from "./CountryDetailPanel.module.css";

const TREND_LABEL: Record<CountrySignal["trend"], string> = {
  up: "Al alza",
  stable: "Estable",
  down: "A la baja",
};

type Props = {
  signal: CountrySignal | null;
  hint?: boolean;
};

export function CountryDetailPanel({ signal, hint = true }: Props) {
  if (!signal) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyTitle}>Selección regional</p>
        {hint ? (
          <p className={styles.emptyText}>
            Pasá el cursor o tocá un país en el mapa para ver canal dominante, confianza y preocupación
            principal.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <h3 className={styles.country}>{signal.name}</h3>
      <dl className={styles.dl}>
        <div className={styles.row}>
          <dt>Canal dominante</dt>
          <dd>
            {signal.dominantSource ? SOURCE_LABELS[signal.dominantSource] : "Sin señal reciente"}
          </dd>
        </div>
        <div className={styles.row}>
          <dt>Confianza promedio</dt>
          <dd>
            {signal.avgTrust != null ? `${signal.avgTrust.toFixed(1)} · ${trustLabel(signal.avgTrust)}` : "—"}
          </dd>
        </div>
        <div className={styles.row}>
          <dt>Principal preocupación</dt>
          <dd>{signal.topConcern ? concernLabel(signal.topConcern) : "—"}</dd>
        </div>
        <div className={styles.row}>
          <dt>Señales (últimos 5 min)</dt>
          <dd className={styles.em}>{signal.responsesRecent}</dd>
        </div>
        <div className={styles.row}>
          <dt>Señales totales (sesión)</dt>
          <dd>{signal.responsesTotal.toLocaleString("es-CL")}</dd>
        </div>
        <div className={styles.row}>
          <dt>Tendencia</dt>
          <dd>
            {signal.trend === "up"
              ? `${TREND_LABEL.up} (+${signal.trendDelta})`
              : signal.trend === "down"
                ? `${TREND_LABEL.down} (${signal.trendDelta})`
                : TREND_LABEL.stable}
          </dd>
        </div>
      </dl>
    </div>
  );
}
