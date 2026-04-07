import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import shell from "@/components/programs/ProgramShell.module.css";
import { PDFS } from "@/lib/site";
import styles from "./HubDigitalPage.module.css";

export const metadata: Metadata = {
  title: "Hub Digital Consciente",
  description:
    "Muestras portátiles e interactivas de cultura digital para plazas, bibliotecas, educación, corporativos y territorio.",
};

const PARA_QUIEN = [
  {
    title: "Plazas y espacios públicos",
    desc: "Al aire libre, para comunidades de todas las edades.",
  },
  {
    title: "Bibliotecas y salas culturales",
    desc: "Espacios de reflexión y aprendizaje colectivo.",
  },
  {
    title: "Establecimientos educacionales",
    desc: "Desde colegios hasta universidades.",
  },
  {
    title: "Auditorios y eventos corporativos",
    desc: "Para generar conversaciones necesarias en tu organización.",
  },
  {
    title: "Municipios y gobiernos locales",
    desc: "Intervención territorial con impacto ciudadano directo.",
  },
  {
    title: "Eventos y festivales",
    desc: "Activación cultural en contextos de alta convocatoria.",
  },
] as const;

const ENCONTRARAS = [
  {
    num: "01",
    title: "Carteles visualmente impactantes",
    desc: "Diseñados para provocar conversación y reflexión inmediata. Cada póster actúa como un abre ojos que presenta información de forma clara y estética.",
  },
  {
    num: "02",
    title: "Animaciones de video",
    desc: "Dan pie a discusiones sobre privacidad y detección de noticias falsas. Exploran dilemas éticos del mundo digital mediante historias visuales.",
  },
  {
    num: "03",
    title: "Aplicaciones interactivas",
    desc: "Invitan a experimentar de primera mano tecnologías de punta como realidad aumentada e inteligencia artificial para crear experiencias memorables.",
  },
  {
    num: "04",
    title: "Experiencias prácticas para el debate",
    desc: "Estimulan debates significativos entre participantes. Complemento perfecto antes de talleres, charlas o seminarios sobre cultura digital.",
  },
] as const;

