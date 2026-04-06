import type { Metadata } from "next";
import { ComunicacionMediaticaTabs } from "./ComunicacionMediaticaTabs";
import styles from "./ComunicacionInterior.module.css";

export const metadata: Metadata = {
  title: "Comunicación",
  description:
    "Eje Comunicación — educación mediática: ecosistema mediático, libertad de expresión, medios, desinformación y redes.",
};

export default function ComunicacionEducacionMediaticaPage() {
  return (
    <article className="prec-page">
      <header className={styles.hero}>
        <div className={styles.heroGrid}>
          <h1 className={styles.heroTitle}>Comunicación</h1>
          <p className={styles.heroIntro}>
            Este eje es una invitación a pensar la comunicación no solo como algo que recibimos, sino también
            como algo que creamos, compartimos y transformamos.
          </p>
        </div>
      </header>

      <section className={styles.bodySection} aria-label="Contenido principal">
        <div className={styles.bodyInner}>
          <p className={styles.bodyText}>
            Este eje, Comunicación, es el punto de partida esencial para entender cómo se construyen nuestras
            ideas sobre el mundo. No se trata solo de medios de comunicación tradicionales, sino de todo el
            ecosistema que produce, distribuye y resignifica la información que consumimos a diario: desde un
            noticiero hasta un meme en redes sociales.
          </p>
          <p className={styles.bodyText}>
            Lo que propone este eje es mirar con lupa el camino que recorre la información, cuestionar quién
            la produce, por qué y con qué intención. También invita a fortalecer el derecho a expresarnos, a
            informarnos de manera libre y a reconocer cuándo ese derecho está en riesgo —por la censura, la
            desinformación o la invisibilización de ciertas comunidades.
          </p>
          <p className={styles.bodyLead}>
            <strong>La comunicación no es neutra:</strong> puede conectar o dividir, visibilizar o excluir.
            Por eso, este eje promueve una ciudadanía crítica y activa, capaz de:
          </p>
          <ul className={styles.bodyList}>
            <li>Identificar los mecanismos de manipulación (como las fake news).</li>
            <li>Exigir transparencia en los medios.</li>
            <li>Participar en experiencias comunicativas propias, como medios comunitarios.</li>
            <li>Defender la libertad de expresión con responsabilidad.</li>
            <li>Salir de burbujas y polarizaciones para escuchar otras miradas.</li>
          </ul>
        </div>
      </section>

      <ComunicacionMediaticaTabs />
    </article>
  );
}
