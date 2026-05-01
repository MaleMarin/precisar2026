"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import { calcularMapa, type MapaResultado } from "@/lib/quiz/mapaSeñales";
import quizStyles from "./QuizPage.module.css";

const BRAND_BAR_LOGO_SRC = "/logo-precisar/logo-precisar.png";

const MAIN_BG = "#F5F2EC";
const DOT_EMPTY = "#E0DDD6";
const SEPARATOR_LINE = "rgba(0,0,0,0.08)";
const TEXT_MUTED = "#999";
const TEXT_BODY = "#666";
const TEXT_DARK = "#1A1A1A";

const labelMicroCaps: React.CSSProperties = {
  fontFamily: "var(--font-ui)",
  fontSize: "10px",
  fontWeight: 700,
  letterSpacing: "0.18em",
  color: TEXT_MUTED,
  textTransform: "uppercase",
};

const syneMuted11: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "11px",
  color: TEXT_MUTED,
};

const syneBody85: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "0.85rem",
  color: TEXT_DARK,
  lineHeight: 1.5,
};

function DotsRow({
  filled,
  total,
  courseColor,
}: {
  filled: number;
  total: number;
  courseColor: string;
}) {
  return (
    <div style={{ display: "flex", gap: "5px", flexShrink: 0, marginTop: "4px" }}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            width: "11px",
            height: "11px",
            borderRadius: "50%",
            backgroundColor: i < filled ? courseColor : DOT_EMPTY,
          }}
        />
      ))}
    </div>
  );
}

function buildDownloadText(data: MapaResultado, quizId: string): string {
  const lines = [
    "PRECISAR — MAPA DE SEÑALES",
    "",
    `Curso: ${data.nombreCurso}`,
    `Módulo / id: ${quizId}`,
    `Fecha: ${data.fechaTexto}`,
    "",
    "TU RECORRIDO",
    `- Al inicio elegiste: ${data.recorrido.alInicioElegiste}`,
    `- Lo que sentiste: ${data.recorrido.loQueSentiste}`,
    `- Tu decisión final: ${data.recorrido.tuDecisionFinal}`,
    `- Lo que te llevas: ${data.recorrido.loQueTeLlevas}`,
    "",
    "SEÑALES",
    ...data.senales.map(
      (s) =>
        `- ${s.nombre} (${s.nivelLabel} · ${s.nivelDots}/${5})\n  ${s.descripcion}`,
    ),
    "",
    data.marca,
  ];
  return lines.join("\n");
}

