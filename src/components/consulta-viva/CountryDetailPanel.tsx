"use client";

import type { ReactNode } from "react";
import { CONCERN_LABELS, SOURCE_LABELS } from "@/lib/consulta-viva/aggregations";
import type { CountrySignal } from "@/lib/consulta-viva/types";
import styles from "./ConsultaVivaSide.module.css";

type Props = {
  signal: CountrySignal | null;
};

export function CountryDetailPanel({ signal }: Props) {
  if (!signal) {
    return (
      <div className={styles.panel}>
        <p className={styles.muted}>
          Selecciona un país en el mapa para ver los números y la lectura de esa señal.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      <p className={styles.eyebrow}>Región</p>
      <h3 className={styles.title}>{signal.name}</h3>
      <p className={styles.lead}>Lo que muestra este país en esta visita al mapa.</p>

      <div className={styles.rowGrid}>
        <Row label="Canal que más se repite">
          {signal.dominantSource ? SOURCE_LABELS[signal.dominantSource] : "Todavía no alcanza para una lectura clara"}
        </Row>
        <Row label="Confianza (promedio)">
          {signal.avgTrust != null ? signal.avgTrust.toFixed(1) : "—"}
        </Row>
        <Row label="Preocupación principal">
          {signal.topConcern ? CONCERN_LABELS[signal.topConcern] : "—"}
        </Row>
        <Row label="Respuestas recientes">{signal.responsesRecent}</Row>
        <Row label="Respuestas en total">{signal.responsesTotal}</Row>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className={styles.row}>
      <div className={styles.rowLabel}>{label}</div>
      <div className={styles.rowValue}>{children}</div>
    </div>
  );
}
