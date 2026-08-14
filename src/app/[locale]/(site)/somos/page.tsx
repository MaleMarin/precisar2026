import type { Metadata } from "next";
import Image from "next/image";
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
type TeamPerson = { name: string; role: string; photo: string; alt: string };

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
  const howWeWork = t.raw("howWeWork.items") as ListItem[];
  const teamPeople = t.raw("team.people") as TeamPerson[];

  return (
    <article className={styles.page}>
      <header className={styles.hero} aria-labelledby="somos-title">
        <div className={styles.heroInner}>
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

      <section className={`${styles.band} ${styles.bandMist}`} aria-labelledby="somos-como">
        <SomosReveal>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndex} aria-hidden>
                01
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

      <section className={`${styles.band} ${styles.bandCream}`} aria-labelledby="somos-con">
        <SomosReveal>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndexLight} aria-hidden>
                02
              </span>
              <h2 id="somos-con" className={styles.h2}>
                {t("partners.title")}
              </h2>
            </div>
            <p className={styles.prologue}>{t("partners.prologue")}</p>
          </div>
        </SomosReveal>
      </section>

      <section className={`${styles.band} ${styles.bandMist} ${styles.teamBand}`} aria-labelledby="somos-equipo">
        <SomosReveal className={styles.teamReveal}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <span className={styles.sectionIndex} aria-hidden>
                03
              </span>
              <h2 id="somos-equipo" className={styles.h2}>
                {t("team.title")}
              </h2>
            </div>
            <ul className={styles.teamGrid}>
              {teamPeople.map((person) => (
                <li key={person.name} className={styles.teamCard}>
                  <div className={styles.teamPhotoWrap}>
                    <Image
                      src={person.photo}
                      alt={person.alt}
                      width={320}
                      height={320}
                      className={styles.teamPhoto}
                    />
                  </div>
                  <h2 className={styles.teamName}>{person.name}</h2>
                  <p className={styles.teamRole}>{person.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </SomosReveal>
        <blockquote className={styles.teamQuote}>
          <span className={styles.pullQuoteMark} aria-hidden>
            ·
          </span>
          {t("team.phrase")}
        </blockquote>
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
