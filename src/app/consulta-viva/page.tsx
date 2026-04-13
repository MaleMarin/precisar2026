"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { QuickResponseForm } from "@/components/consulta-viva/QuickResponseForm";
import { LATAM_COUNTRIES } from "@/lib/consulta-viva/countries";
import {
  aggregateByCountry,
  CONCERN_LABELS,
  SOURCE_LABELS,
  sumRecentBySource,
} from "@/lib/consulta-viva/aggregations";
import { createMockResponse, seedMockResponses } from "@/lib/consulta-viva/mockResponses";
import type { LiveResponse, SourceType } from "@/lib/consulta-viva/types";

const SOURCE_ORDER: SourceType[] = ["social", "whatsapp", "tv_radio", "news", "ai"];
const SOURCE_COLORS: Record<SourceType, string> = {
  social:   "#F74603",
  whatsapp: "#DD0200",
  tv_radio: "#55100D",
  news:     "#8B1A0A",
  ai:       "#3D0A04",
};

export default function ConsultaVivaPage() {
  const [responses, setResponses] = useState<LiveResponse[]>(() => seedMockResponses(48));
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const iv = setInterval(() => {
      setResponses((prev) => [...prev.slice(-299), createMockResponse()]);
      setNow(Date.now());
    }, 1800);
    return () => clearInterval(iv);
  }, []);

  const signals = useMemo(() => aggregateByCountry(responses, now), [responses, now]);
  const totalResponses = responses.length;
  const recentBySource = useMemo(() => sumRecentBySource(signals), [signals]);
  const totalRecent = Object.values(recentBySource).reduce((a, b) => a + b, 0);
  const maxSourceCount = Math.max(...SOURCE_ORDER.map((s) => recentBySource[s]), 1);
  const lastAt = useMemo(() => Math.max(...responses.map((r) => r.createdAt)), [responses]);
  const secondsAgo = Math.round((now - lastAt) / 1000);

  const activeCountries = useMemo(
    () => signals.filter((s) => s.responsesTotal > 0).sort((a, b) => b.responsesTotal - a.responsesTotal),
    [signals]
  );

  const topConcern = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of responses.slice(-50)) counts[r.concern] = (counts[r.concern] ?? 0) + 1;
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] as keyof typeof CONCERN_LABELS | undefined;
  }, [responses]);

  const recentStream = useMemo(() => responses.slice(-6).reverse().map((r) => ({
    country: LATAM_COUNTRIES.find((c) => c.iso === r.countryIso)?.country ?? r.countryIso,
    source: SOURCE_LABELS[r.source],
  })), [responses]);

  const handleSubmit = useCallback((r: LiveResponse) => {
    setResponses((prev) => [...prev.slice(-299), r]);
  }, []);

  return (
    <main style={{ background: "#0A0C12", minHeight: "100vh", color: "#F5F2EC" }}>
      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}`}</style>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem clamp(1.5rem,4vw,3rem)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <a href="https://precisar.net" style={{ lineHeight: 0 }}>
          <img src="/logo-precisar/logo-precisar.png" alt="Precisar" style={{ height: 28, width: "auto", filter: "brightness(0) invert(1)", opacity: 0.7 }} />
        </a>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F74603", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.45)" }}>En vivo</span>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(2rem,4vw,3.5rem) clamp(1.5rem,4vw,3rem)" }}>

        <div style={{ marginBottom: "2rem" }}>
          <p style={{ margin: "0 0 0.5rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(247,70,3,0.8)" }}>Precisar · Observatorio en vivo</p>
          <h1 style={{ margin: 0, fontSize: "clamp(1.75rem,4vw,3rem)", fontWeight: 800, letterSpacing: "-0.04em", color: "#F5F2EC" }}>¿Cómo se informa América Latina?</h1>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: 20, overflow: "hidden", marginBottom: "1.5rem" }}>
          {[
            { label: "Respuestas totales", value: totalResponses.toLocaleString(), color: "#F74603" },
            { label: "Activas (5 min)", value: totalRecent.toString(), color: "#DD0200" },
            { label: "Países activos", value: activeCountries.length.toString(), color: "#55100D" },
            { label: "Última respuesta", value: `${secondsAgo}s`, color: "rgba(255,255,255,0.4)" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#111318", padding: "1.75rem 1.5rem" }}>
              <p style={{ margin: "0 0 0.5rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>{s.label}</p>
              <p style={{ margin: 0, fontSize: "clamp(2rem,4vw,2.75rem)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1, color: s.color }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.5rem" }}>
          <div style={{ background: "#111318", borderRadius: 20, padding: "1.75rem", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p style={{ margin: "0 0 1.5rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>Cómo se informan ahora</p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.85rem" }}>
              {SOURCE_ORDER.map((src) => {
                const count = recentBySource[src];
                const pct = Math.round((count / maxSourceCount) * 100);
                return (
                  <div key={src}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 600, color: "rgba(255,255,255,0.7)" }}>{SOURCE_LABELS[src]}</span>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: SOURCE_COLORS[src] }}>{count}</span>
                    </div>
                    <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: SOURCE_COLORS[src], borderRadius: 999, transition: "width 0.8s cubic-bezier(0.4,0,0.2,1)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ background: "#111318", borderRadius: 20, padding: "1.75rem", border: "1px solid rgba(255,255,255,0.05)" }}>
            <p style={{ margin: "0 0 1.5rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>Señales recientes</p>
            <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.65rem" }}>
              {recentStream.map((r, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", opacity: 1 - i * 0.12 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F74603", flexShrink: 0, opacity: i === 0 ? 1 : 0.35 }} />
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#F5F2EC" }}>{r.country}</span>
                  <span style={{ fontSize: "0.8125rem", color: "rgba(255,255,255,0.4)" }}>vía {r.source}</span>
                </div>
              ))}
            </div>
            {topConcern && (
              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(247,70,3,0.1)", borderRadius: 12, border: "1px solid rgba(247,70,3,0.2)" }}>
                <p style={{ margin: "0 0 0.2rem", fontSize: 9, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>Preocupación más frecuente</p>
                <p style={{ margin: 0, fontSize: "0.9375rem", fontWeight: 800, color: "#F74603" }}>{CONCERN_LABELS[topConcern]}</p>
              </div>
            )}
          </div>
        </div>

        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ margin: "0 0 1rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>Países activos</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(155px,1fr))", gap: "1px", background: "rgba(255,255,255,0.06)", borderRadius: 16, overflow: "hidden" }}>
            {activeCountries.slice(0, 12).map((sig) => (
              <div key={sig.iso} style={{ background: "#111318", padding: "1rem 1.25rem", borderLeft: sig.pulseIntensity > 0.3 ? "2px solid #F74603" : "2px solid transparent", transition: "border-color 0.3s ease" }}>
                <p style={{ margin: "0 0 0.2rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.35)" }}>{sig.iso}</p>
                <p style={{ margin: "0 0 0.4rem", fontSize: "0.875rem", fontWeight: 800, color: "#F5F2EC", lineHeight: 1.2 }}>{sig.name}</p>
                <p style={{ margin: 0, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{sig.responsesTotal} resp.</p>
                {sig.dominantSource && (
                  <p style={{ margin: "0.2rem 0 0", fontSize: 9, fontWeight: 700, color: SOURCE_COLORS[sig.dominantSource], letterSpacing: "0.1em", textTransform: "uppercase" as const }}>{SOURCE_LABELS[sig.dominantSource]}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: "#111318", borderRadius: 20, padding: "2rem", border: "1px solid rgba(255,255,255,0.05)", marginBottom: "2rem" }}>
          <p style={{ margin: "0 0 0.4rem", fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.3)" }}>Sumá tu señal</p>
          <p style={{ margin: "0 0 1.5rem", fontSize: "0.9375rem", color: "rgba(255,255,255,0.5)" }}>Tu respuesta aparece en el tablero al instante.</p>
          <QuickResponseForm defaultIso="CL" onSubmitOptimistic={handleSubmit} />
        </div>

        <div style={{ textAlign: "center" as const, paddingBottom: "3rem" }}>
          <Link href="/consulta" style={{ fontSize: "0.875rem", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}>← Volver al formulario completo</Link>
        </div>
      </div>
    </main>
  );
}
