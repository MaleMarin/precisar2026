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

const MONTHS_ES = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
] as const;

/** Fecha editorial completa, p. ej. «8 de septiembre de 2026». */
export function articleDisplayDate(pubDate: string, locale = "es"): string {
  const t = pubDate.trim();
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(t);
  if (!m) return articleYearLabel(t);
  const year = Number(m[1]);
  const month = Number(m[2]);
  const day = Number(m[3]);
  if (locale === "en") {
    const date = new Date(Date.UTC(year, month - 1, day));
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  }
  if (locale === "pt") {
    const date = new Date(Date.UTC(year, month - 1, day));
    return new Intl.DateTimeFormat("pt-BR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);
  }
  return `${day} de ${MONTHS_ES[month - 1]} de ${year}`;
}

export function articleDateTime(pubDate: string): string {
  const t = pubDate.trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(t) ? t : articleYearLabel(t);
}
