import type { Metadata } from "next";
import { FooterContactLink } from "@/components/FooterContactLink";
import { Link } from "@/i18n/navigation";
import shell from "@/components/programs/ProgramShell.module.css";
import styles from "../pensamiento-critico/PensamientoCriticoPage.module.css";

export const metadata: Metadata = {
  title: "Educación mediática para que los docentes la usen dentro de la sala de aula",
  description:
    "Educación mediática y alfabetización informacional orientadas al aula: verificación, algoritmos e IA, con modalidades online y presencial.",
};

const TALLER1_MODULOS = [
  {
    num: "01",
    title: "¿Por qué las noticias falsas son tan atractivas?",
    desc: "Los titulares impactantes o que provocan enojo están diseñados para que los compartamos sin pensar. Entender esto es el primer paso para no caer en la trampa.",
  },
  {
    num: "02",
    title: "El método de los 3 pasos: Pausa, Pregunta y Compara",
    desc: "Pausa: No compartir de inmediato. Pregunta: ¿Quién dice esto? ¿Por qué? Compara: ¿Algún medio serio informa lo mismo?",
  },
  {
    num: "03",
    title: "Herramientas fáciles al alcance de tu mano",
    desc: "Taller práctico donde aprenderás a usar la búsqueda inversa de imágenes de Google en tu propio celular.",
  },
  {
    num: "04",
    title: "¿Y ahora qué hago?",
    desc: "Plan de acción personal para consumir información de manera más saludable y consejos para actuar cuando alguien comparte algo falso.",
  },
] as const;

const TALLER2_MODULOS = [
  {
    num: "01",
    title: "El chef secreto de tu internet: ¿Qué es un algoritmo?",
    desc: "Ejemplos cotidianos como una receta de cocina para explicar qué es un algoritmo y cómo lo usan Spotify, Netflix, Facebook e Instagram.",
  },
  {
    num: "02",
    title: "Un mundo hecho para ti: La personalización y la burbuja",
    desc: "Cómo las plataformas aprenden de tus gustos para crear un perfil sobre ti y el fenómeno de la burbuja de filtros.",
  },
  {
    num: "03",
    title: "La llegada de la Inteligencia Artificial",
    desc: "Qué es la IA, cómo puede generar imágenes, textos y voces que parecen reales, y para qué se usa de forma positiva y cuáles son sus riesgos.",
  },
  {
    num: "04",
    title: "¿Cómo navegar en un mundo con IA?",
    desc: "Consejos prácticos para moverte en este nuevo escenario y valorar las fuentes de información confiables.",
  },
] as const;

const BENEFICIOS = [
  {
    num: "01",
    title: "Mejora en la Toma de Decisiones y Eficiencia",
    desc: "Al dotar a tus equipos de herramientas para identificar, analizar y verificar información, mejoras su capacidad para tomar decisiones acertadas y optimizar su tiempo.",
  },
  {
    num: "02",
    title: "Mitigación de Riesgos y Protección de la Reputación",
    desc: "Capacitar en la detección de desinformación disminuye el riesgo de que la organización actúe basándose en datos falsos, previniendo crisis y protegiendo la reputación.",
  },
  {
    num: "03",
    title: "Fortalecimiento de la Cultura Interna",
    desc: "Los cursos promueven un ambiente basado en el análisis de datos, el pensamiento crítico y el diálogo constructivo, reduciendo la polarización y mejorando la colaboración.",
  },
  {
    num: "04",
    title: "Impacto Social",
    desc: "Al dominar el pensamiento crítico, tus colaboradores se convierten en agentes de apoyo en sus comunidades y familias, contribuyendo a una sociedad mejor informada.",
  },
] as const;

