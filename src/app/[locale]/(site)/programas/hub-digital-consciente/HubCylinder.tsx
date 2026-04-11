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
import "@/app/globals-hub-print.css"
import styles from "./HubCylinder.module.css"
import { HubDownloadButton } from "./HubDownloadButton"

const N = 6

const CONTENT = [
  {
    kicker: "01 · Introducción",
    title: "Cultura digital\nque viaja",
    sub: "Portátil. Para cualquier espacio.",
    body: "En el Hub Digital Consciente nos sumergimos en la cultura digital a través de muestras interactivas y temáticas. Cada una es portátil y está diseñada para explorar cómo los medios y la tecnología influyen en nuestra sociedad, llevando el conocimiento directamente a eventos, municipios, espacios públicos y más.",
    groups: [
      {
        label: "¿Adónde y para quién?",
        items: [
          "Plazas, bibliotecas, salas culturales, establecimientos educacionales, auditorios y eventos corporativos.",
          "Pensada para un público amplio de cualquier edad y nivel educacional.",
          "Cada visitante obtiene perspectivas críticas sobre la cultura digital y herramientas prácticas.",
        ],
      },
      {
        label: "Nuestro enfoque",
        items: [
          "No solo presentamos temas: también abrimos un espacio para el diálogo y la acción.",
          "Traducimos conceptos complejos —desinformación, IA, privacidad— en experiencias sensoriales accesibles.",
          "Impulsamos conversaciones significativas sobre el uso responsable de la tecnología.",
        ],
      },
    ],
    bg: "#DB5227", tc: "#F5F2EC",
  },
  {
    kicker: "02 · Contenido",
    title: "Lo que\nencontrarás",
    sub: "4 elementos que cautivarán.",
    body: "Ofrecemos una combinación de elementos visuales y prácticos que cautivarán a tus participantes desde el primer momento.",
    groups: [
      {
        label: "Elementos de cada muestra",
        items: [
          "Carteles visualmente impactantes — Diseñados para provocar conversación y reflexión inmediata sobre temas cruciales de la tecnología contemporánea. Cada póster actúa como un 'abre ojos' que presenta información de forma clara y estética.",
          "Aplicaciones interactivas — Invitan a experimentar de primera mano tecnologías de punta como realidad aumentada e IA para crear experiencias memorables que conectan con el público de manera lúdica.",
          "Animaciones de video — Dan pie a discusiones profundas sobre privacidad y detección de noticias falsas. Exploran dilemas éticos del mundo digital mediante historias visuales.",
          "Experiencias prácticas — Estimulan debates significativos entre participantes. Complemento perfecto antes de talleres, charlas o seminarios sobre cultura digital.",
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
        label: "PIXEL — Formato básico para espacios reducidos",
        items: [
          "2 Carteles Temáticos — Conceptos esenciales de la edición elegida. Diseño compacto que introduce los temas principales de forma visual e impactante.",
          "1 Pantalla de Animación — Monitor que reproduce contenido audiovisual básico con narrativas introductorias y datos clave.",
          "2 Experiencias Interactivas — Aplicaciones simples en tablets que permiten exploración básica de conceptos a través de simulaciones sencillas.",
          "Espacio requerido: 8–12 m²",
          "Tiempo de instalación: 45–60 minutos",
          "Duración recomendada: 1–3 días",
          "Audiencia: 50–100 personas por día",
        ],
      },
      {
        label: "VECTOR — Formato estándar para eventos medianos",
        items: [
          "3 Carteles Temáticos — Representan bloques clave como algoritmos, desinformación, bots y manipulación informativa.",
          "3 Pantallas de Animación — Monitores horizontales que proyectan visualizaciones dinámicas, simulaciones o contenidos de contexto.",
          "3 Estaciones Interactivas — Paneles digitales verticales con pantallas táctiles para aplicaciones, juegos y módulos de verificación.",
          "Experiencias Prácticas para Debate (opcional según objetivo del evento).",
          "Espacio requerido: 15–25 m²",
          "Tiempo de instalación: 2–3 horas",
          "Duración recomendada: 3 días – 2 semanas",
          "Audiencia: 100–300 personas por día",
        ],
      },
      {
        label: "HOLO — Formato completo para instalaciones duraderas",
        items: [
          "6 Carteles Visuales — Tres paneles frontales y cuatro laterales que estructuran el espacio y capturan la atención.",
          "3 Animaciones de Video — Pantallas con datos, narrativas, visualizaciones y simulaciones interactivas.",
          "4 Aplicaciones Interactivas — Estaciones digitales diseñadas en coordinación con el cliente según objetivos del evento.",
          "Consultas o encuestas adaptadas al interés del público o del cliente.",
          "Zona Central — Área con mobiliario cómodo para la reflexión, el debate, el descanso o actividades guiadas.",
          "Espacio requerido: 30–50 m²",
          "Tiempo de instalación: 4–6 horas",
          "Duración recomendada: 2 semanas – permanente",
          "Audiencia: 200–500 personas por día",
        ],
      },
    ],
    bg: "#F5F2EC", tc: "#0A0C12",
  },
  {
    kicker: "04 · Implementación",
    title: "10 formas de\nimplementar",
    sub: "De activaciones a experiencias inmersivas.",
    body: "Pueden integrarse de múltiples formas en el espacio y el tiempo de tu evento, sin limitarse a un tipo de público específico.",
    groups: [
      {
        label: "Posibilidades de implementación",
        items: [
          "01 · Activación previa al evento — Despliega módulos interactivos en pasillos o vestíbulos para que la audiencia descubra conceptos clave antes de cualquier actividad programada.",
          "02 · Puntos de encuentro temáticos — Crea estaciones dedicadas a la privacidad, la IA, la desinformación o la ética digital, permitiendo que los visitantes transiten libremente entre ellas.",
          "03 · Rutas autoguiadas — Diseña un recorrido cronológico o lógico que guíe a las personas por distintos retos y experiencias, cada uno acompañado de soportes visuales y multimedia.",
          "04 · Elementos móviles — Utiliza tablets, kioscos portátiles o gafas de realidad aumentada para llevar la instalación a espacios reducidos o itinerantes dentro del mismo recinto.",
          "05 · Material descargable — Ofrece a los visitantes códigos QR que enlacen a guías, infografías y recursos digitales para profundizar después del evento.",
          "06 · Salas de reflexión — Habilita áreas con mobiliario cómodo donde se proyecten cortos vídeos de discusión o paneles de expertos, invitando al diálogo espontáneo.",
          "07 · Interacción IA en vivo — Incluye chatbots o asistentes virtuales que respondan preguntas, generen análisis de perfiles de privacidad y ofrezcan recomendaciones personalizadas.",
          "08 · Experiencias inmersivas — Incorpora videoproyecciones 360°, realidad virtual y entornos sonoros para sumergir al visitante en escenarios que ilustran riesgos y oportunidades tecnológicas.",
          "09 · Gamificación — Implementa desafíos y juegos basados en preguntas sobre los temas decididos, recompensando la participación con insignias digitales o reconocimientos físicos.",
          "10 · Integración con ponencias — Combina las estaciones interactivas con conferencias, de modo que cada ponente pueda referirse a los módulos específicos para ejemplificar sus argumentos.",
        ],
      },
    ],
    bg: "#DB5227", tc: "#F5F2EC",
  },
  {
    kicker: "05 · Personalización",
    title: "Ediciones\ntemáticas",
    sub: "Desinformación · IA · Comunitaria",
    body: "Hub Digital Consciente ofrece tres paquetes modulares —Pixel, Vector, Holo— que se ajustan al espacio, la duración y el público del evento.",
    groups: [
      {
        label: "Ediciones temáticas",
        items: [
          "Profundiza en áreas específicas (IA, desinformación, privacidad digital, etc.) incorporando contenidos y tecnologías especializadas, como estaciones de realidad virtual o simulaciones avanzadas.",
        ],
      },
      {
        label: "Edición comunitaria",
        items: [
          "Adapta la realidad de tu comuna o grupo objetivo, integrando dinámicas de participación local y fórums de debate que empoderan a vecinos de todas las edades.",
        ],
      },
      {
        label: "Componentes a la carta",
        items: [
          "Elige piezas sueltas, pósters, mini-experimentos interactivos, kits de cultura digital, para complementar la exposición según las necesidades.",
        ],
      },
      {
        label: "Ediciones disponibles",
        items: [
          "01 · Edición Desinformación — Ver especificaciones completas →",
          "02 · Edición IA y Algoritmos — Ver especificaciones completas →",
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
        label: "Cómo desarrollamos cada muestra",
        items: [
          "Colaboración con Expertos — Nos asociamos con profesionales en diversos campos para asegurar que el contenido sea preciso y relevante.",
          "Investigación en Campo — Realizamos investigaciones directas con la audiencia para entender los desafíos reales y las perspectivas de cada muestra.",
        ],
      },
      {
        label: "El proceso",
        items: [
          "01 · Cuéntanos tu espacio, público y duración imaginados para la muestra.",
          "02 · Diseñamos la propuesta a medida de tu comunidad y objetivos.",
          "03 · Co-creamos juntos el montaje, contenidos y cronograma.",
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
      style={{
        height: isExpanded ? "auto" : "100vh",
        overflow: isExpanded ? "visible" : "hidden",
        cursor: isExpanded ? "default" : undefined,
      }}
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

      <div className={styles.topLabel}>
        <p className={styles.topTitle}>El Hub en 360°</p>
        <p className={styles.topHint}>arrastra para girar</p>
      </div>

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
        id="hub-expand-panel"
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
              ← volver al Hub en 360°
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
                  color: isLight
                    ? "rgba(245,242,236,0.7)"
                    : "#DB5227",
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
                      color: isLight ? "#F5F2EC" : "rgba(10,12,18,0.68)",
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

          {expandedIdx === 5 && <HubDownloadButton />}

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
                ← volver al Hub en 360°
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="hub-print-content" aria-hidden>
        <div className="hub-print-header">
          <img
            src="/precisar-footer-wordmark.png"
            alt="Precisar"
            style={{ height: 32 }}
          />
          <div style={{ textAlign: "right" }}>
            <p>precisar.net</p>
            <p>@precisar_ · @_precisar</p>
          </div>
        </div>

        <h1>Hub Digital Consciente</h1>
        <p>Programa 02 · Precisar</p>

        {CONTENT.map((section, i) => (
          <div key={i} className={i > 0 ? "hub-print-section" : undefined}>
            <h2>{section.kicker}</h2>
            <h1>{section.title.replace(/\n/g, " ")}</h1>
            <p>{section.body}</p>
            {section.groups.map((group, gi) => (
              <div key={gi}>
                <h2>{group.label}</h2>
                <ul>
                  {group.items.map((item, ii) => (
                    <li key={ii}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        <div className="hub-print-section">
          <h2>Contacto y redes</h2>
          <p>Web: precisar.net</p>
          <p>X / Twitter: x.com/precisar_</p>
          <p>Instagram: instagram.com/_precisar</p>
          <p>Facebook: facebook.com/precisar</p>
          <p>YouTube: youtube.com/channel/UCQKEOqwm3pxIeO6E1Hsokhw</p>
          <p>
            © {new Date().getFullYear()} Precisar. Hecho con criterio en Chile y México.
          </p>
          <p>Contenidos bajo licencia Creative Commons CC BY 4.0</p>
        </div>
      </div>
    </div>
  )
}
