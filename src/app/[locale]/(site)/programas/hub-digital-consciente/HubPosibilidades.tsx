"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./HubInteractivo.module.css";

const SLIDES = [
  {
    title: "Activación previa al evento",
    desc: "Despliega módulos interactivos en pasillos o vestíbulos para que la audiencia descubra conceptos clave antes de cualquier actividad programada.",
  },
  {
    title: "Puntos de encuentro temáticos",
    desc: "Crea estaciones dedicadas a la privacidad, la IA, la desinformación o la ética digital, permitiendo que los visitantes transiten libremente entre ellas.",
  },
  {
    title: "Rutas autoguiadas",
    desc: "Diseña un recorrido cronológico o lógico que guíe a las personas por distintos retos y experiencias, cada uno acompañado de soportes visuales y multimedia.",
  },
  {
    title: "Elementos móviles",
    desc: "Utiliza tablets, kioscos portátiles o gafas de realidad aumentada para llevar la instalación a espacios reducidos o itinerantes dentro del mismo recinto.",
  },
  {
    title: "Material descargable",
    desc: "Ofrece a los visitantes códigos QR que enlacen a guías, infografías y recursos digitales para profundizar después del evento.",
  },
  {
    title: "Salas de reflexión",
    desc: "Habilita áreas con mobiliario cómodo donde se proyecten cortos videos de discusión o paneles de expertos, invitando al diálogo espontáneo.",
  },
  {
    title: "Interacción IA en vivo",
    desc: "Incluye chatbots o asistentes virtuales que respondan preguntas, generen análisis de perfiles de privacidad y ofrezcan recomendaciones personalizadas.",
  },
  {
    title: "Experiencias inmersivas",
    desc: "Incorpora videoproyecciones 360°, realidad virtual y entornos sonoros para sumergir al visitante en escenarios que ilustran riesgos y oportunidades tecnológicas.",
  },
  {
    title: "Gamificación",
    desc: "Implementa desafíos y juegos basados en preguntas sobre los temas decididos, recompensando la participación con insignias digitales o reconocimientos físicos.",
  },
  {
    title: "Integración con ponencias",
    desc: "Combina las estaciones interactivas con conferencias, de modo que cada ponente pueda referirse a los módulos específicos para ejemplificar sus argumentos.",
  },
];

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

export function HubPosibilidades() {
  const [[page, direction], setPage] = useState([0, 0]);

  const slideIndex = ((page % SLIDES.length) + SLIDES.length) % SLIDES.length;
  const slide = SLIDES[slideIndex]!;

  const paginate = (newDirection: number) => {
    setPage(([p]) => [p + newDirection, newDirection]);
  };

  const goTo = (index: number) => {
    const delta = index - slideIndex;
    if (delta === 0) return;
    setPage([index, delta > 0 ? 1 : -1]);
  };

  const total = SLIDES.length;
  const numLabel = `${String(slideIndex + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const carouselBg = slideIndex % 2 === 0 ? "#DB5227" : "#023661";

  return (
    <section className={styles.hubSection} aria-label="Posibilidades del hub interactivo">
      <p className={styles.hubSectionLabel}>Posibilidades</p>
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
          <div className={styles.hubDots} role="tablist" aria-label="Ir a diapositiva">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                role="tab"
                aria-selected={i === slideIndex}
                className={i === slideIndex ? `${styles.hubDot} ${styles.hubDotActive}` : styles.hubDot}
                onClick={() => goTo(i)}
                aria-label={`Diapositiva ${i + 1} de ${total}`}
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              className={styles.hubNavBtn}
              aria-label="Diapositiva anterior"
              onClick={() => paginate(-1)}
            >
              ‹
            </button>
            <button
              type="button"
              className={styles.hubNavBtn}
              aria-label="Diapositiva siguiente"
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
