export type ArticleMeta = {
  slug: string;
  title: string;
  category: string;
  pubDate: string;
  /** Orden en listados Precisando (1 = primero). Independiente de la fecha mostrada en la ficha. */
  catalogOrder: number;
  excerpt: string;
  /** Ruta bajo `/public` (p. ej. `/covers/nota.png`). */
  coverImage?: string;
  /** Texto alternativo de la portada (accesibilidad). */
  coverAlt?: string;
  /** Archivo estático en `/public` para descarga (PDF, etc.). */
  downloadUrl?: string;
  downloadLabel?: string;
};

/**
 * Informe «Chile respondió…». El archivo físico debe estar en `web/public/` (mismo nombre que en
 * precisar2026/public si tienes dos carpetas en el repo). URL codificada para espacios en el nombre.
 */
export const INFORME_CHILE_ENERO_2026_PDF =
  "/Informe%20final%20Hallazgos%20FONSELP_%20V.2.pdf";

/**
 * Listado y SEO: título, fecha, categoría y `excerpt`.
 *
 * El cuerpo vive en `src/content/precisando/<slug>.md`. Solo publicamos en catálogo entradas cuyo
 * markdown tiene cuerpo sustancial (p. ej. `npm run precisando:audit`, umbral 800 caracteres).
 *
 * Inventario: `npm run precisando:audit` · `npm run precisando:audit:export`
 *
 * Orden en sitio: `catalogOrder` (1 = primero). Alineado al listado editorial (informe FONSELP primero,
 * luego el resto según prioridad en CMS; notas sin par en capturas quedan al final).
 */
