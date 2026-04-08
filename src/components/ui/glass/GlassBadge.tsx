import type { HTMLAttributes, ReactNode } from "react";
import layers from "./LiquidGlassLayers.module.css";
import styles from "./GlassBadge.module.css";

export type GlassBadgeVariant = "neutral" | "electric" | "warm" | "violet";

const variantClass: Record<GlassBadgeVariant, string> = {
  neutral: styles.variantNeutral,
  electric: styles.variantElectric,
  warm: styles.variantWarm,
  violet: styles.variantViolet,
};

export type GlassBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  variant?: GlassBadgeVariant;
};

export function GlassBadge({ children, className, variant = "neutral", ...rest }: GlassBadgeProps) {
  return (
    <span
      className={[layers.shell, layers.shellSm, styles.badge, className].filter(Boolean).join(" ")}
      {...rest}
    >
      <span className={[layers.plate, layers.plateSm, variantClass[variant]].join(" ")}>
        <span className={[layers.plateInner, styles.inner].join(" ")}>{children}</span>
      </span>
    </span>
  );
}
