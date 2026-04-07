import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import styles from "./FuncionariosPage.module.css";
import { FuncionariosCursoTabs } from "./FuncionariosCursoTabs";

export const metadata: Metadata = {
  title: "Educación Mediática para Funcionarios Públicos",
  description:
    "Ocho sesiones de formación para la administración pública: medios digitales, verificación, comunicación institucional y uso de redes sociales.",
};

const BENEFICIOS = [
  {
    num: "01",
    title: "Toma de Decisiones Informada",
    desc: "Los funcionarios estarán capacitados para buscar, filtrar y evaluar información relevante y confiable, mejorando la calidad de las decisiones internas y el desempeño diario.",
  },
  {
    num: "02",
    title: "Mejora de la Comunicación Pública",
    desc: "Herramientas para una comunicación más efectiva y transparente a través de los medios y redes sociales, aumentando la confianza de los ciudadanos en la institución.",
  },
  {
    num: "03",
    title: "Reducción de Riesgos Institucionales",
    desc: "Al entender algoritmos, cámaras de eco y aprender a identificar desinformación, deepfakes y propaganda, los funcionarios protegen la reputación institucional.",
  },
  {
    num: "04",
    title: "Fomento de una Cultura de Pensamiento Crítico",
    desc: "Se promueve una mentalidad analítica entre los colaboradores, permitiéndoles abordar la información de manera reflexiva y consciente, fundamental para una gestión pública moderna.",
  },
] as const;

const PASOS = [
  {
    badge: "PASO 01",
    title: "Solicita una propuesta detallada",
    text: "Contáctanos para recibir una propuesta formal que incluya la inversión y la logística de implementación para tus equipos.",
  },
  {
    badge: "PASO 02",
    title: "Agendamos una presentación",
    text: "Coordinamos una reunión para presentar el programa en detalle y resolver todas tus preguntas.",
  },
  {
    badge: "PASO 03",
    title: "Adaptamos a tu institución",
    text: "Diseñamos el programa a medida de las necesidades específicas de tu organización.",
  },
] as const;

export default function Page() {
  return (
    <main className={styles.page}>
      <h1 className={styles.visuallyHidden}>Capacitación en Educación Mediática para Funcionarios Públicos</h1>

      <section className={styles.hero} aria-labelledby="fp-hero-title">
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>■ FUNCIONARIOS PÚBLICOS · PROGRAMA 06</p>
          <h2 id="fp-hero-title" className={styles.heroTitle}>
            Capacitación en Educación Mediática
            <br />
            para Funcionarios Públicos.
          </h2>
          <p className={styles.heroSub}>
            Formación diseñada específicamente para el contexto de la administración pública.
          </p>
          <div className={styles.heroStat} aria-hidden="true">
            <p className={styles.heroStatBig}>8</p>
            <p className={styles.heroStatLabel}>sesiones de formación</p>
          </div>
        </div>
      </section>

      <section className={`${styles.queEs} ${styles.padSection}`} aria-labelledby="fp-por-que">
        <div className={styles.inner}>
          <div className={styles.queEsGrid}>
            <div>
              <p className={styles.statWord}>Riesgo</p>
              <p className={styles.statSub}>directo para la democracia.</p>
            </div>
            <div>
              <p id="fp-por-que" className={styles.bodyText}>
                En el entorno digital actual, la desinformación y la manipulación informativa no son solo un
                desafío social, sino un riesgo directo para la administración pública, la confianza ciudadana y la
                estabilidad democrática.
              </p>
              <p className={styles.bodyText}>
                La capacidad de los servidores públicos para navegar, evaluar y utilizar los medios de
                comunicación de manera eficaz y segura es una competencia fundamental.
              </p>
              <p className={styles.bodyText}>
                Este programa ha sido diseñado específicamente para el contexto de la administración pública. Su
                objetivo es dotar a los funcionarios de las herramientas necesarias para trabajar de forma segura,
                confiable y eficiente en un mundo saturado de medios, fortaleciendo la transparencia
                institucional, la participación ciudadana y la resiliencia frente a amenazas informacionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.sectionDark} ${styles.padSection}`} aria-labelledby="fp-estructura">
        <div className={styles.inner}>
          <h2 id="fp-estructura" className={styles.secTitleLight}>
            Contenido y estructura del curso
          </h2>
          <p className={styles.secSubMuted}>
            8 sesiones diseñadas para el contexto de la administración pública.
          </p>
          <FuncionariosCursoTabs />
        </div>
      </section>

      <section className={`${styles.sectionCream} ${styles.padSection}`} aria-labelledby="fp-beneficios">
        <div className={styles.inner}>
          <h2 id="fp-beneficios" className={styles.secTitleDark}>
            Beneficios para la institución pública
          </h2>
          <div className={styles.benefGrid}>
            {BENEFICIOS.map((b) => (
              <article key={b.num} className={styles.benefCard}>
                <p className={styles.benefNum}>{b.num}</p>
                <h3 className={styles.benefTitle}>{b.title}</h3>
                <p className={styles.benefDesc}>{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.sectionDark} ${styles.padSection}`} aria-labelledby="fp-pasos">
        <div className={styles.inner}>
          <p id="fp-pasos" className={styles.pasosLead}>
            Consideramos esta capacitación una oportunidad estratégica en el capital humano y la resiliencia de
            la administración pública.
          </p>
          <div className={styles.pasosGrid}>
            {PASOS.map((p) => (
              <div key={p.badge} className={styles.pasoCol}>
                <p className={styles.pasoBadge}>{p.badge}</p>
                <h3 className={styles.pasoTitle}>{p.title}</h3>
                <p className={styles.pasoText}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="fp-cta-title">
        <div className={styles.ctaInner}>
          <div>
            <h2 id="fp-cta-title" className={styles.ctaTitle}>
              Lleva este programa a tu institución pública.
            </h2>
          </div>
          <div className={styles.ctaRight}>
            <p className={styles.ctaAside}>
              Estamos listos para adaptar el programa a las necesidades específicas de tu institución.
              Contáctanos para coordinar.
            </p>
            <Link className={styles.ctaBtn} href="/participa">
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.continua} aria-labelledby="fp-continua">
        <div className={styles.inner}>
          <p id="fp-continua" className={styles.continuaEyebrow}>
            CONTINÚA
          </p>
          <nav className={styles.continuaLinks} aria-label="Enlaces relacionados">
            <Link className={styles.continuaLink} href="/programas/pensamiento-critico">
              Formación en Pensamiento Crítico Digital →
            </Link>
            <Link className={styles.continuaLink} href="/programas/leer-noticias-era-digital">
              Curso Leer Noticias en la Era Digital →
            </Link>
            <Link className={styles.continuaLink} href="/participa">
              Participa y contacto →
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
}
