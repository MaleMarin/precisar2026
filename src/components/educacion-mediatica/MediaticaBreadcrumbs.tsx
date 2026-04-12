"use client";

import { usePathname as useNextPathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "@/components/programs/ProgramBreadcrumbs.module.css";

const MEDIATICA_ROOTS = ["educacion-mediatica", "educaciónmediática"] as const;

const MEDIATICA_PAGE_SLUGS = [
  "comunicacion",
  "educacion",
  "tecnologia",
  "cultura",
  "propuesta-politica-alfabetizacion",
  "ami-vs-alfabetizacion-digital",
] as const;

type MediaticaPageSlug = (typeof MEDIATICA_PAGE_SLUGS)[number];

function isMediaticaPageSlug(s: string): s is MediaticaPageSlug {
  return (MEDIATICA_PAGE_SLUGS as readonly string[]).includes(s);
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

function mediaticaRootIndex(parts: readonly string[]): number {
  return parts.findIndex((p) => (MEDIATICA_ROOTS as readonly string[]).includes(p));
}

export function MediaticaBreadcrumbs() {
  const t = useTranslations("mediaticaBreadcrumbs");
  const raw = useNextPathname() || "/";
  const pathname = stripLeadingLocale(raw).replace(/\/$/, "") || "/";
  const parts = pathname.split("/").filter(Boolean);

  const rootIdx = mediaticaRootIndex(parts);
  if (rootIdx === -1) return null;

  const after = parts.slice(rootIdx + 1);
  if (after.length === 0) return null;

  const slug = after[0]!;
  if (!isMediaticaPageSlug(slug)) return null;

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
          <Link href="/#educacion-mediatica" className={styles.link}>
            {t("mediatica")}
          </Link>
        </li>
        <li className={styles.sep} aria-hidden>
          /
        </li>
        <li className={styles.current} aria-current="page">
          {t(`slugs.${slug}`)}
        </li>
      </ol>
    </nav>
  );
}
