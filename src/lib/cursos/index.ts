import { ANTES_DE_COMPARTIR } from '@/lib/cursos/contenido/antes-de-compartir'
import { CLIMA_SIN_CATASTROFE } from '@/lib/cursos/contenido/clima-sin-catastrofe'
import { CUENTAME_SIN_ASUSTARME } from '@/lib/cursos/contenido/cuentame-sin-asustarme'
import { EL_QUE_MAS_GRITA } from '@/lib/cursos/contenido/el-que-mas-grita'
import { GRUPO_DE_PROFES } from '@/lib/cursos/contenido/grupo-de-profes'
import { MIS_DATOS_MI_DECISION } from '@/lib/cursos/contenido/mis-datos-mi-decision'
import { QUIEN_HABLO } from '@/lib/cursos/contenido/quien-hablo'
import { SALUD_SIN_PANICO } from '@/lib/cursos/contenido/salud-sin-panico'
import type { CursoContenido } from '@/lib/cursos/tipos'

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
export { CLIMA_SIN_CATASTROFE } from './contenido/clima-sin-catastrofe'
export { CUENTAME_SIN_ASUSTARME } from './contenido/cuentame-sin-asustarme'
export { EL_QUE_MAS_GRITA } from './contenido/el-que-mas-grita'
export { GRUPO_DE_PROFES } from './contenido/grupo-de-profes'
export { MIS_DATOS_MI_DECISION } from './contenido/mis-datos-mi-decision'
export { QUIEN_HABLO } from './contenido/quien-hablo'
export { SALUD_SIN_PANICO } from './contenido/salud-sin-panico'

/** Cursos con lecciones definidas como datos TypeScript */
export const CURSOS_CON_LECCIONES: Record<string, CursoContenido> = {
  [ANTES_DE_COMPARTIR.id]: ANTES_DE_COMPARTIR,
  [QUIEN_HABLO.id]: QUIEN_HABLO,
  [EL_QUE_MAS_GRITA.id]: EL_QUE_MAS_GRITA,
  [SALUD_SIN_PANICO.id]: SALUD_SIN_PANICO,
  [GRUPO_DE_PROFES.id]: GRUPO_DE_PROFES,
  [MIS_DATOS_MI_DECISION.id]: MIS_DATOS_MI_DECISION,
  [CLIMA_SIN_CATASTROFE.id]: CLIMA_SIN_CATASTROFE,
  [CUENTAME_SIN_ASUSTARME.id]: CUENTAME_SIN_ASUSTARME,
}

export function obtenerCursoPorId(id: string): CursoContenido | undefined {
  return CURSOS_CON_LECCIONES[id]
}

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
