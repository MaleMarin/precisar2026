"use client"
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type MouseEvent,
  type TouchEvent,
  type WheelEvent,
} from "react"
import styles from "./HubCylinder.module.css"

const N = 6

const CONTENT = [
  {
    kicker: "01 · Presentación",
    title: "Cultura digital\nque viaja",
    sub: "Portátil. Para cualquier espacio.",
    body: "Portátil y diseñada para cualquier espacio. Lleva la conversación directamente a donde están las personas.",
    groups: [
      {
        label: "Esta experiencia llega a",
        items: [
          "Plazas y espacios públicos — Al aire libre, para comunidades de todas las edades.",
          "Bibliotecas y salas culturales — Espacios de reflexión y aprendizaje colectivo.",
          "Establecimientos educacionales — Desde colegios hasta universidades.",
          "Municipios y gobiernos locales — Intervención territorial con impacto ciudadano directo.",
          "Auditorios y eventos corporativos — Para generar conversaciones necesarias.",
          "Eventos y festivales — Activación cultural en contextos de alta convocatoria.",
        ],
      },
    ],
    bg: "#DB5227", tc: "#F5F2EC",
  },
  {
    kicker: "02 · Contenido",
    title: "Lo que\nencontrarás",
    sub: "4 elementos que cautivarán.",
    body: "Combinación de elementos visuales, tecnológicos y prácticos que cautivarán a tus participantes desde el primer momento.",
    groups: [
      {
        label: "Elementos de cada muestra",
        items: [
          "01 · Carteles visualmente impactantes — Diseñados para provocar conversación y reflexión inmediata.",
          "02 · Animaciones de video — Dan pie a discusiones sobre privacidad y detección de noticias falsas.",
          "03 · Aplicaciones interactivas — Invitan a experimentar realidad aumentada e IA de primera mano.",
          "04 · Experiencias prácticas para el debate — Complemento perfecto antes de talleres y charlas.",
        ],
      },
    ],
    bg: "#023661", tc: "#F5F2EC",
  },
  {
    kicker: "03 · Formatos",
    title: "Modelos de\ninstalación",
    sub: "PIXEL · VECTOR · HOLO",
    body: "Tres paquetes modulares que se ajustan al espacio, la duración y el público de tu evento.",
    groups: [
      {
        label: "PIXEL — Formato básico",
        items: [
          "2 Carteles temáticos",
          "1 Pantalla de animación",
          "2 Experiencias interactivas",
          "Espacio: 8–12 m²  ·  Instalación: 45–60 min",
          "Duración: 1–3 días  ·  Audiencia: 50–100/día",
        ],
      },
      {
        label: "VECTOR — Formato estándar",
        items: [
          "3 Carteles temáticos",
          "3 Pantallas de animación",
          "3 Estaciones interactivas",
          "Espacio: 15–25 m²  ·  Instalación: 2–3 horas",
          "Duración: 3 días–2 semanas  ·  Audiencia: 100–300/día",
        ],
      },
      {
        label: "HOLO — Formato completo",
        items: [
          "6 Carteles visuales",
          "3 Animaciones de video",
          "4 Aplicaciones interactivas",
          "Zona central de reflexión",
          "Espacio: 30–50 m²  ·  Instalación: 4–6 horas",
          "Duración: 2 semanas–permanente  ·  Audiencia: 200–500/día",
        ],
      },
    ],
    bg: "#F5F2EC", tc: "#0A0C12",
  },
  {
    kicker: "04 · Implementación",
    title: "10 formas de\nimplementar",
    sub: "De activaciones a experiencias inmersivas.",
    body: "Desde activaciones previas hasta experiencias inmersivas y gamificación.",
    groups: [
      {
        label: "Posibilidades",
        items: [
          "01 · Activación previa al evento — Módulos en pasillos antes de actividades programadas.",
          "02 · Puntos de encuentro temáticos — Estaciones dedicadas a privacidad, IA, desinformación.",
          "03 · Rutas autoguiadas — Recorrido cronológico con soportes visuales y multimedia.",
          "04 · Elementos móviles — Tablets, kioscos portátiles o gafas de realidad aumentada.",
          "05 · Material descargable — Códigos QR con guías e infografías post-evento.",
          "06 · Salas de reflexión — Áreas cómodas con proyección de videos de discusión.",
          "07 · Interacción IA en vivo — Chatbots con análisis de perfiles de privacidad.",
          "08 · Experiencias inmersivas — Videoproyecciones 360° y entornos sonoros.",
          "09 · Gamificación — Desafíos con insignias digitales o reconocimientos físicos.",
          "10 · Integración con ponencias — Estaciones vinculadas a conferencias del evento.",
        ],
      },
    ],
    bg: "#DB5227", tc: "#F5F2EC",
  },
  {
    kicker: "05 · Personalización",
    title: "Ediciones\ntemáticas",
    sub: "Desinformación · IA · Comunitaria",
    body: "Cada muestra se adapta a un tema específico o se personaliza para tu comunidad.",
    groups: [
      {
        label: "Opciones disponibles",
        items: [
          "Ediciones temáticas — IA, desinformación, privacidad con tecnologías especializadas.",
          "Edición comunitaria — Dinámicas de participación local y foros vecinales.",
          "Componentes a la carta — Pósters, mini-experimentos, kits de cultura digital.",
        ],
      },
      {
        label: "Ediciones disponibles",
        items: [
          "Edición Desinformación — Ver especificaciones completas →",
          "Edición IA y Algoritmos — Ver especificaciones completas →",
        ],
      },
    ],
    bg: "#023661", tc: "#F5F2EC",
  },
  {
    kicker: "06 · Contacto",
    title: "Lleva el Hub\na tu espacio",
    sub: "Diseñamos a medida.",
    body: "Cuéntanos tu espacio, público y duración. Diseñamos una propuesta a medida para tu evento o municipio.",
    groups: [
      {
        label: "El proceso",
        items: [
          "01 · Cuéntanos tu espacio, público y duración imaginados.",
          "02 · Diseñamos la propuesta a medida de tu comunidad.",
          "03 · Co-creamos juntos el montaje, contenidos y cronograma.",
        ],
      },
      {
        label: "Cómo lo desarrollamos",
        items: [
          "Colaboración con expertos — Profesionales en diversos campos aseguran contenido preciso.",
          "Investigación en campo — Directamente con la audiencia para entender desafíos reales.",
        ],
      },
    ],
    bg: "#F5F2EC", tc: "#0A0C12",
  },
]

