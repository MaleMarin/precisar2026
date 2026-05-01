'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { COLORES_CURSO } from '@/lib/cursos/colores'
import { LECCIONES_ADC } from '@/lib/cursos/leccionesAntesDeCompartir'

const COURSE_ID = 'antes-de-compartir'
const COURSE_NAME = 'Antes de Compartir'
const COURSE_COLOR_FROM_MAP = COLORES_CURSO[COURSE_ID]
const COURSE_COLOR = COURSE_COLOR_FROM_MAP === '#E8342A' ? COURSE_COLOR_FROM_MAP : '#E8342A'
const STORAGE_PASO1 = 'adc-paso1-respuesta'
const STORAGE_COMPLETO_PREFIX = 'adc-completo-'

type Props = { slug: string }

export function LeccionAntesDeCompartirPage({ slug }: Props) {
  const router = useRouter()
  const actual = useMemo(() => LECCIONES_ADC.find(l => l.slug === slug), [slug])

  const [showPrevWarning, setShowPrevWarning] = useState(false)
  const [paso1Respuesta, setPaso1Respuesta] = useState('')

  const [casoRespuesta, setCasoRespuesta] = useState('')
  const [emocion, setEmocion] = useState('')
  const [hovered, setHovered] = useState<string[]>([])
  const [tooltipAbierto, setTooltipAbierto] = useState('')
  const [panicoLeido, setPanicoLeido] = useState(false)
  const [kitRespuestas, setKitRespuestas] = useState<Record<number, string>>({})
  const [decisionAccion, setDecisionAccion] = useState('')
  const [respuestaVmv, setRespuestaVmv] = useState('')
  const [reflexiones, setReflexiones] = useState(['', '', '', '', ''])

  useEffect(() => {
    if (!actual || actual.paso === 0) return
    const prev = LECCIONES_ADC.find(item => item.paso === actual.paso - 1)
    if (!prev) return
    const key = `${STORAGE_COMPLETO_PREFIX}${prev.slug}`
    const done = window.localStorage.getItem(key) === '1'
    queueMicrotask(() => setShowPrevWarning(!done))
  }, [actual])

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_PASO1)
    if (saved) queueMicrotask(() => setPaso1Respuesta(saved))
  }, [])

  useEffect(() => {
    if (!actual || actual.slug !== 'les-antes-de-compartir-panico') return

    const onScroll = () => {
      const scrollTop = window.scrollY
      const viewport = window.innerHeight
      const totalHeight = document.documentElement.scrollHeight
      if (scrollTop + viewport >= totalHeight - 32) setPanicoLeido(true)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [actual])

  if (!actual) {
    return (
      <div className="min-h-screen bg-[#F5F2EC] px-6 py-20 font-[var(--font-ui)]">
        Ruta de leccion no encontrada.
      </div>
    )
  }

  const idx = LECCIONES_ADC.findIndex(l => l.slug === actual.slug)
  const nextSlug = idx >= 0 && idx < LECCIONES_ADC.length - 1 ? LECCIONES_ADC[idx + 1].slug : null

  const canNext = (() => {
    switch (actual.slug) {
      case 'les-antes-de-compartir-bienvenida':
        return true
      case 'les-antes-de-compartir-caso':
        return Boolean(casoRespuesta)
      case 'les-antes-de-compartir-emocion':
        return Boolean(emocion)
      case 'les-antes-de-compartir-senales':
        return hovered.length >= 2
      case 'les-antes-de-compartir-panico':
        return panicoLeido
      case 'les-antes-de-compartir-kit':
        return Object.keys(kitRespuestas).length === 5
      case 'les-antes-de-compartir-decision-accion':
        return Boolean(decisionAccion)
      case 'les-antes-de-compartir-responder':
        return respuestaVmv.trim().length > 20
      default:
        return false
    }
  })()

  const guardarCompleto = () => {
    window.localStorage.setItem(`${STORAGE_COMPLETO_PREFIX}${actual.slug}`, '1')
  }

  const onNext = () => {
    if (!canNext || !nextSlug) return
    guardarCompleto()
    router.push(`/curso/lecciones/${nextSlug}`)
  }

  const renderLabel = (
    <p className="mb-4 font-[var(--font-ui)] text-[10px] uppercase tracking-[0.14em] text-[#999]">
      PASO {actual.paso} DE 8 · {actual.label}
    </p>
  )

  const orientacionPorPaso: Record<number, string> = {
    0: 'Este módulo dura 90 minutos. Trabajas un solo caso de principio a fin.',
    1: 'Lee la publicación y elige cómo responderías.',
    2: 'No hay respuesta correcta — solo observa qué sentiste.',
    3: 'Pasa el cursor (o toca) las frases resaltadas.',
    4: 'Lee las tres categorías antes de continuar.',
    5: 'Responde cada pregunta una por una.',
    6: 'Elige la acción que tomarías ahora.',
    7: 'Escribe aunque sea una oración.',
    8: 'Completa los campos — no hay respuestas incorrectas.',
  }
  const orientacion = orientacionPorPaso[actual.paso]
  const pasoParaVista = Math.max(0, Math.min(actual.paso, 8))
  const progreso = `${(pasoParaVista / 8) * 100}%`

  const titleClass = 'font-[var(--font-display)] uppercase leading-[0.95] tracking-[0.03em]'

  return (
    <div className="min-h-screen bg-[#F5F2EC] pb-32 text-[#333]">
      <header className="fixed inset-x-0 top-0 z-30 bg-white shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="flex h-14 items-center justify-between gap-3 px-4 md:px-6">
          <Link
            href={`/cursos/${COURSE_ID}`}
            className="font-[var(--font-ui)] text-sm font-semibold text-[#444] no-underline"
          >
            ← Salir
          </Link>
          <div className="text-center">
            <div className="font-[var(--font-ui)] text-[0.7rem] uppercase tracking-[0.1em] text-[#999]">
              {COURSE_NAME}
            </div>
            <div className="font-[var(--font-ui)] text-[0.75rem] font-bold uppercase tracking-[0.05em] text-[#1A1A1A]">
              {actual.label}
            </div>
          </div>
          <div className="text-right font-[var(--font-ui)] text-[0.7rem] text-[#999]">
            Paso {pasoParaVista} de 8
          </div>
        </div>
        <div className="h-[3px] w-full bg-[#E8E4DC]">
          <div
            className="h-[3px] transition-[width] duration-400 ease-in-out"
            style={{ width: progreso, backgroundColor: COURSE_COLOR }}
          />
        </div>
      </header>

      <main className="mx-auto max-w-[680px] px-6 pb-20 pt-[116px]">
        {showPrevWarning ? (
          <div className="mb-6 rounded-md border border-[#E8E4DC] bg-white px-4 py-3 font-[var(--font-ui)] text-sm text-[#666]">
            Aviso: no se detecta el paso anterior como completado en este dispositivo.
          </div>
        ) : null}

        {actual.slug === 'les-antes-de-compartir-bienvenida' ? (
          <section>
            {renderLabel}
            <p className="mb-3 font-[var(--font-ui)] text-[0.85rem] text-[#666]">{orientacion}</p>
            <h1 className={titleClass} style={{ fontSize: 'clamp(3rem,6vw,5rem)', color: COURSE_COLOR }}>
              Antes de Compartir
            </h1>
            <p className="mt-2 font-[var(--font-ui)] text-2xl text-[#5C5750]">
              Lo que pasa entre que ves algo y lo reenvias.
            </p>
            <p className="mt-8 text-base leading-[1.75]">
              En los proximos 90 minutos vas a trabajar un solo caso real de principio a fin.
              No hay respuestas correctas al inicio. Hay un proceso.
            </p>
            <div
              className="mt-8 bg-white px-4 py-4 text-base leading-[1.7]"
              style={{ borderLeft: `4px solid ${COURSE_COLOR}` }}
            >
              Este modulo trabaja un solo caso desde el principio hasta el final.
            </div>
          </section>
        ) : null}

        {actual.slug === 'les-antes-de-compartir-caso' ? (
          <section>
            {renderLabel}
            <p className="mb-3 font-[var(--font-ui)] text-[0.85rem] text-[#666]">{orientacion}</p>
            <h1 className={titleClass} style={{ fontSize: 'clamp(2.7rem,5.6vw,4.4rem)', color: COURSE_COLOR }}>
              ¿QUÉ HARÍAS?
            </h1>
            <p className="mt-5 text-base leading-[1.75]">
              Te mostramos una publicacion tal como llegaria en una red social.
            </p>
            <div className="mt-6 rounded-lg bg-white p-5 shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[#D9D9D9]" />
                <p className="font-[var(--font-ui)] text-sm text-[#666]">Usuario @handle · 2h</p>
              </div>
              <p className="text-[0.98rem] leading-[1.7] text-[#333]">
                Algo no cuadra con Artemis II. La cápsula ya cayó al océano, pero los astronautas siguen adentro.
                Durante varios minutos no hubo comunicación. Dicen que todo salió bien, pero esta imagen deja
                muchas dudas. ¿Es realmente un procedimiento normal o están ocultando un problema?
              </p>
              <div className="mt-5 rounded-md bg-[#ECEAE5] px-4 py-10 text-center text-sm text-[#7B766E]">
                Imagen: cápsula en el océano
              </div>
            </div>
            <h2 className="mt-8 font-[var(--font-display)] text-[1.5rem] uppercase tracking-[0.03em] text-[#1A1A1A]">
              ¿QUÉ HARÍAS PRIMERO?
            </h2>
            <div className="mt-4 space-y-3">
              {[
                'La comparto porque parece importante',
                'Espero para ver si se aclara',
                'Reviso qué parte está confirmada y qué es interpretación',
                'Asumo que hubo un problema',
              ].map(op => (
                <button
                  key={op}
                  type="button"
                  onClick={() => {
                    setCasoRespuesta(op)
                    window.localStorage.setItem(STORAGE_PASO1, op)
                  }}
                  className="w-full rounded-md bg-white px-5 py-4 text-left font-[var(--font-ui)] text-[0.95rem] text-[#333] transition hover:bg-[#FAFAF8]"
                  style={{
                    minHeight: 56,
                    border: casoRespuesta === op ? `2px solid ${COURSE_COLOR}` : '1px solid #E8E4DC',
                  }}
                >
                  {op}
                </button>
              ))}
            </div>
          </section>
        ) : null}

        {actual.slug === 'les-antes-de-compartir-emocion' ? (
          <section>
            {renderLabel}
            <p className="mb-3 font-[var(--font-ui)] text-[0.85rem] text-[#666]">{orientacion}</p>
            <h1 className={titleClass} style={{ fontSize: 'clamp(2.4rem,5.1vw,4rem)', color: COURSE_COLOR }}>
              Que te hizo reaccionar?
            </h1>
            <p className="mt-5 text-base leading-[1.75]">
              Antes de verificar un contenido, vale la pena notar que te hizo reaccionar. No para juzgarte,
              sino para recuperar un poco de distancia.
            </p>
            <div className="mt-6 space-y-3">
              {['Apuro', 'Preocupacion', 'Desconfianza', 'Curiosidad', 'Alarma'].map(item => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    setEmocion(item)
                    window.localStorage.setItem('adc-emocion', item)
                  }}
                  className="w-full rounded-md bg-white px-5 py-4 text-left font-[var(--font-ui)] text-[0.95rem] text-[#333] transition hover:bg-[#FAFAF8]"
                  style={{
                    minHeight: 56,
                    border: emocion === item ? `2px solid ${COURSE_COLOR}` : '1px solid #E8E4DC',
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            {emocion ? (
              <p className="mt-6 font-[var(--font-ui)] text-[1.35rem] leading-[1.5] text-[#5D5750]">
                {{
                  Apuro:
                    'El apuro es la emocion que mas beneficia a la desinformacion. La urgencia muchas veces es una tactica, no una realidad.',
                  Preocupacion:
                    'La preocupacion legitima puede nublarnos para evaluar si la amenaza es real o construida.',
                  Desconfianza:
                    'La desconfianza puede ser bien fundada. Tambien puede hacernos ver conspiraciones donde hay errores simples.',
                  Curiosidad:
                    'La curiosidad es el mejor punto de partida. Usala para buscar, no para concluir.',
                  Alarma:
                    'La alarma nos prepara para actuar. Pero actuar primero y pensar despues suele empeorar las cosas.',
                }[emocion]}
              </p>
            ) : null}
          </section>
        ) : null}

        {actual.slug === 'les-antes-de-compartir-senales' ? (
          <section>
            {renderLabel}
            <p className="mb-3 font-[var(--font-ui)] text-[0.85rem] text-[#666]">{orientacion}</p>
            <h1 className={titleClass} style={{ fontSize: 'clamp(2.4rem,5.1vw,4rem)', color: COURSE_COLOR }}>
              Observa como esta construido
            </h1>
            <p className="mt-5 text-base leading-[1.75]">
              Vuelve a mirar la publicacion, pero esta vez con mas calma. No para decidir si es verdadera o falsa,
              sino para observar como esta construida.
            </p>
            <div className="mt-6 rounded-lg bg-white p-5 shadow-[0_6px_18px_rgba(0,0,0,0.06)]">
              <p className="text-[0.98rem] leading-[1.75]">
                <Resaltado
                  texto="algo no cuadra"
                  tooltip="Afirmacion sin evidencia concreta"
                  color={COURSE_COLOR}
                  hovered={hovered}
                  setHovered={setHovered}
                  abierto={tooltipAbierto}
                  setAbierto={setTooltipAbierto}
                />{' '}
                con Artemis II. La capsula ya cayo al oceano, pero los astronautas{' '}
                <Resaltado
                  texto="siguen adentro"
                  tooltip="Dato real presentado como alarma"
                  color={COURSE_COLOR}
                  hovered={hovered}
                  setHovered={setHovered}
                  abierto={tooltipAbierto}
                  setAbierto={setTooltipAbierto}
                />
                . Durante varios minutos{' '}
                <Resaltado
                  texto="no hubo comunicacion"
                  tooltip="Sin fuente que lo confirme"
                  color={COURSE_COLOR}
                  hovered={hovered}
                  setHovered={setHovered}
                  abierto={tooltipAbierto}
                  setAbierto={setTooltipAbierto}
                />
                . Dicen que todo salio bien, pero esta imagen deja muchas dudas.{' '}
                <Resaltado
                  texto="ocultan un problema"
                  tooltip="Conclusion presentada como hecho"
                  color={COURSE_COLOR}
                  hovered={hovered}
                  setHovered={setHovered}
                  abierto={tooltipAbierto}
                  setAbierto={setTooltipAbierto}
                />
                .
              </p>
            </div>
            <p className="mt-6 text-base leading-[1.75]">
              Estas frases mezclan datos reales con interpretaciones no verificadas.
            </p>
            <p className="mt-3 text-sm text-[#7B766E]">
              Interactua con al menos 2 frases (hover o tap) para habilitar el siguiente paso.
            </p>
          </section>
        ) : null}

        {actual.slug === 'les-antes-de-compartir-panico' ? (
          <section>
            {renderLabel}
            <p className="mb-3 font-[var(--font-ui)] text-[0.85rem] text-[#666]">{orientacion}</p>
            <h1 className={titleClass} style={{ fontSize: 'clamp(2.4rem,5.1vw,4rem)', color: COURSE_COLOR }}>
              Asi se fabrica el panico
            </h1>
            <p className="mt-5 text-base leading-[1.75]">
              Algunas publicaciones no inventan todo desde cero: combinan piezas reales con tono emocional,
              contexto parcial y conclusiones apresuradas.
            </p>
            <div className="mt-6 space-y-4">
              {[
                {
                  title: 'DESINFORMACION',
                  border: '#E8342A',
                  text: 'Informacion falsa o enganosa que puede afectar decisiones.',
                },
                {
                  title: 'DESCONTEXTUALIZACION',
                  border: '#E8A020',
                  text: 'Foto o video real, contexto falso.',
                },
                {
                  title: 'SESGO MEDIATICO',
                  border: '#2B4EFF',
                  text: 'Seleccion de datos con tono emocional que distorsiona la realidad.',
                },
              ].map(card => (
                <article
                  key={card.title}
                  className="rounded-md bg-white px-4 py-4"
                  style={{ borderLeft: `4px solid ${card.border}` }}
                >
                  <h3 className="font-[var(--font-display)] text-[1.35rem] uppercase">{card.title}</h3>
                  <p className="mt-2 text-[0.98rem] leading-[1.7]">{card.text}</p>
                </article>
              ))}
            </div>
            <p className="mt-8 font-[var(--font-display)] text-[2rem] uppercase tracking-[0.03em] text-[#1F1A14]">
              LO VIRAL NO EQUIVALE A LO VERDADERO.
            </p>
            <p className="mt-3 text-sm text-[#7B766E]">
              Desplazate hasta el final de la pagina para habilitar siguiente.
            </p>
          </section>
        ) : null}

        {actual.slug === 'les-antes-de-compartir-kit' ? (
          <section>
            {renderLabel}
            <p className="mb-3 font-[var(--font-ui)] text-[0.85rem] text-[#666]">{orientacion}</p>
            <h1 className={titleClass} style={{ fontSize: 'clamp(2.4rem,5.1vw,4rem)', color: COURSE_COLOR }}>
              Tu Kit de Pausa
            </h1>
            <p className="mt-5 text-base leading-[1.75]">
              5 preguntas para antes de compartir cualquier contenido.
            </p>
            <div className="mt-6 space-y-5">
              {[
                'Que afirma exactamente?',
                'De donde viene?',
                'Cuando y donde ocurrio?',
                'Que evidencia muestra?',
                'Compartir ayuda o mete mas ruido?',
              ].map((q, i) => {
                const idxq = i + 1
                const visible = idxq === 1 || Boolean(kitRespuestas[idxq - 1])
                if (!visible) return null

                return (
                  <div key={q} className="rounded-md border border-[#E8E4DC] bg-white p-4">
                    <p className="font-[var(--font-ui)] text-sm uppercase tracking-[0.06em] text-[#857D73]">
                      P{idxq}
                    </p>
                    <p className="mt-1 text-[1rem]">{q}</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                      {['CLARO', 'DUDOSO', 'FALTA INFORMACION'].map(op => (
                        <button
                          key={op}
                          type="button"
                          onClick={() =>
                            setKitRespuestas(prev => {
                              const actualizado = { ...prev, [idxq]: op }
                              const serializado = [1, 2, 3, 4, 5]
                                .map(n => actualizado[n])
                                .filter(Boolean) as string[]
                              window.localStorage.setItem(
                                'adc-kit-respuestas',
                                JSON.stringify(serializado)
                              )
                              return actualizado
                            })
                          }
                          className="rounded-md px-3 py-3 text-left font-[var(--font-ui)] text-[0.9rem]"
                          style={{
                            border:
                              kitRespuestas[idxq] === op ? `2px solid ${COURSE_COLOR}` : '1px solid #E8E4DC',
                            background: '#FFF',
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
            {Object.keys(kitRespuestas).length === 5 ? (
              <div className="mt-7 rounded-md bg-white p-4">
                <h3 className="font-[var(--font-display)] text-[1.35rem] uppercase">Resumen</h3>
                <ul className="mt-2 space-y-1 text-sm">
                  {Object.entries(kitRespuestas).map(([k, v]) => (
                    <li key={k}>P{k}: {v}</li>
                  ))}
                </ul>
              </div>
            ) : null}
          </section>
        ) : null}

        {actual.slug === 'les-antes-de-compartir-decision-accion' ? (
          <section>
            {renderLabel}
            <p className="mb-3 font-[var(--font-ui)] text-[0.85rem] text-[#666]">{orientacion}</p>
            <h1 className={titleClass} style={{ fontSize: 'clamp(2.4rem,5.1vw,4rem)', color: COURSE_COLOR }}>
              Que harias ahora?
            </h1>
            <p className="mt-5 text-base leading-[1.75]">
              Despues de pausar, observar y contrastar, decide una accion concreta.
            </p>
            <div className="mt-6 space-y-3">
              {[
                'No compartir todavia',
                'Verificar mas',
                'Compartir con contexto',
                'Responder sin amplificar',
              ].map(op => (
                <button
                  key={op}
                  type="button"
                  onClick={() => {
                    setDecisionAccion(op)
                    window.localStorage.setItem('adc-decision-accion', op)
                  }}
                  className="w-full rounded-md bg-white px-5 py-4 text-left font-[var(--font-ui)] text-[0.95rem] transition hover:bg-[#FAFAF8]"
                  style={{
                    minHeight: 56,
                    border: decisionAccion === op ? `2px solid ${COURSE_COLOR}` : '1px solid #E8E4DC',
                  }}
                >
                  [{op}]
                </button>
              ))}
            </div>
            {decisionAccion ? (
              <div
                className="mt-6 rounded-md bg-white px-4 py-4 text-[0.98rem] leading-[1.7]"
                style={{ border: `1px solid ${COURSE_COLOR}` }}
              >
                {{
                  'No compartir todavia':
                    'Buena opcion para evitar amplificar ruido mientras verificas mejor la informacion.',
                  'Verificar mas':
                    'Suma buscar fuente primaria, tiempo y contexto para separar dato de interpretacion.',
                  'Compartir con contexto':
                    'Si compartes, incluye que esta confirmado y que no para reducir malentendidos.',
                  'Responder sin amplificar':
                    'Responde en privado o con enfoque didactico, evitando repetir el mito de forma textual.',
                }[decisionAccion]}
              </div>
            ) : null}
          </section>
        ) : null}

        {actual.slug === 'les-antes-de-compartir-responder' ? (
          <section>
            {renderLabel}
            <p className="mb-3 font-[var(--font-ui)] text-[0.85rem] text-[#666]">{orientacion}</p>
            <h1 className={titleClass} style={{ fontSize: 'clamp(2.4rem,5.1vw,4rem)', color: COURSE_COLOR }}>
              Responder sin hacer eco
            </h1>
            <p className="mt-5 text-base leading-[1.75]">
              Modelo VMV: Verdad → Mito breve → Verdad reforzada.
            </p>
            <div className="mt-5 rounded-md border border-[#E8E4DC] bg-white p-4">
              <p className="text-[0.95rem] leading-[1.7]">
                La capsula amerizo segun el procedimiento previsto (Verdad). Circularon mensajes que sugerian
                ocultamiento por una pausa de comunicacion (Mito breve). Esa pausa esta contemplada por seguridad
                y no implica una falla critica (Verdad reforzada).
              </p>
            </div>
            <label className="mt-6 block font-[var(--font-ui)] text-sm uppercase tracking-[0.06em] text-[#857D73]">
              Como le explicarias esto a alguien de tu entorno?
            </label>
            <textarea
              value={respuestaVmv}
              onChange={e => {
                setRespuestaVmv(e.target.value)
                window.localStorage.setItem('adc-texto-responder', e.target.value)
              }}
              placeholder="Escribe una o dos oraciones..."
              className="mt-3 w-full rounded-md border border-[#E8E4DC] bg-white px-4 py-3 font-[var(--font-ui)] text-[0.98rem] leading-[1.7] outline-none"
              style={{ minHeight: 120 }}
            />
          </section>
        ) : null}

        {actual.slug === 'les-antes-de-compartir-decision' ? (
          <section>
            {renderLabel}
            <p className="mb-3 font-[var(--font-ui)] text-[0.85rem] text-[#666]">{orientacion}</p>
            <h1 className={titleClass} style={{ fontSize: 'clamp(2.4rem,5.1vw,4rem)', color: COURSE_COLOR }}>
              Tu decision final
            </h1>
            <div className="mt-6 rounded-md border border-[#E8E4DC] bg-white p-4">
              <p className="font-[var(--font-ui)] text-sm uppercase tracking-[0.06em] text-[#857D73]">
                Al inicio elegiste:
              </p>
              <p className="mt-1 text-[1rem]">{paso1Respuesta || 'Sin respuesta guardada en este dispositivo.'}</p>
            </div>
            {[
              'Mi decision final es...',
              'La elijo porque...',
              'Lo que intente evitar fue...',
              'La proxima vez hare algo distinto:',
              'Cambio mi respuesta inicial? (si/no + por que)',
            ].map((label, i) => (
              <div key={label} className="mt-5">
                <label className="block font-[var(--font-ui)] text-sm uppercase tracking-[0.06em] text-[#857D73]">
                  {label}
                </label>
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
              onClick={() => {
                guardarCompleto()
                window.localStorage.setItem('adc-decision-final', reflexiones[0] || '')
                window.localStorage.setItem('adc-texto-llevar', reflexiones[3] || '')
                router.push('/quiz/antes-de-compartir')
              }}
              className="mt-7 w-full rounded-md px-6 py-4 text-center font-[var(--font-display)] text-[1.25rem] uppercase tracking-[0.08em] text-white"
              style={{ backgroundColor: COURSE_COLOR }}
            >
              COMPLETAR MODULO →
            </button>
          </section>
        ) : null}
      </main>

      {nextSlug ? (
        <button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          className="fixed bottom-6 right-6 z-20 rounded-md px-8 py-4 font-[var(--font-display)] text-[1.1rem] uppercase tracking-[0.08em] text-white"
          style={{
            backgroundColor: COURSE_COLOR,
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

type ResaltadoProps = {
  texto: string
  tooltip: string
  color: string
  hovered: string[]
  setHovered: React.Dispatch<React.SetStateAction<string[]>>
  abierto: string
  setAbierto: React.Dispatch<React.SetStateAction<string>>
}

function Resaltado({
  texto,
  tooltip,
  color,
  hovered,
  setHovered,
  abierto,
  setAbierto,
}: ResaltadoProps) {
  const touched = hovered.includes(texto)
  const registrarTooltip = () => {
    const prev = parseInt(window.localStorage.getItem('adc-tooltips-vistos') || '0')
    window.localStorage.setItem('adc-tooltips-vistos', String(prev + 1))
  }
  return (
    <span className="relative inline-block">
      <button
        type="button"
        onMouseEnter={() => {
          if (!touched) setHovered(prev => [...prev, texto])
          registrarTooltip()
          setAbierto(texto)
        }}
        onClick={() => {
          if (!touched) setHovered(prev => [...prev, texto])
          registrarTooltip()
          setAbierto(prev => (prev === texto ? '' : texto))
        }}
        className="cursor-pointer border-b-2 bg-transparent px-0 py-0 text-left font-semibold"
        style={{ borderColor: color }}
      >
        {texto}
      </button>
      {abierto === texto ? (
        <span className="absolute left-0 top-[120%] z-10 w-56 rounded-md bg-[#1F1B17] px-3 py-2 text-xs leading-[1.5] text-white">
          {tooltip}
        </span>
      ) : null}
    </span>
  )
}
