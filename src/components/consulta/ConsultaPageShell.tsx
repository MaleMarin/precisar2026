import type { ReactNode } from "react";
import styles from "./ConsultaShell.module.css";

export function ConsultaPageShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.consultaRoot} data-consulta-page>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
