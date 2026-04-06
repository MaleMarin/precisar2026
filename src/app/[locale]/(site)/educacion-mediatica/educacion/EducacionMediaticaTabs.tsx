"use client";

import { useState, type ReactNode } from "react";
import styles from "./EducacionInterior.module.css";

const TABS: { id: string; label: string }[] = [
  { id: "pensamiento", label: "Pensamiento Crítico" },
  { id: "aula", label: "Educación Mediática en Aula" },
  { id: "produccion", label: "Producción de Contenidos" },
  { id: "evaluar", label: "Evaluar Información" },
  { id: "vida", label: "Vida Digital y Convivencia" },
];

function TabPensamiento() {
  return (
    <p className={styles.tabBodyText}>
      No se trata solo de tener opiniones, sino de saber por qué las tenemos. El pensamiento crítico es la
      capacidad de observar, interpretar y cuestionar el mundo que nos rodea, incluyendo los mensajes
      mediáticos que consumimos. En un entorno saturado de estímulos, aprender a pausar, analizar y formular
      juicios propios se convierte en una competencia clave para la autonomía y la ciudadanía.
    </p>
  );
}

function TabAula() {
  return (
    <p className={styles.tabBodyText}>
      La educación mediática no es un contenido más, es una forma de ver y enseñar el mundo. Integrarla en el
      aula es enseñar a los estudiantes a convivir con la información, a construir conocimiento colaborativo y
      a vincularse con el entorno digital con sentido. Desde la infancia hasta la adultez, la Educación
      Mediática permite una pedagogía más conectada con la realidad y más consciente de sus impactos.
    </p>
  );
}

function TabProduccion() {
  return (
    <p className={styles.tabBodyText}>
      Hoy todos somos potencialmente emisores. Crear contenidos no es solo una habilidad técnica, es una forma
      de intervención en el mundo. Aprender a producir mensajes (videos, podcasts, memes, textos) con
      propósito, con ética y con mirada crítica, permite ejercer la ciudadanía en red y dialogar desde lo local
      hacia lo global. Se enseña también a escuchar y a construir con otros.
    </p>
  );
}

function TabEvaluar() {
  return (
    <p className={styles.tabBodyText}>
      La capacidad de discriminar entre información confiable y contenido dudoso es una de las
      alfabetizaciones fundamentales del siglo XXI. No basta con consumir datos: hay que aprender a verificar,
      a identificar fuentes, a reconocer sesgos. Evaluar información no es desconfiar de todo, sino aprender a
      mirar con lupa y a valorar el conocimiento bien fundamentado.
    </p>
  );
}

function TabVida() {
  return (
    <p className={styles.tabBodyText}>
      Estar en línea no es solo una experiencia técnica, es una experiencia humana. La educación mediática
      promueve formas de convivencia digital que respetan la diversidad, promueven el diálogo y rechazan la
      violencia. Aprender a vivir en red implica saber protegerse, pero también saber construir entornos más
      empáticos, colaborativos y democráticos.
    </p>
  );
}

const TAB_PANELS: Record<string, ReactNode> = {
  pensamiento: <TabPensamiento />,
  aula: <TabAula />,
  produccion: <TabProduccion />,
  evaluar: <TabEvaluar />,
  vida: <TabVida />,
};

export function EducacionMediaticaTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active]!;

  return (
    <section className={styles.tabsSection} aria-labelledby="claves-educacion-heading">
      <div className={styles.tabsInner}>
        <h2 id="claves-educacion-heading" className={styles.tabsSectionTitle}>
          Claves para aprender con sentido crítico
        </h2>
        <div className={styles.tabsBar} role="tablist" aria-label="Temas">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-edu-${t.id}`}
              aria-selected={i === active}
              aria-controls={`panel-edu-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              className={i === active ? styles.tabActive : styles.tabInactive}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div
          id={`panel-edu-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-edu-${tab.id}`}
          className={styles.tabPanel}
          key={tab.id}
        >
          {TAB_PANELS[tab.id]}
        </div>
      </div>
    </section>
  );
}
