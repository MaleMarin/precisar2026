"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./EquilibrioDigitalExperience.module.css";

const EQUILIBRIO_POSTER =
  "https://static.wixstatic.com/media/4c5e66_402017c5087f4db1bee19ba883fb69ec~mv2.png";
const EQUILIBRIO_VIDEO =
  "https://video.wixstatic.com/video/4c5e66_eb3735899a9b4635a793f637b6a10037/720p/mp4/file.mp4";

export function EquilibrioDigitalExperience() {
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

      <section className={styles.hero} aria-label="Introducción Equilibrio">
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
            <h1 className={styles.heroTitle}>Equilibrio Digital</h1>
            <p className={styles.lead}>
              La capacidad para mantener balance entre la vida online y offline, preservando el bienestar
              integral.
            </p>
            <p className={styles.leadMuted}>
              <strong>Recupera tu Tiempo: Encuentra tu Equilibrio en la Era Digital</strong>
            </p>
          </div>

          <div className={styles.heroArt} ref={artRef}>
            <div className={styles.videoBack}>
              <div className={styles.videoFrame}>
                <video autoPlay muted loop playsInline poster={EQUILIBRIO_POSTER}>
                  <source src={EQUILIBRIO_VIDEO} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className={styles.fg}>
              <div className={styles.floaty}>
                <img
                  ref={imgRef}
                  className={styles.fgImg}
                  alt="Ilustración Equilibrio"
                  src={EQUILIBRIO_POSTER}
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
          <h2 className={styles.h2}>Equilibrio Digital</h2>
          <div className={styles.quote}>
            Vivir conectados es increíble, pero ¿sientes a veces que la vida online le roba espacio a tu vida
            real? Alcanzar un “Equilibrio Digital” no se trata de abandonar la tecnología, sino de dominarla.
            Es la capacidad de disfrutar de ambos mundos, online y offline, manteniendo un balance que cuide tu
            bienestar integral.
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="ingredientes">
          <h2 className={styles.h2}>Los 4 Ingredientes para un Equilibrio Saludable</h2>
          <p className={styles.bodyText}>
            Piensa en estos puntos como la receta para una vida digital más plena y consciente:
          </p>
          <div className={`${styles.grid2} ${styles.marginTop14}`}>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Balance entre mundo digital y físico</strong>
                <br />
                Define espacios y tiempos para cada uno.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Bienestar integral</strong>
                <br />
                Integra prácticas que cuiden cuerpo, mente y emociones.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Presencia real</strong>
                <br />
                Estar con la mente y el corazón, tanto online como offline.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Hábitos saludables</strong>
                <br />
                Crea rutinas que te permitan desconectar sin culpa.
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="reflexion">
          <h2 className={styles.h2}>Un Espejo para Reflexionar: ¿Quién Lleva el Timón?</h2>
          <div className={`${styles.qgrid} ${styles.marginTop14}`}>
            <div className={styles.qcard}>¿Un dispositivo es lo primero al despertar y lo último al dormir?</div>
            <div className={styles.qcard}>¿Puedes estar varias horas sin teléfono sin ansiedad?</div>
            <div className={styles.qcard}>¿Tienes momentos sagrados de desconexión digital?</div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="test">
          <h2 className={styles.h2}>Mini-Test: ¿Cómo Está tu Balanza Digital?</h2>
          <p className={styles.bodyText}>Elige la opción que mejor te represente.</p>

          <h3 className={`${styles.h3} ${styles.marginTop14}`}>1. Relación con el móvil</h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Lo reviso sin parar, aunque no suene ni vibre.</div>
            <div className={styles.opt}>B) Lo uso bastante y a veces intento controlarme.</div>
            <div className={styles.opt}>C) Tengo momentos específicos del día para revisarlo.</div>
            <div className={styles.opt}>D) Puedo estar horas sin mirarlo, sin ansiedad.</div>
          </div>

          <h3 className={`${styles.h3} ${styles.marginTop22}`}>2. En una comida o reunión</h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Estoy pendiente del teléfono, es casi un invitado más.</div>
            <div className={styles.opt}>B) Lo reviso de vez en cuando, por si acaso.</div>
            <div className={styles.opt}>C) Solo si espero algo importante.</div>
            <div className={styles.opt}>D) Lo dejo guardado y me enfoco en la conversación.</div>
          </div>

          <h3 className={`${styles.h3} ${styles.marginTop22}`}>3. Desconectar de verdad</h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Nunca desconecto, siempre disponible.</div>
            <div className={styles.opt}>B) Solo cuando no hay alternativa.</div>
            <div className={styles.opt}>C) Momentos planificados de desconexión cada semana.</div>
            <div className={styles.opt}>D) Es parte de mi rutina de bienestar.</div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="analisis">
          <h2 className={styles.h2}>Análisis de Resultados: ¿Hacia Dónde se Inclina tu Balanza?</h2>
          <p className={styles.bodyText}>
            <strong>Mayoría A y B — Oportunidad de mejora:</strong> La tecnología podría estar ocupando un rol
            protagónico. Toca recalibrar y recuperar el control.
          </p>
          <p className={`${styles.bodyText} ${styles.marginTop14}`}>
            <strong>Mayoría C y D — ¡Vas muy bien!:</strong> Mantienes una relación saludable entre tu vida
            conectada y tu vida real. ¡Sigue así!
          </p>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="misiones">
          <h2 className={styles.h2}>¡Pasa a la Acción! Misiones para Recargar tu Vida Real</h2>
          <div className={`${styles.stack} ${styles.marginTop14}`}>
            <div className={styles.stepper}>
              <div className={styles.step}>
                <div className={styles.badge}>1</div>
                <div>
                  <strong>Misión “Crea tus Santuarios Libres de Tecnología”</strong>
                  <br />
                  Elige al menos 3 espacios en casa y 2–3 momentos del día (comidas, primera hora, última hora)
                  y decláralos zonas libres de tecnología.
                </div>
              </div>
            </div>
            <div className={styles.stepper}>
              <div className={styles.step}>
                <div className={styles.badge}>2</div>
                <div>
                  <strong>Misión “Tu Día de Detox Digital”</strong>
                  <br />
                  Elige un día del fin de semana, desconecta lo no esencial y redescubre alternativas analógicas:
                  libro, juegos de mesa, charla cara a cara.
                </div>
              </div>
            </div>
            <div className={styles.stepper}>
              <div className={styles.step}>
                <div className={styles.badge}>3</div>
                <div>
                  <strong>Misión “Tu Presupuesto de Tiempo Digital”</strong>
                  <br />
                  Define un presupuesto para redes/noticias, usa apps para monitorear y prueba bloques de trabajo
                  con descansos.
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
