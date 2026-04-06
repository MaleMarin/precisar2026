import type { Metadata } from "next";
import { TecnologiaMediaticaTabs } from "./TecnologiaMediaticaTabs";
import styles from "./TecnologiaInterior.module.css";

export const metadata: Metadata = {
  title: "Tecnología",
  description:
    "Eje Tecnología — educación mediática: algoritmos, privacidad, brecha digital, IA y uso consciente de plataformas.",
};

export default function TecnologiaEducacionMediaticaPage() {
  return (
    <article className="prec-page">
      <header className={styles.hero}>
        <div className={styles.heroGrid}>
          <h1 className={styles.heroTitle}>Tecnología</h1>
          <p className={styles.heroIntro}>
            Este eje aborda cómo la tecnología modela nuestra forma de informarnos, comunicarnos y participar en
            la vida digital. No se trata solo de usar dispositivos, sino de entender cómo influyen en lo que
            vemos, pensamos y decidimos.
          </p>
        </div>
      </header>

      <section className={styles.bodySection} aria-label="Contenido principal">
        <div className={styles.bodyInner}>
          <p className={styles.bodyOpenBold}>
            La alfabetización mediática en clave tecnológica no es solo aprender a usar herramientas, sino a
            comprender los sistemas que las gobiernan.
          </p>
          <p className={styles.bodyText}>
            Vivimos en una sociedad hiperconectada, donde los dispositivos, las plataformas digitales y los
            algoritmos no solo median la información que recibimos, sino también nuestras emociones, decisiones y
            formas de relacionarnos. En este escenario, el eje Tecnología nos invita a mirar más allá de la
            interfaz.
          </p>
          <p className={styles.bodyText}>
            Aquí, la Educación Mediática se vuelve una práctica de autonomía. Porque quien no entiende cómo
            opera la tecnología, queda expuesto a manipulaciones invisibles: la lógica de los algoritmos, la
            recolección de datos personales, la viralización del odio o la creación de burbujas de información.
          </p>
          <p className={styles.bodyText}>
            Este eje no busca enseñar a usar la tecnología &apos;correctamente&apos;, sino a habitarla con
            conciencia, cuestionarla con pensamiento crítico y transformarla con ética. Significa formar
            ciudadanos capaces de proteger su privacidad, de identificar sesgos en los sistemas automatizados,
            de detectar contenidos generados por inteligencia artificial, y de exigir un entorno digital más
            justo y transparente.
          </p>
          <p className={styles.bodyClosing}>
            Tecnología y medios se cruzan en lo cotidiano. Comprender ese cruce es clave para la ciudadanía
            digital.
          </p>
        </div>
      </section>

      <TecnologiaMediaticaTabs />
    </article>
  );
}
