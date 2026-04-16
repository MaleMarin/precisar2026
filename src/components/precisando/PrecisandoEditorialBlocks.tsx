import Image from "next/image";
import Link from "next/link";
import type { ArticleMeta } from "@/data/articles";
import { categoryToSlug } from "@/lib/category-slug";
import styles from "./PrecisandoEditorialBlocks.module.css";

export function PrecisandoToolbar({
  backHref,
  backLabel,
  showRss = true,
}: {
  backHref?: string;
  backLabel?: string;
  showRss?: boolean;
}) {
  return (
    <div className="mb-12 flex flex-wrap items-center gap-3 border-b border-[var(--border)] pb-8">
      {backHref && backLabel ? (
        <Link
          href={backHref}
          className="prec-btn prec-btn--ghost text-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
        >
          {backLabel}
        </Link>
      ) : null}
      {showRss ? (
        <a
          href="/precisando/feed.xml"
          className="prec-btn prec-btn--ghost text-[10px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
        >
          RSS
        </a>
      ) : null}
    </div>
  );
}

export function PrecisandoArticleList({
  articles,
  showCategoryInMeta = true,
  variant = "default",
}: {
  articles: ArticleMeta[];
  showCategoryInMeta?: boolean;
  variant?: "default" | "panel";
}) {
  const itemPad =
    variant === "panel"
      ? "py-9 md:py-11"
      : "py-10 md:py-12";

  return (
    <ul className={variant === "panel" ? "max-w-none" : "max-w-4xl space-y-0"}>
      {articles.map((a, i) => {
        const href = `/precisando/${encodeURI(a.slug)}`;
        const hasCover = Boolean(a.coverImage);
        return (
          <li
            key={a.slug}
            className={`${itemPad} ${i > 0 ? "border-t border-[var(--border)]" : ""}`}
          >
            <div className={`${styles.item} ${hasCover ? styles.itemWithCover : ""}`}>
              {a.coverImage ? (
                <Link href={href} className={`group ${styles.coverLink}`} aria-label={a.coverAlt ?? a.title}>
                  <Image
                    src={a.coverImage}
                    alt={a.coverAlt ?? ""}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 767px) 100vw, 16rem"
                  />
                </Link>
              ) : null}
              <div className={styles.body}>
                <Link
                  href={href}
                  className={`group block rounded-sm font-[family-name:var(--font-display)] font-medium leading-snug tracking-tight text-[var(--fg)] underline-offset-[6px] transition-colors hover:text-[var(--accent)] hover:underline ${
                    variant === "panel"
                      ? "text-xl md:text-[1.35rem] md:leading-snug"
                      : "text-xl md:text-2xl md:leading-tight"
                  }`}
                >
                  {variant === "panel" ? (
                    <span className="bg-[length:0%_1px] bg-gradient-to-r from-[var(--accent)] to-[var(--accent)] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_1px]">
                      {a.title}
                    </span>
                  ) : (
                    a.title
                  )}
                </Link>
                <p
                  className={`mt-4 leading-relaxed text-[var(--muted)] ${
                    variant === "panel"
                      ? "max-w-2xl text-sm md:text-[0.95rem]"
                      : "max-w-2xl text-sm md:text-base"
                  }`}
                >
                  {a.excerpt}
                </p>
                <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--muted-2)]">
                  {showCategoryInMeta ? (
                    <>
                      <Link
                        href={`/precisando/categoria/${categoryToSlug(a.category)}`}
                        className="text-[var(--muted)] transition-colors hover:text-[var(--fg)]"
                      >
                        {a.category}
                      </Link>
                      <span className="mx-2 text-[var(--border)]">/</span>
                    </>
                  ) : null}
                  <time dateTime={a.pubDate}>{a.pubDate}</time>
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function PrecisandoPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;
  return (
    <nav
      className="mt-4 flex flex-wrap gap-2 border-t border-[var(--border)] pt-10"
      aria-label="Paginación"
    >
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={p === 1 ? "/precisando/explora" : `/precisando/pagina/${p}`}
          className={`min-w-[2.5rem] px-3 py-2 text-center font-mono text-[10px] font-medium uppercase tracking-widest transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)] ${
            p === currentPage
              ? "bg-[var(--fg)] text-[var(--bg)]"
              : "border border-[var(--border)] text-[var(--muted)] hover:border-[var(--fg)] hover:text-[var(--fg)]"
          }`}
        >
          {p}
        </Link>
      ))}
    </nav>
  );
}
