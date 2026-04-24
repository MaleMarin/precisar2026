"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type SomosRevealProps = {
  children: ReactNode;
  className?: string;
};

/** Entrada suave al scroll: sin sticky ni perspectiva (mejor para lectura larga). */
export function SomosReveal({ children, className }: SomosRevealProps) {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.14, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
