export type NivelSeñal = 'fuerte' | 'desarrollando' | 'explorando'

export type Señal = {
  id: string
  nombre: string
  descripcion_fuerte: string
  descripcion_desarrollando: string
  descripcion_explorando: string
}

export const SEÑALES_ANTES_DE_COMPARTIR: Señal[] = [
  {
    id: 'pausar',
    nombre: 'Pausar antes de actuar',
    descripcion_fuerte: 'Lo aplicaste desde el inicio.',
    descripcion_desarrollando: 'Ya lo notas, puedes profundizar.',
    descripcion_explorando: 'Es el primer paso — vale la pena practicarlo.',
  },
  {
    id: 'emocion',
    nombre: 'Identificar la emoción',
    descripcion_fuerte: 'Reconociste qué te activó antes de reaccionar.',
    descripcion_desarrollando: 'Lo identificaste, ahora úsalo como señal.',
    descripcion_explorando: 'Es más difícil de lo que parece — sigue explorando.',
  },
  {
    id: 'fuente',
    nombre: 'Buscar la fuente original',
    descripcion_fuerte: 'Distingues el origen del reenvío.',
    descripcion_desarrollando: 'Ya sabes que importa — el siguiente paso es hacerlo.',
    descripcion_explorando: 'Este es el hábito más poderoso para desarrollar.',
  },
  {
    id: 'evidencia',
    nombre: 'Evaluar la evidencia',
    descripcion_fuerte: 'Distingues datos de interpretaciones.',
    descripcion_desarrollando: 'Lo intentaste — con práctica se vuelve automático.',
    descripcion_explorando: 'Es una habilidad que se construye con tiempo.',
  },
  {
    id: 'amplificar',
    nombre: 'Responder sin amplificar',
    descripcion_fuerte: 'Sabes cuándo no responder es la mejor respuesta.',
    descripcion_desarrollando: 'Lo entiendes — aplicarlo en el momento es el reto.',
    descripcion_explorando: 'Vale la pena practicarlo en situaciones reales.',
  },
  {
    id: 'criterio',
    nombre: 'Decidir con criterio propio',
    descripcion_fuerte: 'Tu decisión final lo demuestra.',
    descripcion_desarrollando: 'Tu decisión fue reflexiva — eso ya es criterio.',
    descripcion_explorando: 'Cada módulo completo fortalece esta señal.',
  },
]

type ClaveMapaInterna = 'pausar' | 'emocion' | 'fuente' | 'evidencia' | 'amplificar' | 'criterio'

const CLAVES_MAPA_INTERNO: ClaveMapaInterna[] = [
  'pausar',
  'emocion',
  'fuente',
  'evidencia',
  'amplificar',
  'criterio',
]

/** Algunos cursos usan otros ids en datos; el mapa interno se proyecta al listado del curso. */
const PROYECCION_IDS_POR_CURSO: Record<string, Partial<Record<ClaveMapaInterna, string>>> = {
  'quien-hablo': {
    fuente: 'senales',
    evidencia: 'verificar',
    amplificar: 'criterio',
    criterio: 'explicar',
  },
}

const EM_OC_FUERTE: Record<string, string[]> = {
  'antes-de-compartir': ['Curiosidad', 'Desconfianza'],
  'quien-hablo': ['Duda', 'Desconfianza'],
  'el-que-mas-grita': ['Curiosidad', 'Desconfianza'],
  'salud-sin-panico': ['Empatía', 'Confusión'],
  'grupo-de-profes': ['Duda', 'Responsabilidad'],
  'mis-datos-mi-decision': ['Curiosidad', 'Calma'],
  'clima-sin-catastrofe': ['Curiosidad', 'Esperanza'],
  'cuentame-sin-asustarme': ['Ternura', 'Preocupación'],
}

const PASO1_FUERTE_SUB: Record<string, string[]> = {
  'antes-de-compartir': ['Reviso qué parte está confirmada'],
  'quien-hablo': ['Llamo al número que tengo guardado'],
  'el-que-mas-grita': ['ventana privada', 'otro dispositivo'],
  'salud-sin-panico': ['centro de salud', 'ir hoy'],
  'grupo-de-profes': ['Coordino con convivencia'],
  'mis-datos-mi-decision': ['Reviso permisos del micrófono'],
  'clima-sin-catastrofe': ['Busco mediciones serias'],
  'cuentame-sin-asustarme': ['verificar en la página del banco'],
}

const PASO1_DESARROLLO_SUB: Record<string, string[]> = {
  'antes-de-compartir': ['Espero para ver si se aclara'],
  'quien-hablo': ['Le pido más información'],
  'el-que-mas-grita': ['Asumo que una de las dos'],
  'salud-sin-panico': ['No digo nada'],
  'grupo-de-profes': ['Publico que la IA a veces se equivoca'],
  'mis-datos-mi-decision': ['Ignoro el tema'],
  'clima-sin-catastrofe': ['No digo nada'],
  'cuentame-sin-asustarme': ['Le cuelgo'],
}

function nivelPaso1PorCurso(quizId: string, paso1: string): NivelSeñal {
  if (quizId === 'antes-de-compartir') {
    const limpio = (paso1 || '').trim()
    if (['A', 'B', 'C', 'D'].includes(limpio)) {
      if (limpio === 'C') return 'fuerte'
      if (limpio === 'B') return 'desarrollando'
      return 'explorando'
    }
    if (limpio.startsWith('La comparto')) return 'explorando'
    if (limpio.startsWith('Espero')) return 'desarrollando'
    if (limpio.startsWith('Reviso')) return 'fuerte'
    if (limpio.startsWith('Asumo')) return 'explorando'
    return 'explorando'
  }

  const t = (paso1 || '').trim()
  if (!t) return 'explorando'
  const fu = PASO1_FUERTE_SUB[quizId] || []
  if (fu.some(s => t.includes(s))) return 'fuerte'
  const des = PASO1_DESARROLLO_SUB[quizId] || []
  if (des.some(s => t.includes(s))) return 'desarrollando'
  return 'explorando'
}

