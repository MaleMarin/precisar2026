import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MediaticaEjesNav } from "@/components/educacion-mediatica/MediaticaEjesNav";
import { TecnologiaMediaticaTabs } from "./TecnologiaMediaticaTabs";
import styles from "./TecnologiaInterior.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "educacionMediaticaSeccion.tecnologia" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function TecnologiaEducacionMediaticaPage() {
  const tBase = await getTranslations("educacionMediaticaSeccion");
  const t = await getTranslations("educacionMediaticaSeccion.tecnologia");
  const paras = t.raw("paras") as string[];

  return (
    <article className="prec-page">
      <header className={styles.hero}>
        <MediaticaEjesNav current="tecnologia" />
        <div className={styles.heroGrid}>
          <h1 className={styles.heroTitle}>{t("heroTitle")}</h1>
          <p className={styles.heroIntro}>{t("heroIntro")}</p>
        </div>
      </header>

      <section className={styles.bodySection} aria-label={tBase("ariaContent")}>
        <div className={styles.bodyInner}>
          <p className={styles.bodyOpenBold}>{t("openBold")}</p>
          {paras.map((p, i) => (
            <p key={i} className={styles.bodyText}>
              {p}
            </p>
          ))}
          <p className={styles.bodyClosing}>{t("closing")}</p>
        </div>
      </section>

      <TecnologiaMediaticaTabs />
    </article>
  );
}
