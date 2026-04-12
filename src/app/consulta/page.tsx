import type { Metadata } from "next";
import type * as React from "react";
import { ConsultaFlowProvider } from "@/components/consulta/ConsultaFlowContext";
import { ConsultaHero } from "@/components/consulta/ConsultaHero";
import { ConsultaLiveMapProvider } from "@/components/consulta/ConsultaLiveMapProvider";
import { ConsultaPageShell } from "@/components/consulta/ConsultaPageShell";
import { ConsultaViewportCenter } from "@/components/consulta/ConsultaViewportCenter";
import { ConsultaWizardSlot } from "./ConsultaWizardSlot";

export const metadata: Metadata = {
  title: "¿Cómo te informas hoy? — Precisar",
  description:
    "Consulta ciudadana anónima de Precisar: 12 preguntas sobre cómo recibes, evalúas y compartes información. Menos de un minuto.",
  openGraph: {
    title: "¿Cómo te informas hoy?",
    description: "12 preguntas anónimas sobre tu relación con la información. Una iniciativa de Precisar.",
    url: "https://precisar.net/consulta",
  },
};

const C = {
  bean:    "#1A0706",
  cherry:  "#55100D",
  red:     "#DD0200",
  orange:  "#F74603",
  grey:    "#D9D9D9",
  greyMid: "rgba(217,217,217,0.55)",
  greyLow: "rgba(217,217,217,0.35)",
} as const;

const cardBase: React.CSSProperties = {
  borderRadius: 20,
  padding: "clamp(1.5rem, 3vw, 2rem)",
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  border: "1px solid rgba(255,255,255,0.06)",
};

function CardLabel({ n }: { n: string }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", textTransform: "uppercase" as const, color: "rgba(217,217,217,0.55)" }}>
      {n}
    </span>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ margin: 0, fontSize: "clamp(1.15rem, 2.2vw, 1.45rem)", fontWeight: 800, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.1 }}>
      {children}
    </h2>
  );
}

function CardBody({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ margin: 0, fontSize: "0.8125rem", color: "rgba(217,217,217,0.55)", lineHeight: 1.65 }}>
      {children}
    </p>
  );
}

function CardList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "0.35rem 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column" as const, gap: "0.3rem" }}>
      {items.map((q) => (
        <li key={q} style={{ fontSize: "0.75rem", color: "rgba(217,217,217,0.35)", paddingLeft: "0.9rem", position: "relative" as const, lineHeight: 1.5 }}>
          <span style={{ position: "absolute" as const, left: 0, color: "#F74603" }}>—</span>
          {q}
        </li>
      ))}
    </ul>
  );
}

export default function ConsultaPage() {
  return (
    <ConsultaLiveMapProvider>
      <ConsultaPageShell variant="liveMap">
        <ConsultaFlowProvider>
          <ConsultaViewportCenter>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(0.65rem, 1.5vw, 1rem)", width: "100%" }}>

              <div style={{ ...cardBase, background: C.bean, padding: 0, overflow: "hidden" }}>
                <ConsultaHero />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "clamp(0.65rem, 1.5vw, 1rem)" }}>

                <div style={{ ...cardBase, background: C.cherry }}>
                  <CardLabel n="02 · 3 preguntas" />
                  <CardTitle>Confianza e información</CardTitle>
                  <CardBody>Qué te preocupa, qué te daría seguridad y cuánta confianza tienes en lo que recibes.</CardBody>
                  <CardList items={["¿Qué te preocupa más?", "¿Qué te daría seguridad?", "¿Cuánta confianza tienes?"]} />
                </div>

                <div style={{ ...cardBase, background: C.red }}>
                  <CardLabel n="03 · 3 preguntas" />
                  <CardTitle>Cómo procesas lo que llega</CardTitle>
                  <CardBody>Qué haces cuando dudas, qué formatos te sirven y qué adaptaciones necesitas.</CardBody>
                  <CardList items={["¿Qué haces si dudas?", "¿Qué formato te ayuda?", "¿Necesitas adaptaciones?"]} />
                </div>

                <div style={{ ...cardBase, background: C.orange }}>
                  <CardLabel n="04 · 3 preguntas" />
                  <CardTitle>IA, tu visión y tu contexto</CardTitle>
                  <CardBody>Qué quieres saber sobre IA, cómo sería tu experiencia ideal y datos básicos opcionales.</CardBody>
                  <CardList items={["¿Qué necesitas saber sobre IA?", "Tu experiencia informativa ideal", "Datos básicos (opcionales)"]} />
                </div>

              </div>

              <div style={{ ...cardBase, background: "rgba(217,217,217,0.06)", flexDirection: "row" as const, alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "1rem" }}>
                <p style={{ margin: 0, fontSize: "0.8125rem", color: "rgba(217,217,217,0.35)", maxWidth: "36rem", lineHeight: 1.6 }}>
                  No guardamos datos personales. Solo nos interesa el patrón colectivo para diseñar mejores herramientas de educación mediática.{" "}
                  <a href="/legal/privacidad-consulta-2026" style={{ color: "rgba(217,217,217,0.55)", textDecoration: "underline", textUnderlineOffset: 3 }}>
                    Política de privacidad →
                  </a>
                </p>
                <ConsultaWizardSlot />
              </div>

            </div>
          </ConsultaViewportCenter>
        </ConsultaFlowProvider>
      </ConsultaPageShell>
    </ConsultaLiveMapProvider>
  );
}