export default function Page() {
  return (
    <article className={shell.page} data-program="leer-noticias">
      <header className={shell.hero} aria-labelledby="ln-hero-title">
        <div className={shell.heroInner}>
          <p className={`${shell.heroEyebrow} ${styles.heroEyebrowTight}`}>
            ■ EDUCACIÓN MEDIÁTICA EN EL AULA · PROGRAMA 07
          </p>
          <h1 id="ln-hero-title" className={`${styles.heroTitle} ${styles.heroTitleBlock}`}>
            Consumidores críticos frente a la información y la IA.
          </h1>
          <p className={styles.heroSubTight}>
            Verificación práctica, algoritmos y herramientas para equipos y comunidades.
          </p>
        </div>
      </header>

      <section className={`${shell.queEs} ${shell.padSection}`} aria-labelledby="ln-que-es">
        <div className={shell.inner}>
          <div className={shell.queEsGrid}>
            <div>
              <p className={shell.statWord}>Crítico.</p>
              <p className={styles.statSubLg}>Competente. Informado.</p>
            </div>
            <div>
              <p id="ln-que-es" className={shell.bodyText}>
                Para enfrentar este desafío, se han creado cursos diseñados para transformar a los participantes
                en consumidores críticos y competentes, entregándoles las herramientas necesarias para
                identificar, analizar y verificar la información que encuentran en el ecosistema digital actual.
              </p>
              <p className={shell.bodyText}>
                Entendemos que cada persona tiene necesidades distintas, por eso ofrecemos dos formas de tomar
                los cursos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${shell.sectionDark} ${shell.padSection}`} aria-labelledby="ln-modalidades">
        <div className={shell.inner}>
          <h2 id="ln-modalidades" className={styles.modalidadesTitle}>
            Flexibilidad para aprender
          </h2>
          <div className={styles.modalRow}>
            <article className={styles.modalCard}>
              <p className={styles.modalNum}>01</p>
              <h3 className={styles.modalCardTitle}>Modalidad Online</h3>
              <p className={styles.modalCardText}>
                Un facilitador una vez por semana. Cada sesión de 90 minutos con actividades prácticas con los
                participantes.
              </p>
            </article>
            <article className={styles.modalCard}>
              <p className={styles.modalNum}>02</p>
              <h3 className={styles.modalCardTitle}>Modalidad Presencial</h3>
              <p className={styles.modalCardText}>
                Talleres vivenciales en grupos reducidos, máximo 15 personas, con ejercicios prácticos,
                dinámicas grupales y materiales impresos.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="ln-taller1-title">
        <div className={shell.inner}>
          <p className={styles.workshopEyebrow}>■ TALLER 01</p>
          <h2 id="ln-taller1-title" className={styles.workshopTitle}>
            Entendiendo las Noticias y Verificación de Hechos
          </h2>
          <p className={styles.workshopKicker}>
            ¡Que no te engañen! Aprende a verificar lo que lees en internet.
          </p>

          <div className={styles.workshopGrid}>
            <div>
              <p className={styles.workBody}>
                ¿Recibes cadenas en WhatsApp o ves noticias en Facebook y dudas si son ciertas? Este taller es
                una guía de herramientas y consejos prácticos para que aprendas a diferenciar la información
                real de la falsa en pocos minutos. El objetivo es que te sientas más seguro al navegar por
                internet y que tengas la confianza para saber qué creer y qué descartar.
              </p>
              <p className={styles.workBody}>
                Dirigido a cualquier persona que use redes sociales y quiera aprender a protegerse de los
                engaños y la desinformación. No necesitas saber nada de tecnología, solo tener curiosidad.
              </p>
              <p className={styles.outcomesLead}>Al finalizar serás capaz de:</p>
              <ul className={styles.bulletList}>
                <li>Aplicar una lista de chequeo de 3 pasos para evaluar cualquier noticia.</li>
                <li>Reconocer las señales de alerta más comunes en una noticia falsa.</li>
                <li>Usar herramientas gratuitas para saber si una foto es real o si es antigua.</li>
                <li>Conversar con calma con amigos o familiares que comparten información falsa.</li>
              </ul>
            </div>
            <div>
              <div className={styles.moduleStack}>
                {TALLER1_MODULOS.map((m) => (
                  <article key={m.num} className={styles.modCardLight}>
                    <p className={styles.modNum}>{m.num}</p>
                    <h3 className={styles.modTitle}>{m.title}</h3>
                    <p className={styles.modDesc}>{m.desc}</p>
                  </article>
                ))}
              </div>
              <div className={styles.pills}>
                <span className={styles.pillOrange}>Medio día · 4 horas</span>
                <span className={styles.pillOrange}>Día completo · 7 horas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${shell.sectionDark} ${shell.padSection}`} aria-labelledby="ln-taller2-title">
        <div className={shell.inner}>
          <p className={styles.workshopEyebrow}>■ TALLER 02</p>
          <h2 id="ln-taller2-title" className={`${styles.workshopTitle} ${styles.workshopTitleLight}`}>
            Alfabetización Mediática y Digital en la Era de la IA
          </h2>
          <p className={`${styles.workshopKicker} ${styles.workshopKickerMuted}`}>
            Entendiendo el Mundo Digital: Cómo la IA y los Algoritmos deciden lo que ves.
          </p>

          <div className={styles.workshopGrid}>
            <div>
              <p className={`${styles.workBody} ${styles.workBodyLight}`}>
                ¿Sientes que Instagram te lee la mente o que YouTube siempre sabe qué video recomendarte? No es
                magia, son algoritmos e inteligencia artificial. En este taller vamos a abrir el capó de
                internet para que entiendas de forma simple cómo estas tecnologías organizan el contenido que
                consumes cada día y cómo esto impacta tu visión del mundo.
              </p>
              <p className={`${styles.workBody} ${styles.workBodyLight}`}>
                Dirigido a todas las personas curiosas por saber cómo funcionan las redes sociales por dentro y
                el impacto que la tecnología tiene en nuestras vidas.
              </p>
              <p className={`${styles.outcomesLead} ${styles.outcomesLeadLight}`}>Al finalizar serás capaz de:</p>
              <ul className={`${styles.bulletList} ${styles.bulletListLight}`}>
                <li>Explicar con un ejemplo simple qué es un algoritmo.</li>
                <li>Entender cómo las plataformas personalizan el contenido que te muestran.</li>
                <li>Reconocer el efecto de la burbuja de filtros en tu día a día.</li>
                <li>Identificar las nuevas formas en que la IA se usa para crear contenido real y falso.</li>
              </ul>
            </div>
            <div>
              <div className={styles.moduleStack}>
                {TALLER2_MODULOS.map((m) => (
                  <article key={m.num} className={styles.modCardDark}>
                    <p className={styles.modNum}>{m.num}</p>
                    <h3 className={`${styles.modTitle} ${styles.modTitleLight}`}>{m.title}</h3>
                    <p className={`${styles.modDesc} ${styles.modDescLight}`}>{m.desc}</p>
                  </article>
                ))}
              </div>
              <div className={styles.pills}>
                <span className={styles.pillLight}>Medio día · 4 horas</span>
                <span className={styles.pillLight}>Día completo · 7 horas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="ln-beneficios">
        <div className={shell.inner}>
          <h2 id="ln-beneficios" className={styles.beneficiosTitle}>
            Beneficios para tu organización
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

      <section className={shell.cta} aria-labelledby="ln-cta-title">
        <div className={`${shell.ctaInner} ${shell.ctaInnerCiudades}`}>
          <div>
            <h2 id="ln-cta-title" className={styles.ctaTitleTight}>
              Adapta el programa a las necesidades específicas de tu institución.
            </h2>
            <ul className={styles.ctaStepsPlain}>
              <li>01 Solicita una propuesta detallada.</li>
              <li>02 Coordinamos una presentación.</li>
              <li>03 Co-creamos el programa a tu medida.</li>
            </ul>
          </div>
          <div>
            <p className={shell.ctaText}>
              Consideramos esta capacitación una oportunidad estratégica en el capital humano y la resiliencia
              de tu organización.
            </p>
            <FooterContactLink className={shell.ctaBtn}>Contacto</FooterContactLink>
          </div>
        </div>
      </section>

      <nav className={shell.continua} aria-label="Otras iniciativas de programas">
        <div className={shell.inner}>
          <p className={`${shell.continuaEyebrow} ${styles.continuaEyebrowTight}`}>CONTINÚA</p>
          <div className={shell.continuaLinks}>
            <Link className={shell.continuaLink} href="/programas">
              Índice de programas →
            </Link>
            <Link className={shell.continuaLink} href="/programas/ciudades">
              Ciudades Conectadas con Sentido →
            </Link>
            <Link className={shell.continuaLink} href="/programas/pensamiento-critico">
              Pensamiento Crítico Digital →
            </Link>
            <Link className={shell.continuaLink} href="/programas/hub-digital-consciente">
              Hub Digital Consciente →
            </Link>
            <Link className={shell.continuaLink} href="/programas/funcionarios-publicos">
              Educación Mediática para Funcionarios Públicos →
            </Link>
            <Link className={shell.continuaLink} href="/programas/aprender-digital">
              Aprender Digital: Nunca es Tarde →
            </Link>
            <Link className={shell.continuaLink} href="/saberes">
              Biblioteca Saberes →
            </Link>
          </div>
        </div>
      </nav>
    </article>
  );
}
