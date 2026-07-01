"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./CiudadesPropuestasTabs.module.css";

const PREFIX = "ciudades-propuestas";

type SessionLine = { lead: string; detail: string };
type Tab = {
  id: string;
  label: string;
  panelTitle: string;
  intro: string;
  sessions: SessionLine[];
};

export function CiudadesPropuestasTabs() {
  const t = useTranslations("programsCiudades");
  const tabs = t.raw("propuestasTabs") as Tab[];
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab]!;

  return (
    <div className={styles.tabsShell}>
      <div className={styles.tabsBar} role="tablist" aria-label={t("propuestasTabsAria")}>
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
          <h3 className={styles.panelTitle}>{current.panelTitle}</h3>
          <p className={styles.intro}>{current.intro}</p>
          <p className={styles.sessionsLead}>{t("propuestasSessionsLead")}</p>
          <ul className={styles.sessionList}>
            {current.sessions.map((s) => (
              <li key={`${current.id}-${s.lead}`}>
                <span className={styles.sessionStrong}>{s.lead}</span>
                <span className={styles.sessionDetail}>: {s.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
