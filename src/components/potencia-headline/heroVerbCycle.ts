/** Tiempos del ciclo de verbos del hero (JS + CSS deben alinearse). */

export const STAIN_TO_CORNER_MS = 2200;

/** Tras el scramble, cuánto queda el verbo fijo antes de la salida. */
export const VERB_SHOWN_MS = 1000;

export const VERB_CYCLE_GAP_MS = 280;

/** `--verb-flame-dur` cuando la mancha va al rincón (sincronizado con `STAIN_TO_CORNER_MS`). */
export function verbFlameToCornerCssDuration(): string {
  return `${(STAIN_TO_CORNER_MS / 1000).toFixed(2)}s`;
}
