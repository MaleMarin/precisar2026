"use client";

import { useState, useRef, useEffect, useCallback, type MouseEvent, type TouchEvent } from "react";
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
          "Auditorios y eventos corporativos — Para generar conversaciones necesarias.",
          "Municipios y gobiernos locales — Intervención territorial con impacto ciudadano directo.",
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
    body: "Diez formas de integrar la experiencia en tu evento o espacio.",
    groups: [
      {
        label: "Posibilidades",
        items: [
          "01 · Activación previa al evento — Despliega módulos en pasillos antes de actividades programadas.",
          "02 · Puntos de encuentro temáticos — Estaciones dedicadas a privacidad, IA, desinformación o ética digital.",
          "03 · Rutas autoguiadas — Recorrido cronológico con soportes visuales y multimedia.",
          "04 · Elementos móviles — Tablets, kioscos portátiles o gafas de realidad aumentada.",
          "05 · Material descargable — Códigos QR que enlazan a guías e infografías.",
          "06 · Salas de reflexión — Áreas con mobiliario cómodo y proyección de videos de discusión.",
          "07 · Interacción IA en vivo — Chatbots que generan análisis de perfiles de privacidad.",
          "08 · Experiencias inmersivas — Videoproyecciones 360°, realidad virtual y entornos sonoros.",
          "09 · Gamificación — Desafíos con insignias digitales o reconocimientos físicos.",
          "10 · Integración con ponencias — Combina estaciones con conferencias para ejemplificar argumentos.",
        ],
      },
    ],
    bg: "#DB5227",
    light: true,
  },
  {
    kicker: "05 · Personalización",
    title: "Ediciones\ntemáticas",
    body: "Cada muestra se puede adaptar a un tema específico o personalizar para tu comunidad.",
    groups: [
      {
        label: "Opciones disponibles",
        items: [
          "Ediciones temáticas — Profundiza en IA, desinformación, privacidad digital con tecnologías especializadas.",
          "Edición comunitaria — Adapta la realidad de tu comuna con dinámicas de participación local.",
          "Componentes a la carta — Elige piezas sueltas: pósters, mini-experimentos, kits de cultura digital.",
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
        label: "Cómo desarrollamos cada muestra",
        items: [
          "Colaboración con expertos — Nos asociamos con profesionales para asegurar contenido preciso.",
          "Investigación en campo — Investigaciones directas con la audiencia para entender desafíos reales.",
        ],
      },
      {
        label: "El proceso",
        items: [
          "01 · Cuéntanos tu espacio, público y duración",
          "02 · Diseñamos la propuesta a medida",
          "03 · Co-creamos juntos el montaje y cronograma",
        ],
      },
    ],
    bg: "#F5F2EC",
    light: false,
  },
] as const;

export default function HubCylinder() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [targetRotation, setTargetRotation] = useState(0);
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const rotRef = useRef(0);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
  }, []);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    isDragging.current = true;
    lastX.current = e.touches[0].clientX;
  }, []);

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - lastX.current;
      rotRef.current -= dx * 0.008;
      setTargetRotation(rotRef.current);
      lastX.current = e.clientX;
    };
    const onMoveT = (e: globalThis.TouchEvent) => {
      if (!isDragging.current) return;
      const dx = e.touches[0].clientX - lastX.current;
      rotRef.current -= dx * 0.008;
      setTargetRotation(rotRef.current);
      lastX.current = e.touches[0].clientX;
    };
    const onUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMoveT);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMoveT);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, []);

  const goToSection = (i: number) => {
    rotRef.current = (i / N) * Math.PI * 2;
    setTargetRotation(rotRef.current);
  };

  const s = CONTENT[activeIdx];
  const tc = s.light ? "#F5F2EC" : "#0A0C12";
  const bc = s.light ? "rgba(245,242,236,0.65)" : "rgba(10,12,18,0.6)";
  const kc = s.light ? "rgba(245,242,236,0.5)" : "#DB5227";
  const dotActive = s.light ? "rgba(245,242,236,0.8)" : "#DB5227";
  const itemColor = s.light ? "rgba(245,242,236,0.55)" : "rgba(10,12,18,0.5)";
  const labelColor = s.light ? "rgba(245,242,236,0.35)" : "rgba(10,12,18,0.35)";
  const dividerColor = s.light ? "rgba(245,242,236,0.08)" : "rgba(10,12,18,0.08)";

  return (
    <div className={styles.hubWrap} style={{ background: s.bg }}>
      <div className={styles.hubContent}>
        <p className={styles.hubKicker} style={{ color: kc }}>
          {s.kicker}
        </p>
        <h2 className={styles.hubTitle} style={{ color: tc }}>
          {s.title.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < s.title.split("\n").length - 1 && <br />}
            </span>
          ))}
        </h2>
        <p className={styles.hubBody} style={{ color: bc }}>
          {s.body}
        </p>
        {s.groups.map((group, gi) => (
          <div key={gi} className={styles.hubGroup}>
            <p
              className={styles.hubGroupLabel}
              style={{ color: labelColor, borderTopColor: dividerColor }}
            >
              {group.label}
            </p>
            <ul className={styles.hubItems}>
              {group.items.map((item, ii) => (
                <li
                  key={ii}
                  className={styles.hubItem}
                  style={{
                    color: itemColor,
                    borderBottomColor: dividerColor,
                  }}
                >
                  <span className={styles.hubItemDot} style={{ background: dotActive }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className={styles.hubCanvasWrap}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <Canvas
          camera={{ position: [0, 0, 700], fov: 55 }}
          dpr={[1, 2]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
        >
          <HubCylinderScene targetRotation={targetRotation} onSectionChange={setActiveIdx} />
        </Canvas>
        <p className={styles.hubHint} style={{ color: bc }}>
          ← arrastra →
        </p>
      </div>

      <nav className={styles.hubNav}>
        {CONTENT.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToSection(i)}
            className={i === activeIdx ? styles.hubNavDotActive : styles.hubNavDot}
            style={{
              background: i === activeIdx ? dotActive : "rgba(128,128,128,0.2)",
            }}
            aria-label={`Ir a sección ${i + 1}`}
          />
        ))}
      </nav>
    </div>
  );
}
