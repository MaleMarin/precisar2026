"use client";

import { useState } from "react";
import styles from "./AprenderModulosTabs.module.css";

const TABS = [
  {
    id: "mediatica",
    label: "Educación mediática",
    panelTitle: "Educación Mediática Digital",
    body:
      "En este módulo fundamental te equiparemos con las herramientas para navegar el vasto ecosistema de información. Aprenderás a identificar la desinformación y las noticias falsas, reconocer los sesgos implícitos en diversos contenidos incluyendo los generados por Inteligencia Artificial, y distinguir imágenes y videos manipulados. Desarrollarás un pensamiento crítico que te permitirá discernir la veracidad de la información, protegerte de narrativas engañosas y consumir medios de forma consciente e informada.",
  },
  {
    id: "navegacion",
    label: "Navegación segura",
    panelTitle: "Navegación Segura",
    body:
      "Aprenderás a identificar y evitar fraudes en línea, proteger tus datos personales y gestionar tu privacidad en redes y aplicaciones. Te daremos las herramientas para sentirte seguro en cada clic y disfrutar de una experiencia digital tranquila, sin riesgos ni sorpresas.",
  },
  {
    id: "ia",
    label: "Inteligencia Artificial",
    panelTitle: "Inteligencia Artificial",
    body:
      "La Inteligencia Artificial es la capacidad de las máquinas para imitar y realizar tareas que requieren inteligencia humana: aprender, razonar y resolver problemas. Exploraremos cómo la IA está transformando nuestra vida diaria y el futuro. Descubriremos sus aplicaciones prácticas y cómo interactuar con ella de forma consciente.",
  },
  {
    id: "bienestar",
    label: "Bienestar digital",
    panelTitle: "Bienestar Digital",
    body:
      "Encontrarás un equilibrio saludable entre el tiempo que pasas en línea y tus actividades presenciales, utilizando las herramientas digitales para enriquecer tu vida y fortalecer tus vínculos sociales sin que sustituyan las interacciones cara a cara. Promovemos un uso consciente y beneficioso de la tecnología.",
  },
] as const;

const PREFIX = "aprender-modulos";

export function AprenderModulosTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const current = TABS[activeTab]!;

  return (
    <div className={styles.tabsShell} aria-label="Módulos formativos">
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
