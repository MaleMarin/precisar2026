import type { ReactNode } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import styles from "./ConsultaShell.module.css";

/** Wordmark en `public/`; ruta estable para la barra de marca en /consulta. */
const CONSULTA_BRAND_WORDMARK_SRC = "/logo-precisar/logo-precisar.png";

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
              src={CONSULTA_BRAND_WORDMARK_SRC}
              alt="Precisar"
              width={160}
              height={28}
              decoding="async"
            />
          </a>
        </div>
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
