import Link from "next/link";
import { HomeFlowLink } from "@/components/home/HomeFlowLink";
import { PrecisarHeroLegacy } from "@/components/legacy/PrecisarHeroLegacy";
import { MotionSection } from "@/components/MotionSection";
import { MotionParallaxBg } from "@/components/motion/MotionParallaxBg";
import { MotionStagger } from "@/components/motion/MotionStagger";
import { ARTICLES } from "@/data/articles";
import { EXTERNAL, PDFS } from "@/lib/site";

export default function HomePage() {
  const featured = ARTICLES.slice(0, 6);

  return (
    <>
      <PrecisarHeroLegacy />

      <div id="precisar-main" className="scroll-mt-24">
        {/* 01 — Propuesta: mucho vacío + tipografía dominante */}
        <MotionSection className="prec-section-y">
          <div className="prec-container">
            <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-6">
              <div className="relative lg:col-span-4">
                <span className="prec-home-num absolute -left-1 -top-8 select-none opacity-[0.14] lg:-left-2 lg:-top-10">
                  01
                </span>
                <p className="prec-kicker prec-kicker--accent relative">Qué nos convoca</p>
              </div>
              <div className="lg:col-span-8 lg:pl-4">
                <h2 className="prec-title-xl max-w-[16ch] text-[clamp(2rem,5vw,3.25rem)] leading-[1.02] tracking-[-0.04em]">
                  Menos ruido, más criterio
                </h2>
                <p className="mt-10 max-w-xl text-[1.125rem] leading-[1.75] text-[var(--muted)] md:text-xl md:leading-relaxed">
                  En el mundo de hoy cada día se crean 463 exabytes de datos. Para leerlos todos
                  necesitaríamos 26 millones de años. Los algoritmos deciden qué vemos, qué leemos,
                  qué creemos. Entender cómo funcionan estos filtros ya no es opcional.
                </p>
              </div>
            </div>
          </div>
        </MotionSection>

        {/* 02 — Chile: banda oscura, contraste máximo */}
        <MotionSection className="prec-home-band-ink py-[var(--home-gap)]">
          <MotionParallaxBg className="prec-container">
            <div className="grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-10">
              <div className="lg:col-span-4">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-[color-mix(in_oklab,var(--band-ink-fg)_45%,transparent)]">
                  02 · Contexto
                </p>
                <h2 className="prec-title-xl mt-5 text-[clamp(1.75rem,4vw,2.5rem)] leading-tight tracking-[-0.03em] text-[var(--band-ink-fg)]">
                  La oportunidad en Chile
                </h2>
              </div>
              <div className="space-y-6 text-lg leading-relaxed text-[color-mix(in_oklab,var(--band-ink-fg)_88%,transparent)] lg:col-span-8 lg:max-w-3xl lg:text-xl lg:leading-relaxed">
                <p>
                  96,5% de los hogares chilenos tiene internet. Pero hay una brecha que importa más:
                  el 53% de las personas no comprende completamente lo que lee y 5 millones de personas
                  necesitan desarrollar habilidades digitales críticas.
                </p>
                <p className="font-[family-name:var(--font-display)] text-2xl font-medium leading-snug tracking-tight text-[var(--band-ink-fg)] md:text-3xl">
                  La conexión ya la tenemos. Lo que falta es el criterio.
                </p>
              </div>
            </div>
          </MotionParallaxBg>
        </MotionSection>

        {/* 03 — IA + propuesta: asimetría, columna estrecha / ancha */}
        <MotionSection className="border-t border-[var(--border)] bg-[var(--surface)] py-[var(--home-gap)]">
          <div className="prec-container">
            <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5 lg:border-r lg:border-[var(--border)] lg:pr-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">03</p>
                <h2 className="prec-title-xl mt-4 text-2xl tracking-tight md:text-3xl">La IA como aliada</h2>
                <p className="mt-8 text-[1.05rem] leading-relaxed text-[var(--muted)] md:text-lg">
                  La inteligencia artificial ya está aquí, filtrando nuestra realidad. Aprender a
                  usarla de manera ética y crítica no es el futuro: es el presente.
                </p>
              </div>
              <div className="lg:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">03 bis</p>
                <h2 className="prec-title-xl mt-4 text-2xl tracking-tight md:text-3xl">Nuestra propuesta</h2>
                <div className="mt-8 space-y-6 text-[1.05rem] leading-relaxed text-[var(--muted)] md:text-lg">
                  <p>
                    En Precisar transformamos el ruido en criterio. Te enseñamos cómo se produce y
                    circula la información, cómo se priorizan los contenidos, cómo detectar sesgos y
                    verificar fuentes.
                  </p>
                  <p>
                    Desarrollamos habilidades para acceder, analizar, crear y participar, mejorando
                    la accesibilidad, la confiabilidad y la distribución de la información, cuando y
                    donde más se necesita.
                  </p>
                  <p className="border-l-2 border-[var(--fg)] pl-5 font-[family-name:var(--font-display)] text-lg font-medium text-[var(--fg)] md:text-xl">
                    De la conexión a la comprensión.
                  </p>
                </div>
              </div>
            </div>
            <HomeFlowLink href="#programas" label="Programas e iniciativas" />
          </div>
        </MotionSection>

        {/* Programas + cursos: un solo tramo con ritmo interno */}
        <MotionSection
          className="border-t border-[var(--border)] py-[var(--home-gap)]"
          id="programas"
        >
          <div className="prec-container">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-8">
              <div>
                <p className="prec-kicker prec-kicker--accent">Qué hacemos</p>
                <h2 className="prec-title-xl mt-3 max-w-[18ch] text-[clamp(1.85rem,4vw,2.75rem)] leading-tight tracking-[-0.035em]">
                  Programas e iniciativas
                </h2>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-[var(--muted)] md:text-right md:text-base">
                Herramientas, contenidos y experiencias formativas que fortalecen el pensamiento
                crítico, la seguridad digital y el compromiso ciudadano.
              </p>
            </div>

            <MotionStagger
              className="mt-14 grid gap-4 md:grid-cols-2 md:gap-5"
              stagger={0.07}
              layoutContents
            >
              <article className="prec-home-tile-feature md:col-span-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--accent)]">
                  Programa
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl font-medium tracking-tight md:text-2xl">
                  Ciudades Conectadas con Sentido
                </h3>
                <p className="mt-5 max-w-3xl text-sm leading-relaxed text-[var(--muted)] md:text-base">
                  Talleres y acompañamiento a instituciones y municipios: diagnósticos participativos,
                  trabajo comunitario y habilidades para información fiable y participación consciente.
                </p>
                <Link href="/programas/ciudades" className="prec-link-arrow mt-8 inline-flex items-center gap-2">
                  Conocer propuesta <span aria-hidden>→</span>
                </Link>
              </article>
              {[
                {
                  title: "Hub Digital Consciente",
                  body:
                    "Experiencias inmersivas de cultura digital para todas las edades: IA, desinformación y privacidad.",
                  href: "/programas/hub-digital-consciente",
                },
                {
                  title: "Aprender Digital: Nunca es Tarde",
                  body:
                    "Programa para personas mayores: dispositivos, seguridad digital y dinámicas sociales.",
                  href: "/programas/aprender-digital",
                },
                {
                  title: "Educación Mediática para Docentes",
                  body:
                    "Talleres, guías de aula y formación práctica para evaluación crítica y participación ética.",
                  href: "/programas/docentes",
                },
              ].map((card) => (
                <article key={card.title} className="prec-home-tile-compact flex flex-col">
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-medium tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">{card.body}</p>
                  <Link href={card.href} className="prec-link-arrow mt-6 inline-flex items-center gap-2">
                    Ver más <span aria-hidden>→</span>
                  </Link>
                </article>
              ))}
            </MotionStagger>

            <div
              className="mt-20 border-t border-[var(--border)] pt-16 md:mt-24 md:pt-20"
              id="cursos"
            >
              <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
                <div className="lg:col-span-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[var(--muted)]">
                    Formación breve
                  </p>
                  <h3 className="prec-title-xl mt-3 text-2xl tracking-tight md:text-3xl">
                    Cursos específicos
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                    Habilidades clave para distintas audiencias, en formatos breves y aplicables.
                  </p>
                </div>
                <MotionStagger
                  className="grid gap-5 lg:col-span-8 lg:grid-cols-2"
                  stagger={0.08}
                  layoutContents
                >
                  <article className="flex flex-col border border-[var(--fg)] bg-[var(--bg)] p-6 md:p-8">
                    <p className="prec-kicker text-[var(--accent)]">Curso</p>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-medium md:text-xl">
                      Leer noticias en la era digital
                    </h3>
                    <p className="mt-4 flex-1 text-sm text-[var(--muted)]">
                      Para quienes quieren identificar noticias falsas, analizar medios y participar con
                      criterio.
                    </p>
                    <Link
                      href="/programas/leer-noticias-era-digital"
                      className="prec-btn prec-btn--primary mt-8 w-fit"
                    >
                      Más información
                    </Link>
                  </article>
                  <article className="flex flex-col border border-[var(--border)] bg-[var(--elevated)] p-6 md:p-8">
                    <p className="prec-kicker text-[var(--muted)]">Curso</p>
                    <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-medium md:text-xl">
                      Servidores públicos
                    </h3>
                    <p className="mt-4 flex-1 text-sm text-[var(--muted)]">
                      Competencias digitales y pensamiento crítico para un uso ético de la tecnología en
                      el sector público.
                    </p>
                    <Link
                      href="/programas/funcionarios-publicos"
                      className="prec-btn prec-btn--ghost mt-8 w-fit"
                    >
                      Más información
                    </Link>
                  </article>
                </MotionStagger>
              </div>
            </div>

            <HomeFlowLink href="/programas" label="Ver índice de programas" kicker="Explorar" />
            <HomeFlowLink href="/saberes" label="Biblioteca Saberes" />
          </div>
        </MotionSection>

        {/* Saberes: estantería curada */}
        <MotionSection className="py-[var(--home-gap)]">
          <div className="prec-container">
            <div className="prec-saberes-shelf grid gap-10 p-8 md:grid-cols-12 md:gap-12 md:p-12">
              <div className="md:col-span-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--accent)]">
                  Biblioteca
                </p>
                <h2 className="prec-title-xl mt-4 text-2xl tracking-tight md:text-3xl">Saberes</h2>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                  <p>Recursos claros para enseñar, aprender y moverse con criterio en lo digital.</p>
                  <p>Guías, actividades e infografías para habilidades críticas y expresivas.</p>
                </div>
                <Link href="/saberes" className="prec-btn prec-btn--primary mt-10 inline-flex">
                  Biblioteca completa
                </Link>
              </div>
              <div className="md:col-span-7">
                <p className="prec-kicker mb-5">Descargas destacadas</p>
                <MotionStagger className="grid gap-2 sm:grid-cols-2" stagger={0.05} layoutContents>
                  {[
                    { href: PDFS.homeSaberes1, label: "Recurso 1" },
                    { href: PDFS.homeSaberes2, label: "Recurso 2" },
                    { href: PDFS.homeSaberes3, label: "Recurso 3" },
                    { href: PDFS.homeSaberes4, label: "Recurso 4" },
                  ].map((pdf, i) => (
                    <a
                      key={pdf.href}
                      href={pdf.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between gap-3 border border-[var(--border)] bg-[var(--bg)] px-4 py-3.5 text-sm font-medium transition-colors duration-300 hover:border-[var(--fg)] md:px-5"
                    >
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-[10px] text-[var(--muted-2)] tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {pdf.label}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted)] transition-colors group-hover:text-[var(--accent)]">
                        PDF
                      </span>
                    </a>
                  ))}
                </MotionStagger>
              </div>
            </div>
            <HomeFlowLink href="/precisando" label="Precisando · editorial" />
          </div>
        </MotionSection>

        {/* Precisando: carril editorial oscuro + lista clara */}
        <MotionSection className="border-y border-[var(--border)]">
          <div className="prec-container max-w-none px-0">
            <div className="grid lg:grid-cols-12">
              <div className="prec-precisando-rail px-[var(--gutter)] py-14 md:py-20 lg:col-span-5 lg:py-24">
                <p className="prec-kicker text-[color-mix(in_oklab,var(--band-ink-fg)_55%,transparent)]">
                  Editorial
                </p>
                <h2 className="prec-title-xl mt-5 max-w-[12ch] text-3xl leading-[1.05] tracking-[-0.03em] text-[var(--band-ink-fg)] md:text-4xl">
                  Precisando
                </h2>
                <p className="mt-8 max-w-sm text-sm leading-relaxed text-[color-mix(in_oklab,var(--band-ink-fg)_75%,transparent)] md:text-base">
                  Cómo la información llega y hace la diferencia.
                </p>
              </div>
              <div className="border-t border-[color-mix(in_oklab,var(--band-ink-fg)_15%,transparent)] bg-[var(--elevated)] px-[var(--gutter)] py-12 md:py-16 lg:col-span-7 lg:border-t-0 lg:border-l lg:border-[var(--border)]">
                <ul className="space-y-0">
                  {featured.map((a, i) => (
                    <li
                      key={a.slug}
                      className={`py-7 md:py-9 ${i > 0 ? "border-t border-[var(--border)]" : ""}`}
                    >
                      <Link
                        href={`/precisando/${encodeURI(a.slug)}`}
                        className="group block font-[family-name:var(--font-display)] text-lg font-medium leading-snug tracking-tight text-[var(--fg)] transition-colors md:text-xl"
                      >
                        <span className="bg-[length:0%_1px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                          {a.title}
                        </span>
                      </Link>
                      <span className="mt-3 block font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                        {a.category}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/precisando"
                  className="prec-link-arrow mt-10 inline-flex items-center gap-2 border-t border-[var(--border)] pt-10"
                >
                  Ver todo Precisando <span aria-hidden>→</span>
                </Link>
                <HomeFlowLink href="#marco" label="Marco · educación mediática" />
              </div>
            </div>
          </div>
        </MotionSection>

        {/* Marco: ritmo irregular en alturas */}
        <MotionSection id="marco" className="bg-[var(--surface)] py-[var(--home-gap)]">
          <div className="prec-container">
            <div className="max-w-xl">
              <h2 className="prec-title-xl text-[clamp(1.75rem,3.5vw,2.5rem)] leading-tight tracking-[-0.03em]">
                Educación mediática ampliada
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] md:text-base">
                Cuatro dimensiones para leer el entorno digital con más profundidad.
              </p>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
              <article className="flex flex-col border border-[var(--fg)] bg-[var(--bg)] p-7 md:min-h-[20rem] md:p-9 lg:col-span-5">
                <h3 className="font-[family-name:var(--font-display)] text-xl font-medium">Comunicación</h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                  Quién dice qué, por qué y cómo nos llega. Del chiste a la noticia falsa, todo
                  comunica.
                </p>
                <Link href="/marco/comunicacion" className="prec-link-arrow mt-8 inline-flex gap-1">
                  Ampliar <span aria-hidden>→</span>
                </Link>
              </article>
              <MotionStagger
                className="grid gap-4 lg:col-span-7 lg:grid-cols-2 lg:gap-5"
                stagger={0.06}
                layoutContents
              >
                <article className="flex flex-col border border-[var(--border)] bg-[var(--elevated)] p-6 transition-shadow duration-500 hover:shadow-[var(--shadow-card)] md:p-7">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-medium md:text-lg">
                    Educación
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    Pensar lo que vemos y compartimos: leer bien, preguntar y compartir con
                    responsabilidad.
                  </p>
                  <Link href="/marco/educacion" className="prec-link-arrow mt-6 inline-flex gap-1">
                    Ampliar <span aria-hidden>→</span>
                  </Link>
                </article>
                <article className="flex flex-col border border-[var(--border)] bg-[var(--elevated)] p-6 transition-shadow duration-500 hover:shadow-[var(--shadow-card)] md:p-7">
                  <h3 className="font-[family-name:var(--font-display)] text-base font-medium md:text-lg">
                    Tecnología
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    Algoritmos y privacidad: lo que ves en redes no es azar; decidir mejor y cuidar
                    datos.
                  </p>
                  <Link href="/marco/tecnologia" className="prec-link-arrow mt-6 inline-flex gap-1">
                    Ampliar <span aria-hidden>→</span>
                  </Link>
                </article>
                <article className="flex flex-col border border-[var(--border)] bg-[var(--elevated)] p-6 transition-shadow duration-500 hover:shadow-[var(--shadow-card)] sm:col-span-2 md:flex-row md:items-center md:justify-between md:gap-10 md:p-8">
                  <div className="md:max-w-lg">
                    <h3 className="font-[family-name:var(--font-display)] text-base font-medium md:text-lg">
                      Cultura
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:mt-0">
                      Perspectivas y narrativas: cómo los medios reflejan o invisibilizan historias.
                    </p>
                  </div>
                  <Link href="/marco/cultura" className="prec-link-arrow mt-6 inline-flex shrink-0 gap-1 md:mt-0">
                    Ampliar <span aria-hidden>→</span>
                  </Link>
                </article>
              </MotionStagger>
            </div>
            <HomeFlowLink href="/participa" label="Participa y consulta ciudadana" />
          </div>
        </MotionSection>

        {/* Participa */}
        <MotionSection className="pb-24 pt-12 md:pb-32 md:pt-16">
          <div className="prec-container">
            <div className="relative overflow-hidden border border-[var(--fg)] bg-[var(--fg)] p-8 text-[var(--bg)] md:p-12 lg:p-14">
              <div
                className="pointer-events-none absolute -right-8 top-0 h-64 w-64 opacity-[0.07]"
                style={{
                  background: "radial-gradient(circle, var(--accent-muted) 0%, transparent 70%)",
                }}
                aria-hidden
              />
              <div className="relative grid gap-10 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <p className="prec-kicker text-[var(--accent-muted)]">Participación</p>
                  <p className="mt-4 font-[family-name:var(--font-display)] text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                    ¿Cómo te informas hoy? Tu opinión en la consulta ciudadana.
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
                  <a
                    href={EXTERNAL.consultaCiudadana}
                    className="prec-btn prec-btn--inverse"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Entregar opinión
                  </a>
                  <Link
                    href="/participa"
                    className="prec-btn border-[color-mix(in_oklab,var(--bg)_40%,transparent)] bg-transparent text-[var(--bg)] hover:bg-[color-mix(in_oklab,var(--bg)_12%,transparent)]"
                  >
                    Más contexto
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </MotionSection>
      </div>
    </>
  );
}
