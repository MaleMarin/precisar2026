import styles from "./ConsultaHero.module.css";

export function ConsultaHero() {
  return (
    <header className={styles.canvas} aria-labelledby="consulta-hero-title">
      <div className={styles.phoneBezel} data-consulta-cluster="hero">
        <div className={styles.heroAura} aria-hidden="true" />
        <div className={styles.heroCard}>
          <div className={styles.heroTopBar}>
            <span className={styles.heroTopSpacer} />
            <span className={styles.heroSignal} aria-hidden="true">
              <span className={styles.heroDot} />
              <span className={styles.heroDot} />
              <span className={styles.heroDot} />
            </span>
          </div>

          <div className={styles.heroBody}>
            <div className={styles.heroMainCol}>
              <div className={styles.impactZone} data-consulta-module="impact">
                <h1 id="consulta-hero-title" className={styles.headlineText}>
                  ¿Cómo te informas hoy?
                </h1>
              </div>

              <div className={styles.contextZone} data-consulta-module="context">
                <p className={styles.contextText}>
                  Entre titulares, audios, videos y mensajes, tomamos decisiones todos los días.
                  Queremos entender cómo te informas realmente.
                </p>
              </div>

              <div className={styles.leadZone} data-consulta-module="lead">
                <p className={styles.leadText}>Menos ruido. Más criterio.</p>
              </div>
            </div>

            <div className={styles.heroAsideCol}>
              <div className={styles.ctaZone} data-consulta-module="cta">
                <a href="#consulta-modo" className={styles.ctaPrimary}>
                  Comenzar
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
