import type { ConsultaAnswers, ConsultaDemographics, ConsultaStepDef } from "./types";
import { emptyDemographics } from "./types";

export const CONSULTA_STEPS: ConsultaStepDef[] = [
  {
    id: "p1",
    kind: "multi",
    prompt: "¿Por dónde te informas más en este momento?",
    helper: "Puedes elegir hasta 3 opciones.",
    maxSelections: 3,
    options: [
      { id: "redes", label: "Redes sociales" },
      { id: "whatsapp_telegram", label: "WhatsApp o Telegram" },
      { id: "youtube", label: "YouTube" },
      { id: "tv", label: "TV" },
      { id: "radio", label: "Radio" },
      { id: "portales", label: "Portales o diarios online" },
      { id: "podcasts", label: "Podcasts" },
      { id: "conversaciones", label: "Conversaciones con otras personas" },
      { id: "influencers", label: "Influencers o creadores de contenido" },
      { id: "buscadores_ia", label: "Buscadores o asistentes de IA" },
      { id: "otro", label: "Otro" },
    ],
  },
  {
    id: "p2",
    kind: "multi",
    prompt: "¿Por qué usas más esos canales?",
    helper: "Puedes elegir hasta 2.",
    maxSelections: 2,
    options: [
      { id: "rapido_comodo", label: "Porque es lo más rápido o cómodo" },
      { id: "uso_habitual", label: "Porque es lo que más uso habitualmente" },
      { id: "confianza", label: "Porque me genera confianza" },
      { id: "entender_mejor", label: "Porque me ayuda a entender mejor" },
      { id: "gratis", label: "Porque es gratis" },
      { id: "entretiene", label: "Porque me entretiene" },
      { id: "pocas_alternativas", label: "Porque no tengo muchas alternativas" },
      { id: "temas_importantes", label: "Porque ahí me llegan primero los temas importantes" },
      { id: "otro", label: "Otro" },
    ],
  },
  {
    id: "p3",
    kind: "multi",
    prompt: "¿Qué temas sigues más para entender lo que pasa a tu alrededor?",
    helper: "Puedes elegir hasta 4.",
    maxSelections: 4,
    options: [
      { id: "politica", label: "Política y gobierno" },
      { id: "seguridad", label: "Seguridad y violencia" },
      { id: "economia", label: "Economía y costo de vida" },
      { id: "salud", label: "Salud y bienestar" },
      { id: "trabajo", label: "Trabajo e ingresos" },
      { id: "educacion", label: "Educación" },
      { id: "tecnologia", label: "Tecnología e inteligencia artificial" },
      { id: "medio_ambiente", label: "Medio ambiente y clima" },
      { id: "derechos", label: "Derechos y justicia" },
      { id: "migracion", label: "Migración y convivencia" },
      { id: "cultura", label: "Cultura, deportes y entretenimiento" },
      { id: "internacional", label: "Noticias internacionales" },
      { id: "otro", label: "Otro" },
    ],
  },
  {
    id: "p4",
    kind: "multi",
    prompt: "¿Qué te preocupa más de la información que recibes?",
    helper: "Puedes elegir hasta 3.",
    maxSelections: 3,
    options: [
      { id: "falsas", label: "Noticias falsas" },
      { id: "sesgo", label: "Manipulación o sesgo" },
      { id: "titulares", label: "Titulares engañosos o alarmistas" },
      { id: "falta_contexto", label: "Falta de contexto" },
      { id: "estafas", label: "Estafas" },
      { id: "privacidad", label: "Privacidad y uso de tus datos" },
      { id: "exceso", label: "Exceso de información" },
      { id: "violento", label: "Contenido violento o perturbador" },
      { id: "quien_dice", label: "Que no quede claro quién lo dice" },
      { id: "ia_no_claro", label: "Que no quede claro si fue hecho con IA" },
      { id: "otro", label: "Otro" },
    ],
  },
  {
    id: "p5",
    kind: "multi",
    prompt: "¿Qué te ayudaría más a sentir seguridad y confianza?",
    helper: "Puedes elegir hasta 3.",
    maxSelections: 3,
    options: [
      { id: "fuente_clara", label: "Saber claramente cuál es la fuente" },
      { id: "comparar", label: "Comparar varias fuentes" },
      { id: "fecha", label: "Ver la fecha con claridad" },
      { id: "lenguaje_simple", label: "Explicaciones en lenguaje simple" },
      { id: "detectar_enganos", label: "Señales rápidas para detectar engaños o estafas" },
      { id: "verificar", label: "Herramientas para verificar" },
      { id: "preguntas_claras", label: "Poder hacer preguntas y recibir respuestas claras" },
      { id: "contenido_ia", label: "Saber si el contenido fue editado o creado con IA" },
      { id: "datos_personales", label: "Proteger mejor tus datos personales" },
      { id: "graficos", label: "Entender mejor gráficos, cifras o estadísticas" },
      { id: "otro", label: "Otro" },
    ],
  },
  {
    id: "p6",
    kind: "scale",
    prompt:
      "En general, ¿cuánta confianza te generan las noticias y contenidos informativos que recibes?",
    min: 1,
    max: 5,
    options: [
      { value: 1, label: "Nada" },
      { value: 2, label: "Poca" },
      { value: 3, label: "Intermedia" },
      { value: 4, label: "Alta" },
      { value: 5, label: "Muy alta" },
    ],
  },
  {
    id: "p7",
    kind: "multi",
    prompt: "Cuando dudas de una información, ¿qué haces normalmente?",
    helper: "Puedes elegir hasta 2.",
    maxSelections: 2,
    options: [
      { id: "busco_mas", label: "Busco más información" },
      { id: "reviso_calma", label: "Reviso con más calma" },
      { id: "pregunto", label: "Pregunto a alguien de confianza" },
      { id: "guardo", label: "Lo guardo para después" },
      { id: "nada", label: "No hago nada" },
      { id: "comparto", label: "Lo comparto igual" },
      { id: "ia_buscador", label: "Le pregunto a una IA o buscador" },
      { id: "otro", label: "Otro" },
    ],
  },
  {
    id: "p8",
    kind: "multi",
    prompt: "¿Qué formato te ayuda más a entender un tema importante?",
    helper: "Puedes elegir hasta 2.",
    maxSelections: 2,
    options: [
      { id: "video_corto", label: "Video corto explicado" },
      { id: "texto_simple", label: "Texto simple o resumen" },
      { id: "noticia_completa", label: "Noticia completa" },
      { id: "audio", label: "Audio" },
      { id: "infografia", label: "Infografía o imágenes" },
      { id: "pyr", label: "Preguntas y respuestas" },
      { id: "chat", label: "Chat o conversación guiada" },
      { id: "otro", label: "Otro" },
    ],
  },
  {
    id: "p9",
    kind: "multi",
    prompt: "¿Necesitas alguna adaptación para informarte mejor?",
    helper: "Puedes elegir varias.",
    maxSelections: 12,
    options: [
      { id: "no_necesito", label: "No necesito adaptaciones" },
      { id: "letra_grande", label: "Letra más grande" },
      { id: "lectura_facil", label: "Lectura fácil" },
      { id: "subtitulos", label: "Subtítulos" },
      { id: "audio_voz", label: "Audio o lectura en voz" },
      { id: "alto_contraste", label: "Alto contraste" },
      { id: "menos_pasos", label: "Menos pasos o menos preguntas" },
      { id: "mas_tiempo", label: "Más tiempo para responder" },
      { id: "idioma_local", label: "Versión en mi idioma o variante local" },
      { id: "otro", label: "Otro" },
    ],
  },
  {
    id: "p10",
    kind: "multi",
    prompt: "Cuando un contenido menciona o usa inteligencia artificial, ¿qué te gustaría saber?",
    helper: "Puedes elegir hasta 2.",
    maxSelections: 2,
    options: [
      { id: "creado_ia", label: "Si fue creado total o parcialmente con IA" },
      { id: "parte_ia", label: "Qué parte fue editada con IA" },
      { id: "quien_reviso", label: "Quién revisó el contenido" },
      { id: "fuentes_datos", label: "De dónde salen los datos o fuentes" },
      { id: "margen_error", label: "Qué margen de error puede tener" },
      { id: "no_importa", label: "No es importante para mí" },
      { id: "otro", label: "Otro" },
    ],
  },
  {
    id: "p11",
    kind: "open",
    prompt: "Imagina tu experiencia informativa ideal. ¿Cómo te gustaría informarte?",
    helper: "Respuesta abierta breve.",
    placeholder: "Escribe lo que quieras compartir…",
    rows: 5,
  },
  {
    id: "p12",
    kind: "demographics",
    prompt: "Datos básicos",
    helper: "Todos los campos son opcionales. Solo completa lo que te resulte cómodo.",
    fields: [
      { key: "pais", label: "País o territorio", type: "text", placeholder: "Ej.: Chile" },
      {
        key: "region",
        label: "Estado / provincia / región / departamento",
        type: "text",
        placeholder: "Ej.: Región Metropolitana",
      },
      {
        key: "entorno",
        label: "¿Dónde vives?",
        type: "select",
        options: [
          { value: "", label: "Elige una opción" },
          { value: "ciudad_grande", label: "Ciudad grande" },
          { value: "ciudad_intermedia", label: "Ciudad intermedia" },
          { value: "periurbana", label: "Periurbana" },
          { value: "rural", label: "Rural" },
          { value: "prefiero_no_decir", label: "Prefiero no decir" },
        ],
      },
      {
        key: "edad",
        label: "Edad",
        type: "select",
        options: [
          { value: "", label: "Elige un rango" },
          { value: "menor_18", label: "Menor de 18" },
          { value: "18_24", label: "18 a 24" },
          { value: "25_34", label: "25 a 34" },
          { value: "35_44", label: "35 a 44" },
          { value: "45_54", label: "45 a 54" },
          { value: "55_64", label: "55 a 64" },
          { value: "65_mas", label: "65 o más" },
          { value: "prefiero_no_decir", label: "Prefiero no decir" },
        ],
      },
      {
        key: "genero",
        label: "Género",
        type: "select",
        options: [
          { value: "", label: "Elige una opción" },
          { value: "mujer", label: "Mujer" },
          { value: "hombre", label: "Hombre" },
          { value: "no_binario", label: "No binario" },
          { value: "otro", label: "Otro" },
          { value: "prefiero_no_decir", label: "Prefiero no decir" },
        ],
      },
      {
        key: "educacion",
        label: "Nivel educativo",
        type: "select",
        options: [
          { value: "", label: "Elige una opción" },
          { value: "primaria", label: "Educación primaria" },
          { value: "secundaria", label: "Educación secundaria" },
          { value: "tecnica", label: "Formación técnica" },
          { value: "universitaria", label: "Universitaria o superior" },
          { value: "posgrado", label: "Posgrado" },
          { value: "prefiero_no_decir", label: "Prefiero no decir" },
        ],
      },
      {
        key: "idioma",
        label: "Idioma principal para informarte",
        type: "text",
        placeholder: "Ej.: Español",
      },
      {
        key: "correo",
        label: "Correo (opcional)",
        type: "email",
        placeholder: "nombre@ejemplo.com",
      },
    ],
  },
];

