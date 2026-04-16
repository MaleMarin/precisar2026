"use client";

import { usePathname as useNextPathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ARTICLES, articleBySlug } from "@/data/articles";
import { categoryToSlug } from "@/lib/category-slug";
import styles from "@/components/programs/ProgramBreadcrumbs.module.css";

/** Índice completo del blog editorial (tarjetas con todos los artículos). */
const PRECISANDO_INDEX = "/precisando/explora";

function safeDecode(s: string): string {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

function fallbackSlugLabel(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function truncateLabel(s: string, max = 88): string {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1)}…`;
}

function stripLeadingLocale(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  const first = parts[0]!.toLowerCase();
  const isLocale = routing.locales.some((l) => l.toLowerCase() === first);
  if (isLocale) {
    return parts.length > 1 ? `/${parts.slice(1).join("/")}` : "/";
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

export function PrecisandoBreadcrumbs() {
  const t = useTranslations("precisandoBreadcrumbs");
  const raw = useNextPathname() || "/";
  const pathname = stripLeadingLocale(raw).replace(/\/$/, "") || "/";
  const parts = pathname.split("/").filter(Boolean);

  if (parts[0] !== "precisando") return null;
  if (parts[1] === "feed.xml") return null;

  const seg1 = parts[1];

  if (seg1 === "explora") {
    if (parts.length > 2) return null;
    return (
      <nav className={styles.nav} aria-label={t("aria")}>
        <ol className={styles.list}>
          <li>
            <Link href="/" className={styles.link}>
              {t("home")}
            </Link>
          </li>
          <li className={styles.sep} aria-hidden>
            /
          </li>
          <li>
            <Link href={PRECISANDO_INDEX} className={styles.link}>
              {t("precisando")}
            </Link>
          </li>
          <li className={styles.sep} aria-hidden>
            /
          </li>
          <li className={styles.current} aria-current="page">
            {t("explora")}
          </li>
        </ol>
      </nav>
    );
  }

  if (!seg1) {
    return (
      <nav className={styles.nav} aria-label={t("aria")}>
        <ol className={styles.list}>
          <li>
            <Link href="/" className={styles.link}>
              {t("home")}
            </Link>
          </li>
          <li className={styles.sep} aria-hidden>
            /
          </li>
          <li className={styles.current} aria-current="page">
            {t("precisando")}
          </li>
        </ol>
      </nav>
    );
  }

  if (seg1 === "pagina" && parts[2]) {
    const n = safeDecode(parts[2]!);
    return (
      <nav className={styles.nav} aria-label={t("aria")}>
        <ol className={styles.list}>
          <li>
            <Link href="/" className={styles.link}>
              {t("home")}
            </Link>
          </li>
          <li className={styles.sep} aria-hidden>
            /
          </li>
          <li>
            <Link href={PRECISANDO_INDEX} className={styles.link}>
              {t("precisando")}
            </Link>
          </li>
          <li className={styles.sep} aria-hidden>
            /
          </li>
          <li className={styles.current} aria-current="page">
            {t("page", { n })}
          </li>
        </ol>
      </nav>
    );
  }

  if (seg1 === "categoria" && parts[2]) {
    const catSlug = safeDecode(parts[2]!);
    const label =
      ARTICLES.find((a) => categoryToSlug(a.category) === catSlug)?.category ??
      fallbackSlugLabel(catSlug);
    return (
      <nav className={styles.nav} aria-label={t("aria")}>
        <ol className={styles.list}>
          <li>
            <Link href="/" className={styles.link}>
              {t("home")}
            </Link>
          </li>
          <li className={styles.sep} aria-hidden>
            /
          </li>
          <li>
            <Link href={PRECISANDO_INDEX} className={styles.link}>
              {t("precisando")}
            </Link>
          </li>
          <li className={styles.sep} aria-hidden>
            /
          </li>
          <li className={styles.current} aria-current="page">
            {label}
          </li>
        </ol>
      </nav>
    );
  }

  const articleSlug = safeDecode(seg1);
  const post = articleBySlug(articleSlug);
  const title = truncateLabel(post?.title ?? fallbackSlugLabel(articleSlug));

  return (
    <nav className={styles.nav} aria-label={t("aria")}>
      <ol className={styles.list}>
        <li>
          <Link href="/" className={styles.link}>
            {t("home")}
          </Link>
        </li>
        <li className={styles.sep} aria-hidden>
          /
        </li>
        <li>
          <Link href={PRECISANDO_INDEX} className={styles.link}>
            {t("precisando")}
          </Link>
        </li>
        <li className={styles.sep} aria-hidden>
          /
        </li>
        <li className={styles.current} aria-current="page">
          {title}
        </li>
      </ol>
    </nav>
  );
}
