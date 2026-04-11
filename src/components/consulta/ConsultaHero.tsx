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
                <p className={styles.leadText}>Menos ruido, más criterio.</p>
              </div>

              <div className={styles.contextZone} data-consulta-module="context">
                <p className={styles.contextText}>
                  Entre titulares, audios, redes y mensajes, todos nos informamos y tomamos decisiones cada día.
                  Queremos entender cómo lo haces tú.
                </p>
                <p className={styles.contextTriad}>
                  No es una prueba.
                  <br />
                  Es anónima.
                  <br />
                  Y toma menos de un minuto.
                </p>
              </div>
            </div>

            <div className={styles.heroAsideCol}>
              <div className={styles.ctaZone} data-consulta-module="cta">
                <ConsultaStartButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
