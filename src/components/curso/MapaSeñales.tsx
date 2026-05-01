'use client'

import { useMemo } from 'react'
import {
  SEÑALES_ANTES_DE_COMPARTIR,
  calcularMapa,
  nivelAPuntos,
  type NivelSeñal,
} from '@/lib/cursos/mapaSeñales'

type Props = {
  courseId: string
  color: string
  recorrido: {
    paso1: string
    emocion: string
    decisionFinal: string
    textoLlevar: string
  }
  onDescargar?: () => void
}

const ETIQUETA: Record<NivelSeñal, string> = {
  fuerte: 'Fuerte',
  desarrollando: 'Desarrollando',
  explorando: 'Explorando',
}

export function MapaSeñales({ color, recorrido, onDescargar }: Props) {
  const mapaCalc = useMemo(() => {
    const tooltipsVistos =
      typeof window === 'undefined'
        ? 0
        : parseInt(window.localStorage.getItem('adc-tooltips-vistos') || '0')
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

  return (
    <div
      id="mapa-señales-card"
      style={{
        maxWidth: '100%',
        margin: '0 auto',
        fontFamily: 'var(--font-ui)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.82rem',
            color: '#999',
          }}
        >
          Cada punto = una decisión que tomaste
        </span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {[1, 2, 3, 4, 5].map(n => (
            <div
              key={n}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: n <= 3 ? color : '#E0DDD6',
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.82rem',
            color: '#999',
          }}
        >
          más = más desarrollada
        </span>
      </div>

      {SEÑALES_ANTES_DE_COMPARTIR.map((señal, i) => {
        const nivel = mapaCalc[señal.id] || 'explorando'
        const puntos = nivelAPuntos(nivel)
        const isLast = i === SEÑALES_ANTES_DE_COMPARTIR.length - 1

        return (
          <div
            key={señal.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '20px 0',
              borderBottom: isLast ? 'none' : '0.5px solid rgba(0,0,0,0.08)',
              gap: '24px',
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  letterSpacing: '0.02em',
                  color: '#1A1A1A',
                }}
              >
                {señal.nombre}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.9rem',
                  color: '#999',
                  marginTop: '4px',
                }}
              >
                {ETIQUETA[nivel]} —{' '}
                {nivel === 'fuerte'
                  ? señal.descripcion_fuerte
                  : nivel === 'desarrollando'
                    ? señal.descripcion_desarrollando
                    : señal.descripcion_explorando}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '4px',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              {[1, 2, 3, 4, 5].map(n => (
                <div
                  key={n}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: n <= puntos ? color : '#E0DDD6',
                  }}
                />
              ))}
            </div>
          </div>
        )
      })}

      <div
        style={{
          marginTop: '48px',
        }}
      >
        <div
          style={{
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#999',
            marginBottom: '20px',
          }}
        >
          Tu recorrido
        </div>
        {[
          { label: 'Al inicio elegiste', valor: recorrido.paso1 },
          { label: 'Lo que sentiste', valor: recorrido.emocion },
          { label: 'Tu decisión final', valor: recorrido.decisionFinal },
          { label: 'Lo que te llevas', valor: recorrido.textoLlevar },
        ]
          .filter(r => r.valor)
          .map(row => (
            <div
              key={row.label}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 0',
                borderBottom: '0.5px solid rgba(0,0,0,0.08)',
                gap: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '0.82rem',
                  color: '#999',
                  flexShrink: 0,
                }}
              >
                {row.label}
              </div>
              <div
                style={{
                  fontSize: '1rem',
                  color: '#1A1A1A',
                  textAlign: 'right',
                  lineHeight: 1.5,
                  maxWidth: '300px',
                }}
              >
                {row.valor}
              </div>
            </div>
          ))}
      </div>

      <div
        style={{
          marginTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '0.82rem',
            color: '#999',
          }}
        >
          {new Date().toLocaleDateString('es-CL', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.82rem',
            fontWeight: 700,
            color: '#999',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: color,
            }}
          />
          Clic · Precisar
        </div>
      </div>

      {onDescargar && (
        <button
          onClick={onDescargar}
          style={{
            marginTop: '16px',
            width: '100%',
            backgroundColor: color,
            color: '#FFFFFF',
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            letterSpacing: '0.08em',
            padding: '16px 32px',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          DESCARGAR MI MAPA →
        </button>
      )}
    </div>
  )
}
