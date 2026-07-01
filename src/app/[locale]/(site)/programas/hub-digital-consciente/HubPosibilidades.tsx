"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./HubInteractivo.module.css";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction >= 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction >= 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

type Slide = { title: string; desc: string };

export function HubPosibilidades() {
  const t = useTranslations("programsHub.posibilidades");
  const slides = t.raw("slides") as Slide[];
  const [[page, direction], setPage] = useState([0, 0]);

  const slideIndex = ((page % slides.length) + slides.length) % slides.length;
  const slide = slides[slideIndex]!;

  const paginate = (newDirection: number) => {
    setPage(([p]) => [p + newDirection, newDirection]);
  };

  const goTo = (index: number) => {
    const delta = index - slideIndex;
    if (delta === 0) return;
    setPage([index, delta > 0 ? 1 : -1]);
  };

  const total = slides.length;
  const numLabel = `${String(slideIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const carouselBg = slideIndex % 2 === 0 ? "#DB5227" : "#023661";

  return (
    <section className={styles.hubSection} aria-label={t("aria")}>
      <p className={styles.hubSectionLabel}>{t("label")}</p>
      <div className={styles.hubCarousel} style={{ background: carouselBg }}>
        <div style={{ position: "relative", overflow: "hidden", flex: "1 1 auto", minHeight: 0 }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={slideIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className={styles.hubSlideTitle}>{slide.title}</h2>
              <p className={styles.hubSlideDesc}>{slide.desc}</p>
              <p className={styles.hubSlideNum}>{numLabel}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.hubCarouselNav}>
          <div className={styles.hubDots} role="tablist" aria-label={t("slideAria")}>
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === slideIndex}
                className={i === slideIndex ? `${styles.hubDot} ${styles.hubDotActive}` : styles.hubDot}
                onClick={() => goTo(i)}
                aria-label={t("slideN", { n: i + 1, total })}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              className={styles.hubNavBtn}
              aria-label={t("prevSlide")}
              onClick={() => paginate(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.hubNavBtn}
              aria-label={t("nextSlide")}
              onClick={() => paginate(1)}
            >
              ›
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
