import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { FooterContactLink } from "@/components/FooterContactLink";
import { absoluteLocaleUrl, hreflangAlternates, SITE } from "@/lib/site";
import { SomosReveal } from "./_components/SomosReveal";
import styles from "./SomosPage.module.css";

function ogLocaleTag(locale: string): string {
  if (locale === "pt") return "pt_BR";
  if (locale === "en") return "en_US";
  return "es_CL";
}

type ListItem = { title: string; body: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "somos" });
  const canonical = absoluteLocaleUrl(locale, "/somos");
  const title = t("pageTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates("/somos"),
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

export default async function SomosPrecisarPage() {
  const t = await getTranslations("somos");
  const intro = t.raw("intro") as string[];
  const problemParas = t.raw("problem.paras") as string[];
  const howWeWork = t.raw("howWeWork.items") as ListItem[];
  const together = t.raw("together.items") as ListItem[];
  const partners = t.raw("partners.items") as string[];
  const outcomes = t.raw("outcomes.items") as string[];
  const approachParas = t.raw("approach.paras") as string[];
  const whyFour = t.raw("why.items") as string[];

  return (
    <article className={styles.page}>
      <header className={styles.hero} aria-labelledby="somos-title">
        <div className={styles.heroInner}>
          <p className={styles.kicker}>{t("kicker")}</p>
          <h1 id="somos-title" className={styles.heroTitle}>
            {t("heroTitle")}
          </h1>
        </div>
      </header>

      <section className={`${styles.band} ${styles.bandCream}`} aria-label={t("introAria")}>
        <SomosReveal>
          <div className={styles.inner}>
            <div className={styles.proseL}>
              {intro.map((p, i) => (
                <p key={i} className={styles.para}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </SomosReveal>
      </section>

      <section className={`${styles.band} ${styles.bandPaper}`} aria-label={t("principleAria")}>
        <SomosReveal>
          <div className={styles.inner}>
            <blockquote className={styles.pullQuote}>
              <span className={styles.pullQuoteMark} aria-hidden>
                ·
              </span>
              {t("principle")}
            </blockquote>
          </div>
        </SomosReveal>
      </section>

      <section className={`${styles.band} ${styles.bandCream}`} aria-labelledby="somos-problema">
        <SomosReveal>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndex} aria-hidden>
                01
              </span>
              <h2 id="somos-problema" className={styles.h2}>
                {t("problem.title")}
              </h2>
            </div>
            <div className={styles.proseM}>
              {problemParas.map((p, i) => (
                <p key={i} className={styles.para}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </SomosReveal>
      </section>

      <section className={`${styles.band} ${styles.bandMist}`} aria-labelledby="somos-como">
        <SomosReveal>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndex} aria-hidden>
                02
              </span>
              <h2 id="somos-como" className={styles.h2}>
                {t("howWeWork.title")}
              </h2>
            </div>
            <ol className={styles.timeline}>
              {howWeWork.map((item, i) => (
                <li key={item.title} className={styles.timelineItem}>
                  <span className={styles.timelineNum} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.timelineBody}>
                    <h3 className={styles.h3}>{item.title}</h3>
                    <p className={styles.para}>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </SomosReveal>
      </section>

      <section className={`${styles.band} ${styles.bandPaper}`} aria-labelledby="somos-juntos">
        <SomosReveal>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndex} aria-hidden>
                03
              </span>
              <h2 id="somos-juntos" className={styles.h2}>
                {t("together.title")}
              </h2>
            </div>
            <ul className={styles.cardGrid}>
              {together.map((item) => (
                <li key={item.title} className={styles.softCard}>
                  <h3 className={styles.h3}>{item.title}</h3>
                  <p className={styles.para}>{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </SomosReveal>
      </section>

      <section className={`${styles.band} ${styles.bandCream}`} aria-labelledby="somos-con">
        <SomosReveal>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndexLight} aria-hidden>
                04
              </span>
              <h2 id="somos-con" className={styles.h2}>
                {t("partners.title")}
              </h2>
            </div>
            <p className={styles.prologue}>{t("partners.prologue")}</p>
            <ul className={styles.pillList}>
              {partners.map((label) => (
                <li key={label}>
                  <span className={styles.pill}>{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </SomosReveal>
      </section>

      <section className={`${styles.band} ${styles.bandPaper}`} aria-labelledby="somos-instalado">
        <SomosReveal>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndex} aria-hidden>
                05
              </span>
              <h2 id="somos-instalado" className={styles.h2}>
                {t("outcomes.title")}
              </h2>
            </div>
            <p className={styles.prologue}>{t("outcomes.prologue")}</p>
            <ul className={styles.outcomeList}>
              {outcomes.map((line) => (
                <li key={line} className={styles.outcomeItem}>
                  <span className={styles.outcomeDot} aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </SomosReveal>
      </section>

      <section className={`${styles.band} ${styles.bandNavy}`} aria-labelledby="somos-enfoque">
        <SomosReveal>
          <div className={styles.innerNarrow}>
            <h2 id="somos-enfoque" className={styles.h2Accent}>
              {t("approach.title")}
            </h2>
            <div className={styles.proseOnAccent}>
              {approachParas.map((p, i) => (
                <p key={i} className={styles.paraOnAccent}>
                  {p}
                </p>
              ))}
            </div>
          </div>
        </SomosReveal>
      </section>

      <section className={`${styles.band} ${styles.bandCream}`} aria-labelledby="somos-porque">
        <SomosReveal>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndex} aria-hidden>
                06
              </span>
              <h2 id="somos-porque" className={styles.h2}>
                {t("why.title")}
              </h2>
            </div>
            <p className={styles.prologue}>{t("why.prologue")}</p>
            <ul className={styles.fourGrid}>
              {whyFour.map((line, i) => (
                <li key={line} className={styles.fourCell}>
                  <span className={styles.fourNum} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className={styles.para}>{line}</p>
                </li>
              ))}
            </ul>
          </div>
        </SomosReveal>
      </section>

      <section className={`${styles.band} ${styles.bandVoid}`} aria-labelledby="somos-hablemos">
        <SomosReveal>
          <div className={styles.ctaInner}>
            <h2 id="somos-hablemos" className={styles.ctaTitle}>
              {t("cta.title")}
            </h2>
            <div className={styles.ctaCol}>
              <p className={styles.ctaBody}>{t("cta.body")}</p>
              <FooterContactLink className={styles.ctaBtn}>{t("cta.button")}</FooterContactLink>
            </div>
          </div>
        </SomosReveal>
      </section>
    </article>
  );
}
