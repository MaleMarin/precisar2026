"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

type PageTransitionProps = {
  children: React.ReactNode;
  /** Fondo breve bajo la transición (custom properties). */
  overlayColor?: string;
};

export function PageTransition({ children, overlayColor }: PageTransitionProps) {
  const pathname = usePathname();
  const bg = overlayColor ?? "var(--color-bg, #0e0e0e)";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        style={{ minHeight: "100%", background: bg }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
