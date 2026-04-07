"use client";

import { Kicker } from "@/components/ui/Kicker";
import { useState } from "react";

const tabs = [
  {
    id: "ia",
    label: "IA y su impacto",
    sessions: [
      "Desmitificando la IA: qué es, cómo funciona, impacto en las personas",
      "Vivir con algoritmos: relación entre algoritmos, IA y aprendizaje automático",
      "Desafíos de la IA 1: sesgos amplificados",
      "Desafíos de la IA 2: acoso en línea",
    ],
  },
  {
    id: "des",
    label: "Desinformación",
    sessions: [
      "Hechos vs. Sentimientos: trucos que provocan emociones e influyen en el comportamiento",
      "Entre Líneas: definir desinformación, practicar habilidades de investigación básica",
    ],
  },
  {
    id: "fraudes",
    label: "Fraudes y Estafas",
    sessions: [
      "Señales de alerta: correos falsos, mensajes sospechosos, llamadas fraudulentas",
      "Buenas prácticas de contraseña y autenticación fuerte",
      "Compras y pagos seguros: detectar sitios fraudulentos",
      "¿Y si ya fui víctima?: pasos para reportar y recuperar control",
    ],
  },
  {
    id: "bienestar",
    label: "Bienestar Digital",
    sessions: [
      "Pantallas y Cerebro: impacto del uso excesivo en sueño y concentración",
      "Rutas de Desconexión: hábitos para gestionar tiempos de uso",
      "Dinámicas Intergeneracionales: jóvenes y mayores diseñan acuerdos comunitarios",
    ],
  },
] as const;

export function ProgramasTab() {
  const [active, setActive] = useState<(typeof tabs)[number]["id"]>("ia");
  const panel = tabs.find((t) => t.id === active)!;

  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ PROGRAMAS</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{ fontFamily: "var(--font-bebas), sans-serif", letterSpacing: "0.04em" }}
      >
        Ejes formativos
      </h2>
      <div
        className="mt-6 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Programas por eje"
      >
        {tabs.map((t) => {
          const isOn = t.id === active;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={isOn}
              onClick={() => setActive(t.id)}
              className="rounded-md px-3 py-2 text-left text-sm transition-opacity"
              style={{
                border: isOn ? "1px solid #DB5227" : "0.5px solid rgba(219, 82, 39, 0.35)",
                backgroundColor: isOn ? "#023661" : "transparent",
                color: "#ffffff",
                opacity: isOn ? 1 : 0.85,
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        className="mt-8 rounded-lg p-5 sm:p-6"
        style={{ border: "0.5px solid rgba(219, 82, 39, 0.25)", backgroundColor: "rgba(2, 54, 97, 0.2)" }}
      >
        <p className="text-sm font-medium" style={{ color: "#DB5227" }}>
          Sesiones
        </p>
        <ul className="mt-4 space-y-3">
          {panel.sessions.map((s) => (
            <li key={s} className="flex gap-3 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: "#DB5227" }} />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
