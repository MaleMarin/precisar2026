"use client";

import type { MouseEvent } from "react";
import styles from "./ConsultaSkipLink.module.css";

export function ConsultaSkipLink({ label }: { label: string }) {
  const onSkipToContent = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("contenido-principal");
    if (!target) return;
    e.preventDefault();
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "start" });
  };

  return (
    <a href="#contenido-principal" className={styles.skipLink} onClick={onSkipToContent}>
      {label}
    </a>
  );
}
