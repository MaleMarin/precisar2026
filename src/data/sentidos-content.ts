import type { SentidoDigital } from "@/data/sentidos-digitales";

export type SentidoContent = SentidoDigital & {
  /** Texto fiel al marco del sitio (sin componente interactivo Wix). */
  body: string[];
  /** Último segmento de la URL histórica en precisar.net (sin slash inicial). */
  legacyPath: string;
};

/** Contenido textual migrado; la pieza interactiva original sigue en precisar.net hasta el rediseño. */
export const SENTIDOS_CONTENT: SentidoContent[] = [
  {
    slug: "tacto",
    title: "Tacto digital",
    legacyPath: "sentido-digital-del-tacto",
    body: [
      "El tacto digital es la capacidad de percibir límites, texturas y fricciones en el entorno en línea: qué nos resulta cómodo, qué nos agota y dónde necesitamos pausas.",
      "Así como el tacto físico nos dice si algo está caliente o áspero, el tacto digital nos ayuda a reconocer cuándo una interfaz nos presiona con notificaciones, cuándo un grupo nos exige respuesta inmediata y cuándo merece la pena alejarse.",
      "Fortalecer este sentido implica acuerdos claros con uno mismo y con otros: horarios sin pantalla, silencios de notificaciones y conversaciones sobre cómo queremos habitar lo digital.",
    ],
  },
  {
    slug: "olfato",
    title: "Olfato digital",
    legacyPath: "sentido-digital-del-olfato",
    body: [
      "El olfato digital es la intuición para detectar cuando «algo huele mal» en un mensaje: exceso de urgencia, promesas imposibles o un tono que busca solo reacción emocional.",
      "No se trata de paranoia, sino de curiosidad crítica: detenerse un segundo antes de reenviar, buscar otra fuente o preguntar en voz alta «¿por qué me llegó esto ahora?».",
      "Ejercitar el olfato digital protege a la comunidad frente a cadenas de rumores y a uno mismo frente al agotamiento de vivir en alerta permanente.",
    ],
  },
  {
    slug: "vision",
    title: "Visión digital",
    legacyPath: "sentido-digital-visión",
    body: [
      "La visión digital es mirar de frente lo que hay en pantalla sin quedarse solo en el titular: contexto, autor, fecha y formato.",
      "Incluye saber que las imágenes y videos pueden estar recortados, que los gráficos pueden mentir por escala y que el diseño bonito no garantiza veracidad.",
      "Una buena visión digital combina herramientas (búsqueda inversa, archivo) con hábitos: ampliar la ventana, leer hasta el final y comparar coberturas.",
    ],
  },
  {
    slug: "sabor",
    title: "Sabor digital",
    legacyPath: "sentido-digital-del-sabor",
    body: [
      "El sabor digital tiene que ver con el gusto y la selección: qué consumimos, qué compartimos y qué reputación construimos con esas elecciones.",
      "No todo lo viral merece nuestro paladar: a veces el algoritmo nos sirve comida rápida informativa, rica en emoción y pobre en matices.",
      "Cultivar el sabor digital es diversificar la «dieta»: fuentes locales, formatos largos, voces que no siempre coinciden con nosotros y tiempo para asimilar.",
    ],
  },
  {
    slug: "equilibrio",
    title: "Equilibrio digital",
    legacyPath: "sentido-digital-del-equilibrio",
    body: [
      "El equilibrio digital conecta cuerpo y mente con el uso de dispositivos: postura, sueño, pausas y la relación entre vida presencial y vida en pantalla.",
      "Es el sentido que nos recuerda que la ciudadanía digital sostenible no es estar siempre conectado, sino conectarse con intención.",
      "Pequeñas rutinas —apagar avisos, caminar sin teléfono, acordar reglas en el hogar— restauran el equilibrio cuando el entorno nos empuja al exceso.",
    ],
  },
  {
    slug: "oido",
    title: "Oído digital",
    legacyPath: "sentido-digital-oído",
    body: [
      "El oído digital es escuchar voces diversas sin quedar atrapado en un solo coro, y también poner límites al ruido que elegimos escuchar.",
      "En podcasts, grupos de voz y redes, conviene preguntar quién narra la historia, quién queda fuera y qué música emocional acompaña el mensaje.",
      "Un oído digital activo favorece el diálogo: reformular lo escuchado, pedir fuentes y evitar que la polémica reemplace a la comprensión.",
    ],
  },
];

export function sentidoBySlug(slug: string): SentidoContent | undefined {
  return SENTIDOS_CONTENT.find((s) => s.slug === slug);
}
