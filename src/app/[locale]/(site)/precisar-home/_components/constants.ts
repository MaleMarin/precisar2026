export const ease = [0.22, 1, 0.36, 1] as const;

export type MarqueeChunk = readonly [string] | readonly [string, string];

/** Fallback usado si la traducción no proporciona el array (defensa). */
export const MARQUEE_CHUNKS_FALLBACK: readonly MarqueeChunk[] = [
  ["La información no llega sola"],
  ["Un medio", "selecciona"],
  ["Una institución", "comunica"],
  ["Una plataforma", "ordena"],
  ["Un algoritmo", "prioriza"],
  ["Una IA", "genera"],
  ["Comprender también es entender cómo llegó hasta ti"],
];
