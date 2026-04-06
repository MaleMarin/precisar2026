"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./EscuchaDigitalExperience.module.css";

const ESCUCHA_POSTER =
  "https://static.wixstatic.com/media/4c5e66_59c5017d451942419550e187f5b479e5~mv2.png";
const ESCUCHA_VIDEO =
  "https://video.wixstatic.com/video/4c5e66_3d5e4d8b929c4f9da7c56bbeecef001a/720p/mp4/file.mp4";

export function EscuchaDigitalExperience() {
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

      <section className={styles.hero} aria-label="Introducción Escucha">
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
            <h1 className={styles.heroTitle}>Sentido Digital de Escucha</h1>
            <p className={styles.lead}>
              La habilidad para gestionar notificaciones y sonidos digitales, eligiendo conscientemente qué
              escuchar.
            </p>
            <p className={styles.leadMuted}>
              <strong>¿Tienes el control de lo que escuchas? Descubre tu “Oído Digital”.</strong>
            </p>
          </div>

          <div className={styles.heroArt} ref={artRef}>
            <div className={styles.videoBack}>
              <div className={styles.videoFrame}>
                <video autoPlay muted loop playsInline poster={ESCUCHA_POSTER}>
                  <source src={ESCUCHA_VIDEO} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className={styles.fg}>
              <img
                ref={imgRef}
                className={styles.fgImg}
                alt="Ilustración Escucha"
                src={ESCUCHA_POSTER}
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
          <h2 className={styles.h2}>Escucha Digital</h2>
          <div className={styles.quote}>
            La habilidad para gestionar notificaciones y sonidos digitales, eligiendo conscientemente qué
            escuchar.
          </div>
          <p className={styles.bodyTextSpaced}>
            En nuestro mundo lleno de pings, alertas y notificaciones, a veces parece que nuestros
            dispositivos nos escuchan más a nosotros que nosotros a ellos. La “Escucha Digital” es tu
            superpoder para cambiar eso. Se trata de la habilidad de tomar las riendas, gestionar con
            inteligencia todos esos sonidos y elegir con intención qué es lo que de verdad merece tu
            atención.
          </p>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="pilares">
          <h2 className={styles.h2}>Los 4 Pilares para Afinar tu Oído Digital</h2>
          <p className={styles.bodyText}>
            Piensa en esto como tu kit de herramientas para crear un ambiente sonoro más tranquilo y
            productivo:
          </p>
          <div className={`${styles.grid2} ${styles.marginTop14}`}>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Gestión inteligente de notificaciones</strong>
                <br />
                Conviértete en el director de tu orquesta digital, decidiendo qué suena y cuándo.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Creación de tu burbuja de paz</strong>
                <br />
                Aprende a silenciar el “spam” y el ruido de fondo que te roba la concentración.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Nutrición para tus oídos</strong>
                <br />
                Selecciona activamente podcasts y audios que te hagan sentir bien y te aporten valor.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>El arte de priorizar</strong>
                <br />
                Distingue con claridad una alerta verdaderamente importante de una que puede esperar.
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="reflexion">
          <h2 className={styles.h2}>Un Momento para la Reflexión: ¿Cómo suena tu mundo digital?</h2>
          <div className={`${styles.qgrid} ${styles.marginTop14}`}>
            <div className={styles.qcard}>
              Cuando tu teléfono suena o vibra, ¿sientes el impulso de saltar a revisarlo inmediatamente?
            </div>
            <div className={styles.qcard}>
              Si pudieras adivinar, ¿cuántas aplicaciones en tu teléfono tienen permiso para enviarte
              notificaciones ahora mismo?
            </div>
            <div className={styles.qcard}>
              ¿Logras diferenciar si un sonido es una emergencia o simplemente ruido?
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="test">
          <h2 className={styles.h2}>Mini-Test: ¿Cuál es tu Perfil de Escucha Digital?</h2>
          <p className={styles.bodyText}>
            Responde con la opción que más se parezca a ti. ¡Vamos a conocernos un poco más!
          </p>

          <h3 className={`${styles.h3} ${styles.marginTop14}`}>
            1. Cuando piensas en las notificaciones de tu teléfono…
          </h3>
          <div className={styles.opts}>
            <div className={styles.opt}>
              A) ¡Son una fiesta! Casi todas están activadas con sonido y vibración.
            </div>
            <div className={styles.opt}>
              B) Hay orden, pero con excepciones. La mayoría están activas, aunque he silenciado algunas.
            </div>
            <div className={styles.opt}>
              C) Tengo un club exclusivo. Solo las apps y personas más importantes tienen permiso para
              notificarme.
            </div>
            <div className={styles.opt}>
              D) Mi paz es lo primero. Tengo horarios definidos para activar el modo “No Molestar”.
            </div>
          </div>

          <h3 className={`${styles.h3} ${styles.marginTop22}`}>
            2. Imagina que estás en una reunión o un momento que requiere tu atención…
          </h3>
          <div className={styles.opts}>
            <div className={styles.opt}>
              A) Mi teléfono no se pierde la conversación, suena o vibra constantemente.
            </div>
            <div className={styles.opt}>
              B) Intento ser discreto. Lo pongo en silencio, pero no puedo evitar echarle un vistazo a
              menudo.
            </div>
            <div className={styles.opt}>
              C) Tengo un sistema de filtro. Activo el “No Molestar”, pero permito llamadas de mis
              contactos clave por si hay una emergencia.
            </div>
            <div className={styles.opt}>
              D) Desconexión total. El teléfono se queda en otra habitación o lo apago por completo.
            </div>
          </div>

          <h3 className={`${styles.h3} ${styles.marginTop22}`}>
            3. Hablemos del contenido de audio que consumes…
          </h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Soy espontáneo. Escucho lo que sea que aparezca o lo que esté de moda.</div>
            <div className={styles.opt}>
              B) Tengo mis gustos. Me muevo por mis géneros preferidos, pero no hago una selección muy
              detallada.
            </div>
            <div className={styles.opt}>
              C) Soy un curador. Creo listas de reproducción específicas según lo que necesito sentir o hacer
              en cada momento.
            </div>
            <div className={styles.opt}>
              D) Soy un explorador consciente. Busco activamente contenido que me enseñe algo nuevo o me
              aporte bienestar.
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="misiones">
          <h2 className={styles.h2}>¡Es Hora de Jugar! Misiones para Entrenar tu Oído Digital</h2>

          <div className={`${styles.stepper} ${styles.marginTop14}`}>
            <div className={styles.step}>
              <div className={styles.badge}>D1</div>
              <div>
                <strong>Misión “Detox de Notificaciones” — Día 1:</strong> Conviértete en detective. Anota
                cada notificación que recibes y, más importante, cómo te hace sentir.
              </div>
            </div>
            <hr className={styles.stepDivider} />
            <div className={styles.step}>
              <div className={styles.badge}>D2</div>
              <div>
                <strong>Día 2:</strong> Abraza el silencio. Desactiva TODAS las notificaciones, excepto las
                llamadas telefónicas.
              </div>
            </div>
            <hr className={styles.stepDivider} />
            <div className={styles.step}>
              <div className={styles.badge}>D3</div>
              <div>
                <strong>Día 3:</strong> Elige a tus VIP. Reactiva, una por una, solo aquellas notificaciones
                que consideres verdaderamente esenciales.
              </div>
            </div>
          </div>

          <div className={`${styles.mgrid} ${styles.marginTop22}`}>
            <div className={styles.stepper}>
              <h3 className={styles.h3Flush}>Misión “Crea tu Paisaje Sonoro Ideal”</h3>
              <ul className={styles.missionList}>
                <li>
                  <strong>Conviértete en DJ:</strong> diseña playlists para foco/relax/ejercicio.
                </li>
                <li>
                  <strong>Top 3 de Podcasts:</strong> elige 3–5 que aporten valor.
                </li>
                <li>
                  <strong>Agenda momentos de silencio:</strong> reserva “citas con el silencio”.
                </li>
                <li>
                  <strong>Explora sonidos ambientales:</strong> apps de lluvia/olas/bosque para un fondo
                  agradable.
                </li>
              </ul>
            </div>

            <div className={styles.stepper}>
              <h3 className={styles.h3Flush}>Misión “El Arquitecto de Alertas”</h3>
              <ul className={styles.missionList}>
                <li>
                  <strong>Crea tu jerarquía:</strong> Crítico / Importante / Puede esperar.
                </li>
                <li>
                  <strong>Asigna sonidos:</strong> tonos o vibraciones por nivel.
                </li>
                <li>
                  <strong>Personaliza No Molestar:</strong> excepciones para contactos “Críticos”.
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
