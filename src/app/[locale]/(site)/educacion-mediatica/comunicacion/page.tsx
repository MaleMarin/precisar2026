import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MediaticaEjesNav } from "@/components/educacion-mediatica/MediaticaEjesNav";
import { ComunicacionMediaticaTabs } from "./ComunicacionMediaticaTabs";
import styles from "./ComunicacionInterior.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "educacionMediaticaSeccion.comunicacion" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ComunicacionEducacionMediaticaPage() {
  const tBase = await getTranslations("educacionMediaticaSeccion");
  const t = await getTranslations("educacionMediaticaSeccion.comunicacion");
  const paras = t.raw("paras") as string[];
  const listItems = t.raw("listItems") as string[];

  return (
    <article className="prec-page">
      <header className={styles.hero}>
        <MediaticaEjesNav current="comunicacion" />
        <div className={styles.heroGrid}>
          <h1 className={styles.heroTitle}>{t("heroTitle")}</h1>
          <p className={styles.heroIntro}>{t("heroIntro")}</p>
        </div>
      </header>

      <section className={styles.bodySection} aria-label={tBase("ariaContent")}>
        <div className={styles.bodyInner}>
          {paras.map((p, i) => (
            <p key={i} className={styles.bodyText}>
              {p}
            </p>
          ))}
          <p className={styles.bodyLead}>
            <strong>{t("leadBold")}</strong>
            {t("leadRest")}
          </p>
          <ul className={styles.bodyList}>
            {listItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <ComunicacionMediaticaTabs />
    </article>
  );
}
