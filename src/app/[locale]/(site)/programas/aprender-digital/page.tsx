import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import shell from "@/components/programs/ProgramShell.module.css";
import { pageSeo } from "@/lib/seo";

type CardItem = { titulo: string; desc: string };

const MODULO_COLORS = ["#DB5227", "#023661", "#DB5227", "#023661"];

function IconModulo({ color }: { color: string }) {
  return (
    <svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect width={22} height={22} fill={color} />
      <rect x={26} width={22} height={22} fill={color} opacity={0.5} />
      <rect y={26} width={22} height={22} fill={color} opacity={0.5} />
      <rect x={26} y={26} width={22} height={22} fill={color} />
    </svg>
  );
}

function IconImpacto({ index }: { index: number }) {
  const colors = ["#DB5227", "#023661", "#DB5227", "#023661"];
  const c = colors[index % colors.length]!;
  return (
    <svg width={48} height={48} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <circle cx={24} cy={24} r={24} fill={c} opacity={0.15} />
      <circle cx={24} cy={24} r={14} fill={c} />
    </svg>
  );
}

const cardBody: CSSProperties = {
  fontFamily: "'Avenir Next', 'Avenir', sans-serif",
  fontSize: "1.1875rem",
  lineHeight: 1.65,
  color: "color-mix(in oklab, #0a0a0a 72%, transparent)",
  margin: 0,
};

const sectionPad: CSSProperties = {
  padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 6vw, 4rem)",
};

const gridFineLines: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
  gap: "1px",
  background: "rgba(10,12,18,0.08)",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "programPages.aprenderDigital" });
  return pageSeo({
    locale,
    pathname: "/programas/aprender-digital",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function AprenderDigitalPage() {
  const t = await getTranslations("programPages.aprenderDigital");
  const tShared = await getTranslations("programPages.shared");
  const modulos = t.raw("modulos") as CardItem[];
  const contextParas = t.raw("contextParas") as string[];
  const impactos = t.raw("impactos") as CardItem[];
  const metodologia = t.raw("metodologia") as CardItem[];

  return (
    <main className={shell.page} data-program="aprender">
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

      <section style={{ background: "#F5F2EC", ...sectionPad }}>
        <p
          style={{
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#DB5227",
            margin: "0 0 1rem",
          }}
        >
          {t("objectivesEyebrow")}
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#0A0C12", margin: "0 0 0.75rem" }}>
          {t("objectivesTitleLine1")}
          <br />
          {t("objectivesTitleLine2")}
        </h2>
        <p
          style={{
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "clamp(14px, 1.4vw, 17px)",
            color: "rgba(10,12,18,0.6)",
            lineHeight: 1.75,
            margin: "0 0 3rem",
            maxWidth: 560,
          }}
        >
          {t("objectivesIntro")}
        </p>
        <div style={gridFineLines}>
          {modulos.map((mod, i) => (
            <div
              key={mod.titulo}
              style={{
                background: "#F5F2EC",
                padding: "2rem",
                borderLeft: "3px solid #DB5227",
                borderRadius: 4,
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <IconModulo color={MODULO_COLORS[i % MODULO_COLORS.length]!} />
              </div>
              <p className={shell.programCardTitle} style={{ color: "#0A0C12", margin: "0 0 10px" }}>
                {mod.titulo}
              </p>
              <p style={cardBody}>{mod.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#0A0C12", ...sectionPad }}>
        <div style={{ maxWidth: 720 }}>
          {contextParas.map((text, i) => (
            <p
              key={i}
              style={{
                fontFamily: "'Avenir Next', 'Avenir', sans-serif",
                fontSize: "clamp(14px, 1.4vw, 17px)",
                lineHeight: 1.75,
                color: i === 0 ? "#F5F2EC" : "rgba(245,242,236,0.65)",
                marginBottom: "1.25rem",
              }}
            >
              {text}
            </p>
          ))}
        </div>
      </section>

      <section style={{ background: "#F5F2EC", ...sectionPad }}>
        <p
          style={{
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#DB5227",
            margin: "0 0 1rem",
          }}
        >
          {t("impactEyebrow")}
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#0A0C12", margin: "0 0 0.75rem" }}>
          {t("impactTitleLine1")}
          <br />
          {t("impactTitleLine2")}
        </h2>
        <p
          style={{
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "clamp(14px, 1.4vw, 17px)",
            color: "rgba(10,12,18,0.6)",
            lineHeight: 1.75,
            margin: "0 0 3rem",
            maxWidth: 560,
          }}
        >
          {t("impactIntro")}
        </p>
        <div style={gridFineLines}>
          {impactos.map((imp, i) => (
            <div
              key={imp.titulo}
              style={{
                background: "#F5F2EC",
                padding: "2rem",
                borderLeft: "3px solid #DB5227",
                borderRadius: 4,
              }}
            >
              <div style={{ marginBottom: "1rem" }}>
                <IconImpacto index={i} />
              </div>
              <p className={shell.programCardTitle} style={{ color: "#0A0C12", margin: "0 0 10px" }}>
                {imp.titulo}
              </p>
              <p style={cardBody}>{imp.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#DB5227", ...sectionPad }}>
        <p
          style={{
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(245,242,236,0.6)",
            margin: "0 0 1rem",
          }}
        >
          {t("methodologyEyebrow")}
        </p>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 3rem" }}>
          {t("methodologyTitleLine1")}
          <br />
          {t("methodologyTitleLine2")}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
            gap: "1px",
            background: "rgba(245,242,236,0.08)",
          }}
        >
          {metodologia.map((met) => (
            <div
              key={met.titulo}
              style={{
                background: "#F5F2EC",
                padding: "2rem",
                borderLeft: "3px solid #DB5227",
                borderRadius: 4,
              }}
            >
              <p className={shell.programCardTitle} style={{ color: "#0A0C12", margin: "0 0 10px" }}>
                {met.titulo}
              </p>
              <p style={cardBody}>{met.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: "#023661", ...sectionPad }}>
        <h2 className={shell.programSectionTitle} style={{ color: "#F5F2EC", margin: "0 0 1.5rem" }}>
          {t("ctaTitleLine1")}
          <br />
          {t("ctaTitleLine2")}
        </h2>
        <p
          style={{
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "clamp(14px, 1.4vw, 17px)",
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
            background: "#DB5227",
            color: "#F5F2EC",
            fontFamily: "'Avenir Next', 'Avenir', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "14px 28px",
            textDecoration: "none",
            borderRadius: 4,
            transition: "opacity 0.2s ease",
          }}
        >
          {tShared("collaborateCta")}
        </a>
      </section>
    </main>
  );
}
