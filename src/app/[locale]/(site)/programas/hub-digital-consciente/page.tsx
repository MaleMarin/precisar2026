import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { PDFS } from "@/lib/site";
import styles from "./HubDigitalPage.module.css";

export const metadata: Metadata = {
  title: "Hub Digital Consciente",
  description:
    "Muestras portátiles de cultura digital: Pixel, Vector y Holo. Para plazas, bibliotecas, educación, corporativos y territorio.",
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
    <main className={styles.page}>
      <h1 className={styles.visuallyHidden}>Hub Digital Consciente</h1>

      <section className={styles.hero} aria-labelledby="hub-hero-title">
        <div className={styles.heroInner}>
          <p className={styles.heroEyebrow}>■ HUB DIGITAL CONSCIENTE · PROGRAMA 02</p>
          <h2 id="hub-hero-title" className={styles.heroTitle}>
            Cultura digital que viaja a donde está la gente.
          </h2>
          <div className={styles.heroStat} aria-hidden="true">
            <p className={styles.heroStatBig}>3</p>
            <p className={styles.heroStatLabel}>formatos: Pixel · Vector · Holo</p>
          </div>
        </div>
      </section>

      <section className={`${styles.queEs} ${styles.padSection}`} aria-labelledby="hub-que-es">
        <div className={styles.inner}>
          <div className={styles.queEsGrid}>
            <div>
              <p className={styles.statWord}>Portátil.</p>
              <p className={styles.statSub}>Diseñada para cualquier espacio.</p>
            </div>
            <div>
              <p id="hub-que-es" className={styles.bodyText}>
                En el Hub Digital Consciente nos sumergimos en la cultura digital a través de muestras
                interactivas y temáticas. Cada una es portátil y está diseñada para explorar cómo los
                medios y la tecnología influyen en nuestra sociedad, llevando el conocimiento
                directamente a eventos, municipios, espacios públicos y más.
              </p>
              <p className={styles.bodyText}>
                No solo presentamos temas: también abrimos un espacio para el diálogo y la acción. Con
                cada muestra, traducimos conceptos complejos, desde la desinformación e inteligencia
                artificial hasta la privacidad, en experiencias sensoriales accesibles que impulsan
                conversaciones significativas sobre el uso responsable de la tecnología.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.paraQuien} ${styles.padSection}`} aria-labelledby="hub-para-quien">
        <div className={styles.inner}>
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

      <section className={`${styles.encontraras} ${styles.padSection}`} aria-labelledby="hub-encontraras">
        <div className={styles.inner}>
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

      <section
        id="formatos"
        className={`${styles.formatos} ${styles.padSection}`}
        aria-labelledby="hub-formatos"
      >
        <div className={styles.inner}>
          <h2 id="hub-formatos" className={styles.formatosTitle}>
            Elige tu formato
          </h2>
          <p className={styles.formatosSub}>
            Tres modelos de instalación para adaptarse a tu espacio, duración y público.
          </p>

          <div className={styles.fmtRow}>
            <article className={styles.fmtCard}>
              <div className={`${styles.fmtHead} ${styles.fmtHeadPixel}`}>
                <h3 className={styles.fmtHeadTitle}>PIXEL</h3>
                <p className={styles.fmtHeadSub}>Formato básico para espacios reducidos</p>
              </div>
              <div className={styles.fmtBody}>
                <ul className={styles.fmtList}>
                  <li>2 Carteles Temáticos</li>
                  <li>1 Pantalla de Animación</li>
                  <li>2 Experiencias Interactivas</li>
                </ul>
                <div className={styles.fmtSpecGrid}>
                  <div className={styles.fmtSpec}>
                    <strong>Espacio</strong>8 a 12 m²
                  </div>
                  <div className={styles.fmtSpec}>
                    <strong>Instalación</strong>45 a 60 minutos
                  </div>
                  <div className={styles.fmtSpec}>
                    <strong>Duración</strong>1 a 3 días
                  </div>
                  <div className={styles.fmtSpec}>
                    <strong>Audiencia</strong>50 a 100 personas/día
                  </div>
                </div>
              </div>
            </article>

            <article className={styles.fmtCard}>
              <div className={`${styles.fmtHead} ${styles.fmtHeadVector}`}>
                <h3 className={styles.fmtHeadTitle}>VECTOR</h3>
                <p className={styles.fmtHeadSub}>Formato estándar para eventos medianos</p>
              </div>
              <div className={styles.fmtBody}>
                <ul className={styles.fmtList}>
                  <li>3 Carteles Temáticos</li>
                  <li>3 Pantallas de Animación</li>
                  <li>3 Estaciones Interactivas</li>
                  <li>Experiencias Prácticas para Debate (opcional)</li>
                </ul>
                <div className={styles.fmtSpecGrid}>
                  <div className={styles.fmtSpec}>
                    <strong>Espacio</strong>15 a 25 m²
                  </div>
                  <div className={styles.fmtSpec}>
                    <strong>Instalación</strong>2 a 3 horas
                  </div>
                  <div className={styles.fmtSpec}>
                    <strong>Duración</strong>3 días a 2 semanas
                  </div>
                  <div className={styles.fmtSpec}>
                    <strong>Audiencia</strong>100 a 300 personas/día
                  </div>
                </div>
              </div>
            </article>

            <article className={styles.fmtCard}>
              <div className={`${styles.fmtHead} ${styles.fmtHeadHolo}`}>
                <h3 className={styles.fmtHeadTitle}>HOLO</h3>
                <p className={styles.fmtHeadSub}>Formato completo para instalaciones duraderas</p>
              </div>
              <div className={styles.fmtBody}>
                <ul className={styles.fmtList}>
                  <li>6 Carteles Visuales</li>
                  <li>3 Animaciones de Video</li>
                  <li>4 Aplicaciones Interactivas</li>
                  <li>Consultas adaptadas al público</li>
                  <li>Zona Central para debate y reflexión</li>
                </ul>
                <div className={styles.fmtSpecGrid}>
                  <div className={styles.fmtSpec}>
                    <strong>Espacio</strong>30 a 50 m²
                  </div>
                  <div className={styles.fmtSpec}>
                    <strong>Instalación</strong>4 a 6 horas
                  </div>
                  <div className={styles.fmtSpec}>
                    <strong>Duración</strong>2 semanas a permanente
                  </div>
                  <div className={styles.fmtSpec}>
                    <strong>Audiencia</strong>200 a 500 personas/día
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.personaliza} ${styles.padSection}`} aria-labelledby="hub-personaliza">
        <div className={styles.inner}>
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

      <section className={`${styles.ediciones} ${styles.padSection}`} aria-labelledby="hub-ediciones">
        <div className={styles.inner}>
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

      <section className={`${styles.como} ${styles.padSection}`} aria-labelledby="hub-como">
        <div className={styles.inner}>
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

      <section className={styles.cta} aria-labelledby="hub-cta-title">
        <div className={styles.ctaInner}>
          <div>
            <h2 id="hub-cta-title" className={styles.ctaTitle}>
              Lleva el Hub Digital Consciente a tu espacio.
            </h2>
            <ol className={styles.ctaSteps}>
              <li>01 Elige tu formato: Pixel, Vector o Holo.</li>
              <li>02 Escríbenos: Cuéntanos tu idea y contexto.</li>
              <li>03 Co-creemos: Juntos afinamos contenidos, montaje y cronograma.</li>
            </ol>
          </div>
          <div className={styles.ctaRight}>
            <Link className={styles.ctaBtn} href="/participa">
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.continua} aria-labelledby="hub-continua">
        <div className={styles.inner}>
          <p id="hub-continua" className={styles.continuaEyebrow}>
            CONTINÚA
          </p>
          <nav className={styles.continuaLinks} aria-label="Enlaces relacionados">
            <Link className={styles.continuaLink} href="/programas/ciudades">
              Ciudades Conectadas con Sentido →
            </Link>
            <Link className={styles.continuaLink} href="/participa">
              Participa y contacto →
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
