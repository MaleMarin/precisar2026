"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ARTICLES } from "@/data/articles";
import { EXTERNAL, NAV_PRIMARY, SITE } from "@/lib/site";
import { CinematicWorkRail, type CinematicWorkItem } from "./CinematicWorkRail";
import { FAQAccordion, type FAQItem } from "./FAQAccordion";
import { MultiStepForm } from "./MultiStepForm";
import { NavOverlay } from "./NavOverlay";
import styles from "./PrecisarStudioHome.module.css";
import { ScrollReveal } from "./ScrollReveal";

const WORK_ITEMS: CinematicWorkItem[] = [
  {
    id: "ciudades",
    title: "Ciudades conectadas con sentido",
    tags: ["Territorio", "Participación", "AMI"],
    href: "/programas/ciudades",
  },
  {
    id: "hub",
    title: "Hub digital consciente",
    tags: ["Experiencia", "Cultura digital"],
    href: "/programas/hub-digital-consciente",
  },
  {
    id: "docentes",
    title: "Educación mediática para docentes",
    tags: ["Aula", "Evaluación crítica"],
    href: "/programas/docentes",
  },
  {
    id: "aprender",
    title: "Aprender digital: nunca es tarde",
    tags: ["Mayores", "Dispositivos"],
    href: "/programas/aprender-digital",
  },
  {
    id: "noticias",
    title: "Educación mediática para la sala de aula",
    tags: ["Curso", "Verificación"],
    href: "/programas/leer-noticias-era-digital",
  },
  {
    id: "publicos",
    title: "Competencias para servidores públicos",
    tags: ["Sector público", "Ética digital"],
    href: "/programas/funcionarios-publicos",
  },
];

const FAQ_ITEMS: FAQItem[] = [
  {
    pregunta: "¿Qué es la educación mediática en el enfoque de Precisar?",
    respuesta:
      "Es aprender a acceder, analizar, crear y participar con información de forma crítica y ética: entender cómo circula lo que vemos, qué intereses hay detrás y cómo participar sin reproducir daño.",
  },
  {
    pregunta: "¿Trabajan solo en Chile?",
    respuesta:
      "Nuestra base es Chile, pero compartimos metodologías y aprendizajes en redes internacionales de alfabetización mediática e información (AMI).",
  },
  {
    pregunta: "¿Cómo puedo traer un programa a mi municipio o escuela?",
    respuesta:
      "Escríbenos indicando territorio, tipo de institución y necesidad (por ejemplo ciudades AMI, docentes o hub). Te respondemos con opciones de formato y tiempos.",
  },
  {
    pregunta: "¿Precisar vende software o solo formación?",
    respuesta:
      "Nos enfocamos en cultura digital, formación y acompañamiento. Herramientas como el Bot ONDA son medios para conversar y practicar, no un producto cerrado “off the shelf”.",
  },
  {
    pregunta: "¿Dónde están los recursos descargables?",
    respuesta:
      "En la sección Saberes hay guías, actividades e infografías. También puedes seguir la editorial Precisando para artículos y análisis.",
  },
];

const FORM_CATEGORIES = [
  "Programas territoriales / ciudades",
  "Formación docente",
  "Hub y cultura digital",
  "Cursos abiertos",
  "Consulta o alianza",
  "Prensa / medios",
];

export type PrecisarStudioHomeProps = {
  children: ReactNode;
};

