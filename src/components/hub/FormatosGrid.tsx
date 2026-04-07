import { Kicker } from "@/components/ui/Kicker";
import type { CSSProperties } from "react";

type FormatCardProps = {
  tier: string;
  tierStyle: CSSProperties;
  title: string;
  specs: { label: string; value: string }[];
  includes: string[];
  featured?: boolean;
};

function FormatCard({ tier, tierStyle, title, specs, includes, featured }: FormatCardProps) {
  return (
    <article
      className="flex flex-col rounded-lg p-5 sm:p-6"
      style={{
        border: featured ? "1px solid #DB5227" : "0.5px solid rgba(219, 82, 39, 0.25)",
        backgroundColor: featured ? "rgba(2, 54, 97, 0.25)" : "transparent",
      }}
    >
      <span className="inline-block w-fit rounded px-2 py-1 text-[10px] font-semibold uppercase tracking-wider" style={tierStyle}>
        {tier}
      </span>
      <h3 className="mt-3 text-lg font-semibold" style={{ fontFamily: "var(--font-bebas), sans-serif" }}>
        {title}
      </h3>
      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#DB5227" }}>
          Especificaciones
        </p>
        <dl className="space-y-2 text-sm">
          {specs.map((row) => (
            <div key={row.label} className="flex flex-col gap-0.5 sm:flex-row sm:gap-2">
              <dt style={{ color: "#A0A0A0", minWidth: "7rem" }}>{row.label}</dt>
              <dd style={{ color: "#ffffff" }}>{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "#DB5227" }}>
          Incluye
        </p>
        <ul className="mt-2 space-y-2 text-sm" style={{ color: "#A0A0A0" }}>
          {includes.map((line) => (
            <li key={line} className="flex gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden className="mt-0.5 shrink-0">
                <circle cx="7" cy="7" r="3" fill="#DB5227" />
              </svg>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function FormatosGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ ELIGE TU FORMATO</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{ fontFamily: "var(--font-bebas), sans-serif", letterSpacing: "0.04em" }}
      >
        Formatos
      </h2>
      <p className="mt-4 max-w-3xl" style={{ color: "#A0A0A0", fontSize: 15, lineHeight: 1.65 }}>
        Tres formatos modulares que se adaptan al espacio, el tiempo y el público de tu evento.
      </p>
      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <FormatCard
          tier="Básico"
          tierStyle={{ backgroundColor: "#111827", color: "#A0A0A0" }}
          title="PIXEL · Para espacios reducidos"
          specs={[
            { label: "Espacio", value: "8–12 m²" },
            { label: "Instalación", value: "45–60 min" },
            { label: "Duración", value: "1–3 días" },
            { label: "Audiencia", value: "50–100 / día" },
          ]}
          includes={[
            "2 carteles temáticos",
            "1 pantalla de animación",
            "2 experiencias interactivas en tablet",
          ]}
        />
        <FormatCard
          featured
          tier="Estándar"
          tierStyle={{ backgroundColor: "#DB5227", color: "#ffffff" }}
          title="VECTOR · Para eventos medianos"
          specs={[
            { label: "Espacio", value: "15–25 m²" },
            { label: "Instalación", value: "2–3 horas" },
            { label: "Duración", value: "3 días – 2 semanas" },
            { label: "Audiencia", value: "100–300 / día" },
          ]}
          includes={[
            "3 carteles: algoritmos, desinformación, bots",
            "3 pantallas de animación en muro",
            "3 estaciones táctiles interactivas",
            "Experiencias para debate (opcional)",
          ]}
        />
        <FormatCard
          tier="Completo"
          tierStyle={{ backgroundColor: "#111827", color: "#A0A0A0" }}
          title="HOLO · Para instalaciones duraderas"
          specs={[
            { label: "Espacio", value: "30–50 m²" },
            { label: "Instalación", value: "4–6 horas" },
            { label: "Duración", value: "2 semanas – permanente" },
            { label: "Audiencia", value: "200–500 / día" },
          ]}
          includes={[
            "6 carteles visuales frontales y laterales",
            "3 animaciones de video con datos y narrativas",
            "4 aplicaciones interactivas co-diseñadas",
            "Zona central para debate y actividades guiadas",
            "Consultas o encuestas integradas",
          ]}
        />
      </div>
    </section>
  );
}
