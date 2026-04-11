"use client";

import { useState } from "react";
import styles from "./HubInteractivo.module.css";

const TABS = [
  {
    id: "tematicas",
    label: "Ediciones temáticas",
    content:
      "Profundiza en áreas específicas: IA, desinformación, privacidad digital, incorporando contenidos y tecnologías especializadas como estaciones de realidad virtual o simulaciones avanzadas.",
  },
  {
    id: "comunitaria",
    label: "Edición comunitaria",
    content:
      "Adapta la realidad de tu comuna o grupo objetivo, integrando dinámicas de participación local y foros de debate que empoderan a vecinos de todas las edades.",
  },
  {
    id: "carta",
    label: "Componentes a la carta",
    content:
      "Elige piezas sueltas: pósters, mini-experimentos interactivos, kits de cultura digital, para complementar la exposición según tus necesidades.",
  },
] as const;

const PREFIX = "hub-personalizacion";

export function HubPersonalizacion() {
  const [activeTab, setActiveTab] = useState(0);
  const current = TABS[activeTab]!;

  return (
    <div className={styles.hubTabsSection} aria-label="Personalización del hub">
      <div className={styles.hubTabsNav} role="tablist">
        {TABS.map((t, index) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${PREFIX}-${t.id}`}
            aria-selected={activeTab === index}
            aria-controls={`panel-${PREFIX}-${t.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            className={activeTab === index ? `${styles.hubTab} ${styles.hubTabActive}` : styles.hubTab}
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
        className={styles.hubTabContent}
        key={current.id}
      >
        {current.content}
      </div>
    </div>
  );
}
