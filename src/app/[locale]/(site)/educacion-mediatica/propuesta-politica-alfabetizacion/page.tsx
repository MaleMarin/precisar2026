import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageSeo } from "@/lib/seo";
import { FooterContactLink } from "@/components/FooterContactLink";
import shell from "@/components/programs/ProgramShell.module.css";

const AGE_TAB_INPUT: Record<string, string> = {
  nna: "agendaAmiAgeNna",
  adult: "agendaAmiAgeAdult",
  mayores: "agendaAmiAgeMayores",
};

const AGE_TAB_PANEL: Record<string, string> = {
  nna: "agendaAmiPanelNna",
  adult: "agendaAmiPanelAdult",
  mayores: "agendaAmiPanelMayores",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "propuestaPoliticaAlfabetizacion" });
  return pageSeo({
    locale,
    pathname: "/educacion-mediatica/propuesta-politica-alfabetizacion",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PropuestaPoliticaAlfabetizacionPage() {
  const t = await getTranslations("propuestaPoliticaAlfabetizacion");
  const stats = t.raw("stats") as { num: string; label: string; detail: string }[];
  const amiColumn = t.raw("amiColumn") as {
    title: string;
    sub: string;
    items: string[];
    examplesLabel: string;
    examples: string[];
  };
  const digitalColumn = t.raw("digitalColumn") as typeof amiColumn;
  const tableRows = t.raw("tableRows") as { dim: string; ami: string; dig: string }[];
  const ageTabs = t.raw("ageTabs") as { id: string; label: string; items: string[] }[];
  const nudos = t.raw("nudos") as { num: string; text: string }[];
  const scenarios2030 = t.raw("scenarios2030") as { title: string; sub: string; items: string[] }[];
  const vacioColumns = t.raw("vacioColumns") as { title: string; items: string[] }[];
  const leyMarcoBlocks = t.raw("leyMarcoBlocks") as { strong: string; body: string }[];
  const phases = t.raw("phases") as { title: string; items: string[] }[];
  const recommendations = t.raw("recommendations") as { strong: string; text: string }[];
  const ctaColumns = t.raw("ctaColumns") as string[];
  const collaborateItems = t.raw("collaborateItems") as string[];

  return (
    <>
      <style>{`
        .agendaAmiPage {
          min-inline-size: 0;
          max-inline-size: 100%;
          --ami-void: #0a0c12;
          --ami-navy: #023661;
          --ami-flame: #db5227;
          --ami-cream: #f5f2ec;
          font-family: var(--font-sans-family), system-ui, sans-serif;
          color: var(--ami-void);
          background: var(--ami-cream);
        }
        .agendaAmiPage :where(.amiStatNum, .amiPhaseTitle) {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .agendaAmiPage :where(h3) {
          font-family: var(--font-display), system-ui, sans-serif;
          font-weight: 700;
          letter-spacing: -0.03em;
        }
        .agendaAmiStatGrid {
          display: grid;
          gap: clamp(1.5rem, 3vw, 2.5rem);
          grid-template-columns: minmax(0, 1fr);
          min-inline-size: 0;
          max-inline-size: 100%;
        }
        @media (min-width: 500px) {
          .agendaAmiStatGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (min-width: 900px) {
          .agendaAmiStatGrid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
        .amiStatNum {
          margin: 0;
          font-size: clamp(2.25rem, 4.5vw, 3.25rem);
          line-height: 1.02;
          color: var(--ami-cream);
          min-inline-size: 0;
          max-inline-size: 100%;
        }
        .amiStatLabel {
          margin: 0.5rem 0 0;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.85);
        }
        .amiStatDetail {
          margin: 0.35rem 0 0;
          font-size: 0.9375rem;
          line-height: 1.45;
          color: rgba(245, 242, 236, 0.72);
        }
        .agendaAmiTwoCol {
          display: grid;
          gap: clamp(1.75rem, 4vw, 3rem);
        }
        @media (min-width: 900px) {
          .agendaAmiTwoCol { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .agendaAmiColCard {
          padding: clamp(1.25rem, 3vw, 2rem);
          border: 1px solid rgba(10, 12, 18, 0.08);
          background: #fff;
          min-inline-size: 0;
          max-inline-size: 100%;
          box-sizing: border-box;
        }
        .agendaAmiColCard h3 {
          margin: 0 0 0.35rem;
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 400;
          line-height: 1;
          color: var(--ami-navy);
        }
        .agendaAmiColSub {
          margin: 0 0 1rem;
          font-size: 0.9375rem;
          line-height: 1.5;
          color: rgba(10, 12, 18, 0.6);
        }
        .agendaAmiList {
          margin: 0;
          padding-left: 1.15rem;
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--ami-void);
        }
        .agendaAmiList li + li { margin-top: 0.45rem; }
        .agendaAmiExamples {
          margin: 1.25rem 0 0;
          padding: 1rem 1rem 1rem 1.15rem;
          background: rgba(2, 54, 97, 0.06);
          border-left: 3px solid var(--ami-flame);
        }
        .agendaAmiExamples p {
          margin: 0 0 0.5rem;
          font-size: 0.8125rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ami-navy);
        }
        .agendaAmiExamples ul {
          margin: 0;
          padding-left: 1rem;
          font-size: 0.875rem;
          line-height: 1.55;
        }
        .agendaAmiTableWrap {
          margin-top: clamp(2rem, 4vw, 3rem);
          width: 100%;
          max-inline-size: 100%;
          min-inline-size: 0;
        }
        .agendaAmiTable {
          width: 100%;
          max-inline-size: 100%;
          min-inline-size: 0;
          border-collapse: collapse;
          font-size: 0.9375rem;
          line-height: 1.5;
        }
        .agendaAmiTable th,
        .agendaAmiTable td {
          border: 1px solid rgba(10, 12, 18, 0.12);
          padding: 0.85rem 1rem;
          vertical-align: top;
          text-align: left;
        }
        .agendaAmiTable th {
          background: var(--ami-navy);
          color: var(--ami-cream);
          font-family: var(--font-sans-family), sans-serif;
          font-weight: 600;
          font-size: 0.8125rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .agendaAmiTable td:first-child {
          font-weight: 600;
          background: rgba(245, 242, 236, 0.9);
          width: 11rem;
        }
        @media (max-width: 700px) {
          .agendaAmiTable thead { display: none; }
          .agendaAmiTable,
          .agendaAmiTable tbody,
          .agendaAmiTable tr,
          .agendaAmiTable td {
            display: block;
            width: 100%;
            max-inline-size: 100%;
            min-inline-size: 0;
            box-sizing: border-box;
          }
          .agendaAmiTable tr {
            border: 1px solid rgba(10, 12, 18, 0.12);
            margin-bottom: 0.85rem;
          }
          .agendaAmiTable td {
            border: none;
            border-top: 1px solid rgba(10, 12, 18, 0.08);
          }
          .agendaAmiTable td:first-child {
            width: auto;
            border-top: none;
          }
          .agendaAmiTable td::before {
            content: attr(data-label);
            display: block;
            margin-bottom: 0.35rem;
            font-size: 0.6875rem;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--ami-navy);
          }
        }
        .agendaAmiAgeTabs .agendaAmiPanels .agendaAmiPanel { display: none; }
        #agendaAmiAgeNna:checked ~ .agendaAmiPanels .agendaAmiPanelNna,
        #agendaAmiAgeAdult:checked ~ .agendaAmiPanels .agendaAmiPanelAdult,
        #agendaAmiAgeMayores:checked ~ .agendaAmiPanels .agendaAmiPanelMayores {
          display: block;
        }
        .agendaAmiTabLabels {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: clamp(1.5rem, 3vw, 2.25rem) 0 1.25rem;
        }
        .agendaAmiTabLabels label {
          cursor: pointer;
          padding: 0.65rem 1rem;
          font-size: 0.8125rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(245, 242, 236, 0.65);
          border: 1px solid rgba(245, 242, 236, 0.28);
          transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease;
        }
        .agendaAmiTabLabels label:hover {
          color: var(--ami-cream);
          border-color: rgba(245, 242, 236, 0.5);
        }
        #agendaAmiAgeNna:checked ~ .agendaAmiTabLabels label[for="agendaAmiAgeNna"],
        #agendaAmiAgeAdult:checked ~ .agendaAmiTabLabels label[for="agendaAmiAgeAdult"],
        #agendaAmiAgeMayores:checked ~ .agendaAmiTabLabels label[for="agendaAmiAgeMayores"] {
          color: var(--ami-cream);
          background: rgba(219, 82, 39, 0.35);
          border-color: var(--ami-flame);
        }
        .agendaAmiPanel ul {
          margin: 0;
          padding-left: 1.15rem;
          font-size: 1rem;
          line-height: 1.65;
          color: rgba(245, 242, 236, 0.88);
        }
        .agendaAmiPanel li + li { margin-top: 0.5rem; }
        .agendaAmiNudoGrid {
          display: grid;
          gap: clamp(1.25rem, 3vw, 2rem);
        }
        @media (min-width: 768px) {
          .agendaAmiNudoGrid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        .agendaAmiNudoCard {
          min-inline-size: 0;
          max-inline-size: 100%;
          box-sizing: border-box;
          padding: clamp(1.25rem, 2.5vw, 1.75rem);
          background: rgba(10, 12, 18, 0.12);
          border: 1px solid rgba(245, 242, 236, 0.2);
          font-size: 0.9375rem;
          line-height: 1.55;
          color: var(--ami-cream);
        }
        .agendaAmiNudoCard strong {
          display: block;
          margin-bottom: 0.5rem;
          font-size: 0.8125rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
        }
        .agendaAmi2030 {
          display: grid;
          gap: 0;
        }
        @media (min-width: 900px) {
          .agendaAmi2030 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .agendaAmi2030Col {
          padding: clamp(2rem, 5vw, 4rem);
          min-height: 100%;
          min-inline-size: 0;
          max-inline-size: 100%;
          box-sizing: border-box;
        }
        .agendaAmi2030Col h3 {
          margin: 0 0 0.5rem;
          font-size: clamp(1.75rem, 3vw, 2.5rem);
          line-height: 1.05;
        }
        .agendaAmi2030Col .ami2030Sub {
          margin: 0 0 1.5rem;
          font-size: 1rem;
          line-height: 1.5;
          opacity: 0.78;
        }
        .agendaAmi2030Col ul {
          margin: 0;
          padding-left: 1.15rem;
          font-size: 0.9375rem;
          line-height: 1.65;
        }
        .agendaAmi2030Col li + li { margin-top: 0.55rem; }
        .agendaAmiVacioGrid {
          display: grid;
          gap: clamp(1.75rem, 4vw, 3rem);
        }
        @media (min-width: 900px) {
          .agendaAmiVacioGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .agendaAmiBlockGrid {
          display: grid;
          gap: clamp(1.25rem, 3vw, 2rem);
        }
        @media (min-width: 768px) {
          .agendaAmiBlockGrid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .agendaAmiBlock {
          padding: clamp(1.25rem, 2.5vw, 1.75rem);
          background: rgba(245, 242, 236, 0.08);
          border: 1px solid rgba(245, 242, 236, 0.18);
          font-size: 0.9375rem;
          line-height: 1.6;
          color: rgba(245, 242, 236, 0.92);
        }
        .agendaAmiBlock strong {
          display: block;
          margin-bottom: 0.5rem;
          color: var(--ami-cream);
          font-size: 1rem;
        }
        .agendaAmiFases {
          display: grid;
          gap: clamp(1.5rem, 3vw, 2.5rem);
          min-inline-size: 0;
          max-inline-size: 100%;
        }
        @media (min-width: 900px) {
          .agendaAmiFases { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        .agendaAmiFase {
          padding: clamp(1.25rem, 2.5vw, 1.75rem);
          background: #fff;
          border: 1px solid rgba(10, 12, 18, 0.08);
          min-inline-size: 0;
          max-inline-size: 100%;
          box-sizing: border-box;
        }
        .amiPhaseTitle {
          margin: 0 0 1rem;
          font-size: clamp(1.35rem, 2vw, 1.75rem);
          line-height: 1.1;
          color: var(--ami-navy);
          min-inline-size: 0;
          max-inline-size: 100%;
        }
        @media (max-width: 400px) {
          .amiPhaseTitle { font-size: 1.15rem; }
          .agendaAmiFase { padding: 1rem; }
        }
        .agendaAmiFase ul {
          margin: 0;
          padding-left: 1.1rem;
          font-size: 0.9375rem;
          line-height: 1.6;
        }
        .agendaAmiRecoList {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 1rem;
        }
        @media (min-width: 768px) {
          .agendaAmiRecoList { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        .agendaAmiRecoList li {
          padding: 1rem 1.15rem;
          border: 1px solid rgba(245, 242, 236, 0.15);
          font-size: 0.9375rem;
          line-height: 1.55;
          color: rgba(245, 242, 236, 0.9);
        }
        .agendaAmiRecoList strong { color: var(--ami-cream); }
        .agendaAmiCtaCols {
          display: grid;
          gap: clamp(1.5rem, 3vw, 2rem);
        }
        @media (min-width: 768px) {
          .agendaAmiCtaCols { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        .agendaAmiCtaCols p {
          margin: 0;
          font-size: 0.9375rem;
          line-height: 1.55;
          color: rgba(245, 242, 236, 0.92);
        }
        .agendaAmiAboutCta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 1.5rem;
          padding: 14px 28px;
          background: var(--ami-flame);
          color: var(--ami-cream);
          font-family: var(--font-sans-family), sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .agendaAmiAboutCta:hover { opacity: 0.88; }
        .agendaAmiHeroSub {
          margin: 1.25rem 0 0;
          max-width: 46rem;
          font-family: var(--font-sans-family), sans-serif;
          font-size: 1.1875rem;
          line-height: 1.65;
          color: rgba(245, 242, 236, 0.72);
        }
        .agendaAmiQuote {
          margin: 0 0 clamp(2rem, 4vw, 3rem);
          padding: clamp(1.25rem, 3vw, 2rem);
          border-left: 4px solid var(--ami-flame);
          background: rgba(245, 242, 236, 0.06);
          font-family: var(--font-sans-family), sans-serif;
          font-size: clamp(14px, 1.4vw, 17px);
          line-height: 1.75;
          font-style: normal;
          color: rgba(245, 242, 236, 0.65);
        }
      `}</style>

      <article
        className={`agendaAmiPage ${shell.page}`}
        data-program="ami-chile"
        style={{ ["--program-hero-from" as string]: "#0a0c12" }}
      >
        <header className={shell.hero} style={{ background: "#0a0c12" }}>
          <div className={shell.heroInner}>
            <p className={shell.heroEyebrow}>{t("heroEyebrow")}</p>
            <h1 className={shell.heroTitle} style={{ color: "#f5f2ec" }}>
              {t("heroTitle")}
            </h1>
            <p className="agendaAmiHeroSub">{t("heroSub")}</p>
          </div>
        </header>

        <section
          className={`${shell.padSection}`}
          style={{ background: "#023661", color: "#f5f2ec" }}
          aria-labelledby="agenda-ami-stats-heading"
        >
          <div className={shell.inner}>
            <h2 id="agenda-ami-stats-heading" className={shell.visuallyHidden}>
              {t("statsHeading")}
            </h2>
            <div className="agendaAmiStatGrid">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="amiStatNum">{stat.num}</p>
                  <p className="amiStatLabel">{stat.label}</p>
                  <p className="amiStatDetail">{stat.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${shell.sectionCream} ${shell.padSection}`}
          aria-labelledby="ami-vs-digital-heading"
        >
          <div className={shell.inner}>
            <h2 id="ami-vs-digital-heading" className={shell.secTitleDark}>
              {t("amiVsDigitalTitle")}
            </h2>
            <p className={shell.secSubtitle}>{t("amiVsDigitalSubtitle")}</p>

            <div className="agendaAmiTwoCol">
              <div className="agendaAmiColCard">
                <h3>{amiColumn.title}</h3>
                <p className="agendaAmiColSub">{amiColumn.sub}</p>
                <ul className="agendaAmiList">
                  {amiColumn.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="agendaAmiExamples">
                  <p>{amiColumn.examplesLabel}</p>
                  <ul>
                    {amiColumn.examples.map((ex) => (
                      <li key={ex}>{ex}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="agendaAmiColCard">
                <h3>{digitalColumn.title}</h3>
                <p className="agendaAmiColSub">{digitalColumn.sub}</p>
                <ul className="agendaAmiList">
                  {digitalColumn.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className="agendaAmiExamples">
                  <p>{digitalColumn.examplesLabel}</p>
                  <ul>
                    {digitalColumn.examples.map((ex) => (
                      <li key={ex}>{ex}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="agendaAmiTableWrap">
              <table className="agendaAmiTable">
                <thead>
                  <tr>
                    <th scope="col">{t("tableHeaders.dimension")}</th>
                    <th scope="col">{t("tableHeaders.ami")}</th>
                    <th scope="col">{t("tableHeaders.digital")}</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => (
                    <tr key={row.dim}>
                      <td data-label={t("tableHeaders.dimension")}>{row.dim}</td>
                      <td data-label={t("tableHeaders.ami")}>{row.ami}</td>
                      <td data-label={t("tableHeaders.digital")}>{row.dig}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className={`${shell.sectionDark} ${shell.padSection}`} aria-labelledby="ami-fundamental-heading">
          <div className={`${shell.inner} agendaAmiAgeTabs`}>
            <h2 id="ami-fundamental-heading" className={`${shell.secTitleLight} ${shell.secTitleLightSpaced}`}>
              {t("ageGroupsTitle")}
            </h2>

            {ageTabs.map((tab, i) => (
              <input
                key={tab.id}
                className={shell.visuallyHidden}
                type="radio"
                name="agendaAmiAge"
                id={AGE_TAB_INPUT[tab.id]}
                defaultChecked={i === 0}
              />
            ))}

            <div className="agendaAmiTabLabels" role="tablist" aria-label={t("ageTabsAriaLabel")}>
              {ageTabs.map((tab) => (
                <label key={tab.id} htmlFor={AGE_TAB_INPUT[tab.id]}>
                  {tab.label}
                </label>
              ))}
            </div>

            <div className="agendaAmiPanels">
              {ageTabs.map((tab) => (
                <div
                  key={tab.id}
                  className={`agendaAmiPanel ${AGE_TAB_PANEL[tab.id]}`}
                  role="tabpanel"
                >
                  <ul>
                    {tab.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${shell.padSection}`}
          style={{ background: "#db5227", color: "#f5f2ec" }}
          aria-labelledby="ami-nudos-heading"
        >
          <div className={shell.inner}>
            <h2 id="ami-nudos-heading" className={shell.secTitleLight}>
              {t("nudosTitle")}
            </h2>
            <div className="agendaAmiNudoGrid">
              {nudos.map((nudo) => (
                <div key={nudo.num} className="agendaAmiNudoCard">
                  <strong>{nudo.num}</strong>
                  {nudo.text}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="escenarios-2030-heading">
          <div className={shell.inner}>
            <h2 id="escenarios-2030-heading" className={shell.secTitleDark}>
              {t("scenarios2030Title")}
            </h2>
            <div className="agendaAmi2030">
              <div className="agendaAmi2030Col" style={{ background: "#0a0c12", color: "#f5f2ec" }}>
                <h3>{scenarios2030[0].title}</h3>
                <p className="ami2030Sub">{scenarios2030[0].sub}</p>
                <ul>
                  {scenarios2030[0].items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="agendaAmi2030Col" style={{ background: "#023661", color: "#f5f2ec" }}>
                <h3>{scenarios2030[1].title}</h3>
                <p className="ami2030Sub">{scenarios2030[1].sub}</p>
                <ul>
                  {scenarios2030[1].items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="vacio-normativo-heading">
          <div className={shell.inner}>
            <h2 id="vacio-normativo-heading" className={shell.secTitleDark}>
              {t("vacioTitle")}
            </h2>
            <div className="agendaAmiVacioGrid">
              {vacioColumns.map((col) => (
                <div key={col.title} className="agendaAmiColCard">
                  <h3>{col.title}</h3>
                  <ul className="agendaAmiList">
                    {col.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className={`${shell.padSection}`}
          style={{ background: "#023661", color: "#f5f2ec" }}
          aria-labelledby="ley-marco-heading"
        >
          <div className={shell.inner}>
            <h2 id="ley-marco-heading" className={shell.secTitleLight}>
              {t("leyMarcoTitle")}
            </h2>
            <blockquote className="agendaAmiQuote">{t("leyMarcoQuote")}</blockquote>
            <div className="agendaAmiBlockGrid">
              {leyMarcoBlocks.map((block) => (
                <div key={block.strong} className="agendaAmiBlock">
                  <strong>{block.strong}</strong>
                  {block.body}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="hoja-ruta-heading">
          <div className={shell.inner}>
            <h2 id="hoja-ruta-heading" className={shell.secTitleDark}>
              {t("roadmapTitle")}
            </h2>
            <div className="agendaAmiFases">
              {phases.map((phase) => (
                <div key={phase.title} className="agendaAmiFase">
                  <h3 className="amiPhaseTitle">{phase.title}</h3>
                  <ul>
                    {phase.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${shell.sectionDark} ${shell.padSection}`} aria-labelledby="reco-estrategicas-heading">
          <div className={shell.inner}>
            <h2 id="reco-estrategicas-heading" className={`${shell.secTitleLight} ${shell.secTitleLightSpaced}`}>
              {t("recommendationsTitle")}
            </h2>
            <ol className="agendaAmiRecoList">
              {recommendations.map((reco) => (
                <li key={reco.strong}>
                  <strong>{reco.strong}</strong> {reco.text}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          className={`${shell.padSection}`}
          style={{ background: "#db5227", color: "#f5f2ec" }}
          aria-labelledby="llamado-accion-heading"
        >
          <div className={shell.inner}>
            <h2 id="llamado-accion-heading" className={shell.secTitleLight}>
              {t("ctaTitle")}
            </h2>
            <div className="agendaAmiCtaCols">
              {ctaColumns.map((col) => (
                <p key={col}>{col}</p>
              ))}
            </div>
            <p
              style={{
                marginTop: "clamp(2rem, 4vw, 3rem)",
                maxWidth: "52rem",
                fontSize: "1rem",
                lineHeight: 1.65,
                color: "rgba(245, 242, 236, 0.92)",
              }}
            >
              {t("ctaClosing")}
            </p>
          </div>
        </section>

        <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="sobre-agenda-heading">
          <div className={shell.inner}>
            <h2 id="sobre-agenda-heading" className={shell.secTitleDark}>
              {t("aboutTitle")}
            </h2>
            <p className={shell.bodyText} style={{ maxWidth: "48rem" }}>
              {t("aboutBody")}
            </p>
            <h3
              className={shell.secTitleDark}
              style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "clamp(1.35rem, 2vw, 1.75rem)" }}
            >
              {t("collaborateTitle")}
            </h3>
            <ul className="agendaAmiList" style={{ maxWidth: "40rem" }}>
              {collaborateItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <FooterContactLink className="agendaAmiAboutCta">{t("collaborateCta")}</FooterContactLink>
          </div>
        </section>
      </article>
    </>
  );
}
