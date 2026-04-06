/**
 * Arte de las tarjetas “Una pregunta al día” (frente y reverso por par).
 * Origen: carpeta “30 preguntas con sus respuestas”; servidos desde
 * /30-preguntas-con-sus-respuestas/…
 *
 * En el set actual faltan 39.png y 40.png → solo hay 29 pares; la tarjeta 30
 * sigue usando el fallback textual + enlace al PDF hasta que existan esas piezas.
 */
export const PREGUNTA_DIA_PUBLIC_BASE = "/30-preguntas-con-sus-respuestas";

/** [frente, reverso] en orden de pregunta 1…29 */
export const PREGUNTA_DIA_IMAGE_PAIRS: readonly [string, string][] = [
  ["1.png", "2.png"],
  ["3ok.png", "4ok.png"],
  ["5ok.png", "6ok.png"],
  ["7.png", "8.png"],
  ["9.png", "10.png"],
  ["11.png", "12.png"],
  ["13.png", "14.png"],
  ["15.png", "16.png"],
  ["17.png", "18.png"],
  ["19.png", "20.png"],
  ["21.png", "22.png"],
  ["23.png", "24.png"],
  ["25.png", "26.png"],
  ["27.png", "28.png"],
  ["29.png", "30.png"],
  ["31.png", "32.png"],
  ["33.png", "34.png"],
  ["35.png", "36.png"],
  ["37.png", "38.png"],
  ["41.png", "42.png"],
  ["43.png", "44.png"],
  ["45.png", "46.png"],
  ["47.png", "48.png"],
  ["49.png", "50.png"],
  ["51.png", "52.png"],
  ["53.png", "54.png"],
  ["55.png", "56.png"],
  ["57.png", "58.png"],
  ["59.png", "60.png"],
] as const;

export function getPreguntaDiaPair(index1Based: number): [string, string] | null {
  if (index1Based < 1 || index1Based > PREGUNTA_DIA_IMAGE_PAIRS.length) return null;
  return PREGUNTA_DIA_IMAGE_PAIRS[index1Based - 1] ?? null;
}
