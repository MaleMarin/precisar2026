export const ease = [0.22, 1, 0.36, 1] as const;

/** Fallback usado si la traducción no proporciona el array (defensa). */
export const MARQUEE_CHUNKS_FALLBACK: readonly (readonly [string, string])[] = [
  ["Educación", "mediática"],
  ["Pensamiento", "crítico"],
  ["Datos", "con contexto"],
  ["Comunidad", "informada"],
  ["Tecnología", "con criterio"],
];
