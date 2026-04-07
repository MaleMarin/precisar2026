"use client";

import { useState } from "react";
import styles from "./DocentesModulosTabs.module.css";

const TABS = [
  {
    id: "fundamentos",
    label: "Fundamentos EMI",
    panelTitle: "Fundamentos de la Educación Mediática Digital",
    body:
      "Comprender, enseñar y transformar. Explora el impacto de los medios y plataformas digitales en la vida cotidiana y su vínculo con los objetivos educativos. Aprende a integrar la educación mediática y digital en el aula a través de proyectos aplicados como la creación de contenidos, el análisis crítico de información y el debate guiado, fortaleciendo así el rol del docente como formador de ciudadanía digital activa.",
  },
  {
    id: "desinformacion",
    label: "Desinformación",
    panelTitle: "Desinformación, Verificación de Datos",
    body:
      "Adquiere estrategias prácticas para enseñar a tus estudiantes a identificar y desmantelar la desinformación: aprenderán técnicas de verificación de datos, uso de herramientas de fact-checking y métodos para contrastar fuentes, reconocer patrones de manipulación y aplicar estas competencias tanto en sus investigaciones escolares como en su día a día.",
  },
  {
    id: "algoritmos",
    label: "Algoritmos e IA",
    panelTitle: "Algoritmos y Inteligencia Artificial",
    body:
      "Profundiza en cómo los algoritmos y la Inteligencia Artificial influyen en lo que vemos en línea, desde redes sociales hasta motores de búsqueda. Analizaremos los sesgos inherentes a la IA y su impacto en la información, y te daremos herramientas para enseñar a tus estudiantes a evaluar críticamente el contenido generado o filtrado por estas tecnologías. Además, aprenderás a establecer condiciones de uso claras como acuerdos de responsabilidad digital, criterios de selección de fuentes automatizadas y proyectos colaborativos docente-estudiante, que fomenten un entorno seguro y reflexivo para explorar la IA en el aula.",
  },
  {
    id: "produccion",
    label: "Producción digital",
    panelTitle: "Producción de Contenidos Digitales y Ciudadanía",
    body:
      "Este módulo te capacitará para guiar a tus estudiantes en la creación de contenidos digitales responsables y significativos. Exploraremos herramientas para la producción de texto, imagen y video, enfocándonos en la ética, el respeto a la propiedad intelectual y el impacto de sus mensajes. Fomentaremos la participación activa y constructiva en el espacio digital, convirtiendo a los estudiantes en creadores conscientes y responsables.",
  },
  {
    id: "seguridad",
    label: "Seguridad y bienestar",
    panelTitle: "Seguridad, Privacidad y Bienestar Digital",
    body:
      "Aprende a abordar temas cruciales como la ciberseguridad, la protección de datos personales y la gestión de la privacidad con tus estudiantes. Desarrollarás estrategias para promover un uso saludable y equilibrado de la tecnología, previniendo el ciberacoso y fomentando un bienestar digital que integre la vida online y offline.",
  },
  {
    id: "integracion",
    label: "Integración curricular",
    panelTitle: "Integración Curricular y Proyectos en Educación Mediática",
    body:
      "Descubre cómo integrar la educación mediática digital en diversas asignaturas y niveles educativos. Te proporcionaremos ejemplos de proyectos exitosos y te guiaremos en el diseño de actividades prácticas que permitan a tus estudiantes aplicar sus conocimientos, culminando en proyectos significativos que demuestren su educación digital y mediática.",
  },
] as const;

export function DocentesModulosTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const current = TABS[activeTab]!;

  return (
    <div aria-label="Módulos Formativos">
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
