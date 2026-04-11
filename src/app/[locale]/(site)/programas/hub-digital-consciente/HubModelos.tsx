"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./HubInteractivo.module.css";

const MODELOS = [
  {
    id: "pixel",
    nivel: "Básico",
    nombre: "PIXEL",
    subtitulo: "Espacios reducidos",
    acento: "rgba(245,242,236,0.15)",
    borde: "rgba(245,242,236,0.1)",
    items: ["2 Carteles temáticos", "1 Pantalla de animación", "2 Experiencias interactivas"],
    espacio: "8–12 m²",
    instalacion: "45–60 min",
    duracion: "1–3 días",
    audiencia: "50–100/día",
  },
  {
    id: "vector",
    nivel: "Estándar",
    nombre: "VECTOR",
    subtitulo: "Eventos medianos",
    acento: "rgba(219,82,39,0.15)",
    borde: "#DB5227",
    destacado: true,
    items: ["3 Carteles temáticos", "3 Pantallas de animación", "3 Estaciones interactivas"],
    espacio: "15–25 m²",
    instalacion: "2–3 horas",
    duracion: "3 días – 2 semanas",
    audiencia: "100–300/día",
  },
  {
    id: "holo",
    nivel: "Completo",
    nombre: "HOLO",
    subtitulo: "Instalaciones duraderas",
    acento: "rgba(2,54,97,0.3)",
    borde: "rgba(245,242,236,0.1)",
    items: [
      "6 Carteles visuales",
      "3 Animaciones de video",
      "4 Aplicaciones interactivas",
      "Zona central de reflexión",
    ],
    espacio: "30–50 m²",
    instalacion: "4–6 horas",
    duracion: "2 semanas – permanente",
    audiencia: "200–500/día",
  },
] as const;

const expandVariants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0 },
  expanded: { opacity: 1, height: "auto", marginTop: 12 },
};

export function HubModelos() {
  const [openId, setOpenId] = useState<string | null>("vector");

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className={styles.hubSection} aria-label="Modelos de instalación">
      <p className={styles.hubSectionLabel}>Modelos</p>
      <div className={styles.hubModelosGrid}>
        {MODELOS.map((m) => {
          const isOpen = openId === m.id;
          return (
            <motion.article
              key={m.id}
              className={styles.hubModeloCard}
              style={{
                border: `1px solid ${m.borde}`,
                boxShadow: isOpen ? `inset 0 0 80px ${m.acento}` : undefined,
              }}
              onClick={() => toggle(m.id)}
              role="button"
              tabIndex={0}
              aria-expanded={isOpen}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(m.id);
                }
              }}
            >
              <p className={styles.hubModeloNivel}>{m.nivel}</p>
              <h2 className={styles.hubModeloNombre}>{m.nombre}</h2>
              <p className={styles.hubModeloSubtitulo}>{m.subtitulo}</p>

              <motion.div
                initial={false}
                animate={isOpen ? "expanded" : "collapsed"}
                variants={expandVariants}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: "hidden" }}
              >
                <ul className={styles.hubModeloItems} style={{ paddingLeft: "1.1rem" }}>
                  {m.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className={styles.hubModeloSpecs}>
                  <div className={styles.hubModeloSpec}>
                    <p className={styles.hubModeloSpecLabel}>Espacio</p>
                    <p className={styles.hubModeloSpecValue}>{m.espacio}</p>
                  </div>
                  <div className={styles.hubModeloSpec}>
                    <p className={styles.hubModeloSpecLabel}>Instalación</p>
                    <p className={styles.hubModeloSpecValue}>{m.instalacion}</p>
                  </div>
                  <div className={styles.hubModeloSpec}>
                    <p className={styles.hubModeloSpecLabel}>Duración</p>
                    <p className={styles.hubModeloSpecValue}>{m.duracion}</p>
                  </div>
                  <div className={styles.hubModeloSpec}>
                    <p className={styles.hubModeloSpecLabel}>Audiencia</p>
                    <p className={styles.hubModeloSpecValue}>{m.audiencia}</p>
                  </div>
                </div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
