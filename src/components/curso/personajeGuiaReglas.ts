import type { Emocion } from '@/lib/cursos/tipos'

import type { EstadoPersonaje } from './PersonajeGuia'

export type GuiaMoment = { estado: EstadoPersonaje; frase: string }

function normKey(s: string) {
  return s
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .trim()
}

/** Caso reflexivo / impulsivo / pasivo (por id A/B/C/D o por opción marcada como recomendada). */
export function guiaPorIdCasoConOpciones(op: { id: string; esRecomendada?: boolean }): GuiaMoment | null {
  if (op.esRecomendada) return { estado: 'aprueba', frase: '¡Eso es criterio!' }
  const u = op.id.toUpperCase()
  if (u === 'C') return { estado: 'aprueba', frase: '¡Eso es criterio!' }
  if (u === 'A' || u === 'D') return { estado: 'sorpresa', frase: '¿Lo revisarías antes de compartir?' }
  if (u === 'B') return { estado: 'escucha', frase: 'Esperar también es válido.' }
  return null
}

const EM_IDS: Record<string, GuiaMoment> = {
  curiosidad: {
    estado: 'aprueba',
    frase: 'Mirar desde la curiosidad es muy buena señal.',
  },
  desconfianza: {
    estado: 'curioso',
    frase: 'Tiene sentido detenerte ante lo que incomoda.',
  },
  apuro: { estado: 'sorpresa', frase: 'Un alto aquí, antes de decidir.' },
  alarma: { estado: 'sorpresa', frase: 'Momento bueno para respirar y mirar mejor.' },
  preocupacion: { estado: 'escucha', frase: 'Te escucho — la preocupación también es válida.' },
}

/** Selector de emoción: solo estados válidos del guía (sin celebra por elegir). */
export function guiaPorEmocion(em: Emocion): GuiaMoment | null {
  const direct = EM_IDS[normKey(em.id)]
  if (direct) return direct
  const byLabel = EM_IDS[normKey(em.label)]
  return byLabel ?? null
}

/** Respuesta puntual del kit de pausa. */
export function guiaPorOpcionKit(op: string): GuiaMoment | null {
  if (op === 'CLARO') return { estado: 'aprueba', frase: 'Así ordenas mejor la información.' }
  if (op === 'DUDOSO')
    return { estado: 'curioso', frase: 'Quédate mirando ese matiz sin apurarte.' }
  if (op === 'FALTA INFORMACIÓN')
    return { estado: 'explica', frase: 'Aquí viene lo que sí podemos usar para ubicarnos.' }
  return null
}

const MIN_APRUEBA_TEXTO_ESFUERZO = 50

/** Texto libre: escucha desde el primer carácter; aprueba tras umbral sin juzgar el contenido. */
export function guiaPorLongitudTextoLibre(trimmedLen: number): GuiaMoment {
  if (trimmedLen > MIN_APRUEBA_TEXTO_ESFUERZO)
    return { estado: 'aprueba', frase: 'Gracias por el esfuerzo de ponerlo en palabras.' }
  return {
    estado: 'escucha',
    frase: 'Te escucho. Cuando quieras.',
  }
}

export const FRASE_DECISION_FINAL_GUIA =
  'Reconozco el esfuerzo de reflexionar.' as const
