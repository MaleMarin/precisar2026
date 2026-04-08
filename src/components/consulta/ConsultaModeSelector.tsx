"use client";

import { useCallback } from "react";
import { useConsultaFlow } from "./ConsultaFlowContext";
import styles from "./ConsultaModeSelector.module.css";

import type { ConsultaModo } from "@/lib/consulta/types";

export type { ConsultaModo };

const OPCIONES: {
  id: ConsultaModo;
  title: string;
  meta: [string, string];
  desc: string;
  accent: "blue" | "coral";
}[] = [
  {
    id: "rapido",
    title: "Modo rápido",
    meta: ["4–6 preguntas", "30–45 segundos"],
    desc: "Para responder en pocos segundos.",
    accent: "blue",
  },
  {
    id: "completo",
    title: "Modo completo",
    meta: ["10–12 preguntas", "2–3 minutos"],
    desc: "Para contar con más detalle cómo te informas.",
    accent: "coral",
  },
];

export function ConsultaModeSelector() {
  const { modo, setModo, enterFlow } = useConsultaFlow();

  const onContinue = useCallback(() => {
    enterFlow();
    document.getElementById("consulta-flujo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [enterFlow]);

  return (
    <section id="consulta-modo" className={styles.canvas} aria-labelledby="consulta-modo-h">
      <div className={styles.sheetCard} data-consulta-cluster="decision">
        <header className={styles.decisionHead}>
          <p className={styles.kicker}>Modalidad</p>
          <h2 id="consulta-modo-h" className={styles.title}>
            Elige cómo quieres responder
          </h2>
          <p className={styles.lead}>
            Puedes responder de forma rápida o tomarte un poco más de tiempo. Tú decides el ritmo.
          </p>
        </header>

        <div className={styles.optionsGrid} role="radiogroup" aria-label="Elige cómo quieres responder">
          {OPCIONES.map((op) => {
            const on = modo === op.id;
            const blue = op.accent === "blue";
            return (
              <button
                key={op.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setModo(op.id)}
                className={styles.modeChoice}
                data-selected={on ? "true" : "false"}
              >
                <div className={styles.modeRow}>
                  <span
                    className={[styles.modeRailNeo, blue ? styles.modeNeoBlue : styles.modeNeoCoral].join(" ")}
                    aria-hidden="true"
                  >
                    <span className={styles.modeNeoDot} />
                  </span>
                  <div className={styles.modeLightBody}>
                    <p className={styles.choiceTitle}>{op.title}</p>
                    <p className={styles.meta}>{op.meta[0]}</p>
                    <p className={styles.meta}>{op.meta[1]}</p>
                    <p className={styles.desc}>{op.desc}</p>
                    {on ? <p className={styles.mark}>Seleccionado</p> : null}
                  </div>
                  <span
                    className={[
                      styles.modeCap,
                      blue ? styles.modeCapBlue : styles.modeCapCoral,
                      on ? styles.modeCapOn : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-hidden="true"
                  >
                    {on ? "✓" : ""}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <div className={styles.decisionFooter}>
          <button type="button" className={styles.continueBtn} disabled={modo == null} onClick={onContinue}>
            <span className={styles.continueSolidInner}>
              <span className={styles.continueTitle}>Continuar</span>
              <span className={styles.continueHint}>
                {modo == null ? "Elige una opción para continuar" : "Siguiente: preguntas"}
              </span>
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
