"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type SomosMotionSectionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Replica la sensación de "sesión" de portada:
 * aparece desde abajo con ligera escala y se estabiliza al entrar al viewport.
 */
export function SomosMotionSection({ children, className }: SomosMotionSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 22%"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [54, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.965, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.28, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={reduceMotion ? undefined : { y, scale, opacity }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
