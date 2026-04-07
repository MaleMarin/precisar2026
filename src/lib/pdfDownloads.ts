import { PDFS } from "@/lib/site";

/** PDFs con carátula en `public/covers/` (sustituye .svg por .jpg o .webp si exportas la portada real del documento). */
export const PDF_DOWNLOAD_UI = {
  saberes30Preguntas: {
    href: PDFS.saberes30Preguntas,
    coverSrc: "/covers/30-preguntas-precisar.svg",
    coverAlt: "Carátula del recurso «30 días, 30 preguntas» en PDF",
  },
  propuestaPoliticaAlfabetizacion: {
    href: PDFS.propuestaPoliticaAlfabetizacion,
    coverSrc: "/covers/propuesta-politica-alfabetizacion.svg",
    coverAlt: "Carátula de la Propuesta de política de alfabetización mediática y digital (PDF)",
  },
} as const;

export type PdfDownloadSpec = (typeof PDF_DOWNLOAD_UI)[keyof typeof PDF_DOWNLOAD_UI];