function downloadMapa(quizId: string, data: MapaResultado) {
  const blob = new Blob([buildDownloadText(data, quizId)], {
    type: "text/plain;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `precisar-mapa-${quizId.slice(0, 48)}.txt`;
  a.rel = "nofollow";
  a.click();
  URL.revokeObjectURL(url);
}

export default function QuizResultPage() {
  const params = useParams<{ quizId: string }>();
  const quizId = typeof params?.quizId === "string" ? params.quizId : "";

  const data = useMemo(() => calcularMapa(quizId), [quizId]);

  const legendEjemploLlenos = 3;

  return (
    <main style={{ backgroundColor: MAIN_BG, minHeight: "100vh" }}>
      {/* Barra superior (misma marca que /consulta) */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 30,
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 48px",
          backgroundColor: MAIN_BG,
          borderBottom: `0.5px solid ${SEPARATOR_LINE}`,
          boxSizing: "border-box",
        }}
      >
        <a href="/es" title="Precisar — inicio" style={{ display: "block", lineHeight: 0 }}>
          <img
            src={BRAND_BAR_LOGO_SRC}
            alt="Precisar"
            width={160}
            height={28}
            decoding="async"
            style={{ height: "clamp(26px, 4vw, 32px)", width: "auto", maxWidth: "min(220px, 52vw)" }}
          />
        </a>
      </header>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "56px 48px 80px" }}>
        <div className={`${quizStyles.quizTwoCol}`}>
          {/* Columna izquierda */}
          <div className={quizStyles.quizSticky}>
            <p style={{ ...labelMicroCaps, marginBottom: "12px", marginTop: 0 }}>{data.nombreCurso}</p>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: data.colorCurso,
                lineHeight: 1,
                letterSpacing: "0.02em",
                margin: "0 0 16px",
                whiteSpace: "pre-line",
              }}
            >
              {"COMPLETASTE\nEL MÓDULO"}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: "0.9rem",
                color: TEXT_BODY,
                lineHeight: 1.7,
                margin: "0 0 32px",
                whiteSpace: "pre-line",
                maxWidth: "280px",
              }}
            >
              {
                "Este mapa muestra las señales que activaste. No hay correcto ni incorrecto — hay un punto de partida."
              }
            </p>

            <div
              role="presentation"
              style={{
                width: "40px",
                height: "2px",
                backgroundColor: data.colorCurso,
                marginBottom: "32px",
              }}
            />

            <p style={{ ...labelMicroCaps, marginBottom: "16px", marginTop: 0 }}>TU RECORRIDO</p>

            {(
              [
                ["Al inicio elegiste", data.recorrido.alInicioElegiste],
                ["Lo que sentiste", data.recorrido.loQueSentiste],
                ["Tu decisión final", data.recorrido.tuDecisionFinal],
                ["Lo que te llevas", data.recorrido.loQueTeLlevas],
              ] as const
            ).map(([lab, val]) => (
              <div
                key={lab}
                style={{
                  padding: "12px 0",
                  borderBottom: `0.5px solid ${SEPARATOR_LINE}`,
                }}
              >
                <div style={syneMuted11}>{lab}</div>
                <div style={{ ...syneBody85, marginTop: "4px" }}>{val}</div>
              </div>
            ))}

            <div style={{ marginTop: "24px", display: "flex", justifyContent: "space-between", gap: "16px" }}>
              <span style={syneMuted11}>{data.fechaTexto}</span>
              <span style={syneMuted11}>{data.marca}</span>
            </div>

            <button
              type="button"
              style={{
                marginTop: "24px",
                width: "100%",
                backgroundColor: data.colorCurso,
                color: "#FFFFFF",
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                letterSpacing: "0.08em",
                padding: "14px 24px",
                border: "none",
                cursor: "pointer",
                textTransform: "uppercase",
              }}
              onClick={() => downloadMapa(quizId || "quiz", data)}
            >
              Descargar
            </button>

            <section
              style={{
                marginTop: "16px",
                backgroundColor: "#FFFFFF",
                border: `0.5px solid ${SEPARATOR_LINE}`,
                borderRadius: "8px",
                padding: "20px",
              }}
            >
              <p style={{ ...labelMicroCaps, marginBottom: "8px", marginTop: 0 }}>{data.siguientePaso.label}</p>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "0.85rem",
                  color: "#333",
                  lineHeight: 1.6,
                  margin: "0 0 10px",
                }}
              >
                {data.siguientePaso.texto}
              </p>
              <Link
                href={data.siguientePaso.href}
                prefetch={false}
                style={{
                  color: data.colorCurso,
                  fontWeight: 700,
                  fontFamily: "var(--font-display)",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                }}
              >
                {data.siguientePaso.linkTexto}
              </Link>
            </section>
          </div>

          {/* Columna derecha */}
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "28px",
                flexWrap: "wrap",
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", color: TEXT_MUTED }}>
                Cada punto = una decisión que tomaste
              </span>
              <DotsRow filled={legendEjemploLlenos} total={5} courseColor={data.colorCurso} />
              <span style={{ fontFamily: "var(--font-display)", fontSize: "0.75rem", color: TEXT_MUTED }}>
                más = más desarrollada
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {data.senales.map((s) => (
                <article
                  key={s.nombre}
                  style={{
                    padding: "20px 0",
                    borderBottom: `0.5px solid ${SEPARATOR_LINE}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "24px",
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <h2
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.4rem",
                        letterSpacing: "0.02em",
                        color: TEXT_DARK,
                        margin: "0 0 4px",
                        fontWeight: 600,
                      }}
                    >
                      {s.nombre}
                    </h2>
                    <p
                      style={{
                        fontFamily: "var(--font-ui)",
                        fontSize: "0.82rem",
                        color: TEXT_MUTED,
                        lineHeight: 1.5,
                        margin: 0,
                      }}
                    >
                      {s.nivelLabel} · {s.descripcion}
                    </p>
                  </div>
                  <DotsRow filled={s.nivelDots} total={5} courseColor={data.colorCurso} />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
