"use client";
import type * as React from "react";
import { ConsultaFlowProvider } from "@/components/consulta/ConsultaFlowContext";
import { ConsultaLiveMapProvider } from "@/components/consulta/ConsultaLiveMapProvider";
import { ConsultaPageShell } from "@/components/consulta/ConsultaPageShell";
import { ConsultaViewportCenter } from "@/components/consulta/ConsultaViewportCenter";
import { ConsultaWizardSlot } from "./ConsultaWizardSlot";

export const metadata = {
  title: "¿Cómo te informas hoy? — Precisar",
  description: "Consulta ciudadana anónima de Precisar: 12 preguntas sobre cómo recibes, evalúas y compartes información.",
};

export default function ConsultaPage() {
  return (
    <ConsultaLiveMapProvider>
      <ConsultaPageShell variant="liveMap">
        <ConsultaFlowProvider>
          <ConsultaViewportCenter>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(2rem, 5vw, 4rem)", alignItems: "center", minHeight: "80vh", width: "100%" }}>

              {/* Columna izquierda */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase" as const, color: "rgba(221,2,0,0.8)" }}>
                  Precisar · Consulta ciudadana 2026
                </p>
                <h1 style={{ margin: 0, fontSize: "clamp(2.8rem, 5.5vw, 5rem)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.045em", color: "#ffffff" }}>
                  ¿Cómo te<br />informas<br />hoy?
                </h1>
                <p style={{ margin: 0, fontSize: "1rem", lineHeight: 1.65, color: "rgba(255,255,255,0.62)", maxWidth: "32rem" }}>
                  Tu experiencia cambia cómo nos informamos todos. Queremos entender qué formatos te ayudan, qué tono te genera confianza y qué necesitas para decidir con más criterio.
                </p>
                <div style={{ display: "flex", gap: "0.65rem", flexWrap: "wrap" as const }}>
                  {["Anónima", "12 preguntas", "Menos de un minuto"].map((tag) => (
                    <span key={tag} style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)", padding: "4px 10px", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 999 }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div style={{ marginTop: "0.5rem" }}>
                  <ConsultaWizardSlot />
                </div>
                <a href="/legal/privacidad-consulta-2026" style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", textDecoration: "none", letterSpacing: "0.08em", textTransform: "uppercase" as const }}>
                  Política de privacidad →
                </a>
              </div>

              {/* Columna derecha: stacked cards */}
              <div style={{ position: "relative" as const, height: 680, width: "100%" }}>
                <div style={{ position: "absolute" as const, inset: 0, background: "radial-gradient(circle at 50% 40%, rgba(221,2,0,0.4), transparent 65%)", pointerEvents: "none" as const, zIndex: 0 }} />

                {/* Capa 1 */}
                <div style={{ position: "absolute" as const, top: 0, left: "2%", right: "2%", height: 520, borderRadius: 40, background: "rgba(221,2,0,0.30)", backdropFilter: "blur(18px)", transform: "scale(0.94)", transformOrigin: "top center", zIndex: 1, boxShadow: "0 30px 80px rgba(221,2,0,0.18)" }} />

                {/* Capa 2 */}
                <div style={{ position: "absolute" as const, top: 50, left: "1%", right: "1%", height: 520, borderRadius: 40, background: "rgba(221,2,0,0.55)", backdropFilter: "blur(14px)", transform: "scale(0.96)", transformOrigin: "top center", zIndex: 2, boxShadow: "0 30px 80px rgba(221,2,0,0.22)" }} />

                {/* Capa 3 — rojo sólido */}
                <div style={{ position: "absolute" as const, top: 100, left: 0, right: 0, height: 520, borderRadius: 40, background: "#DD0200", transform: "scale(0.98)", transformOrigin: "top center", zIndex: 3, boxShadow: "0 30px 80px rgba(221,2,0,0.35)", padding: "2rem 2rem 0", overflow: "hidden" as const }}>
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem" }}>03 · Cómo procesas lo que llega</p>
                  <p style={{ margin: 0, fontSize: "1.15rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.2 }}>Qué haces cuando dudas, qué formatos te sirven.</p>
                </div>

                {/* Capa 4 — blanca */}
                <div style={{ position: "absolute" as const, top: 200, left: 0, right: 0, height: 280, borderRadius: 38, background: "#F5F2EC", zIndex: 4, boxShadow: "0 25px 60px rgba(0,0,0,0.35)", padding: "1.75rem 2rem", overflow: "hidden" as const }}>
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(10,12,18,0.4)", marginBottom: "0.5rem" }}>01 · Cómo te informas</p>
                  <h3 style={{ margin: "0 0 0.65rem", fontSize: "1.35rem", fontWeight: 800, color: "#0A0C12", letterSpacing: "-0.03em", lineHeight: 1.15 }}>Canales, razones y temas que sigues para entender lo que pasa.</h3>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.3rem", marginTop: "0.75rem" }}>
                    {["¿Por dónde te informas?", "¿Por qué esos canales?", "¿Qué temas sigues?"].map((q) => (
                      <p key={q} style={{ margin: 0, fontSize: "0.8125rem", color: "rgba(10,12,18,0.55)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ color: "#DD0200", fontWeight: 700 }}>—</span>{q}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Capa 5 — negra */}
                <div style={{ position: "absolute" as const, top: 390, left: 0, right: 0, height: 280, borderRadius: 38, background: "#1A0706", zIndex: 5, boxShadow: "0 40px 90px rgba(0,0,0,0.6)", padding: "1.75rem 2rem", border: "1px solid rgba(221,2,0,0.2)" }}>
                  <p style={{ margin: 0, fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(221,2,0,0.7)", marginBottom: "0.5rem" }}>02 · 04 · Confianza · IA y contexto</p>
                  <h3 style={{ margin: "0 0 0.65rem", fontSize: "1.35rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.03em", lineHeight: 1.15 }}>Qué te preocupa, cómo ves la IA y cuál sería tu experiencia ideal.</h3>
                  <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.3rem", marginTop: "0.75rem" }}>
                    {["¿Qué te genera confianza?", "¿Qué quieres saber sobre IA?", "Tu experiencia informativa ideal"].map((q) => (
                      <p key={q} style={{ margin: 0, fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ color: "#DD0200", fontWeight: 700 }}>—</span>{q}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ConsultaViewportCenter>
        </ConsultaFlowProvider>
      </ConsultaPageShell>
    </ConsultaLiveMapProvider>
  );
}
