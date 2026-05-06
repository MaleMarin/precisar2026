import Link from 'next/link'
import { obtenerCursoPorId } from '@/lib/cursos'
import { COLORES_CURSO } from '@/lib/cursos/colores'

type Props = {
  params: Promise<{ courseId: string }>
}

export default async function CursoPage({ params }: Props) {
  const { courseId } = await params
  const curso = obtenerCursoPorId(courseId)
  const color = COLORES_CURSO[courseId] || '#1A1A1A'

  if (!curso || curso.pasos.length === 0) {
    return (
      <main
        style={{
          backgroundColor: '#1A1A1A',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            color: 'rgba(255,255,255,0.4)',
            fontFamily: 'var(--font-ui)',
            fontSize: '0.9rem',
          }}
        >
          Curso no encontrado.
        </p>
      </main>
    )
  }

  const objetivos = curso.señales.map(s => s.nombre)
  const primeraLeccionHref = `/curso/lecciones/${curso.pasos[0]!.slug}`

  const metaSidebar = [
    { label: 'DURACION', valor: curso.duracion },
    { label: 'PASOS', valor: `${curso.pasos.length} pasos` },
    { label: 'CERTIFICADO', valor: 'Si, al completar' },
  ]

  return (
    <main
      style={{
        backgroundColor: color,
        minHeight: '100vh',
        padding: '56px 64px 80px',
        maxWidth: '100%',
        overflowX: 'hidden',
        boxSizing: 'border-box' as const,
      }}
    >
      <nav
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '10px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '40px',
        }}
      >
        <Link
          href="/saberes/clic"
          style={{
            color: 'rgba(255,255,255,0.5)',
            textDecoration: 'none',
          }}
        >
          CLIC
        </Link>
        {' / '}
        CURSOS
      </nav>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 260px',
          gap: '48px',
          alignItems: 'start',
          width: '100%',
          maxWidth: '1100px',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 9vw, 7rem)',
              lineHeight: 0.92,
              letterSpacing: '0.02em',
              color: '#FFFFFF',
              margin: '0 0 28px 0',
              whiteSpace: 'pre-line',
            }}
          >
            {curso.titulo.toUpperCase()}
          </h1>

          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontStyle: 'italic',
              fontSize: '1.2rem',
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.65,
              maxWidth: '480px',
              margin: '0 0 48px 0',
            }}
          >
            {curso.subtitulo}
          </p>

          <div style={{ marginBottom: '48px' }}>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '14px',
              }}
            >
              DE QUÉ TRATA
            </div>
            <p
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.85)',
                lineHeight: 1.8,
                maxWidth: '520px',
                margin: 0,
              }}
            >
              {curso.descripcion}
            </p>
          </div>

          <div>
            <div
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.5)',
                marginBottom: '20px',
              }}
            >
              LO QUE VAS A LOGRAR
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              {objetivos.map((obj, i) => (
                <div
                  key={`${obj}-${i}`}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      color: 'rgba(255,255,255,0.4)',
                      flexShrink: 0,
                      lineHeight: 1,
                      marginTop: '2px',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: '0.95rem',
                      color: 'rgba(255,255,255,0.85)',
                      lineHeight: 1.65,
                    }}
                  >
                    {obj}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            paddingTop: '8px',
          }}
        >
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.2)',
              paddingTop: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
          >
            {metaSidebar.map(item => (
              <div key={item.label}>
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '10px',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: '4px',
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.9rem',
                    color: 'rgba(255,255,255,0.85)',
                  }}
                >
                  {item.valor}
                </div>
              </div>
            ))}
          </div>

          <Link
            href={primeraLeccionHref}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFFFFF',
              color: color,
              fontFamily: 'var(--font-display)',
              fontSize: '1.1rem',
              letterSpacing: '0.08em',
              padding: '16px 20px',
              textDecoration: 'none',
              textAlign: 'center' as const,
              transition: 'opacity 0.2s ease',
            }}
          >
            COMENZAR →
          </Link>

          <Link
            href="/saberes/clic"
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '10px',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.1em',
              textAlign: 'center' as const,
              textDecoration: 'none',
            }}
          >
            ← VOLVER A CURSOS
          </Link>
        </div>
      </div>
    </main>
  )
}
