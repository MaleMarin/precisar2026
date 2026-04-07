import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import shell from "@/components/programs/ProgramShell.module.css";
import { AprenderModulosTabs } from "./AprenderModulosTabs";
import styles from "./AprenderDigitalPage.module.css";

export const metadata: Metadata = {
  title: "Aprender Digital: Nunca es Tarde",
  description:
    "Programa para personas adultas y mayores: habilidades digitales, educación mediática, bienestar y autonomía en línea.",
};

const PILARES = [
  {
    num: "01",
    title: "Educación Mediática Digital",
    desc: "Enseñamos a identificar la desinformación, reconocer sesgos y desarrollar pensamiento crítico para navegar el mundo digital de forma informada. Podrás discernir la veracidad de la información y protegerte de contenidos engañosos.",
  },
  {
    num: "02",
    title: "Navegación Segura",
    desc: "Aprenderás a identificar y evitar fraudes en línea, proteger tus datos personales y gestionar tu privacidad en redes y aplicaciones, asegurando una experiencia digital tranquila y sin riesgos.",
  },
  {
    num: "03",
    title: "Inteligencia Artificial",
    desc: "Exploraremos cómo la IA está transformando nuestra vida diaria y el futuro. Descubriremos sus aplicaciones prácticas y cómo interactuar con ella de forma consciente y crítica.",
  },
  {
    num: "04",
    title: "Bienestar Digital",
    desc: "Encontrarás un equilibrio saludable entre el tiempo en línea y tus actividades presenciales, utilizando las herramientas digitales para enriquecer tu vida y fortalecer tus vínculos sociales.",
  },
] as const;

const IMPACTO = [
  {
    title: "Mayor Autonomía",
    desc: "Facilita trámites y comunicaciones, brindando independencia digital.",
  },
  {
    title: "Reducción del Aislamiento",
    desc: "Fortalece lazos sociales y digitales con familiares y amigos.",
  },
  {
    title: "Acceso Ágil a Información",
    desc: "Información y servicios locales al alcance de la mano.",
  },
  {
    title: "Empoderamiento Cívico",
    desc: "Participación activa en iniciativas vecinales y plataformas ciudadanas.",
  },
] as const;

const METODOLOGIA = [
  {
    num: "01",
    title: "Sesiones Híbridas",
    desc: "Clases presenciales y virtuales con apoyo individualizado para cada participante.",
  },
  {
    num: "02",
    title: "Aprendizaje Colaborativo y Co-creación",
    desc: "Los participantes se apoyan mutuamente y co-crean materiales que enriquecen el taller.",
  },
  {
    num: "03",
    title: "Acompañamiento Continuo",
    desc: "Línea de ayuda y encuentros mensuales de repaso para resolver dudas cuando las necesitas.",
  },
  {
    num: "04",
    title: "Materiales Accesibles",
    desc: "Guías impresas y videos paso a paso para repasar a tu propio ritmo.",
  },
] as const;

