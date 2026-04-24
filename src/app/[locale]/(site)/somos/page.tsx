import type { Metadata } from "next";
import { FooterContactLink } from "@/components/FooterContactLink";
import { absoluteLocaleUrl, hreflangAlternates, SITE } from "@/lib/site";
import { SomosMotionSection } from "./_components/SomosMotionSection";
import styles from "./SomosPage.module.css";

function ogLocaleTag(locale: string): string {
  if (locale === "pt") return "pt_BR";
  if (locale === "en") return "en_US";
  return "es_CL";
}

const META_DESC =
  "Fortalecemos capacidades para comprender, evaluar y usar información con más criterio. Co-diseño con municipios, educación, sociedad civil y servicios públicos en Chile.";

const INTRO = [
  "En Precisar trabajamos con organizaciones que quieren fortalecer la relación de las personas con la información y promover un uso más consciente, útil y constructivo de la tecnología.",
  "Colaboramos con municipios, comunidades educativas, organizaciones de la sociedad civil, servicios públicos, medios y redes territoriales para traducir un problema complejo —la desigual capacidad de comprender, evaluar y usar información— en herramientas, metodologías y recursos concretos, adaptados a contextos reales.",
] as const;

const PRINCIPLE = `No trabajamos desde soluciones cerradas. Partimos del contexto, escuchamos cómo viven este problema las personas y diseñamos junto a cada aliado formas de abordarlo con sentido práctico, lenguaje claro y capacidad de implementación.`;

const PROBLEM_PARAS = [
  "La noción de información se entiende en un sentido amplio. No refiere únicamente a noticias o contenidos periodísticos, sino también a información institucional, cívica, digital o no, educativa y práctica que las personas reciben, interpretan y usan para resolver problemas, participar en asuntos públicos, acceder a derechos y desenvolverse en entornos digitales.",
  "Hoy en día no es solo el problema de conexión. Aunque la conectividad ha avanzado, persiste una diferencia profunda en la posibilidad real de comprender, evaluar y usar información de manera útil en la vida cotidiana y cívica.",
  "Esa brecha no se limita a noticias o redes sociales. Incluye también información institucional, educativa, práctica y de servicios: la que las personas necesitan para orientarse, resolver problemas, interactuar con instituciones y tomar decisiones informadas.",
  "Cuando esa capacidad falta, aumenta la confusión, se vuelve más difícil distinguir información confiable, se debilita la comunicación entre instituciones y ciudadanía, y se amplían las barreras para participar, comprender y actuar con criterio.",
] as const;

const HOW_WE_WORK = [
  {
    title: "Co-diseñamos con el contexto",
    body: "No aplicamos fórmulas únicas. Adaptamos metodologías, herramientas y recursos a las necesidades, lenguajes y capacidades de cada organización y de las comunidades con las que trabaja.",
  },
  {
    title: "Traducimos evidencia en acción",
    body: "Producimos y organizamos evidencia útil para comprender cómo se informan las personas, qué barreras enfrentan y qué herramientas pueden ser más efectivas para acompañarlas.",
  },
  {
    title: "Probamos en terreno",
    body: "Diseñamos e implementamos experiencias en contextos reales, con públicos concretos y condiciones diversas, para aprender, ajustar y dejar modelos replicables.",
  },
  {
    title: "Transferimos capacidades",
    body: "Buscamos que las organizaciones puedan apropiarse de metodologías, recursos y herramientas, integrándolos en sus propias prácticas más allá de una intervención puntual.",
  },
  {
    title: "Combinamos claridad, tecnología y sentido público",
    body: "Desarrollamos herramientas abiertas, contenidos accesibles y experiencias aplicadas que permitan comprender mejor cómo circula la información y cómo usar la tecnología de forma más consciente y provechosa.",
  },
] as const;

const TOGETHER = [
  {
    title: "Diagnóstico y escucha",
    body: "Procesos para comprender cómo se informan distintos públicos, qué dificultades enfrentan y qué tipo de apoyo necesitan.",
  },
  {
    title: "Metodologías para territorios e instituciones",
    body: "Diseño e implementación de modelos de trabajo para municipios, escuelas, organizaciones y servicios públicos.",
  },
  {
    title: "Recursos y herramientas abiertas",
    body: "Guías, actividades, materiales explicativos, experiencias participativas y herramientas conversacionales adaptadas a diferentes públicos y etapas de vida.",
  },
  {
    title: "Acompañamiento para adopción institucional",
    body: "Apoyo a equipos y organizaciones para incorporar esta agenda desde sus propios roles, capacidades y objetivos.",
  },
  {
    title: "Evidencia para decisiones",
    body: "Sistematización de aprendizajes y generación de insumos útiles para mejorar prácticas, programas y formas de comunicación.",
  },
] as const;

