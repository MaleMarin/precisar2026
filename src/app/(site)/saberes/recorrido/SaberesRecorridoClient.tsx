"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SABERES_RESOURCES } from "@/data/saberes-resources";

const EASE = [0.22, 1, 0.36, 1] as const;

const chapters = [
  {
    step: "01",
    title: "Más que datos",
    text:
      "Saberes es un espacio para entender contextos, aplicar ideas y compartir prácticas que fortalecen el criterio frente a lo digital.",
  },
  {
    step: "02",
    title: "Recursos listos para usar",
    text:
      "Guías, preguntas provocadoras y marcos prácticos para aula, familia y equipos. Todo en PDF, en español, para descargar y conversar.",
  },
  {
    step: "03",
    title: "Una puerta al resto del sitio",
    text:
      "Desde aquí podés saltar a Precisando, programas o Participa — la biblioteca es una pieza del mapa completo de Precisar.",
  },
] as const;

export function SaberesRecorridoClient() {
  const reduceMotion = useReducedMotion();
  const featured = SABERES_RESOURCES.slice(0, 3);

  return (
    <div className="text-[var(--fg)]">
      {/* Hero */}
      <section className="relative min-h-[min(88svh,920px)] overflow-hidden border-b border-[var(--border)] bg-[var(--bg)]">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)`,
            backgroundSize: "72px 72px",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_65%)]"
          aria-hidden
        />
        <div className="prec-container relative flex min-h-[min(88svh,920px)] flex-col justify-end pb-16 pt-32 md:pb-24 md:pt-40">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: EASE }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-[var(--muted)]">Saberes · Vista muestra</p>
            <h1 className="mt-6 max-w-[18ch] font-[family-name:var(--font-display)] text-[clamp(2.75rem,11vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.06em] md:max-w-[14ch]">
              Colección viva
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-[var(--muted)] md:text-xl">
              Una forma distinta de presentar la biblioteca: ritmo, capas y foco. Así podrían verse otras secciones internas.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#recursos"
                className="inline-flex border border-[var(--fg)] bg-[var(--fg)] px-6 py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-[var(--bg)] transition-opacity hover:opacity-90"
              >
                Ver destacados
              </a>
              <Link
                href="/saberes"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] underline decoration-[var(--border)] underline-offset-4 transition-colors hover:text-[var(--fg)]"
              >
                Lista clásica
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capítulos */}
      <section className="border-b border-[var(--border)] bg-[color-mix(in_oklab,var(--elevated)_88%,var(--bg))] py-20 md:py-28">
        <div className="prec-container space-y-20 md:space-y-28">
          {chapters.map((ch, i) => (
            <motion.div
              key={ch.step}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : i * 0.06, ease: EASE }}
              className="grid gap-8 md:grid-cols-12 md:items-start md:gap-12"
            >
              <div className="md:col-span-3">
                <span className="font-[family-name:var(--font-display)] text-4xl font-semibold tabular-nums text-[color-mix(in_oklab,var(--fg)_20%,var(--bg))] md:text-5xl">
                  {ch.step}
                </span>
              </div>
              <div className="md:col-span-9">
                <h2 className="font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-[var(--fg)] md:text-3xl">
                  {ch.title}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">{ch.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section id="recursos" className="scroll-mt-24 py-20 md:py-28">
        <div className="prec-container">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6 border-b border-[var(--border)] pb-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">Descarga</p>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-medium md:text-3xl">
                Tres recursos para empezar
              </h2>
            </div>
            <Link
              href="/saberes"
              className="prec-btn prec-btn--ghost shrink-0 border-[var(--border)] text-[var(--fg)] hover:border-[var(--fg)]"
            >
              Ver los 7 PDF
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featured.map((item, index) => (
              <motion.article
                key={item.href}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: reduceMotion ? 0 : 0.5, delay: reduceMotion ? 0 : index * 0.08, ease: EASE }}
                className="group flex flex-col border border-[var(--border)] bg-[var(--elevated)] p-6 transition-colors hover:border-[var(--fg)] md:p-8"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted-2)]">PDF · 0{index + 1}</span>
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-medium leading-snug tracking-tight text-[var(--fg)]">
                  {item.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--muted)] line-clamp-4">{item.body}</p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex w-fit font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--accent)] underline decoration-[color-mix(in_oklab,var(--accent)_45%,transparent)] underline-offset-4 transition-colors group-hover:text-[var(--fg)] group-hover:decoration-[var(--fg)]"
                >
                  {item.label}
                </a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Cierre */}
      <section className="border-t border-[var(--border)] bg-[var(--fg)] py-16 text-[var(--bg)] md:py-20">
        <div className="prec-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <p className="max-w-lg font-[family-name:var(--font-display)] text-xl font-medium leading-snug md:text-2xl">
            ¿Seguimos en otra sala del sitio?
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/unapreguntaaldia"
              className="border border-[color-mix(in_oklab,var(--bg)_35%,transparent)] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-[var(--bg)] hover:text-[var(--fg)]"
            >
              Una pregunta al día
            </Link>
            <Link
              href="/precisando"
              className="border border-[color-mix(in_oklab,var(--bg)_35%,transparent)] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors hover:bg-[var(--bg)] hover:text-[var(--fg)]"
            >
              Precisando
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
