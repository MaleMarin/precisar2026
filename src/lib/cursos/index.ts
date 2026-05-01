import { ANTES_DE_COMPARTIR } from '@/lib/cursos/contenido/antes-de-compartir'

export type {
  CursoContenido,
  Emocion,
  Opcion,
  PalabraResaltada,
  Paso,
  PasoContenido,
  Señal,
  TarjetaExplicacion,
  TipoPaso,
} from './tipos'

export { ANTES_DE_COMPARTIR } from './contenido/antes-de-compartir'

/** Cursos con lecciones definidas como datos TypeScript */
export const CURSOS_CON_LECCIONES = {
  [ANTES_DE_COMPARTIR.id]: ANTES_DE_COMPARTIR,
} as const

export function listarTodosLosPasosSlug() {
  return Object.values(CURSOS_CON_LECCIONES).flatMap(curso => curso.pasos.map(p => p.slug))
}

export function encontrarCursoYPasoPorSlug(slug: string) {
  for (const curso of Object.values(CURSOS_CON_LECCIONES)) {
    const pasoIndex = curso.pasos.findIndex(p => p.slug === slug)
    if (pasoIndex !== -1) return { curso, pasoIndex, paso: curso.pasos[pasoIndex]! }
  }
  return null
}

export function tooltipStorageKey(storagePrefix: string): string {
  if (storagePrefix === 'adc') return 'adc-tooltips-vistos'
  return `${storagePrefix}-tooltips-vistos`
}
