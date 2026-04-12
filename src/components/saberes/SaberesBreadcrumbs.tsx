"use client";

import { usePathname as useNextPathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import styles from "@/components/programs/ProgramBreadcrumbs.module.css";

const SABERES_SLUGS = ["recorrido", "recursos", "una-pregunta-al-dia"] as const;

type SaberesSlug = (typeof SABERES_SLUGS)[number];

function isSaberesSlug(s: string): s is SaberesSlug {
  return (SABERES_SLUGS as readonly string[]).includes(s);
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

export function SaberesBreadcrumbs() {
  const t = useTranslations("saberesBreadcrumbs");
  const raw = useNextPathname() || "/";
  const pathname = stripLeadingLocale(raw).replace(/\/$/, "") || "/";
  const parts = pathname.split("/").filter(Boolean);

  const idx = parts.indexOf("saberes");
  if (idx === -1) return null;

  const after = parts.slice(idx + 1);
  if (after.length === 0) return null;

  const slug = after[0]!;
  if (!isSaberesSlug(slug)) return null;

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
          <Link href="/#saberes" className={styles.link}>
            {t("saberes")}
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
