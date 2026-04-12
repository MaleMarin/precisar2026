import type { ReactNode } from "react";
import { FOOTER_MEDIA } from "@/lib/site";
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
      <main className={styles.main}>
        <div className={styles.consultaBrandBar}>
          <a className={styles.consultaBrandLink} href="/" title="Precisar — inicio">
            <img
              className={styles.consultaBrandLogo}
              src={FOOTER_MEDIA.headerLogoBlack}
              alt="Precisar"
              width={220}
              height={56}
              decoding="async"
            />
          </a>
        </div>
        {children}
      </main>
    </div>
  );
}
