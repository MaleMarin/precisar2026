export const ease = [0.22, 1, 0.36, 1] as const;

export type MarqueeItem = {
  actor: string;
  action: string;
  desktopOnly?: boolean;
};

/** Fallback usado si la traducción no proporciona el array (defensa). */
export const MARQUEE_ITEMS_FALLBACK: readonly MarqueeItem[] = [
  { actor: "Un medio", action: "selecciona" },
  { actor: "Una institución", action: "comunica", desktopOnly: true },
  { actor: "Una plataforma", action: "ordena" },
  { actor: "Un algoritmo", action: "prioriza" },
  { actor: "Una IA", action: "genera" },
];
