import type { Metadata } from "next";
import { ConsultaFlowProvider } from "@/components/consulta/ConsultaFlowContext";
import { ConsultaHero } from "@/components/consulta/ConsultaHero";
import { ConsultaLiveMapProvider } from "@/components/consulta/ConsultaLiveMapProvider";
import { ConsultaPageShell } from "@/components/consulta/ConsultaPageShell";
import { ConsultaViewportCenter } from "@/components/consulta/ConsultaViewportCenter";
import intro from "@/components/consulta/ConsultaIntro.module.css";
import shell from "@/components/consulta/ConsultaShell.module.css";
import { ConsultaWizardSlot } from "./ConsultaWizardSlot";

export const metadata: Metadata = {
  title: "¿Cómo te informas hoy? — Precisar",
  description:
    "Consulta ciudadana anónima de Precisar: 12 preguntas sobre cómo recibes, evalúas y compartes información. Menos de un minuto. Tus respuestas mejoran la manera en que medios e instituciones informan.",
  openGraph: {
    title: "¿Cómo te informas hoy?",
    description:
      "12 preguntas anónimas sobre tu relación con la información. Una iniciativa de Precisar, organización sin fines de lucro dedicada a la cultura digital crítica en Chile y México.",
    url: "https://precisar.net/consulta",
  },
};

export default function ConsultaPage() {
  return (
    <ConsultaLiveMapProvider>
      <ConsultaPageShell variant="liveMap">
        <ConsultaFlowProvider>
          <ConsultaViewportCenter>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "0.5rem",
              }}
            >
              <a
                href="/legal/privacidad-consulta-2026"
                style={{
                  fontSize: 11,
                  color: "rgba(255, 255, 255, 0.4)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                }}
              >
                Política de privacidad →
              </a>
            </div>

            <ConsultaHero />

            <div className={shell.contentSheet} data-consulta-sheet>
              <section className={intro.canvas} aria-label="Privacidad y datos">
                <div className={intro.sideStack}>
                  <article className={intro.sheetCard}>
                    <h2 className={intro.title}>Qué pasa con tus datos</h2>
                    <p className={intro.body}>
                      No guardamos datos personales. No hay nombre, email ni teléfono. Solo nos
                      interesa el patrón colectivo para diseñar mejores herramientas de educación
                      mediática.
                    </p>
                  </article>
                </div>
              </section>

              <ConsultaWizardSlot />
            </div>
          </ConsultaViewportCenter>
        </ConsultaFlowProvider>
      </ConsultaPageShell>
    </ConsultaLiveMapProvider>
  );
}
