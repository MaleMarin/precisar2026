import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FooterContactLink } from "@/components/FooterContactLink";
import shell from "@/components/programs/ProgramShell.module.css";
import { absoluteLocaleUrl, hreflangAlternates, SITE } from "@/lib/site";
import styles from "./PensamientoCriticoPage.module.css";

function ogLocaleTag(locale: string): string {
  if (locale === "pt") return "pt_BR";
  if (locale === "en") return "en_US";
  return "es_CL";
}

type ModuloItem = { num: string; title: string; desc: string };
type BeneficioItem = { num: string; title: string; desc: string };
type ModalidadItem = { num: string; title: string; text: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programPages.pensamientoCritico" });
  const canonical = absoluteLocaleUrl(locale, "/programas/pensamiento-critico");
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates("/programas/pensamiento-critico"),
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: ogLocaleTag(locale),
      type: "website",
    },
  };
}

export default async function Page() {
  const t = await getTranslations("programPages.pensamientoCritico");
  const tShared = await getTranslations("programPages.shared");
  const introParas = t.raw("introParas") as string[];
  const modalidades = t.raw("modalidades") as ModalidadItem[];
  const taller1Body = t.raw("taller1Body") as string[];
  const taller1Outcomes = t.raw("taller1Outcomes") as string[];
  const taller1Modulos = t.raw("taller1Modulos") as ModuloItem[];
  const taller2Body = t.raw("taller2Body") as string[];
  const taller2Outcomes = t.raw("taller2Outcomes") as string[];
  const taller2Modulos = t.raw("taller2Modulos") as ModuloItem[];
  const durationPills = t.raw("durationPills") as string[];
  const beneficios = t.raw("beneficios") as BeneficioItem[];
  const ctaSteps = t.raw("ctaSteps") as string[];

  return (
    <article className={shell.page} data-program="pensamiento">
      <header className={shell.hero} aria-labelledby="pc-hero-title">
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>{t("heroEyebrow")}</p>
          <h1 id="pc-hero-title" className={`${shell.heroTitle} ${styles.heroTitleBlock}`}>
            {t("heroTitleLine1")}
            <br />
            {t("heroTitleLine2")}
          </h1>
          <p className={shell.heroSub}>{t("heroSub")}</p>
        </div>
        <aside className={shell.heroStat} aria-hidden="true">
          <p className={shell.heroStatBig}>2</p>
          <p className={shell.heroStatLabel}>{t("heroStatLabel")}</p>
        </aside>
      </header>

      <section className={`${shell.queEs} ${shell.padSection}`} aria-labelledby="pc-que-es">
        <div className={shell.inner}>
          <div className={shell.queEsGrid}>
            <div>
              <p className={shell.statWord}>{t("statWord")}</p>
              <p className={styles.statSubLg}>{t("statSub")}</p>
            </div>
            <div>
              {introParas.map((para, i) => (
                <p key={i} id={i === 0 ? "pc-que-es" : undefined} className={shell.bodyText}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={`${shell.sectionDark} ${shell.padSection}`} aria-labelledby="pc-modalidades">
        <div className={shell.inner}>
          <h2 id="pc-modalidades" className={styles.modalidadesTitle}>
            {t("modalidadesTitle")}
          </h2>
          <div className={styles.modalRow}>
            {modalidades.map((modal) => (
              <article key={modal.num} className={styles.modalCard}>
                <p className={styles.modalNum}>{modal.num}</p>
                <h3 className={styles.modalCardTitle}>{modal.title}</h3>
                <p className={styles.modalCardText}>{modal.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="pc-taller1-title">
        <div className={shell.inner}>
          <p className={styles.workshopEyebrow}>{t("taller1Eyebrow")}</p>
          <h2 id="pc-taller1-title" className={styles.workshopTitle}>
            {t("taller1Title")}
          </h2>
          <p className={styles.workshopKicker}>{t("taller1Kicker")}</p>

          <div className={styles.workshopGrid}>
            <div>
              {taller1Body.map((para, i) => (
                <p key={i} className={styles.workBody}>
                  {para}
                </p>
              ))}
              <p className={styles.outcomesLead}>{t("outcomesLead")}</p>
              <ul className={styles.bulletList}>
                {taller1Outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className={styles.moduleStack}>
                {taller1Modulos.map((m) => (
                  <article key={m.num} className={styles.modCardLight}>
                    <p className={styles.modNum}>{m.num}</p>
                    <h3 className={styles.modTitle}>{m.title}</h3>
                    <p className={styles.modDesc}>{m.desc}</p>
                  </article>
                ))}
              </div>
              <div className={styles.pills}>
                {durationPills.map((pill) => (
                  <span key={pill} className={styles.pillOrange}>
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${shell.sectionDark} ${shell.padSection}`} aria-labelledby="pc-taller2-title">
        <div className={shell.inner}>
          <p className={styles.workshopEyebrow}>{t("taller2Eyebrow")}</p>
          <h2 id="pc-taller2-title" className={`${styles.workshopTitle} ${styles.workshopTitleLight}`}>
            {t("taller2Title")}
          </h2>
          <p className={`${styles.workshopKicker} ${styles.workshopKickerMuted}`}>{t("taller2Kicker")}</p>

          <div className={styles.workshopGrid}>
            <div>
              {taller2Body.map((para, i) => (
                <p key={i} className={`${styles.workBody} ${styles.workBodyLight}`}>
                  {para}
                </p>
              ))}
              <p className={`${styles.outcomesLead} ${styles.outcomesLeadLight}`}>{t("outcomesLead")}</p>
              <ul className={`${styles.bulletList} ${styles.bulletListLight}`}>
                {taller2Outcomes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className={styles.moduleStack}>
                {taller2Modulos.map((m) => (
                  <article key={m.num} className={styles.modCardDark}>
                    <p className={styles.modNum}>{m.num}</p>
                    <h3 className={`${styles.modTitle} ${styles.modTitleLight}`}>{m.title}</h3>
                    <p className={`${styles.modDesc} ${styles.modDescLight}`}>{m.desc}</p>
                  </article>
                ))}
              </div>
              <div className={styles.pills}>
                {durationPills.map((pill) => (
                  <span key={pill} className={styles.pillLight}>
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="pc-beneficios">
        <div className={shell.inner}>
          <h2 id="pc-beneficios" className={styles.beneficiosTitle}>
            {t("beneficiosTitle")}
          </h2>
          <div className={styles.benefGrid}>
            {beneficios.map((b) => (
              <article key={b.num} className={styles.benefCard}>
                <p className={styles.benefNum}>{b.num}</p>
                <h3 className={styles.benefTitle}>{b.title}</h3>
                <p className={styles.benefDesc}>{b.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={shell.cta} aria-labelledby="pc-cta-title">
        <div className={`${shell.ctaInner} ${shell.ctaInnerCiudades}`}>
          <div>
            <h2 id="pc-cta-title" className={styles.ctaTitleTight}>
              {t("ctaTitle")}
            </h2>
            <ul className={styles.ctaStepsPlain}>
              {ctaSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className={shell.ctaText}>{t("ctaBody")}</p>
            <FooterContactLink className={shell.ctaBtn}>{tShared("collaborateCta")}</FooterContactLink>
          </div>
        </div>
      </section>
    </article>
  );
}
