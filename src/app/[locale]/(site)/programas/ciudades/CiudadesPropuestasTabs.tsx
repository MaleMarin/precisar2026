"use client";

import { useState } from "react";
import styles from "./CiudadesPropuestasTabs.module.css";

type SessionLine = { lead: string; detail: string };

type Tab = {
  id: string;
  label: string;
  panelTitle: string;
  intro: string;
  sessions: SessionLine[];
};

const TABS: Tab[] = [
  {
    id: "ia",
    label: "IA",
    panelTitle: "Inteligencia Artificial y su impacto",
    intro:
      "Este taller presenta los fundamentos de la IA, explorando qué es, cómo funciona y su impacto en las personas. Los participantes adquirirán habilidades cruciales y estrategias prácticas para abordar los desafíos que presenta la IA. Ideal para públicos de todas las edades y niveles de conocimiento.",
    sessions: [
      {
        lead: "Desmitificando la IA",
        detail: "qué es, cómo funciona y sus impactos en las personas.",
      },
      {
        lead: "Vivir con algoritmos",
        detail: "qué son los algoritmos y su relación con la IA y el aprendizaje automático.",
      },
      {
        lead: "Desafíos de la IA y estrategias prácticas 1",
        detail: "Magnificación del sesgo.",
      },
      {
        lead: "Desafíos de la IA y estrategias prácticas 2",
        detail: "Acoso en línea.",
      },
    ],
  },
  {
    id: "desinformacion",
    label: "Desinformación",
    panelTitle: "Desinformación: Hechos vs. sentimientos sobre la información",
    intro:
      "Este taller capacita a los participantes para desenvolverse en el complejo panorama de la desinformación mediante sesiones interactivas sobre los ecosistemas de información y medios, patrones de estrategias influyentes y prácticas persuasivas integradas en la tecnología. Ideal para públicos de todas las edades y niveles de conocimiento.",
    sessions: [
      {
        lead: "Hechos vs. Sentimientos",
        detail:
          "Mantén la calma y detecta los trucos de estrategias intencionales que usan apps, redes sociales, medios y sitios web. Comprende los trucos que provocan emociones e influyen en el comportamiento.",
      },
      {
        lead: "Entre Línea",
        detail:
          "La información es complicada. Define desinformación y fake news, explora la complejidad de la información y practica habilidades fundamentales de investigación.",
      },
    ],
  },
  {
    id: "fraudes",
    label: "Fraudes",
    panelTitle: "Prevención de Fraudes y Estafas en Línea",
    intro:
      "El objetivo de este taller es dotar a todos los vecinos y vecinas de herramientas prácticas para reconocer, evitar y reaccionar ante fraudes digitales.",
    sessions: [
      {
        lead: "Señales de alerta",
        detail: "identificar correos falsos, mensajes sospechosos y llamadas fraudulentas.",
      },
      {
        lead: "Buenas prácticas de contraseña",
        detail:
          "crear y gestionar contraseñas seguras y usar autenticación fuerte como PIN, patrones o apps de verificación.",
      },
      {
        lead: "Compras y pagos seguros",
        detail: "detectar sitios web fraudulentos y elegir medios de pago confiables.",
      },
      {
        lead: "¿Y si ya fui víctima?",
        detail: "pasos para reportar el incidente, suspender cuentas y recuperar el control.",
      },
    ],
  },
  {
    id: "bienestar",
    label: "Bienestar",
    panelTitle: "Bienestar Digital y Salud Tecnológica",
    intro:
      "Este taller aborda el impacto del uso de pantallas en el sueño, la atención y las relaciones personales, proponiendo estrategias para equilibrar nuestra vida online y offline. Ideal para todo público, fomenta dinámicas intergeneracionales.",
    sessions: [
      {
        lead: "Pantallas y Cerebro",
        detail: "Cómo el uso excesivo influye en la calidad del sueño y la concentración.",
      },
      {
        lead: "Rutas de Desconexión",
        detail: "Herramientas y hábitos para gestionar tiempos de uso de dispositivos.",
      },
      {
        lead: "Dinámicas Intergeneracionales",
        detail:
          "Jóvenes y personas mayores comparten experiencias y diseñan acuerdos familiares o comunitarios.",
      },
    ],
  },
];

const PREFIX = "ciudades-propuestas";

export function CiudadesPropuestasTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const current = TABS[activeTab]!;

  return (
    <div className={styles.tabsShell}>
      <div className={styles.tabsBar} role="tablist" aria-label="Propuestas formativas">
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
          <h3 className={styles.panelTitle}>{current.panelTitle}</h3>
          <p className={styles.intro}>{current.intro}</p>
          <p className={styles.sessionsLead}>Sesiones incluidas:</p>
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