function nivelEmocionPorCurso(quizId: string, emocion: string): NivelSeñal {
  const label = (emocion || '').trim()
  if (!label) return 'explorando'
  const fuertes = EM_OC_FUERTE[quizId] || []
  if (fuertes.includes(label)) return 'fuerte'
  return 'desarrollando'
}

const DECISION_AMPLI: Record<string, { fuerte: string[]; desarrollando: string[] }> = {
  'antes-de-compartir': {
    fuerte: ['Responder sin amplificar', 'No compartir todavía'],
    desarrollando: ['Verificar más'],
  },
  'quien-hablo': {
    fuerte: ['Llamar directamente', 'Verificar por otro canal', 'Reportar el número'],
    desarrollando: ['No actuar por 10 minutos'],
  },
  'el-que-mas-grita': {
    fuerte: ['ventana privada', 'oficial', 'segunda fuente', 'Comparar con otra persona'],
    desarrollando: ['No sacar conclusiones'],
  },
  'salud-sin-panico': {
    fuerte: ['Acompañar a consultar', 'línea oficial', 'privado con información', 'pedir tiempo'],
    desarrollando: ['No debatir en cadena'],
  },
  'grupo-de-profes': {
    fuerte: ['fuentes primarias', 'protocolo institucional', 'equipo directivo', 'Comunicación breve'],
    desarrollando: ['familias con enfoque'],
  },
  'mis-datos-mi-decision': {
    fuerte: ['apagar permisos', 'limitación de anuncios', 'denuncia', 'evidencia de abuso'],
    desarrollando: ['Explicar en familia'],
  },
  'clima-sin-catastrofe': {
    fuerte: ['enlace breve', 'fuente salió', 'en privado a quien'],
    desarrollando: ['No alimentar la polémica'],
  },
  'cuentame-sin-asustarme': {
    fuerte: ['Llamar juntos', 'app oficial', 'Frenar la cadena'],
    desarrollando: ['Ir mañana a una sucursal'],
  },
}

function nivelDecisionPorCurso(quizId: string, decisionAccion: string): NivelSeñal {
  const t = (decisionAccion || '').trim()
  if (!t) return 'explorando'
  const r = DECISION_AMPLI[quizId]
  if (!r) return 'explorando'
  if (r.fuerte.some(s => t.includes(s))) return 'fuerte'
  if (r.desarrollando.some(s => t.includes(s))) return 'desarrollando'
  return 'explorando'
}

function mapaInternoDesdeRespuestas(
  quizId: string,
  respuestas: {
    paso1: string
    emocion: string
    tooltipsVistos: number
    kitRespuestas: string[]
    decisionAccion: string
    textoResponder: string
    decisionFinal: string
  }
): Record<ClaveMapaInterna, NivelSeñal> {
  const mapa = {} as Record<ClaveMapaInterna, NivelSeñal>
  mapa.pausar = nivelPaso1PorCurso(quizId, respuestas.paso1)
  mapa.emocion = nivelEmocionPorCurso(quizId, respuestas.emocion)

  if (respuestas.tooltipsVistos >= 3) {
    mapa.fuente = 'fuerte'
  } else if (respuestas.tooltipsVistos >= 2) {
    mapa.fuente = 'desarrollando'
  } else {
    mapa.fuente = 'explorando'
  }

  const claros = respuestas.kitRespuestas.filter(r => r === 'CLARO').length
  if (claros >= 4) {
    mapa.evidencia = 'fuerte'
  } else if (claros >= 2) {
    mapa.evidencia = 'desarrollando'
  } else {
    mapa.evidencia = 'explorando'
  }

  mapa.amplificar = nivelDecisionPorCurso(quizId, respuestas.decisionAccion)

  const largoTexto = respuestas.textoResponder?.length || 0
  if (largoTexto > 80) {
    mapa.criterio = 'fuerte'
  } else if (largoTexto > 30) {
    mapa.criterio = 'desarrollando'
  } else {
    mapa.criterio = 'explorando'
  }

  return mapa
}

function proyectarMapaAIdsCurso(
  quizId: string,
  interno: Record<ClaveMapaInterna, NivelSeñal>
): Record<string, NivelSeñal> {
  const tabla = PROYECCION_IDS_POR_CURSO[quizId]
  const out: Record<string, NivelSeñal> = {}
  for (const k of CLAVES_MAPA_INTERNO) {
    const destino = (tabla && tabla[k]) || k
    out[destino] = interno[k]
  }
  return out
}

export function calcularMapaPorQuizId(
  quizId: string,
  respuestas: {
    paso1: string
    emocion: string
    tooltipsVistos: number
    kitRespuestas: string[]
    decisionAccion: string
    textoResponder: string
    decisionFinal: string
  }
): Record<string, NivelSeñal> {
  const interno = mapaInternoDesdeRespuestas(quizId, respuestas)
  return proyectarMapaAIdsCurso(quizId, interno)
}

export function calcularMapa(respuestas: {
  paso1: string
  emocion: string
  tooltipsVistos: number
  kitRespuestas: string[]
  decisionAccion: string
  textoResponder: string
  decisionFinal: string
}): Record<string, NivelSeñal> {
  return calcularMapaPorQuizId('antes-de-compartir', respuestas)
}

export function nivelAPuntos(nivel: NivelSeñal): number {
  if (nivel === 'fuerte') return 5
  if (nivel === 'desarrollando') return 4
  return 3
}
