"use client";

import { useState, type ReactNode } from "react";
import styles from "./TecnologiaInterior.module.css";

const TABS: { id: string; label: string }[] = [
  { id: "algoritmo", label: "Algoritmo y Sesgo Informativo" },
  { id: "privacidad", label: "Privacidad y Huella Digital" },
  { id: "brecha", label: "Brecha Digital y Acceso" },
  { id: "ia", label: "Inteligencia Artificial y Cultura Digital" },
  { id: "plataformas", label: "Uso Consciente de Plataformas" },
];

function TabAlgoritmo() {
  return (
    <p className={styles.tabBodyText}>
      La tecnología no es neutra. Lo que vemos en redes sociales, buscadores o plataformas está mediado por
      algoritmos que priorizan ciertos contenidos y silencian otros. Comprender cómo funcionan estos sistemas es
      clave para desarrollar una mirada crítica sobre la información que consumimos. No se trata solo de saber
      que existen, sino de entender su impacto en nuestras decisiones, percepciones y relaciones.
    </p>
  );
}

function TabPrivacidad() {
  return (
    <p className={styles.tabBodyText}>
      Cada clic deja una marca. En el mundo digital, nuestros datos son moneda de cambio. Saber proteger la
      privacidad no es solo una cuestión técnica, sino un acto de autonomía. Comprender qué compartimos, con
      quién y para qué, nos ayuda a ejercer un control más consciente sobre nuestra identidad digital y
      nuestros derechos.
    </p>
  );
}

function TabBrecha() {
  return (
    <p className={styles.tabBodyText}>
      La tecnología amplifica desigualdades cuando el acceso no es garantizado para todos. Este eje también
      visibiliza las barreras que impiden la participación plena en el entorno digital: desde la falta de
      conectividad hasta la ausencia de formación. Educar en tecnología con enfoque crítico es también educar
      para la justicia social.
    </p>
  );
}

function TabIa() {
  return (
    <p className={styles.tabBodyText}>
      La inteligencia artificial ya no es ciencia ficción. Desde asistentes virtuales hasta sistemas que
      generan contenido, la IA forma parte del entorno informativo actual. Educar en este contexto implica no
      solo usar estas tecnologías, sino también comprender su funcionamiento y desarrollar una mirada crítica
      sobre su impacto en nuestras formas de comunicarnos, aprender y convivir.
    </p>
  );
}

function TabPlataformas() {
  return (
    <p className={styles.tabBodyText}>
      La conexión permanente no siempre significa una conexión saludable. Este eje propone reflexionar sobre
      nuestros hábitos digitales: el tiempo que dedicamos, las emociones que nos generan, los vínculos que
      construimos. Promueve el equilibrio entre vida online y offline, y enseña a usar la tecnología con
      sentido, intención y cuidado.
    </p>
  );
}

const TAB_PANELS: Record<string, ReactNode> = {
  algoritmo: <TabAlgoritmo />,
  privacidad: <TabPrivacidad />,
  brecha: <TabBrecha />,
  ia: <TabIa />,
  plataformas: <TabPlataformas />,
};

export function TecnologiaMediaticaTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active]!;

  return (
    <section className={styles.tabsSection} aria-labelledby="claves-tecnologia-heading">
      <div className={styles.tabsInner}>
        <h2 id="claves-tecnologia-heading" className={styles.tabsSectionTitle}>
          Claves para entender la tecnología en la educación mediática
        </h2>
        <div className={styles.tabsBar} role="tablist" aria-label="Temas">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-tech-${t.id}`}
              aria-selected={i === active}
              aria-controls={`panel-tech-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              className={i === active ? styles.tabActive : styles.tabInactive}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div
          id={`panel-tech-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-tech-${tab.id}`}
          className={styles.tabPanel}
          key={tab.id}
        >
          {TAB_PANELS[tab.id]}
        </div>
      </div>
    </section>
  );
}
