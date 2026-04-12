"use client";
import type * as React from "react";
import { ConsultaWizard } from "@/components/consulta/ConsultaWizard";
import { ConsultaStartButton } from "@/components/consulta/ConsultaStartButton";
import { useConsultaFlow } from "@/components/consulta/ConsultaFlowContext";

const BLOCKS = [
  { n: "01", title: "Cómo te informas", bg: "#F74603" },
  { n: "02", title: "Confianza e información", bg: "#DD0200" },
  { n: "03", title: "Cómo procesas lo que llega", bg: "#55100D" },
  { n: "04", title: "IA, tu visión y tu contexto", bg: "#1A0706" },
] as const;

export function ConsultaStackedLayout() {
  const { phase, questionIndex } = useConsultaFlow();
  const activeBlock = phase === "active" ? Math.min(Math.floor(questionIndex / 3), 3) : -1;
  const isIntro = phase === "awaiting_entry";
  const isComplete = phase === "complete";
  const futureBlocks = activeBlock >= 0 ? [...BLOCKS].slice(activeBlock + 1) : [];

  const mainBg = isIntro || isComplete ? "#1A0706" : (BLOCKS[activeBlock]?.bg ?? "#1A0706");

  return (
    <div style={{
      width: "100%",
      maxWidth: isIntro ? "min(960px, 100%)" : 720,
      margin: "0 auto",
      paddingTop: "clamp(2rem,4vw,3rem)",
      paddingBottom: "clamp(4rem,8vw,6rem)",
      display: "grid",
      gridTemplateColumns: isIntro ? "minmax(0,1fr) minmax(0,1fr)" : "1fr",
      gap: "clamp(2rem,5vw,4rem)",
      alignItems: "flex-start",
    }}>
      {isIntro && (
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.5rem", paddingTop: "1rem", minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(247,70,3,0.8)" }}>
            Precisar · Consulta ciudadana 2026
          </p>
          <h1 style={{ margin: 0, fontSize: "clamp(3rem,6vw,5.5rem)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.045em", color: "#ffffff" }}>
            ¿Cómo te<br />informas<br />hoy?
          </h1>
          <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.65, color: "rgba(255,255,255,0.6)", maxWidth: "38rem" }}>
            Tu experiencia cambia cómo nos informamos todos. 4 bloques, 12 preguntas sobre cómo recibes, evalúas y compartes información.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
            {["Anónima", "12 preguntas", "Menos de un minuto"].map((tag) => (
              <span key={tag} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", padding: "4px 12px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999 }}>{tag}</span>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.75rem", alignItems: "flex-start" }}>
            <ConsultaStartButton />
            <a href="/legal/privacidad-consulta-2026" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
              Política de privacidad →
            </a>
          </div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column" as const, minWidth: 0, gridColumn: isIntro ? undefined : "1 / -1" }}>

        {/* Archivo principal */}
        <div style={{
          borderRadius: 28,
          background: mainBg,
          padding: "2.5rem 2.5rem 2.5rem",
          minHeight: isIntro ? "clamp(320px,50vh,520px)" : "clamp(480px,70vh,680px)",
          position: "relative" as const,
          zIndex: 10,
          boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
          border: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column" as const,
          transition: "background 0.5s ease",
        }}>

          {/* Bloque activo con wizard */}
          {!isIntro && !isComplete && activeBlock >= 0 && BLOCKS[activeBlock] && (
            <>
              <div style={{ marginBottom: "1.25rem" }}>
                <p style={{ margin: "0 0 0.35rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)" }}>
                  {BLOCKS[activeBlock].n} · respondiendo
                </p>
                <h2 style={{ margin: 0, fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                  {BLOCKS[activeBlock].title}
                </h2>
              </div>
              <ConsultaWizard />
            </>
          )}

          {/* Completo */}
          {isComplete && <ConsultaWizard />}
        </div>

        {/* Archivos intro: 4 pestañas asomando */}
        {isIntro && BLOCKS.map((block, i) => (
          <div key={block.n} style={{
            borderRadius: "0 0 22px 22px",
            background: block.bg,
            height: 72,
            marginTop: i === 0 ? -48 : -44,
            zIndex: 9 - i,
            position: "relative" as const,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "0 2.5rem",
            boxShadow: `0 ${16 + i * 8}px ${36 + i * 8}px rgba(0,0,0,${0.28 + i * 0.07})`,
            border: "1px solid rgba(255,255,255,0.06)",
            opacity: 1 - i * 0.06,
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>{block.n}</span>
            <span style={{ fontSize: "0.9375rem", fontWeight: 800, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.025em" }}>{block.title}</span>
          </div>
        ))}

        {/* Archivos pendientes durante wizard */}
        {!isIntro && !isComplete && futureBlocks.map((block, i) => (
          <div key={block.n} style={{
            borderRadius: "0 0 22px 22px",
            background: block.bg,
            height: 72,
            marginTop: i === 0 ? -48 : -44,
            zIndex: 9 - i,
            position: "relative" as const,
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            padding: "0 2.5rem",
            boxShadow: `0 ${16 + i * 8}px ${36 + i * 8}px rgba(0,0,0,${0.28 + i * 0.07})`,
            border: "1px solid rgba(255,255,255,0.06)",
            opacity: 1 - i * 0.08,
            transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", flexShrink: 0 }}>{block.n}</span>
            <span style={{ fontSize: "0.9375rem", fontWeight: 800, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.025em" }}>{block.title}</span>
          </div>
        ))}

      </div>
    </div>
  );
}
