import Link from "next/link";
import { InstitutionalTemplate } from "@/components/templates/PageTemplates";
import { SENTIDOS_DIGITALES } from "@/data/sentidos-digitales";

export const metadata = { title: "Sentidos Digitales" };

export default function Page() {
  return (
    <InstitutionalTemplate title="Sentidos Digitales" kicker="Experiencias">
      <div className="max-w-2xl space-y-5 border-l-2 border-[var(--fg)] pl-6 md:pl-8">
        <p className="text-sm leading-relaxed text-[var(--muted)]">
          Como los sentidos físicos, los digitales nos ayudan a percibir e interactuar con el mundo
          en pantalla. Versión textual del marco; la experiencia interactiva completa se integrará más
          adelante.
        </p>
        <ul className="list-none space-y-2 text-sm text-[var(--muted)]">
          <li className="flex gap-2">
            <span className="text-[var(--accent)]">·</span>
            Navegar de forma consciente en entornos digitales
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--accent)]">·</span>
            Filtrar la sobrecarga de información
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--accent)]">·</span>
            Establecer límites saludables con la tecnología
          </li>
          <li className="flex gap-2">
            <span className="text-[var(--accent)]">·</span>
            Proteger el bienestar digital integral
          </li>
        </ul>
      </div>
      <ul className="mt-14 grid gap-4 sm:grid-cols-2">
        {SENTIDOS_DIGITALES.map((s, i) => (
          <li key={s.slug}>
            <Link
              href={`/experiencias/sentidos-digitales/${s.slug}`}
              className="group flex items-center justify-between gap-4 border border-[var(--border)] bg-[var(--elevated)] px-5 py-4 transition-all duration-300 hover:border-[var(--fg)] hover:shadow-[var(--shadow-card)] md:px-6 md:py-5"
            >
              <span className="font-mono text-[10px] tabular-nums text-[var(--muted-2)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-[family-name:var(--font-display)] text-base font-medium tracking-tight text-[var(--fg)] group-hover:text-[var(--accent)] md:text-lg">
                {s.title}
              </span>
              <span className="text-[var(--muted)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]" aria-hidden>
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </InstitutionalTemplate>
  );
}
