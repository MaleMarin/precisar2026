"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Children, type ReactNode } from "react";
import { motionPresets } from "@/lib/motion-editorial";

type Props = {
  children: ReactNode;
  className?: string;
  /** Espaciado entre ítems en lista (segundos). */
  stagger?: number;
  /** Los hijos participan en el grid/flex del padre (evita romper `col-span`). */
  layoutContents?: boolean;
};

/**
 * Stagger corto en hijos directos (solo primer nivel).
 * Respeta prefers-reduced-motion.
 */
export function MotionStagger({
  children,
  className = "",
  stagger = motionPresets.staggerChildren,
  layoutContents = false,
}: Props) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children).filter(Boolean);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {items.map((child, i) => {
        const delay = Math.min(i * stagger, motionPresets.staggerCap);
        return (
          <motion.div
            key={i}
            className={layoutContents ? "contents" : undefined}
            initial={motionPresets.revealTight.hidden}
            whileInView={motionPresets.revealTight.show}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ ...motionPresets.revealTight.transition, delay }}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
}
