"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import styles from "./ProgramBreadcrumbs.module.css";

const SLUG_KEYS = [
  "ciudades",
  "aprender-digital",
  "leer-noticias-era-digital",
  "funcionarios-publicos",
  "pensamiento-critico",
  "hub-digital-consciente",
] as const;

type ProgramSlug = (typeof SLUG_KEYS)[number];

function isProgramSlug(s: string): s is ProgramSlug {
  return (SLUG_KEYS as readonly string[]).includes(s);
}

export function ProgramBreadcrumbs() {
  const t = useTranslations("programBreadcrumbs");
  const pathname = usePathname();
  const normalized = pathname.replace(/\/$/, "") || "";
  const parts = normalized.split("/").filter(Boolean);
  const idx = parts.indexOf("programas");
  if (idx === -1) return null;
  const after = parts.slice(idx + 1);
  if (after.length === 0) return null;
  const slug = after[0]!;
  if (!isProgramSlug(slug)) return null;

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
          {t(`slugs.${slug}`)}
        </li>
      </ol>
    </nav>
  );
}
