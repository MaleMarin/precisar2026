import { Link } from "@/i18n/navigation";
import { SaberesMaterialGrid } from "@/components/saberes/SaberesMaterialGrid";
import { SaberesLibraryTemplate } from "@/components/templates/PageTemplates";
import { SABERES_FILTERS_VISUAL_ONLY } from "@/data/saberes-config";
import { SABERES_RESOURCES } from "@/data/saberes-resources";
import { SentidosDigitalesCarouselHero } from "../experiencias/sentidos-digitales/SentidosDigitalesCarouselHero";

const SABERES_LEAD =
  "Es mucho más que aprender datos: es entender contextos, aplicar conocimientos y compartir experiencias que fortalecen tu capacidad crítica y creativa. Este espacio está pensado para acompañarte en tu proceso de aprendizaje continuo, impulsando reflexionar y expandir perspectivas.";

export const metadata = {
  title: "Saberes",
  description: SABERES_LEAD,
};

export default function Page() {
  return (
    <SaberesLibraryTemplate title="Saberes" kicker="Biblioteca" lead={SABERES_LEAD}>
      <section
        className="border-b border-[var(--border)] pb-12 md:pb-14"
        aria-labelledby="saberes-pregunta-heading"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">Recurso</p>
        <h2
          id="saberes-pregunta-heading"
          className="mt-4 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-[var(--fg)] md:text-3xl"
        >
          Una pregunta al día
        </h2>
        <p className="mt-4 max-w-2xl text-[1.08rem] leading-relaxed text-[var(--muted)] md:text-lg">
          Treinta preguntas para explorar tu vida digital: reflexionar, conversar y descargar el PDF en
          español.
        </p>
        <Link
          href="/unapreguntaaldia"
          className="mt-6 inline-flex prec-btn prec-btn--ghost text-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
        >
          Abrir una pregunta al día
        </Link>
      </section>

      <section className="mt-12 md:mt-14" aria-labelledby="saberes-sentidos-heading">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">Experiencia</p>
        <h2
          id="saberes-sentidos-heading"
          className="mt-4 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-[var(--fg)] md:text-3xl"
        >
          Sentidos digitales
        </h2>
        <p className="mt-4 max-w-2xl text-[1.08rem] leading-relaxed text-[var(--muted)] md:text-lg">
          Seis miradas para navegar con criterio, cuidar límites y el bienestar frente a la pantalla.
        </p>
        <div className="mt-8">
          <SentidosDigitalesCarouselHero embed />
        </div>
        <Link
          href="/experiencias/sentidos-digitales"
          className="mt-6 inline-flex prec-btn prec-btn--ghost text-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
        >
          Ver sentidos digitales
        </Link>
      </section>

      <section
        className="mt-12 border-b border-[var(--border)] pb-12 md:mt-14 md:pb-14"
        aria-labelledby="saberes-cultura-heading"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)]">Tiras</p>
        <h2
          id="saberes-cultura-heading"
          className="mt-4 font-[family-name:var(--font-display)] text-2xl font-medium tracking-tight text-[var(--fg)] md:text-3xl"
        >
          Cultura digital
        </h2>
        <p className="mt-4 max-w-2xl text-[1.08rem] leading-relaxed text-[var(--muted)] md:text-lg">
          Treinta y seis miradas breves sobre algoritmos, privacidad, desinformación y prácticas
          conscientes en línea.
        </p>
        <Link
          href="/culturadigital"
          className="mt-6 inline-flex prec-btn prec-btn--ghost text-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
        >
          Ver cultura digital
        </Link>
      </section>

      <div className="mt-12 grid gap-10 border-b border-[var(--border)] pb-12 md:mt-14 md:grid-cols-12 md:gap-10 md:pb-14">
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
