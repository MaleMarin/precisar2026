import {
  ARTICLES,
  articlesSortedByDate,
  PRECISANDO_PAGE_SIZE,
  uniqueCategories,
} from "@/data/articles";
import { categoryToSlug } from "@/lib/category-slug";
import { SITE } from "@/lib/site";
import { EditorialIndexTemplate } from "@/components/templates/PageTemplates";
import {
  PrecisandoArticleList,
  PrecisandoPagination,
} from "@/components/precisando/PrecisandoEditorialBlocks";
import { PrecisandoIndexFrame } from "@/components/precisando/PrecisandoIndexFrame";
import Link from "next/link";

export const metadata = {
  title: "Precisando",
  description:
    "La información está por todas partes. Lo que marca la diferencia es entenderla.",
  alternates: {
    canonical: `${SITE.url}/precisando`,
    types: {
      "application/rss+xml": `${SITE.url}/precisando/feed.xml`,
    },
  },
  openGraph: {
    title: "Precisando",
    url: `${SITE.url}/precisando`,
    type: "website",
    description:
      "La información está por todas partes. Lo que marca la diferencia es entenderla.",
  },
};

export default function PrecisandoIndexPage() {
  const sorted = articlesSortedByDate();
  const page1 = sorted.slice(0, PRECISANDO_PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PRECISANDO_PAGE_SIZE));
  const categories = uniqueCategories();

  return (
    <EditorialIndexTemplate title="Precisando" kicker="Editorial">
      <PrecisandoIndexFrame
        rail={
          <>
            <p className="text-base leading-relaxed text-[color-mix(in_oklab,var(--band-ink-fg)_82%,transparent)] md:text-lg md:leading-relaxed">
              La información está por todas partes. Lo que marca la diferencia es entenderla.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-[color-mix(in_oklab,var(--band-ink-fg)_18%,transparent)] pt-10">
              <a
                href="/precisando/feed.xml"
                className="border border-[color-mix(in_oklab,var(--band-ink-fg)_35%,transparent)] bg-transparent px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--band-ink-fg)] transition-colors hover:border-[var(--band-ink-fg)] hover:bg-[color-mix(in_oklab,var(--band-ink-fg)_08%,transparent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--band-ink-fg)]"
              >
                RSS
              </a>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color-mix(in_oklab,var(--band-ink-fg)_45%,transparent)]">
                {ARTICLES.length} textos indexados
              </span>
            </div>
            <div className="mt-12">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-[color-mix(in_oklab,var(--band-ink-fg)_50%,transparent)]">
                Categorías
              </p>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <Link
                    key={c}
                    href={`/precisando/categoria/${categoryToSlug(c)}`}
                    className="border border-[color-mix(in_oklab,var(--band-ink-fg)_25%,transparent)] px-2.5 py-1.5 text-xs text-[var(--band-ink-fg)] transition-colors hover:border-[var(--accent-muted)] hover:text-[var(--accent-muted)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--band-ink-fg)]"
                  >
                    {c}
                  </Link>
                ))}
              </div>
            </div>
          </>
        }
      >
        <PrecisandoArticleList articles={page1} showCategoryInMeta variant="panel" />
        <PrecisandoPagination currentPage={1} totalPages={totalPages} />
      </PrecisandoIndexFrame>
    </EditorialIndexTemplate>
  );
}
