'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useRef, useState, type Dispatch, type SetStateAction } from 'react'
import type { CursoContenido, Paso, PasoContenido } from '@/lib/cursos/tipos'
import {
  guiaPorEmocion,
  guiaPorIdCasoConOpciones,
  guiaPorOpcionKit,
  type GuiaMoment,
} from '@/components/curso/personajeGuiaReglas'

export type PasoInteractivoProps = {
  paso: Paso
  curso: CursoContenido
  contenido: PasoContenido
  color: string
  tooltipStorageKey: string
  onInteraccion: (key: string, valor: unknown) => void
  onScrollCompleto: () => void
  onAnalisisSuficiente: () => void
  /** Reacción contextual del guía (sin usar «celebra» salvo siguiente paso en la página madre). */
  onGuiaMoment?: (m: GuiaMoment) => void
  /** Cambios continuos del texto libre (caracteres, para escucha/aprueba sin juicio). */
  onAvanceTextoLibre?: (textoCompleto: string) => void
}

export function PasoInteractivo({
  paso,
  curso,
  contenido,
  color,
  tooltipStorageKey,
  onInteraccion,
  onScrollCompleto,
  onAnalisisSuficiente,
  onGuiaMoment,
  onAvanceTextoLibre,
}: PasoInteractivoProps) {
  switch (contenido.tipo) {
    case 'bienvenida':
      return <Bienvenida contenido={contenido} color={color} />
    case 'caso_con_opciones':
      return (
        <CasoConOpciones
          contenido={contenido}
          color={color}
          storageKey={paso.storageKey}
          onGuiaMoment={onGuiaMoment}
          onSeleccion={v => onInteraccion('opcion', v)}
        />
      )
    case 'selector_emocion':
      return (
        <SelectorEmocion
          contenido={contenido}
          color={color}
          storageKey={paso.storageKey}
          onGuiaMoment={onGuiaMoment}
          onSeleccion={v => onInteraccion('emocion', v)}
        />
      )
    case 'analisis_señales':
      return (
        <AnalisisSeñales
          contenido={contenido}
          color={color}
          storageKeyHits={tooltipStorageKey}
          onRegistrarHit={() => onInteraccion('tooltip', true)}
          onAnalisisSuficiente={onAnalisisSuficiente}
        />
      )
    case 'explicacion_tarjetas':
      return <ExplicacionTarjetas contenido={contenido} onScrollCompleto={onScrollCompleto} />
    case 'kit_preguntas':
      return (
        <KitPreguntas
          contenido={contenido}
          color={color}
          lsAggregateKey={paso.storageKey ?? ''}
          onGuiaMoment={onGuiaMoment}
          onCompleto={() => onInteraccion('kit', true)}
        />
      )
    case 'decision_accion':
      return (
        <DecisionAccion
          contenido={contenido}
          color={color}
          storageKey={paso.storageKey}
          onSeleccion={v => onInteraccion('decision', v)}
        />
      )
    case 'texto_libre':
      return (
        <TextoLibre
          contenido={contenido}
          storageKey={paso.storageKey}
          onAvance={onAvanceTextoLibre}
          onTexto={(v: string) => onInteraccion('texto', v)}
        />
      )
    case 'decision_final':
      return (
        <DecisionFinalPaso contenido={contenido} color={color} pasoDecisionStorageKey={paso.storageKey} curso={curso} />
      )
    default:
      return null
  }
}

function Bienvenida({
  contenido,
  color,
}: {
  contenido: Extract<PasoContenido, { tipo: 'bienvenida' }>
  color: string
}) {
  return (
    <div>
      <p className="text-base leading-[1.75] text-[#333] font-[var(--font-ui)] mb-6">{contenido.descripcion}</p>
      {contenido.dato ? (
        <div
          className="bg-white pl-5 py-4 text-base leading-[1.7] text-[#555] font-[var(--font-ui)]"
          style={{ borderLeft: `4px solid ${color}` }}
        >
          {contenido.dato}
        </div>
      ) : null}
    </div>
  )
}

