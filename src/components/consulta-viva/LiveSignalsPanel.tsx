"use client";

import styles from "./ConsultaVivaSide.module.css";

type Props = {
  insights: string[];
  recentActivity: string[];
};

export function LiveSignalsPanel({ insights, recentActivity }: Props) {
  return (
    <div className={styles.panel}>
      <p className={styles.eyebrow}>Resultados</p>
      <h3 className={styles.title}>Lectura de la región</h3>
      <p className={styles.lead}>Resumen breve y últimas señales que entraron al mapa.</p>

      <p className={styles.rowLabel} style={{ marginBottom: "0.4rem" }}>
        En conjunto
      </p>
      <ul className={styles.insightList}>
        {insights.map((item, i) => (
          <li key={i} className={styles.insightItem}>
            {item}
          </li>
        ))}
      </ul>

      <p className={styles.rowLabel} style={{ margin: "1rem 0 0.4rem" }}>
        Últimas entradas
      </p>
      <ul className={styles.insightList}>
        {recentActivity.slice(0, 6).map((item, i) => (
          <li key={i} className={styles.activityItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
