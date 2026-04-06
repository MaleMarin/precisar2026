"use client";

import { useState } from "react";
import styles from "./ComunicacionInterior.module.css";

const tabs = [
  {
    id: "ecosistema",
    label: "Ecosistema mediático",
    paragraphs: [
      "Es el conjunto de medios, plataformas y actores que producen y difunden información. Incluye desde grandes canales hasta redes sociales y medios comunitarios. Entender quién comunica, cómo y con qué intereses es clave para leer mejor lo que vemos.",
    ],
  },
  {
    id: "libertad",
    label: "Libertad de Expresión y Derecho a la Información",
    paragraphs: [
      "La libertad de expresión es el derecho a decir lo que pensamos, a compartir ideas, opiniones y creencias sin miedo a ser censurados o castigados. Pero también incluye el derecho a recibir información veraz, plural y oportuna, algo fundamental para poder tomar decisiones informadas en nuestra vida cotidiana.",
      "Este derecho no es absoluto: no protege discursos que incitan al odio, la violencia o la discriminación. Por eso, ejercer la libertad de expresión también implica responsabilidad: pensar en las consecuencias de lo que compartimos y promover un diálogo respetuoso, aunque pensemos distinto.",
      "El derecho a la información garantiza que todas las personas podamos acceder a contenidos confiables, transparentes y diversos. Eso incluye medios públicos de calidad, datos abiertos, y mecanismos que nos permitan saber cómo se toman decisiones que nos afectan.",
    ],
  },
  {
    id: "medios",
    label: "Medios de Comunicación",
    paragraphs: [
      "Los medios ayudan a construir la imagen que tenemos del mundo. Pero no siempre logran mostrar toda su diversidad. A veces, ciertas voces, territorios o experiencias quedan menos representadas. Por eso es importante ampliar la mirada: incluir distintas perspectivas nos permite comprender mejor la realidad y fortalecer una comunicación más abierta, plural y respetuosa.",
    ],
  },
  {
    id: "desinformacion",
    label: "Desinformación",
    paragraphs: [
      "La desinformación existe porque hay quienes quieren manipular lo que pensamos, generar confusión o sacar provecho económico, político o social. A veces se crea con intención, otras veces se difunde por error o desconocimiento. Las redes sociales y los medios digitales permiten que estos contenidos se propaguen muy rápido, sin filtros ni verificaciones.",
      "Combatirla no es censurar: es defender el derecho a estar bien informados, a pensar con autonomía y a participar con responsabilidad en el mundo que compartimos.",
    ],
  },
  {
    id: "redes",
    label: "Redes sociales",
    paragraphs: [
      "En redes sociales, muchas veces vemos solo ideas similares a las nuestras. Esto pasa porque los algoritmos nos muestran lo que ya nos gusta o en lo que ya creemos. Así se forman burbujas informativas que refuerzan nuestros puntos de vista y nos aíslan de otras opiniones. Para salir de esa burbuja, es clave buscar distintas fuentes, contrastar información y estar abiertos al diálogo.",
    ],
  },
] as const;

export function ComunicacionMediaticaTabs() {
  const [activeTab, setActiveTab] = useState(0);
  const current = tabs[activeTab]!;

  return (
    <section className={styles.tabsSection} aria-labelledby="claves-mediaticas-heading">
      <div className={styles.tabsInner}>
        <h2 id="claves-mediaticas-heading" className={styles.tabsSectionTitle}>
          Claves para entender el mundo mediático
        </h2>

        <div className={styles.tabsBar} role="tablist" aria-label="Temas">
          {tabs.map((t, index) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={activeTab === index}
              aria-controls={`panel-${t.id}`}
              tabIndex={activeTab === index ? 0 : -1}
              className={activeTab === index ? styles.tabActive : styles.tabInactive}
              onClick={() => setActiveTab(index)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div
          id={`panel-${current.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${current.id}`}
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
