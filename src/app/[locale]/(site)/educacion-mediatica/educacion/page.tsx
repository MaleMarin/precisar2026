import type { Metadata } from "next";
import { MediaticaEjesNav } from "@/components/educacion-mediatica/MediaticaEjesNav";
import { EducacionMediaticaTabs } from "./EducacionMediaticaTabs";
import styles from "./EducacionInterior.module.css";

export const metadata: Metadata = {
  title: "Educación",
  description:
    "Eje Educación — educación mediática: pensamiento crítico, aula, producción, evaluación de información y vida digital.",
};

export default function EducacionEducacionMediaticaPage() {
  return (
    <article className="prec-page">
      <header className={styles.hero}>
        <MediaticaEjesNav current="educacion" />
        <div className={styles.heroGrid}>
          <h1 className={styles.heroTitle}>Educación</h1>
          <p className={styles.heroIntro}>
            Este eje busca transformar la relación entre ciudadanía y medios de comunicación desde la raíz: el
            pensamiento crítico, el aprendizaje permanente y la capacidad de actuar con conciencia en la esfera
            pública.
          </p>
        </div>
      </header>

      <section className={styles.bodySection} aria-label="Contenido principal">
        <div className={styles.bodyInner}>
          <h2 className={styles.bodySubhead}>
            Aprender a lo largo de la vida para convivir en un entorno digital crítico, consciente y activo
          </h2>
          <p className={styles.bodyText}>
            Este eje pone el foco en la formación de competencias mediáticas desde la niñez hasta la adultez
            mayor. No se trata solo de enseñar a usar tecnologías, sino de formar una ciudadanía capaz de
            entender, analizar y participar en la construcción del mundo digital e informativo.
          </p>
          <p className={styles.bodyText}>
            La educación mediática, en este sentido, es una herramienta de autonomía y participación que debe
            estar presente durante toda la vida: en la infancia, como base para la lectura crítica; en la
            adolescencia, para fortalecer la identidad digital; en la adultez, para defenderse de la
            desinformación y tomar decisiones informadas; y en la vejez, para garantizar inclusión, vínculos y
            derechos.
          </p>
          <p className={styles.bodyListIntro}>Este eje impulsa:</p>
          <ul className={styles.bodyList}>
            <li>
              La integración de la educación mediática e informacional en los currículos escolares, no como
              contenido aislado, sino como una competencia transversal.
            </li>
            <li>
              El apoyo a docentes y educadores con herramientas, metodologías y contenidos contextualizados.
            </li>
            <li>
              La producción creativa y reflexiva de contenidos (videos, podcasts, memes, artículos) como forma de
              aprender haciendo.
            </li>
            <li>
              El desarrollo de pensamiento crítico, lectura informacional y habilidades para convivir en
              entornos digitales.
            </li>
            <li>
              La promoción de espacios de formación para personas adultas y mayores, reconociendo sus saberes y
              necesidades específicas.
            </li>
          </ul>
          <p className={styles.bodyClosing}>
            La educación mediática no es solo para estudiantes ni solo para expertos. Es un derecho de todas las
            personas, en cualquier etapa de su vida, y una condición para construir sociedades más
            democráticas, informadas y empáticas.
          </p>
        </div>
      </section>

      <EducacionMediaticaTabs />
    </article>
  );
}
