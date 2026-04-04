"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * Micro-parallax vertical muy sutil (máx. ~12px) en un contenedor.
 * Solo decorativo; no afecta lectura ni hit targets.
 */
export function MotionParallaxBg({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [6, -6]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {!reduce ? (
        <motion.div style={{ y }} className="will-change-transform">
          {children}
        </motion.div>
      ) : (
        children
      )}
    </div>
  );
}
