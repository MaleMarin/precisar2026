"use client";

import { MARQUEE_CHUNKS } from "./constants";
import styles from "../PrecisarHome.module.css";

export function PrecisarHomeMarquee() {
  const marqueeRepeat = [...MARQUEE_CHUNKS, ...MARQUEE_CHUNKS];

  return (
    <div className={styles.marqueeWrap} aria-hidden>
      <div className={styles.marqueeTrack}>
        {marqueeRepeat.map((pair, i) => (
          <div key={`${pair[0]}-${pair[1]}-${i}`} className={styles.marqueeInner}>
            <span>{pair[0]}</span> · {pair[1]} <span style={{ opacity: 0.35 }}>—</span>
          </div>
        ))}
      </div>
    </div>
  );
}
