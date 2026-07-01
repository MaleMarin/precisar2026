"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import styles from "./HubInteractivo.module.css";

const expandVariants = {
  collapsed: { opacity: 0, height: 0, marginTop: 0 },
  expanded: { opacity: 1, height: "auto", marginTop: 12 },
};

type Modelo = {
  id: string;
  nivel: string;
  nombre: string;
  subtitulo: string;
  acento: string;
  borde: string;
  destacado?: boolean;
  items: string[];
  espacio: string;
  instalacion: string;
  duracion: string;
  audiencia: string;
};

const MODELO_STYLES: Record<string, { acento: string; borde: string; destacado?: boolean }> = {
  pixel: { acento: "rgba(245,242,236,0.15)", borde: "rgba(245,242,236,0.1)" },
  vector: { acento: "rgba(219,82,39,0.15)", borde: "#DB5227", destacado: true },
  holo: { acento: "rgba(2,54,97,0.3)", borde: "rgba(245,242,236,0.1)" },
};

export function HubModelos() {
  const t = useTranslations("programsHub.modelos");
  const modelos = t.raw("items") as Omit<Modelo, "acento" | "borde" | "destacado">[];
  const specLabels = t.raw("specLabels") as Record<string, string>;
  const [openId, setOpenId] = useState<string | null>("vector");

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <section className={styles.hubSection} aria-label={t("aria")}>
      <p className={styles.hubSectionLabel}>{t("label")}</p>
      <div className={styles.hubModelosGrid}>
        {modelos.map((m) => {
          const style = MODELO_STYLES[m.id]!;
          const isOpen = openId === m.id;
          return (
            <motion.article
              key={m.id}
              className={styles.hubModeloCard}
              style={{
                border: `1px solid ${style.borde}`,
                boxShadow: isOpen ? `inset 0 0 80px ${style.acento}` : undefined,
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
                    <p className={styles.hubModeloSpecLabel}>{specLabels.espacio}</p>
                    <p className={styles.hubModeloSpecValue}>{m.espacio}</p>
                  </div>
                  <div className={styles.hubModeloSpec}>
                    <p className={styles.hubModeloSpecLabel}>{specLabels.instalacion}</p>
                    <p className={styles.hubModeloSpecValue}>{m.instalacion}</p>
                  </div>
                  <div className={styles.hubModeloSpec}>
                    <p className={styles.hubModeloSpecLabel}>{specLabels.duracion}</p>
                    <p className={styles.hubModeloSpecValue}>{m.duracion}</p>
                  </div>
                  <div className={styles.hubModeloSpec}>
                    <p className={styles.hubModeloSpecLabel}>{specLabels.audiencia}</p>
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
