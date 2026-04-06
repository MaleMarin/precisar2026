"use client";

import { useEffect, useRef } from "react";
import { Link } from "@/i18n/navigation";
import styles from "./TactoDigitalExperience.module.css";

const TACTO_POSTER =
  "https://static.wixstatic.com/media/4c5e66_ff35c2220a9c4397927b2d084d708999~mv2.png";
const TACTO_VIDEO =
  "https://video.wixstatic.com/video/4c5e66_3d5e4d8b929c4f9da7c56bbeecef001a/720p/mp4/file.mp4";

export function TactoDigitalExperience() {
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

      <section className={styles.hero} aria-label="Introducción Tacto">
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
            <h1 className={styles.heroTitle}>Tacto Digital</h1>
            <p className={styles.lead}>
              La capacidad para establecer límites en interacciones digitales y gestionar el espacio personal
              online.
            </p>
            <p className={styles.leadMuted}>
              <strong>Tacto Digital: Cómo Diseñar y Proteger tu Espacio Personal en Línea</strong>
            </p>
          </div>

          <div className={styles.heroArt} ref={artRef}>
            <div className={styles.videoBack}>
              <div className={styles.videoFrame}>
                <video autoPlay muted loop playsInline poster={TACTO_POSTER}>
                  <source src={TACTO_VIDEO} type="video/mp4" />
                </video>
              </div>
            </div>

            <div className={styles.fg}>
              <div className={styles.floaty}>
                <img
                  ref={imgRef}
                  className={styles.fgImg}
                  alt="Ilustración Tacto"
                  src={TACTO_POSTER}
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
          <h2 className={styles.h2}>Tacto Digital</h2>
          <div className={styles.quote}>
            En un mundo donde estamos siempre conectados, ¿dónde termina tu espacio personal y empieza el del
            resto? Desarrollar el “Tacto Digital” es tu capacidad para establecer límites claros en las
            interacciones digitales y gestionar tu espacio personal en línea con intención y seguridad. No se
            trata de desconectarse, sino de construir conscientemente las fronteras que protegen tu bienestar
            y tu paz mental en el entorno digital.
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="elementos">
          <h2 className={styles.h2}>Los 4 Elementos Esenciales para Proteger tu Espacio</h2>
          <p className={styles.bodyText}>
            Dominar tu tacto digital implica poner atención a estas cuatro áreas fundamentales. Son como los
            pilares sobre los que construyes tu hogar digital.
          </p>
          <div className={`${styles.grid2} ${styles.marginTop14}`}>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Configurar tu privacidad con intención</strong>
                <br />
                Diseña activamente las “murallas” y “puertas” de cada plataforma: qué es público, qué es
                privado y qué compartes solo con tu círculo de confianza.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Establecer tus límites personales</strong>
                <br />
                Define tus reglas del juego: a quién das acceso, cómo gestionas interrupciones y cómo
                comunicas tus necesidades de forma asertiva.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Gestionar tus conexiones con criterio</strong>
                <br />
                Tu red es tu vecindario: elige conscientemente “vecinos” para que las interacciones sean
                seguras, respetuosas y con valor.
              </div>
            </div>
            <div className={styles.pillar}>
              <span className={styles.dot} />
              <div>
                <strong>Tener control sobre tu huella digital</strong>
                <br />
                Cada acción deja rastro. Gestiona activamente tu información para controlar la narrativa de tu
                identidad pública.
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="reflexion">
          <h2 className={styles.h2}>Un Momento para la Reflexión: ¿Cómo es tu Espacio Digital Hoy?</h2>
          <div className={`${styles.qgrid} ${styles.marginTop14}`}>
            <div className={styles.qcard}>
              ¿Sueles revisar la configuración de privacidad de tus redes sociales y otras apps?
            </div>
            <div className={styles.qcard}>
              ¿Tienes claro quién puede ver la información personal que compartes en línea?
            </div>
            <div className={styles.qcard}>
              ¿Qué tan consciente eres de la huella digital que estás dejando cada día?
            </div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="diagnostico">
          <h2 className={styles.h2}>Diagnóstico Práctico: Un Vistazo a tus Fronteras Digitales</h2>
          <p className={styles.bodyText}>
            Este breve diagnóstico es una herramienta para ver con claridad tus hábitos actuales en situaciones
            comunes.
          </p>

          <h3 className={`${styles.h3} ${styles.marginTop14}`}>
            1. Sobre la configuración de privacidad en tus redes sociales:
          </h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Nunca las has revisado; usas la configuración por defecto.</div>
            <div className={styles.opt}>B) Ajustaste algunas opciones básicas.</div>
            <div className={styles.opt}>C) Revisas periódicamente para limitar quién ve tu contenido.</div>
            <div className={styles.opt}>D) Configuraciones estrictas y personalizadas por plataforma.</div>
          </div>

          <h3 className={`${styles.h3} ${styles.marginTop22}`}>
            2. Cuando recibes una solicitud de alguien que no conoces:
          </h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Aceptas casi a cualquiera.</div>
            <div className={styles.opt}>B) Miras rápido el perfil.</div>
            <div className={styles.opt}>C) Investigas un poco quién es y por qué quiere conectar.</div>
            <div className={styles.opt}>D) Regla personal: solo personas que ya conoces.</div>
          </div>

          <h3 className={`${styles.h3} ${styles.marginTop22}`}>
            3. Respecto a los permisos que te piden las apps al instalarlas:
          </h3>
          <div className={styles.opts}>
            <div className={styles.opt}>A) Aceptas todo sin leer.</div>
            <div className={styles.opt}>B) Lees por encima y aceptas casi todo.</div>
            <div className={styles.opt}>C) Evalúas si los permisos tienen sentido para la app.</div>
            <div className={styles.opt}>D) Rechazas permisos innecesarios y revisas periódicamente.</div>
          </div>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="interpretacion">
          <h2 className={styles.h2}>Interpretación de Resultados: ¿Qué Dicen tus Hábitos?</h2>
          <p className={styles.bodyText}>
            <strong>Oportunidad de Fortalecimiento (Mayoría A/B):</strong> Si la mayoría está aquí, tu espacio
            digital se ha construido con valores por defecto y puede dejarte vulnerable. Es una gran
            oportunidad para tomar las riendas y diseñar un espacio que trabaje para ti.
          </p>
          <p className={`${styles.bodyText} ${styles.marginTop14}`}>
            <strong>Gestión Consciente y Proactiva (Mayoría C/D):</strong> ¡Excelente! Proteges tu privacidad
            de forma activa y cuidas tus interacciones. Eres el arquitecto de tu entorno online.
          </p>
        </section>

        <section className={`${styles.card} ${styles.section}`} id="plan">
          <h2 className={styles.h2}>Tu Plan de Acción para Tomar el Control</h2>
          <p className={styles.bodyText}>
            Pasar del conocimiento a la acción marca la diferencia. Aquí tienes tres actividades prácticas para
            construir un espacio digital más seguro.
          </p>

          <div className={`${styles.stack} ${styles.marginTop14}`}>
            <div className={styles.stepper}>
              <div className={styles.step}>
                <div className={styles.badge}>1</div>
                <div>
                  <strong>La Auditoría de Privacidad</strong>
                  <br />
                  <em>Tu Misión:</em> Dedica una hora este mes a revisar a fondo tus “fronteras” digitales.
                  <br />
                  <em>Pasos a seguir:</em> Revisa la configuración de privacidad en tus redes principales.
                  Verifica qué permisos tienen las apps del teléfono. Elimina acceso a apps/servicios que ya no
                  usas. Usa listas como “amigos cercanos” para compartir de forma más íntima y segura.
                </div>
              </div>
            </div>

            <div className={styles.stepper}>
              <div className={styles.step}>
                <div className={styles.badge}>2</div>
                <div>
                  <strong>El Reto de la Interacción Deliberada</strong>
                  <br />
                  <em>Tu Misión:</em> Durante 5 días, sé intencional con tus interacciones online.
                  <br />
                  <em>Pasos a seguir:</em> Antes de publicar, aplica la regla de los 30 segundos (pausa, por qué
                  y para quién). Agrupa respuestas en bloques de tiempo. Practica decir “no” de forma amable
                  pero firme a solicitudes que invadan tu tiempo o espacio.
                </div>
              </div>
            </div>

            <div className={styles.stepper}>
              <div className={styles.step}>
                <div className={styles.badge}>3</div>
                <div>
                  <strong>El Mapeo de tu Huella Digital</strong>
                  <br />
                  <em>Tu Misión:</em> Crear un mapa claro de tu presencia pública en internet.
                  <br />
                  <em>Pasos a seguir:</em> Lista todas tus cuentas activas. Búscate en un navegador en modo
                  incógnito para ver qué aparece. Identifica información expuesta que preferirías ocultar.
                  Toma acciones concretas para proteger, ajustar privacidad o eliminar esa información.
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
