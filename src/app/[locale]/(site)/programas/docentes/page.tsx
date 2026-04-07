import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import styles from "./DocentesPage.module.css";
import { DocentesModulosTabs } from "./DocentesModulosTabs";

export const metadata: Metadata = {
  title: "Educación Mediática para Docentes",
  description:
    "Recursos didácticos, guías de aula y seis módulos formativos para fortalecer la educación mediática digital sin aumentar la carga de trabajo.",
};

const OBJETIVOS = [
  {
    num: "01",
    title: "Fomentar el Pensamiento Crítico",
    desc: "Capacitar a los docentes para enseñar a los estudiantes a evaluar críticamente la información, identificar desinformación y reconocer sesgos en diversas fuentes digitales, incluyendo contenidos generados por IA.",
  },
  {
    num: "02",
    title: "Promover la Producción Responsable",
    desc: "Brindar herramientas para guiar a los estudiantes en la creación de contenidos digitales de forma ética y responsable, respetando derechos de autor y promoviendo mensajes constructivos.",
  },
  {
    num: "03",
    title: "Enseñar Participación Ética",
    desc: "Formar a los docentes para instruir a sus alumnos sobre la participación activa, segura y respetuosa en redes y plataformas digitales, fomentando la ciudadanía digital.",
  },
  {
    num: "04",
    title: "Integrar la Educación Mediática",
    desc: "Facilitar la integración de la educación mediática digital en el currículo escolar, con guías y recursos que se adapten a diferentes asignaturas y niveles.",
  },
] as const;

const BENEFICIOS = [
  {
    num: "01",
    title: "Estudiantes Reflexivos y Resilientes",
    desc: "Ayuda a tus estudiantes a desarrollar habilidades para pensar críticamente, reconocer contenidos falsos y actuar con confianza y respeto en el mundo digital.",
  },
  {
    num: "02",
    title: "Docentes Empoderados e Innovadores",
    desc: "Fortalece a tu equipo docente con herramientas prácticas, enfoque pedagógico actualizado y confianza para enfrentar los desafíos del entorno digital. Capacítalos para guiar a sus estudiantes en el uso crítico, seguro y creativo de la tecnología.",
  },
  {
    num: "03",
    title: "Comunidad Educativa Fortalecida",
    desc: "Crea un ambiente de aprendizaje donde estudiantes, docentes y familias colaboren para un uso más consciente y ético de la tecnología.",
  },
  {
    num: "04",
    title: "Seguridad y Privacidad Digital",
    desc: "Al incorporar buenas prácticas de protección de datos y control de privacidad, se reducen los riesgos de ciberacoso y usos indebidos de la tecnología, garantizando un entorno digital más seguro.",
  },
] as const;

const METODOLOGIA = [
  {
    num: "01",
    title: "Talleres Prácticos Online",
    desc: "4 sesiones en vivo por Zoom con actividades prácticas y trabajo autocontrolado en la plataforma digital del Programa EducaMedios, para avanzar al ritmo de cada docente.",
  },
  {
    num: "02",
    title: "Comunidad de Práctica",
    desc: "Conexión con otros docentes para compartir experiencias, co-crear materiales y resolver desafíos comunes.",
  },
  {
    num: "03",
    title: "Recursos Didácticos",
    desc: "Acceso a guías, plantillas, videos y ejemplos listos para usar y adaptar en sus clases.",
  },
  {
    num: "04",
    title: "Acompañamiento Continuo",
    desc: "Soporte y seguimiento personalizado para asegurar el acompañamiento en sala de clases.",
  },
] as const;

