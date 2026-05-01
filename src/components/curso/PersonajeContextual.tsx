'use client'

import { FRASES_PERSONAJE, PersonajeGuia, type EstadoPersonaje } from '@/components/curso/PersonajeGuia'

export type Props = {
  color: string
  estadoBase: EstadoPersonaje
  estadoOverride: EstadoPersonaje | null
  evento: EstadoPersonaje | null
  frase: string | null
  size?: number
}

export function PersonajeContextual({
  color,
  estadoBase,
  estadoOverride,
  evento,
  frase,
  size = 100,
}: Props) {
  const estado = evento ?? estadoOverride ?? estadoBase
  const textoGlobo = frase ?? FRASES_PERSONAJE[estado]

  return (
    <div
      aria-hidden
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        pointerEvents: 'none',
      }}
    >
      <PersonajeGuia color={color} estado={estado} size={size} />
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
        {textoGlobo}
      </div>
    </div>
  )
}
