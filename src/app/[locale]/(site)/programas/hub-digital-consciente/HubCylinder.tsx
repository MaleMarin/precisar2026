"use client";

import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type MouseEvent,
  type TouchEvent,
  type WheelEvent,
} from "react";
import dynamic from "next/dynamic";
import { Canvas } from "@react-three/fiber";
import styles from "./HubCylinder.module.css";

const HubCylinderScene = dynamic(() => import("./HubCylinderScene"), { ssr: false });

const N = 6;

const CONTENT = [
  {
    kicker: "01 · Presentación",
    title: "Cultura digital\nque viaja",
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
    bg: "#DB5227",
    light: true,
  },
  {
    kicker: "02 · Contenido",
    title: "Lo que\nencontrarás",
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
    bg: "#023661",
    light: true,
  },
  {
    kicker: "03 · Formatos",
    title: "Modelos de\ninstalación",
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
    bg: "#F5F2EC",
    light: false,
  },
  {
    kicker: "04 · Implementación",
    title: "10 formas de\nimplementar",
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
    bg: "#DB5227",
    light: true,
  },
  {
    kicker: "05 · Personalización",
    title: "Ediciones\ntemáticas",
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
    bg: "#023661",
    light: true,
  },
  {
    kicker: "06 · Contacto",
    title: "Lleva el Hub\na tu espacio",
    body: "Cuéntanos tu espacio, público y duración. Diseñamos una propuesta a medida para tu evento o municipio.",
    groups: [
      {
        label: "Cómo lo desarrollamos",
        items: [
          "Colaboración con expertos — Profesionales en diversos campos aseguran contenido preciso.",
          "Investigación en campo — Directamente con la audiencia para entender desafíos reales.",
        ],
      },
      {
        label: "El proceso",
        items: [
          "01 · Cuéntanos tu espacio, público y duración imaginados.",
          "02 · Diseñamos la propuesta a medida de tu comunidad.",
          "03 · Co-creamos juntos el montaje, contenidos y cronograma.",
        ],
      },
    ],
    bg: "#F5F2EC",
    light: false,
  },
] as const;