function CasoConOpciones({
  contenido,
  color,
  storageKey,
  onGuiaMoment,
  onSeleccion,
}: {
  contenido: Extract<PasoContenido, { tipo: 'caso_con_opciones' }>
  color: string
  storageKey?: string
  onGuiaMoment?: (m: GuiaMoment) => void
  onSeleccion: (textoOpcion: string) => void
}) {
  const [sel, setSel] = useState('')
  const onSelRef = useRef(onSeleccion)
  const onGuiaRef = useRef(onGuiaMoment)
  useEffect(() => {
    onSelRef.current = onSeleccion
  }, [onSeleccion])
  useEffect(() => {
    onGuiaRef.current = onGuiaMoment
  }, [onGuiaMoment])

  useEffect(() => {
    const k = storageKey
    if (!k || typeof window === 'undefined') return
    const s = window.localStorage.getItem(k)
    if (!s) return
    queueMicrotask(() => {
      setSel(s)
      const op = contenido.opciones.find(o => o.texto === s)
      const m = op ? guiaPorIdCasoConOpciones(op) : undefined
      if (m) onGuiaRef.current?.(m)
      onSelRef.current(s)
    })
  }, [storageKey, contenido.opciones])

  return (
    <div>
      <p className="mt-0 text-base leading-[1.75] font-[var(--font-ui)]">{contenido.intro}</p>
      <div className="mt-6 rounded-lg bg-white p-5 shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
        <div className="mb-4 flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-[#D9D9D9]" />
          <p className="font-[var(--font-ui)] text-sm text-[#666]">Usuario @handle · 2h</p>
        </div>
        <p className="text-[0.98rem] leading-[1.7] text-[#333]">{contenido.caso}</p>
        <div className="mt-5 rounded-md bg-[#ECEAE5] px-4 py-10 text-center text-sm text-[#7B766E]">
          Imagen: cápsula en el océano
        </div>
      </div>
      <h2 className="mt-8 font-[var(--font-display)] text-[1.5rem] uppercase tracking-[0.03em] text-[#1A1A1A]">
        ¿QUÉ HARÍAS PRIMERO?
      </h2>
      <div className="mt-4 space-y-3">
        {contenido.opciones.map(op => (
          <button
            key={op.id}
            type="button"
            onClick={() => {
              setSel(op.texto)
              if (storageKey && typeof window !== 'undefined') window.localStorage.setItem(storageKey, op.texto)
              const m = guiaPorIdCasoConOpciones(op)
              if (m) onGuiaMoment?.(m)
              onSeleccion(op.texto)
            }}
            className="w-full rounded-md bg-white px-5 py-4 text-left font-[var(--font-ui)] text-[0.95rem] text-[#333] transition hover:bg-[#FAFAF8]"
            style={{
              minHeight: 56,
              border: sel === op.texto ? `2px solid ${color}` : '1px solid #E8E4DC',
            }}
          >
            {op.texto}
          </button>
        ))}
      </div>
    </div>
  )
}

