import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseModuleTemplate } from "@/components/templates/PageTemplates";
import { moduleByNumber } from "@/data/course-modules";

type Props = { params: Promise<{ n: string }> };

export function generateStaticParams() {
  return Array.from({ length: 25 }, (_, i) => ({ n: String(i + 1) }));
}

export async function generateMetadata({ params }: Props) {
  const { n } = await params;
  const num = Number.parseInt(n, 10);
  const mod = moduleByNumber(num);
  if (!mod) return { title: "Módulo" };
  return {
    title: `Aquí No Pasa · Módulo ${mod.n}`,
    description: mod.themeTitle,
  };
}

export default async function ModuloAquiNoPasa({ params }: Props) {
  const { n } = await params;
  const num = Number.parseInt(n, 10);
  if (Number.isNaN(num) || num < 1 || num > 25) notFound();
  const mod = moduleByNumber(num);
  if (!mod) notFound();

  const prev = num > 1 ? num - 1 : null;
  const next = num < 25 ? num + 1 : null;

  const hasPending =
    mod.pendingTranscript || (mod.pendingAssets && mod.pendingAssets.length > 0);

  return (
    <CourseModuleTemplate
      title={`Módulo ${mod.n}`}
      kicker={`Aquí No Pasa · ${mod.themeTitle}`}
    >
      <div className="max-w-3xl border-l-2 border-[var(--accent)] pl-6 md:pl-8">
      <p className="mt-2 max-w-2xl text-[1.05rem] leading-relaxed text-[var(--fg)]">{mod.lead}</p>

      <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--muted-2)]">
        Paso {mod.n} / 25
      </div>

      <section className="mt-10 max-w-2xl border-t border-[var(--border)] pt-10">
        <p className="prec-kicker">Estructura prevista del módulo</p>
        <ul className="mt-5 list-none space-y-3 border-l-2 border-[var(--accent)] pl-5 text-sm leading-relaxed text-[var(--muted)]">
          {mod.contentOutline.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </section>

      {hasPending ? (
        <aside
          className="mt-10 max-w-2xl border border-[var(--border)] border-l-4 border-l-[var(--accent)] bg-[var(--surface)] px-5 py-4 text-sm text-[var(--muted)]"
          aria-label="Contenido pendiente de migración"
        >
          <p className="font-[family-name:var(--font-display)] text-sm font-medium text-[var(--fg)]">
            Pendiente de volcado desde la versión original
          </p>
          {mod.pendingTranscript ? (
            <p className="mt-2">
              Falta la transcripción completa (voz en off, textos en pantalla y narrativa
              interactiva).
            </p>
          ) : null}
          {mod.pendingAssets.length > 0 ? (
            <ul className="mt-3 list-disc space-y-1 pl-5">
              {mod.pendingAssets.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          ) : null}
        </aside>
      ) : null}

      <p className="mt-8 max-w-2xl text-sm text-[var(--muted)]">
        Experiencia interactiva histórica:{" "}
        <a
          href={`https://www.precisar.net/${mod.n}`}
          className="font-medium text-[var(--accent)] underline-offset-2 hover:underline"
          target="_blank"
          rel="noreferrer"
        >
          precisar.net/{mod.n}
        </a>
        .
      </p>

      <div className="mt-12 flex flex-wrap gap-3 border-t border-[var(--border)] pt-10">
        {prev ? (
          <Link href={`/aqui-no-pasa/modulos/${prev}`} className="prec-btn prec-btn--ghost">
            ← Anterior
          </Link>
        ) : null}
        {next ? (
          <Link href={`/aqui-no-pasa/modulos/${next}`} className="prec-btn prec-btn--primary">
            Siguiente →
          </Link>
        ) : null}
        <Link href="/aqui-no-pasa" className="prec-btn prec-btn--ghost">
          Portada del curso
        </Link>
      </div>
      </div>
    </CourseModuleTemplate>
  );
}
