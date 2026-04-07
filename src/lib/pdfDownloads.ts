import { PDFS } from "@/lib/site";

export type PdfPreviewMode = "image" | "embed";

export type PdfDownloadSpec = {
  href: string;
  coverAlt: string;
  preview: PdfPreviewMode;
  coverSrc?: string;
};

const embed = (href: string, coverAlt: string): PdfDownloadSpec => ({
  href,
  coverAlt,
  preview: "embed",
});

const image = (href: string, coverSrc: string, coverAlt: string): PdfDownloadSpec => ({
  href,
  coverSrc,
  coverAlt,
  preview: "image",
});

/**
 * PDFs del sitio: vista previa de portada (imagen en `public/covers/` o iframe primera página).
 * Orden de `RESOLVE_ORDER`: el primero que coincida con `href` gana (hay URLs repetidas entre Saberes y portada).
 */
export const PDF_DOWNLOAD_UI = {
  saberesIaAula1: embed(
    PDFS.saberesIaAula1,
    "Portada del PDF «Inteligencia Artificial en el Aula: Qué, Cómo y Para Qué»",
  ),
  saberesIaAula2: embed(
    PDFS.saberesIaAula2,
    "Portada del PDF «Guía Práctica de Educación Mediática e Informacional en Chile (EducaMedios)»",
  ),
  saberes30Preguntas: image(
    PDFS.saberes30Preguntas,
    "/covers/30-preguntas-precisar.svg",
    "Carátula del recurso «30 días, 30 preguntas» en PDF",
  ),
  saberesGuiaIa: embed(PDFS.saberesGuiaIa, "Portada de la guía práctica de Inteligencia Artificial"),
  saberesUsoConscienteIa: embed(
    PDFS.saberesUsoConscienteIa,
    "Portada del PDF «Uso consciente de la inteligencia artificial»",
  ),
  saberesEducadores12: embed(
    PDFS.saberesEducadores12,
    "Portada de la guía para educadores con 12 preguntas clave",
  ),
  saberesVerificarImagenes: embed(
    PDFS.saberesVerificarImagenes,
    "Portada de la guía práctica para verificar imágenes",
  ),
  hubDesinformacion: embed(
    PDFS.hubDesinformacion,
    "Portada del PDF de la edición Desinformación del Hub Digital Consciente",
  ),
  hubIaAlgoritmos: embed(
    PDFS.hubIaAlgoritmos,
    "Portada del PDF de la edición IA y Algoritmos del Hub Digital Consciente",
  ),
  ciudadesAmiUnesco: embed(
    PDFS.ciudadesAmiUnesco,
    "Portada del marco UNESCO Ciudades AMI (alfabetización mediática e informacional)",
  ),
  propuestaPoliticaAlfabetizacion: image(
    PDFS.propuestaPoliticaAlfabetizacion,
    "/covers/propuesta-politica-alfabetizacion.svg",
    "Carátula de la Propuesta de política de alfabetización mediática y digital (PDF)",
  ),
  homeSaberes1: embed(PDFS.homeSaberes1, "Vista previa del recurso abierto Saberes (PDF 1)"),
  homeSaberes2: embed(PDFS.homeSaberes2, "Vista previa del recurso abierto Saberes (PDF 2)"),
  homeSaberes3: embed(PDFS.homeSaberes3, "Vista previa del recurso abierto Saberes (PDF 3)"),
  homeSaberes4: embed(PDFS.homeSaberes4, "Vista previa del recurso abierto Saberes (PDF 4)"),
} as const;

export type PdfDownloadUiKey = keyof typeof PDF_DOWNLOAD_UI;

/** Paneles de portada (#saberes): cuatro PDFs en paralelo a las rutas de experiencias. */
export const HOME_SABERES_PDF_ORDER = [
  "homeSaberes1",
  "homeSaberes2",
  "homeSaberes3",
  "homeSaberes4",
] as const satisfies readonly PdfDownloadUiKey[];

const RESOLVE_ORDER: readonly PdfDownloadUiKey[] = [
  "saberesIaAula1",
  "saberesIaAula2",
  "saberes30Preguntas",
  "saberesGuiaIa",
  "saberesUsoConscienteIa",
  "saberesEducadores12",
  "saberesVerificarImagenes",
  "hubDesinformacion",
  "hubIaAlgoritmos",
  "ciudadesAmiUnesco",
  "propuestaPoliticaAlfabetizacion",
];

export function resolvePdfDownloadSpec(href: string): PdfDownloadSpec | null {
  for (const key of RESOLVE_ORDER) {
    const s = PDF_DOWNLOAD_UI[key];
    if (s.href === href) return s;
  }
  return null;
}
