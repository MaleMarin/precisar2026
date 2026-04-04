import Link from "next/link";

/** Cierre de continuidad en landings de programa (sin callejón sin salida). */
export function ProgramFlowFooter() {
  return (
    <footer
      className="not-prose mt-16 border-t border-[var(--border)] pt-12 md:mt-20 md:pt-14"
      aria-label="Más en Precisar"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
        Continúa
      </p>
      <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
        <Link
          href="/programas"
          className="group font-[family-name:var(--font-display)] text-lg font-medium tracking-tight text-[var(--fg)]"
        >
          <span className="bg-[length:0%_1px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
            Índice de programas
          </span>
          <span className="ml-1 text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </Link>
        <Link
          href="/participa"
          className="group text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
        >
          Participa y contacto
          <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </Link>
        <Link
          href="/saberes"
          className="group text-sm font-medium text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
        >
          Biblioteca Saberes
          <span className="ml-1 inline-block transition-transform group-hover:translate-x-0.5" aria-hidden>
            →
          </span>
        </Link>
      </div>
    </footer>
  );
}
