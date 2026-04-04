"use client";

import styles from "./MotionDemoPage.module.css";
import { Marquee } from "./Marquee";
import { MotionFaq } from "./MotionFaq";
import { WorkCard } from "./WorkCard";

const POSTER = "/studio/poster-1.svg";

const FAQ_ITEMS = [
  {
    question: "¿Qué es data-reveal?",
    answer:
      "Atributos en el HTML que un hook escanea al montar la ruta y animan con GSAP + ScrollTrigger (título 3D, líneas, borde, objeto).",
  },
  {
    question: "¿Lenis y ScrollTrigger?",
    answer:
      "Lenis dispara ScrollTrigger.update en scroll; el RAF de Lenis va acoplado al ticker de GSAP para evitar desincronía.",
  },
];

export function MotionDemoPage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroVideo} aria-hidden>
          <video
            className={styles.heroVideoEl}
            autoPlay
            muted
            playsInline
            loop
            poster={POSTER}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className={styles.heroScrim} />
        </div>
        <div className={styles.heroInner}>
          <h1
            className={styles.heroTitle}
            data-reveal="lines"
            data-reveal-stagger="0.06"
            data-reveal-duration="0.9"
          >
            {`Movimiento
como sistema`}
          </h1>
          <p
            className={styles.heroSub}
            data-reveal="lines"
            data-reveal-stagger="0.04"
            data-reveal-duration="0.75"
          >
            {`Demo técnica: reveal + Lenis + tarjetas + marquee.
Sin copiar contenido de terceros.`}
          </p>
          <p className={styles.heroNote}>
            Coloca <code>/public/videos/hero.mp4</code> para el loop de fondo; si no existe, se ve el poster.
          </p>
        </div>
      </header>

      <Marquee
        text="Precisar · criterio · información · cultura digital"
        bgColor="var(--color-bg, #0e0e0e)"
        textColor="var(--color-text-light, #f0f0ec)"
        height="lg"
      />

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <div className={styles.workGrid}>
            <WorkCard
              title="Territorio"
              tags={["AMI", "Participación"]}
              posterSrc="/studio/poster-2.svg"
              href="/programas/ciudades"
            />
            <WorkCard
              title="Aula y docencia"
              tags={["Mediación", "Recursos"]}
              posterSrc="/studio/poster-3.svg"
              href="/programas/docentes"
            />
            <WorkCard
              title="Editorial"
              tags={["Análisis", "Debates"]}
              posterSrc="/studio/poster-4.svg"
              href="/precisando"
            />
          </div>
        </div>
      </section>

      <Marquee
        text="Scroll suave · GSAP · Framer · Next.js"
        bgColor="var(--color-bg-light, #f0f0ec)"
        textColor="var(--color-text-dark, #1a1a1a)"
        height="md"
      />

      <section className={`${styles.section} ${styles.lightBand}`}>
        <div className={styles.sectionInner}>
          <div
            className={styles.borderLine}
            data-reveal="border"
            data-reveal-duration="1.1"
            aria-hidden
          />
          <div className={styles.perspective}>
            <h2 className={styles.title3d} data-reveal="title" data-reveal-duration="1">
              Título con perspectiva
            </h2>
          </div>
          <p
            className={styles.bodyLines}
            data-reveal="lines"
            data-reveal-stagger="0.05"
            data-reveal-duration="0.8"
          >
            {`Las líneas se preparan en el hook:
cada salto de línea genera un mask vertical.`}
          </p>
          <p
            className={styles.bodyLines}
            style={{ marginTop: "1.25rem" }}
            data-reveal="object"
            data-reveal-distance="2"
            data-reveal-duration="0.7"
            data-reveal-fade=""
          >
            Bloque object: desplazamiento vertical configurable con data-reveal-distance (×10 px).
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.faqSection}`}>
        <div className={styles.sectionInner}>
          <h2 className={styles.faqTitle}>Preguntas (details + GSAP)</h2>
          <MotionFaq items={FAQ_ITEMS} />
        </div>
      </section>
    </div>
  );
}
