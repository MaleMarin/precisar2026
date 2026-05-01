'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { COLORES_CURSO } from '@/lib/cursos/colores'
import {
  SEÑALES_ANTES_DE_COMPARTIR,
  calcularMapa,
  nivelAPuntos,
  type NivelSeñal,
} from '@/lib/cursos/mapaSeñales'
import { toPng } from 'html-to-image'

const ETIQUETA_NIVEL: Record<NivelSeñal, string> = {
  fuerte: 'Fuerte',
  desarrollando: 'Desarrollando',
  explorando: 'Explorando',
}

function nombreCursoDesdeQuizId(quizId: string): string {
  return quizId.replaceAll('-', ' ')
}

function sinGuionesConComas(texto: string): string {
  return texto.replaceAll('—', ',').replaceAll(' - ', ', ')
}

export default function MapaPage() {
  const params = useParams()
  const quizId = params.quizId as string
  const color = COLORES_CURSO[quizId] || '#1A1A1A'
  const nombreCurso = nombreCursoDesdeQuizId(quizId)

  const [recorrido, setRecorrido] = useState({
    paso1: '',
    emocion: '',
    decisionFinal: '',
    textoLlevar: '',
  })
  const [descargando, setDescargando] = useState(false)

  useEffect(() => {
    setRecorrido({
      paso1: localStorage.getItem('adc-paso1-respuesta') || '',
      emocion: localStorage.getItem('adc-emocion') || '',
      decisionFinal: localStorage.getItem('adc-decision-final') || '',
      textoLlevar: localStorage.getItem('adc-texto-llevar') || '',
    })
  }, [])

  const mapaCalc = useMemo(() => {
    const tooltipsVistos =
      typeof window === 'undefined'
        ? 0
        : parseInt(window.localStorage.getItem('adc-tooltips-vistos') || '0', 10)
    const kitRespuestas =
      typeof window === 'undefined'
        ? []
        : JSON.parse(window.localStorage.getItem('adc-kit-respuestas') || '[]')
    const decisionAccion =
      typeof window === 'undefined' ? '' : window.localStorage.getItem('adc-decision-accion') || ''
    const textoResponder =
      typeof window === 'undefined' ? '' : window.localStorage.getItem('adc-texto-responder') || ''

    return calcularMapa({
      paso1: recorrido.paso1,
      emocion: recorrido.emocion,
      tooltipsVistos,
      kitRespuestas,
      decisionAccion,
      textoResponder,
      decisionFinal: recorrido.decisionFinal,
    })
  }, [recorrido])

  const handleDescargar = async () => {
    setDescargando(true)
    try {
      const el = document.getElementById('mapa-señales-card')
      if (!el) return
      const dataUrl = await toPng(el, {
        cacheBust: true,
        pixelRatio: 2,
      })
      const link = document.createElement('a')
      link.download = `clic-mapa-${quizId}.png`
      link.href = dataUrl
      link.click()
    } catch (e) {
      console.error(e)
    } finally {
      setDescargando(false)
    }
  }

  return (
    <main
      style={{
        backgroundColor: '#F5F2EC',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          backgroundColor: '#FFFFFF',
          borderBottom: '0.5px solid rgba(0,0,0,0.08)',
          padding: '0 32px',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 10,
        }}
      >
        <Link
          href="/saberes/clic"
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.8rem',
            color: '#999',
            textDecoration: 'none',
          }}
        >
          ← Volver a cursos
        </Link>
        <div
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#999',
            textTransform: 'uppercase',
          }}
        >
          TU MAPA DE SEÑALES
        </div>
        <div style={{ width: '80px' }} />
      </div>

      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '56px 48px 80px',
        }}
      >
        <div
            id="mapa-señales-card"
          style={{
            display: 'grid',
              gridTemplateColumns: '320px 1fr',
              gap: '64px',
            alignItems: 'start',
          }}
        >
            <section
              style={{
                position: 'sticky',
                top: '72px',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#999',
                  marginBottom: '12px',
                }}
              >
                {nombreCurso}
              </div>
              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.9rem,5.4vw,4.5rem)',
                  color,
                  lineHeight: 1,
                  letterSpacing: '0.02em',
                  marginBottom: '16px',
                  whiteSpace: 'pre-line',
                }}
              >
                {'COMPLETASTE\nEL MÓDULO'}
              </h1>
              <p
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '1rem',
                  color: '#666',
                  lineHeight: 1.75,
                  marginBottom: '32px',
                }}
              >
                Este mapa muestra las señales que activaste. No hay correcto ni incorrecto, hay un punto de
                partida.
              </p>
              <div
                style={{
                  width: '40px',
                  height: '2px',
                  backgroundColor: color,
                  marginBottom: '32px',
                }}
              />
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#999',
                  marginBottom: '16px',
                }}
              >
                TU RECORRIDO
              </div>

              {[
                { label: 'Al inicio elegiste', valor: recorrido.paso1 },
                { label: 'Lo que sentiste', valor: recorrido.emocion },
                { label: 'Tu decisión final', valor: recorrido.decisionFinal },
                { label: 'Lo que te llevas', valor: recorrido.textoLlevar },
              ]
                .filter(row => row.valor)
                .map(row => (
                  <div
                    key={row.label}
                    style={{
                      padding: '12px 0',
                      borderBottom: '0.5px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '12px',
                        color: '#999',
                      }}
                    >
                      {row.label}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-ui)',
                        fontSize: '0.95rem',
                        color: '#1A1A1A',
                        lineHeight: 1.55,
                        marginTop: '4px',
                      }}
                    >
                      {row.valor}
                    </div>
                  </div>
                ))}

              <div
                style={{
                  marginTop: '24px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: 'var(--font-ui)',
                  fontSize: '12px',
                  color: '#999',
                }}
              >
                <span>
                  {new Date().toLocaleDateString('es-CL', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
                <span>Clic · Precisar</span>
              </div>

              <button
                onClick={descargando ? undefined : handleDescargar}
                style={{
                  marginTop: '24px',
                  width: '100%',
                  backgroundColor: color,
                  color: '#FFFFFF',
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.2rem',
                  letterSpacing: '0.08em',
                  padding: '14px 24px',
                  border: 'none',
                  cursor: descargando ? 'default' : 'pointer',
                }}
              >
                {descargando ? 'DESCARGANDO...' : 'DESCARGAR'}
              </button>

              <div
                style={{
                  marginTop: '16px',
                  backgroundColor: '#FFFFFF',
                  border: '0.5px solid rgba(0,0,0,0.08)',
                  borderRadius: '8px',
                  padding: '20px',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '10px',
                    color: '#999',
                    textTransform: 'uppercase',
                    letterSpacing: '0.18em',
                    marginBottom: '8px',
                  }}
                >
                  Siguiente paso sugerido
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.95rem',
                    color: '#333',
                    lineHeight: 1.65,
                    marginBottom: '10px',
                  }}
                >
                  Basado en tu mapa, el siguiente módulo que más te puede aportar es ¿Quién habló?, sobre IA y
                  voz clonada.
                </p>
                <Link
                  href="/cursos/quien-hablo"
                  style={{
                    color,
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  IR A ESE MÓDULO →
                </Link>
              </div>
            </section>

            <section style={{ flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '28px',
                  flexWrap: 'wrap',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.9rem',
                    color: '#999',
                  }}
                >
                  Cada punto = una decisión que tomaste
                </span>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <div
                      key={n}
                      style={{
                        width: '11px',
                        height: '11px',
                        borderRadius: '50%',
                        backgroundColor: n <= 3 ? color : '#E0DDD6',
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.9rem',
                    color: '#999',
                  }}
                >
                  más = más desarrollada
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0',
                }}
              >
                {SEÑALES_ANTES_DE_COMPARTIR.map(señal => {
                  const nivel = mapaCalc[señal.id] || 'explorando'
                  const puntos = nivelAPuntos(nivel)

                  return (
                    <div
                      key={señal.id}
                      style={{
                        padding: '20px 0',
                        borderBottom: '0.5px solid rgba(0,0,0,0.08)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        gap: '24px',
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: '1.62rem',
                            letterSpacing: '0.02em',
                            color: '#1A1A1A',
                            marginBottom: '4px',
                          }}
                        >
                          {señal.nombre}
                        </div>
                        <div
                          style={{
                            fontFamily: 'var(--font-ui)',
                            fontSize: '0.95rem',
                            color: '#999',
                            lineHeight: 1.6,
                          }}
                        >
                          {ETIQUETA_NIVEL[nivel]},{' '}
                          {nivel === 'fuerte'
                            ? sinGuionesConComas(señal.descripcion_fuerte)
                            : nivel === 'desarrollando'
                              ? sinGuionesConComas(señal.descripcion_desarrollando)
                              : sinGuionesConComas(señal.descripcion_explorando)}
                        </div>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          gap: '5px',
                          flexShrink: 0,
                          marginTop: '4px',
                        }}
                      >
                        {[1, 2, 3, 4, 5].map(n => (
                          <div
                            key={n}
                            style={{
                              width: '11px',
                              height: '11px',
                              borderRadius: '50%',
                              backgroundColor: n <= puntos ? color : '#E0DDD6',
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>
        </div>
    </main>
  )
}
