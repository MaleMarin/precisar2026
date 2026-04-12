import { ConsultaStartButton } from "./ConsultaStartButton";
import styles from "./ConsultaHero.module.css";

export function ConsultaHero() {
  return (
    <header className={styles.canvas} aria-labelledby="consulta-hero-title">
      <div className={styles.phoneBezel} data-consulta-cluster="hero">
        <div className={styles.heroAura} aria-hidden="true" />
        <div className={styles.heroCard}>
          <div className={styles.heroBody}>
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
                  Anónima
                  <br />
                  12 preguntas
                  <br />
                  Menos de un minuto
                </p>
              </div>
            </div>

            <div className={styles.heroAsideCol}>
              <div className={styles.ctaZone} data-consulta-module="cta">
                <ConsultaStartButton />
              </div>
              <p className={styles.contextText} style={{ marginTop: "0.35rem", maxWidth: "16rem" }}>
                Una iniciativa de Precisar, organización sin fines de lucro dedicada a la cultura digital crítica en
                Chile y México.
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
