"use client";
import type * as React from "react";
import { ConsultaWizard } from "@/components/consulta/ConsultaWizard";
import { ConsultaStartButton } from "@/components/consulta/ConsultaStartButton";
import { useConsultaFlow } from "@/components/consulta/ConsultaFlowContext";

const BLOCKS = [
  { n: "01", title: "Cómo te informas", sub: "Canales, razones y temas que sigues para entender lo que pasa.", bg: "#F74603", qs: ["¿Por dónde te informas?", "¿Por qué esos canales?", "¿Qué temas sigues?"] },
  { n: "02", title: "Confianza e información", sub: "Qué te preocupa y qué te ayudaría a sentir más seguridad.", bg: "#DD0200", qs: ["¿Qué te preocupa más?", "¿Qué te daría seguridad?", "¿Cuánta confianza tienes?"] },
  { n: "03", title: "Cómo procesas lo que llega", sub: "Qué haces cuando dudas, qué formatos te sirven.", bg: "#55100D", qs: ["¿Qué haces si dudas?", "¿Qué formato te ayuda?", "¿Necesitas adaptaciones?"] },
  { n: "04", title: "IA, tu visión y tu contexto", sub: "IA, tu experiencia informativa ideal y datos básicos.", bg: "#1A0706", qs: ["¿Qué quieres saber sobre IA?", "Tu experiencia ideal", "Datos básicos (opcionales)"] },
] as const;

export function ConsultaStackedLayout() {
  const { phase, questionIndex } = useConsultaFlow();
  const activeBlock = phase === "active" ? Math.min(Math.floor(questionIndex / 3), 3) : -1;
  const isIntro = phase === "awaiting_entry";
  const isComplete = phase === "complete";
  const currentBlock = activeBlock >= 0 ? BLOCKS[activeBlock] : null;
  const futureBlocks = activeBlock >= 0 ? [...BLOCKS].slice(activeBlock + 1) : [];

  return (
    <div style={{ display: "grid", gridTemplateColumns: isIntro ? "minmax(0,1fr) minmax(0,1fr)" : "1fr", gap: "clamp(2rem,5vw,4rem)", alignItems: "flex-start", width: "100%", paddingTop: "clamp(2rem,4vw,3.5rem)", paddingBottom: "clamp(3rem,6vw,5rem)" }}>

      {/* Columna izquierda — solo intro */}
      {isIntro && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", paddingTop: "1rem" }}>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(247,70,3,0.9)" }}>
            Precisar · Consulta ciudadana 2026
          </p>
          <h1 style={{ margin: 0, fontSize: "clamp(2.8rem,5.5vw,5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.045em", color: "#ffffff" }}>
            ¿Cómo te<br />informas<br />hoy?
          </h1>
          <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", maxWidth: "32rem" }}>
            Tu experiencia cambia cómo nos informamos todos. 4 bloques, 12 preguntas sobre cómo recibes, evalúas y compartes información.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
            {["Anónima", "12 preguntas", "Menos de un minuto"].map((tag) => (
              <span key={tag} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999 }}>{tag}</span>
            ))}
          </div>
          <ConsultaStartButton />
          <a href="/legal/privacidad-consulta-2026" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
            Política de privacidad →
          </a>
        </div>
      )}

      {/* Columna de cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

        {/* INTRO: 4 cards apiladas, cada una del tamaño del hero */}
        {isIntro && (
          <div style={{ position: "relative" as const }}>
            {BLOCKS.map((block, i) => (
              <div key={block.n} style={{
                borderRadius: 28,
                background: block.bg,
                padding: "2rem 2rem 2.5rem",
                position: i === 0 ? "relative" as const : "absolute" as const,
                top: i === 0 ? undefined : `${i * 18}px`,
                left: i === 0 ? undefined : `${i * 6}px`,
                right: i === 0 ? undefined : `${i * 6}px`,
                zIndex: BLOCKS.length - i,
                opacity: 1 - i * 0.08,
                transform: `scale(${1 - i * 0.015})`,
                transformOrigin: "top center",
                boxShadow: `0 ${20 + i * 10}px ${50 + i * 10}px rgba(0,0,0,${0.3 + i * 0.05})`,
                border: "1px solid rgba(255,255,255,0.08)",
                minHeight: "clamp(340px, 50vh, 520px)",
                display: "flex",
                flexDirection: "column" as const,
                justifyContent: "space-between",
              }}>
                <div>
                  <p style={{ margin: "0 0 0.5rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)" }}>
                    {block.n} · bloque
                  </p>
                  <h2 style={{ margin: "0 0 0.65rem", fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                    {block.title}
                  </h2>
                  <p style={{ margin: "0 0 1.25rem", fontSize: "0.875rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.55 }}>
                    {block.sub}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.4rem" }}>
                    {block.qs.map((q) => (
                      <p key={q} style={{ margin: 0, fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", paddingLeft: "1rem", position: "relative" as const, lineHeight: 1.5 }}>
                        <span style={{ position: "absolute" as const, left: 0, color: "rgba(255,255,255,0.6)" }}>—</span>{q}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ACTIVO: card abierta con wizard + siguientes asomando abajo */}
        {currentBlock && (
          <div style={{ display: "flex", flexDirection: "column" as const, gap: 0 }}>
            {/* Card activa — tamaño hero con wizard dentro */}
            <div style={{
              borderRadius: 28,
              background: currentBlock.bg,
              padding: "2rem 2rem 0",
              position: "relative" as const,
              zIndex: 10,
              minHeight: "clamp(340px,55vh,600px)",
              boxShadow: "0 40px 80px rgba(0,0,0,0.5)",
              border: "1px solid rgba(255,255,255,0.06)",
              transition: "background 0.5s ease",
            }}>
              <p style={{ margin: "0 0 0.4rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)" }}>
                {currentBlock.n} · respondiendo
              </p>
              <h2 style={{ margin: "0 0 1.5rem", fontSize: "clamp(1.35rem,2.5vw,1.75rem)", fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                {currentBlock.title}
              </h2>
              <ConsultaWizard />
            </div>

            {/* Cards siguientes — asoman por abajo */}
            {futureBlocks.map((block, i) => (
              <div key={block.n} style={{
                borderRadius: "0 0 24px 24px",
                background: block.bg,
                padding: "1.25rem 2rem",
                marginTop: -8,
                zIndex: 9 - i,
                position: "relative" as const,
                opacity: 0.7 - i * 0.2,
                transform: `scaleX(${1 - i * 0.02})`,
                transformOrigin: "top center",
                boxShadow: "0 20px 40px rgba(0,0,0,0.35)",
                border: "1px solid rgba(255,255,255,0.05)",
                transition: "all 0.5s cubic-bezier(0.4,0,0.2,1)",
              }}>
                <p style={{ margin: "0 0 0.2rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)" }}>
                  {block.n} · pendiente
                </p>
                <p style={{ margin: 0, fontSize: "0.9375rem", fontWeight: 800, color: "rgba(255,255,255,0.7)", letterSpacing: "-0.025em" }}>
                  {block.title}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* COMPLETO */}
        {isComplete && (
          <div style={{ borderRadius: 28, background: "#1A0706", padding: "2rem 2rem 0", border: "1px solid rgba(247,70,3,0.3)", boxShadow: "0 40px 80px rgba(0,0,0,0.5)", minHeight: "clamp(340px,55vh,600px)" }}>
            <ConsultaWizard />
          </div>
        )}

      </div>
    </div>
  );
}
