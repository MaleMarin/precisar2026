export type ColorCurso = string

export type TipoPaso =
  | 'bienvenida'
  | 'caso_con_opciones'
  | 'selector_emocion'
  | 'analisis_señales'
  | 'explicacion_tarjetas'
  | 'kit_preguntas'
  | 'decision_accion'
  | 'texto_libre'
  | 'decision_final'
  | 'fin_modulo'

export type Opcion = {
  id: string
  texto: string
  esRecomendada?: boolean
  orientacion?: string
}

export type Emocion = {
  id: string
  label: string
  respuesta: string
}

export type PalabraResaltada = {
  frase: string
  tooltip: string
}

export type TarjetaExplicacion = {
  titulo: string
  descripcion: string
  colorBorde: string
}

export type Paso = {
  slug: string
  numero: number
  tipo: TipoPaso
  label: string /** "PASO 0 DE 8 · BIENVENIDA" */
  orientacion: string
  titulo: string
  contenido: PasoContenido
  storageKey?: string
}

export type PasoContenido =
  | { tipo: 'bienvenida'; descripcion: string; dato?: string }
  | { tipo: 'caso_con_opciones'; intro: string; caso: string; opciones: Opcion[] }
  | { tipo: 'selector_emocion'; intro: string; emociones: Emocion[] }
  | {
      tipo: 'analisis_señales'
      intro: string
      texto: string
      palabras: PalabraResaltada[]
      cierre: string
    }
  | { tipo: 'explicacion_tarjetas'; intro: string; tarjetas: TarjetaExplicacion[]; dato_destacado?: string }
  | { tipo: 'kit_preguntas'; intro: string; preguntas: string[] }
  | { tipo: 'decision_accion'; intro: string; opciones: Opcion[] }
  | {
      tipo: 'texto_libre'
      intro: string
      /** Ejemplo opcional entre intro y textarea (caso práctico) */
      ejemplo?: string
      pregunta: string
      placeholder: string
      minCaracteres: number
    }
  | {
      tipo: 'decision_final'
      intro: string
      campos: string[]
      mostrarRespuestaInicial: boolean
    }
  | { tipo: 'fin_modulo'; frase_cierre: string }

export type Señal = {
  id: string
  nombre: string
  descripcion_fuerte: string
  descripcion_desarrollando: string
  descripcion_explorando: string
}

export type CursoContenido = {
  id: string
  titulo: string
  subtitulo: string
  descripcion: string
  duracion: string
  pasos: Paso[]
  señales: Señal[]
  storagePrefix: string
  /** Ruta de evaluación al completar (ej. /quiz/antes-de-compartir) */
  rutaQuiz: string
}
