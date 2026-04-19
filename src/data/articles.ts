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
 * El cuerpo vive en `src/content/precisando/<slug>.md`. Inventario: `npm run precisando:audit` · `npm run precisando:audit:export`
 */
export const ARTICLES: ArticleMeta[] = [
  {
    catalogOrder: 1,
    slug: "chile-respondio-verdad-incomoda-informe-enero-2026",
    title: "Informarse en Chile hoy: menos ruido, más criterio.",
    category: "Informes",
    pubDate: "2026-01-31",
    excerpt:
      "366 personas respondieron en enero cómo realmente se informan. Lo que dijeron desarma la narrativa del «ciudadano descuidado» y la reemplaza con algo más honesto: estamos sobrepasados, no somos tontos.",
    downloadUrl: INFORME_CHILE_ENERO_2026_PDF,
    downloadLabel: "Descargar informe completo (PDF)",
  },
  {
    catalogOrder: 2,
    slug: "escuchar-primero-implementar-después-la-metodología-de-precisar-para-construir-ciudades-ami",
    title:
      "Escuchar Primero, Implementar Después: La Metodología de Precisar para Construir Ciudades AMI",
    category: "Ciudades AMI",
    pubDate: "2025-10-27",
    excerpt:
      "El 27 de octubre de 2025, en conmemoración del Día Mundial de las Ciudades y la Semana Mundial de la AMI, ciudades piloto de cuatro continentes participaron en el evento internacional organizado en colaboración con la UNESCO bajo el lema \"Ciudades MIL: Conectando comunidades a través de la información y la cultura\".",
  },
  {
    catalogOrder: 3,
    slug: "democracia-en-la-era-dedigital-y-la-ia-desafíos-y-soluciones",
    title: "Democracia en la Era deDigital y la IA: Desafíos y Soluciones",
    category: "Democracia",
    pubDate: "2025-10-23",
    excerpt:
      "La tecnología digital ha cambiado por completo la forma en que vivimos, nos comunicamos y participamos en la sociedad. Ya no es solo una herramienta; es el nuevo espacio donde ocurre gran parte de nuestra vida pública.",
  },
  {
    catalogOrder: 4,
    slug: "tres-desafíos-clave-para-la-alfabetización-mediática-en-américa-latina-lo-más-destacado-del-día-0-d",
    title:
      "Tres Desafíos Clave para la Alfabetización Mediática en América Latina: Lo Más Destacado del Día 0 de la Alianza MIL",
    category: "Educación Mediática",
    pubDate: "2025-10-22",
    excerpt:
      "Un día antes de la inauguración oficial de la Semana Mundial de la Alfabetización Mediática e Informacional, la UNESCO convocó a los miembros de la Alianza MIL y otras partes interesadas a un evento específico en Cartagena de Indias.",
  },
  {
    catalogOrder: 5,
    slug: "la-misión-crítica-de-la-ami-la-unesco-redefine-su-estrategia-ante-la-era-de-la-ia-generativa",
    title:
      "La Misión Crítica de la AMI: La UNESCO Redefine su Estrategia ante la Era de la IA Generativa",
    category: "Educación Mediática",
    pubDate: "2025-10-22",
    excerpt:
      "Un análisis del discurso de Tawfik Jelassi en la apertura de la Semana Mundial de la AMI 2025.",
  },
  {
    catalogOrder: 6,
    slug: "cómo-te-informas-hoy-precisar-lanza-consulta-ciudadana-para-mejorar-el-acceso-a-la-información",
    title:
      "“¿Cómo te informas hoy?”: Precisar lanza consulta ciudadana para mejorar el acceso a la información",
    category: "Precisar",
    pubDate: "2025-10-16",
    excerpt:
      "Hemos desarrollado una consulta ciudadana con una pregunta directa: “¿Cómo te informas hoy?”. El objetivo es convertir la experiencia cotidiana de las personas en insumos concretos para quienes producen y distribuyen información.",
    coverImage: "/covers/consulta-como-te-informas-hoy.png",
    coverAlt: "Arte «¿Cómo te informas hoy?» · consulta ciudadana Precisar",
  },
  {
    catalogOrder: 7,
    slug: "migración-y-conflictos-internacionales-dominan-las-tendencias-de-desinformación-en-américa-latina",
    title:
      "Migración y conflictos internacionales dominan las tendencias de desinformación en América Latina",
    category: "Desinformación",
    pubDate: "2025-10-16",
    excerpt:
      "Un nuevo informe de LatamChequea revela que las políticas migratorias de Trump y eventos globales como la guerra Israel-Irán alimentaron campañas masivas de desinformación durante el segundo trimestre de 2025.",
  },
  {
    catalogOrder: 8,
    slug: "la-crisis-de-la-información-cuando-la-audiencia-huye-de-lo-que-se-cree-esencial",
    title:
      "La crisis de la información: cuando la audiencia huye de lo que se cree esencial",
    category: "Tendencias",
    pubDate: "2025-09-23",
    excerpt:
      "¿Qué pasa si quienes evitan consumir noticias tienen razón y no necesitan el tipo de información que reciben?",
  },
  {
    catalogOrder: 9,
    slug: "la-nueva-alfabetización-de-leer-textos-a-leer-sistemas",
    title: "La Nueva Alfabetización: De Leer Textos a Leer Sistemas",
    category: "Inteligencia Artificial",
    pubDate: "2025-09-15",
    excerpt:
      "Vivimos en una era definida por una paradoja fundamental: mientras el acceso a la información es casi infinito, nuestra capacidad para comprender las fuerzas que la moldean parece disminuir.",
  },
  {
    catalogOrder: 10,
    slug: "la-ética-de-la-ia-en-la-educación-una-guía-para-directivos-docentes-y-alumnos",
    title:
      "La Ética de la IA en la Educación: Una Guía para Directivos, Docentes y Alumnos",
    category: "Inteligencia Artificial",
    pubDate: "2025-09-15",
    excerpt:
      "La integración de la inteligencia artificial en la educación presenta desafíos éticos que requieren atención y vigilancia por parte del profesorado.",
  },
  {
    catalogOrder: 11,
    slug: "desconectados-para-conectar-lo-que-revela-la-radiografía-digital-de-nuestros-niños-niñas-y-adolesc",
    title:
      "Desconectados para conectar: lo que revela la radiografía digital de nuestros niños, niñas y adolescentes",
    category: "Informes",
    pubDate: "2025-09-02",
    excerpt:
      "Una mirada a los usos digitales de la niñez y adolescencia en clave de derechos, riesgos y oportunidades.",
  },
  {
    catalogOrder: 12,
    slug: "presentan-estudio-sobre-usos-y-riesgos-digitales-en-preadolescentes-chilenos",
    title:
      "Presentan estudio sobre usos y riesgos digitales en preadolescentes chilenos",
    category: "Ciudadanía Digital",
    pubDate: "2025-07-14",
    excerpt:
      "El programa Formando Ciudadanía Digital de la UAI presentó los resultados del estudio \"Creciendo Conectados en Chile\".",
  },
  {
    catalogOrder: 13,
    slug: "el-futuro-es-ahora-por-qué-la-alfabetización-en-ia-es-la-nueva-frontera-del-pensamiento-crítico",
    title:
      "El Futuro es Ahora: Por Qué la Alfabetización en IA es la Nueva Frontera del Pensamiento Crítico",
    category: "Educación Mediática",
    pubDate: "2025-07-28",
    excerpt:
      "En Precisar, siempre hemos creído en ir directo al grano. Y hoy, el grano es este: la inteligencia artificial (IA) ya no es una promesa lejana.",
  },
  {
    catalogOrder: 14,
    slug: "foro-económico-mundial-la-desinformación-ya-es-el-riesgo-global-n-º-1",
    title:
      "Foro Económico Mundial: la desinformación ya es el riesgo global n.º 1",
    category: "Informes",
    pubDate: "2025-07-25",
    excerpt:
      "Replanteando la Alfabetización Mediática: Un Nuevo Modelo Ecosistémico para la Integridad de la Información, del Foro Económico Mundial, lanzado en julio de 2025.",
  },
  {
    catalogOrder: 15,
    slug: "pensamiento-crítico-en-tiempos-de-ruido-digital",
    title: "Pensamiento Crítico en Tiempos de Ruido Digital",
    category: "Tendencias",
    pubDate: "2025-07-23",
    excerpt:
      "En un entorno saturado de estímulos y datos, el desafío ya no es acceder a la información, sino discernir su valor.",
  },
  {
    catalogOrder: 16,
    slug: "informe-de-noticias-digitales-2025del-instituto-reuters-fragmentación-ia-y-la-búsqueda-de-confianz",
    title:
      "Informe de Noticias Digitales 2025 de Instituto Reuters: Fragmentación, IA y la Búsqueda de Confianza",
    category: "Informes",
    pubDate: "2025-07-20",
    excerpt:
      "El informe de este año llega en un momento de profunda incertidumbre política y económica, de alianzas geopolíticas cambiantes.",
  },
  {
    catalogOrder: 17,
    slug: "tendencias-digitales-emergentes-observadas-este-año-2025",
    title: "Tendencias Digitales Emergentes Observadas este año 2025",
    category: "Tendencias",
    pubDate: "2025-07-20",
    excerpt:
      "La cultura digital, lejos de ser una experiencia uniforme, se está fragmentando en comportamientos radicalmente diversos en 2025.",
  },
  {
    catalogOrder: 18,
    slug: "entender-los-filtros-burbuja-y-las-cámaras-de-eco-una-mirada-desde-la-antropología-digital",
    title:
      "Entender los Filtros Burbuja y las Cámaras de Eco: Una Mirada Desde la Antropología Digital",
    category: "Inteligencia Artificial",
    pubDate: "2025-07-20",
    excerpt:
      "Elegir el primer tema no fue fácil, pero decidimos partir desde lo que mejor conocemos: la cultura digital.",
  },
  {
    catalogOrder: 19,
    slug: "precisar-desarrolla-muestras-itinerantes-de-cultura-digital-y-busca-aliados-para-su-implementación-e",
    title:
      "Precisar desarrolla muestras itinerantes de cultura digital y busca aliados para su implementación en espacios públicos y privados",
    category: "Hub Digital Consciente",
    pubDate: "2025-07-14",
    excerpt:
      "Como parte de su programa HUB Digital Consciente, Precisar está trabajando en el diseño de muestras itinerantes que abordan temas urgentes de la cultura digital contemporánea.",
  },
  {
    catalogOrder: 20,
    slug: "algoritmos-y-misoginia-cómo-las-redes-sociales-están-moldeando-una-nueva-era-de-sexismo-entre-los-j",
    title:
      "Algoritmos y misoginia: cómo las redes sociales están moldeando una nueva era de sexismo entre los jóvenes",
    category: "Inteligencia Artificial",
    pubDate: "2025-07-14",
    excerpt:
      "En un mundo donde los algoritmos deciden qué vemos y cuándo lo vemos, la escritora y activista feminista Laura Bates alerta sobre una preocupante tendencia.",
  },
  {
    catalogOrder: 21,
    slug: "principios-globales-de-la-onu-para-la-integridad-de-la-información-claves-para-combatir-la-desinfor",
    title:
      "Principios Globales de la ONU para la integridad de la información: claves para combatir la desinformación",
    category: "Desinformación",
    pubDate: "2025-06-24",
    excerpt:
      "Los Principios Globales de la ONU para la integridad de la información nos muestran otra forma de comunicar.",
  },
  {
    catalogOrder: 22,
    slug: "comprendiendo-la-desinformación-un-recorrido-por-términos-y-técnicas-clave",
    title: "Comprendiendo la desinformación: un recorrido por términos y técnicas clave",
    category: "Desinformación",
    pubDate: "2025-06-24",
    excerpt:
      "Guía conceptual para reconocer técnicas habituales de desinformación y el vocabulario que ayuda a analizarlas con rigor.",
  },
  {
    catalogOrder: 23,
    slug: "la-tecnología-debe-potenciar-nuestra-individualidad-no-estandarizarla",
    title: "La tecnología debe potenciar nuestra individualidad, no estandarizarla",
    category: "Tendencias",
    pubDate: "2025-05-02",
    excerpt:
      "Reflexión sobre cómo la tecnología puede respetar la diversidad humana frente a dinámicas de homogeneización.",
  },
  {
    catalogOrder: 24,
    slug: "cómo-identificar-videos-falsos-sin-ser-un-experto",
    title: "Cómo identificar videos falsos sin ser un experto",
    category: "Ciudadanía Digital",
    pubDate: "2025-04-01",
    excerpt:
      "Pautas accesibles para sospechar y verificar contenidos audiovisuales manipulados o sacados de contexto.",
  },
  {
    catalogOrder: 25,
    slug: "el-uso-excesivo-o-inadecuado-de-las-redes-sociales-se-vincula-con-la-aceptación-y-difusión-de-notici",
    title:
      "El uso excesivo o inadecuado de las redes sociales se vincula con la aceptación y difusión de noticias falsas",
    category: "Informes",
    pubDate: "2025-06-24",
    excerpt:
      "Síntesis de evidencia sobre la relación entre dependencia emocional de redes y mayor propensión a creer y compartir desinformación.",
  },
  {
    catalogOrder: 26,
    slug: "elecciones",
    title: "Este 2025, Chile vive un nuevo proceso electoral",
    category: "Democracia",
    pubDate: "2025-06-24",
    excerpt:
      "Contexto y lectura mediática del proceso electoral desde la alfabetización en información y participación informada.",
  },
  {
    catalogOrder: 27,
    slug: "a-veces-cambiar-de-nombre-no-es-borrar-el-pasado-sino-precisar-mejor-hacia-dónde-se-quiere-ir",
    title: "A veces, cambiar de nombre no es borrar el pasado, sino precisar mejor hacia dónde se quiere ir",
    category: "Precisar",
    pubDate: "2025-10-26",
    excerpt:
      "Nota editorial sobre la evolución de la marca y la misión de Precisar en el ecosistema digital.",
  },
  {
    catalogOrder: 28,
    slug: "ia-y-educación-construyendo-el-futuro-a-través-de-la-transformación-digital",
    title: "IA y educación: construyendo el futuro a través de la transformación digital",
    category: "Educación Mediática",
    pubDate: "2025-06-24",
    excerpt:
      "Balance entre oportunidades y riesgos de la IA en políticas y prácticas educativas.",
  },
  {
    catalogOrder: 29,
    slug: "ciudades-mil-la-apuesta-por-el-desarrollo-urbano-y-la-cultura-de-la-información",
    title: "Ciudades MIL: la apuesta por el desarrollo urbano y la cultura de la información",
    category: "Ciudades AMI",
    pubDate: "2025-07-21",
    excerpt:
      "Cómo las ciudades incorporan alfabetización mediática e informacional en sus agendas de desarrollo y convivencia.",
  },
  {
    catalogOrder: 30,
    slug: "redes-sociales-en-chile-mucho-scroll-poco-control",
    title: "Redes sociales en Chile: mucho scroll, poco control",
    category: "Tendencias",
    pubDate: "2025-06-24",
    excerpt:
      "Panorama de hábitos de uso en Chile y su relación con autonomía, bienestar y criterio frente a la información.",
  },
  {
    catalogOrder: 31,
    slug: "ocde-hechos-frente-a-falsedades-integridad-informativa",
    title:
      "Hechos frente a falsedades: la OCDE y la integridad de la información para fortalecer la democracia",
    category: "Informes",
    pubDate: "2025-06-24",
    excerpt:
      "Síntesis del informe de la OCDE sobre gobernanza, transparencia y acciones frente a la desinformación en espacios democráticos.",
  },
  {
    catalogOrder: 32,
    slug: "la-educacion-mediatica-como-necesidad-imperante-para-todos",
    title: "La educación mediática como necesidad imperante para todos",
    category: "Educación Mediática",
    pubDate: "2025-06-24",
    excerpt:
      "En un mundo donde la información se expande rápidamente, la educación mediática es una necesidad para todas las personas, no solo para estudiantes y docentes.",
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
