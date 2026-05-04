export default function CursoLeccionesLoading() {
  return (
    <div
      style={{
        minHeight: '100dvh',
        paddingTop: '7rem',
        paddingInline: 24,
        fontFamily: 'var(--font-ui), system-ui, sans-serif',
        color: '#333',
        background: '#F5F2EC',
      }}
    >
      <p style={{ fontSize: '0.9rem', opacity: 0.75 }}>Cargando lección…</p>
    </div>
  )
}