export default function Page() {
  return (
    <main className={styles.page}>
      <h1 className={styles.visuallyHidden}>Educación Mediática para Docentes</h1>

      <section className={styles.hero} aria-labelledby="docentes-hero-title">
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>■ EDUCACIÓN MEDIÁTICA PARA DOCENTES · PROGRAMA 04</p>
          <h2 id="docentes-hero-title" className={styles.heroTitle}>
            Prepara a tus estudiantes para un presente
            <br />
            digital consciente, seguro y participativo.
          </h2>
          <p className={styles.heroSub}>
            Recursos didácticos, guías de aula y actividades prácticas — sin aumentar tu carga de trabajo.
          </p>
          <div className={styles.heroStat} aria-hidden="true">
            <p className={styles.heroStatBig}>6</p>
            <p className={styles.heroStatLabel}>módulos formativos</p>
          </div>
        </div>
      </section>

      <section className={`${styles.queEs} ${styles.padSection}`} aria-labelledby="docentes-que-es">
        <div className={styles.inner}>
          <div className={styles.queEsGrid}>
            <div>
              <p className={styles.statWord}>Más</p>
              <p className={styles.statSub}>confianza. Menos carga de trabajo.</p>
            </div>
            <div>
              <p id="docentes-que-es" className={styles.bodyText}>
                Ponemos a tu disposición recursos didácticos, guías de aula y actividades prácticas que
                fortalecen la evaluación crítica de la información, la creación responsable de contenidos y
                la convivencia en entornos digitales.
              </p>
              <p className={styles.bodyText}>
                Una herramienta para tus clases que no significa más trabajo, sino más confianza, seguridad
                y reflexión para ti y tus estudiantes en el mundo digital.
              </p>
              <p className={styles.bodyText}>
                Proveemos a los docentes herramientas prácticas y listas para incorporar en sus asignaturas,
                de modo que fomenten el pensamiento crítico y la responsabilidad digital en sus estudiantes
                sin aumentar su carga de trabajo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.sectionDark} ${styles.padSection}`} aria-labelledby="docentes-objetivos">
        <div className={styles.inner}>
          <h2 id="docentes-objetivos" className={styles.secTitleLight}>
            Nuestros objetivos para docentes
          </h2>
          <div className={styles.grid2}>
            {OBJETIVOS.map((item) => (
              <article key={item.num} className={styles.darkCard}>
                <p className={styles.cardNum}>{item.num}</p>
                <h3 className={styles.darkCardTitle}>{item.title}</h3>
                <p className={styles.darkCardDesc}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.sectionCream} ${styles.padSection}`} aria-labelledby="docentes-beneficios">
        <div className={styles.inner}>
          <h2 id="docentes-beneficios" className={styles.secTitleDark}>
            Beneficios para tu comunidad escolar
          </h2>
          <p className={styles.secSubtitle}>
            Potencia la formación docente y transforma la experiencia educativa de tus estudiantes.
          </p>
          <div className={styles.grid2}>
            {BENEFICIOS.map((item) => (
              <article key={item.num} className={styles.lightCard}>
                <p className={styles.cardNum}>{item.num}</p>
                <h3 className={styles.lightCardTitle}>{item.title}</h3>
                <p className={styles.lightCardDesc}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.sectionDark} ${styles.padSection}`} aria-labelledby="docentes-metodologia">
        <div className={styles.inner}>
          <h2 id="docentes-metodologia" className={styles.secTitleLight}>
            Nuestra metodología
          </h2>
          <div className={styles.grid2}>
            {METODOLOGIA.map((item) => (
              <article key={item.num} className={styles.darkCard}>
                <p className={styles.cardNum}>{item.num}</p>
                <h3 className={styles.darkCardTitle}>{item.title}</h3>
                <p className={styles.darkCardDesc}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.sectionCream} ${styles.padSection}`} aria-labelledby="docentes-modulos">
        <div className={styles.inner}>
          <h2 id="docentes-modulos" className={styles.modulosTitle}>
            Módulos Formativos
          </h2>
          <p className={styles.modulosSub}>
            Un camino estructurado para tu aprendizaje digital, paso a paso.
          </p>
          <DocentesModulosTabs />
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="docentes-cta-title">
        <div className={styles.ctaInner}>
          <div>
            <h2 id="docentes-cta-title" className={styles.ctaTitle}>
              Lleva la Educación Mediática Digital a tu establecimiento educacional.
            </h2>
          </div>
          <div className={styles.ctaRight}>
            <p className={styles.ctaAside}>
              Estamos listos para colaborar contigo. Diseñamos un programa de formación docente adaptado a las
              necesidades de tu institución.
            </p>
            <Link className={styles.ctaBtn} href="/participa">
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.continua} aria-labelledby="docentes-continua">
        <div className={styles.inner}>
          <p id="docentes-continua" className={styles.continuaEyebrow}>
            CONTINÚA
          </p>
          <nav className={styles.continuaLinks} aria-label="Enlaces relacionados">
            <Link className={styles.continuaLink} href="/programas/aprender-digital">
              Aprender Digital: Nunca es Tarde →
            </Link>
            <Link className={styles.continuaLink} href="/programas/leer-noticias-era-digital">
              Formación en Pensamiento Crítico Digital →
            </Link>
            <Link className={styles.continuaLink} href="/saberes">
              Biblioteca Saberes →
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
