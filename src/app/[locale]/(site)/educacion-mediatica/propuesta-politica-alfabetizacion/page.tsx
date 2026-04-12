import { Bebas_Neue } from "next/font/google";
import type { Metadata } from "next";
import { FooterContactLink } from "@/components/FooterContactLink";
import shell from "@/components/programs/ProgramShell.module.css";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--ami-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agenda AMI-Chile · Propuesta política de alfabetización",
  description:
    "Chile hiperconectado y críticamente desprotegido: agenda para alfabetización mediática e informacional, ley marco, hoja de ruta y recomendaciones estratégicas.",
};

const amiVsDigitalRows = [
  {
    dim: "Foco",
    ami: "Sentido crítico sobre mensajes, fuentes y contextos.",
    dig: "Uso eficiente y seguro de tecnologías y servicios.",
  },
  {
    dim: "Preguntas guía",
    ami: "¿Quién lo dice? ¿con qué evidencia? ¿qué intención tiene?",
    dig: "¿Cómo lo hago? ¿qué botón? ¿qué ajuste de seguridad?",
  },
  {
    dim: "Competencias",
    ami: "Analizar, evaluar, verificar, argumentar, derechos informacionales.",
    dig: "Instalar, configurar, operar, mantener, solucionar problemas.",
  },
  {
    dim: "Ejemplos",
    ami: "Detectar sesgos; verificar una imagen; reconocer desinformación.",
    dig: "Crear una videollamada; cifrar un disco; gestionar contraseñas.",
  },
  {
    dim: "Resultado buscado",
    ami: "Pensamiento crítico y ciudadanía informada.",
    dig: "Autonomía técnica y seguridad operativa.",
  },
] as const;

