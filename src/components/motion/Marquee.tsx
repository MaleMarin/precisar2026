"use client";

import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";
import styles from "./Marquee.module.css";

export type MarqueeProps = {
  text: string;
  imageSrc?: string;
  bgColor: string;
  textColor: string;
  height?: "sm" | "md" | "lg" | "xl";
};

export function Marquee({ text, imageSrc, bgColor, textColor, height = "md" }: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const heightClass =
    height === "sm"
      ? styles.hSm
      : height === "lg"
        ? styles.hLg
        : height === "xl"
          ? styles.hXl
          : styles.hMd;

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, [text, imageSrc]);

  const cell = (hidden: boolean) => (
    <div className={`${styles.set} ${heightClass}`} aria-hidden={hidden || undefined}>
      <span className={styles.text} style={{ color: textColor }}>
        {text}
      </span>
      {imageSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img className={styles.image} src={imageSrc} alt="" />
      ) : null}
    </div>
  );

  return (
    <div className={styles.root} style={{ background: bgColor }}>
      <div className={styles.track} ref={trackRef}>
        {cell(false)}
        {cell(true)}
      </div>
    </div>
  );
}
