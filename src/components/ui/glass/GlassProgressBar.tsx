import type { HTMLAttributes } from "react";
import layers from "./LiquidGlassLayers.module.css";
import styles from "./GlassProgressBar.module.css";

export type GlassProgressBarProps = HTMLAttributes<HTMLDivElement> & {
  /** 0–100 */
  value?: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  indeterminate?: boolean;
};

export function GlassProgressBar({
  value = 0,
  max = 100,
  label,
  showValue = true,
  indeterminate = false,
  className,
  ...rest
}: GlassProgressBarProps) {
  const clamped = max <= 0 ? 0 : Math.min(100, Math.max(0, (value / max) * 100));
  const text = `${Math.round(clamped)}%`;

  return (
    <div
      className={[styles.wrap, indeterminate ? styles.indeterminate : "", className]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {(label || showValue) && (
        <div className={styles.labelRow}>
          {label ? <span className={styles.label}>{label}</span> : <span />}
          {showValue && !indeterminate ? <span className={styles.value}>{text}</span> : null}
        </div>
      )}
      <div
        className={[layers.shell, layers.shellPill, styles.trackShell].join(" ")}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={indeterminate ? undefined : Math.round(clamped)}
        aria-busy={indeterminate || undefined}
        aria-label={label}
        aria-valuetext={indeterminate ? undefined : text}
      >
        <div className={[layers.plate, layers.platePill, styles.trackPlate].join(" ")}>
          <div className={[layers.plateInner, styles.trackInner].join(" ")}>
            <div
              className={styles.fill}
              style={{ width: indeterminate ? "35%" : `${clamped}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
