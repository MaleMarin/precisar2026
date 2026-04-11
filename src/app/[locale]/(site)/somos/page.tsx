import type { Metadata } from "next";
import { FooterContactLink } from "@/components/FooterContactLink";
import { Link } from "@/i18n/navigation";
import { absoluteLocaleUrl, hreflangAlternates, SITE } from "@/lib/site";
import styles from "./SomosPage.module.css";

function ogLocaleTag(locale: string): string {
  if (locale === "pt") return "pt_BR";
  if (locale === "en") return "en_US";
  return "es_CL";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = absoluteLocaleUrl(locale, "/somos");
  return {
    title: "Somos Precisar",
    description:
      "Organización sin fines de lucro desde 2021: cultura digital, alfabetización mediática, herramientas y programas en Chile y México.",
    alternates: {
      canonical,
      languages: hreflangAlternates("/somos"),
    },
    openGraph: {
      title: "Somos Precisar",
      description:
        "Potenciar con precisión la cultura digital. Herramientas, experiencias y programas para una democracia digital informada.",
      url: canonical,
      siteName: SITE.name,
      locale: ogLocaleTag(locale),
      type: "website",
    },
  };
}

export default function SomosPrecisarPage() {
  return (
    <article className={styles.page}>
      <section className={`${styles.hero} ${styles.sectionPad}`} aria-labelledby="somos-hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroMain}>
            <p className={styles.heroEyebrow}>■ SOMOS PRECISAR</p>
            <h1 id="somos-hero-title" className={styles.heroTitle}>
              Porque entender lo que pasa es el primer paso para participar en ello.
            </h1>
          </div>
          <div className={styles.heroYear}>
            <span className={styles.heroYearBig} aria-hidden>
              2021
            </span>
            <p className={styles.heroYearCap}>desde cuando trabajamos</p>
          </div>
        </div>
      </section>

      <section className={`${styles.who} ${styles.sectionPad}`} aria-label="Quiénes somos">
        <div className={styles.whoGrid}>
          <div>
            <p className={styles.whoStatBig}>100%</p>
            <p className={styles.whoStatWord}>acción.</p>
            <p className={styles.whoStatSub}>Criterio ciudadano. Confianza informativa.</p>
          </div>
          <div className={styles.whoBody}>
            <p>
              Somos una organización sin fines de lucro nacida en Chile, construyendo desde 2021 una red de aprendizaje y
              acción digital que ya llega a México y sigue creciendo.
            </p>
            <p>
              Creamos herramientas, experiencias interactivas y programas formativos para que personas de todas las
              edades puedan desenvolverse con confianza en el entorno digital: entender cómo circula la información,
              cómo operan los algoritmos, cómo proteger su privacidad y cómo participar activamente en los debates
              públicos de hoy.
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.drives} ${styles.sectionPad}`} aria-labelledby="somos-drives-quote">
        <div className={styles.drivesInner}>
          <p id="somos-drives-quote" className={styles.drivesQuote}>
            Combinamos tecnología, comunicación y participación ciudadana para fortalecer la democracia digital y la
            convivencia informada.
          </p>
          <div className={styles.drivesGrid}>
            <div className={styles.drivesCol}>
              <h3 className={styles.drivesColTitle}>Tecnología</h3>
              <p className={styles.drivesColText}>
                Herramientas y plataformas digitales que hacen accesible el aprendizaje crítico para cualquier persona,
                en cualquier contexto.
              </p>
            </div>
            <div className={styles.drivesCol}>
              <h3 className={styles.drivesColTitle}>Comunicación</h3>
              <p className={styles.drivesColText}>
                Contenidos, recursos y experiencias que traducen la complejidad del ecosistema digital en lenguaje
                comprensible y accionable.
              </p>
            </div>
            <div className={styles.drivesCol}>
              <h3 className={styles.drivesColTitle}>Participación ciudadana</h3>
              <p className={styles.drivesColText}>
                Programas que fortalecen la autonomía, el criterio y la capacidad de las personas para participar con
                fundamento en los debates públicos de hoy.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.work} ${styles.sectionPad}`} aria-labelledby="somos-work-title">
        <div className={styles.workInner}>
          <h2 id="somos-work-title" className={styles.workTitle}>
            Lo que hacemos
          </h2>
          <div className={styles.workGrid}>
            <div className={styles.workCard}>
              <p className={styles.workNum}>01</p>
              <h3 className={styles.workCardTitle}>Programas formativos</h3>
              <p className={styles.workCardText}>
                Talleres, cursos y experiencias para ciudadanos, docentes, adultos mayores y funcionarios públicos en
                Chile y México.
              </p>
            </div>
            <div className={styles.workCard}>
              <p className={styles.workNum}>02</p>
              <h3 className={styles.workCardTitle}>Herramientas digitales</h3>
              <p className={styles.workCardText}>
                Bot Onda, plataformas interactivas y recursos abiertos para fortalecer el criterio ciudadano en el
                ecosistema digital.
              </p>
            </div>
            <div className={styles.workCard}>
              <p className={styles.workNum}>03</p>
              <h3 className={styles.workCardTitle}>Muestras físicas</h3>
              <p className={styles.workCardText}>
                Instalaciones itinerantes de cultura digital para municipios, eventos y espacios públicos en tres
                formatos: Pixel, Vector y Holo.
              </p>
            </div>
            <div className={styles.workCard}>
              <p className={styles.workNum}>04</p>
              <h3 className={styles.workCardTitle}>Investigación y política pública</h3>
              <p className={styles.workCardText}>
                Consultas ciudadanas, informes y propuestas para tomadores de decisión sobre alfabetización mediática e
                informacional.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.closing} ${styles.sectionPad}`} aria-label="Mensaje de cierre">
        <div className={styles.closingInner}>
          <p className={styles.closingLine}>
            Potenciar con <span className={styles.closingAccent}>precisión</span> la cultura digital.
          </p>
        </div>
      </section>

      <section className={`${styles.cta} ${styles.ctaPad}`} aria-labelledby="somos-cta-heading">
        <div className={styles.ctaInner}>
          <h2 id="somos-cta-heading" className={styles.ctaHeadline}>
            ¿Trabajamos juntos?
          </h2>
          <div>
            <p className={styles.ctaBody}>
              Escríbenos y cuéntanos tu idea, tu institución o tu comunidad. Diseñamos propuestas a medida.
            </p>
            <FooterContactLink className={styles.ctaBtn}>Contacto</FooterContactLink>
          </div>
        </div>
      </section>

      <section className={`${styles.next} ${styles.nextPad}`} aria-label="Continúa explorando">
        <div className={styles.nextInner}>
          <p className={styles.nextEyebrow}>CONTINÚA</p>
          <nav className={styles.nextLinks}>
            <Link href="/programas" className={styles.nextLink}>
              Ver todos los programas →
            </Link>
            <Link href="/participa" className={styles.nextLink}>
              Participa →
            </Link>
            <Link href="/#precisando" className={styles.nextLink}>
              Precisando →
            </Link>
          </nav>
        </div>
      </section>
    </article>
  );
}
