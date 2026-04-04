"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EDITORIAL_EASE } from "@/lib/motion-editorial";

/** Reveal por módulo; respeta prefers-reduced-motion. */
export function ProgramModShell({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      id={id}
      className={className}
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.52, ease: EDITORIAL_EASE }}
    >
      {children}
    </motion.section>
  );
}
