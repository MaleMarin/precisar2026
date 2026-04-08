"use client";

import styles from "./RecentInsights.module.css";

type Props = {
  lines: string[];
  activity?: string[];
};

export function RecentInsights({ lines, activity = [] }: Props) {
  return (
    <div className={styles.wrap}>
      {lines.length === 0 ? (
        <p className={styles.empty}>Sin lecturas aún.</p>
      ) : (
        <ul className={styles.list}>
          {lines.map((line, i) => (
            <li key={`${i}-${line.slice(0, 24)}`} className={i === 0 ? styles.itemHot : styles.item}>
              <span className={styles.dot} aria-hidden />
              {line}
            </li>
          ))}
        </ul>
      )}

      {activity.length > 0 ? (
        <>
          <p className={styles.activityKicker}>Actividad reciente</p>
          <ul className={styles.activityList}>
            {activity.slice(0, 7).map((line, i) => (
              <li key={`${i}-${line.slice(0, 20)}`} className={styles.activityItem}>
                {line}
              </li>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
}
