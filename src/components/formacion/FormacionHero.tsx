import { Kicker } from "@/components/ui/Kicker";

export function FormacionHero() {
  return (
    <header className="mx-auto w-full max-w-5xl px-4 pt-16 sm:px-6 sm:pt-24">
      <Kicker>■ FORMACIÓN · PRECISAR</Kicker>
      <h1
        className="mt-4 max-w-4xl"
        style={{
          fontFamily: "var(--font-bebas), sans-serif",
          fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
          lineHeight: 1.05,
          letterSpacing: "0.02em",
          whiteSpace: "pre-line",
        }}
      >
        Criterio digital.{"\n"}No teoría.
      </h1>
      <p className="mt-6 max-w-3xl" style={{ color: "#A0A0A0", fontSize: 16, lineHeight: 1.65 }}>
        Talleres para personas reales, no para auditorios cautivos. Sin jerga, sin sermones. Solo herramientas
        concretas para moverse mejor en un entorno donde la información sobra y el criterio escasea.
      </p>
    </header>
  );
}
