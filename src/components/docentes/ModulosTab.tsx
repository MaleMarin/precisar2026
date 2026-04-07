"use client";

import { Kicker } from "@/components/ui/Kicker";
import { useState } from "react";

const modulos = [
  {
    id: "m1",
    short: "M1",
    title: "Fundamentos de Educación Mediática Digital",
    body: "El impacto de los medios y plataformas en la vida cotidiana y su vínculo con los objetivos educativos. Cómo integrar la educación mediática en el aula a través de proyectos aplicados.",
  },
  {
    id: "m2",
    short: "M2",
    title: "Desinformación y Verificación",
    body: "Estrategias para enseñar verificación de datos, uso de herramientas de fact-checking y métodos para contrastar fuentes. Reconocer patrones de manipulación.",
  },
  {
    id: "m3",
    short: "M3",
    title: "Algoritmos e Inteligencia Artificial",
    body: "Cómo los algoritmos y la IA influyen en lo que vemos en línea. Sesgos de la IA, cómo evaluarlos y cómo crear condiciones de uso responsable de IA en el aula.",
  },
  {
    id: "m4",
    short: "M4",
    title: "Producción de Contenidos y Ciudadanía",
    body: "Guiar a estudiantes en la creación de texto, imagen y video con ética y respeto a la propiedad intelectual. Convertirlos en creadores conscientes, no solo consumidores.",
  },
  {
    id: "m5",
    short: "M5",
    title: "Seguridad, Privacidad y Bienestar Digital",
    body: "Ciberseguridad, protección de datos, gestión de la privacidad. Estrategias para prevenir ciberacoso y promover equilibrio digital.",
  },
  {
    id: "m6",
    short: "M6",
    title: "Integración Curricular y Proyectos",
    body: "Cómo integrar todo en diversas asignaturas. Ejemplos de proyectos exitosos y guía para diseñar actividades prácticas que culminen en proyectos significativos.",
  },
] as const;

export function ModulosTab() {
  const [active, setActive] = useState<(typeof modulos)[number]["id"]>("m1");
  const panel = modulos.find((m) => m.id === active)!;

  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ MÓDULOS FORMATIVOS</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{ fontFamily: "var(--font-bebas), sans-serif", letterSpacing: "0.04em" }}
      >
        Seis módulos
      </h2>
      <div className="mt-8 flex flex-col gap-6 lg:flex-row">
        <div className="flex flex-wrap gap-2 lg:w-56 lg:flex-col lg:flex-nowrap" role="tablist" aria-label="Módulos">
          {modulos.map((m) => {
            const on = m.id === active;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(m.id)}
                className="rounded-md px-3 py-2 text-left text-sm"
                style={{
                  border: on ? "1px solid #DB5227" : "0.5px solid rgba(219, 82, 39, 0.35)",
                  backgroundColor: on ? "#023661" : "transparent",
                  color: "#ffffff",
                }}
              >
                <span style={{ color: "#DB5227" }}>{m.short}</span> — {m.title}
              </button>
            );
          })}
        </div>
        <div
          role="tabpanel"
          className="min-w-0 flex-1 rounded-lg p-5 sm:p-6"
          style={{ border: "0.5px solid rgba(219, 82, 39, 0.25)", backgroundColor: "rgba(2, 54, 97, 0.2)" }}
        >
          <h3 className="text-lg font-semibold">{panel.title}</h3>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
            {panel.body}
          </p>
        </div>
      </div>
    </section>
  );
}
