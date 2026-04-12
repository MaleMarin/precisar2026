import { ConsultaFlowProvider } from "@/components/consulta/ConsultaFlowContext";
import { ConsultaHero } from "@/components/consulta/ConsultaHero";
import { ConsultaIntro } from "@/components/consulta/ConsultaIntro";
import { ConsultaLiveMapProvider } from "@/components/consulta/ConsultaLiveMapProvider";
import { ConsultaPageShell } from "@/components/consulta/ConsultaPageShell";
import { ConsultaViewportCenter } from "@/components/consulta/ConsultaViewportCenter";
import intro from "@/components/consulta/ConsultaIntro.module.css";
import shell from "@/components/consulta/ConsultaShell.module.css";
import { ConsultaWizardSlot } from "./ConsultaWizardSlot";

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
              <section className={intro.canvas} aria-label="Transparencia y confianza">
                <div className={intro.sideStack}>
                  <article className={intro.sheetCard}>
                    <h2 className={intro.title}>¿Por qué te preguntamos?</h2>
                    <p className={intro.body}>
                      Queremos entender cómo llega la información a tu día a día: qué te ayuda, qué te confunde y qué
                      necesitas para decidir con más claridad. No buscamos respuestas correctas, sino experiencias
                      reales.
                    </p>
                  </article>

                  <article className={intro.sheetCard}>
                    <h2 className={intro.title}>Quién está detrás</h2>
                    <p className={intro.body}>
                      Esta consulta es una iniciativa de Precisar, organización sin fines de lucro dedicada a la cultura
                      digital crítica en Chile y México.
                    </p>
                  </article>

                  <article className={intro.sheetCard}>
                    <h2 className={intro.title}>Qué pasa con tus datos</h2>
                    <p className={intro.body}>
                      No guardamos datos personales. No hay nombre, email ni teléfono. Solo nos interesa el patrón
                      colectivo para diseñar mejores herramientas de educación mediática.
                    </p>
                  </article>

                  <div className={intro.sheetCardCompact}>
                    <div className={intro.tagRow} role="list" aria-label="Datos de la consulta">
                      <span className={intro.tagBlue} role="listitem">
                        Anónima
                      </span>
                      <span className={intro.tagCoral} role="listitem">
                        12 preguntas
                      </span>
                      <span className={intro.tagBlue} role="listitem">
                        Menos de 1 minuto
                      </span>
                    </div>
                  </div>
                </div>
              </section>

              <ConsultaIntro />
              <ConsultaWizardSlot />
            </div>
          </ConsultaViewportCenter>
        </ConsultaFlowProvider>
      </ConsultaPageShell>
    </ConsultaLiveMapProvider>
  );
}
