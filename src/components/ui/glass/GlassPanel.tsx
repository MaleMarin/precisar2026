import type { HTMLAttributes, ReactNode } from "react";
import layers from "./LiquidGlassLayers.module.css";
import styles from "./GlassPanel.module.css";

export type GlassPanelPadding = "none" | "sm" | "md" | "lg";
export type GlassPanelRadius = "md" | "lg" | "xl";
export type GlassPanelAccent = "none" | "electric" | "warm";

const paddingClass: Record<GlassPanelPadding, string> = {
  none: styles.paddedNone,
  sm: styles.paddedSm,
  md: styles.paddedMd,
  lg: styles.paddedLg,
};

export type GlassPanelProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  padding?: GlassPanelPadding;
  radius?: GlassPanelRadius;
  accent?: GlassPanelAccent;
};

export function GlassPanel({
  children,
  className,
  padding = "md",
  radius = "lg",
  accent = "none",
  ...rest
}: GlassPanelProps) {
  const shellRadius =
    radius === "md" ? layers.shellSm : radius === "xl" ? layers.shellLg : "";
  const plateRadius =
    radius === "md" ? layers.plateSm : radius === "xl" ? layers.plateLg : "";
  const accentShell =
    accent === "electric"
      ? layers.shellAccentElectric
      : accent === "warm"
        ? layers.shellAccentWarm
        : "";

  return (
    <div
      className={[layers.shell, shellRadius, accentShell, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <div className={[layers.plate, plateRadius].filter(Boolean).join(" ")}>
        <div className={[layers.plateInner, paddingClass[padding]].join(" ")}>{children}</div>
      </div>
    </div>
  );
}
