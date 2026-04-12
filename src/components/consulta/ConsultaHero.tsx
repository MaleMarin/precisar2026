import Image from "next/image";
import { ConsultaStartButton } from "./ConsultaStartButton";
import { FOOTER_MEDIA } from "@/lib/site";
import styles from "./ConsultaHero.module.css";

export function ConsultaHero() {
  return (
    <header className={styles.canvas} aria-labelledby="consulta-hero-title">
      <div className={styles.phoneBezel} data-consulta-cluster="hero">
        <div className={styles.heroAura} aria-hidden="true" />
        <div className={styles.heroCard}>
          <div className={styles.heroBody}>

            {/* Columna principal izquierda */}
            <div className={styles.heroMainCol}>
              <div className={styles.impactZone} data-consulta-module="impact">
                <h1 id="consulta-hero-title" className={styles.headlineText}>
                  ¿Cómo te informas hoy?
                </h1>
              </div>
              <div className={styles.leadZone} data-consulta-module="lead">
                <p className={styles.leadText}>Tu experiencia cambia cómo nos informamos todos.</p>
              </div>
              <div className={styles.contextZone} data-consulta-module="context">
                <p className={styles.contextText}>
                  Queremos entender cómo recibes la información hoy y cómo te gustaría recibirla: qué formatos te
                  ayudan, qué tono te genera confianza, qué te falta para entender mejor, acceder con más facilidad y
                  compartir con más criterio. Tus respuestas llegan directamente a medios, instituciones y tomadores de
                  decisiones para que mejoren la manera en que informan.
                </p>
                <p className={styles.contextTriad}>
                  Anónima · 12 preguntas · Menos de un minuto
                </p>
              </div>
            </div>

            {/* Columna aside derecha */}
            <div className={styles.heroAsideCol}>
              {/* Logo arriba */}
              <Image
                src={FOOTER_MEDIA.headerLogoBlack}
                alt="Precisar"
                width={100}
                height={25}
                style={{
                  filter: "brightness(0) invert(1)",
                  opacity: 0.55,
                  objectFit: "contain",
                  alignSelf: "flex-end",
                }}
              />
              {/* Texto institucional */}
              <p
                className={styles.contextText}
                style={{
                  maxWidth: "13rem",
                  textAlign: "right",
                  opacity: 0.65,
                  fontSize: "0.75rem",
                  lineHeight: 1.55,
                }}
              >
                Una iniciativa de Precisar, organización sin fines de lucro dedicada a la cultura
                digital crítica en Chile y México.
              </p>
              {/* CTA — elemento más prominente */}
              <div className={styles.ctaZone} data-consulta-module="cta">
                <ConsultaStartButton />
              </div>
              {/* Privacidad al fondo */}
              <a
                href="/legal/privacidad-consulta-2026"
                style={{
                  fontSize: 10,
                  color: "rgba(255,255,255,0.35)",
                  textDecoration: "none",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  alignSelf: "flex-end",
                }}
              >
                Privacidad →
              </a>
            </div>

          </div>
        </div>
      </div>
    </header>
  );
}
