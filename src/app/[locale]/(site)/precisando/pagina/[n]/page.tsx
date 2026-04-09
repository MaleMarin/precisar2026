import { notFound, redirect } from "next/navigation";
import { articlesSortedByDate, PRECISANDO_PAGE_SIZE } from "@/data/articles";
import { PRECISANDO_ARTICLES_UNDER_CONSTRUCTION } from "@/lib/precisando-access";
import { SITE } from "@/lib/site";
import { EditorialIndexTemplate } from "@/components/templates/PageTemplates";
import {
  PrecisandoArticleList,
  PrecisandoPagination,
  PrecisandoToolbar,
} from "@/components/precisando/PrecisandoEditorialBlocks";
import { PrecisandoIndexFrame } from "@/components/precisando/PrecisandoIndexFrame";
import Link from "next/link";

type Props = { params: Promise<{ locale: string; n: string }> };

export async function generateMetadata({ params }: Props) {
  const { n } = await params;
  if (PRECISANDO_ARTICLES_UNDER_CONSTRUCTION) {
    return { title: "Precisando", robots: { index: false, follow: false } };
  }
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
  const { locale, n } = await params;
  if (PRECISANDO_ARTICLES_UNDER_CONSTRUCTION) {
    redirect(`/${locale}#precisando`);
  }
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
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
              Paginación
            </p>
            <p className="prec-title-xl mt-3 text-2xl leading-tight tracking-tight text-[var(--fg)] md:text-3xl">
              Página {page}
            </p>
            <p className="mt-5 text-sm leading-relaxed text-[var(--muted)]">
              Mismo ritmo que el índice principal: carril + lista.
            </p>
            <Link
              href="/precisando"
              className="prec-btn prec-btn--ghost mt-8 text-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
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
