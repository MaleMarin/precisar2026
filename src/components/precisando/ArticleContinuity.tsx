import Link from "next/link";

export function ArticleContinuity({
  categoryLabel,
  categoryHref,
}: {
  categoryLabel: string;
  categoryHref: string;
}) {
  return (
    <aside
      className="not-prose mt-14 border border-[var(--border)] bg-[var(--elevated)] p-8 md:mt-16 md:p-10"
      aria-label="Seguir leyendo"
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]">
        Editorial
      </p>
      <p className="mt-4 font-[family-name:var(--font-display)] text-lg font-medium leading-snug text-[var(--fg)] md:text-xl">
        ¿Seguimos?
      </p>
      <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm">
        <Link href="/precisando" className="prec-link-arrow inline-flex gap-1">
          Todo Precisando <span aria-hidden>→</span>
        </Link>
        <Link href={categoryHref} className="text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
          Más en «{categoryLabel}» →
        </Link>
        <Link href="/participa" className="text-[var(--muted)] transition-colors hover:text-[var(--fg)]">
          Participación →
        </Link>
      </div>
    </aside>
  );
}
