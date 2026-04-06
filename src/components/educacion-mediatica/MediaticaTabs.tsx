"use client";

import { useState } from "react";
import styles from "./MediaticaTabs.module.css";

export type MediaticaTab = {
  id: string;
  label: string;
  paragraphs: readonly string[];
};

type MediaticaTabsProps = {
  headingId: string;
  idPrefix: string;
  sectionTitle: string;
  tabs: readonly MediaticaTab[];
  /** Título largo (p. ej. Cultura): tipografía ligeramente menor */
  longSectionTitle?: boolean;
};

export function MediaticaTabs({
  headingId,
  idPrefix,
  sectionTitle,
  tabs,
  longSectionTitle = false,
}: MediaticaTabsProps) {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab]!;

  const titleClass = longSectionTitle
    ? `${styles.tabsSectionTitle} ${styles.tabsSectionTitleLong}`
    : styles.tabsSectionTitle;

  return (
    <section className={styles.tabsSection} aria-labelledby={headingId}>
      <div className={styles.tabsInner}>
        <h2 id={headingId} className={titleClass}>
          {sectionTitle}
        </h2>

        <div className={styles.tabsBar} role="tablist" aria-label="Temas">
          {tabs.map((t, index) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${idPrefix}-${t.id}`}
              aria-selected={activeTab === index}
              aria-controls={`panel-${idPrefix}-${t.id}`}
              tabIndex={activeTab === index ? 0 : -1}
              className={activeTab === index ? styles.tabActive : styles.tabInactive}
              onClick={() => setActiveTab(index)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          id={`panel-${idPrefix}-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${idPrefix}-${current.id}`}
          className={styles.tabPanel}
          key={current.id}
        >
          <div className={styles.tabContent}>
            {current.paragraphs.map((text, i) => (
              <p key={i} className={styles.tabBodyText}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
