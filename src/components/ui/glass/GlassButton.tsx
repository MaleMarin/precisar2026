import type { ButtonHTMLAttributes, ReactNode } from "react";
import layers from "./LiquidGlassLayers.module.css";
import styles from "./GlassButton.module.css";

export type GlassButtonVariant = "default" | "primary" | "ghost" | "danger";
export type GlassButtonSize = "sm" | "md" | "lg";

export type GlassButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  fullWidth?: boolean;
};

const variantClass: Record<GlassButtonVariant, string> = {
  default: styles.variantDefault,
  primary: styles.variantPrimary,
  ghost: styles.variantGhost,
  danger: styles.variantDanger,
};

const sizeClass: Record<GlassButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
};

export function GlassButton({
  children,
  className,
  variant = "default",
  size = "md",
  fullWidth,
  type = "button",
  ...rest
}: GlassButtonProps) {
  const accentShell =
    variant === "primary"
      ? layers.shellAccentElectric
      : variant === "danger"
        ? layers.shellAccentWarm
        : "";

  return (
    <button
      type={type}
      className={[
        layers.shell,
        layers.shellSm,
        accentShell,
        styles.btn,
        variantClass[variant],
        sizeClass[size],
        fullWidth ? styles.fullWidth : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      <span className={[layers.plate, layers.plateSm, styles.plateBtn].join(" ")}>
        <span className={layers.plateInner}>{children}</span>
      </span>
    </button>
  );
}
