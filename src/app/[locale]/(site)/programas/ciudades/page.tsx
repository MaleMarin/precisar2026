import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PDFS } from "@/lib/site";
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

const FORMATIVAS = [
  "Inteligencia Artificial y su impacto",
  "Desinformación: Hechos vs. sentimientos sobre la información",
  "Prevención de Fraudes y Estafas en Línea",
  "Bienestar Digital y Salud Tecnológica",
] as const;

export default function CiudadesProgramaPage() {
  return (
    <article className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroStat} aria-hidden>
          <p className={styles.heroStatBig}>8 a 12</p>
          <p className={styles.heroStatLabel}>municipios</p>
        </div>
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>■ CIUDADES · PROGRAMA 01</p>
          <h1 className={styles.heroTitle}>Formación en Cultura Digital para la Ciudadanía</h1>
        </div>
      </header>

      <section className={styles.territorio} aria-labelledby="ciudades-territorio-heading">
        <div className={styles.territorioGrid}>
          <div>
            <h2 id="ciudades-territorio-heading" className={styles.visuallyHidden}>
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

      <section className={styles.formativas} aria-labelledby="ciudades-formativas-heading">
        <div className={styles.formativasInner}>
          <h2 id="ciudades-formativas-heading" className={styles.formativasTitle}>
            Nuestras propuestas formativas
          </h2>
          <div className={styles.formativasGrid}>
            {FORMATIVAS.map((title, i) => (
              <div key={title} className={styles.formativaCard}>
                <p className={styles.formativaNum}>{String(i + 1).padStart(2, "0")}</p>
                <h3 className={styles.formativaCardTitle}>{title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="ciudades-cta-heading">
        <div className={styles.ctaInner}>
          <h2 id="ciudades-cta-heading" className={styles.ctaTitle}>
            Lleva la cultura digital a tu municipio.
          </h2>
          <div>
            <p className={styles.ctaText}>
              Contáctanos para diseñar una propuesta a medida de tu comunidad.
            </p>
            <Link href="/participa" className={styles.ctaBtn}>
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <nav className={styles.continua} aria-label="Continúa explorando">
        <div className={styles.continuaInner}>
          <p className={styles.continuaEyebrow}>CONTINÚA</p>
          <div className={styles.continuaLinks}>
            <Link href="/programas" className={styles.continuaLink}>
              Índice de programas →
            </Link>
            <Link href="/participa" className={styles.continuaLink}>
              Participa y contacto →
            </Link>
            <Link href="/saberes" className={styles.continuaLink}>
              Biblioteca Saberes →
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}
