import type { HTMLAttributes, ReactNode } from "react";

export type LiquidGlassRootProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Desactiva blur (legibilidad máxima / preferencia). */
  forceSolid?: boolean;
};

/**
 * Contenedor raíz del sistema: aplica tokens `--lg-*` y tipografía Inter (`--font-glass-family`).
 * Importar estilos: `liquid-glass-tokens.css` ya está en `globals.css`.
 */
export function LiquidGlassRoot({
  children,
  className,
  forceSolid,
  ...rest
}: LiquidGlassRootProps) {
  return (
    <div
      data-lg-root
      className={["lg-root", forceSolid ? "lg--no-blur" : "", className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}
