"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./HubInteractivo.module.css";

const PREFIX = "hub-personalizacion";

type Tab = { id: string; label: string; content: string };

export function HubPersonalizacion() {
  const t = useTranslations("programsHub.personalizacion");
  const tabs = t.raw("tabs") as Tab[];
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab]!;

  return (
    <div className={styles.hubTabsSection} aria-label={t("aria")}>
      <div className={styles.hubTabsNav} role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${PREFIX}-${tab.id}`}
            aria-selected={activeTab === index}
            aria-controls={`panel-${PREFIX}-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            className={activeTab === index ? `${styles.hubTab} ${styles.hubTabActive}` : styles.hubTab}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
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