export function PrecisarStudioHome({ children }: PrecisarStudioHomeProps) {
  const featured = ARTICLES.slice(0, 4);

  return (
    <div className={styles.page}>
      <Link href="/" className={styles.logoMark}>
        {SITE.name}
      </Link>

      <NavOverlay
        links={NAV_PRIMARY.map((n) => ({ href: n.href, label: n.label }))}
        mobileSrc="/studio/menu-bg.svg"
        contactLinks={[
          { label: SITE.contactEmail, href: `mailto:${SITE.contactEmail}` },
          { label: "Instagram", href: EXTERNAL.instagram, external: true },
          { label: "YouTube", href: EXTERNAL.youtube, external: true },
          { label: "Bot ONDA", href: EXTERNAL.botOnda, external: true },
        ]}
      />

      {children}

      <div id="precisar-main" className={styles.mainBelowHero}>
        <section className={styles.section} id="trabajo">
          <div className={styles.inner}>
            <ScrollReveal>
              <p className={styles.kicker}>Iniciativas</p>
              <h2 className={styles.display}>Programas</h2>
              <p className={styles.lead}>
                Líneas de trabajo a escala territorial, escolar y ciudadana — pensadas para el
                criterio, no para el ruido.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <CinematicWorkRail items={WORK_ITEMS} />
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <Link href="/programas" className={styles.textLink}>
                Índice completo
              </Link>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal>
              <p className={styles.kicker}>Capacidades</p>
              <h2 className={styles.display}>Qué hacemos</h2>
              <p className={styles.lead}>
                Investigación, diseño pedagógico y presencia en terreno. Una sola voz de acento en
                interfaz: el color que ves en etiquetas y hovers.
              </p>
            </ScrollReveal>
            <ScrollReveal>
              <div className={styles.stack}>
                <div className={styles.stackBlock}>
                  <h3 className={styles.stackTitle}>Programas</h3>
                  <p className={styles.stackLead}>Municipios, escuelas y organizaciones.</p>
                  <ul className={styles.stackList}>
                    <li>Ciudades conectadas con sentido (marco AMI)</li>
                    <li>Hub digital consciente</li>
                    <li>Cursos focalizados (noticias, sector público, mayores)</li>
                  </ul>
                </div>
                <div className={styles.stackBlock}>
                  <h3 className={styles.stackTitle}>Recursos</h3>
                  <p className={styles.stackLead}>Materiales abiertos y editorial.</p>
                  <ul className={styles.stackList}>
                    <li>Biblioteca Saberes</li>
                    <li>Precisando</li>
                    <li>Bot ONDA</li>
                  </ul>
                </div>
                <div className={styles.stackBlock}>
                  <h3 className={styles.stackTitle}>Marco</h3>
                  <p className={styles.stackLead}>Cuatro dimensiones para leer lo digital.</p>
                  <ul className={styles.stackList}>
                    <li>Comunicación, educación, tecnología, cultura</li>
                    <li>Sesgos, algoritmos, participación</li>
                    <li>IA ética y crítica</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal>
              <p className={styles.kicker}>Contexto</p>
              <h2 className={styles.display}>Chile</h2>
              <p className={styles.lead}>
                La brecha ya no es solo conectividad: es comprensión. Lo que falta es leer el
                entorno mediático con herramientas compartidas.
              </p>
              <p className={styles.pull}>
                De la conexión a la comprensión — educación mediática y cultura digital.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal>
              <p className={styles.kicker}>Editorial</p>
              <h2 className={styles.display}>Precisando</h2>
              <p className={styles.lead}>
                Cómo llega la información, qué la moldea, qué efectos tiene en lo colectivo.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.06}>
              <ul className={styles.precisandoList}>
                {featured.map((a) => (
                  <li key={a.slug}>
                    <Link href={`/precisando/${encodeURI(a.slug)}`}>
                      {a.title}
                      <span className={styles.precisandoMeta}>{a.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/precisando" className={styles.textLink}>
                Ver todo
              </Link>
            </ScrollReveal>
          </div>
        </section>

        <section className={styles.section} id="formulario-portada">
          <div className={styles.inner}>
            <ScrollReveal>
              <p className={styles.kicker}>Contacto</p>
              <h2 className={styles.display}>Escribir</h2>
              <p className={styles.lead}>
                Formulario local: no envía a terceros hasta que conectes endpoint o acción propia.
              </p>
            </ScrollReveal>
            <div className={styles.formWrap}>
              <MultiStepForm categories={FORM_CATEGORIES} />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <ScrollReveal>
              <h2 className={styles.faqTitle}>FAQ</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <FAQAccordion items={FAQ_ITEMS} />
            </ScrollReveal>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div>
              <p className={styles.footerBrand}>{SITE.name}</p>
              <p className={styles.footerTag}>{SITE.tagline}</p>
            </div>
            <nav className={styles.footerNav} aria-label="Pie">
              <Link href="/programas">Programas</Link>
              <Link href="/saberes">Saberes</Link>
              <Link href="/participa">Participa</Link>
              <a href={EXTERNAL.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}
