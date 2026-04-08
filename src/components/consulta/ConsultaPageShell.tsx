import type { ReactNode } from "react";
import styles from "./ConsultaShell.module.css";

type ConsultaPageShellProps = {
  children: ReactNode;
  /** Mapa en vivo + tema oscuro inmersivo */
  variant?: "default" | "liveMap";
};

export function ConsultaPageShell({ children, variant = "default" }: ConsultaPageShellProps) {
  return (
    <div
      className={styles.consultaRoot}
      data-consulta-page
      data-live-map={variant === "liveMap" ? "true" : undefined}
    >
      <main className={styles.main}>{children}</main>
    </div>
  );
}
