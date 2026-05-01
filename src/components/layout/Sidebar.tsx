'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/inicio', label: 'INICIO' },
  { href: '/cursos', label: 'CURSOS' },
  { href: '/perfil', label: 'PERFIL' },
  { href: '/certificados', label: 'CERTIFICADOS' },
]

const ink = '#4A4540'
const inkMuted = 'rgba(74, 69, 64, 0.45)'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: '180px',
        height: '100dvh',
        backgroundColor: '#F5F2EC',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #E0DDD6',
        zIndex: 40,
      }}
    >
      <div
        style={{
          padding: '20px 20px 16px',
          borderBottom: '1px solid #E0DDD6',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            color: ink,
            letterSpacing: '0.08em',
            lineHeight: 1,
          }}
        >
          CLIC
        </div>
        <div
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: '0.72rem',
            color: inkMuted,
            marginTop: '4px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          Precisar
        </div>
      </div>

      <nav
        style={{
          flex: 1,
          padding: '18px 0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {NAV.map(item => {
          const activo =
            pathname === item.href || pathname.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'block',
                padding: '10px 20px',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.82rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                color: activo ? ink : 'rgba(74, 69, 64, 0.42)',
                borderLeft: activo ? `3px solid ${ink}` : '3px solid transparent',
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div
        style={{
          padding: '18px 20px',
          borderTop: '1px solid #E0DDD6',
          fontFamily: 'var(--font-ui)',
          fontSize: '0.68rem',
          color: inkMuted,
          letterSpacing: '0.05em',
        }}
      >
        CC BY 4.0 · Precisar
      </div>
    </aside>
  )
}