export const ARTICLES: ArticleMeta[] = [
  {
    slug: "chile-respondio-verdad-incomoda-informe-enero-2026",
    title: "Informarse en Chile hoy: menos ruido, más criterio.",
    category: "Informes",
    catalogOrder: 1,
    pubDate: "2026-01-31",
    excerpt:
      "366 personas respondieron en enero cómo realmente se informan. Lo que dijeron desarma la narrativa del «ciudadano descuidado» y la reemplaza con algo más honesto: estamos sobrepasados, no somos tontos.",
    downloadUrl: INFORME_CHILE_ENERO_2026_PDF,
    downloadLabel: "Descargar informe completo (PDF)",
  },
  {
    slug: "democracia-en-la-era-dedigital-y-la-ia-desafíos-y-soluciones",
    title: "Democracia en la Era deDigital y la IA: Desafíos y Soluciones",
    category: "Democracia",
    catalogOrder: 2,
    pubDate: "2025-10-23",
    excerpt:
      "La tecnología digital ha cambiado por completo la forma en que vivimos, nos comunicamos y participamos en la sociedad. Ya no es solo una herramienta; es el nuevo espacio donde ocurre gran parte de nuestra vida pública.",
  },
  {
    slug: "cómo-te-informas-hoy-precisar-lanza-consulta-ciudadana-para-mejorar-el-acceso-a-la-información",
    title:
      "“¿Cómo te informas hoy?”: Precisar lanza consulta ciudadana para mejorar el acceso a la información",
    category: "Precisar",
    catalogOrder: 3,
    pubDate: "2025-10-16",
    excerpt:
      "Hemos desarrollado una consulta ciudadana con una pregunta directa: “¿Cómo te informas hoy?”. El objetivo es convertir la experiencia cotidiana de las personas en insumos concretos para quienes producen y distribuyen información.",
    coverImage: "/covers/consulta-como-te-informas-hoy.png",
    coverAlt: "Arte «¿Cómo te informas hoy?» · consulta ciudadana Precisar",
  },
  {
    slug: "comprendiendo-la-desinformación-un-recorrido-por-términos-y-técnicas-clave",
    title: "Comprendiendo la desinformación: un recorrido por términos y técnicas clave",
    category: "Desinformación",
    catalogOrder: 4,
    pubDate: "2025-06-24",
    excerpt:
      "Guía conceptual para reconocer técnicas habituales de desinformación y el vocabulario que ayuda a analizarlas con rigor.",
  },
  {
    slug: "el-uso-excesivo-o-inadecuado-de-las-redes-sociales-se-vincula-con-la-aceptación-y-difusión-de-notici",
    title:
      "El uso excesivo o inadecuado de las redes sociales se vincula con la aceptación y difusión de noticias falsas",
    category: "Informes",
    catalogOrder: 5,
    pubDate: "2025-06-24",
    excerpt:
      "Síntesis de evidencia sobre la relación entre dependencia emocional de redes y mayor propensión a creer y compartir desinformación.",
  },
  {
    slug: "a-veces-cambiar-de-nombre-no-es-borrar-el-pasado-sino-precisar-mejor-hacia-dónde-se-quiere-ir",
    title: "A veces, cambiar de nombre no es borrar el pasado, sino precisar mejor hacia dónde se quiere ir",
    category: "Precisar",
    catalogOrder: 6,
    pubDate: "2025-10-26",
    excerpt:
      "Nota editorial sobre la evolución de la marca y la misión de Precisar en el ecosistema digital.",
  },
  {
    slug: "la-educacion-mediatica-como-necesidad-imperante-para-todos",
    title: "La educación mediática como necesidad imperante para todos",
    category: "Educación Mediática",
    catalogOrder: 7,
    pubDate: "2025-06-24",
    excerpt:
      "En un mundo donde la información se expande rápidamente, la educación mediática es una necesidad para todas las personas, no solo para estudiantes y docentes.",
  },
  {
    slug: "la-tecnología-debe-potenciar-nuestra-individualidad-no-estandarizarla",
    title: "La tecnología debe potenciar nuestra individualidad, no estandarizarla",
    category: "Tendencias",
    catalogOrder: 8,
    pubDate: "2025-05-02",
    excerpt:
      "Reflexión sobre cómo la tecnología puede respetar la diversidad humana frente a dinámicas de homogeneización.",
  },
  {
    slug: "cómo-identificar-videos-falsos-sin-ser-un-experto",
    title: "Cómo identificar videos falsos sin ser un experto",
    category: "Ciudadanía Digital",
    catalogOrder: 9,
    pubDate: "2025-04-01",
    excerpt:
      "Pautas accesibles para sospechar y verificar contenidos audiovisuales manipulados o sacados de contexto.",
  },
  {
    slug: "ocde-hechos-frente-a-falsedades-integridad-informativa",
    title:
      "Hechos frente a falsedades: la OCDE y la integridad de la información para fortalecer la democracia",
    category: "Informes",
    catalogOrder: 10,
    pubDate: "2025-06-24",
    excerpt:
      "Síntesis del informe de la OCDE sobre gobernanza, transparencia y acciones frente a la desinformación en espacios democráticos.",
  },
  {
    slug: "elecciones",
    title: "Este 2025, Chile vive un nuevo proceso electoral",
    category: "Democracia",
    catalogOrder: 11,
    pubDate: "2025-06-24",
    excerpt:
      "Contexto y lectura mediática del proceso electoral desde la alfabetización en información y participación informada.",
  },
];

/** Compara slugs ignorando mayúsculas y marcas diacríticas (URLs ASCII vs slugs con tildes). */
function foldSlugForCompare(s: string): string {
  return s
    .normalize("NFC")
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase();
}

export function articleBySlug(slug: string): ArticleMeta | undefined {
  if (!slug) return undefined;
  const exact = ARTICLES.find((a) => a.slug === slug);
  if (exact) return exact;
  const folded = foldSlugForCompare(slug);
  return ARTICLES.find((a) => foldSlugForCompare(a.slug) === folded);
}

export const PRECISANDO_PAGE_SIZE = 10;

/** Listado editorial: `catalogOrder` (menor = primero); empate por fecha descendente. */
export function articlesSortedByDate(): ArticleMeta[] {
  return [...ARTICLES].sort((a, b) => {
    const byOrder = a.catalogOrder - b.catalogOrder;
    if (byOrder !== 0) return byOrder;
    return b.pubDate.localeCompare(a.pubDate);
  });
}

export function uniqueCategories(): string[] {
  const s = new Set(ARTICLES.map((a) => a.category));
  return [...s].sort((a, b) => a.localeCompare(b));
}

/** Set de slugs canónicos (para redirects desde la raíz). */
export const ARTICLE_SLUG_SET = new Set(ARTICLES.map((a) => a.slug));
