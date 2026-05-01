'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { COLORES_CURSO } from '@/lib/cursos/colores'

const CURSOS_DATA: Record<
  string,
  {
    titulo: string
    subtitulo: string
    descripcion: string
    duracion: string
    pasos: number
    objetivos: string[]
    caso: string
    nivel: string
  }
> = {
  'antes-de-compartir': {
    titulo: 'Antes de Compartir',
    subtitulo: 'Lo que pasa entre que ves algo y lo reenvías.',
    descripcion:
      'Un recorrido práctico de 90 minutos. Trabajas un solo caso real desde el principio hasta el final: ves una publicación ambigua, identificas qué te hizo reaccionar, aprendes a observar señales, aplicas el Kit de Pausa y tomas una decisión fundamentada.',
    duracion: '90 minutos',
    pasos: 8,
    nivel: 'Basico - sin conocimientos previos',
    caso: 'Una publicacion viral sobre el amerizaje de Artemis II que dice que "algo no cuadra".',
    objetivos: [
      'Reconocer qué emoción te activa antes de reaccionar',
      'Identificar señales que fabrican urgencia y pánico',
      'Aplicar el Kit de Pausa antes de compartir',
      'Tomar una decisión fundamentada con evidencia disponible',
    ],
  },
  'quien-hablo': {
    titulo: 'Quien hablo?',
    subtitulo: 'Lo que pasa cuando la IA suena como alguien que conoces.',
    descripcion:
      'Te llega un audio de WhatsApp con la voz de tu mama pidiendo dinero urgente. Como sabes si es ella? Este modulo explica como funciona la IA que clona voces y que hacer antes de actuar.',
    duracion: '90 minutos',
    pasos: 8,
    nivel: 'Basico - sin conocimientos previos',
    caso: 'Audio de WhatsApp que suena exactamente como un familiar - pidiendo dinero con urgencia.',
    objetivos: [
      'Entender como la IA puede clonar una voz humana',
      'Reconocer senales auditivas de voz sintetica',
      'Aplicar el Kit de Verificacion antes de actuar',
      'Saber que hacer si recibes un audio sospechoso',
    ],
  },
  'el-que-mas-grita': {
    titulo: 'El que mas grita',
    subtitulo: 'Como los algoritmos deciden lo que ves - y que puedes hacer.',
    descripcion:
      'Dos vecinas del mismo barrio buscan lo mismo en sus telefonos y ven resultados completamente distintos. Este modulo explica por que - y que puedes hacer al respecto.',
    duracion: '90 minutos',
    pasos: 8,
    nivel: 'Basico - sin conocimientos previos',
    caso: 'Elena y Rosa, mismo barrio, mismo telefono, resultados completamente distintos.',
    objetivos: [
      'Entender como funciona un algoritmo de recomendacion',
      'Distinguir burbuja de filtro de camara de eco',
      'Reconocer cuando el contenido busca indignacion',
      'Aplicar 3 acciones concretas para diversificar lo que ves',
    ],
  },
  'salud-sin-panico': {
    titulo: 'Salud sin panico',
    subtitulo: 'Como evaluar informacion de salud antes de creer o compartir.',
    descripcion:
      'Un audio de WhatsApp dice que el limon con bicarbonato cura la infeccion de orina. Tu abuela ya lo esta tomando. Que haces?',
    duracion: '90 minutos',
    pasos: 8,
    nivel: 'Basico - sin conocimientos previos',
    caso: 'Audio familiar: limon con bicarbonato como cura para infeccion urinaria.',
    objetivos: [
      'Distinguir informacion de salud verificable de remedio sin evidencia',
      'Identificar senales de desinformacion medica en WhatsApp',
      'Aplicar el Kit de Verificacion de Salud',
      'Tener conversaciones empaticas sobre remedios sin evidencia',
    ],
  },
  'grupo-de-profes': {
    titulo: 'Lo que llega al grupo de profes',
    subtitulo: 'Desinformacion en el aula - como responder sin perder el criterio.',
    descripcion:
      'Un estudiante llega al aula diciendo que ChatGPT le dijo que el Holocausto fue exagerado. El resto de la clase ya esta buscando en sus celulares.',
    duracion: '90 minutos',
    pasos: 8,
    nivel: 'Intermedio - para docentes',
    caso: 'Estudiante con ChatGPT en el aula - desinformacion historica en tiempo real.',
    objetivos: [
      'Responder a desinformacion en el aula sin atacar al estudiante',
      'Disenar actividades que construyan criterio',
      'Hablar de IA con estudiantes de forma honesta',
      'Gestionar el grupo cuando aparece contenido sensible',
    ],
  },
  'mis-datos-mi-decision': {
    titulo: 'Mis datos, mi decision',
    subtitulo: 'Lo que saben de ti las aplicaciones que usas - y que puedes controlar.',
    descripcion:
      'Estabas hablando en voz alta sobre comprar una caminadora. No buscaste nada. A los 10 minutos aparece un anuncio de caminadoras en Instagram.',
    duracion: '90 minutos',
    pasos: 8,
    nivel: 'Basico - sin conocimientos previos',
    caso: 'Anuncio que aparece justo despues de una conversacion en voz alta.',
    objetivos: [
      'Entender que datos recopilan las aplicaciones que usas',
      'Distinguir lo que las apps hacen vs lo que parecen hacer',
      'Aplicar configuraciones de privacidad basicas',
      'Conocer tus derechos digitales en Chile y Mexico',
    ],
  },
  'clima-sin-catastrofe': {
    titulo: 'Clima sin catastrofe',
    subtitulo: 'Como evaluar informacion climatica sin negacionismo ni alarmismo.',
    descripcion:
      'Una nota viral dice que el volcan Villarrica emitio mas CO2 en una erupcion que todos los autos del mundo en 100 anos. Es verdad?',
    duracion: '90 minutos',
    pasos: 8,
    nivel: 'Basico - sin conocimientos previos',
    caso: 'Nota viral sobre volcan y emisiones de CO2 - dato real, contexto falso.',
    objetivos: [
      'Distinguir negacionismo climatico de escepticismo legitimo',
      'Identificar las 5 tecnicas del negacionismo climatico',
      'Evaluar una afirmacion climatica con fuentes verificables',
      'Comunicar datos de clima sin alarmismo ni minimizacion',
    ],
  },
  'cuentame-sin-asustarme': {
    titulo: 'Cuentame sin asustarme',
    subtitulo: 'Como hablar de tecnologia con personas mayores - sin condescendencia ni panico.',
    descripcion:
      'Tu mama de 72 anos te llama asustada: una cadena dice que el gobierno va a cerrar las cuentas bancarias antes del viernes. Ya es miercoles.',
    duracion: '90 minutos',
    pasos: 8,
    nivel: 'Basico - sin conocimientos previos',
    caso: 'Mama asustada por cadena sobre cuentas bancarias del gobierno.',
    objetivos: [
      'Distinguir miedo legitimo de barrera que se puede trabajar',
      'Comunicar sobre tecnologia sin condescendencia',
      'Ensenar verificacion basica sin generar ansiedad',
      'Identificar estafas que afectan mas a personas mayores en LATAM',
    ],
  },
}

export default function CursoPage() {
  const params = useParams()
  const courseId = params.courseId as string
  const curso = CURSOS_DATA[courseId]
  const color = COLORES_CURSO[courseId] || '#1A1A1A'

  if (!curso) {
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
          href="/inicio"
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
              {curso.objetivos.map((obj, i) => (
                <div
                  key={i}
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
            {[
              { label: 'DURACION', valor: curso.duracion },
              { label: 'PASOS', valor: `${curso.pasos} pasos` },
              { label: 'NIVEL', valor: curso.nivel },
              { label: 'CERTIFICADO', valor: 'Si, al completar' },
            ].map(item => (
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
            href={`/curso/lecciones/les-${courseId}-bienvenida`}
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
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.opacity = '0.9'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.opacity = '1'
            }}
          >
            COMENZAR →
          </Link>

          <Link
            href="/inicio"
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
