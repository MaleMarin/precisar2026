import { notFound, redirect } from "next/navigation";
import { articlesSortedByDate, PRECISANDO_PAGE_SIZE } from "@/data/articles";
import { SITE } from "@/lib/site";
import { EditorialIndexTemplate } from "@/components/templates/PageTemplates";
import {
  PrecisandoArticleList,
  PrecisandoPagination,
  PrecisandoToolbar,
} from "@/components/precisando/PrecisandoEditorialBlocks";
import { PrecisandoIndexFrame } from "@/components/precisando/PrecisandoIndexFrame";
import Link from "next/link";

type Props = { params: Promise<{ n: string }> };

export async function generateMetadata({ params }: Props) {
  const { n } = await params;
  const page = Number.parseInt(n, 10);
  if (page === 1) return { title: "Precisando" };
  return {
    title: `Precisando · Página ${page}`,
    alternates: { canonical: `${SITE.url}/precisando/pagina/${page}` },
    robots: { index: true, follow: true },
  };
}

export function generateStaticParams() {
  const sorted = articlesSortedByDate();
  const total = Math.max(1, Math.ceil(sorted.length / PRECISANDO_PAGE_SIZE));
  return Array.from({ length: total }, (_, i) => ({ n: String(i + 1) })).filter((x) => x.n !== "1");
}

export default async function PrecisandoPagina({ params }: Props) {
  const { n } = await params;
  const page = Number.parseInt(n, 10);
  if (Number.isNaN(page) || page < 1) notFound();
  if (page === 1) redirect("/precisando");

  const sorted = articlesSortedByDate();
  const totalPages = Math.max(1, Math.ceil(sorted.length / PRECISANDO_PAGE_SIZE));
  if (page > totalPages) notFound();

  const start = (page - 1) * PRECISANDO_PAGE_SIZE;
  const slice = sorted.slice(start, start + PRECISANDO_PAGE_SIZE);

  return (
    <EditorialIndexTemplate title={`Precisando · Página ${page}`} kicker="Editorial">
      <PrecisandoIndexFrame
        rail={
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[color-mix(in_oklab,var(--band-ink-fg)_50%,transparent)]">
              Paginación
            </p>
            <p className="mt-4 text-2xl font-medium leading-tight tracking-tight text-[var(--band-ink-fg)] md:text-3xl">
              Página {page}
            </p>
            <p className="mt-6 text-sm leading-relaxed text-[color-mix(in_oklab,var(--band-ink-fg)_75%,transparent)]">
              Mismo ritmo que el índice principal: carril + lista.
            </p>
            <Link
              href="/precisando"
              className="mt-10 inline-block border border-[color-mix(in_oklab,var(--band-ink-fg)_35%,transparent)] px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--band-ink-fg)] transition-colors hover:border-[var(--band-ink-fg)] hover:bg-[color-mix(in_oklab,var(--band-ink-fg)_08%,transparent)]"
            >
              ← Volver al inicio
            </Link>
          </>
        }
      >
        <PrecisandoToolbar backHref="/precisando" backLabel="← Índice" showRss />
        <PrecisandoArticleList articles={slice} showCategoryInMeta variant="panel" />
        <PrecisandoPagination currentPage={page} totalPages={totalPages} />
      </PrecisandoIndexFrame>
    </EditorialIndexTemplate>
  );
}
