"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./VisionDigitalExperience.module.css";

const VISION_POSTER =
  "https://static.wixstatic.com/media/4c5e66_1d8d497349824658bf6b4a0c0921048c~mv2.png";
const VISION_VIDEO =
  "https://video.wixstatic.com/video/4c5e66_3d5e4d8b929c4f9da7c56bbeecef001a/720p/mp4/file.mp4";

export function VisionDigitalExperience() {
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

      <section className={styles.hero} aria-label="Introducción Visión">
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
            <h1 className={styles.heroTitle}>Sentido Digital de Visión</h1>
            <p className={styles.lead}>
              La capacidad de seleccionar conscientemente lo que vemos en pantallas y cómo procesamos el
              contenido visual.
            </p>
            <p className={styles.leadMuted}>
              <strong>¿Qué estás viendo realmente cuando miras una pantalla?</strong>
            </p>
          </div>

          <div className={styles.heroArt} ref={artRef}>
            <div className={styles.videoBack}>
              <div className={styles.videoFrame}>
                <video autoPlay muted loop playsInline poster={VISION_POSTER}>
                  <source src={VISION_VIDEO} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className={styles.fg}>
              <div className={styles.floaty}>
                <img
                  ref={imgRef}
                  className={styles.fgImg}
                  alt="Ilustración Visión"
                  src={VISION_POSTER}
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
          <h2 className={styles.h2}>Visión Digital</h2>
          <div className={styles.quote}>
            La capacidad de seleccionar conscientemente lo que vemos en pantallas y cómo procesamos el
            contenido visual.
          </div>
          <h2 className={styles.h2Spaced}>Visión Digital: Cómo Convertirte en el Curador de tu Mundo Visual</h2>
          <p className={styles.bodyText}>
            En un entorno saturado de imágenes y pantallas, nuestra atención visual es uno de los recursos
            más valiosos. Desarrollar una “Visión Digital” es la habilidad consciente de seleccionar qué
            vemos en nuestras pantallas y, sobre todo, cómo procesamos ese contenido visual. No se trata de
            mirar menos, sino de mirar mejor; de pasar de ser un consumidor pasivo a ser el director activo
            de tu propia experiencia visual.
          </p>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="claves">
          <h2 className={styles.h2}>Las 4 Claves para una Curaduría Visual Consciente</h2>
          <p className={styles.bodyText}>
            Para tomar el control de lo que ven tus ojos, es fundamental dominar estas cuatro áreas:
          </p>
          <div className={`${styles.grid2} ${styles.marginTop14}`}>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Filtros de contenido inapropiado:</strong> utilizar activamente herramientas y
                configuraciones para crear un entorno visual seguro y libre de contenido que no deseas ver.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Control del tiempo de pantalla:</strong> gestión consciente y deliberada del tiempo
                frente a las pantallas, con límites que protejan tu bienestar.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Ajustes de brillo y descanso visual:</strong> medidas prácticas para proteger tu
                salud ocular, como ajustar el brillo y aplicar técnicas de descanso.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Curación de feeds con contenido inspirador:</strong> diseñar activamente tus flujos
                de información para que te inspiren, eduquen y te hagan sentir bien.
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="vistazo">
          <h2 className={styles.h2}>Un Primer Vistazo a tu Galería Actual</h2>
          <p className={styles.bodyText}>
            Para empezar, tómate un momento para reflexionar sobre tus hábitos visuales. No hay respuestas
            correctas, solo es una forma honesta de entender tu punto de partida.
          </p>
          <div className={`${styles.qgrid} ${styles.marginTop14}`}>
            <div className={styles.qcard}>¿Qué es lo primero que ven tus ojos al despertar?</div>
            <div className={styles.qcard}>
              ¿Tienes una idea aproximada de cuánto tiempo pasas mirando pantallas cada día?
            </div>
            <div className={styles.qcard}>
              ¿Has configurado conscientemente descansos visuales en tu rutina diaria?
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="diagnostico">
          <h2 className={styles.h2}>Diagnóstico Práctico: ¿Cómo Gestionas tu Atención Visual?</h2>
          <p className={styles.bodyText}>
            Este breve test te ayudará a identificar tus patrones de consumo visual en situaciones
            cotidianas.
          </p>

          <h3 className={`${styles.h3} ${styles.marginTop14}`}>
            1. Cuando abres tus redes sociales, generalmente:
          </h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Consumes todo lo que aparece en tu feed sin filtrar.</div>
            <div className={styles.opt}>
              B) Sigues principalmente cuentas que te hacen sentir bien o te aportan valor.
            </div>
            <div className={styles.opt}>C) Tienes listas o colecciones organizadas por temas de interés.</div>
            <div className={styles.opt}>D) Rara vez usas redes sociales o tienes muy pocas cuentas seguidas.</div>
          </div>

          <h3 className={`${styles.h3} ${styles.marginTop22}`}>2. Respecto al tiempo de pantalla:</h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) No llevas ningún control y sueles usarlas hasta que te cansas.</div>
            <div className={styles.opt}>
              B) Eres consciente de que pasas mucho tiempo, pero no haces nada al respecto.
            </div>
            <div className={styles.opt}>C) Tienes configurados límites de tiempo para ciertas aplicaciones.</div>
            <div className={styles.opt}>
              D) Revisas regularmente tus estadísticas de uso y ajustas tus hábitos.
            </div>
          </div>

          <h3 className={`${styles.h3} ${styles.marginTop22}`}>3. Cuando usas dispositivos por la noche:</h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Mantienes el brillo al máximo y no usas filtros.</div>
            <div className={styles.opt}>B) Bajas el brillo manualmente.</div>
            <div className={styles.opt}>C) Tienes activado el modo nocturno o filtro de luz azul.</div>
            <div className={styles.opt}>D) Evitas usar pantallas al menos una hora antes de dormir.</div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="interpretacion">
          <h2 className={styles.h2}>Interpretación de Resultados: ¿Consumidor Pasivo o Curador Activo?</h2>
          <p className={styles.bodyText}>
            <strong>Tu vista digital necesita atención (Mayoría de respuestas A/B):</strong> Si tus
            respuestas se inclinan hacia aquí, es una señal de que tu experiencia visual está siendo dirigida
            principalmente por los algoritmos y los impulsos del momento. Estás consumiendo contenido sin
            muchos filtros y podrías no estar protegiendo tu salud visual como es debido. Esta es una
            fantástica oportunidad para tomar el rol de director y empezar a diseñar una experiencia que te
            beneficie más.
          </p>
          <p className={styles.bodyText}>
            <strong>Tienes buena vista digital (Mayoría de respuestas C/D):</strong> ¡Excelente! Tus hábitos
            demuestran que ya actúas como el curador de tu propio contenido. Eres selectivo con lo que
            consumes y tomas medidas activas para cuidar tu salud visual. Has construido una base sólida para
            una relación saludable con tus pantallas.
          </p>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="plan">
          <h2 className={styles.h2}>Plan de Acción para Diseñar tu Experiencia Visual</h2>
          <p className={styles.bodyText}>
            Aquí tienes tres actividades prácticas para pasar de consumidor pasivo a curador activo de tu
            mundo digital.
          </p>

          <div className={`${styles.stack} ${styles.marginTop14}`}>
            <div className={styles.stepper}>
              <div className={styles.step}>
                <div className={styles.badge}>1</div>
                <div>
                  <strong>La Auditoría de tu Ecosistema Visual</strong>
                  <br />
                  <em>Tu Misión:</em> Durante los próximos 7 días, conviértete en un observador de tus propios
                  hábitos. Registra las horas totales que pasas frente a pantallas, anota qué aplicaciones son
                  las que más utilizas y en qué momentos del día tienes un mayor uso. Presta especial atención
                  a cómo te sientes físicamente después (ojos, postura, nivel de energía).
                </div>
              </div>
            </div>

            <div className={styles.stepper}>
              <div className={styles.step}>
                <div className={styles.badge}>2</div>
                <div>
                  <strong>El Reto de la “Dieta Visual” de 24 Horas</strong>
                  <br />
                  <em>Tu Misión:</em> Dedica un día completo a consumir de forma más consciente.
                  <br />
                  <em>Pasos a seguir:</em> Desactiva todas las notificaciones visuales en tu teléfono. Elimina
                  temporalmente las aplicaciones de redes sociales que más te distraen. Como un reto extra,
                  configura tu teléfono en modo de escala de grises. Cada vez que sientas el impulso de usar un
                  dispositivo, haz una pausa y pregúntate: “¿Realmente necesito ver esto ahora?”.
                </div>
              </div>
            </div>

            <div className={styles.stepper}>
              <div className={styles.step}>
                <div className={styles.badge}>3</div>
                <div>
                  <strong>Configuración de un Entorno Visual Saludable</strong>
                  <br />
                  <em>Tu Misión:</em> Dedica 30 minutos a optimizar tus dispositivos para el bienestar de tus
                  ojos.
                  <br />
                  <em>Pasos a seguir:</em> Activa los filtros de luz azul o el “modo nocturno” en todos tus
                  dispositivos. Configura los ajustes de brillo automático para que se adapten a tu entorno.
                  Instala extensiones de navegador como Dark Reader para tener un modo oscuro en todas las webs.
                  Finalmente, configura recordatorios para practicar la regla 20-20-20 (cada 20 minutos, mirar
                  algo a 20 pies de distancia por 20 segundos).
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
