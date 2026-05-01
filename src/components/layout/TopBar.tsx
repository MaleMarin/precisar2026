'use client'

type TopBarProps = {
  titulo?: string
  userName?: string
}

export function TopBar({ titulo, userName }: TopBarProps) {
  return (
    <header
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-black/10 px-6"
      style={{ backgroundColor: 'var(--fondo-alt)' }}
    >
      {titulo && (
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
            color: 'var(--texto)',
            letterSpacing: '0.04em',
            lineHeight: 1.1,
          }}
        >
          {titulo}
        </h1>
      )}
      {userName && (
        <div
          className="flex h-10 w-10 items-center justify-center text-sm font-bold"
          style={{
            fontFamily: 'var(--font-ui)',
            color: 'var(--texto)',
            border: '1px solid rgba(0,0,0,0.2)',
          }}
        >
          {userName.charAt(0).toUpperCase()}
        </div>
      )}
    </header>
  )
}
