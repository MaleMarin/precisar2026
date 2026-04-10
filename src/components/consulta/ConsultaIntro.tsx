import styles from "./ConsultaIntro.module.css";

export function ConsultaIntro() {
  return (
    <section id="consulta-bloques" className={styles.canvas} aria-label="Sobre la consulta">
      <div className={styles.editorialGrid} data-consulta-cluster="contexto">
        <article className={styles.sheetCard} data-consulta-module="info-primary">
          <p className={styles.kicker}>Qué es</p>
          <h2 className={styles.title}>¿De qué se trata?</h2>
          <p className={styles.body}>
            Queremos entender cómo llega la información a tu día a día: qué te ayuda, qué te confunde y qué
            necesitas para decidir con más claridad. No buscamos respuestas correctas, sino experiencias
            reales.
          </p>
        </article>

        <aside className={styles.sideStack} data-consulta-module="info-secondary">
          <div className={styles.sheetCard}>
            <p className={styles.kicker}>Cómo funciona</p>
            <p className={styles.emphasis}>
              No es una prueba. Es un espacio para entender cómo te informas hoy, sin juicios ni respuestas
              correctas.
            </p>
          </div>

          <div className={styles.sheetCardCompact}>
            <p className={styles.emphasisSm}>Tu forma de informarte importa.</p>
            <div className={styles.tagRow}>
              <span className={styles.tagBlue}>Anónima</span>
              <span className={styles.tagCoral}>12 preguntas</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
