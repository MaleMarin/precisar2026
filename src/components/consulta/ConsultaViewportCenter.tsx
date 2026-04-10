import type { ReactNode } from "react";
import styles from "./ConsultaViewportLayout.module.css";

type Props = {
  children: ReactNode;
};

/**
 * Envuelve hero + contenido de la consulta para mantener el bloque centrado en pantalla.
 */
export function ConsultaViewportCenter({ children }: Props) {
  return <div className={styles.viewport}>{children}</div>;
}
