"use client";

import { useTranslations } from "next-intl";
import { MARQUEE_ITEMS_FALLBACK, type MarqueeItem } from "./constants";
import styles from "../PrecisarHome.module.css";

function parseItems(raw: unknown): readonly MarqueeItem[] {
  if (!Array.isArray(raw) || raw.length === 0) return MARQUEE_ITEMS_FALLBACK;
  const ok = raw.every(
    (item) =>
      item &&
      typeof item === "object" &&
      typeof (item as MarqueeItem).actor === "string" &&
      typeof (item as MarqueeItem).action === "string",
  );
  return ok ? (raw as MarqueeItem[]) : MARQUEE_ITEMS_FALLBACK;
}

export function PrecisarHomeMarquee() {
  const t = useTranslations("homeMarquee");
  const items = parseItems(t.raw("items"));
  const track = [...items, ...items];

  return (
    <div className={styles.marqueeWrap}>
      <div className={styles.marqueeLayout}>
        <div className={styles.marqueeFixed}>
          <p className={styles.marqueeHeadline}>{t("headline")}</p>
          <p className={styles.marqueeLead}>{t("lead")}</p>
        </div>
        <div className={styles.marqueeRail} aria-hidden>
          <div className={styles.marqueeTrack}>
            {track.map((item, i) => (
              <span
                key={`${item.actor}-${item.action}-${i}`}
                className={item.desktopOnly ? styles.marqueeItemDesktop : styles.marqueeItem}
              >
                <span className={styles.marqueeActor}>{item.actor}</span>{" "}
                <span className={styles.marqueeAction}>{item.action}</span>
                <span className={styles.marqueeSep}> · </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