function SelectorEmocion({
  contenido,
  color,
  storageKey,
  onGuiaMoment,
  onSeleccion,
}: {
  contenido: Extract<PasoContenido, { tipo: 'selector_emocion' }>
  color: string
  storageKey?: string
  onGuiaMoment?: (m: GuiaMoment) => void
  onSeleccion: (label: string) => void
}) {
  const [emo, setEmo] = useState('')
  const onSelRef = useRef(onSeleccion)
  const onGuiaRef = useRef(onGuiaMoment)
  useEffect(() => {
    onSelRef.current = onSeleccion
  }, [onSeleccion])
  useEffect(() => {
    onGuiaRef.current = onGuiaMoment
  }, [onGuiaMoment])

  useEffect(() => {
    const k = storageKey
    if (!k || typeof window === 'undefined') return
    const s = window.localStorage.getItem(k)
    if (!s) return
    queueMicrotask(() => {
      setEmo(s)
      const hit = contenido.emociones.find(e => e.label === s)
      const gm = hit ? guiaPorEmocion(hit) : undefined
      if (gm) onGuiaRef.current?.(gm)
      onSelRef.current(s)
    })
  }, [storageKey, contenido.emociones])

  const selected = contenido.emociones.find(e => e.label === emo)

  return (
    <div>
      <p className="text-base leading-[1.75] font-[var(--font-ui)]">{contenido.intro}</p>
      <div className="mt-6 space-y-3">
        {contenido.emociones.map(item => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setEmo(item.label)
              if (storageKey && typeof window !== 'undefined') window.localStorage.setItem(storageKey, item.label)
              const gm = guiaPorEmocion(item)
              if (gm) onGuiaMoment?.(gm)
              onSeleccion(item.label)
            }}
            className="w-full rounded-md bg-white px-5 py-4 text-left font-[var(--font-ui)] text-[0.95rem] text-[#333] transition hover:bg-[#FAFAF8]"
            style={{
              minHeight: 56,
              border: emo === item.label ? `2px solid ${color}` : '1px solid #E8E4DC',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      {selected ? (
        <p className="mt-6 font-[var(--font-ui)] text-[1.35rem] leading-[1.5] text-[#5D5750]">{selected.respuesta}</p>
      ) : null}
    </div>
  )
}

type ResSeg = { tipo: 't' | 'h'; value: string; tooltip?: string }

function buildHighlightedSegments(texto: string, palabras: { frase: string; tooltip: string }[]): ResSeg[] {
  const tl = texto.toLocaleLowerCase('es')
  type Hit = { start: number; end: number; frase: string; tooltip: string }
  const hits: Hit[] = []
  const used: { start: number; end: number }[] = []

  for (const p of palabras) {
    const f = p.frase.toLocaleLowerCase('es')
    let idx = 0
    while (idx <= tl.length) {
      const j = tl.indexOf(f, idx)
      if (j === -1) break
      const end = j + f.length
      const overlaps = used.some(u => !(end <= u.start || j >= u.end))
      if (!overlaps) {
        hits.push({ start: j, end, frase: texto.slice(j, end), tooltip: p.tooltip })
        used.push({ start: j, end })
        idx = end
      } else idx = j + 1
    }
  }

  hits.sort((a, b) => a.start - b.start)
  const out: ResSeg[] = []
  let cursor = 0
  for (const h of hits) {
    if (h.start > cursor) out.push({ tipo: 't', value: texto.slice(cursor, h.start) })
    out.push({ tipo: 'h', value: h.frase, tooltip: h.tooltip })
    cursor = h.end
  }
  if (cursor < texto.length) out.push({ tipo: 't', value: texto.slice(cursor) })
  return out
}

function AnalisisSeñales({
  contenido,
  color,
  storageKeyHits,
  onRegistrarHit,
  onAnalisisSuficiente,
}: {
  contenido: Extract<PasoContenido, { tipo: 'analisis_señales' }>
  color: string
  storageKeyHits: string
  onRegistrarHit: () => void
  onAnalisisSuficiente: () => void
}) {
  const [hovered, setHovered] = useState<string[]>([])
  const [abierto, setAbierto] = useState('')

  const segs = useMemo(
    () => buildHighlightedSegments(contenido.texto, contenido.palabras),
    [contenido.palabras, contenido.texto]
  )

  const bumpTooltipHits = useCallback(() => {
    const prev = parseInt(
      typeof window !== 'undefined' ? window.localStorage.getItem(storageKeyHits) || '0' : '0'
    )
    if (typeof window !== 'undefined') window.localStorage.setItem(storageKeyHits, String(prev + 1))
    onRegistrarHit()
  }, [onRegistrarHit, storageKeyHits])

  useEffect(() => {
    if (hovered.length >= 2) onAnalisisSuficiente()
  }, [hovered.length, onAnalisisSuficiente])

  return (
    <div>
      <p className="text-base leading-[1.75] font-[var(--font-ui)]">{contenido.intro}</p>
      <div className="mt-6 rounded-lg bg-white p-5 shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
        <p className="text-[0.98rem] leading-[1.75]">
          {segs.map((s, i) =>
            s.tipo === 't' ? (
              <span key={i}>{s.value}</span>
            ) : (
              <HighlightBtn
                key={i}
                frase={s.value}
                tooltip={s.tooltip ?? ''}
                color={color}
                abierto={abierto}
                setAbierto={setAbierto}
                hovered={hovered}
                bumpTooltipHits={bumpTooltipHits}
                onRegistrarFrase={frase =>
                  setHovered(prev => (prev.includes(frase) ? prev : [...prev, frase]))
                }
              />
            )
          )}
        </p>
      </div>
      <p className="mt-6 text-base leading-[1.75] font-[var(--font-ui)]">{contenido.cierre}</p>
      <p className="mt-3 text-sm text-[#7B766E]">
        Interactúa con al menos dos frases (cursor o pulsación táctil) para habilitar el siguiente paso.
      </p>
    </div>
  )
}

function HighlightBtn({
  frase,
  tooltip,
  color,
  hovered,
  setAbierto,
  abierto,
  bumpTooltipHits,
  onRegistrarFrase,
}: {
  frase: string
  tooltip: string
  color: string
  hovered: string[]
  abierto: string
  setAbierto: Dispatch<SetStateAction<string>>
  bumpTooltipHits: () => void
  onRegistrarFrase: (f: string) => void
}) {
  const touched = hovered.includes(frase)

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => {
          bumpTooltipHits()
          if (!touched) onRegistrarFrase(frase)
          setAbierto(frase)
        }}
        onClick={() => {
          bumpTooltipHits()
          if (!touched) onRegistrarFrase(frase)
          setAbierto(prev => (prev === frase ? '' : frase))
        }}
        className="cursor-pointer border-b-2 bg-transparent px-0 py-0 text-left font-semibold font-[inherit]"
        style={{ borderColor: color }}
      >
        {frase}
      </button>
      {abierto === frase ? (
        <span className="absolute left-0 top-[120%] z-10 w-56 rounded-md bg-[#1F1B17] px-3 py-2 text-xs leading-[1.5] text-white font-[var(--font-ui)]">
          {tooltip}
        </span>
      ) : null}
    </span>
  )
}