export default function AprenderDigitalPage() {
  return (
    <article className={shell.page} data-program="aprender">
      <header className={shell.hero}>
        <div className={shell.heroInner}>
          <p className={`${shell.heroEyebrow} ${styles.heroEyebrowTight}`}>
            ■ APRENDER DIGITAL · PROGRAMA 03
          </p>
          <h1 className={`${styles.heroTitle} ${styles.heroTitleBlock}`}>
            Aprender Digital:
            <br />
            Nunca es Tarde.
          </h1>
          <p className={styles.heroSubTight}>
            Un espacio seguro, cercano y amigable para personas adultas y mayores.
          </p>
        </div>
        <aside className={shell.heroStat} aria-hidden="true">
          <p className={styles.heroStatBig}>96,5%</p>
          <p className={shell.heroStatLabel}>de hogares conectados en Chile</p>
        </aside>
      </header>

      <section className={`${shell.queEs} ${shell.padSection}`} aria-labelledby="aprender-que-es-heading">
        <div className={shell.inner}>
          <div className={shell.queEsGrid}>
            <div>
              <h2 id="aprender-que-es-heading" className={shell.visuallyHidden}>
                Qué es el programa
              </h2>
              <p className={shell.statWord}>Nunca</p>
              <p className={styles.statSubLg}>es tarde para aprender.</p>
            </div>
            <div>
              <p className={shell.bodyText}>
                Aprender Digital Nunca es Tarde es un espacio seguro, cercano y amigable donde personas
                adultas y mayores desarrollan confianza, adquieren habilidades digitales y mediáticas
                útiles, y disfrutan conectarse con su entorno, su comunidad y sus seres queridos.
              </p>
              <p className={shell.bodyText}>
                Aunque en Chile el 96,5% de la población cuenta con algún tipo de conectividad, esa
                cobertura no se traduce automáticamente en capacidades de navegación segura y autónoma
                en el entorno digital.
              </p>
              <p className={shell.bodyText}>
                Vivimos un momento histórico marcado por avances tecnológicos que amplían las
                posibilidades de producción y difusión de información, pero también generan un
                ecosistema saturado por la prisa, el inmediatismo y la dificultad para establecer
                relaciones profundas.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${shell.sectionDark} ${shell.padSection}`}
        aria-labelledby="aprender-por-que-heading"
      >
        <div className={shell.inner}>
          <h2 id="aprender-por-que-heading" className={styles.porQueLead}>
            Reconocer el acceso a estas herramientas como un derecho no basta: es imprescindible
            incorporarlas en la educación y abrir espacios de debate más allá de las aulas.
          </h2>
          <div className={styles.porQueGrid}>
            <div className={styles.porQueCol}>
              <h3 className={styles.porQueColTitle}>Brecha digital</h3>
              <p className={styles.porQueColText}>
                La brecha amplifica vulnerabilidades en personas adultas y mayores, limitando su acceso
                al mercado laboral, a información confiable, a servicios básicos y a otros derechos
                fundamentales.
              </p>
            </div>
            <div className={styles.porQueCol}>
              <h3 className={styles.porQueColTitle}>Políticas necesarias</h3>
              <p className={styles.porQueColText}>
                Resulta imperativo diseñar políticas sólidas, destinar recursos adecuados y fomentar
                alianzas con empresas y organizaciones de diversos sectores.
              </p>
            </div>
            <div className={styles.porQueCol}>
              <h3 className={styles.porQueColTitle}>Democratización</h3>
              <p className={styles.porQueColText}>
                Solo así podremos garantizar que personas de todas las edades desarrollen autonomía y
                pensamiento crítico, tanto en entornos en línea como fuera de línea.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={`${shell.sectionCream} ${shell.padSection}`}
        aria-labelledby="aprender-pilares-heading"
      >
        <div className={shell.inner}>
          <h2 id="aprender-pilares-heading" className={styles.creamTitle}>
            Lo que enseñamos
          </h2>
          <div className={styles.cardGrid}>
            {PILARES.map((p) => (
              <div key={p.num} className={styles.whiteCard}>
                <p className={styles.cardNum}>{p.num}</p>
                <h3 className={styles.cardTitle}>{p.title}</h3>
                <p className={styles.cardDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${shell.sectionDark} ${shell.padSection}`}
        aria-labelledby="aprender-impacto-heading"
      >
        <div className={shell.inner}>
          <h2 id="aprender-impacto-heading" className={styles.modulosTitle}>
            Impacto en la comunidad
          </h2>
          <p className={styles.impactoSub}>
            Más allá de las habilidades individuales, un programa que fortalece a todos.
          </p>
          <div className={styles.impactoGrid}>
            {IMPACTO.map((item) => (
              <div key={item.title} className={styles.impactoCard}>
                <div className={styles.impactoMark} aria-hidden="true">
                  ■
                </div>
                <h3 className={styles.impactoCardTitle}>{item.title}</h3>
                <p className={styles.impactoCardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${shell.sectionCream} ${shell.padSection}`}
        aria-labelledby="aprender-metodologia-heading"
      >
        <div className={shell.inner}>
          <h2 id="aprender-metodologia-heading" className={styles.creamTitle}>
            Nuestra metodología
          </h2>
          <div className={styles.cardGrid}>
            {METODOLOGIA.map((m) => (
              <div key={m.num} className={styles.whiteCard}>
                <p className={styles.cardNum}>{m.num}</p>
                <h3 className={styles.cardTitle}>{m.title}</h3>
                <p className={styles.cardDesc}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`${shell.sectionDark} ${shell.padSection}`}
        aria-labelledby="aprender-modulos-heading"
      >
        <div className={shell.inner}>
          <h2 id="aprender-modulos-heading" className={styles.modulosTitle}>
            Módulos formativos
          </h2>
          <p className={styles.modulosSub}>
            Un camino estructurado para tu aprendizaje digital, paso a paso.
          </p>
          <AprenderModulosTabs />
        </div>
      </section>

      <section className={shell.cta} aria-labelledby="aprender-cta-heading">
        <div className={`${shell.ctaInner} ${shell.ctaInnerCiudades}`}>
          <h2 id="aprender-cta-heading" className={styles.ctaTitleTight}>
            Lleva este programa a tu institución o municipio.
          </h2>
          <div>
            <p className={shell.ctaText}>
              Diseñamos el programa a medida de tu comunidad, tu espacio y tus participantes.
            </p>
            <Link href="/participa" className={shell.ctaBtn}>
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <nav className={shell.continua} aria-label="Otras iniciativas de programas">
        <div className={shell.inner}>
          <p className={`${shell.continuaEyebrow} ${styles.continuaEyebrowTight}`}>CONTINÚA</p>
          <div className={shell.continuaLinks}>
            <Link href="/programas" className={shell.continuaLink}>
              Índice de programas →
            </Link>
            <Link href="/programas/ciudades" className={shell.continuaLink}>
              Ciudades Conectadas con Sentido →
            </Link>
            <Link href="/programas/hub-digital-consciente" className={shell.continuaLink}>
              Hub Digital Consciente →
            </Link>
            <Link href="/programas/docentes" className={shell.continuaLink}>
              Alfabetización Mediática para Docentes →
            </Link>
            <Link href="/programas/funcionarios-publicos" className={shell.continuaLink}>
              Educación Mediática para Funcionarios Públicos →
            </Link>
            <Link href="/programas/pensamiento-critico" className={shell.continuaLink}>
              Formación en Pensamiento Crítico Digital →
            </Link>
            <Link href="/programas/leer-noticias-era-digital" className={shell.continuaLink}>
              Curso Leer Noticias en la Era Digital →
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}
