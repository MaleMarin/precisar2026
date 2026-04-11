/** Tiempos del ciclo de verbos del hero (JS + CSS deben alinearse). */

export const STAIN_TO_CORNER_MS = 1900;

/** Tras el scramble, cuánto queda el verbo fijo antes de la salida. */
export const VERB_SHOWN_MS = 1000;

/** Transición de la mancha al reanudar detrás del verbo al cambiar de palabra (CSS `--verb-flame-dur`). */
export const FLAME_SYNC_TO_VERB_MS = 400;

/** Pulso de resplandor una vez alineada la mancha con el verbo. */
export const FLAME_VERB_PULSE_MS = 300;

/** Transición suave mientras la mancha vaga en `shown`. */
export const VERB_FLAME_SHOWN_DRIFT_CSS = "1.65s";

/** Seguimiento del verbo durante el scramble (`in`); demasiado corto = saltos bruscos en el gradiente. */
export const VERB_FLAME_IN_FOLLOW_CSS = "0.52s";

export const VERB_CYCLE_GAP_MS = 220;

/** `--verb-flame-dur` cuando la mancha va al rincón (sincronizado con `STAIN_TO_CORNER_MS`). */
export function verbFlameToCornerCssDuration(): string {
  return `${(STAIN_TO_CORNER_MS / 1000).toFixed(2)}s`;
}