export default function Page() {
  return (
    <main className={shell.page} data-program="hub">
      <header className={shell.hero} aria-labelledby="hub-hero-title">
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>■ HUB DIGITAL CONSCIENTE · PROGRAMA 02</p>
          <h1 id="hub-hero-title" className={shell.heroTitle}>
            Cultura digital que viaja a donde está la gente.
          </h1>
        </div>
      </header>

      <section className={`${shell.queEs} ${shell.padSection}`} aria-labelledby="hub-que-es">
        <div className={shell.inner}>
          <div className={shell.queEsGrid}>
            <div>
              <p className={shell.statWord}>Portátil.</p>
              <p className={shell.statSub}>Diseñada para cualquier espacio.</p>
            </div>
            <div>
              <p id="hub-que-es" className={shell.bodyText}>
                En el Hub Digital Consciente nos sumergimos en la cultura digital a través de muestras
                interactivas y temáticas. Cada una es portátil y está diseñada para explorar cómo los
                medios y la tecnología influyen en nuestra sociedad, llevando el conocimiento
                directamente a eventos, municipios, espacios públicos y más.
              </p>
              <p className={shell.bodyText}>
                No solo presentamos temas: también abrimos un espacio para el diálogo y la acción. Con
                cada muestra, traducimos conceptos complejos, desde la desinformación e inteligencia
                artificial hasta la privacidad, en experiencias sensoriales accesibles que impulsan
                conversaciones significativas sobre el uso responsable de la tecnología.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.paraQuien} ${shell.padSection}`} aria-labelledby="hub-para-quien">
        <div className={shell.inner}>
          <p id="hub-para-quien" className={styles.paraLead}>
            Esta experiencia se adapta a cualquier evento, para cualquier público, en cualquier espacio.
          </p>
          <div className={styles.paraGrid}>
            {PARA_QUIEN.map((item) => (
              <article key={item.title} className={styles.paraCard}>
                <p className={styles.paraMark}>■</p>
                <h3 className={styles.paraCardTitle}>{item.title}</h3>
                <p className={styles.paraCardDesc}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.encontraras} ${shell.padSection}`} aria-labelledby="hub-encontraras">
        <div className={shell.inner}>
          <h2 id="hub-encontraras" className={styles.secTitle}>
            Lo que encontrarás en cada muestra
          </h2>
          <div className={styles.enconGrid}>
            {ENCONTRARAS.map((item) => (
              <article key={item.num} className={styles.enconCard}>
                <p className={styles.enconNum}>{item.num}</p>
                <h3 className={styles.enconCardTitle}>{item.title}</h3>
                <p className={styles.enconCardDesc}>{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.personaliza} ${shell.padSection}`} aria-labelledby="hub-personaliza">
        <div className={shell.inner}>
          <h2 id="hub-personaliza" className={styles.secTitle}>
            Se adapta a lo que necesitas
          </h2>
          <div className={styles.persCols}>
            <div className={styles.persCol}>
              <h3 className={styles.persColTitle}>Ediciones temáticas</h3>
              <p className={styles.persColText}>
                Profundiza en áreas específicas, IA, desinformación, privacidad digital, incorporando
                contenidos y tecnologías especializadas como estaciones de realidad virtual o
                simulaciones avanzadas.
              </p>
            </div>
            <div className={styles.persCol}>
              <h3 className={styles.persColTitle}>Edición comunitaria</h3>
              <p className={styles.persColText}>
                Adapta la realidad de tu comuna o grupo objetivo, integrando dinámicas de participación
                local y foros de debate que empoderan a vecinos de todas las edades.
              </p>
            </div>
            <div className={styles.persCol}>
              <h3 className={styles.persColTitle}>Componentes a la carta</h3>
              <p className={styles.persColText}>
                Elige piezas sueltas: pósters, mini-experimentos interactivos, kits de cultura digital,
                para complementar la exposición según tus necesidades.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.ediciones} ${shell.padSection}`} aria-labelledby="hub-ediciones">
        <div className={shell.inner}>
          <h2 id="hub-ediciones" className={styles.edicionesTitle}>
            Ediciones temáticas disponibles
          </h2>
          <div className={styles.edicionesGrid}>
            <article className={styles.edicionCard}>
              <p className={styles.edicionNum}>01</p>
              <h3 className={styles.edicionCardTitle}>Edición Desinformación</h3>
              <a
                className={styles.edicionLink}
                href={PDFS.hubDesinformacion}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver especificaciones completas →
              </a>
            </article>
            <article className={styles.edicionCard}>
              <p className={styles.edicionNum}>02</p>
              <h3 className={styles.edicionCardTitle}>Edición IA y Algoritmos</h3>
              <a
                className={styles.edicionLink}
                href={PDFS.hubIaAlgoritmos}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver especificaciones completas →
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.como} ${shell.padSection}`} aria-labelledby="hub-como">
        <div className={shell.inner}>
          <h2 id="hub-como" className={styles.secTitle}>
            Cómo desarrollamos cada muestra
          </h2>
          <div className={styles.comoGrid}>
            <div className={styles.comoCol}>
              <h3 className={styles.comoColTitle}>Colaboración con Expertos</h3>
              <p className={styles.comoColText}>
                Nos asociamos con profesionales en diversos campos para asegurar que el contenido sea
                preciso y relevante.
              </p>
            </div>
            <div className={styles.comoCol}>
              <h3 className={styles.comoColTitle}>Investigación en Campo</h3>
              <p className={styles.comoColText}>
                Realizamos investigaciones directas con la audiencia para entender los desafíos reales
                y las perspectivas de cada muestra.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={shell.cta} aria-labelledby="hub-cta-title">
        <div className={shell.ctaInner}>
          <div>
            <h2 id="hub-cta-title" className={shell.ctaTitle}>
              Lleva el Hub Digital Consciente a tu espacio.
            </h2>
            <ol className={shell.ctaSteps}>
              <li>01 Contanos espacio, público y duración que imaginás para la muestra.</li>
              <li>02 Escríbenos: Cuéntanos tu idea y contexto.</li>
              <li>03 Co-creemos: Juntos afinamos contenidos, montaje y cronograma.</li>
            </ol>
          </div>
          <div className={shell.ctaRight}>
            <Link className={shell.ctaBtn} href="/participa">
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <nav className={shell.continua} aria-labelledby="hub-continua">
        <div className={shell.inner}>
          <p id="hub-continua" className={shell.continuaEyebrow}>
            CONTINÚA
          </p>
          <div className={shell.continuaLinks}>
            <Link className={shell.continuaLink} href="/programas/ciudades">
              Ciudades Conectadas con Sentido →
            </Link>
            <Link className={shell.continuaLink} href="/participa">
              Participa y contacto →
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