export default function PropuestaPoliticaAlfabetizacionPage() {
  return (
    <>
      <style>{`
        .agendaAmiPage {
          --ami-void: #0a0c12;
          --ami-navy: #023661;
          --ami-flame: #db5227;
          --ami-cream: #f5f2ec;
          font-family: "Avenir Next", "Avenir", var(--font-sans-family), system-ui, sans-serif;
          color: var(--ami-void);
          background: var(--ami-cream);
        }
        .agendaAmiPage :where(h1, h2, h3, .amiStatNum, .amiPhaseTitle) {
          font-family: var(--ami-bebas), "Bebas Neue", sans-serif;
          font-weight: 400;
          letter-spacing: 0.02em;
        }
        .agendaAmiStatGrid {
          display: grid;
          gap: clamp(1.5rem, 3vw, 2.5rem);
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        @media (min-width: 900px) {
          .agendaAmiStatGrid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
        }
        .amiStatNum {
          margin: 0;
          font-size: clamp(2.5rem, 5vw, 3.75rem);
          line-height: 1;
          color: var(--ami-cream);
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
        }
        .agendaAmiColCard h3 {
          margin: 0 0 0.35rem;
          font-size: clamp(1.5rem, 2.2vw, 2rem);
          line-height: 1.1;
          color: var(--ami-navy);
        }
        .agendaAmiColSub {
          margin: 0 0 1rem;
          font-size: 0.9375rem;
          line-height: 1.5;
          color: #3f3a42;
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
          font-weight: 700;
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
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .agendaAmiTable {
          width: 100%;
          min-width: 560px;
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
          font-family: "Avenir Next", "Avenir", var(--font-sans-family), sans-serif;
          font-weight: 700;
          font-size: 0.8125rem;
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        .agendaAmiTable td:first-child {
          font-weight: 600;
          background: rgba(245, 242, 236, 0.9);
          width: 11rem;
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
        }
        @media (min-width: 900px) {
          .agendaAmiFases { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        .agendaAmiFase {
          padding: clamp(1.25rem, 2.5vw, 1.75rem);
          background: #fff;
          border: 1px solid rgba(10, 12, 18, 0.08);
        }
        .amiPhaseTitle {
          margin: 0 0 1rem;
          font-size: clamp(1.35rem, 2vw, 1.75rem);
          line-height: 1.1;
          color: var(--ami-navy);
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
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.2s ease;
        }
        .agendaAmiAboutCta:hover { opacity: 0.88; }
        .agendaAmiHeroSub {
          margin: 1.25rem 0 0;
          max-width: 46rem;
          font-size: clamp(1rem, 1.35vw, 1.125rem);
          line-height: 1.6;
          color: rgba(245, 242, 236, 0.82);
        }
        .agendaAmiQuote {
          margin: 0 0 clamp(2rem, 4vw, 3rem);
          padding: clamp(1.25rem, 3vw, 2rem);
          border-left: 4px solid var(--ami-flame);
          background: rgba(245, 242, 236, 0.06);
          font-size: clamp(1.05rem, 1.6vw, 1.2rem);
          line-height: 1.55;
          font-style: italic;
          color: rgba(245, 242, 236, 0.92);
        }
      `}</style>

      <article
        className={`agendaAmiPage ${shell.page} ${bebas.variable}`}
        data-program="ami-chile"
        style={{ ["--program-hero-from" as string]: "#0a0c12" }}
      >
        <header className={shell.hero} style={{ background: "#0a0c12" }}>
          <div className={shell.heroInner}>
            <p className={shell.heroEyebrow}>Agenda AMI · Chile</p>
            <h1 className={shell.heroTitle} style={{ color: "#f5f2ec" }}>
              Chile está hiperconectado, pero críticamente desprotegido
            </h1>
            <p className="agendaAmiHeroSub">
              Agenda AMI-Chile nace para sensibilizar a tomadores de decisión y medios de comunicación sobre un
              desafío que ya es estructural: cómo nos relacionamos con la inteligencia artificial, los algoritmos y la
              sobreexposición informativa con criterios, no solo con conexión. Porque decidir qué es lo correcto siempre
              será nuestra responsabilidad.
            </p>
          </div>
        </header>

        <section
          className={`${shell.padSection}`}
          style={{ background: "#023661", color: "#f5f2ec" }}
          aria-labelledby="agenda-ami-stats-heading"
        >
          <div className={shell.inner}>
            <h2 id="agenda-ami-stats-heading" className={shell.visuallyHidden}>
              Datos clave
            </h2>
            <div className="agendaAmiStatGrid">
              <div>
                <p className="amiStatNum">96,5%</p>
                <p className="amiStatLabel">Conectividad</p>
                <p className="amiStatDetail">↑ desde 87% en 2018</p>
              </div>
              <div>
                <p className="amiStatNum">5 millones</p>
                <p className="amiStatLabel">Sin habilidades funcionales</p>
                <p className="amiStatDetail">≈ 28% de la población</p>
              </div>
              <div>
                <p className="amiStatNum">50%+</p>
                <p className="amiStatLabel">Competencias críticas insuficientes</p>
                <p className="amiStatDetail">adultos — tendencia al alza</p>
              </div>
              <div>
                <p className="amiStatNum">29%</p>
                <p className="amiStatLabel">Fraudes a personas mayores</p>
                <p className="amiStatDetail">reportado en 2024</p>
              </div>
            </div>
          </div>
        </section>

        <section
          className={`${shell.sectionCream} ${shell.padSection}`}
          aria-labelledby="ami-vs-digital-heading"
        >
          <div className={shell.inner}>
            <h2 id="ami-vs-digital-heading" className={shell.secTitleDark}>
              ¿En qué se diferencian la Alfabetización Mediática e Informacional y la Alfabetización Digital?
            </h2>
            <p className={shell.secSubtitle}>
              Para entender AMI, primero es muy importante entender la diferencia entre la Alfabetización Digital y la
              Alfabetización Mediática e Informacional
            </p>

            <div className="agendaAmiTwoCol">
              <div className="agendaAmiColCard">
                <h3>AMI · Alfabetización Mediática e Informacional</h3>
                <p className="agendaAmiColSub">Capacidades críticas sobre medios, mensajes y fuentes.</p>
                <ul className="agendaAmiList">
                  <li>Analizar cómo se construye una noticia y distinguir opinión de hecho.</li>
                  <li>Evaluar la credibilidad de una fuente y detectar publicidad nativa.</li>
                  <li>Verificar con varias fuentes y entender sesgos/algoritmos.</li>
                  <li>Derechos: acceso, autoría, privacidad, libertad de expresión, uso justo.</li>
                </ul>
                <div className="agendaAmiExamples">
                  <p>Ejemplos</p>
                  <ul>
                    <li>Detectar deepfakes en campaña</li>
                    <li>Identificar titulares clickbait</li>
                    <li>Comprobar autoría y fecha</li>
                  </ul>
                </div>
              </div>

              <div className="agendaAmiColCard">
                <h3>Alfabetización Digital</h3>
                <p className="agendaAmiColSub">Habilidades técnicas y operativas con dispositivos y apps.</p>
                <ul className="agendaAmiList">
                  <li>Usar correo, videollamadas, hojas de cálculo, gestores de archivos.</li>
                  <li>Configurar seguridad: contraseñas, 2FA, copias de seguridad.</li>
                  <li>Administrar privacidad y permisos en redes y móviles.</li>
                  <li>Resolver problemas básicos de software/hardware.</li>
                </ul>
                <div className="agendaAmiExamples">
                  <p>Ejemplos</p>
                  <ul>
                    <li>Activar 2FA en tus cuentas</li>
                    <li>Compartir un Drive con permisos</li>
                    <li>Limpiar malware del PC</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="agendaAmiTableWrap">
              <table className="agendaAmiTable">
                <thead>
                  <tr>
                    <th scope="col">Dimensión</th>
                    <th scope="col">AMI</th>
                    <th scope="col">Alfabetización Digital</th>
                  </tr>
                </thead>
                <tbody>
                  {amiVsDigitalRows.map((row) => (
                    <tr key={row.dim}>
                      <td>{row.dim}</td>
                      <td>{row.ami}</td>
                      <td>{row.dig}</td>
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
              ¿Por qué AMI es fundamental para Chile en cada grupo etario?
            </h2>

            <input
              className={shell.visuallyHidden}
              type="radio"
              name="agendaAmiAge"
              id="agendaAmiAgeNna"
              defaultChecked
            />
            <input className={shell.visuallyHidden} type="radio" name="agendaAmiAge" id="agendaAmiAgeAdult" />
            <input className={shell.visuallyHidden} type="radio" name="agendaAmiAge" id="agendaAmiAgeMayores" />

            <div className="agendaAmiTabLabels" role="tablist" aria-label="Grupo etario">
              <label htmlFor="agendaAmiAgeNna">Niños, Niñas y Adolescentes</label>
              <label htmlFor="agendaAmiAgeAdult">Personas adultas</label>
              <label htmlFor="agendaAmiAgeMayores">Personas mayores</label>
            </div>

            <div className="agendaAmiPanels">
              <div className="agendaAmiPanel agendaAmiPanelNna" role="tabpanel">
                <ul>
                  <li>Conectividad: 80% con plan de datos propio</li>
                  <li>Bienestar: 53% con soledad digital</li>
                  <li>Desinformación: 63% creyó noticias falsas</li>
                  <li>Exposición: 27% vio contenidos violentos</li>
                  <li>Contacto con extraños: 40% contactado; 48% interactúa</li>
                  <li>Conductas: 23% admite insultar por mensajes</li>
                </ul>
              </div>
              <div className="agendaAmiPanel agendaAmiPanelAdult" role="tabpanel">
                <ul>
                  <li>Comprensión crítica: 44%+ sin base</li>
                  <li>Doble brecha: Sin herramientas y sin criterio</li>
                  <li>Efectos: Desinformación / exclusión</li>
                </ul>
              </div>
              <div className="agendaAmiPanel agendaAmiPanelMayores" role="tabpanel">
                <ul>
                  <li>Motivación: 82% quiere aprender</li>
                  <li>Digitalización: 66% para no quedar aislados</li>
                  <li>Riesgos: 29% reporta fraudes</li>
                  <li>Usabilidad: Plataformas poco amigables</li>
                </ul>
              </div>
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
              Tres nudos críticos a resolver en Chile sobre AMI
            </h2>
            <div className="agendaAmiNudoGrid">
              <div className="agendaAmiNudoCard">
                <strong>1</strong>
                CONFUSIÓN CONCEPTUAL — AMI reducida a uso de herramientas (alfabetización digital) en vez de
                pensamiento crítico sobre información y medios.
              </div>
              <div className="agendaAmiNudoCard">
                <strong>2</strong>
                FRAGMENTACIÓN INSTITUCIONAL — 35+ actores valiosos pero sin coordinación ni gobernanza conjunta.
              </div>
              <div className="agendaAmiNudoCard">
                <strong>3</strong>
                BRECHAS ETARIAS — Cada grupo (NNA, adultos, mayores) requiere enfoques diferenciados.
              </div>
            </div>
          </div>
        </section>

        <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="escenarios-2030-heading">
          <div className={shell.inner}>
            <h2 id="escenarios-2030-heading" className={shell.secTitleDark}>
              Escenarios 2030 para Chile
            </h2>
            <div className="agendaAmi2030">
              <div className="agendaAmi2030Col" style={{ background: "#0a0c12", color: "#f5f2ec" }}>
                <h3>El costo de la inacción</h3>
                <p className="ami2030Sub">La sociedad algorítmica chilena sin brújula crítica.</p>
                <ul>
                  <li>
                    Erosión democrática: decisiones manipuladas por deepfakes y micro-targeting opaco.
                  </li>
                  <li>
                    Vulnerabilidad masiva: estafas con IA generativa afectan especialmente a personas mayores.
                  </li>
                  <li>Pérdida de soberanía informativa: dependencia de plataformas extranjeras sin transparencia.</li>
                  <li>Fractura social: brechas digitales no resueltas.</li>
                  <li>Precariedad laboral: reemplazo sin reconversión.</li>
                </ul>
              </div>
              <div className="agendaAmi2030Col" style={{ background: "#023661", color: "#f5f2ec" }}>
                <h3>La oportunidad de la acción</h3>
                <p className="ami2030Sub">La sociedad chilena digitalmente empoderada.</p>
                <ul>
                  <li>Democracia fortalecida: ciudadanía que identifica manipulación y debate con evidencia.</li>
                  <li>Innovación social: comunidades que usan IA para salud, educación y medio ambiente.</li>
                  <li>Inclusión intergeneracional: mayores autónomos; jóvenes responsables.</li>
                  <li>Economía del conocimiento: trabajo colaborativo con IA y emprendimiento.</li>
                  <li>Liderazgo regional: Chile como referente iberoamericano.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="vacio-normativo-heading">
          <div className={shell.inner}>
            <h2 id="vacio-normativo-heading" className={shell.secTitleDark}>
              Vacío normativo crítico en Chile
            </h2>
            <div className="agendaAmiVacioGrid">
              <div className="agendaAmiColCard">
                <h3>Estado actual de la legislación chilena</h3>
                <ul className="agendaAmiList">
                  <li>LGE e Internet como servicio público: foco en acceso, no en uso crítico.</li>
                  <li>Currículum chileno: AMI marginal y fragmentada.</li>
                  <li>Medios chilenos: sin enfoque de alfabetización de audiencias.</li>
                  <li>Conectividad 96,5% pero vacío legal en AMI.</li>
                </ul>
              </div>
              <div className="agendaAmiColCard">
                <h3>Vacíos críticos identificados en Chile</h3>
                <ul className="agendaAmiList">
                  <li>Sin política nacional ni institucionalidad coordinadora.</li>
                  <li>Sin estándares AMI ni indicadores de impacto.</li>
                  <li>Sin transparencia algorítmica y derecho a explicación.</li>
                </ul>
              </div>
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
              Propuesta: Ley Marco de AMI para Chile
            </h2>
            <blockquote className="agendaAmiQuote">
              Garantizar que todas las personas en Chile desarrollen competencias para acceder, evaluar, usar y crear
              información de manera crítica, ética y participativa, como derecho para la democracia plena.
            </blockquote>
            <div className="agendaAmiBlockGrid">
              <div className="agendaAmiBlock">
                <strong>1 · Marco institucional chileno</strong>
                Crear institucionalidad específica AMI. Mesa Intersectorial permanente. Coordinación con Educación,
                Ciencia, Cultura, Desarrollo Social.
              </div>
              <div className="agendaAmiBlock">
                <strong>2 · Formación inicial en Chile</strong>
                Integración curricular AMI en pedagogías. Competencias obligatorias para egreso. Práctica profesional
                con componente AMI.
              </div>
              <div className="agendaAmiBlock">
                <strong>3 · Formación continua en Chile</strong>
                Actualización en amenazas (IA generativa). Metodologías activas y red de docentes AMI.
              </div>
              <div className="agendaAmiBlock">
                <strong>4 · Recursos pedagógicos chilenos</strong>
                Kits por nivel. Plataforma digital y banco de actividades AMI.
              </div>
            </div>
          </div>
        </section>

        <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="hoja-ruta-heading">
          <div className={shell.inner}>
            <h2 id="hoja-ruta-heading" className={shell.secTitleDark}>
              Hoja de ruta
            </h2>
            <div className="agendaAmiFases">
              <div className="agendaAmiFase">
                <h3 className="amiPhaseTitle">FASE 1 — INSTITUCIONALIZACIÓN</h3>
                <ul>
                  <li>Crear Mesa Intersectorial AMI.</li>
                  <li>Diseñar Política Nacional con participación ciudadana.</li>
                  <li>Financiamiento 2025–2026 asegurado.</li>
                  <li>Definir institucionalidad coordinadora.</li>
                </ul>
              </div>
              <div className="agendaAmiFase">
                <h3 className="amiPhaseTitle">FASE 2 — PILOTAJE</h3>
                <ul>
                  <li>Ciudades AMI en 16 comunas.</li>
                  <li>Formación docente (inicial y continua).</li>
                  <li>Observatorio Nacional AMI.</li>
                  <li>Recursos pedagógicos.</li>
                </ul>
              </div>
              <div className="agendaAmiFase">
                <h3 className="amiPhaseTitle">FASE 3 — ESCALAMIENTO</h3>
                <ul>
                  <li>Evaluar y ajustar pilotos.</li>
                  <li>Integrar AMI en SIMCE/ENDDEIE.</li>
                  <li>Consolidar gobernanza.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className={`${shell.sectionDark} ${shell.padSection}`} aria-labelledby="reco-estrategicas-heading">
          <div className={shell.inner}>
            <h2 id="reco-estrategicas-heading" className={`${shell.secTitleLight} ${shell.secTitleLightSpaced}`}>
              Recomendaciones estratégicas para Chile
            </h2>
            <ol className="agendaAmiRecoList">
              <li>
                <strong>1 · Marco institucional —</strong> Institucionalidad AMI con mandato legal. Mesa Intersectorial.
                Presupuesto estable y plurianual.
              </li>
              <li>
                <strong>2 · Integración curricular —</strong> Competencias AMI explícitas. AMI en formación inicial y
                continua.
              </li>
              <li>
                <strong>3 · Implementación territorial —</strong> Red comunal con facilitadores locales. Priorizar NNA,
                adultos en rezago y mayores.
              </li>
              <li>
                <strong>4 · Recursos y ecosistema —</strong> Kits por nivel + plataforma nacional. Corresponsabilidad
                privada.
              </li>
              <li>
                <strong>5 · Monitoreo y evidencia —</strong> Observatorio Nacional AMI. Indicadores en SIMCE y ENDDEIE.
              </li>
              <li>
                <strong>6 · Marco regulatorio —</strong> Derecho a explicación algorítmica. Accesibilidad en servicios
                digitales.
              </li>
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
              Llamado a acción para tomadores de decisiones chilenos
            </h2>
            <div className="agendaAmiCtaCols">
              <p>
                Pasar de acceso a competencias críticas — Chile ya tiene conectividad; ahora ciudadanos digitalmente
                competentes.
              </p>
              <p>Legislar para institucionalizar — AMI como derecho ciudadano con marco normativo específico.</p>
              <p>
                Financiar y medir para escalar — Inversión sostenible en lo que funciona, con evaluación rigurosa.
              </p>
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
              El momento es ahora. Cada día sin acción: más vulnerabilidad, brechas más profundas, erosión de confianza
              y debilitamiento democrático. El costo de la inacción será irreversible; el beneficio de la acción será
              transformador. ¿Qué Chile queremos para 2030?
            </p>
          </div>
        </section>

        <section className={`${shell.sectionCream} ${shell.padSection}`} aria-labelledby="sobre-agenda-heading">
          <div className={shell.inner}>
            <h2 id="sobre-agenda-heading" className={shell.secTitleDark}>
              Sobre Agenda AMI-Chile
            </h2>
            <p className={shell.bodyText} style={{ maxWidth: "48rem" }}>
              Es una iniciativa de Precisar dedicada a impulsar la alfabetización mediática e informacional como
              política de Estado en Chile. Trabajamos para que la ciudadanía chilena desarrolle las competencias
              críticas necesarias para navegar de manera segura, ética y responsable en la era digital.
            </p>
            <h3
              className={shell.secTitleDark}
              style={{ marginTop: "2rem", marginBottom: "1rem", fontSize: "clamp(1.35rem, 2vw, 1.75rem)" }}
            >
              ¿Cómo podemos colaborar?
            </h3>
            <ul className="agendaAmiList" style={{ maxWidth: "40rem" }}>
              <li>Reuniones informativas con equipos técnicos</li>
              <li>Presentaciones especializadas con datos y propuestas concretas</li>
              <li>Asesoría técnica para implementación de políticas</li>
            </ul>
            <FooterContactLink className="agendaAmiAboutCta">Contáctanos</FooterContactLink>
          </div>
        </section>
      </article>
    </>
  );
}
