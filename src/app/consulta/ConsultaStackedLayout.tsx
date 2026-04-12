"use client";
import type * as React from "react";
import { ConsultaWizard } from "@/components/consulta/ConsultaWizard";
import { ConsultaStartButton } from "@/components/consulta/ConsultaStartButton";
import { useConsultaFlow } from "@/components/consulta/ConsultaFlowContext";

const BLOCKS = [
  {
    n: "01",
    title: "Cómo te informas",
    sub: "Canales, razones y temas que sigues para entender lo que pasa.",
    bg: "#F74603",
    fg: "#F5F2EC",
    accent: "#F5F2EC",
    qs: ["¿Por dónde te informas?", "¿Por qué esos canales?", "¿Qué temas sigues?"],
  },
  {
    n: "02",
    title: "Confianza e información",
    sub: "Qué te preocupa y qué te ayudaría a sentir más seguridad.",
    bg: "#DD0200",
    fg: "#F5F2EC",
    accent: "#F5F2EC",
    qs: ["¿Qué te preocupa más?", "¿Qué te daría seguridad?", "¿Cuánta confianza tienes?"],
  },
  {
    n: "03",
    title: "Cómo procesas lo que llega",
    sub: "Qué haces cuando dudas, qué formatos te sirven.",
    bg: "#55100D",
    fg: "#F5F2EC",
    accent: "#F5F2EC",
    qs: ["¿Qué haces si dudas?", "¿Qué formato te ayuda?", "¿Necesitas adaptaciones?"],
  },
  {
    n: "04",
    title: "IA, tu visión y tu contexto",
    sub: "IA, tu experiencia informativa ideal y datos básicos.",
    bg: "#1A0706",
    fg: "#F5F2EC",
    accent: "#F5F2EC",
    qs: ["¿Qué quieres saber sobre IA?", "Tu experiencia ideal", "Datos básicos (opcionales)"],
  },
] as const;

export function ConsultaStackedLayout() {
  const { phase, questionIndex } = useConsultaFlow();

  const activeBlock =
    phase === "active" ? Math.min(Math.floor(questionIndex / 3), 3) : -1;
  const isIntro = phase === "awaiting_entry";
  const isComplete = phase === "complete";
  const currentBlock = activeBlock >= 0 ? BLOCKS[activeBlock] : null;
  const futureBlocks = isIntro
    ? [...BLOCKS]
    : activeBlock >= 0
    ? [...BLOCKS].slice(activeBlock + 1)
    : [];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: isIntro ? "minmax(0, 1fr) minmax(0, 1fr)" : "1fr",
      gap: "clamp(2rem, 5vw, 4rem)",
      alignItems: "flex-start",
      width: "100%",
      paddingTop: "clamp(2rem, 4vw, 3.5rem)",
      paddingBottom: "clamp(3rem, 6vw, 5rem)",
    }}>

      {isIntro && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", paddingTop: "1rem" }}>
          <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(221,2,0,0.85)" }}>
            Precisar · Consulta ciudadana 2026
          </p>
          <h1 style={{ margin: 0, fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.045em", color: "#ffffff" }}>
            ¿Cómo te<br />informas<br />hoy?
          </h1>
          <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.65, color: "rgba(255,255,255,0.65)", maxWidth: "32rem" }}>
            Tu experiencia cambia cómo nos informamos todos. 4 bloques, 12 preguntas sobre cómo recibes, evalúas y compartes información.
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const }}>
            {["Anónima", "12 preguntas", "Menos de un minuto"].map((tag) => (
              <span key={tag} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 999 }}>
                {tag}
              </span>
            ))}
          </div>
          <ConsultaStartButton />
          <a href="/legal/privacidad-consulta-2026" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
            Política de privacidad →
          </a>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>

        <div style={{ position: "relative" as const, marginBottom: isIntro ? 0 : -24 }}>
          {futureBlocks.map((block, i) => {
            const overlapPx = isIntro ? 72 : 52;
            const scaleVal = 1 - i * 0.022;
            const opacityVal = isIntro ? 1 - i * 0.1 : 0.65 - i * 0.18;
            return (
              <div key={block.n} style={{
                borderRadius: 32,
                background: block.bg,
                padding: "1.5rem 1.75rem",
                marginBottom: i === 0 ? 0 : -overlapPx,
                transform: `scale(${scaleVal})`,
                transformOrigin: "top center",
                zIndex: futureBlocks.length - i,
                position: "relative" as const,
                opacity: Math.max(opacityVal, 0.15),
                boxShadow: "0 20px 50px rgba(0,0,0,0.3)",
                transition: "all 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}>
                <p style={{ margin: "0 0 0.3rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)" }}>
                  {block.n} · {isIntro ? "bloque" : "pendiente"}
                </p>
                <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: 800, color: block.fg, letterSpacing: "-0.025em", lineHeight: 1.1 }}>
                  {block.title}
                </h3>
                {isIntro && (
                  <>
                    <p style={{ margin: "0.4rem 0 0", fontSize: "0.8125rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.5 }}>
                      {block.sub}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.25rem", marginTop: "0.6rem" }}>
                      {block.qs.map((q) => (
                        <p key={q} style={{ margin: 0, fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", paddingLeft: "0.85rem", position: "relative" as const, lineHeight: 1.4 }}>
                          <span style={{ position: "absolute" as const, left: 0, color: block.accent }}>—</span>{q}
                        </p>
                      ))}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {currentBlock && (
          <div style={{
            borderRadius: 36,
            background: currentBlock.bg,
            padding: "2rem 2rem 0",
            position: "relative" as const,
            zIndex: 10,
            boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)",
            transition: "background 0.5s ease",
          }}>
            <div style={{ marginBottom: "1.25rem" }}>
              <p style={{ margin: "0 0 0.35rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.4)" }}>
                {currentBlock.n} · respondiendo
              </p>
              <h2 style={{ margin: 0, fontSize: "clamp(1.35rem, 2.5vw, 1.75rem)", fontWeight: 800, color: currentBlock.fg, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
                {currentBlock.title}
              </h2>
            </div>
            <ConsultaWizard />
          </div>
        )}

        {isComplete && (
          <div style={{ borderRadius: 36, background: "#1A0706", padding: "2rem 2rem 0", border: "1px solid rgba(247,70,3,0.3)", boxShadow: "0 40px 80px rgba(0,0,0,0.5)" }}>
            <ConsultaWizard />
          </div>
        )}

      </div>
    </div>
  );
}
