"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PREGUNTAS_VIDA_DIGITAL } from "@/data/una-pregunta-al-dia-content";
import styles from "./UnaPreguntaAlDiaExperience.module.css";

const PDF_HREF =
  "https://www.precisar.net/_files/ugd/4c5e66_7bbe4f8327d74d98a0851a9ea8af8ff6.pdf";

function activeIndexFromCalendarDay(): number {
  const dia = new Date().getDate();
  let n = dia;
  if (dia > 30) n = dia % 30;
  if (n === 0) n = 30;
  return n - 1;
}

export function UnaPreguntaAlDiaExperience() {
  const reduceMotion = useReducedMotion();
  const [diaCal] = useState(() => new Date().getDate());
  const [activeIndex, setActiveIndex] = useState(() => activeIndexFromCalendarDay());
  const [flipped, setFlipped] = useState(false);
  const [slideDir, setSlideDir] = useState(1);

  const item = PREGUNTAS_VIDA_DIGITAL[activeIndex];
  const ghostNum = String(diaCal).padStart(2, "0");
  const eyebrowMid = diaCal;

  const goPrev = () => {
    setSlideDir(-1);
    setFlipped(false);
    setActiveIndex((i) => (i - 1 + PREGUNTAS_VIDA_DIGITAL.length) % PREGUNTAS_VIDA_DIGITAL.length);
  };

  const goNext = () => {
    setSlideDir(1);
    setFlipped(false);
    setActiveIndex((i) => (i + 1) % PREGUNTAS_VIDA_DIGITAL.length);
  };

  const selectMini = (index: number) => {
    setSlideDir(index > activeIndex ? 1 : -1);
    setFlipped(false);
    setActiveIndex(index);
    document.getElementById("una-pregunta-hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const toggleFlip = () => setFlipped((f) => !f);

  const pageClass = [styles.page, reduceMotion ? styles.reduceMotion : ""].filter(Boolean).join(" ");

  return (
    <div className={pageClass}>
      <section id="una-pregunta-hero" className={styles.hero} aria-label="Pregunta del día">
        <div className={styles.heroGhost} aria-hidden>
          {ghostNum}
        </div>
        <div className={styles.heroInner}>
          <p className={styles.eyebrow}>
            PREGUNTA DEL DÍA · {eyebrowMid} DE 30
          </p>

          <div className={styles.cardRow}>
            <button type="button" className={styles.arrowBtn} aria-label="Pregunta anterior" onClick={goPrev}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            <div className={styles.cardColumn}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={reduceMotion ? false : { opacity: 0, x: slideDir * 48 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, x: -slideDir * 48 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  style={{ width: "100%" }}
                >
                  <div
                    className={styles.cardContainer}
                    data-flipped={flipped ? "true" : "false"}
                    role="button"
                    tabIndex={0}
                    aria-expanded={flipped}
                    aria-label={flipped ? "Ver frente de la tarjeta" : "Ver reverso de la tarjeta"}
                    onClick={toggleFlip}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        toggleFlip();
                      }
                    }}
                  >
                    <div className={styles.cardInner}>
                      <div className={styles.cardFront}>
                        <div className={styles.cardNum}>{activeIndex + 1}</div>
                        <p className={styles.cardQuestion}>{item.pregunta}</p>
                      </div>
                      <div className={styles.cardBack}>
                        <p className={styles.reflexLabel}>Para reflexionar:</p>
                        <p className={styles.reflexBody}>{item.reflexion}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <button type="button" className={styles.arrowBtn} aria-label="Pregunta siguiente" onClick={goNext}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <p className={styles.hint}>Toca para ver el reverso</p>
        </div>
      </section>

      <section className={styles.explore} aria-labelledby="explorar-todas">
        <div className={styles.exploreDivider}>
          <div className={styles.exploreLine} aria-hidden />
          <h2 id="explorar-todas" className={styles.exploreLabel}>
            LAS 60 PREGUNTAS
          </h2>
          <div className={styles.exploreLine} aria-hidden />
        </div>

        <ul className={styles.grid}>
          {PREGUNTAS_VIDA_DIGITAL.map((p, i) => (
            <li key={p.pregunta}>
              <button
                type="button"
                className={`${styles.miniCard} ${i === activeIndex ? styles.miniCardActive : ""}`}
                onClick={() => selectMini(i)}
              >
                <span className={styles.miniNum}>{i + 1}</span>
                <span className={styles.miniQ}>{p.pregunta}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.download} aria-labelledby="descarga-titulo">
        <div className={styles.downloadInner}>
          <div>
            <h2 id="descarga-titulo" className={styles.downloadTitle}>
              30 preguntas para explorar tu vida digital
            </h2>
            <p className={styles.downloadDesc}>
              Este recurso reúne 30 preguntas que invitan a observar con más atención nuestros hábitos
              digitales, emociones, decisiones y relaciones en línea. No están hechas para evaluar, sino
              para provocar curiosidad, conversación y pensamiento crítico.
            </p>
          </div>
          <a
            className={styles.downloadBtn}
            href={PDF_HREF}
            target="_blank"
            rel="noreferrer"
          >
            DESCARGA
          </a>
        </div>
      </section>
    </div>
  );
}
