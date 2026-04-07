"use client";

import { useState } from "react";
import styles from "./AprenderModulosTabs.module.css";

const TABS = [
  {
    id: "mediatica",
    label: "Mediática digital",
    panelTitle: "Educación Mediática Digital",
    body:
      "En este módulo fundamental te equiparemos con las herramientas para navegar el vasto ecosistema de información. Aprenderás a identificar la desinformación y las noticias falsas, reconocer los sesgos implícitos en diversos contenidos incluyendo los generados por Inteligencia Artificial, y distinguir las imágenes y videos manipulados. Desarrollarás un pensamiento crítico que te permitirá discernir la veracidad de la información, protegerte de narrativas engañosas y consumir medios de forma consciente e informada.",
  },
  {
    id: "navegacion",
    label: "Navegación segura",
    panelTitle: "Navegación Segura",
    body:
      "La seguridad en línea es primordial. Aquí te enseñaremos estrategias efectivas para identificar y evitar los fraudes más comunes, como el phishing y las estafas. Aprenderás a crear contraseñas robustas y a gestionar tus cuentas de forma segura. Además, profundizaremos en cómo proteger tus datos personales y ajustar la configuración de privacidad en tus redes sociales y aplicaciones favoritas, asegurando una experiencia digital tranquila y sin riesgos.",
  },
  {
    id: "ia",
    label: "IA",
    panelTitle: "Inteligencia Artificial",
    body:
      "La Inteligencia Artificial ya es parte de nuestro día a día. En este módulo desmitificaremos la IA, explicando qué es y cómo funciona de manera sencilla. Exploraremos sus aplicaciones prácticas en asistentes de voz, recomendaciones personalizadas y herramientas de creación de contenido. Descubrirás cómo interactuar con ella de forma consciente, comprendiendo sus capacidades y limitaciones, y reflexionando sobre su impacto hoy y en el futuro.",
  },
  {
    id: "bienestar",
    label: "Bienestar digital",
    panelTitle: "Bienestar Digital",
    body:
      "Encuentra el equilibrio perfecto entre tu vida digital y presencial. Este módulo se enfoca en el bienestar, enseñándote a gestionar el tiempo de pantalla de forma saludable y a mantener una interacción positiva en línea. Utilizaremos las herramientas digitales para enriquecer tus relaciones, fortalecer tus vínculos sociales y familiares, y asegurarnos de que la tecnología complemente y enriquezca, sin sustituir, tus interacciones cara a cara.",
  },
] as const;

const PREFIX = "aprender-modulos";

export function AprenderModulosTabs() {
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
