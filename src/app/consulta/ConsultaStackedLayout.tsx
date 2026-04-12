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
  const futureBlocks = isIntro ? [...BLOCKS] : activeBlock >= 0 ? [...BLOCKS].slice(activeBlock + 1) : [];
  const mainBg = isIntro ? "#1A0706" : isComplete ? "#1A0706" : BLOCKS[activeBlock]?.bg ?? "#1A0706";
  const mainRadius = futureBlocks.length > 0 ? "0 0 24px 24px" : "24px";

  return (
    <div style={{ width: "100%", maxWidth: 680, margin: "0 auto", paddingTop: "clamp(1rem,2vw,1.5rem)", paddingBottom: "clamp(4rem,8vw,6rem)" }}>

      {/* Cards pendientes apiladas ARRIBA — de atrás hacia adelante */}
      {futureBlocks.length > 0 && (
        <div style={{ position: "relative" as const }}>
          {[...futureBlocks].reverse().map((block, ri) => {
            const fromBottom = ri;
            const total = futureBlocks.length;
            const scaleX = 0.88 + fromBottom * (0.12 / total);
            const opacity = 0.45 + fromBottom * (0.4 / total);
            return (
              <div key={block.n} style={{
                background: block.bg,
                borderRadius: "20px 20px 0 0",
                height: 90,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 2.5rem",
                position: "relative" as const,
                zIndex: fromBottom + 1,
                marginTop: ri === 0 ? 0 : -62,
                transform: `scaleX(${scaleX})`,
                transformOrigin: "center bottom",
                opacity,
                boxShadow: `0 -6px 28px rgba(0,0,0,${0.18 + fromBottom * 0.08})`,
                border: "1px solid rgba(255,255,255,0.07)",
                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.15rem" }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)" }}>{block.n}</span>
                  <span style={{ fontSize: "clamp(1rem,2vw,1.25rem)", fontWeight: 800, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.03em", lineHeight: 1 }}>{block.title}</span>
                </div>
                <span style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)", fontWeight: 600 }}>pendiente →</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Archivo principal */}
      <div style={{
        background: mainBg,
        borderRadius: mainRadius,
        minHeight: "clamp(520px,75vh,760px)",
        padding: "2.5rem",
        position: "relative" as const,
        zIndex: 10,
        boxShadow: "0 40px 80px rgba(0,0,0,0.55)",
        border: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column" as const,
        transition: "background 0.5s ease, border-radius 0.4s ease",
      }}>

        {isIntro && (
          <div style={{ display: "flex", flexDirection: "column" as const, gap: "1.5rem", flex: 1 }}>
            <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(247,70,3,0.85)" }}>
              Precisar · Consulta ciudadana 2026
            </p>
            <h1 style={{ margin: 0, fontSize: "clamp(3rem,6.5vw,5.5rem)", fontWeight: 800, lineHeight: 0.93, letterSpacing: "-0.045em", color: "#ffffff" }}>
              ¿Cómo te<br />informas<br />hoy?
            </h1>
            <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.65, color: "rgba(255,255,255,0.6)", maxWidth: "36rem" }}>
              Tu experiencia cambia cómo nos informamos todos. 4 bloques, 12 preguntas sobre cómo recibes, evalúas y compartes información.
            </p>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
              {["Anónima", "12 preguntas", "Menos de un minuto"].map((tag) => (
                <span key={tag} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", padding: "4px 12px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999 }}>{tag}</span>
              ))}
            </div>
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column" as const, gap: "0.75rem", alignItems: "flex-start" }}>
              <ConsultaStartButton />
              <a href="/legal/privacidad-consulta-2026" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                Política de privacidad →
              </a>
            </div>
          </div>
        )}

        {!isIntro && !isComplete && activeBlock >= 0 && (
          <>
            <div style={{ marginBottom: "1.25rem" }}>
              <p style={{ margin: "0 0 0.35rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)" }}>
                {BLOCKS[activeBlock].n} · respondiendo
              </p>
              <h2 style={{ margin: 0, fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                {BLOCKS[activeBlock].title}
              </h2>
            </div>
            <div data-consulta-stacked="true">
              <ConsultaWizard />
            </div>
          </>
        )}

        {isComplete && (
          <div data-consulta-stacked="true">
            <ConsultaWizard />
          </div>
        )}
      </div>
    </div>
  );
}
