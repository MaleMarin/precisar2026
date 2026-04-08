import type { ButtonHTMLAttributes, ReactNode } from "react";
import layers from "./LiquidGlassLayers.module.css";
import styles from "./GlassOptionPill.module.css";

export type GlassOptionPillProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  /** Controlled selected (drives aria-pressed + estilos). */
  selected?: boolean;
  defaultSelected?: boolean;
};

export function GlassOptionPill({
  children,
  className,
  selected,
  defaultSelected,
  type = "button",
  ...rest
}: GlassOptionPillProps) {
  const isSelected = selected ?? defaultSelected ?? false;

  return (
    <button
      type={type}
      aria-pressed={isSelected}
      className={[
        layers.shell,
        layers.shellPill,
        styles.pill,
        isSelected ? styles.pressedShell : "",
        isSelected ? styles.selected : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <span className={[layers.plate, layers.platePill, styles.inner].join(" ")}>
        <span className={layers.plateInner}>{children}</span>
      </span>
    </button>
  );
}
