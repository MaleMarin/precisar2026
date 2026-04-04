"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { EDITORIAL_EASE } from "@/lib/motion-editorial";

export function MotionSection({
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
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: 0.75, ease: EDITORIAL_EASE }}
    >
      {children}
    </motion.section>
  );
}
