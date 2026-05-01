'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'

import type { CursoContenido, Paso } from '@/lib/cursos/tipos'
import { COLORES_CURSO } from '@/lib/cursos/colores'
import { tooltipStorageKey } from '@/lib/cursos'
import { BarraPasos } from '@/components/curso/BarraPasos'
import { PasoInteractivo } from '@/components/curso/PasoInteractivo'
import {
  FRASES_PERSONAJE,
  PersonajeGuia,
  estadoGuiaPorNumeroPaso,
  type EstadoPersonaje,
} from '@/components/curso/PersonajeGuia'

type Props = {
  curso: CursoContenido
  pasoActual: Paso
  pasoIndex: number
}

function etiquetaCabeceraCorta(label: string) {
  const i = label.indexOf('·')
  return (i >= 0 ? label.slice(i + 1).trim() : label).toUpperCase()
}

export function LeccionPage({ curso, pasoActual, pasoIndex }: Props) {
  const router = useRouter()
  const color = COLORES_CURSO[curso.id] ?? '#1A1A1A'

  const totalPasos = curso.pasos.length
  const siguientePaso = curso.pasos[pasoIndex + 1]
  const tpKey = tooltipStorageKey(curso.storagePrefix)

  const [canNext, setCanNext] = useState(false)
  const [, setInteracciones] = useState<Record<string, unknown>>({})
  const [estadoPersonaje, setEstadoPersonaje] = useState<EstadoPersonaje>(() =>
    estadoGuiaPorNumeroPaso(pasoActual.numero)
  )
  const celebrateTimerRef = useRef<number | null>(null)

  const completoSlugKey = useCallback((slug: string) => `${curso.storagePrefix}-completo-${slug}`, [curso.storagePrefix])

  const maxPu = Math.max(1, ...curso.pasos.map(p => p.numero))
  const pctBar = `${(Math.min(Math.max(pasoActual.numero, 0), maxPu) / maxPu) * 100}%`

  const muestraStickySiguiente = pasoActual.contenido.tipo !== 'decision_final' && Boolean(siguientePaso)

  const [prevWarning, setPrevWarning] = useState(false)
  useEffect(() => {
    if (pasoIndex <= 0) {
      queueMicrotask(() => setPrevWarning(false))
      return
    }
    const prevSlug = curso.pasos[pasoIndex - 1]?.slug
    if (!prevSlug) return
    const key = completoSlugKey(prevSlug)
    const done = typeof window !== 'undefined' && window.localStorage.getItem(key) === '1'
    queueMicrotask(() => setPrevWarning(!done))
  }, [pasoIndex, curso.pasos, completoSlugKey])

  useEffect(() => {
    setEstadoPersonaje(estadoGuiaPorNumeroPaso(pasoActual.numero))
  }, [pasoActual.slug, pasoActual.numero])

  useEffect(() => {
    return () => {
      if (celebrateTimerRef.current !== null) {
        clearTimeout(celebrateTimerRef.current)
        celebrateTimerRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    const c = pasoActual.contenido
    if (!c || typeof window === 'undefined') return

    switch (c.tipo) {
      case 'bienvenida':
      case 'explicacion_tarjetas':
        queueMicrotask(() => setCanNext(true))
        return
      case 'caso_con_opciones':
      case 'selector_emocion':
      case 'decision_accion': {
        const k = pasoActual.storageKey
        queueMicrotask(() => setCanNext(Boolean(k && window.localStorage.getItem(k))))
        return
      }
      case 'kit_preguntas': {
        const k = pasoActual.storageKey
        try {
          const raw = k ? window.localStorage.getItem(k) : null
          const arr = raw ? JSON.parse(raw) : []
          queueMicrotask(() => setCanNext(Array.isArray(arr) && arr.length === c.preguntas.length))
        } catch {
          queueMicrotask(() => setCanNext(false))
        }
        return
      }
      case 'texto_libre': {
        const k = pasoActual.storageKey
        const txt = k ? window.localStorage.getItem(k) || '' : ''
        queueMicrotask(() => setCanNext(txt.trim().length >= c.minCaracteres))
        return
      }
      case 'analisis_señales':
      case 'decision_final':
        queueMicrotask(() => setCanNext(false))
        return
      default:
        queueMicrotask(() => setCanNext(false))
    }
  }, [pasoActual.slug])

  const handleInteraccion = useCallback(
    (key: string, valor: unknown) => {
      setInteracciones(prev => ({ ...prev, [key]: valor }))
      const c = pasoActual.contenido
      if (key === 'opcion' || key === 'emocion' || key === 'decision' || key === 'kit') setCanNext(true)
      if (c.tipo === 'texto_libre' && key === 'texto' && typeof valor === 'string')
        setCanNext(valor.trim().length >= c.minCaracteres)
    },
    [pasoActual.slug]
  )

  const handleAnalisisSuficiente = useCallback(() => {
    queueMicrotask(() => setCanNext(true))
  }, [])

  const handleScrollPanico = useCallback(() => setCanNext(true), [])

  const celebrarDosSegundosAntesQuiz = useCallback(() => {
    setEstadoPersonaje('celebra')
    return new Promise<void>((resolve) => {
      if (celebrateTimerRef.current !== null) clearTimeout(celebrateTimerRef.current)
      celebrateTimerRef.current = window.setTimeout(() => resolve(), 2000)
    })
  }, [])

  const handleSiguiente = () => {
    if (!canNext || pasoActual.contenido.tipo === 'decision_final') return
    if (!siguientePaso) return
    setEstadoPersonaje('celebra')
    if (celebrateTimerRef.current !== null) clearTimeout(celebrateTimerRef.current)
    celebrateTimerRef.current = window.setTimeout(() => {
      if (typeof window !== 'undefined') window.localStorage.setItem(completoSlugKey(pasoActual.slug), '1')
      router.push(`/curso/lecciones/${siguientePaso.slug}`)
    }, 2000)
  }

  const tituloPagina = pasoActual.contenido.tipo === 'bienvenida' ? pasoActual.titulo : pasoActual.titulo.toUpperCase()

  return (
    <div className="min-h-screen bg-[#F5F2EC] pb-32 text-[#333]">
      <header className="fixed inset-x-0 top-0 z-30 bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="flex h-14 items-center justify-between gap-3 px-4 md:px-6">
          <Link href={`/cursos/${curso.id}`} className="font-[var(--font-ui)] text-sm font-semibold text-[#444] no-underline">
            ← Salir
          </Link>
          <div className="flex min-w-0 flex-1 flex-col px-2 text-center">
            <div className="font-[var(--font-ui)] text-[0.7rem] uppercase tracking-[0.1em] text-[#999]">{curso.titulo}</div>
            <div className="font-[var(--font-ui)] text-[0.72rem] font-bold uppercase tracking-[0.05em] text-[#1A1A1A]">
              {etiquetaCabeceraCorta(pasoActual.label)}
            </div>
          </div>
          <BarraPasos pasoActual={pasoIndex + 1} totalPasos={totalPasos} colorCurso={color} />
        </div>
        <div className="h-[3px] w-full bg-[#E8E4DC]">
          <div className="h-[3px] transition-[width] duration-300 ease-out" style={{ width: pctBar, backgroundColor: color }} />
        </div>
      </header>

      <main className="mx-auto max-w-[680px] px-6 pb-20 pt-[116px]">
        {prevWarning ? (
          <div className="mb-6 rounded-md border border-[#E8E4DC] bg-white px-4 py-3 font-[var(--font-ui)] text-sm text-[#666]">
            Aviso: no se detecta el paso anterior como completado en este dispositivo.
          </div>
        ) : null}

        <div className="mb-6 font-[var(--font-ui)] text-[10px] uppercase tracking-[0.14em] text-[#999]">{pasoActual.label}</div>
        <p className="mb-6 font-[var(--font-ui)] text-[0.85rem] text-[#666]">{pasoActual.orientacion}</p>

        <h1
          className="font-[var(--font-display)] uppercase leading-[0.95] tracking-[0.03em]"
          style={{
            fontSize: pasoActual.contenido.tipo === 'bienvenida' ? 'clamp(3rem,6vw,5rem)' : 'clamp(2rem, 5vw, 3.5rem)',
            color,
            marginBottom: '2rem',
          }}
        >
          {tituloPagina}
        </h1>
        {pasoActual.contenido.tipo === 'bienvenida' ? (
          <p className="mt-2 font-[var(--font-ui)] text-2xl text-[#5C5750]">{curso.subtitulo}</p>
        ) : null}

        <div className={pasoActual.contenido.tipo === 'bienvenida' ? 'mt-8' : 'mt-0'}>
          <PasoInteractivo
            paso={pasoActual}
            curso={curso}
            contenido={pasoActual.contenido}
            color={color}
            tooltipStorageKey={tpKey}
            onScrollCompleto={handleScrollPanico}
            onAnalisisSuficiente={handleAnalisisSuficiente}
            onInteraccion={handleInteraccion}
            onAntesQuiz={celebrarDosSegundosAntesQuiz}
          />
        </div>
      </main>

      <div
        aria-hidden
        style={{
          position: 'fixed',
          bottom: 24,
          left: 24,
          zIndex: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          pointerEvents: 'none',
        }}
      >
        <PersonajeGuia color={color} estado={estadoPersonaje} size={100} />
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '0.5px solid rgba(0,0,0,0.08)',
            borderRadius: '12px 12px 12px 0',
            padding: '8px 12px',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.78rem',
            color: '#333',
            maxWidth: 160,
            lineHeight: 1.4,
          }}
        >
          {FRASES_PERSONAJE[estadoPersonaje]}
        </div>
      </div>

      {muestraStickySiguiente ? (
        <button
          type="button"
          onClick={handleSiguiente}
          disabled={!canNext}
          className="fixed bottom-6 right-6 z-20 rounded-md px-8 py-4 font-[var(--font-display)] text-[1.1rem] uppercase tracking-[0.08em] text-white shadow-sm"
          style={{
            backgroundColor: color,
            opacity: canNext ? 1 : 0.35,
            cursor: canNext ? 'pointer' : 'not-allowed',
          }}
        >
          SIGUIENTE PASO
        </button>
      ) : null}
    </div>
  )
}
