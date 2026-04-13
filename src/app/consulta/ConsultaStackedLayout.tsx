"use client";
import type * as React from "react";
import { ConsultaWizard } from "@/components/consulta/ConsultaWizard";
import { ConsultaStartButton } from "@/components/consulta/ConsultaStartButton";
import { useConsultaFlow } from "@/components/consulta/ConsultaFlowContext";

const BLOCKS = [
  { n: "01", title: "Cómo te informas",          bg: "#ffffff", fg: "#0A0C12" },
  { n: "02", title: "Confianza e información",    bg: "#F74603", fg: "#ffffff" },
  { n: "03", title: "Cómo procesas lo que llega", bg: "#DD0200", fg: "#ffffff" },
  { n: "04", title: "Tu contexto",                bg: "#1A0706", fg: "#ffffff" },
] as const;

export function ConsultaStackedLayout() {
  const { phase, questionIndex } = useConsultaFlow();
  const activeBlock = phase === "active" ? Math.min(Math.floor(questionIndex / 3), 3) : -1;
  const isIntro = phase === "awaiting_entry";
  const isComplete = phase === "complete";
  const futureBlocks = isIntro ? [...BLOCKS] : activeBlock >= 0 ? [...BLOCKS].slice(activeBlock + 1) : [];
  const currentBlock = activeBlock >= 0 ? BLOCKS[activeBlock] : null;

  return (
    <>
      <div style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem clamp(1rem,3vw,2rem)",
        position: "sticky" as const,
        top: 0,
        zIndex: 100,
      }}>
        <a href="https://precisar.net" style={{ display: "block", lineHeight: 0 }}>
          <img
            src="/logo-precisar/logo-precisar.png"
            alt="Precisar"
            style={{
              height: "clamp(28px,4vw,36px)",
              width: "auto",
              filter: "brightness(0) invert(1)",
              opacity: 0.9,
            }}
          />
        </a>
      </div>
      <div style={{ width: "100%", maxWidth: 820, margin: "0 auto", paddingTop: "clamp(1rem,2vw,1.5rem)", paddingBottom: "clamp(4rem,8vw,6rem)" }}>

      <style dangerouslySetInnerHTML={{ __html: `
        [data-consulta-stacked] #consulta-flujo [class*="prompt"] { color: #0a0c12 !important; }
        [data-consulta-stacked] #consulta-flujo [class*="eyebrow"] { color: rgba(10,12,18,0.5) !important; }
        [data-consulta-stacked] #consulta-flujo [class*="helper"] { color: rgba(10,12,18,0.72) !important; }
        [data-consulta-stacked] #consulta-flujo [class*="navPrimarySolidInner"] { background: #0a0c12 !important; }
        [data-consulta-stacked] #consulta-flujo [class*="fill"] { background: linear-gradient(90deg,#1A0706,#DD0200) !important; }
        [data-consulta-stacked] #consulta-flujo [class*="segmentDone"],[data-consulta-stacked] #consulta-flujo [class*="segmentCurrent"] { background: #0a0c12 !important; }
        [data-consulta-stacked] #consulta-flujo [class*="navLightDock"] { background: rgba(255,255,255,0.96) !important; border: 1px solid rgba(0,0,0,0.06) !important; }
        [data-consulta-stacked] #consulta-flujo [class*="navGhost"] { color: rgba(10,12,18,0.5) !important; }
      ` }} />

      {/* Tabs tipo carpeta */}
      {futureBlocks.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column" as const }}>
          {[...futureBlocks].reverse().map((block, ri) => {
            const fromFront = futureBlocks.length - 1 - ri;
            return (
              <div key={block.n} style={{ marginBottom: ri < futureBlocks.length - 1 ? -6 : 0, zIndex: ri + 1, position: "relative" as const }}>
                <div style={{
                  background: block.bg,
                  borderRadius: "14px 14px 0 0",
                  padding: "0.65rem 1.5rem 0.85rem",
                  marginLeft: `${fromFront * 56}px`,
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderBottom: "none",
                  boxShadow: "0 -4px 16px rgba(0,0,0,0.15)",
                }}>
                  <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: block.fg === "#ffffff" ? "rgba(255,255,255,0.5)" : "rgba(10,12,18,0.4)", display: "block", marginBottom: "0.15rem" }}>{block.n}</span>
                  <span style={{ fontSize: "1rem", fontWeight: 800, color: block.fg, letterSpacing: "-0.025em", lineHeight: 1, display: "block" }}>{block.title}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Archivo principal */}
      <div style={{
        background: isIntro ? "#1A0706" : isComplete ? "#1A0706" : (currentBlock?.bg ?? "#1A0706"),
        borderRadius: futureBlocks.length > 0 ? "0 0 24px 24px" : "24px",
        minHeight: "clamp(520px,74vh,740px)",
        padding: "2.5rem",
        zIndex: 10,
        position: "relative" as const,
        boxShadow: "0 40px 80px rgba(0,0,0,0.55)",
        border: "1px solid rgba(255,255,255,0.07)",
        display: "flex",
        flexDirection: "column" as const,
        transition: "background 0.5s ease",
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
              Tu experiencia cambia cómo nos informamos todos.
            </p>
            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column" as const, gap: "0.75rem", alignItems: "flex-start" }}>
              <ConsultaStartButton />
              <a href="/legal/privacidad-consulta-2026" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                Política de privacidad →
              </a>
            </div>
          </div>
        )}

        {!isIntro && !isComplete && currentBlock && (
          <>
            <div style={{ marginBottom: "1.25rem" }}>
              <p style={{ margin: "0 0 0.35rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: currentBlock.fg === "#ffffff" ? "rgba(255,255,255,0.45)" : "rgba(10,12,18,0.45)" }}>
                {currentBlock.n} · respondiendo
              </p>
              <h2 style={{ margin: 0, fontSize: "clamp(1.5rem,3vw,2rem)", fontWeight: 800, color: currentBlock.fg, letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                {currentBlock.title}
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
    <footer style={{
      width: "100%",
      padding: "2rem clamp(1rem,3vw,2rem)",
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      gap: "0.75rem",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      marginTop: "2rem",
    }}>
      <a href="https://precisar.net" style={{ display: "block", lineHeight: 0 }}>
        <img
          src="/precisar-footer-wordmark.png"
          alt="Precisar"
          style={{
            height: 28,
            width: "auto",
            filter: "brightness(0) invert(1)",
            opacity: 0.45,
          }}
        />
      </a>
      <p style={{ margin: 0, fontSize: 10, letterSpacing: "0.12em", color: "rgba(255,255,255,0.25)", textAlign: "center" as const }}>
        Hecho con criterio en Chile 🇨🇱 y México 🇲🇽
      </p>
    </footer>
    </>
  );
}