const PARTNERS = [
  "Municipios y gobiernos locales",
  "Establecimientos y comunidades educativas",
  "Organizaciones de la sociedad civil",
  "Servicios públicos",
  "Medios y proyectos de comunicación",
  "Fundaciones y redes territoriales",
  "Equipos que trabajan con personas mayores, juventudes o comunidades específicas",
] as const;

const OUTCOMES = [
  "Mejores herramientas para comprender cómo se relacionan sus públicos con la información",
  "Recursos utilizables y adaptables a su realidad",
  "Metodologías probadas en contextos reales",
  "Capacidades para sostener este trabajo en el tiempo",
  "Una mejor conexión entre evidencia, comunicación y acción",
] as const;

const COLLAB_PARAS = [
  "Creemos que las herramientas funcionan mejor cuando nacen del uso real, del contexto local y de la experiencia de las personas.",
  "Por eso, en Precisar entendemos la colaboración como un proceso de construcción conjunta. Aportamos evidencia, diseño metodológico, experiencia pedagógica y desarrollo de herramientas; nuestros aliados aportan conocimiento territorial, llegada a comunidades, legitimidad local y capacidad de implementación. Esa combinación permite construir respuestas más pertinentes, más claras y más sostenibles.",
] as const;

const WHY_FOUR = [
  "Evidencia útil para entender cómo se informan las personas y qué necesitan.",
  "Metodologías aplicadas para traducir esa evidencia en intervención concreta.",
  "Recursos accesibles diseñados para distintos públicos y contextos.",
  "Acompañamiento institucional para que las capacidades queden instaladas.",
] as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = absoluteLocaleUrl(locale, "/somos");
  return {
    title: "Somos Precisar",
    description: META_DESC,
    alternates: {
      canonical,
      languages: hreflangAlternates("/somos"),
    },
    openGraph: {
      title: "Somos Precisar",
      description: META_DESC,
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
      <header className={styles.hero} aria-labelledby="somos-title">
        <div className={styles.heroInner}>
          <p className={styles.kicker}>Somos Precisar</p>
          <h1 id="somos-title" className={styles.heroTitle}>
            Fortalecemos capacidades para comprender, evaluar y usar información con más criterio
          </h1>
        </div>
      </header>

      <section className={`${styles.band} ${styles.bandCream}`} aria-label="Introducción">
        <SomosMotionSection className={styles.inner}>
          <div className={styles.proseL}>
            {INTRO.map((p, i) => (
              <p key={i} className={styles.para}>
                {p}
              </p>
            ))}
          </div>
        </SomosMotionSection>
      </section>

      <section className={`${styles.band} ${styles.bandPaper}`} aria-label="Principio de trabajo">
        <SomosMotionSection className={styles.inner}>
          <blockquote className={styles.pullQuote}>
            <span className={styles.pullQuoteMark} aria-hidden>
              ·
            </span>
            {PRINCIPLE}
          </blockquote>
        </SomosMotionSection>
      </section>

      <section className={`${styles.band} ${styles.bandCream}`} aria-labelledby="somos-problema">
        <SomosMotionSection className={styles.inner}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex} aria-hidden>
              01
            </span>
            <h2 id="somos-problema" className={styles.h2}>
              Qué problema abordamos
            </h2>
          </div>
          <div className={styles.proseM}>
            {PROBLEM_PARAS.map((p, i) => (
              <p key={i} className={styles.para}>
                {p}
              </p>
            ))}
          </div>
        </SomosMotionSection>
      </section>

      <section className={`${styles.band} ${styles.bandMist}`} aria-labelledby="somos-como">
        <SomosMotionSection className={styles.inner}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex} aria-hidden>
              02
            </span>
            <h2 id="somos-como" className={styles.h2}>
              Cómo trabajamos
            </h2>
          </div>
          <ol className={styles.timeline}>
            {HOW_WE_WORK.map((item, i) => (
              <li key={item.title} className={styles.timelineItem}>
                <span className={styles.timelineNum} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={styles.timelineBody}>
                  <h3 className={styles.h3}>{item.title}</h3>
                  <p className={styles.para}>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </SomosMotionSection>
      </section>

      <section className={`${styles.band} ${styles.bandCream}`} aria-labelledby="somos-juntos">
        <SomosMotionSection className={styles.inner}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex} aria-hidden>
              03
            </span>
            <h2 id="somos-juntos" className={styles.h2}>
              Qué podemos hacer juntos
            </h2>
          </div>
          <ul className={styles.cardGrid}>
            {TOGETHER.map((item) => (
              <li key={item.title} className={styles.softCard}>
                <h3 className={styles.h3}>{item.title}</h3>
                <p className={styles.para}>{item.body}</p>
              </li>
            ))}
          </ul>
        </SomosMotionSection>
      </section>

      <section className={`${styles.band} ${styles.bandPaper}`} aria-labelledby="somos-con">
        <SomosMotionSection className={styles.inner}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndexLight} aria-hidden>
              04
            </span>
            <h2 id="somos-con" className={styles.h2}>
              Con quiénes trabajamos
            </h2>
          </div>
          <p className={styles.prologue}>Podemos colaborar con:</p>
          <ul className={styles.pillList}>
            {PARTNERS.map((label) => (
              <li key={label}>
                <span className={styles.pill}>{label}</span>
              </li>
            ))}
          </ul>
        </SomosMotionSection>
      </section>

      <section className={`${styles.band} ${styles.bandCream}`} aria-labelledby="somos-instalado">
        <SomosMotionSection className={styles.inner}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex} aria-hidden>
              05
            </span>
            <h2 id="somos-instalado" className={styles.h2}>
              Lo que buscamos dejar instalado
            </h2>
          </div>
          <p className={styles.prologue}>
            Nuestro objetivo no es solo ejecutar actividades. Buscamos que cada organización con la que trabajamos pueda
            quedar con:
          </p>
          <ul className={styles.outcomeList}>
            {OUTCOMES.map((line) => (
              <li key={line} className={styles.outcomeItem}>
                <span className={styles.outcomeDot} aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </SomosMotionSection>
      </section>

      <section className={`${styles.band} ${styles.bandAccent}`} aria-labelledby="somos-enfoque">
        <SomosMotionSection className={styles.innerNarrow}>
          <h2 id="somos-enfoque" className={styles.h2Accent}>
            Nuestro enfoque de colaboración
          </h2>
          <div className={styles.proseOnAccent}>
            {COLLAB_PARAS.map((p, i) => (
              <p key={i} className={styles.paraOnAccent}>
                {p}
              </p>
            ))}
          </div>
        </SomosMotionSection>
      </section>

      <section className={`${styles.band} ${styles.bandCream}`} aria-labelledby="somos-porque">
        <SomosMotionSection className={styles.inner}>
          <div className={styles.sectionHead}>
            <span className={styles.sectionIndex} aria-hidden>
              06
            </span>
            <h2 id="somos-porque" className={styles.h2}>
              Por qué trabajar con Precisar
            </h2>
          </div>
          <p className={styles.prologue}>Porque combinamos cuatro capacidades que no suelen aparecer juntas:</p>
          <ul className={styles.fourGrid}>
            {WHY_FOUR.map((line, i) => (
              <li key={line} className={styles.fourCell}>
                <span className={styles.fourNum} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className={styles.para}>{line}</p>
              </li>
            ))}
          </ul>
        </SomosMotionSection>
      </section>

      <section className={`${styles.band} ${styles.bandCream}`} aria-labelledby="somos-hablemos">
        <SomosMotionSection className={styles.ctaInner}>
          <h2 id="somos-hablemos" className={styles.ctaTitle}>
            Hablemos
          </h2>
          <div className={styles.ctaCol}>
            <p className={styles.ctaBody}>
              Si tu organización quiere desarrollar herramientas, metodologías o experiencias para fortalecer la
              relación de las personas con la información y promover un uso más consciente, útil y constructivo de la
              tecnología, nos interesa conversar.
            </p>
            <FooterContactLink className={styles.ctaBtn}>Escríbenos</FooterContactLink>
          </div>
        </SomosMotionSection>
      </section>
    </article>
  );
}
