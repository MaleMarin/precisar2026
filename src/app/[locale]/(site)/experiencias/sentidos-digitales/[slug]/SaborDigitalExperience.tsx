"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./SaborDigitalExperience.module.css";

const SABOR_POSTER =
  "https://static.wixstatic.com/media/4c5e66_6c359ba2ddb448e7ba8550bb136f910c~mv2.png";
const SABOR_VIDEO =
  "https://video.wixstatic.com/video/4c5e66_3d5e4d8b929c4f9da7c56bbeecef001a/720p/mp4/file.mp4";

export function SaborDigitalExperience() {
  const artRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    const art = artRef.current;
    if (!img || !art) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    let rect: DOMRect | undefined;

    const recalc = () => {
      rect = art.getBoundingClientRect();
    };

    const move = (clientX: number, clientY: number) => {
      if (!rect) recalc();
      if (!rect) return;
      const nx = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((clientY - rect.top) / rect.height) * 2 - 1;
      img.style.transform = `translate3d(${nx * 18}%, ${ny * 10}%, 0) scale(1.06)`;
    };

    const onPointerMove = (e: PointerEvent) => {
      move(e.clientX, e.clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      move(e.touches[0].clientX, e.touches[0].clientY);
    };

    const reset = () => {
      img.style.transform = "translate3d(0,0,0) scale(1.06)";
    };

    recalc();
    window.addEventListener("resize", recalc);
    art.addEventListener("pointermove", onPointerMove);
    art.addEventListener("pointerleave", reset);
    art.addEventListener("touchmove", onTouchMove, { passive: true });
    art.addEventListener("touchend", reset);

    return () => {
      window.removeEventListener("resize", recalc);
      art.removeEventListener("pointermove", onPointerMove);
      art.removeEventListener("pointerleave", reset);
      art.removeEventListener("touchmove", onTouchMove);
      art.removeEventListener("touchend", reset);
    };
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.toolbar}>
        <div className={styles.toolbarInner}>
          <Link href="/experiencias/sentidos-digitales" className={styles.back}>
            ← Volver a Sentidos digitales
          </Link>
        </div>
      </div>

      <section className={styles.hero} aria-label="Introducción Gusto">
        <svg
          className={`${styles.wave} ${styles.waveTop}`}
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="#ffffff"
            d="M0,160 C240,120 480,40 720,80 C960,120 1200,180 1440,140 L1440,0 L0,0 Z"
          />
        </svg>

        <div className={styles.shell}>
          <div>
            <h1 className={styles.heroTitle}>Gusto Digital</h1>
            <p className={styles.lead}>
              La capacidad para discernir y seleccionar contenido de calidad, desarrollando un “paladar
              digital” que prefiere información nutritiva.
            </p>
            <p className={styles.leadMuted}>
              <strong>Conviértete en un Gourmet Digital: Desarrolla tu Propio “Sabor”</strong>
            </p>
          </div>

          <div className={styles.heroArt} ref={artRef}>
            <div className={styles.videoBack}>
              <div className={styles.videoFrame}>
                <video autoPlay muted loop playsInline poster={SABOR_POSTER}>
                  <source src={SABOR_VIDEO} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className={styles.fg}>
              <div className={styles.floaty}>
                <img
                  ref={imgRef}
                  className={styles.fgImg}
                  alt="Ilustración Gusto"
                  src={SABOR_POSTER}
                  width={700}
                  height={875}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>

        <svg
          className={`${styles.wave} ${styles.waveBottom}`}
          viewBox="0 0 1440 220"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="#ffffff"
            d="M0,40 C300,120 520,220 820,160 C1120,100 1260,120 1440,160 L1440,220 L0,220 Z"
          />
        </svg>
      </section>

      <main className={styles.wrap}>
        <section className={`${styles.card} ${styles.section}`} id="intro">
          <h2 className={styles.h2}>Gusto Digital</h2>
          <div className={styles.quote}>
            En un buffet infinito de información, no todo lo que brilla es nutritivo. Desarrollar tu “Sabor
            Digital” es el arte de convertirte en un verdadero sommelier de contenidos: educar tu paladar
            digital para distinguir y preferir lo que te alimenta, en lugar de la comida chatarra.
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="ingredientes">
          <h2 className={styles.h2}>Los Ingredientes Clave para un Buen Sabor Digital</h2>
          <p className={styles.bodyText}>
            Para empezar a refinar tu paladar, necesitas estos cuatro ingredientes fundamentales:
          </p>
          <div className={`${styles.grid2} ${styles.marginTop14}`}>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Dieta informacional balanceada y variada</strong>
                <br />
                Combina formatos y temas para evitar sesgos y vacíos.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Criterio bien formado</strong>
                <br />
                Aprende a distinguir contenido de alta calidad del que no lo es.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Consumo consciente</strong>
                <br />
                Presta atención a lo que “ingieres” digitalmente y a cómo te hace sentir.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Diversificación de fuentes</strong>
                <br />
                Sigue fuentes confiables y variadas para tener una visión más completa.
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="cata">
          <h2 className={styles.h2}>Una Pequeña Cata de tus Hábitos</h2>
          <p className={styles.bodyText}>
            Antes de continuar, reflexiona un momento. Es una invitación a conocer mejor tus gustos actuales.
          </p>
          <div className={`${styles.qgrid} ${styles.marginTop14}`}>
            <div className={styles.qcard}>
              ¿Sueles verificar la información que recibes antes de darla por cierta o compartirla?
            </div>
            <div className={styles.qcard}>
              Si lo describieras, ¿qué tipo de contenido “consumes” más en tu día a día?
            </div>
            <div className={styles.qcard}>
              ¿Te resulta fácil distinguir entre contenido de calidad y un titular engañoso o{" "}
              <em>clickbait</em>?
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="test">
          <h2 className={styles.h2}>Mini-Test: ¿Qué tal está tu “Paladar Digital”?</h2>
          <p className={styles.bodyText}>
            Este test rápido te ayudará a entender mejor tu perfil. ¡Elige la opción con la que más te
            identifiques!
          </p>

          <h3 className={`${styles.h3} ${styles.marginTop14}`}>
            1. Cuando te topas con una noticia impactante o sorprendente…
          </h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) La comparto de inmediato si me llama la atención.</div>
            <div className={styles.opt}>B) Primero la leo completa y luego decido si la comparto.</div>
            <div className={styles.opt}>C) Verifico la fuente y busco qué dicen otros medios.</div>
            <div className={styles.opt}>
              D) Investigo en sitios de <em>fact-checking</em> antes de formarme una opinión.
            </div>
          </div>

          <h3 className={`${styles.h3} ${styles.marginTop22}`}>
            2. Tu feed de noticias o redes sociales se compone principalmente de…
          </h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Contenido viral y de entretenimiento.</div>
            <div className={styles.opt}>B) Una mezcla: entretenimiento y algunos temas de interés.</div>
            <div className={styles.opt}>C) Contenido variado con foco informativo o educativo.</div>
            <div className={styles.opt}>
              D) Un espacio cuidadosamente seleccionado por mí, con fuentes diversas y de alta calidad.
            </div>
          </div>

          <h3 className={`${styles.h3} ${styles.marginTop22}`}>3. Cuando buscas información sobre un tema…</h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Me quedo con la primera información que encuentro.</div>
            <div className={styles.opt}>B) Si me interesa, comparo un par de fuentes.</div>
            <div className={styles.opt}>C) Contrasto activamente diferentes puntos de vista.</div>
            <div className={styles.opt}>D) Voy a fuentes primarias y análisis profundos.</div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="analisis">
          <h2 className={styles.h2}>Análisis de Resultados: El Diagnóstico de tu Sabor Digital</h2>
          <p className={styles.bodyText}>
            <strong>Mayoría A y B — Paladar en entrenamiento:</strong> Es común consumir información sin
            muchos filtros o verificación. Tienes una gran oportunidad para descubrir nuevos “sabores” y
            refinar tus gustos.
          </p>
          <p className={`${styles.bodyText} ${styles.marginTop14}`}>
            <strong>Mayoría C y D — ¡Gourmet digital!:</strong> Paladar refinado: eres crítico con lo que
            consumes y buscas activamente contenido de calidad que te aporte valor.
          </p>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="recetas">
          <h2 className={styles.h2}>Recetas para Afinar tu Sabor Digital</h2>
          <p className={styles.bodyText}>
            ¿Listo para convertirte en chef de tu propio contenido? Aquí tienes tres desafíos prácticos.
          </p>

          <div className={`${styles.stack} ${styles.marginTop14}`}>
            <div className={styles.stepper}>
              <div className={styles.step}>
                <div className={styles.badge}>1</div>
                <div>
                  <strong>Receta “Dieta Informacional de 7 Días”</strong>
                  <ul className={styles.recipeList}>
                    <li>
                      Durante una semana, haz un <em>detox</em>: identifica y elimina 3 fuentes de “comida
                      chatarra digital”.
                    </li>
                    <li>
                      Añade 3 fuentes de “contenido nutritivo” (blogs de expertos, documentales, canales
                      educativos).
                    </li>
                    <li>Lleva un diario breve y anota cómo te sientes con el cambio.</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.stepper}>
              <div className={styles.step}>
                <div className={styles.badge}>2</div>
                <div>
                  <strong>Receta “El Desafío del Detective”</strong>
                  <ul className={styles.recipeList}>
                    <li>
                      Por 5 días, verifica al menos 3 noticias o datos que encuentres cada día.
                    </li>
                    <li>
                      Usa sitios de <em>fact-checking</em> y busca la fuente original de la información.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.stepper}>
              <div className={styles.step}>
                <div className={styles.badge}>3</div>
                <div>
                  <strong>Receta “Diseña tu Menú Digital Semanal”</strong>
                  <ul className={styles.recipeList}>
                    <li>Planifica tu consumo como si fuera un menú.</li>
                    <li>Incluye “grupos alimenticios”: educación, inspiración, actualidad, etc.</li>
                    <li>Establece porciones de tiempo saludables para cada tipo de contenido.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.footerCta}>
          <Link href="/experiencias/sentidos-digitales" className={styles.ctaPill}>
            ← Volver a Sentidos digitales
          </Link>
        </div>
      </main>
    </div>
  );
}
