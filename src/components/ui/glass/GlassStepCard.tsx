import type { HTMLAttributes, ReactNode } from "react";
import { GlassPanel } from "./GlassPanel";
import styles from "./GlassStepCard.module.css";

export type GlassStepCardProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  step: number | string;
  title: ReactNode;
  children: ReactNode;
};

export function GlassStepCard({ step, title, children, className, ...rest }: GlassStepCardProps) {
  const label = typeof step === "number" ? String(step).padStart(2, "0") : step;

  return (
    <GlassPanel padding="md" radius="lg" className={className} {...rest}>
      <div className={styles.grid}>
        <div className={styles.stepNum} aria-hidden="true">
          {label}
        </div>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </GlassPanel>
  );
}
