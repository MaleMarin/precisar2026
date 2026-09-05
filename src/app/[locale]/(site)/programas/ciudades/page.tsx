import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageSeo } from "@/lib/seo";
import shell from "@/components/programs/ProgramShell.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programsCiudades" });
  return pageSeo({
    locale,
    pathname: "/programas/ciudades",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

type FlexItem = { titulo: string; desc: string };
type Impacto = { titulo: string; desc: string };
type Taller = { id: string; label: string; titulo: string; desc: string; sesiones: string[] };

const bodyTextStyle = {
  fontFamily: "var(--font-sans-family), sans-serif",
  fontSize: "clamp(14px,1.4vw,17px)",
  lineHeight: 1.75,
  color: "rgba(10,12,18,0.6)",
} as const;

const eyebrowStyle = {
  fontFamily: "var(--font-sans-family), sans-serif",
  fontSize: "11px",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  color: "#DB5227",
  margin: "0 0 1.5rem",
};

export default async function CiudadesPage() {
  const t = await getTranslations("programsCiudades");
  const flexItems = t.raw("flexItems") as FlexItem[];
  const contentItems = t.raw("contentItems") as FlexItem[];
  const impactos = t.raw("impactos") as Impacto[];
  const talleres = t.raw("talleres") as Taller[];

  return (
    <div className={shell.page}>
      <section className={shell.hero}>
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>{t("heroEyebrow")}</p>
          <h1 className={shell.heroTitle}>
            {t("heroTitle").split("\n").map((line, i, lines) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </h1>
          <p className={shell.heroSub}>{t("heroSub")}</p>
        </div>
      </section>

      <section
        className={shell.inner}
        style={{
          background: "#F5F2EC",
          padding: "clamp(3rem,6vw,5rem) clamp(2rem,6vw,4rem)",
        }}
      >
        <div style={{ maxWidth: 720 }}>
          <p style={{ ...bodyTextStyle, marginBottom: "2rem" }}>
            {t("intro1Before")}
            <strong>{t("intro1Strong")}</strong>
            {t("intro1After")}
          </p>
          <p style={bodyTextStyle}>{t("intro2")}</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1px",
            background: "rgba(10,12,18,0.1)",
            marginTop: "3rem",
            maxWidth: 720,
          }}
        >
          {flexItems.map((item) => (
            <div
              key={item.titulo}
              style={{
                background: "#F5F2EC",
                padding: "1.5rem",
              }}
            >
              <p className={shell.programCardTitle} style={{ color: "#0A0C12", margin: "0 0 8px" }}>
                {item.titulo}
              </p>
              <p style={{ ...bodyTextStyle, margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1px",
            background: "rgba(10,12,18,0.1)",
            marginTop: "1px",
            maxWidth: 720,
          }}
        >
          {contentItems.map((item) => (
            <div
              key={item.titulo}
              style={{
                background: "#F5F2EC",
                padding: "1.25rem 1.5rem",
                borderLeft: "3px solid #DB5227",
              }}
            >
              <p className={shell.programCardTitle} style={{ color: "#0A0C12", margin: "0 0 4px" }}>
                {item.titulo}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans-family), sans-serif",
                  fontSize: "clamp(13px,1.2vw,15px)",
                  lineHeight: 1.55,
                  color: "rgba(10,12,18,0.6)",
                  margin: 0,
                }}
              >
                {item.desc}
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
        <p style={eyebrowStyle}>{t("impactosEyebrow")}</p>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 3rem" }}>
          {t("impactosTitle").split("\n").map((line, i, lines) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "1px",
            background: "rgba(245,242,236,0.08)",
          }}
        >
          {impactos.map((imp) => (
            <div
              key={imp.titulo}
              style={{
                background: "#023661",
                padding: "2rem",
                borderBottom: "1px solid rgba(245,242,236,0.08)",
              }}
            >
              <p className={shell.programCardTitle} style={{ color: "#F5F2EC", margin: "0 0 10px" }}>
                {imp.titulo}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans-family), sans-serif",
                  fontSize: "clamp(14px,1.4vw,17px)",
                  color: "rgba(245,242,236,0.65)",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {imp.desc}
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
        <p style={eyebrowStyle}>{t("talleresEyebrow")}</p>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 3rem" }}>
          {t("talleresTitle").split("\n").map((line, i, lines) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "1px",
            background: "rgba(245,242,236,0.08)",
          }}
        >
          {talleres.map((taller) => (
            <div
              key={taller.id}
              style={{
                background: "#0A0C12",
                padding: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-sans-family), sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#DB5227",
                  margin: "0 0 8px",
                }}
              >
                {taller.label}
              </p>
              <h3 className={shell.programCardTitle} style={{ color: "#F5F2EC", margin: "0 0 12px" }}>
                {taller.titulo}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans-family), sans-serif",
                  fontSize: "clamp(14px,1.4vw,17px)",
                  color: "rgba(245,242,236,0.65)",
                  lineHeight: 1.75,
                  margin: "0 0 1.5rem",
                }}
              >
                {taller.desc}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-sans-family), sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(245,242,236,0.35)",
                  margin: "0 0 8px",
                }}
              >
                {t("sesionesIncluidas")}
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: 0,
                }}
              >
                {taller.sesiones.map((s) => (
                  <li
                    key={s}
                    style={{
                      fontFamily: "var(--font-sans-family), sans-serif",
                      fontSize: "clamp(13px,1.2vw,15px)",
                      lineHeight: 1.55,
                      color: "rgba(245,242,236,0.65)",
                      padding: "6px 0",
                      borderBottom: "1px solid rgba(245,242,236,0.06)",
                      display: "flex",
                      gap: "8px",
                      alignItems: "flex-start",
                    }}
                  >
                    <span
                      style={{
                        color: "#DB5227",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                    >
                      →
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
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
          {t("ctaTitle").split("\n").map((line, i, lines) => (
            <span key={i}>
              {line}
              {i < lines.length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans-family), sans-serif",
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
            fontFamily: "var(--font-sans-family), sans-serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "14px 28px",
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}
        >
          {t("collaborateCta")}
        </a>
      </section>
    </div>
  );
}
