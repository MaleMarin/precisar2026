import Link from "next/link";
import { SaberesMaterialGrid } from "@/components/saberes/SaberesMaterialGrid";
import { SaberesLibraryTemplate } from "@/components/templates/PageTemplates";
import { SABERES_FILTERS_VISUAL_ONLY } from "@/data/saberes-config";
import { SABERES_RESOURCES } from "@/data/saberes-resources";

export const metadata = { title: "Saberes" };

export default function Page() {
  return (
    <SaberesLibraryTemplate title="Saberes" kicker="Biblioteca">
      <div className="grid gap-10 border-b border-[var(--border)] pb-12 md:grid-cols-12 md:gap-10 md:pb-14">
        <div className="md:col-span-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">Colección</p>
          <p className="mt-5 text-[1.08rem] leading-relaxed text-[var(--muted)] md:text-lg">
            Toda la biblioteca a la vista: portadas tipo tarjeta, mismo criterio que{" "}
            <Link href="/unapreguntaaldia" className="text-[var(--fg)] underline underline-offset-2">
              Una pregunta al día
            </Link>
            . PDF en español para aula, familia y equipos.
          </p>
          <Link
            href="/saberes/recorrido"
            className="mt-5 inline-flex font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--accent)] underline decoration-[color-mix(in_oklab,var(--accent)_40%,transparent)] underline-offset-4 transition-colors hover:text-[var(--fg)] hover:decoration-[var(--fg)]"
          >
            Recorrido inmersivo · muestra
          </Link>
        </div>
        <div className="flex flex-col justify-end md:col-span-7 md:items-end">
          <div className="w-full max-w-md border-l-2 border-[var(--fg)] pl-6 md:pl-8">
            <p className="font-[family-name:var(--font-display)] text-lg font-medium leading-snug text-[var(--fg)] md:text-xl">
              {SABERES_RESOURCES.length} documentos · descarga directa en cada tarjeta
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="prec-kicker mr-2">Formato</span>
        <span className="prec-chip prec-chip--active">PDF</span>
        <span className="prec-chip text-[var(--muted-2)]">Español</span>
      </div>
      {SABERES_FILTERS_VISUAL_ONLY ? (
        <p className="mt-2 max-w-2xl text-xs text-[var(--muted-2)]">
          Los filtros por categoría son indicativos; todos los recursos aparecen abajo.
        </p>
      ) : null}

      <div className="mt-12">
        <SaberesMaterialGrid items={SABERES_RESOURCES} />
      </div>
    </SaberesLibraryTemplate>
  );
}
