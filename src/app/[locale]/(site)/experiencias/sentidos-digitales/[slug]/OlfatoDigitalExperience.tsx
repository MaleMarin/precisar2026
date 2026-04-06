"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./OlfatoDigitalExperience.module.css";

const OLFATO_POSTER =
  "https://static.wixstatic.com/media/4c5e66_be2e7dd1e2294f2b871e1a4e51f99850~mv2.png";
const OLFATO_VIDEO =
  "https://video.wixstatic.com/video/4c5e66_3d5e4d8b929c4f9da7c56bbeecef001a/720p/mp4/file.mp4";

export function OlfatoDigitalExperience() {
  const artRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFallback, setVideoFallback] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const safePlay = () => {
      void v.play().catch(() => {});
    };

    if (v.readyState >= 2) {
      safePlay();
    } else {
      v.addEventListener("canplay", safePlay, { once: true });
    }

    const onError = () => setVideoFallback(true);
    v.addEventListener("error", onError);
    return () => v.removeEventListener("error", onError);
  }, []);

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

      <section className={styles.hero} aria-label="Introducción Olfato">
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
            <h1 className={styles.heroTitle}>Sentido Digital de Olfato</h1>
            <p className={styles.lead}>
              Tu radar para detectar señales sospechosas: ofertas “milagro”, mensajes dudosos y patrones que
              huelen raro.
            </p>
            <p className={styles.leadMuted}>
              <strong>¿Te huele a trampa? Afina tu Olfato Digital.</strong>
            </p>
          </div>

          <div className={styles.heroArt} ref={artRef}>
            <div className={styles.videoBack}>
              <div
                className={`${styles.videoFrame} ${videoFallback ? styles.videoFrameFallback : ""}`}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  loop
                  preload="auto"
                  poster={OLFATO_POSTER}
                >
                  <source src={OLFATO_VIDEO} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className={styles.fg}>
              <img
                ref={imgRef}
                className={styles.fgImg}
                alt="Ilustración Olfato"
                src={OLFATO_POSTER}
                width={700}
                height={875}
                decoding="async"
              />
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
          <h2 className={styles.h2}>Olfato Digital</h2>
          <div className={styles.quote}>
            La habilidad de reconocer señales de alerta en contenidos y comunicaciones digitales antes de caer
            en engaños.
          </div>
          <p className={styles.bodyTextSpaced}>
            En internet abunda lo que parece legítimo… hasta que te acercas y notas ese olor raro. El “Olfato
            Digital” te ayuda a detectar inconsistencias en textos, imágenes, audios y sitios, para decidir
            con calma y protegerte.
          </p>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="pilares">
          <h2 className={styles.h2}>Los 4 Pilares para Afinar tu Olfato</h2>
          <p className={styles.bodyText}>Un kit rápido para identificar señales extrañas a tiempo:</p>
          <div className={`${styles.grid2} ${styles.marginTop14}`}>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Señales de urgencia</strong>
                <br />
                “Última oportunidad”, relojes falsos, presión para pagar ya: huele a manipulación.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Fuente y reputación</strong>
                <br />
                ¿Quién publica? ¿Hay autores claros, contacto real y huella confiable?
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Coherencia del contenido</strong>
                <br />
                Errores de ortografía, logos mal recortados, enlaces que no coinciden… pistas de baja calidad.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Verificación cruzada</strong>
                <br />
                Contrasta con sitios oficiales y verificadores; busca la noticia en múltiples medios.
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="reflexion">
          <h2 className={styles.h2}>Un Momento para la Reflexión: ¿Qué huele raro?</h2>
          <div className={`${styles.qgrid} ${styles.marginTop14}`}>
            <div className={styles.qcard}>
              ¿Te han pedido datos o pagos urgentes con premios increíbles?
            </div>
            <div className={styles.qcard}>
              ¿Has notado enlaces que parecen oficiales pero llevan a dominios extraños?
            </div>
            <div className={styles.qcard}>¿Cuántas veces confirmas la información antes de compartirla?</div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="test">
          <h2 className={styles.h2}>Mini-Test: ¿Cuál es tu Perfil de Olfato Digital?</h2>
          <p className={styles.bodyText}>Elige la opción que más se parezca a ti.</p>

          <h3 className={`${styles.h3} ${styles.marginTop14}`}>
            1. Recibes un mensaje con un premio inesperado…
          </h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Hago clic: “¡qué suerte!”</div>
            <div className={styles.opt}>B) Dudo, pero sigo el enlace para “ver si es real”.</div>
            <div className={styles.opt}>
              C) Busco el dominio en un <strong>buscador</strong> y reseñas antes de tocar nada.
            </div>
            <div className={styles.opt}>D) No interactúo y lo reporto como posible fraude.</div>
          </div>

          <h3 className={`${styles.h3} ${styles.marginTop22}`}>
            2. Te llega por WhatsApp una noticia impactante…
          </h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) La reenvío de inmediato para avisar a mis contactos.</div>
            <div className={styles.opt}>B) Releo el mensaje y la paso solo a familiares cercanos.</div>
            <div className={styles.opt}>
              C) Verifico en un <strong>buscador</strong> y en medios confiables antes de compartir.
            </div>
            <div className={styles.opt}>
              D) No la reenvío: primero compruebo la fuente oficial o el sitio del organismo implicado.
            </div>
          </div>

          <h3 className={`${styles.h3} ${styles.marginTop22}`}>
            3. Un familiar te escribe pidiendo dinero urgente…
          </h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Envío sin pensar: “me necesita”.</div>
            <div className={styles.opt}>B) Contesto y pido número de cuenta.</div>
            <div className={styles.opt}>C) Confirmo por llamada o video que realmente es él/ella.</div>
            <div className={styles.opt}>
              D) Detengo todo: pido una clave acordada o espero confirmación presencial.
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="resultado">
          <h2 className={styles.h2}>Análisis de Resultados: ¿Cómo está tu Olfato Digital?</h2>
          <p className={styles.bodyText}>
            <strong>Mayoría A y B</strong> — <em>Oportunidad de mejora:</em> podrías estar expuesto/a a{" "}
            <strong>phishing</strong> y <strong>desinformación</strong>. Refuerza hábitos de verificación:
            desconfía de premios, evita tocar enlaces desconocidos, contrasta en un <strong>buscador</strong> y
            revisa medios u organismos oficiales antes de compartir o pagar.
          </p>
          <p className={`${styles.bodyText} ${styles.marginTop14}`}>
            <strong>Mayoría C y D</strong> — <em>¡Vas muy bien!</em> Mantienes un criterio de verificación
            sólido: confirmas identidad, compruebas fuentes y no compartes sin validar. Sigue así y ayuda a tu
            red a incorporar estos buenos hábitos.
          </p>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="misiones">
          <h2 className={styles.h2}>¡Es Hora de Jugar! Misiones para Entrenar tu Olfato</h2>

          <div className={`${styles.stepper} ${styles.marginTop14}`}>
            <div className={styles.step}>
              <div className={styles.badge}>D1</div>
              <div>
                <strong>Misión “Nariz Alerta” — Día 1:</strong> Guarda 3 ejemplos de ofertas o mensajes
                sospechosos y subraya las pistas de urgencia.
              </div>
            </div>
            <hr className={styles.stepDivider} />
            <div className={styles.step}>
              <div className={styles.badge}>D2</div>
              <div>
                <strong>Día 2:</strong> Elige 2 dominios dudosos y evalúa reputación, SSL, “quiénes somos” y
                contacto real.
              </div>
            </div>
            <hr className={styles.stepDivider} />
            <div className={styles.step}>
              <div className={styles.badge}>D3</div>
              <div>
                <strong>Día 3:</strong> Practica verificación cruzada con una noticia viral y registra tus
                fuentes.
              </div>
            </div>
          </div>

          <div className={`${styles.mgrid} ${styles.marginTop22}`}>
            <div className={styles.stepper}>
              <h3 className={styles.h3Flush}>Misión “Desmenuza el Mensaje”</h3>
              <ul className={styles.missionList}>
                <li>
                  <strong>Texto:</strong> busca faltas y frases cliché (“solo hoy”, “últimas unidades”).
                </li>
                <li>
                  <strong>Imagen:</strong> detecta logos pixelados, marcas de agua o recortes raros.
                </li>
                <li>
                  <strong>Enlace:</strong> pasa el mouse y compara con el link real (dominio, https).
                </li>
              </ul>
            </div>

            <div className={styles.stepper}>
              <h3 className={styles.h3Flush}>Misión “Compra Segura”</h3>
              <ul className={styles.missionList}>
                <li>
                  <strong>Checklist:</strong> RUT/razón social, políticas, medios de pago.
                </li>
                <li>
                  <strong>Comparación:</strong> revisa precios en 2–3 tiendas confiables.
                </li>
                <li>
                  <strong>Soporte:</strong> valida teléfono y tiempos de respuesta reales.
                </li>
              </ul>
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
