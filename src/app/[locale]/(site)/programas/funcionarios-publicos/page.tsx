import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageSeo } from "@/lib/seo";
import { FooterContactLink } from "@/components/FooterContactLink";
import shell from "@/components/programs/ProgramShell.module.css";
import styles from "./FuncionariosPage.module.css";
import { FuncionariosCursoTabs } from "./FuncionariosCursoTabs";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programsFuncionarios" });
  return pageSeo({
    locale,
    pathname: "/programas/funcionarios-publicos",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

type Beneficio = { num: string; title: string; desc: string };
type Paso = { badge: string; title: string; text: string };

export default async function Page() {
  const t = await getTranslations("programsFuncionarios");
  const beneficios = t.raw("beneficios") as Beneficio[];
  const pasos = t.raw("pasos") as Paso[];

  return (
    <div className={shell.page} data-program="funcionarios">
      <header className={shell.hero} aria-labelledby="fp-hero-title">
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>{t("heroEyebrow")}</p>
          <h1 id="fp-hero-title" className={shell.heroTitle}>
            {t("heroTitle").split("\n").map((line, i, lines) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className={shell.heroSub}>{t("heroSub")}</p>
        </div>
      </header>

      <section className={`${shell.queEs} ${shell.padSection}`} aria-labelledby="fp-por-que">
        <div className={shell.inner}>
          <div className={shell.queEsGrid}>
            <div>
              <p className={shell.statWord}>{t("statWord")}</p>
              <p className={shell.statSub}>{t("statSub")}</p>
            </div>
            <div>
              <p id="fp-por-que" className={shell.bodyText}>
                {t("porQue1")}
              </p>
              <p className={shell.bodyText}>{t("porQue2")}</p>
              <p className={shell.bodyText}>{t("porQue3")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${shell.sectionDark} ${shell.padSection}`} aria-labelledby="fp-estructura">
        <div className={shell.inner}>
          <h2 id="fp-estructura" className={shell.secTitleLight}>
            {t("estructuraTitle")}
          </h2>
          <p className={shell.secSubMuted}>{t("estructuraSub")}</p>
          <FuncionariosCursoTabs />
        </div>
      </section>

      <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="fp-beneficios">
        <div className={shell.inner}>
          <h2 id="fp-beneficios" className={`${shell.secTitleDark} ${shell.secTitleDarkSpaced}`}>
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

      <section className={`${shell.sectionDark} ${shell.padSection}`} aria-labelledby="fp-pasos">
        <div className={shell.inner}>
          <p id="fp-pasos" className={styles.pasosLead}>
            {t("pasosLead")}
          </p>
          <div className={styles.pasosGrid}>
            {pasos.map((p) => (
              <div key={p.badge} className={styles.pasoCol}>
                <p className={styles.pasoBadge}>{p.badge}</p>
                <h3 className={styles.pasoTitle}>{p.title}</h3>
                <p className={styles.pasoText}>{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={shell.cta} aria-labelledby="fp-cta-title">
        <div className={shell.ctaInner}>
          <div>
            <h2 id="fp-cta-title" className={shell.ctaTitle}>
              {t("ctaTitle")}
            </h2>
          </div>
          <div className={shell.ctaRight}>
            <p className={shell.ctaAside}>{t("ctaAside")}</p>
            <FooterContactLink className={shell.ctaBtn}>{t("collaborateCta")}</FooterContactLink>
          </div>
        </div>
      </section>
    </div>
  );
}
