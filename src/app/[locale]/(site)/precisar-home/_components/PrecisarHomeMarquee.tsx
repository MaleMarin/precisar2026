"use client";

import { useTranslations } from "next-intl";
import { MARQUEE_CHUNKS_FALLBACK } from "./constants";
import styles from "../PrecisarHome.module.css";

export function PrecisarHomeMarquee() {
  const t = useTranslations("homeMarquee");
  const raw = t.raw("chunks");
  const chunks: readonly (readonly [string, string])[] =
    Array.isArray(raw) && raw.length > 0 && raw.every((p) => Array.isArray(p) && p.length >= 2)
      ? (raw as (readonly [string, string])[])
      : MARQUEE_CHUNKS_FALLBACK;
  const marqueeRepeat = [...chunks, ...chunks];

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
