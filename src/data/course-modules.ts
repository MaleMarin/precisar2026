export type CourseModule = {
  n: number;
  /** Título temático visible (revisar contra narración en precisar.net /1–/25). */
  themeTitle: string;
  /** Resumen o gancho del módulo; vacío si falta transcripción. */
  lead: string;
  /** Bloques previstos del módulo completo (texto fiel pendiente de transcripción). */
  contentOutline: string[];
  /** Falta volcar texto/audio/video del módulo interactivo. */
  pendingTranscript: boolean;
  /** Recursos aún no portados (p. ej. animaciones, Lottie, audio). */
  pendingAssets: string[];
};

/**
 * 25 pasos del recorrido «Aquí No Pasa».
 * Los títulos siguen una progresión pedagógica coherente con el curso de desinformación;
 * deben validarse contra el sitio publicado (los HTML de Wix no exponen título en <title>).
 */
const THEMES: Omit<CourseModule, "n">[] = [
  {
    themeTitle: "Bienvenida: qué es «Aquí No Pasa»",
    lead: "Contrato de lectura y objetivos del recorrido frente a la desinformación.",
    contentOutline: [
      "Qué es el curso y a quién está dirigido.",
      "Cómo usar los 25 módulos y el ritmo sugerido.",
      "Compromiso con el lenguaje respetuoso y la verificación práctica.",
    ],
    pendingTranscript: true,
    pendingAssets: ["Transcripción voz en off / textos de pantalla"],
  },
  {
    themeTitle: "Mapa rápido: noticias, opiniones y propaganda",
    lead: "Diferenciar formatos y propósitos para no confundir persuasión con información verificada.",
    contentOutline: [
      "Hecho verificable, interpretación y opinión.",
      "Publicidad, propaganda y contenido patrocinado disimulado.",
      "Ejemplos breves de titulares que mezclan géneros.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Por qué mentir a veces «conviene»",
    lead: "Incentivos económicos, políticos y sociales detrás de contenidos falsos o engañosos.",
    contentOutline: [
      "Monetización por clics y engagement.",
      "Manipulación política y narrativas de identidad.",
      "Rumores sociales: pertenencia y «alerta» entre pares.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Emociones en primer plano",
    lead: "Cómo la ira, el miedo y la moralidad rápida impulsan el clic y el compartir.",
    contentOutline: [
      "Disparadores emocionales en titulares e imágenes.",
      "Por qué el cerebro prioriza la amenaza antes que la comprobación.",
      "Pausa emocional antes de compartir.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Primer filtro: quién gana con este mensaje",
    lead: "Preguntas básicas de agenda y conflicto de intereses.",
    contentOutline: [
      "Fuente, autoría y posible beneficio.",
      "Conflictos de interés explícitos e implícitos.",
      "Mini checklist aplicable a cualquier publicación.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Imágenes y videos: contexto robado",
    lead: "Manipulación por recorte, fecha falsa o escena de otra geografía.",
    contentOutline: [
      "Imágenes de otro lugar u otro momento presentadas como actuales.",
      "Deepfakes ligeros: edición barata vs. generación completa.",
      "Qué buscar en el encuadre, metadatos y búsqueda inversa (introducción).",
    ],
    pendingTranscript: true,
    pendingAssets: ["Clips o secuencias del módulo original"],
  },
  {
    themeTitle: "Texto e infografías: datos dudosos",
    lead: "Cifras sin fuente, ejes truncados y comparaciones forzadas.",
    contentOutline: [
      "Fuentes primarias vs. citas encadenadas.",
      "Gráficos engañosos: escalas, porcentajes y «correlación ≠ causa».",
      "Texto largo que esconde una afirmación sin evidencia.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Cuentas y perfiles: autenticidad",
    lead: "Señales de bots, suplantación y coordinación inauténtica.",
    contentOutline: [
      "Perfiles nuevos, fotos genéricas y patrones de publicación.",
      "Suplantación de medios, ONG o autoridades.",
      "Coordinación: mismos textos, mismos enlaces, mismos horarios.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Cadenas y reenvíos en mensajería",
    lead: "Por qué WhatsApp y apps cerradas amplifican rumores.",
    contentOutline: [
      "Velocidad del reenvío y pérdida de contexto.",
      "«Me lo mandaron» como prueba de veracidad.",
      "Buenas prácticas: pedir fuente, enlazar desmentidos, no reenviar sin comprobar.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Pausa, pregunta, compara (introducción)",
    lead: "Presentación del método de tres pasos antes de compartir.",
    contentOutline: [
      "Pausa: frenar el impulso de compartir.",
      "Pregunta: qué afirma el mensaje y qué falta.",
      "Compara: otras fuentes y archivo o verificadores.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Herramientas abiertas de verificación",
    lead: "Búsqueda inversa de imágenes, archivo web y verificación de datos.",
    contentOutline: [
      "Búsqueda inversa de imágenes (concepto y usos).",
      "Wayback Machine y capturas históricas.",
      "Dónde consultar datos oficiales y bases abiertas.",
    ],
    pendingTranscript: true,
    pendingAssets: ["Enlaces o incrustados del módulo original"],
  },
  {
    themeTitle: "Lenguaje, titulares y «troleo» informativo",
    lead: "Ironía, sátira y contenido híbrido que se lee como noticia.",
    contentOutline: [
      "Sátira mal etiquetada que circula como hecho.",
      "Titulares ambiguos y «rage bait».",
      "Cómo leer el cuerpo del artículo y no solo el titular.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Profundidad: informe vs. opinión calificada de experto",
    lead: "Cómo leer estudios y comunicados sin caer en autoridad falsa.",
    contentOutline: [
      "Revisión por pares y preprints.",
      "Experto citado fuera de su campo.",
      "Comunicados de prensa vs. paper original.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Sesgos cognitivos útiles para desinformadores",
    lead: "Confirmación, anclaje y disponibilidad en la lectura de pantalla.",
    contentOutline: [
      "Sesgo de confirmación y burbujas iniciales.",
      "Anclaje: la primera cifra que vemos.",
      "Disponibilidad: lo memorable no es lo más frecuente.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Algoritmos: qué priorizan y por qué te llega eso",
    lead: "Introducción ligera a recomendación y engagement.",
    contentOutline: [
      "Señales de engagement (tiempo, clics, comentarios).",
      "Por qué lo polémico suele ganar.",
      "Pequeñas acciones para diversificar el feed.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Burbujas y polarización",
    lead: "Cómo se cierran círculos de evidencia y lenguaje.",
    contentOutline: [
      "Ecosistemas mediáticos y vocabularios paralelos.",
      "Desconfianza cruzada y deshumanización.",
      "Salidas: fuentes transversales y conversación uno a uno.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Desmentidos: cómo hacerlos sin empeorar el rumor",
    lead: "Efecto título, repetición del mito y mejores prácticas.",
    contentOutline: [
      "Efecto «titular del mito»: repetir la mentira en grande.",
      "Estructura recomendada: hecho primero, mito después, breve.",
      "Canales y tono según la audiencia.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Salud y ciencia: desinformación de alto riesgo",
    lead: "Patrones en epidemias, vacunas y «tratamientos milagro».",
    contentOutline: [
      "Apelación a «naturaleza» y miedo a instituciones.",
      "Gráficos y estadísticas mal interpretadas en salud.",
      "Dónde acudir: organismos de salud pública y revisión sistemática.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Elecciones y deliberación",
    lead: "Desinformación electoral y responsabilidad del ciudadano lector.",
    contentOutline: [
      "Rumores sobre fraude, fechas y lugares de votación.",
      "Contenido generado para desmovilizar o confundir.",
      "Verificación con fuentes electorales oficiales.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Privacidad y datos personales en la duda",
    lead: "Cuándo un «test» o encuesta es recolección de datos.",
    contentOutline: [
      "Permisos de app y exceso de datos.",
      "Cadenas que piden datos personales «para ayudar».",
      "Buenas prácticas mínimas de higiene digital.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "IA generativa: nuevas superficies de engaño",
    lead: "Texto, voz e imagen sintéticos; límites de la detección automática.",
    contentOutline: [
      "Texto «plausible» sin fuentes.",
      "Voz clonada y video sintético (concepto).",
      "Heurísticas: contexto, inconsistencias y fuente original.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Conversar sin alimentar el rumor",
    lead: "Argumentación en familia y grupos sin viralizar la mentira.",
    contentOutline: [
      "Escucha y preguntas abiertas vs. confrontación frontal.",
      "Compartir verificaciones sin humillar.",
      "Cuándo conviene no seguir la discusión en público.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Autocuidado digital",
    lead: "Ritmos de consumo, notificaciones y bienestar frente al ruido.",
    contentOutline: [
      "Sobrecarga informativa y fatiga moral.",
      "Límites de pantalla y curación de alertas.",
      "Pausas sin culpa: desconectar no es ignorar el mundo.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Compromiso: qué haré distinto mañana",
    lead: "Micro-hábitos de verificación y participación informada.",
    contentOutline: [
      "Elegir 2–3 hábitos concretos y realistas.",
      "Compartir solo lo verificado; corregir en público cuando equivoques.",
      "Vínculo con Participa y otros programas Precisar.",
    ],
    pendingTranscript: true,
    pendingAssets: [],
  },
  {
    themeTitle: "Cierre: recursos Precisar y seguimos en contacto",
    lead: "Enlace a programas, Saberes y consulta ciudadana.",
    contentOutline: [
      "Recapitulación del recorrido en una frase por módulo (en versión final).",
      "Enlaces a Precisando, Saberes, Participa y experiencias.",
      "Invitación a newsletter o seguimiento (según política del sitio).",
    ],
    pendingTranscript: true,
    pendingAssets: ["CTA y assets finales del recorrido"],
  },
];

export const AQUI_NO_PASA_MODULES: CourseModule[] = THEMES.map((t, i) => ({
  n: i + 1,
  ...t,
}));

export function moduleByNumber(n: number): CourseModule | undefined {
  return AQUI_NO_PASA_MODULES.find((m) => m.n === n);
}
