import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import shell from "@/components/programs/ProgramShell.module.css";
import { absoluteLocaleUrl, hreflangAlternates, SITE } from "@/lib/site";

function ogLocaleTag(locale: string): string {
  if (locale === "pt") return "pt_BR";
  if (locale === "en") return "en_US";
  return "es_CL";
}

type CardItem = { titulo: string; desc: string };
type ModuloItem = { id: string; label: string; desc: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programPages.docentes" });
  const canonical = absoluteLocaleUrl(locale, "/programas/educacion-mediatica-digital-para-docentes");
  const title = t("metaTitle");
  const description = t("metaDescription");
  return {
    title,
    description,
    alternates: {
      canonical,
      languages: hreflangAlternates("/programas/educacion-mediatica-digital-para-docentes"),
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

export default async function DocentesPage() {
  const t = await getTranslations("programPages.docentes");
  const tShared = await getTranslations("programPages.shared");
  const objetivos = t.raw("objetivos") as CardItem[];
  const beneficios = t.raw("beneficios") as CardItem[];
  const metodologia = t.raw("metodologia") as CardItem[];
  const modulos = t.raw("modulos") as ModuloItem[];

  return (
    <main className={shell.page} data-program="leer-noticias">
      <section className={shell.hero}>
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>{t("heroEyebrow")}</p>
          <h1 className={shell.heroTitle}>
            {t("heroTitleLine1")}
            <br />
            {t("heroTitleLine2")}
          </h1>
          <p className={shell.heroSub}>{t("heroSub")}</p>
        </div>
      </section>

      <section
        style={{
          background: "#F5F2EC",
          padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
        }}
      >
        <p
          style={{
            fontFamily: "'Avenir Next','Avenir',sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#DB5227",
            margin: "0 0 1.5rem",
          }}
        >
          {t("objectivesEyebrow")}
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#0A0C12", margin: "0 0 3rem" }}>
          {t("objectivesTitleLine1")}
          <br />
          {t("objectivesTitleLine2")}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1px",
            background: "rgba(10,12,18,0.08)",
          }}
        >
          {objetivos.map((obj) => (
            <div
              key={obj.titulo}
              style={{
                background: "#F5F2EC",
                padding: "2rem",
                borderLeft: "3px solid #DB5227",
              }}
            >
              <p className={shell.programCardTitle} style={{ color: "#0A0C12", margin: "0 0 10px" }}>
                {obj.titulo}
              </p>
              <p
                style={{
                  fontFamily: "'Avenir Next','Avenir',sans-serif",
                  fontSize: "clamp(14px,1.4vw,17px)",
                  color: "rgba(10,12,18,0.6)",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {obj.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "#023661",
          padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
        }}
      >
        <p
          style={{
            fontFamily: "'Avenir Next','Avenir',sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#DB5227",
            margin: "0 0 1.5rem",
          }}
        >
          {t("benefitsEyebrow")}
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 0.75rem" }}>
          {t("benefitsTitleLine1")}
          <br />
          {t("benefitsTitleLine2")}
        </h2>
        <p
          style={{
            fontFamily: "'Avenir Next','Avenir',sans-serif",
            fontSize: "clamp(14px,1.4vw,17px)",
            color: "rgba(245,242,236,0.65)",
            lineHeight: 1.75,
            margin: "0 0 3rem",
            maxWidth: 640,
          }}
        >
          {t("benefitsIntro")}
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1px",
            background: "rgba(245,242,236,0.08)",
          }}
        >
          {beneficios.map((b) => (
            <div
              key={b.titulo}
              style={{
                background: "#023661",
                padding: "2rem",
              }}
            >
              <p className={shell.programCardTitle} style={{ color: "#F5F2EC", margin: "0 0 10px" }}>
                {b.titulo}
              </p>
              <p
                style={{
                  fontFamily: "'Avenir Next','Avenir',sans-serif",
                  fontSize: "clamp(14px,1.4vw,17px)",
                  color: "rgba(245,242,236,0.65)",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "#DB5227",
          padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
        }}
      >
        <p
          style={{
            fontFamily: "'Avenir Next','Avenir',sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(245,242,236,0.6)",
            margin: "0 0 1.5rem",
          }}
        >
          {t("methodologyEyebrow")}
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 3rem" }}>
          {t("methodologyTitleLine1")}
          <br />
          {t("methodologyTitleLine2")}
        </h2>
        <div className={shell.methodologyGrid}>
          {metodologia.map((met) => (
            <div
              key={met.titulo}
              style={{
                background: "#F5F2EC",
                padding: "2rem",
                borderLeft: "3px solid #DB5227",
                minWidth: 0,
              }}
            >
              <p className={shell.programCardTitle} style={{ color: "#0A0C12", margin: "0 0 10px" }}>
                {met.titulo}
              </p>
              <p
                style={{
                  fontFamily: "'Avenir Next','Avenir',sans-serif",
                  fontSize: "clamp(14px,1.4vw,17px)",
                  color: "rgba(10,12,18,0.6)",
                  lineHeight: 1.75,
                  margin: 0,
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                  wordBreak: "normal",
                  hyphens: "manual",
                }}
              >
                {met.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "#0A0C12",
          padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
        }}
      >
        <p
          style={{
            fontFamily: "'Avenir Next','Avenir',sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#DB5227",
            margin: "0 0 1.5rem",
          }}
        >
          {t("modulesEyebrow")}
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 0.75rem" }}>
          {t("modulesTitleLine1")}
          <br />
          {t("modulesTitleLine2")}
        </h2>
        <p
          style={{
            fontFamily: "'Avenir Next','Avenir',sans-serif",
            fontSize: "clamp(14px,1.4vw,17px)",
            color: "rgba(245,242,236,0.55)",
            lineHeight: 1.75,
            margin: "0 0 3rem",
            maxWidth: 560,
          }}
        >
          {t("modulesIntro")}
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1px",
            background: "rgba(245,242,236,0.06)",
          }}
        >
          {modulos.map((mod, i) => (
            <div
              key={mod.id}
              style={{
                background: "#0A0C12",
                padding: "2rem",
                display: "grid",
                gridTemplateColumns: "280px 1fr",
                gap: "2rem",
                alignItems: "start",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "'Avenir Next','Avenir',sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#DB5227",
                    margin: "0 0 6px",
                  }}
                >
                  {t("moduleLabel", { n: String(i + 1).padStart(2, "0") })}
                </p>
                <p className={shell.programCardTitle} style={{ color: "#F5F2EC", margin: 0 }}>
                  {mod.label}
                </p>
              </div>
              <p
                style={{
                  fontFamily: "'Avenir Next','Avenir',sans-serif",
                  fontSize: "clamp(14px,1.4vw,17px)",
                  color: "rgba(245,242,236,0.65)",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {mod.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section
        style={{
          background: "#DB5227",
          padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
        }}
      >
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 1.5rem" }}>
          {t("ctaTitleLine1")}
          <br />
          {t("ctaTitleLine2")}
        </h2>
        <p
          style={{
            fontFamily: "'Avenir Next','Avenir',sans-serif",
            fontSize: "clamp(14px,1.4vw,17px)",
            color: "rgba(245,242,236,0.65)",
            lineHeight: 1.75,
            maxWidth: 560,
            margin: "0 0 2.5rem",
          }}
        >
          {t("ctaBody")}
        </p>

        <a
          href="#contacto"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "#F5F2EC",
            color: "#0A0C12",
            fontFamily: "'Avenir Next','Avenir',sans-serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "14px 28px",
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}
        >
          {tShared("collaborateCta")}
        </a>
      </section>
    </main>
  );
}