export default function HubCylinder() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState(0);
  const [blobDir, setBlobDir] = useState<"left" | "right" | "none">("right");

  const posYRef = useRef(0);
  const velYRef = useRef(0);
  const targetRotYRef = useRef(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const dragVelX = useRef(0);
  const clickStartX = useRef(0);
  const clickStartY = useRef(0);
  const blobTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showBlob = useCallback((dir: "left" | "right" | "none") => {
    setBlobDir(dir);
    if (blobTimerRef.current !== null) {
      clearTimeout(blobTimerRef.current);
      blobTimerRef.current = null;
    }
    if (dir !== "none") {
      blobTimerRef.current = setTimeout(() => setBlobDir("none"), 2500);
    }
  }, []);

  const goTo = useCallback(
    (i: number) => {
      const snap = (i / N) * Math.PI * 2;
      const diff = snap - posYRef.current;
      const normalized = ((diff + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      velYRef.current = normalized * 0.12;
      setActiveIdx(i);
      showBlob(normalized > 0 ? "right" : "left");
    },
    [showBlob],
  );

  const openExpand = useCallback(
    (idx: number) => {
      setExpandedIdx(idx);
      setIsExpanded(true);
      showBlob("none");
    },
    [showBlob],
  );

  const closeExpand = useCallback(() => {
    setIsExpanded(false);
    setTimeout(() => showBlob("right"), 400);
  }, [showBlob]);

  useEffect(() => {
    let rafId = 0;
    const loop = () => {
      if (!isDragging.current) {
        velYRef.current *= 0.95;
        posYRef.current += velYRef.current;
      }
      targetRotYRef.current = posYRef.current;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      if (!isDragging.current || isExpanded) return;
      const dx = e.clientX - lastX.current;
      dragVelX.current = dx;
      posYRef.current += dx * 0.005;
      lastX.current = e.clientX;
      if (Math.abs(dx) > 3) showBlob(dx > 0 ? "left" : "right");
    };
    const onMoveT = (e: globalThis.TouchEvent) => {
      if (!isDragging.current || isExpanded) return;
      const dx = e.touches[0].clientX - lastX.current;
      dragVelX.current = dx;
      posYRef.current += dx * 0.006;
      lastX.current = e.touches[0].clientX;
      if (Math.abs(dx) > 3) showBlob(dx > 0 ? "left" : "right");
    };
    const onUp = (e: globalThis.MouseEvent) => {
      if (!isDragging.current || isExpanded) return;
      isDragging.current = false;
      velYRef.current = dragVelX.current * 0.005;
      const moved = Math.abs(e.clientX - clickStartX.current) + Math.abs(e.clientY - clickStartY.current);
      if (moved < 8) {
        const nearest = Math.round((posYRef.current / (Math.PI * 2)) * N);
        openExpand(((nearest % N) + N) % N);
      } else {
        setTimeout(() => {
          const nearest = Math.round((posYRef.current / (Math.PI * 2)) * N);
          goTo(((nearest % N) + N) % N);
        }, 600);
      }
    };
    const onUpT = (e: globalThis.TouchEvent) => {
      if (!isDragging.current || isExpanded) return;
      isDragging.current = false;
      velYRef.current = dragVelX.current * 0.005;
      const moved = Math.abs(e.changedTouches[0].clientX - clickStartX.current);
      if (moved < 10) {
        const nearest = Math.round((posYRef.current / (Math.PI * 2)) * N);
        openExpand(((nearest % N) + N) % N);
      } else {
        setTimeout(() => {
          const nearest = Math.round((posYRef.current / (Math.PI * 2)) * N);
          goTo(((nearest % N) + N) % N);
        }, 600);
      }
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMoveT, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUpT);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMoveT);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUpT);
    };
  }, [isExpanded, goTo, openExpand, showBlob]);

  useEffect(() => {
    const t = setTimeout(() => showBlob("right"), 800);
    return () => clearTimeout(t);
  }, [showBlob]);

  useEffect(() => {
    return () => {
      if (blobTimerRef.current !== null) clearTimeout(blobTimerRef.current);
    };
  }, []);

  const handleMouseDown = (e: MouseEvent) => {
    if (isExpanded) return;
    isDragging.current = true;
    dragVelX.current = 0;
    lastX.current = e.clientX;
    clickStartX.current = e.clientX;
    clickStartY.current = e.clientY;
    showBlob("none");
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (isExpanded) return;
    isDragging.current = true;
    dragVelX.current = 0;
    lastX.current = e.touches[0].clientX;
    clickStartX.current = e.touches[0].clientX;
    clickStartY.current = e.touches[0].clientY;
  };

  const handleWheel = (e: WheelEvent) => {
    if (isExpanded) return;
    e.preventDefault();
    velYRef.current += e.deltaY * 0.0012;
    showBlob(e.deltaY > 0 ? "right" : "left");
  };

  const s = CONTENT[activeIdx];
  const exp = CONTENT[expandedIdx];

  return (
    <div
      className={styles.hubWrap}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onWheel={handleWheel}
    >
      <Canvas
        camera={{ position: [0, 0, 0], fov: 70 }}
        className={styles.hubCanvas}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <HubCylinderScene targetRotationYRef={targetRotYRef} onSectionChange={setActiveIdx} />
      </Canvas>

      <div
        className={`${styles.blob} ${styles.blobLeft} ${blobDir === "left" ? styles.blobVisible : styles.blobHidden}`}
        aria-hidden
      />

      <div
        className={`${styles.blob} ${styles.blobRight} ${blobDir === "right" ? styles.blobVisible : styles.blobHidden}`}
        aria-hidden
      />

      {blobDir === "right" && (
        <div className={`${styles.hint} ${styles.hintRight}`}>
          <div className={styles.hintLine} />
          <p className={styles.hintText}>siguiente</p>
        </div>
      )}

      {blobDir === "left" && (
        <div className={`${styles.hint} ${styles.hintLeft}`}>
          <div className={styles.hintLine} />
          <p className={styles.hintText}>anterior</p>
        </div>
      )}

      <p
        className={styles.hubKickerOverlay}
        style={{ color: s.light ? "rgba(245,242,236,0.4)" : "rgba(10,12,18,0.35)" }}
      >
        {s.kicker}
      </p>

      <nav className={styles.hubDots} aria-label="Secciones del Hub">
        {CONTENT.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={i === activeIdx ? styles.hubDotActive : styles.hubDot}
            aria-label={`Sección ${i + 1}`}
          />
        ))}
      </nav>

      <div
        className={`${styles.expandPanel} ${isExpanded ? styles.expandVisible : styles.expandHidden}`}
        style={{ background: exp.bg }}
      >
        <div className={styles.expandInner}>
          <button
            type="button"
            onClick={closeExpand}
            className={styles.backBtn}
            style={{
              color: exp.light ? "rgba(245,242,236,0.5)" : "#DB5227",
              borderColor: exp.light ? "rgba(245,242,236,0.25)" : "rgba(10,12,18,0.2)",
            }}
          >
            ← volver
          </button>

          <p
            className={styles.expandKicker}
            style={{
              color: exp.light ? "rgba(245,242,236,0.48)" : "#DB5227",
            }}
          >
            {exp.kicker}
          </p>

          <h2
            className={styles.expandTitle}
            style={{
              color: exp.light ? "#F5F2EC" : "#0A0C12",
            }}
          >
            {exp.title.split("\n").map((line, i) => (
              <span key={i}>
                {line}
                {i < exp.title.split("\n").length - 1 && <br />}
              </span>
            ))}
          </h2>

          <p
            className={styles.expandBody}
            style={{
              color: exp.light ? "rgba(245,242,236,0.7)" : "rgba(10,12,18,0.62)",
            }}
          >
            {exp.body}
          </p>

          {exp.groups.map((group, gi) => (
            <div key={gi}>
              <p
                className={styles.groupLabel}
                style={{
                  color: exp.light ? "rgba(245,242,236,0.3)" : "rgba(10,12,18,0.3)",
                  borderTopColor: exp.light ? "rgba(245,242,236,0.08)" : "rgba(10,12,18,0.08)",
                }}
              >
                {group.label}
              </p>
              <ul className={styles.groupItems}>
                {group.items.map((item, ii) => (
                  <li
                    key={ii}
                    className={styles.groupItem}
                    style={{
                      color: exp.light ? "rgba(245,242,236,0.62)" : "rgba(10,12,18,0.55)",
                      borderBottomColor: exp.light ? "rgba(245,242,236,0.08)" : "rgba(10,12,18,0.08)",
                    }}
                  >
                    <span
                      className={styles.groupDot}
                      style={{
                        background: exp.light ? "rgba(245,242,236,0.6)" : "#DB5227",
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
