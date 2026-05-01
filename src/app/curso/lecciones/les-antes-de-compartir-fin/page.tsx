'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { COLORES_CURSO } from '@/lib/cursos/colores'

const color = COLORES_CURSO['antes-de-compartir']

export default function FinAntesDeCompartir() {
  const [respuestaInicial, setRespuestaInicial] = useState('')

  useEffect(() => {
    const r = localStorage.getItem('adc-paso1-respuesta')
    if (r) queueMicrotask(() => setRespuestaInicial(r))
  }, [])

  return (
    <main
      style={{
        backgroundColor: color,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 32px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: 'rgba(255,255,255,0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
          fontSize: '2rem',
        }}
      >
        ✓
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 6vw, 5rem)',
          color: '#FFFFFF',
          lineHeight: 1,
          letterSpacing: '0.02em',
          marginBottom: '16px',
        }}
      >
        COMPLETASTE
        <br />
        EL MÓDULO
      </h1>

      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontStyle: 'normal',
          fontSize: '1.15rem',
          color: 'rgba(255,255,255,0.75)',
          marginBottom: '48px',
        }}
      >
        Antes de Compartir
      </p>

      {respuestaInicial && (
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,0.15)',
            padding: '24px 32px',
            maxWidth: '480px',
            marginBottom: '48px',
            textAlign: 'left',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '8px',
            }}
          >
            AL INICIO ELEGISTE
          </div>
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.9rem',
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6,
            }}
          >
            {respuestaInicial}
          </p>
        </div>
      )}

      <p
        style={{
          fontFamily: 'var(--font-ui)',
          fontStyle: 'normal',
          fontSize: '1.05rem',
          color: 'rgba(255,255,255,0.7)',
          maxWidth: '440px',
          lineHeight: 1.7,
          marginBottom: '48px',
          whiteSpace: 'pre-line',
        }}
      >
        {'\u201C'}No todo lo urgente merece circular. A veces, la mejor forma de actuar es detenerte,
        entender mejor y no amplificar.{'\u201D'}
      </p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          maxWidth: '360px',
        }}
      >
        <Link
          href="/quiz/antes-de-compartir"
          style={{
            display: 'block',
            backgroundColor: '#FFFFFF',
            color,
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            letterSpacing: '0.08em',
            padding: '18px 32px',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          HACER LA EVALUACIÓN →
        </Link>

        <Link
          href="/inicio"
          style={{
            display: 'block',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            color: 'rgba(255,255,255,0.45)',
            textDecoration: 'none',
            textAlign: 'center',
            padding: '12px',
          }}
        >
          ← VOLVER A TODOS LOS CURSOS
        </Link>
      </div>
    </main>
  )
}
