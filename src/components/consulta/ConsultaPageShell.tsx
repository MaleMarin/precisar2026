import type { ReactNode } from "react";
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
              style={{ height: 32, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)", opacity: 0.85 }}
            />
          </a>
        </div>
        {children}
      </main>
      <footer style={{ textAlign: "center", padding: "2rem 1rem 3rem", borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: "2rem" }}>
        <a href="https://precisar.net" style={{ display: "inline-block", lineHeight: 0 }}>
          <img
            src="/precisar-footer-wordmark.png"
            alt="Precisar"
            width={160}
            height={28}
            style={{ height: 24, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.65 }}
          />
        </a>
        <p style={{ margin: "0.5rem 0 0", fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.45)" }}>
          Hecho con criterio en Chile 🇨🇱 y México 🇲🇽
        </p>
      </footer>
    </div>
  );
}
