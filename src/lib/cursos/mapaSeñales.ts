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

function normalizarPaso1(paso1: string): 'A' | 'B' | 'C' | 'D' | '' {
  const limpio = (paso1 || '').trim()
  if (['A', 'B', 'C', 'D'].includes(limpio)) return limpio as 'A' | 'B' | 'C' | 'D'
  if (limpio.startsWith('La comparto')) return 'A'
  if (limpio.startsWith('Espero')) return 'B'
  if (limpio.startsWith('Reviso')) return 'C'
  if (limpio.startsWith('Asumo')) return 'D'
  return ''
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
  const mapa: Record<string, NivelSeñal> = {}
  const paso1Norm = normalizarPaso1(respuestas.paso1)

  if (paso1Norm === 'C') {
    mapa.pausar = 'fuerte'
  } else if (paso1Norm === 'B') {
    mapa.pausar = 'desarrollando'
  } else {
    mapa.pausar = 'explorando'
  }

  if (['Curiosidad', 'Desconfianza'].includes(respuestas.emocion)) {
    mapa.emocion = 'fuerte'
  } else if (respuestas.emocion) {
    mapa.emocion = 'desarrollando'
  } else {
    mapa.emocion = 'explorando'
  }

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

  if (
    respuestas.decisionAccion === 'Responder sin amplificar' ||
    respuestas.decisionAccion === 'No compartir todavía'
  ) {
    mapa.amplificar = 'fuerte'
  } else if (respuestas.decisionAccion === 'Verificar más') {
    mapa.amplificar = 'desarrollando'
  } else {
    mapa.amplificar = 'explorando'
  }

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

export function nivelAPuntos(nivel: NivelSeñal): number {
  if (nivel === 'fuerte') return 5
  if (nivel === 'desarrollando') return 4
  return 3
}