function ExplicacionTarjetas({
  contenido,
  onScrollCompleto,
}: {
  contenido: Extract<PasoContenido, { tipo: 'explicacion_tarjetas' }>
  onScrollCompleto: () => void
}) {
  const cbRef = useRef(onScrollCompleto)
  useEffect(() => {
    cbRef.current = onScrollCompleto
  }, [onScrollCompleto])

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const viewport = window.innerHeight
      const totalHeight = document.documentElement.scrollHeight
      if (scrollTop + viewport >= totalHeight - 32) cbRef.current()
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      <p className="text-base leading-[1.75] font-[var(--font-ui)]">{contenido.intro}</p>
      <div className="mt-6 space-y-4">
        {contenido.tarjetas.map(card => (
          <article
            key={card.titulo}
            className="rounded-md bg-white px-4 py-4"
            style={{ borderLeft: `4px solid ${card.colorBorde}` }}
          >
            <h3 className="font-[var(--font-display)] text-[1.35rem] uppercase tracking-[0.02em]">{card.titulo}</h3>
            <p className="mt-2 text-[0.98rem] leading-[1.7]">{card.descripcion}</p>
          </article>
        ))}
      </div>
      {contenido.dato_destacado ? (
        <p className="mt-8 font-[var(--font-display)] text-[2rem] uppercase tracking-[0.03em] text-[#1F1A14]">
          {contenido.dato_destacado}
        </p>
      ) : null}
      <p className="mt-3 text-sm text-[#7B766E]">
        Desplázate hasta el final de la página para habilitar el siguiente paso.
      </p>
    </div>
  )
}

