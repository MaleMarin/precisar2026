"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./MediaticaEjesNav.module.css";

export type MediaticaEjeSlug = "comunicacion" | "educacion" | "tecnologia" | "cultura";

const EJES: readonly { slug: MediaticaEjeSlug; href: string }[] = [
  { slug: "comunicacion", href: "/educacion-mediatica/comunicacion" },
  { slug: "educacion", href: "/educacion-mediatica/educacion" },
  { slug: "tecnologia", href: "/educacion-mediatica/tecnologia" },
  { slug: "cultura", href: "/educacion-mediatica/cultura" },
] as const;

type MediaticaEjesNavProps = {
  current: MediaticaEjeSlug;
};

export function MediaticaEjesNav({ current }: MediaticaEjesNavProps) {
  const t = useTranslations("mediaticaEjes");

  return (
    <div className={styles.wrap}>
      <nav className={styles.breadcrumb} aria-label={t("ariaBreadcrumb")}>
        <ol>
          <li>
            <Link href="/" className={styles.crumbLink}>
              {t("home")}
            </Link>
          </li>
          <li className={styles.sep} aria-hidden>
            /
          </li>
          <li>
            <Link href="/#educacion-mediatica" className={styles.crumbLink}>
              {t("hub")}
            </Link>
          </li>
          <li className={styles.sep} aria-hidden>
            /
          </li>
          <li className={styles.crumbCurrent} aria-current="page">
            {t(current)}
          </li>
        </ol>
      </nav>

      <nav className={styles.ejes} aria-label={t("ariaSiblings")}>
        <ul>
          {EJES.map(({ slug, href }) => (
            <li key={slug}>
              {slug === current ? (
                <span className={styles.ejeCurrent} aria-current="page">
                  {t(slug)}
                </span>
              ) : (
                <Link href={href} className={styles.ejeLink}>
                  {t(slug)}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
