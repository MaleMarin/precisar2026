import { notFound } from "next/navigation";
import { ARTICLES, articlesSortedByDate } from "@/data/articles";
import { categoryToSlug } from "@/lib/category-slug";
import { SITE } from "@/lib/site";
import { EditorialIndexTemplate } from "@/components/templates/PageTemplates";
import {
  PrecisandoArticleList,
  PrecisandoToolbar,
} from "@/components/precisando/PrecisandoEditorialBlocks";
import { PrecisandoIndexFrame } from "@/components/precisando/PrecisandoIndexFrame";
import Link from "next/link";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  const cats = new Set(ARTICLES.map((a) => categoryToSlug(a.category)));
  return [...cats].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const label =
    ARTICLES.find((a) => categoryToSlug(a.category) === slug)?.category ?? slug;
  return {
    title: `Precisando · ${label}`,
    alternates: { canonical: `${SITE.url}/precisando/categoria/${slug}` },
    robots: { index: true, follow: true },
  };
}

export default async function PrecisandoCategoria({ params }: Props) {
  const { slug } = await params;
  const label = ARTICLES.find((a) => categoryToSlug(a.category) === slug)?.category;
  if (!label) notFound();

  const list = articlesSortedByDate().filter((a) => categoryToSlug(a.category) === slug);

  return (
    <EditorialIndexTemplate title={label} kicker="Precisando · Categoría">
      <PrecisandoIndexFrame
        rail={
          <>
            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
              Categoría
            </p>
            <p className="prec-title-xl mt-3 text-2xl leading-tight tracking-tight text-[var(--fg)] md:text-3xl">
              {label}
            </p>
            <p className="mt-5 text-sm text-[var(--muted)]">
              {list.length} {list.length === 1 ? "texto" : "textos"} en esta línea editorial.
            </p>
            <Link
              href="/precisando"
              className="prec-btn prec-btn--ghost mt-8 text-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
            >
              ← Todo Precisando
            </Link>
          </>
        }
      >
        <PrecisandoToolbar backHref="/precisando" backLabel="← Índice" showRss />
        <PrecisandoArticleList articles={list} showCategoryInMeta={false} variant="panel" />
      </PrecisandoIndexFrame>
    </EditorialIndexTemplate>
  );
}
