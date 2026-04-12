"use client";

import { usePathname as useNextPathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "./ProgramBreadcrumbs.module.css";

/** Slugs canónicos en `messages.*.programBreadcrumbs.slugs` */
const PROGRAMAS_SLUGS = [
  "ciudades",
  "aprender-digital",
  "leer-noticias-era-digital",
  "funcionarios-publicos",
  "pensamiento-critico",
  "hub-digital-consciente",
] as const;

type ProgramasSlug = (typeof PROGRAMAS_SLUGS)[number];

const QUE_HACEMOS_SLUGS = [
  "ciudades",
  "aprender-digital",
  "funcionarios-publicos",
  "hub-digital-consciente",
  "formacion-pensamiento-critico",
] as const;

type QueHacemosSlug = (typeof QUE_HACEMOS_SLUGS)[number];

/** Slug en URL → clave de traducción bajo `slugs.*` */
const SLUG_TO_MSG_KEY: Record<string, ProgramasSlug> = {
  "formacion-pensamiento-critico": "pensamiento-critico",
};

function isProgramasSlug(s: string): s is ProgramasSlug {
  return (PROGRAMAS_SLUGS as readonly string[]).includes(s);
}

function isQueHacemosSlug(s: string): s is QueHacemosSlug {
  return (QUE_HACEMOS_SLUGS as readonly string[]).includes(s);
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

export function ProgramBreadcrumbs() {
  const t = useTranslations("programBreadcrumbs");
  const raw = useNextPathname() || "/";
  const pathname = stripLeadingLocale(raw).replace(/\/$/, "") || "/";
  const parts = pathname.split("/").filter(Boolean);

  const idxProgramas = parts.indexOf("programas");
  const idxQueHacemos = parts.indexOf("que-hacemos");

  let slug: string | null = null;

  if (idxProgramas !== -1) {
    const after = parts.slice(idxProgramas + 1);
    if (after.length === 0) return null;
    const s = after[0]!;
    if (!isProgramasSlug(s)) return null;
    slug = s;
  } else if (idxQueHacemos !== -1) {
    const after = parts.slice(idxQueHacemos + 1);
    if (after.length === 0) return null;
    const s = after[0]!;
    if (!isQueHacemosSlug(s)) return null;
    slug = s;
  } else {
    return null;
  }

  const msgKey = SLUG_TO_MSG_KEY[slug] ?? slug;

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
          <Link href="/#programas" className={styles.link}>
            {t("programas")}
          </Link>
        </li>
        <li className={styles.sep} aria-hidden>
          /
        </li>
        <li className={styles.current} aria-current="page">
          {t(`slugs.${msgKey}`)}
        </li>
      </ol>
    </nav>
  );
}
