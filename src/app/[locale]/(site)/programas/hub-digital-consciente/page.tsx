import type { Metadata } from "next";
import { FooterContactLink } from "@/components/FooterContactLink";
import shell from "@/components/programs/ProgramShell.module.css";
import { PDFS } from "@/lib/site";
import styles from "./HubDigitalPage.module.css";
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

      <section className={`${styles.ediciones} ${shell.padSection}`} aria-labelledby="hub-ediciones">
        <div className={shell.inner}>
          <h2 id="hub-ediciones" className={styles.edicionesTitle}>
            Ediciones temáticas disponibles
          </h2>
          <div className={styles.edicionesGrid}>
            <article className={styles.edicionCard}>
              <p className={styles.edicionNum}>01</p>
              <h3 className={styles.edicionCardTitle}>Edición Desinformación</h3>
              <a
                className={styles.edicionLink}
                href={PDFS.hubDesinformacion}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver especificaciones completas →
              </a>
            </article>
            <article className={styles.edicionCard}>
              <p className={styles.edicionNum}>02</p>
              <h3 className={styles.edicionCardTitle}>Edición IA y Algoritmos</h3>
              <a
                className={styles.edicionLink}
                href={PDFS.hubIaAlgoritmos}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver especificaciones completas →
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.como} ${shell.padSection}`} aria-labelledby="hub-como">
        <div className={shell.inner}>
          <h2 id="hub-como" className={styles.secTitle}>
            Cómo desarrollamos cada muestra
          </h2>
          <div className={styles.comoGrid}>
            <div className={styles.comoCol}>
              <h3 className={styles.comoColTitle}>Colaboración con Expertos</h3>
              <p className={styles.comoColText}>
                Nos asociamos con profesionales en diversos campos para asegurar que el contenido sea
                preciso y relevante.
              </p>
            </div>
            <div className={styles.comoCol}>
              <h3 className={styles.comoColTitle}>Investigación en Campo</h3>
              <p className={styles.comoColText}>
                Realizamos investigaciones directas con la audiencia para entender los desafíos reales
                y las perspectivas de cada muestra.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={shell.cta} aria-labelledby="hub-cta-title">
        <div className={shell.ctaInner}>
          <div>
            <h2 id="hub-cta-title" className={shell.ctaTitle}>
              Lleva el Hub Digital Consciente a tu espacio.
            </h2>
          </div>
          <div className={shell.ctaRight}>
            <FooterContactLink className={shell.ctaBtn}>Contacto</FooterContactLink>
          </div>
        </div>
      </section>
    </main>
  );
}
