import Link from "next/link";
import { notFound, permanentRedirect } from "next/navigation";
import { ArticleMarkdown } from "@/components/ArticleMarkdown";
import { ARTICLES, articleBySlug } from "@/data/articles";
import { PRECISANDO_SLUG_ALIASES } from "@/data/slug-aliases";
import { hasSubstantialLocalBody, loadArticleMarkdown } from "@/lib/load-article-markdown";
import { SITE } from "@/lib/site";
import { ArticleContinuity } from "@/components/precisando/ArticleContinuity";
import { ArticleTemplate } from "@/components/templates/PageTemplates";
import { categoryToSlug } from "@/lib/category-slug";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const raw = (await params).slug;
  const slug = decodeURIComponent(raw);
  const post = articleBySlug(slug);
  if (!post) return { title: "No encontrado" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `${SITE.url}/precisando/${encodeURI(post.slug)}`,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE.url}/precisando/${encodeURI(post.slug)}`,
      type: "article",
      publishedTime: post.pubDate,
      locale: "es_CL",
      siteName: SITE.name,
    },
    robots: { index: true, follow: true },
  };
}

export default async function PrecisandoArticulo({ params }: Props) {
  const raw = (await params).slug;
  const slug = decodeURIComponent(raw);

  const canonicalFromAlias = PRECISANDO_SLUG_ALIASES[slug];
  if (canonicalFromAlias && canonicalFromAlias !== slug) {
    permanentRedirect(`/precisando/${encodeURI(canonicalFromAlias)}`);
  }

  const post = articleBySlug(slug);
  if (!post) notFound();

  const canonical = `${SITE.url}/precisando/${encodeURI(post.slug)}`;
  const legacyRootUrl = `${SITE.url}/${encodeURI(post.slug)}`;
  const md = loadArticleMarkdown(post.slug);
  const substantial = hasSubstantialLocalBody(md);
  const showLegacyMirror = !substantial;

  return (
    <ArticleTemplate title={post.title} kicker={`Precisando · ${post.category}`}>
      <div className="border-b border-[var(--border)] pb-6">
        <time
          dateTime={post.pubDate}
          className="inline-block font-mono text-[10px] uppercase tracking-[0.22em] text-[var(--muted)]"
        >
          {post.pubDate}
        </time>
      </div>
      {md ? (
        <ArticleMarkdown source={md} />
      ) : (
        <p className="prose-precisar mt-10 max-w-2xl text-[var(--muted)]">{post.excerpt}</p>
      )}
      {showLegacyMirror ? (
        <div className="flex flex-wrap gap-3">
          <a
            href={legacyRootUrl}
            className="prec-btn prec-btn--primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
            target="_blank"
            rel="noreferrer"
          >
            Ver en precisar.net
          </a>
          <Link
            href="/precisando"
            className="prec-btn prec-btn--ghost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
          >
            Volver a Precisando
          </Link>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          <Link
            href="/precisando"
            className="prec-btn prec-btn--ghost focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
          >
            Volver a Precisando
          </Link>
        </div>
      )}
      <ArticleContinuity
        categoryLabel={post.category}
        categoryHref={`/precisando/categoria/${categoryToSlug(post.category)}`}
      />
      <p className="mt-8 max-w-xl text-xs text-[var(--muted)]">
        URL canónica: <span className="font-mono text-[10px] text-[var(--fg)]">{canonical}</span>
        {substantial
          ? ". Texto publicado en este sitio; sin enlace automático al archivo anterior."
          : ". Resumen en este sitio; el texto extendido sigue disponible en la URL histórica de precisar.net."}
      </p>
    </ArticleTemplate>
  );
}
