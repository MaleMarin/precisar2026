import Link from "next/link";
import { SaberesLibraryTemplate } from "@/components/templates/PageTemplates";
import { SABERES_FILTERS_VISUAL_ONLY } from "@/data/saberes-config";
import { SABERES_RESOURCES } from "@/data/saberes-resources";

export const metadata = { title: "Saberes" };

export default function Page() {
  return (
    <SaberesLibraryTemplate title="Saberes" kicker="Biblioteca">
      <div className="grid gap-12 border-b border-[var(--border)] pb-14 md:grid-cols-12 md:gap-10 md:pb-16">
        <div className="md:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">Colección</p>
          <p className="mt-6 text-[1.08rem] leading-relaxed text-[var(--muted)] md:text-lg">
            Es mucho más que aprender datos: es entender contextos, aplicar conocimientos y compartir
            experiencias que fortalecen tu capacidad crítica y creativa. Este espacio te acompaña en
            un aprendizaje continuo.
          </p>
        </div>
        <div className="flex flex-col justify-end md:col-span-7 md:items-end">
          <div className="w-full max-w-md border-l-2 border-[var(--fg)] pl-6 md:pl-8">
            <p className="font-[family-name:var(--font-display)] text-lg font-medium leading-snug text-[var(--fg)] md:text-xl">
              Documentos seleccionados para aula, familia y equipos.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-2">
        <span className="prec-kicker mr-2">Formato</span>
        <span className="prec-chip prec-chip--active">PDF</span>
        <span className="prec-chip text-[var(--muted-2)]">Español</span>
      </div>
      {SABERES_FILTERS_VISUAL_ONLY ? (
        <p className="mt-3 max-w-2xl text-xs text-[var(--muted-2)]">
          Los filtros son indicativos: aún no hay filtrado por categoría en esta versión. Todos los
          recursos listados son PDF en español.
        </p>
      ) : null}

      <div className="mt-16 space-y-4">
        {SABERES_RESOURCES.map((item, index) => (
          <article
            key={item.href}
            className={`group grid gap-6 border bg-[var(--elevated)] p-6 transition-all duration-500 md:grid-cols-12 md:items-center md:gap-8 md:p-8 ${
              index === 0
                ? "border-[var(--fg)] shadow-[var(--shadow-card)] md:p-10"
                : "border-[var(--border)] hover:border-[var(--fg)]"
            }`}
          >
            <div className="flex items-start gap-5 md:col-span-1 md:flex-col md:items-center md:justify-center md:border-r md:border-[var(--border)] md:pr-6">
              <span className="font-[family-name:var(--font-display)] text-3xl font-semibold tabular-nums leading-none text-[color-mix(in_oklab,var(--fg)_12%,var(--bg))] transition-colors group-hover:text-[var(--accent)] md:text-4xl">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <div className="md:col-span-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <h2 className="prec-resource-card font-[family-name:var(--font-display)] text-base font-medium leading-snug tracking-tight text-[var(--fg)] md:text-lg">
                  {item.title}
                </h2>
                <span
                  className="shrink-0 font-mono text-[9px] uppercase tracking-[0.18em] text-[var(--muted)]"
                  aria-hidden
                >
                  PDF
                </span>
              </div>
              {item.body ? (
                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] line-clamp-3 md:line-clamp-4">
                  {item.body}
                </p>
              ) : (
                <p className="mt-4 text-sm italic text-[var(--muted-2)]">
                  Descripción breve en el documento.
                </p>
              )}
            </div>
            <div className="md:col-span-3 md:flex md:justify-end">
              <a
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="prec-btn prec-btn--ghost w-full border-[var(--fg)] text-[var(--fg)] hover:bg-[var(--fg)] hover:text-[var(--bg)] md:w-auto"
              >
                {item.label}
              </a>
            </div>
          </article>
        ))}
      </div>
    </SaberesLibraryTemplate>
  );
}
