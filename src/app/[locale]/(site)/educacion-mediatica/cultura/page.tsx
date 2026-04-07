import type { Metadata } from "next";
import { MediaticaEjesNav } from "@/components/educacion-mediatica/MediaticaEjesNav";
import { CulturaMediaticaTabs } from "./CulturaMediaticaTabs";
import styles from "./CulturaInterior.module.css";

export const metadata: Metadata = {
  title: "Cultura",
  description:
    "Eje Cultura — educación mediática: diversidad cultural, representación mediática, cultura digital, participación, diálogo y derecho a comunicar.",
};

export default function CulturaEducacionMediaticaPage() {
  return (
    <article className="prec-page">
      <header className={styles.hero}>
        <MediaticaEjesNav current="cultura" />
        <div className={styles.heroGrid}>
          <h1 className={styles.heroTitle}>Cultura</h1>
          <p className={styles.heroIntro}>
            Cultura es identidad, memoria y creación. La educación mediática permite habitar ese espacio con
            conciencia y voz propia.
          </p>
        </div>
      </header>

      <section className={styles.bodySection} aria-label="Contenido principal">
        <div className={styles.bodyInner}>
          <p className={styles.bodyText}>
            La cultura no es un adorno: es la forma en que convivimos, nos reconocemos y nos expresamos. Está en
            lo que consumimos, en cómo hablamos, en los memes que compartimos, en los relatos que heredamos y en
            los que decidimos transformar.
          </p>
          <p className={styles.bodyText}>
            En el entorno digital, la cultura se multiplica y cambia de forma rápidamente. Las narrativas
            juveniles, los contenidos virales, las expresiones de pueblos originarios, el activismo de mujeres,
            las estéticas digitales o los debates públicos en redes son tan parte del campo cultural como un
            libro, un festival o una obra de arte.
          </p>
          <p className={styles.bodyText}>
            La educación mediática entra aquí no para juzgar, sino para ampliar. Nos da herramientas para
            entender qué sentidos se reproducen, cuáles se invisibilizan y cómo podemos intervenir de manera
            creativa, respetuosa y transformadora.
          </p>
          <p className={styles.bodyText}>
            Un enfoque cultural de la educación mediática permite reconocer el derecho a comunicar desde la
            diversidad, fomentar el diálogo intergeneracional y promover una ciudadanía capaz de construir sus
            propias narrativas, más allá de los discursos hegemónicos.
          </p>
        </div>
      </section>

      <CulturaMediaticaTabs />
    </article>
  );
}
