"use client";

import { SOURCE_COLORS, SOURCE_LABELS } from "@/lib/consulta-viva/sourceColors";
import type { DominantSource } from "@/lib/consulta-viva/types";
import styles from "./LiveSignalsPanel.module.css";

const ORDER: DominantSource[] = ["whatsapp", "social", "tv_radio", "news", "ai"];

type Props = {
  volumeBySource: Record<DominantSource, number>;
};

export function LiveSignalsPanel({ volumeBySource }: Props) {
  const max = Math.max(...ORDER.map((k) => volumeBySource[k]), 1);
  return (
    <div className={styles.root}>
      <p className={styles.caption}>Volumen relativo por corriente</p>
      <ul className={styles.bars}>
        {ORDER.map((key) => {
          const v = volumeBySource[key];
          const pct = Math.round((v / max) * 100);
          return (
            <li key={key} className={styles.barRow}>
              <span className={styles.barLabel}>{SOURCE_LABELS[key]}</span>
              <span className={styles.barTrack}>
                <span
                  className={styles.barFill}
                  style={{
                    width: `${pct}%`,
                    background: `linear-gradient(90deg, ${SOURCE_COLORS[key]}cc, ${SOURCE_COLORS[key]}44)`,
                    boxShadow: `0 0 14px ${SOURCE_COLORS[key]}33`,
                  }}
                />
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
