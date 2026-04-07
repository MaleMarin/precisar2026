"use client";

import { useState } from "react";
import styles from "./DocentesModulosTabs.module.css";

const TABS = [
  {
    id: "fundamentos",
    label: "Fundamentos EMI",
    panelTitle: "Fundamentos de la Educación Mediática Digital",
    body:
      "Comprender, enseñar y transformar. Explora el impacto de los medios y plataformas digitales en la vida cotidiana y su vínculo con los objetivos educativos. Aprende a integrar la educación mediática y digital en el aula a través de proyectos aplicados como la creación de contenidos, el análisis crítico de información y el debate guiado, fortaleciendo el rol del docente como formador de ciudadanía digital activa.",
  },
  {
    id: "desinformacion",
    label: "Desinformación",
    panelTitle: "Desinformación y Verificación de Datos",
    body:
      "Aprende a identificar noticias falsas, reconocer sesgos informativos y enseñar a tus estudiantes a verificar fuentes antes de compartir contenidos. Herramientas prácticas para trabajar la desinformación en el aula con enfoque crítico y sin alarmismo.",
  },
  {
    id: "algoritmos",
    label: "Algoritmos e IA",
    panelTitle: "Algoritmos e Inteligencia Artificial",
    body:
      "Comprende cómo funcionan los algoritmos que determinan qué vemos en redes sociales y buscadores. Explora el impacto de la IA en la producción de contenidos y cómo enseñar a tus estudiantes a interactuar con estas tecnologías de forma crítica y responsable.",
  },
  {
    id: "produccion",
    label: "Producción digital",
    panelTitle: "Producción de Contenidos Digitales y Ciudadanía",
    body:
      "Guía a tus estudiantes en la creación de contenidos digitales con propósito, ética y responsabilidad. Desde el respeto por los derechos de autor hasta la construcción de mensajes constructivos que fortalezcan la ciudadanía digital activa.",
  },
  {
    id: "seguridad",
    label: "Seguridad y bienestar",
    panelTitle: "Seguridad, Privacidad y Bienestar Digital",
    body:
      "Incorpora buenas prácticas de protección de datos, gestión de privacidad y bienestar digital en tu práctica docente. Aprende a prevenir el ciberacoso, proteger la identidad digital y promover hábitos saludables de uso de la tecnología.",
  },
  {
    id: "integracion",
    label: "Integración curricular",
    panelTitle: "Integración Curricular y Proyectos en Educación Mediática",
    body:
      "Diseña proyectos interdisciplinarios que integren la educación mediática en diferentes asignaturas y niveles. Recursos listos para adaptar, plantillas pedagógicas y ejemplos concretos para llevar al aula desde el primer día.",
  },
] as const;

export function DocentesModulosTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const current = TABS[activeTab]!;

  return (
    <div aria-label="Módulos formativos">
      <div className={styles.tabsBar} role="tablist">
        {TABS.map((t, index) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-docentes-${t.id}`}
            aria-selected={activeTab === index}
            aria-controls={`panel-docentes-${t.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            className={activeTab === index ? styles.tabActive : styles.tabInactive}
            onClick={() => setActiveTab(index)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        id={`panel-docentes-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-docentes-${current.id}`}
        className={styles.tabPanel}
        key={current.id}
      >
        <div className={styles.tabContent}>
          <h3 className={styles.tabPanelTitle}>{current.panelTitle}</h3>
          <p className={styles.tabBodyText}>{current.body}</p>
        </div>
      </div>
    </div>
  );
}
