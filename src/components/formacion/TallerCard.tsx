import type { ReactNode } from "react";

type Modulo = { n: string; title: string; body: string };

export type TallerCardProps = {
  label: string;
  title: string;
  hook: string;
  description: string;
  outcomes: string[];
  modulos: Modulo[];
};

function DotLi({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-3 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
      <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden className="mt-1.5 shrink-0">
        <circle cx="4" cy="4" r="3" fill="var(--brand-flame-text)" />
      </svg>
      <span>{children}</span>
    </li>
  );
}

export function TallerCard({ label, title, hook, description, outcomes, modulos }: TallerCardProps) {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-12 sm:py-16">
      <p style={{ color: "var(--brand-flame-text)", fontSize: 12, fontWeight: 600, letterSpacing: "0.12em" }}>{label}</p>
      <h2
        className="mt-3 max-w-3xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(1.85rem, 4vw, 2.5rem)",
          letterSpacing: "-0.035em",
          lineHeight: 1.08,
          whiteSpace: "pre-line",
        }}
      >
        {title}
      </h2>
      <p className="mt-4 max-w-3xl text-base font-medium" style={{ color: "var(--brand-flame-text)" }}>
        {hook}
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
        {description}
      </p>
      <p className="mt-8 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--brand-flame-text)" }}>
        Al terminar podrás
      </p>
      <ul className="mt-4 max-w-3xl space-y-3">
        {outcomes.map((o) => (
          <DotLi key={o}>{o}</DotLi>
        ))}
      </ul>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
        {modulos.map((m) => (
          <article
            key={m.n}
            style={{
              border: "0.5px solid rgba(255, 75, 11, 0.25)",
              borderRadius: 8,
              padding: "1rem",
            }}
          >
            <p className="text-xs font-semibold" style={{ color: "var(--brand-flame-text)" }}>
              {m.n}
            </p>
            <h3 className="mt-1 text-base font-semibold">{m.title}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
              {m.body}
            </p>
          </article>
        ))}
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        {["Medio día · 4 horas", "Día completo · 7 horas"].map((pill) => (
          <span
            key={pill}
            className="px-4 py-2 text-sm"
            style={{
              border: "0.5px solid rgba(255, 75, 11, 0.45)",
              borderRadius: 20,
              color: "#A0A0A0",
            }}
          >
            {pill}
          </span>
        ))}
      </div>
    </section>
  );
}
