import type { Metadata } from "next";
import { FooterContactLink } from "@/components/FooterContactLink";
import { Link } from "@/i18n/navigation";
import shell from "@/components/programs/ProgramShell.module.css";
import { PDFS } from "@/lib/site";
import { CiudadesPropuestasTabs } from "./CiudadesPropuestasTabs";
import styles from "./CiudadesPage.module.css";

export const metadata: Metadata = {
  title: "Ciudades Conectadas con Sentido",
  description:
    "Formación en cultura digital para municipios: talleres AMI/UNESCO, IA, bienestar digital, privacidad y desinformación.",
};

const TEMAS = [
  {
    title: "Inteligencia Artificial",
    desc: "Desmitificando el futuro y sus implicaciones.",
  },
  {
    title: "Bienestar Digital",
    desc: "Hábitos saludables en el uso de la tecnología.",
  },
  {
    title: "Privacidad y Seguridad en Línea",
    desc: "Protegiendo identidad y datos.",
  },
  {
    title: "Estrategias contra la Desinformación",
    desc: "Criterio para navegar la información.",
  },
] as const;

const IMPACTO = [
  {
    title: "Ciudadanía activa y crítica",
    desc: "Pensamiento analítico, desinformación, participación local informada.",
  },
  {
    title: "Mayor seguridad digital",
    desc: "Fraudes, privacidad, uso ético.",
  },
  {
    title: "Alfabetización en IA y algoritmos",
    desc: "Sesgos y contenido generado por IA.",
  },
  {
    title: "Bienestar digital",
    desc: "Hábitos saludables e inclusión.",
  },
  {
    title: "Gobernanza local transparente",
    desc: "AMI en políticas y servicios.",
  },
  {
    title: "Conexión y participación comunitaria",
    desc: "Iniciativas en espacios urbanos.",
  },
] as const;

export default function CiudadesProgramaPage() {
  return (
    <article className={shell.page} data-program="ciudades">
      <header className={shell.hero}>
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>■ CIUDADES · PROGRAMA 01</p>
          <h1 className={shell.heroTitle}>Formación en Cultura Digital para la Ciudadanía</h1>
        </div>
      </header>

      <section
        className={`${shell.padSection} ${styles.territorio}`}
        aria-labelledby="ciudades-territorio-heading"
      >
        <div className={`${shell.inner} ${styles.territorioGrid}`}>
          <div>
            <h2 id="ciudades-territorio-heading" className={shell.visuallyHidden}>
              Territorio e impacto
            </h2>
            <p className={styles.territorioStatNum}>100%</p>
            <p className={styles.territorioStatLabel}>personalizable para cada municipio</p>
          </div>
          <div>
            <p className={styles.territorioText}>
              Ponemos a disposición de los municipios una oferta formativa diseñada para capacitar a la
              comunidad con las habilidades críticas esenciales en la era digital.
            </p>
            <p className={styles.territorioText}>
              Nuestro trabajo en las ciudades se inspira directamente en el marco de las{" "}
              <a
                href={PDFS.ciudadesAmiUnesco}
                className={styles.territorioLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ciudades AMI (Alfabetización Mediática e Informacional) de la UNESCO
              </a>
              , adaptando sus principios para fomentar ecosistemas de información locales más críticos y
              resilientes.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.propuesta} aria-labelledby="ciudades-propuesta-heading">
        <div className={styles.propuestaInner}>
          <h2 id="ciudades-propuesta-heading" className={styles.propuestaLead}>
            Experiencias dinámicas para que cada participante comprenda, use y gestione los medios digitales
            con autonomía.
          </h2>

          <div className={styles.propuestaCols}>
            <div className={styles.propuestaCol}>
              <h3 className={styles.propuestaColTitle}>Impacto Directo en la Ciudadanía</h3>
              <p className={styles.propuestaColText}>
                Talleres y actividades para vecinos de todas las edades.
              </p>
            </div>
            <div className={styles.propuestaCol}>
              <h3 className={styles.propuestaColTitle}>Capacitación de Formadores</h3>
              <p className={styles.propuestaColText}>
                Estrategias que multiplican el impacto con educadores, bibliotecarios, equipos municipales y
                organizaciones comunitarias.
              </p>
            </div>
          </div>

          <div className={styles.propuestaGrid}>
            {TEMAS.map((t) => (
              <div key={t.title} className={styles.propuestaCard}>
                <div className={styles.propuestaCardMark} aria-hidden>
                  ■
                </div>
                <p className={styles.propuestaCardTitle}>{t.title}</p>
                <p className={styles.propuestaCardDesc}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.impacto} aria-labelledby="ciudades-impacto-heading">
        <div className={styles.impactoInner}>
          <h2 id="ciudades-impacto-heading" className={styles.impactoTitle}>
            Lo que cambia en tu municipio
          </h2>
          <div className={styles.impactoGrid}>
            {IMPACTO.map((item) => (
              <div key={item.title} className={styles.impactoCard}>
                <div className={styles.impactoCardMark} aria-hidden>
                  ■
                </div>
                <h3 className={styles.impactoCardTitle}>{item.title}</h3>
                <p className={styles.impactoCardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.propuestasFormativas} aria-labelledby="ciudades-propuestas-heading">
        <div className={styles.propuestasInner}>
          <h2 id="ciudades-propuestas-heading" className={styles.propuestasTitle}>
            Nuestras Propuestas Formativas
          </h2>
          <p className={styles.propuestasSub}>
            Programas modulares y flexibles, diseñados a la medida de tu comunidad.
          </p>
          <CiudadesPropuestasTabs />
        </div>
      </section>

      <section className={shell.cta} aria-labelledby="ciudades-cta-heading">
        <div className={`${shell.ctaInner} ${shell.ctaInnerCiudades}`}>
          <h2 id="ciudades-cta-heading" className={shell.ctaTitle}>
            Lleva la cultura digital a tu municipio.
          </h2>
          <div>
            <p className={shell.ctaText}>
              Contáctanos para diseñar una propuesta a medida de tu comunidad.
            </p>
            <FooterContactLink className={shell.ctaBtn}>Contacto</FooterContactLink>
          </div>
        </div>
      </section>

      <nav className={shell.continua} aria-label="Continúa explorando">
        <div className={shell.inner}>
          <p className={shell.continuaEyebrow}>CONTINÚA</p>
          <div className={shell.continuaLinks}>
            <Link href="/programas" className={shell.continuaLink}>
              Índice de programas →
            </Link>
            <FooterContactLink className={shell.continuaLink}>Participa y contacto →</FooterContactLink>
            <Link href="/saberes" className={shell.continuaLink}>
              Biblioteca Saberes →
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}
