"use client";

import { SOURCE_COLORS, SOURCE_LABELS } from "@/lib/consulta-viva/sourceColors";
import type { DominantSource } from "@/lib/consulta-viva/types";
import styles from "./SourceFlowsLegend.module.css";

const ORDER: DominantSource[] = ["whatsapp", "social", "tv_radio", "news", "ai"];

export function SourceFlowsLegend() {
  return (
    <div className={styles.root}>
      <p className={styles.caption}>Corrientes por tipo de fuente</p>
      <ul className={styles.list}>
        {ORDER.map((key) => (
          <li key={key} className={styles.item}>
            <span className={styles.swatch} style={{ background: SOURCE_COLORS[key] }} />
            <span className={styles.label}>{SOURCE_LABELS[key]}</span>
          </li>
        ))}
      </ul>
      <p className={styles.note}>
        Grosor de línea → volumen relativo. Pulso en el nodo → actividad reciente (últimos minutos,
        simulado).
      </p>
    </div>
  );
}
