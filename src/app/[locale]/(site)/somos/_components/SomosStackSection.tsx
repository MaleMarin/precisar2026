"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLayoutEffect, useMemo, useRef, type ReactNode } from "react";
import styles from "../SomosPage.module.css";

export type SomosStackTheme = "light" | "mist" | "accent" | "dark";

type Aria =
  | { "aria-label": string; "aria-labelledby"?: undefined }
  | { "aria-labelledby": string; "aria-label"?: undefined };

export type SomosStackSectionProps = {
  children: ReactNode;
  index: number;
  total: number;
  theme: SomosStackTheme;
} & Aria;

/**
 * Misma mecánica que los paneles de portada (`MotionStackPanels`):
 * sección alta + panel sticky que escala, sube y se inclina al apilarse.
 */
export function SomosStackSection({ children, index, total, theme, ...aria }: SomosStackSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  /** Altura de sección acorde al contenido + “colchón” de scroll para el stack (evita cajas vacías tipo 100vh). */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const measure = measureRef.current;
    if (!section || !measure) return;

    const update = () => {
      const vh = window.visualViewport?.height ?? window.innerHeight;
      const contentH = measure.offsetHeight;
      const slack = Math.min(Math.max(vh * 0.36, 160), vh * 0.48);
      section.style.minHeight = `${Math.max(contentH + slack, vh * 0.82)}px`;
    };

    update();
    const raf = requestAnimationFrame(() => update());
    const ro = new ResizeObserver(() => {
      queueMicrotask(update);
    });
    ro.observe(measure);
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const progress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 10_000 : 72,
    damping: reduceMotion ? 100 : 26,
    mass: reduceMotion ? 0.08 : 0.95,
    restDelta: 0.0004,
  });

  const scale = useTransform(
    progress,
    [0, 0.14, 0.32, 0.52, 0.74, 0.9, 1],
    reduceMotion ? [1, 1, 1, 1, 1, 1, 1] : [1, 0.994, 0.984, 0.972, 0.958, 0.948, 0.938],
  );
  const y = useTransform(
    progress,
    [0, 0.2, 0.42, 0.62, 0.82, 1],
    reduceMotion ? [0, 0, 0, 0, 0, 0] : [0, -24, -58, -96, -138, -182],
  );
  const borderRadius = useTransform(
    progress,
    [0, 0.22, 0.55, 1],
    reduceMotion ? [0, 0, 0, 0] : [0, 22, 44, 68],
  );
  const contentY = useTransform(
    progress,
    [0, 0.22, 0.52, 1],
    reduceMotion ? [0, 0, 0, 0] : [0, -14, -44, -72],
  );
  const lineScale = useTransform(progress, [0, 0.1, 0.26, 0.42], [0.1, 0.48, 0.82, 1]);

  const rotateX = useTransform(
    progress,
    [0, 0.36, 0.5, 0.62, 0.78, 1],
    reduceMotion ? [0, 0, 0, 0, 0, 0] : [0, 0, -2.2, -9, -18, -26],
  );

  const stackTopGap = 8;
  const panelMotionStyle = {
    scale,
    y,
    borderRadius,
    rotateX,
    transformOrigin: "50% 98%",
    top: `${index * stackTopGap}px`,
    zIndex: total - index,
  };

  const panelDepthEnterProps = useMemo(
    () =>
      reduceMotion
        ? { className: styles.somosDepth }
        : {
            className: styles.somosDepth,
            initial: { rotateX: 2, scale: 0.98 },
            whileInView: { rotateX: 0, scale: 1 },
            viewport: { once: true, amount: 0.22 },
            transition: { duration: 0.6, ease: "easeOut" as const },
          },
    [reduceMotion],
  );

  const stickyClass =
    theme === "mist"
      ? `${styles.somosSticky} ${styles.somosStickyMist}`
      : theme === "accent"
        ? `${styles.somosSticky} ${styles.somosStickyAccent}`
        : theme === "dark"
          ? `${styles.somosSticky} ${styles.somosStickyDark}`
          : `${styles.somosSticky} ${styles.somosStickyLight}`;

  const glowClass = [
    styles.somosPanelGlow,
    theme === "accent"
      ? styles.somosGlowAccent
      : theme === "dark"
        ? styles.somosGlowDark
        : styles.somosGlowLight,
    theme === "light" || theme === "mist" ? styles.somosGlowDrift : "",
  ]
    .filter(Boolean)
    .join(" ");

  const lineClass = [
    styles.somosTopLine,
    theme === "accent" || theme === "dark" ? styles.somosLineOnDark : styles.somosLineLight,
  ].join(" ");

  return (
    <section
      ref={sectionRef}
      className={styles.somosPanelSection}
      data-somos-parity={index % 2 === 0 ? "even" : "odd"}
      {...aria}
    >
      <motion.div style={panelMotionStyle} className={`${stickyClass} ${styles.somosStickyFit}`}>
        <motion.div {...panelDepthEnterProps}>
          <div className={glowClass} aria-hidden />
          <motion.div style={{ scaleX: lineScale }} className={lineClass} aria-hidden />
          <motion.div style={reduceMotion ? undefined : { y: contentY }} className={styles.somosPanelScroll}>
            <div ref={measureRef} className={styles.somosMeasureWrap}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
