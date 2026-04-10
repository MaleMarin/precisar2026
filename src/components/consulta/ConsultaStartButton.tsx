"use client";

import { useCallback } from "react";
import { useConsultaFlow } from "./ConsultaFlowContext";
import styles from "./ConsultaHero.module.css";

export function ConsultaStartButton() {
  const { enterFlow } = useConsultaFlow();

  const onClick = useCallback(() => {
    enterFlow();
    queueMicrotask(() => {
      document.getElementById("consulta-flujo")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, [enterFlow]);

  return (
    <button type="button" className={styles.ctaPrimary} onClick={onClick}>
      Comenzar
    </button>
  );
}
