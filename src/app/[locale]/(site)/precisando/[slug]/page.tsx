import Image from "next/image";
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
  const ogImage = post.coverImage
    ? [{ url: new URL(post.coverImage, SITE.url).toString() }]
    : undefined;

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
      ...(ogImage ? { images: ogImage } : {}),
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
      {post.coverImage ? (
        <figure className="not-prose mx-auto w-full max-w-4xl">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--surface)]">
            <Image
              src={post.coverImage}
              alt={post.coverAlt ?? ""}
              fill
              priority
              className="object-contain object-center"
              sizes="(max-width: 1024px) 100vw, 56rem"
            />
          </div>
        </figure>
      ) : null}
      {md ? (
        <ArticleMarkdown source={md} />
      ) : (
        <p className="prose-precisar mt-10 max-w-2xl text-[var(--muted)]">{post.excerpt}</p>
      )}
      {post.downloadUrl ? (
        <div
          className="not-prose mt-14 max-w-4xl rounded-sm border border-[var(--border)] bg-[var(--surface)] px-5 py-4 md:px-6 md:py-5"
          aria-label="Descarga asociada al artículo"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted)]">
            Documento
          </p>
          <a
            href={post.downloadUrl}
            download
            className="mt-2 inline-flex items-center gap-2 font-[family-name:var(--font-display)] text-base font-medium text-[var(--accent)] underline decoration-1 underline-offset-4 transition-opacity hover:opacity-85"
          >
            {post.downloadLabel ?? "Descargar archivo"}
            <span aria-hidden className="text-lg">
              ↓
            </span>
          </a>
        </div>
      ) : null}
      <div className="mt-14 max-w-3xl" aria-label="Cierre editorial">
        <p className="text-[1.05rem] leading-relaxed text-[var(--muted)]">Un abrazo,</p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-lg font-medium text-[var(--fg)]">
          Equipo Precisar
        </p>
      </div>
    </ArticleTemplate>
  );
}
