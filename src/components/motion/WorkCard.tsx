"use client";

import Link from "next/link";
import styles from "./WorkCard.module.css";

export type WorkCardProps = {
  title: string;
  tags: string[];
  videoSrc?: string;
  posterSrc: string;
  href: string;
};

export function WorkCard({ title, tags, videoSrc, posterSrc, href }: WorkCardProps) {
  return (
    <div className={styles.wrapper}>
      <Link href={href} className={styles.card}>
        <div className={styles.media}>
          {videoSrc ? (
            <video
              className={styles.video}
              autoPlay
              muted
              playsInline
              loop
              poster={posterSrc}
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
          ) : null}
          { }
          <img className={styles.poster} src={posterSrc} alt="" decoding="async" />
        </div>
        <div className={styles.scrim} aria-hidden />
        <div className={styles.body}>
          <div className={styles.titleRow}>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
            <h3 className={styles.title}>{title}</h3>
          </div>
          <div className={styles.tags}>
            {tags.map((t) => (
              <span key={t} className={styles.tag}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
}