export function getStepDefinition(index: number): ConsultaStepDef | undefined {
  return CONSULTA_STEPS[index];
}

export function validateStep(step: ConsultaStepDef, answers: ConsultaAnswers): string | null {
  if (step.kind === "multi") {
    const v = answers[step.id];
    const arr = Array.isArray(v) ? v : [];
    if (arr.length < 1) return "Marca al menos una opción para seguir.";
    if (arr.length > step.maxSelections) {
      return `Puedes elegir hasta ${step.maxSelections} opciones.`;
    }
    return null;
  }
  if (step.kind === "scale") {
    const n = answers.p6;
    if (typeof n !== "number" || n < step.min || n > step.max) {
      return "Elige un valor en la escala para seguir.";
    }
    return null;
  }
  if (step.kind === "open") {
    const t = (answers.p11 ?? "").trim();
    if (t.length < 1) return "Escribe al menos una línea para seguir.";
    return null;
  }
  return null;
}

export function mergeDemographics(
  prev: Partial<ConsultaDemographics> | undefined,
  patch: Partial<ConsultaDemographics>,
): ConsultaDemographics {
  return { ...emptyDemographics(), ...prev, ...patch };
}

const CONSULTA_TOTAL_STEPS = 12;

export function progressCurrent(params: {
  questionIndex: number;
}): { current: number; total: number; remainingAfterThis: number } {
  const total = CONSULTA_TOTAL_STEPS;
  const current = params.questionIndex + 1;
  const remainingAfterThis = Math.max(0, total - current);
  return { current, total, remainingAfterThis };
}
