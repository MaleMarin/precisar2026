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

/** Etiqueta legible si aparece un slug nuevo sin clave en mensajes. */
function fallbackSlugLabel(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
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

  /* Ruta canónica corta (nav Saberes), misma sección que /saberes/una-pregunta-al-dia */
  if (parts[0] === "unapreguntaaldia") {
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
            <Link href="/saberes" className={styles.link}>
              {t("saberes")}
            </Link>
          </li>
          <li className={styles.sep} aria-hidden>
            /
          </li>
          <li className={styles.current} aria-current="page">
            {t("slugs.una-pregunta-al-dia")}
          </li>
        </ol>
      </nav>
    );
  }

  const idx = parts.indexOf("saberes");
  if (idx === -1) return null;

  const after = parts.slice(idx + 1);

  /* Índice Saberes: Inicio / Saberes */
  if (after.length === 0) {
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
            {t("saberes")}
          </li>
        </ol>
      </nav>
    );
  }

  const slug = after[0]!;
  const leafLabel = isSaberesSlug(slug) ? t(`slugs.${slug}`) : fallbackSlugLabel(slug);

  /* Subpágina: Inicio / Saberes / … */
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
          <Link href="/saberes" className={styles.link}>
            {t("saberes")}
          </Link>
        </li>
        <li className={styles.sep} aria-hidden>
          /
        </li>
        <li className={styles.current} aria-current="page">
          {leafLabel}
        </li>
      </ol>
    </nav>
  );
}
