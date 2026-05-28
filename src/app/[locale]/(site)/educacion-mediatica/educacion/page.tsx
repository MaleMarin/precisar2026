import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MediaticaEjesNav } from "@/components/educacion-mediatica/MediaticaEjesNav";
import { EducacionMediaticaTabs } from "./EducacionMediaticaTabs";
import styles from "./EducacionInterior.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "educacionMediaticaSeccion.educacion" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function EducacionEducacionMediaticaPage() {
  const tBase = await getTranslations("educacionMediaticaSeccion");
  const t = await getTranslations("educacionMediaticaSeccion.educacion");
  const paras = t.raw("paras") as string[];
  const listItems = t.raw("listItems") as string[];

  return (
    <article className="prec-page">
      <header className={styles.hero}>
        <MediaticaEjesNav current="educacion" />
        <div className={styles.heroGrid}>
          <h1 className={styles.heroTitle}>{t("heroTitle")}</h1>
          <p className={styles.heroIntro}>{t("heroIntro")}</p>
        </div>
      </header>

      <section className={styles.bodySection} aria-label={tBase("ariaContent")}>
        <div className={styles.bodyInner}>
          <h2 className={styles.bodySubhead}>{t("subhead")}</h2>
          {paras.map((p, i) => (
            <p key={i} className={styles.bodyText}>
              {p}
            </p>
          ))}
          <p className={styles.bodyListIntro}>{t("listIntro")}</p>
          <ul className={styles.bodyList}>
            {listItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className={styles.bodyClosing}>{t("closing")}</p>
        </div>
      </section>

      <EducacionMediaticaTabs />
    </article>
  );
}
