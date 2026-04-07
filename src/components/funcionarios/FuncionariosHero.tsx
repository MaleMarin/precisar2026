import { Kicker } from "@/components/ui/Kicker";

export function FuncionariosHero() {
  return (
    <header className="mx-auto w-full max-w-5xl px-4 pt-16 sm:px-6 sm:pt-24">
      <Kicker>■ FUNCIONARIOS PÚBLICOS · PRECISAR</Kicker>
      <h1
        className="mt-4 max-w-4xl"
        style={{
          fontFamily: "var(--font-bebas), sans-serif",
          fontSize: "clamp(2.25rem, 5.5vw, 3.25rem)",
          lineHeight: 1.05,
          letterSpacing: "0.02em",
          whiteSpace: "pre-line",
        }}
      >
        La desinformación no es{"\n"}solo un problema social.{"\n"}Es un riesgo institucional.
      </h1>
      <p className="mt-6 max-w-3xl" style={{ color: "#A0A0A0", fontSize: 16, lineHeight: 1.65 }}>
        Programa de formación en Educación Mediática diseñado específicamente para la administración pública. Para que
        los servidores públicos naveguen, evalúen y comuniquen con criterio en un entorno saturado de información.
      </p>
    </header>
  );
}
