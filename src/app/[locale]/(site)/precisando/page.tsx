import { articlesSortedByDate, PRECISANDO_PAGE_SIZE, uniqueCategories } from "@/data/articles";
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
  description: "Publicación editorial de Precisar.",
  alternates: {
    canonical: `${SITE.url}/precisando`,
  },
  openGraph: {
    title: "Precisando",
    url: `${SITE.url}/precisando`,
    type: "website",
    description: "Publicación editorial de Precisar.",
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
          <div>
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-[var(--muted-2)]">
              Categorías
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <Link
                  key={c}
                  href={`/precisando/categoria/${categoryToSlug(c)}`}
                  className="rounded-sm border border-[var(--border)] bg-[var(--elevated)] px-2.5 py-1.5 text-xs text-[var(--fg)] transition-colors hover:border-[var(--fg)] hover:text-[var(--accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>
        }
      >
        <PrecisandoArticleList articles={page1} showCategoryInMeta variant="panel" />
        <PrecisandoPagination currentPage={1} totalPages={totalPages} />
      </PrecisandoIndexFrame>
    </EditorialIndexTemplate>
  );
}
