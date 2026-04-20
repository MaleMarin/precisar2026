/**
 * Etiqueta visible de fecha para artículos Precisando: solo el año
 * (`pubDate` en datos suele ser `YYYY-MM-DD` o `YYYY`).
 */
export function articleYearLabel(pubDate: string): string {
  const t = pubDate.trim();
  if (/^\d{4}$/.test(t)) return t;
  const m = /^(\d{4})/.exec(t);
  return m ? m[1] : t;
}
