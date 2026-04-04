import Link from "next/link";

/** Puente explícito al siguiente tramo del recorrido editorial. */
export function HomeFlowLink({
  href,
  label,
  kicker = "Continúa",
}: {
  href: string;
  label: string;
  kicker?: string;
}) {
  return (
    <div className="mt-14 border-t border-[var(--border)] pt-10 md:mt-16 md:pt-12">
      <Link
        href={href}
        className="group inline-flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
      >
        <span>{kicker}</span>
        <span className="bg-[length:0%_1px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] bg-left-bottom bg-no-repeat font-[family-name:var(--font-display)] text-base font-medium normal-case tracking-tight text-[var(--fg)] transition-[background-size] duration-500 ease-out group-hover:bg-[length:100%_1px] md:text-lg">
          {label}
        </span>
        <span className="text-[var(--accent)] transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden>
          →
        </span>
      </Link>
    </div>
  );
}
