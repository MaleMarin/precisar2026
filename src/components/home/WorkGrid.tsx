"use client";

import {
  useCallback,
  useRef,
  type KeyboardEvent,
} from "react";
import styles from "./WorkGrid.module.css";

export type WorkGridItem = {
  id: string;
  title: string;
  tags: string[];
  videoMp4: string;
  videoWebm?: string;
  mobilePoster: string;
};

export type WorkGridProps = {
  items: WorkGridItem[];
};

export function WorkGrid({ items }: WorkGridProps) {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <WorkCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function WorkCard({ item }: { item: WorkGridItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v || window.matchMedia("(max-width: 768px)").matches) return;
    void v.play().catch(() => {});
  }, []);

  const pause = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    try {
      v.currentTime = 0;
    } catch {
      /* ignore */
    }
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      play();
    }
  };

  return (
    <article
      className={styles.card}
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className={styles.videoLayer}>
        <video
          ref={videoRef}
          className={styles.video}
          muted
          playsInline
          loop
          preload="metadata"
          poster={item.mobilePoster}
        >
          {item.videoWebm ? <source src={item.videoWebm} type="video/webm" /> : null}
          <source src={item.videoMp4} type="video/mp4" />
        </video>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.poster}
          src={item.mobilePoster}
          alt=""
          decoding="async"
        />
      </div>
      <div className={styles.cardInner}>
        <h3 className={styles.title}>{item.title}</h3>
        <div className={styles.tags}>
          {item.tags.map((t) => (
            <span key={t} className={styles.tag}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
