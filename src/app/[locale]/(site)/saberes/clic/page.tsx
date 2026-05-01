"use client";

import Link from "next/link";
import { COLORES_CURSO } from "@/lib/cursos/colores";

import clicGrid from "./SaberesClicGrid.module.css";

const CURSOS = [
  {
    id: "antes-de-compartir",
    titulo: "Antes de Compartir",
    num: "01",
    bajada: "Lo que pasa entre que ves algo y lo reenvías.",
    darkText: false as const,
  },
  {
    id: "quien-hablo",
    titulo: "¿Quién habló?",
    num: "02",
    bajada: "Lo que pasa cuando la IA suena como alguien que conoces.",
    darkText: false as const,
  },
  {
    id: "el-que-mas-grita",
    titulo: "El que más grita",
    num: "03",
    bajada: "Cómo los algoritmos deciden lo que ves.",
    darkText: false as const,
  },
  {
    id: "salud-sin-panico",
    titulo: "Salud sin pánico",
    num: "04",
    bajada: "Cómo evaluar información de salud antes de compartirla.",
    darkText: false as const,
  },
  {
    id: "grupo-de-profes",
    titulo: "Lo que llega al grupo de profes",
    num: "05",
    bajada: "Desinformación en el aula — cómo responder sin perder el criterio.",
    darkText: false as const,
  },
  {
    id: "mis-datos-mi-decision",
    titulo: "Mis datos, mi decisión",
    num: "06",
    bajada: "Lo que saben de ti las aplicaciones que usas.",
    darkText: false as const,
  },
  {
    id: "clima-sin-catastrofe",
    titulo: "Clima sin catástrofe",
    num: "07",
    bajada: "Cómo evaluar información climática sin negacionismo ni alarmismo.",
    darkText: true as const,
  },
  {
    id: "cuentame-sin-asustarme",
    titulo: "Cuéntame sin asustarme",
    num: "08",
    bajada: "Cómo hablar de tecnología con personas mayores.",
    darkText: false as const,
  },
];

export default function SaberesClicPage() {
  return (
    <div className={clicGrid.hero}>
      <div className={clicGrid.grid}>
        {CURSOS.map((curso) => (
          <Link
            key={curso.id}
            href={`/cursos/${curso.id}`}
            className={clicGrid.tile}
            {...(curso.darkText ? { "data-accent": "warm" } : {})}
            style={{
              backgroundColor: COLORES_CURSO[curso.id] || "#888",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.filter = "brightness(1.08)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.filter = "brightness(1)";
            }}
          >
            <div className={clicGrid.num}>{curso.num}</div>
            <div className={clicGrid.titulo}>{curso.titulo.toUpperCase()}</div>
            <p className={clicGrid.bajada}>{curso.bajada}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
