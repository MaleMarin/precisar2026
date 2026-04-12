import { Kicker } from "@/components/ui/Kicker";

export function FormacionHero() {
  return (
    <header className="mx-auto w-full max-w-5xl px-4 pt-16 sm:px-6 sm:pt-24">
      <Kicker>■ FORMACIÓN · PRECISAR</Kicker>
      <h1
        className="mt-4 max-w-4xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "var(--stack-panel-title-size)",
          maxWidth: "min(var(--stack-panel-title-maxw), 100%)",
          lineHeight: 1.02,
          letterSpacing: "-0.035em",
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