function KitPreguntas({
  contenido,
  color,
  lsAggregateKey,
  onGuiaMoment,
  onCompleto,
}: {
  contenido: Extract<PasoContenido, { tipo: 'kit_preguntas' }>
  color: string
  lsAggregateKey: string
  onGuiaMoment?: (m: GuiaMoment) => void
  onCompleto: () => void
}) {
  const [kitRespuestas, setKitRespuestas] = useState<Record<number, string>>({})
  const KIT_OPS = ['CLARO', 'DUDOSO', 'FALTA INFORMACIÓN'] as const
  const onCompletoRef = useRef(onCompleto)
  const onGuiaMomentRef = useRef(onGuiaMoment)
  useEffect(() => {
    onCompletoRef.current = onCompleto
  }, [onCompleto])
  useEffect(() => {
    onGuiaMomentRef.current = onGuiaMoment
  }, [onGuiaMoment])

  useEffect(() => {
    if (typeof window === 'undefined' || !lsAggregateKey) return
    try {
      const raw = window.localStorage.getItem(lsAggregateKey)
      if (!raw) return
      const arr = JSON.parse(raw) as string[]
      if (!Array.isArray(arr) || arr.length === 0) return
      const rec: Record<number, string> = {}
      arr.forEach((v, i) => {
        if (v) rec[i + 1] = v
      })
      queueMicrotask(() => {
        setKitRespuestas(rec)
        if (arr.length === contenido.preguntas.length) onCompletoRef.current?.()
        const tail = [...arr].reverse().find(v => typeof v === 'string' && v.length > 0)
        const g = tail ? guiaPorOpcionKit(tail) : undefined
        if (g) onGuiaMomentRef.current?.(g)
      })
    } catch {
      /* noop */
    }
  }, [contenido.preguntas.length, lsAggregateKey])

  const syncLs = useCallback(
    (actualizado: Record<number, string>) => {
      if (typeof window === 'undefined' || !lsAggregateKey) return
      const serializado = contenido.preguntas.map((_, i) => actualizado[i + 1]).filter(Boolean) as string[]
      window.localStorage.setItem(lsAggregateKey, JSON.stringify(serializado))
      if (Object.keys(actualizado).length === contenido.preguntas.length) onCompletoRef.current?.()
    },
    [contenido.preguntas, lsAggregateKey]
  )

  return (
    <div>
      <p className="text-base leading-[1.75] font-[var(--font-ui)]">{contenido.intro}</p>
      <div className="mt-6 space-y-5 font-[var(--font-ui)]">
        {contenido.preguntas.map((q, i) => {
          const idxq = i + 1
          const visible = idxq === 1 || Boolean(kitRespuestas[idxq - 1])
          if (!visible) return null
          return (
            <div key={idxq} className="rounded-md border border-[#E8E4DC] bg-white p-4">
              <p className="text-sm uppercase tracking-[0.06em] text-[#857D73]">P{idxq}</p>
              <p className="mt-1 text-[1rem]">{q}</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {KIT_OPS.map(op => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => {
                      const g = guiaPorOpcionKit(op)
                      if (g) onGuiaMoment?.(g)
                      setKitRespuestas(prev => {
                        const next = { ...prev, [idxq]: op }
                        syncLs(next)
                        return next
                      })
                    }}
                    className="rounded-md px-3 py-3 text-left font-[var(--font-ui)] text-[0.9rem] bg-white"
                    style={{
                      border: kitRespuestas[idxq] === op ? `2px solid ${color}` : '1px solid #E8E4DC',
                    }}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
      {Object.keys(kitRespuestas).length === contenido.preguntas.length ? (
        <div className="mt-7 rounded-md bg-white p-4 border border-[#E8E4DC]">
          <h3 className="font-[var(--font-display)] text-[1.35rem] uppercase">Resumen</h3>
          <ul className="mt-2 space-y-1 text-sm font-[var(--font-ui)]">
            {Object.entries(kitRespuestas).map(([k, v]) => (
              <li key={k}>
                P{k}: {v}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  )
}

function DecisionAccion({
  contenido,
  color,
  storageKey,
  onSeleccion,
}: {
  contenido: Extract<PasoContenido, { tipo: 'decision_accion' }>
  color: string
  storageKey?: string
  onSeleccion: (textoOpcion: string) => void
}) {
  const [sel, setSel] = useState('')

  useEffect(() => {
    const k = storageKey
    if (!k || typeof window === 'undefined') return
    const s = window.localStorage.getItem(k)
    if (s) {
      queueMicrotask(() => setSel(s))
      queueMicrotask(() => {
        onSeleccion(s)
      })
    }
  }, [storageKey])

  const opcionSel = contenido.opciones.find(o => o.texto === sel)

  return (
    <div>
      <p className="text-base leading-[1.75] font-[var(--font-ui)]">{contenido.intro}</p>
      <div className="mt-6 space-y-3">
        {contenido.opciones.map(op => (
          <button
            key={op.id}
            type="button"
            onClick={() => {
              setSel(op.texto)
              if (storageKey && typeof window !== 'undefined') window.localStorage.setItem(storageKey, op.texto)
              onSeleccion(op.texto)
            }}
            className="w-full rounded-md bg-white px-5 py-4 text-left font-[var(--font-ui)] text-[0.95rem] transition hover:bg-[#FAFAF8]"
            style={{
              minHeight: 56,
              border: sel === op.texto ? `2px solid ${color}` : '1px solid #E8E4DC',
            }}
          >
            [{op.texto}]
          </button>
        ))}
      </div>
      {opcionSel?.orientacion ? (
        <div className="mt-6 rounded-md bg-white px-4 py-4 text-[0.98rem] leading-[1.7]" style={{ border: `1px solid ${color}` }}>
          {opcionSel.orientacion}
        </div>
      ) : null}
    </div>
  )
}

function TextoLibre({
  contenido,
  storageKey,
  onAvance,
  onTexto,
}: {
  contenido: Extract<PasoContenido, { tipo: 'texto_libre' }>
  storageKey?: string
  onAvance?: (t: string) => void
  onTexto: (t: string) => void
}) {
  const [val, setVal] = useState('')
  const onAvanceRef = useRef(onAvance)
  const onTextoRef = useRef(onTexto)
  useEffect(() => {
    onAvanceRef.current = onAvance
  }, [onAvance])
  useEffect(() => {
    onTextoRef.current = onTexto
  }, [onTexto])

  useEffect(() => {
    const k = storageKey
    if (!k || typeof window === 'undefined') return
    const s = window.localStorage.getItem(k)
    if (!s) return
    queueMicrotask(() => {
      setVal(s)
      onAvanceRef.current?.(s)
      if (s.trim().length >= contenido.minCaracteres) onTextoRef.current(s)
    })
  }, [contenido.minCaracteres, storageKey])

  const ok = val.trim().length >= contenido.minCaracteres

  return (
    <div>
      <p className="text-base leading-[1.75] font-[var(--font-ui)]">{contenido.intro}</p>
      {contenido.ejemplo ? (
        <div className="mt-5 rounded-md border border-[#E8E4DC] bg-white p-4">
          <p className="font-[var(--font-ui)] text-[0.95rem] leading-[1.7]">{contenido.ejemplo}</p>
        </div>
      ) : null}
      <label className="mt-6 block font-[var(--font-ui)] text-sm uppercase tracking-[0.06em] text-[#857D73]">{contenido.pregunta}</label>
      <textarea
        value={val}
        onChange={e => {
          const next = e.target.value
          setVal(next)
          if (storageKey && typeof window !== 'undefined') window.localStorage.setItem(storageKey, next)
          onAvance?.(next)
          if (next.trim().length >= contenido.minCaracteres) onTexto(next)
        }}
        placeholder={contenido.placeholder}
        className="mt-3 w-full rounded-md border border-[#E8E4DC] bg-white px-4 py-3 font-[var(--font-ui)] text-[0.98rem] leading-[1.7] outline-none"
        style={{ minHeight: 120 }}
      />
      {!ok ? <p className="mt-2 text-sm text-[#7B766E]">Al menos {contenido.minCaracteres} caracteres para continuar.</p> : null}
    </div>
  )
}

function DecisionFinalPaso({
  contenido,
  color,
  pasoDecisionStorageKey,
  curso,
}: {
  contenido: Extract<PasoContenido, { tipo: 'decision_final' }>
  color: string
  pasoDecisionStorageKey?: string
  curso: CursoContenido
}) {
  const router = useRouter()
  const paso1Key = curso.pasos.find(p => p.tipo === 'caso_con_opciones')?.storageKey ?? `${curso.storagePrefix}-paso1-respuesta`
  const [paso1, setPaso1] = useState('')
  const [reflexiones, setReflexiones] = useState<string[]>(() => contenido.campos.map(() => ''))

  useEffect(() => {
    setReflexiones(contenido.campos.map(() => ''))
    if (typeof window === 'undefined') return
    const r = window.localStorage.getItem(paso1Key)
    if (r) queueMicrotask(() => setPaso1(r))
  }, [contenido.campos, paso1Key])

  const completar = () => {
    window.localStorage.setItem(`${curso.storagePrefix}-texto-llevar`, reflexiones[3] || '')
    if (pasoDecisionStorageKey) window.localStorage.setItem(pasoDecisionStorageKey, reflexiones[0] || '')
    router.push(curso.rutaQuiz)
  }

  return (
    <div>
      <p className="text-base leading-[1.75] font-[var(--font-ui)]">{contenido.intro}</p>
      {contenido.mostrarRespuestaInicial ? (
        <div className="mt-6 rounded-md border border-[#E8E4DC] bg-white p-4">
          <p className="font-[var(--font-ui)] text-sm uppercase tracking-[0.06em] text-[#857D73]">Al inicio elegiste:</p>
          <p className="mt-1 text-[1rem]">{paso1 || 'Sin respuesta guardada en este dispositivo.'}</p>
        </div>
      ) : null}
      {contenido.campos.map((label, i) => (
        <div key={label + i} className="mt-5">
          <label className="block font-[var(--font-ui)] text-sm uppercase tracking-[0.06em] text-[#857D73]">{label}</label>
          <textarea
            value={reflexiones[i]}
            onChange={e =>
              setReflexiones(prev => {
                const copy = [...prev]
                copy[i] = e.target.value
                return copy
              })
            }
            className="mt-2 w-full rounded-md border border-[#E8E4DC] bg-white px-4 py-3 font-[var(--font-ui)] text-[0.98rem] leading-[1.7] outline-none"
            style={{ minHeight: 110 }}
          />
        </div>
      ))}
      <button
        type="button"
        onClick={completar}
        className="mt-7 w-full rounded-md px-6 py-4 text-center font-[var(--font-display)] text-[1.25rem] uppercase tracking-[0.08em] text-white border-0 cursor-pointer"
        style={{ backgroundColor: color }}
      >
        COMPLETAR MÓDULO →
      </button>
    </div>
  )
}
