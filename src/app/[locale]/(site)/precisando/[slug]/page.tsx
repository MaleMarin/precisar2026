import { notFound, permanentRedirect } from "next/navigation";
import { ArticleMarkdown } from "@/components/ArticleMarkdown";
import { ARTICLES, articleBySlug } from "@/data/articles";
import { PRECISANDO_SLUG_ALIASES } from "@/data/slug-aliases";
import { loadArticleMarkdown } from "@/lib/load-article-markdown";
import { SITE } from "@/lib/site";
import { ArticleTemplate } from "@/components/templates/PageTemplates";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug: raw } = await params;
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
  const { locale, slug: raw } = await params;
  const slug = decodeURIComponent(raw);

  const canonicalFromAlias = PRECISANDO_SLUG_ALIASES[slug];
  if (canonicalFromAlias && canonicalFromAlias !== slug) {
    permanentRedirect(`/${locale}/precisando/${encodeURI(canonicalFromAlias)}`);
  }

  const post = articleBySlug(slug);
  if (!post) notFound();

  if (post.slug !== slug) {
    permanentRedirect(`/${locale}/precisando/${encodeURI(post.slug)}`);
  }

  const md = loadArticleMarkdown(post.slug);

  return (
    <ArticleTemplate title={post.title} kicker={`Precisando · ${post.category}`}>
      <div className="pb-6">
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
      <div className="mt-14 max-w-3xl" aria-label="Cierre editorial">
        <p className="text-[1.05rem] leading-relaxed text-[var(--muted)]">Un abrazo,</p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-medium text-[var(--fg)]">
          Equipo Precisar
        </p>
      </div>
    </ArticleTemplate>
  );
}
