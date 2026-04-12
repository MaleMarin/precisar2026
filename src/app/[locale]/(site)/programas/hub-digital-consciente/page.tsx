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
              <p className={shell.statWord}>Portátil.</p>
              <p className={shell.statSub}>Diseñada para cualquier espacio.</p>
            </div>
            <div>
              <p id="hub-que-es" className={shell.bodyText}>
                En el Hub Digital Consciente nos sumergimos en la cultura digital a través de muestras
                interactivas y temáticas. Cada una es portátil y está diseñada para explorar cómo los
                medios y la tecnología influyen en nuestra sociedad, llevando el conocimiento
                directamente a eventos, municipios, espacios públicos y más.
              </p>
              <p className={shell.bodyText}>
                No solo presentamos temas: también abrimos un espacio para el diálogo y la acción. Con
                cada muestra, traducimos conceptos complejos, desde la desinformación e inteligencia
                artificial hasta la privacidad, en experiencias sensoriales accesibles que impulsan
                conversaciones significativas sobre el uso responsable de la tecnología.
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
