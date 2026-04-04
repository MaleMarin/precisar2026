/** Easing y tiempos compartidos — ritmo tipo referencia premium (no gimmicks). */
export const EDITORIAL_EASE = [0.16, 1, 0.3, 1] as const;

export const motionPresets = {
  reveal: {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0 },
    transition: { duration: 0.72, ease: EDITORIAL_EASE },
  },
  revealTight: {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: EDITORIAL_EASE },
  },
  staggerChildren: 0.06,
  staggerCap: 0.42,
} as const;
