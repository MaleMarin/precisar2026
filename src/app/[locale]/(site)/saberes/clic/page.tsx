"use client";

import Link from "next/link";
import { COLORES_CURSO } from "@/lib/cursos/colores";

const CURSOS = [
  {
    id: "antes-de-compartir",
    titulo: "Antes de Compartir",
    num: "01",
    bajada: "Lo que pasa entre que ves algo y lo reenvías.",
  },
  {
    id: "quien-hablo",
    titulo: "¿Quién habló?",
    num: "02",
    bajada: "Lo que pasa cuando la IA suena como alguien que conoces.",
  },
  {
    id: "el-que-mas-grita",
    titulo: "El que más grita",
    num: "03",
    bajada: "Cómo los algoritmos deciden lo que ves.",
  },
  {
    id: "salud-sin-panico",
    titulo: "Salud sin pánico",
    num: "04",
    bajada: "Cómo evaluar información de salud antes de compartirla.",
  },
  {
    id: "grupo-de-profes",
    titulo: "Lo que llega al grupo de profes",
    num: "05",
    bajada: "Desinformación en el aula — cómo responder sin perder el criterio.",
  },
  {
    id: "mis-datos-mi-decision",
    titulo: "Mis datos, mi decisión",
    num: "06",
    bajada: "Lo que saben de ti las aplicaciones que usas.",
  },
  {
    id: "clima-sin-catastrofe",
    titulo: "Clima sin catástrofe",
    num: "07",
    bajada: "Cómo evaluar información climática sin negacionismo ni alarmismo.",
  },
  {
    id: "cuentame-sin-asustarme",
    titulo: "Cuéntame sin asustarme",
    num: "08",
    bajada: "Cómo hablar de tecnología con personas mayores.",
  },
];

export default function SaberesClicPage() {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: "180px",
        right: 0,
        bottom: 0,
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gridTemplateRows: "repeat(2, 1fr)",
        gap: 0,
      }}
    >
      {CURSOS.map((curso) => (
        <Link
          key={curso.id}
          href={`/cursos/${curso.id}`}
          style={{
            backgroundColor: COLORES_CURSO[curso.id] || "#888",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "24px",
            textDecoration: "none",
            position: "relative",
            overflow: "hidden",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "brightness(1.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "20px",
              fontFamily: "var(--font-ui)",
              fontSize: "1.15rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {curso.num}
          </div>

          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 3.2vw, 2.7rem)",
              letterSpacing: "0.02em",
              color: "#FFFFFF",
              lineHeight: 1.1,
              marginBottom: "8px",
            }}
          >
            {curso.titulo.toUpperCase()}
          </div>

          <div
            style={{
              fontFamily: "var(--font-ui)",
              fontSize: "1.25rem",
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.5,
            }}
          >
            {curso.bajada}
          </div>
        </Link>
      ))}
    </div>
  );
}
