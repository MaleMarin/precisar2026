import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageSeo } from "@/lib/seo";
import shell from "@/components/programs/ProgramShell.module.css";
import HubCylinder from "./HubCylinder";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programsHub" });
  return pageSeo({
    locale,
    pathname: "/programas/hub-digital-consciente",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function Page() {
  const t = await getTranslations("programsHub");

  return (
    <main className={shell.page} data-program="hub">
      <header className={shell.hero} aria-labelledby="hub-hero-title">
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>{t("heroEyebrow")}</p>
          <h1 id="hub-hero-title" className={shell.heroTitle}>
            {t("heroTitle")}
          </h1>
        </div>
      </header>

      <section className={`${shell.queEs} ${shell.padSection}`} aria-labelledby="hub-que-es">
        <div className={shell.inner}>
          <div className={shell.queEsGrid}>
            <div>
              <p className={shell.statWord} lang="es">
                i<wbr />ti<wbr />ne<wbr />ran<wbr />tes.
              </p>
              <p className={shell.statSub}>{t("statSub")}</p>
            </div>
            <div>
              <p id="hub-que-es" className={shell.bodyText}>
                {t("body1")}
              </p>
              <p className={shell.bodyText}>{t("body2")}</p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label={t("interactiveAria")}>
        <HubCylinder />
      </section>

      <section className={shell.cta} aria-labelledby="hub-cta-title">
        <div className={shell.ctaInner} style={{ gridTemplateColumns: "1fr" }}>
          <h2 id="hub-cta-title" className={shell.ctaTitle}>
            {t("ctaTitle")}
          </h2>
        </div>
      </section>
    </main>
  );
}
