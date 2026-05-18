import type { Metadata } from "next";
import shell from "@/components/programs/ProgramShell.module.css";
import HubCylinder from "./HubCylinder";

export const metadata: Metadata = {
  title: "Hub Digital Consciente",
  description:
    "Muestras portátiles e interactivas de cultura digital para plazas, bibliotecas, educación, corporativos y territorio.",
};

export default function Page() {
  return (
    <main className={shell.page} data-program="hub">
      <header className={shell.hero} aria-labelledby="hub-hero-title">
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>■ HUB DIGITAL CONSCIENTE · PROGRAMA 02</p>
          <h1 id="hub-hero-title" className={shell.heroTitle}>
            Cultura digital que viaja a donde están las personas.
          </h1>
        </div>
      </header>

      <section className={`${shell.queEs} ${shell.padSection}`} aria-labelledby="hub-que-es">
        <div className={shell.inner}>
          <div className={shell.queEsGrid}>
            <div>
              <p className={shell.statWord} lang="es">
                i<wbr />ti<wbr />ne<wbr />ran<wbr />tes.
              </p>
              <p className={shell.statSub}>Diseñada para cualquier espacio.</p>
            </div>
            <div>
              <p id="hub-que-es" className={shell.bodyText}>
                En el Hub Digital Consciente transformamos la cultura digital en experiencias tangibles. A
                través de muestras interactivas y portátiles, exploramos el impacto de la tecnología en
                nuestra sociedad, llevando el conocimiento especializado directamente a eventos, municipios
                y espacios públicos.
              </p>
              <p className={shell.bodyText}>
                No solo exponemos contenidos; creamos espacios de diálogo y acción. Traducimos conceptos
                complejos, como la desinformación, la IA y la privacidad, en experiencias sensoriales
                accesibles que impulsan el uso responsable de la tecnología en la ciudadanía.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Exploración interactiva del Hub Digital Consciente">
        <HubCylinder />
      </section>

      <section className={shell.cta} aria-labelledby="hub-cta-title">
        <div className={shell.ctaInner} style={{ gridTemplateColumns: "1fr" }}>
          <h2 id="hub-cta-title" className={shell.ctaTitle}>
            Lleva el Hub Digital Consciente a tu espacio.
          </h2>
        </div>
      </section>
    </main>
  );
}
