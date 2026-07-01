"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./FuncionariosCursoTabs.module.css";

const PREFIX = "func-pub-curso";

type CursoTab = { id: string; label: string; panelTitle: string; body: string };

export function FuncionariosCursoTabs() {
  const t = useTranslations("programsFuncionarios");
  const tabs = t.raw("cursoTabs") as CursoTab[];
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab]!;

  return (
    <div aria-label={t("cursoTabsAria")}>
      <div className={styles.tabsBar} role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            id={`tab-${PREFIX}-${tab.id}`}
            aria-selected={activeTab === index}
            aria-controls={`panel-${PREFIX}-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            className={activeTab === index ? styles.tabActive : styles.tabInactive}
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
