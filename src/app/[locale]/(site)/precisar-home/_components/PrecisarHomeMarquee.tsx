"use client";

import { useTranslations } from "next-intl";
import { MARQUEE_CHUNKS_FALLBACK, type MarqueeChunk } from "./constants";
import styles from "../PrecisarHome.module.css";

function parseChunks(raw: unknown): readonly MarqueeChunk[] {
  if (!Array.isArray(raw) || raw.length === 0) return MARQUEE_CHUNKS_FALLBACK;
  const ok = raw.every(
    (p) =>
      Array.isArray(p) &&
      p.length >= 1 &&
      typeof p[0] === "string" &&
      (p.length === 1 || typeof p[1] === "string"),
  );
  return ok ? (raw as MarqueeChunk[]) : MARQUEE_CHUNKS_FALLBACK;
}

export function PrecisarHomeMarquee() {
  const t = useTranslations("homeMarquee");
  const chunks = parseChunks(t.raw("chunks"));
  const marqueeRepeat = [...chunks, ...chunks];

  return (
    <div className={styles.marqueeWrap} aria-hidden>
      <div className={styles.marqueeTrack}>
        {marqueeRepeat.map((pair, i) => {
          const lead = pair[0];
          const action = pair.length > 1 ? pair[1] : undefined;
          return (
            <div key={`${lead}-${action ?? ""}-${i}`} className={styles.marqueeInner}>
              <span>
                {lead}
                {action ? (
                  <>
                    {" "}
                    · <span className={styles.marqueeAction}>{action}</span>
                  </>
                ) : null}
              </span>{" "}
              <span style={{ opacity: 0.35 }}>—</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
