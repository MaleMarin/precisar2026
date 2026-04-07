"use client";

import { useState } from "react";
import styles from "./FuncionariosCursoTabs.module.css";

const TABS = [
  {
    id: "s1",
    label: "Sesión 1",
    panelTitle: "Sesión 1: Una Vida Llena de Medios",
    body:
      "Introduce el rol central de los medios en la sociedad y los cuatro niveles de análisis mediático: la plataforma, el contenido, la industria y el entorno. Una mirada estructurada para comprender cómo los medios construyen realidades y moldean decisiones en el ámbito público y ciudadano.",
  },
  {
    id: "s2",
    label: "Sesión 2",
    panelTitle: "Sesión 2: ¿Cómo Funcionan los Medios Digitales?",
    body:
      "Explora el impacto de la digitalización y el funcionamiento de los algoritmos, las cámaras de eco y la polarización. Comprende por qué las personas reciben información diferente en sus dispositivos y cómo esto afecta la percepción ciudadana sobre la gestión pública.",
  },
  {
    id: "s34",
    label: "Ses. 3 y 4",
    panelTitle: "Sesiones 3 y 4: Confiabilidad y Evaluación de la Información",
    body:
      "Se enfoca en cómo gestionar la sobrecarga de información y evaluar la fiabilidad de las fuentes, considerando al autor, el contexto y el contenido. Se abordan los deepfakes y la desinformación intencional. Herramientas prácticas para verificar antes de comunicar o tomar decisiones institucionales.",
  },
  {
    id: "s5",
    label: "Sesión 5",
    panelTitle: "Sesión 5: Interacción en los Medios de Comunicación",
    body:
      "Proporciona herramientas para la interacción y la comunicación efectiva, y para fomentar la participación ciudadana a través de los medios. Cómo responder, aclarar y comunicar desde la institución pública con transparencia y criterio.",
  },
  {
    id: "s6",
    label: "Sesión 6",
    panelTitle: "Sesión 6: Uso de Redes Sociales en la Administración Pública",
    body:
      "Aborda las oportunidades y responsabilidades del uso de redes sociales, destacando que los funcionarios deben actuar de forma imparcial, independiente y justa. Protocolos, buenas prácticas y límites éticos para el uso institucional y personal de plataformas digitales.",
  },
  {
    id: "s78",
    label: "Ses. 7 y 8",
    panelTitle: "Sesiones 7 y 8: Resumen y Autoevaluación",
    body:
      "Permite a los participantes reflexionar sobre los objetivos de la educación mediática en su trabajo y evaluar su aprendizaje para ponerlo en práctica. Cierre con plan de acción personal y compromisos concretos para aplicar en la institución.",
  },
] as const;

const PREFIX = "func-pub-curso";

export function FuncionariosCursoTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const current = TABS[activeTab]!;

  return (
    <div aria-label="Contenido y estructura del curso">
      <div className={styles.tabsBar} role="tablist">
        {TABS.map((t, index) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${PREFIX}-${t.id}`}
            aria-selected={activeTab === index}
            aria-controls={`panel-${PREFIX}-${t.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            className={activeTab === index ? styles.tabActive : styles.tabInactive}
            onClick={() => setActiveTab(index)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        id={`panel-${PREFIX}-${current.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${PREFIX}-${current.id}`}
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
