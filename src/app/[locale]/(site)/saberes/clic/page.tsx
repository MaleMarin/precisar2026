"use client";

import Link from "next/link";
import { CURSOS_CON_LECCIONES } from "@/lib/cursos";
import { COLORES_CURSO } from "@/lib/cursos/colores";

import clicGrid from "./SaberesClicGrid.module.css";

const CURSOS = Object.values(CURSOS_CON_LECCIONES).map((curso, index) => ({
  id: curso.id,
  titulo: curso.titulo,
  bajada: curso.subtitulo,
  num: String(index + 1).padStart(2, "0"),
  darkText: curso.id === "clima-sin-catastrofe",
}));

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
