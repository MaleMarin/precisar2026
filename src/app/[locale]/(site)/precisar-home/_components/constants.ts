export const ease = [0.22, 1, 0.36, 1] as const;

export type MarqueeItem = {
  word: string;
  state: string;
};

/** Fallback usado si la traducción no proporciona el array (defensa). */
export const MARQUEE_ITEMS_FALLBACK: readonly MarqueeItem[] = [
  { word: "Información", state: "seleccionada" },
  { word: "Información", state: "ordenada" },
  { word: "Información", state: "priorizada" },
  { word: "Información", state: "resumida" },
  { word: "Información", state: "generada" },
  { word: "Información", state: "comunicada" },
];
