"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import styles from "./Marquee.module.css";

export type MarqueeProps = {
  text: string;
  imageSrc?: string;
  bgColor: string;
  textColor: string;
  height?: "sm" | "md" | "lg" | "xl";
  /** Por defecto mayúsculas (ritmo “poster”). Desactivar para frases en oración. */
  uppercase?: boolean;
};

export function Marquee({
  text,
  imageSrc,
  bgColor,
  textColor,
  height = "md",
  uppercase = true,
}: MarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const heightClass =
    height === "sm"
      ? styles.hSm
      : height === "lg"
        ? styles.hLg
        : height === "xl"
          ? styles.hXl
          : styles.hMd;

  /** Una sola dependencia evita avisos si el tamaño del array de deps variara entre renders (p. ej. HMR). */
  const animationKey = JSON.stringify([text, imageSrc ?? "", uppercase]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 20,
      ease: "none",
      repeat: -1,
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      tween.kill();
    };
  }, [animationKey]);

  const textClass = `${styles.text}${uppercase ? "" : ` ${styles.textSentence}`}`;

  const cell = (hidden: boolean) => (
    <div className={`${styles.set} ${heightClass}`} aria-hidden={hidden || undefined}>
      <span className={textClass} style={{ color: textColor }}>
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
