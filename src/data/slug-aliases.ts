/**
 * Slugs históricos / rotos (Wix, URLs duplicadas, plantillas) → slug canónico en `articles.ts`.
 * El middleware redirige desde la raíz; esta tabla también alimenta `permanentRedirect` en la página del artículo.
 */
export const PRECISANDO_SLUG_ALIASES: Record<string, string> = {
  /** Slug corrupto generado por Wix (post OCDE). */
  "https-www-precisar-net-en-un-escenario-donde-las-noticias-falsas-circulan-a-gran-velocidad-la-ocde":
    "ocde-hechos-frente-a-falsedades-integridad-informativa",
  /** Plantilla de título no sustituida en el CMS. */
  "tu-título-de-qué-se-trata-tu-blog": "la-educacion-mediatica-como-necesidad-imperante-para-todos",
};