export default function HubCylinder() {
  const [current, setCurrent] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [expandedIdx, setExpandedIdx] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [isReady, setIsReady] = useState(false)

  const isExpandedRef = useRef(isExpanded)
  isExpandedRef.current = isExpanded

  const isDrag = useRef(false)
  const pointerLastX = useRef(0)
  const rotRef = useRef(0)
  const animRef = useRef<number | undefined>(undefined)
  const targetRot = useRef(0)
  const velYRef = useRef(0)
  const lastDeltaRef = useRef(0)
  const snapTimerRef = useRef<number | null>(null)

  const R = 480
  const stepDeg = 360 / N

  const goTo = useCallback((i: number) => {
    if (snapTimerRef.current !== null) {
      window.clearTimeout(snapTimerRef.current)
      snapTimerRef.current = null
    }
    velYRef.current = 0
    const idx = ((i % N) + N) % N
    targetRot.current = -(idx / N) * 360
    setCurrent(idx)
  }, [])

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    const t = window.setTimeout(() => setIsReady(true), 1200)
    return () => window.clearTimeout(t)
  }, [])

  // Animación suave (lerp bajo hasta isReady, luego más ágil) + inercia post-drag
  useEffect(() => {
    const animate = () => {
      const lerp = isReady ? 0.025 : 0.01
      if (
        !isDrag.current &&
        !isExpandedRef.current &&
        Math.abs(velYRef.current) > 1e-4
      ) {
        targetRot.current += velYRef.current
        velYRef.current *= 0.88
      }
      rotRef.current += (targetRot.current - rotRef.current) * lerp
      setRotation(rotRef.current)
      animRef.current = requestAnimationFrame(animate)
    }
    animRef.current = requestAnimationFrame(animate)
    return () => {
      if (animRef.current !== undefined) cancelAnimationFrame(animRef.current)
    }
  }, [isReady])

  const snapCarouselToNearest = useCallback(() => {
    const k = Math.round(-targetRot.current / stepDeg)
    const idx = ((k % N) + N) % N
    targetRot.current = -(idx / N) * 360
    setCurrent(idx)
  }, [stepDeg])

  // Eventos drag
  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      if (!isDrag.current || isExpanded) return
      const cx = e.clientX
      const delta = cx - pointerLastX.current
      pointerLastX.current = cx
      lastDeltaRef.current = delta
      targetRot.current += delta * 0.04
      velYRef.current = delta * 0.04
    }
    const onMoveT = (e: globalThis.TouchEvent) => {
      if (!isDrag.current || isExpanded) return
      const cx = e.touches[0].clientX
      const delta = cx - pointerLastX.current
      pointerLastX.current = cx
      lastDeltaRef.current = delta
      targetRot.current += delta * 0.04
      velYRef.current = delta * 0.04
    }
    const onUp = () => {
      if (!isDrag.current || isExpanded) return
      isDrag.current = false
      velYRef.current = lastDeltaRef.current * 0.04
      if (snapTimerRef.current !== null) {
        window.clearTimeout(snapTimerRef.current)
      }
      snapTimerRef.current = window.setTimeout(() => {
        snapCarouselToNearest()
        velYRef.current = 0
        snapTimerRef.current = null
      }, 900)
    }
    window.addEventListener("mousemove", onMove)
    window.addEventListener("touchmove", onMoveT, { passive: true })
    window.addEventListener("mouseup", onUp)
    window.addEventListener("touchend", onUp)
    return () => {
      if (snapTimerRef.current !== null) {
        window.clearTimeout(snapTimerRef.current)
        snapTimerRef.current = null
      }
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("touchmove", onMoveT)
      window.removeEventListener("mouseup", onUp)
      window.removeEventListener("touchend", onUp)
    }
  }, [isExpanded, snapCarouselToNearest])

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (isExpanded) return
    if (snapTimerRef.current !== null) {
      window.clearTimeout(snapTimerRef.current)
      snapTimerRef.current = null
    }
    velYRef.current = 0
    isDrag.current = true
    pointerLastX.current = e.clientX
  }

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (isExpanded) return
    if (snapTimerRef.current !== null) {
      window.clearTimeout(snapTimerRef.current)
      snapTimerRef.current = null
    }
    velYRef.current = 0
    isDrag.current = true
    pointerLastX.current = e.touches[0].clientX
  }

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (isExpanded) return
    e.preventDefault()
    if (e.deltaY > 0) next()
    else prev()
  }

  const openExpand = (idx: number) => {
    if (snapTimerRef.current !== null) {
      window.clearTimeout(snapTimerRef.current)
      snapTimerRef.current = null
    }
    velYRef.current = 0
    setExpandedIdx(idx)
    setIsExpanded(true)
  }

  const closeExpand = () => {
    setIsExpanded(false)
  }

  const exp = CONTENT[expandedIdx]
  const isLight = exp.tc === "#F5F2EC"

  return (
    <div
      className={styles.wrap}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onWheel={handleWheel}
    >
      {/* Manchas de fondo */}
      <div className={styles.blobOrange} aria-hidden />
      <div className={styles.blobBlue} aria-hidden />

      {/* Escena CSS 3D */}
      <div className={styles.scene}>
        <div
          className={styles.carousel}
          style={{ transform: `rotateY(${rotation}deg)` }}
        >
          {CONTENT.map((s, i) => {
            const angle = (i / N) * 360
            const isDark = s.tc === "#0A0C12"
            return (
              <div
                key={i}
                className={styles.card}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${R}px)`,
                  background: s.bg,
                  border: isDark
                    ? "1px solid rgba(10,12,18,0.1)"
                    : "1px solid rgba(245,242,236,0.15)",
                  boxShadow: isDark
                    ? "0 8px 40px rgba(0,0,0,0.12)"
                    : "0 8px 40px rgba(0,0,0,0.4)",
                }}
                onClick={() => openExpand(i)}
              >
                <span
                  className={styles.cardNum}
                  style={{ color: s.tc }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={styles.cardTitle}
                  style={{ color: s.tc }}
                >
                  {s.title.split("\n").map((l, j) => (
                    <span key={j}>
                      {l}
                      {j < s.title.split("\n").length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p
                  className={styles.cardSub}
                  style={{ color: s.tc }}
                >
                  {s.sub}
                </p>
                <p
                  className={styles.cardHint}
                  style={{ color: s.tc }}
                >
                  click para leer →
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Kicker activo */}
      <p className={styles.kickerTop}>
        {CONTENT[current].kicker}
      </p>

      {/* Flechas */}
      <button
        type="button"
        className={styles.arrowLeft}
        onClick={prev}
        aria-label="Sección anterior"
      >
        ←
      </button>
      <button
        type="button"
        className={styles.arrowRight}
        onClick={next}
        aria-label="Sección siguiente"
      >
        →
      </button>

      {/* Dots */}
      <nav className={styles.dots} aria-label="Secciones">
        {CONTENT.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={
              i === current ? styles.dotActive : styles.dot
            }
            aria-label={`Sección ${i + 1}`}
          />
        ))}
      </nav>

      {/* Panel expandido */}
      <div
        className={`${styles.expand} ${
          isExpanded ? styles.expandOpen : styles.expandClosed
        }`}
        style={{ background: exp.bg }}
      >
        <div className={styles.expandInner}>
          {/* Header del panel */}
          <div className={styles.expandHeader}>
            <button
              type="button"
              onClick={closeExpand}
              className={styles.closeBtn}
              style={{
                color: isLight
                  ? "rgba(245,242,236,0.6)"
                  : "rgba(10,12,18,0.5)",
                borderColor: isLight
                  ? "rgba(245,242,236,0.25)"
                  : "rgba(10,12,18,0.2)",
              }}
            >
              ✕ volver a la esfera
            </button>
            <p
              className={styles.expandCounter}
              style={{
                color: isLight
                  ? "rgba(245,242,236,0.3)"
                  : "rgba(10,12,18,0.3)",
              }}
            >
              {String(expandedIdx + 1).padStart(2, "0")} / {N}
            </p>
          </div>

          {/* Contenido */}
          <p
            className={styles.expandKicker}
            style={{
              color: isLight ? "#F5F2EC" : "#DB5227",
            }}
          >
            {exp.kicker}
          </p>
          <h2
            className={styles.expandTitle}
            style={{ color: exp.tc }}
          >
            {exp.title.split("\n").map((l, i) => (
              <span key={i}>
                {l}
                {i < exp.title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p
            className={styles.expandBody}
            style={{
              color: isLight ? "#F5F2EC" : "#0A0C12",
            }}
          >
            {exp.body}
          </p>

          {/* Grupos de items */}
          {exp.groups.map((group, gi) => (
            <div key={gi}>
              <p
                className={styles.groupLabel}
                style={{
                  color: isLight ? "#F5F2EC" : "#DB5227",
                  borderTopColor: isLight
                    ? "rgba(245,242,236,0.1)"
                    : "rgba(10,12,18,0.1)",
                }}
              >
                {group.label}
              </p>
              <ul className={styles.groupList}>
                {group.items.map((item, ii) => (
                  <li
                    key={ii}
                    className={styles.groupItem}
                    style={{
                      color: isLight ? "#F5F2EC" : "#0A0C12",
                      borderBottomColor: isLight
                        ? "rgba(245,242,236,0.1)"
                        : "rgba(10,12,18,0.1)",
                    }}
                  >
                    <span
                      className={styles.groupDot}
                      style={{
                        background: isLight
                          ? "#F5F2EC"
                          : "#DB5227",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Navegación entre secciones */}
          <div className={styles.expandNav}>
            {expandedIdx > 0 ? (
              <button
                type="button"
                className={styles.expandNavBtn}
                style={{
                  color: isLight
                    ? "rgba(245,242,236,0.6)"
                    : "rgba(10,12,18,0.5)",
                  borderColor: isLight
                    ? "rgba(245,242,236,0.2)"
                    : "rgba(10,12,18,0.15)",
                }}
                onClick={() => {
                  setExpandedIdx(expandedIdx - 1)
                  document
                    .querySelector(`.${styles.expand}`)
                    ?.scrollTo(0, 0)
                }}
              >
                ← {CONTENT[expandedIdx - 1].kicker}
              </button>
            ) : (
              <div />
            )}
            {expandedIdx < N - 1 ? (
              <button
                type="button"
                className={styles.expandNavBtnPrimary}
                onClick={() => {
                  setExpandedIdx(expandedIdx + 1)
                  document
                    .querySelector(`.${styles.expand}`)
                    ?.scrollTo(0, 0)
                }}
              >
                {`Siguiente → ${CONTENT[expandedIdx + 1].kicker}`}
              </button>
            ) : (
              <button
                type="button"
                className={styles.expandNavBtnPrimary}
                onClick={closeExpand}
              >
                Volver a la esfera →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
