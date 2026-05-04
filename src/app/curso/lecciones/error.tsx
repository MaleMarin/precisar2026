'use client'

export default function CursoLeccionesError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div
      style={{
        minHeight: '100dvh',
        paddingTop: '7rem',
        paddingInline: 24,
        maxWidth: 520,
        margin: '0 auto',
        fontFamily: 'var(--font-ui), system-ui, sans-serif',
        color: '#333',
        background: '#F5F2EC',
      }}
    >
      <h1 style={{ fontSize: '1.1rem', fontWeight: 700 }}>No se pudo mostrar la lección</h1>
      <p style={{ marginTop: 12, fontSize: '0.85rem', lineHeight: 1.5, opacity: 0.85 }}>{error.message}</p>
      <button
        type="button"
        onClick={() => reset()}
        style={{
          marginTop: 24,
          padding: '10px 18px',
          fontFamily: 'inherit',
          fontSize: '0.85rem',
          cursor: 'pointer',
          border: '1px solid #ccc',
          borderRadius: 6,
          background: '#fff',
        }}
      >
        Reintentar
      </button>
    </div>
  )
}
