import Link from "next/link";
import { EXTERNAL, SITE } from "@/lib/site";

/**
 * ZONA CONGELADA — no rediseñar aquí.
 *
 * En producción, reemplazar el interior de esta sección por el export exacto
 * de la hero actual (HTML/CSS/JS de Wix o embed aprobado), manteniendo
 * concepto, copy y funcionamiento. El resto del sitio nuevo debe alinearse
 * visualmente “hacia” esta pieza, no al revés.
 *
 * Mientras tanto, se muestran solo elementos verificables en metadatos y
 * enlaces públicos del sitio actual, para no inventar layout ni animaciones.
 */
export function PrecisarHeroLegacy() {
  return (
    <section
      id="precisar-hero-legacy"
      aria-label="Inicio"
      className="precisar-hero-legacy relative flex min-h-[85vh] flex-col justify-end border-b border-[var(--border)] bg-[var(--hero-bg)] px-6 pb-16 pt-24 md:px-10 md:pb-20"
    >
      <div className="mx-auto w-full max-w-[var(--max)]">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
          {SITE.name}
        </p>
        <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-medium leading-[1.05] tracking-tight text-[var(--fg)] md:text-5xl lg:text-6xl">
          {SITE.tagline}
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-[var(--muted)]">
          Placeholder estructural: integrar aquí la hero interactiva actual sin
          alterar su comportamiento.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href={EXTERNAL.botOnda}
            className="inline-flex items-center justify-center border border-[var(--fg)] bg-[var(--fg)] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[var(--bg)] transition-colors hover:bg-transparent hover:text-[var(--fg)]"
          >
            Bot Onda
          </Link>
          <Link
            href="/#precisar-main"
            className="inline-flex items-center justify-center border border-[var(--border)] px-6 py-3 text-xs font-medium uppercase tracking-widest text-[var(--fg)] transition-colors hover:border-[var(--fg)]"
          >
            Continuar
          </Link>
        </div>
      </div>
    </section>
  );
}
