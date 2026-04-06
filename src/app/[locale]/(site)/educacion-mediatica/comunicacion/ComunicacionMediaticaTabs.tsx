"use client";

import { useState, type ReactNode } from "react";
import styles from "./ComunicacionInterior.module.css";

const TABS: { id: string; label: string }[] = [
  { id: "ecosistema", label: "Ecosistema mediático" },
  { id: "libertad", label: "Libertad de Expresión y Derecho a la Información" },
  { id: "medios", label: "Medios de Comunicación" },
  { id: "desinformacion", label: "Desinformación" },
  { id: "redes", label: "Redes sociales" },
];

function TabEcosistema() {
  return (
    <p className={styles.tabBodyText}>
      Es el conjunto de medios, plataformas y actores que producen y difunden información. Incluye desde
      grandes canales hasta redes sociales y medios comunitarios. Entender quién comunica, cómo y con qué
      intereses es clave para leer mejor lo que vemos.
    </p>
  );
}

function TabLibertad() {
  return (
    <div className={styles.tabBodyStack}>
      <p className={styles.tabBodyText}>
        La libertad de expresión es el derecho a decir lo que pensamos, a compartir ideas, opiniones y
        creencias sin miedo a ser censurados o castigados. Pero también incluye el derecho a recibir
        información veraz, plural y oportuna, algo fundamental para poder tomar decisiones informadas en
        nuestra vida cotidiana.
      </p>
      <p className={styles.tabBodyText}>
        Este derecho no es absoluto: no protege discursos que incitan al odio, la violencia o la
        discriminación. Por eso, ejercer la libertad de expresión también implica responsabilidad: pensar
        en las consecuencias de lo que compartimos y promover un diálogo respetuoso, aunque pensemos distinto.
      </p>
      <p className={styles.tabBodyText}>
        El derecho a la información, por su parte, garantiza que todas las personas podamos acceder a
        contenidos confiables, transparentes y diversos. Eso incluye medios públicos de calidad, datos
        abiertos, y mecanismos que nos permitan saber cómo se toman decisiones que nos afectan.
      </p>
      <p className={styles.tabBodyText}>
        Cuando estos derechos se garantizan y se respetan, se fortalece la participación ciudadana, la
        confianza social y la vida en común. Por eso es clave que todas las personas aprendamos a
        ejercerlos y también a defenderlos.
      </p>
    </div>
  );
}

function TabMedios() {
  return (
    <p className={styles.tabBodyText}>
      Los medios ayudan a construir la imagen que tenemos del mundo. Pero no siempre logran mostrar toda su
      diversidad. A veces, ciertas voces, territorios o experiencias quedan menos representadas. Por eso es
      importante ampliar la mirada: incluir distintas perspectivas nos permite comprender mejor la realidad y
      fortalecer una comunicación más abierta, plural y respetuosa.
    </p>
  );
}

function TabDesinformacion() {
  return (
    <div className={styles.tabBodyStack}>
      <p className={styles.tabBodyLead}>¿Por qué existe la desinformación?</p>
      <p className={styles.tabBodyText}>
        La desinformación existe porque hay quienes quieren manipular lo que pensamos, generar confusión o
        sacar provecho (económico, político o social). A veces se crea con intención, otras veces se difunde
        por error o desconocimiento. Las redes sociales y los medios digitales permiten que estos contenidos
        se propaguen muy rápido, sin filtros ni verificaciones.
      </p>
      <p className={styles.tabBodyLead}>¿Por qué es importante frenarla?</p>
      <p className={styles.tabBodyText}>
        Porque cuando circula información falsa, se debilita nuestra capacidad de decidir bien. Tomamos
        decisiones personales, sociales o incluso de salud basadas en datos que no son reales. La
        desinformación puede generar miedo, odio o desconfianza entre personas y grupos. Combatirla no es
        censurar: es defender el derecho a estar bien informados, a pensar con autonomía y a participar con
        responsabilidad en el mundo que compartimos.
      </p>
    </div>
  );
}

function TabRedes() {
  return (
    <p className={styles.tabBodyText}>
      Redes sociales: ¿o burbujas? En redes sociales, muchas veces vemos solo ideas similares a las nuestras.
      Esto pasa porque los algoritmos nos muestran lo que ya nos gusta o en lo que ya creemos. Así se forman
      burbujas informativas que refuerzan nuestros puntos de vista y nos aíslan de otras opiniones. Para
      salir de esa burbuja, es clave buscar distintas fuentes, contrastar información y estar abiertos al
      diálogo.
    </p>
  );
}

const TAB_PANELS: Record<string, ReactNode> = {
  ecosistema: <TabEcosistema />,
  libertad: <TabLibertad />,
  medios: <TabMedios />,
  desinformacion: <TabDesinformacion />,
  redes: <TabRedes />,
};

export function ComunicacionMediaticaTabs() {
  const [active, setActive] = useState(0);
  const tab = TABS[active]!;

  return (
    <section className={styles.tabsSection} aria-labelledby="claves-mediaticas-heading">
      <div className={styles.tabsInner}>
        <h2 id="claves-mediaticas-heading" className={styles.tabsSectionTitle}>
          Claves para entender el mundo mediático
        </h2>
        <div className={styles.tabsBar} role="tablist" aria-label="Temas">
          {TABS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={i === active}
              aria-controls={`panel-${t.id}`}
              tabIndex={i === active ? 0 : -1}
              className={i === active ? styles.tabActive : styles.tabInactive}
              onClick={() => setActive(i)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div
          id={`panel-${tab.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${tab.id}`}
          className={styles.tabPanel}
          key={tab.id}
        >
          {TAB_PANELS[tab.id]}
        </div>
      </div>
    </section>
  );
}
