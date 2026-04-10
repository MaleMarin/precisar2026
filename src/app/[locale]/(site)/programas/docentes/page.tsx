import type { Metadata } from "next";
import { FooterContactLink } from "@/components/FooterContactLink";
import { Link } from "@/i18n/navigation";
import shell from "@/components/programs/ProgramShell.module.css";
import styles from "./DocentesPage.module.css";
import { DocentesModulosTabs } from "./DocentesModulosTabs";

export const metadata: Metadata = {
  title: "Educación mediática para docentes · Uso en sala de aula",
  description:
    "Alfabetización mediática e informacional (AMI) para docentes: recursos didácticos, guías de aula y actividades prácticas pensadas para usar en sala de clase, sin aumentar la carga de trabajo.",
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
    title: "Integrar la AMI",
    desc: "Facilitar la integración de la alfabetización mediática e informacional en el currículo escolar, con guías y recursos que se adapten a diferentes asignaturas y niveles.",
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
    <main className={shell.page} data-program="docentes">
      <header className={shell.hero} aria-labelledby="docentes-hero-title">
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>
            ■ EDUCACIÓN MEDIÁTICA PARA DOCENTES · USO EN SALA DE AULA · PROGRAMA 04
          </p>
          <h1 id="docentes-hero-title" className={shell.heroTitle}>
            Prepara a tus estudiantes para un presente
            <br />
            digital consciente, seguro y participativo.
          </h1>
          <p className={shell.heroSub}>
            Recursos didácticos, guías de aula y actividades prácticas para aplicar en sala de clase — sin
            aumentar tu carga de trabajo.
          </p>
        </div>
      </header>

      <section className={`${shell.queEs} ${shell.padSection}`} aria-labelledby="docentes-que-es">
        <div className={shell.inner}>
          <div className={shell.queEsGrid}>
            <div>
              <p className={shell.statWord}>Más</p>
              <p className={shell.statSub}>confianza. Menos carga de trabajo.</p>
            </div>
            <div>
              <p id="docentes-que-es" className={shell.bodyText}>
                Ponemos a tu disposición recursos didácticos, guías de aula y actividades prácticas que
                fortalecen la evaluación crítica de la información, la creación responsable de contenidos y
                la convivencia en entornos digitales.
              </p>
              <p className={shell.bodyText}>
                Una herramienta para tus clases que no significa más trabajo, sino más confianza, seguridad
                y reflexión para ti y tus estudiantes en el mundo digital.
              </p>
              <p className={shell.bodyText}>
                Proveemos a los docentes herramientas prácticas y listas para incorporar en sus asignaturas,
                de modo que fomenten el pensamiento crítico y la responsabilidad digital en sus estudiantes
                sin aumentar su carga de trabajo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${shell.sectionDark} ${shell.padSection}`} aria-labelledby="docentes-objetivos">
        <div className={shell.inner}>
          <h2 id="docentes-objetivos" className={`${shell.secTitleLight} ${shell.secTitleLightSpaced}`}>
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

      <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="docentes-beneficios">
        <div className={shell.inner}>
          <h2 id="docentes-beneficios" className={shell.secTitleDark}>
            Beneficios para tu comunidad escolar
          </h2>
          <p className={shell.secSubtitle}>
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

      <section className={`${shell.sectionDark} ${shell.padSection}`} aria-labelledby="docentes-metodologia">
        <div className={shell.inner}>
          <h2 id="docentes-metodologia" className={`${shell.secTitleLight} ${shell.secTitleLightSpaced}`}>
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

      <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="docentes-modulos">
        <div className={shell.inner}>
          <h2 id="docentes-modulos" className={shell.secTitleDark}>
            Módulos formativos
          </h2>
          <p className={shell.secSubtitle}>
            Un camino estructurado para tu aprendizaje digital, paso a paso.
          </p>
          <DocentesModulosTabs />
        </div>
      </section>

      <section className={shell.cta} aria-labelledby="docentes-cta-title">
        <div className={shell.ctaInner}>
          <div>
            <h2 id="docentes-cta-title" className={shell.ctaTitle}>
              Lleva la Alfabetización Mediática e Informacional a tu establecimiento educacional.
            </h2>
          </div>
          <div className={shell.ctaRight}>
            <p className={shell.ctaAside}>
              Estamos listos para colaborar contigo. Diseñamos un programa de formación docente adaptado a las
              necesidades de tu institución.
            </p>
            <FooterContactLink className={shell.ctaBtn}>Contacto</FooterContactLink>
          </div>
        </div>
      </section>

      <nav className={shell.continua} aria-labelledby="docentes-continua">
        <div className={shell.inner}>
          <p id="docentes-continua" className={shell.continuaEyebrow}>
            CONTINÚA
          </p>
          <div className={shell.continuaLinks}>
            <Link className={shell.continuaLink} href="/programas/aprender-digital">
              Aprender Digital: Nunca es Tarde →
            </Link>
            <Link className={shell.continuaLink} href="/programas/leer-noticias-era-digital">
              Educación mediática para que los docentes la usen dentro de la sala de aula →
            </Link>
            <Link className={shell.continuaLink} href="/saberes">
              Biblioteca Saberes →
            </Link>
          </div>
        </div>
      </nav>
    </main>
  );
}
