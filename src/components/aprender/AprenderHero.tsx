import { Kicker } from "@/components/ui/Kicker";

export function AprenderHero() {
  return (
    <header className="mx-auto w-full max-w-5xl px-4 pt-16 sm:px-6 sm:pt-24">
      <Kicker>■ APRENDER DIGITAL · PRECISAR</Kicker>
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
        Nunca es tarde{"\n"}para entender el mundo digital.
      </h1>
      <p className="mt-6 max-w-3xl" style={{ color: "#A0A0A0", fontSize: 16, lineHeight: 1.65 }}>
        Un programa para personas adultas y mayores que quieren moverse con confianza en el entorno digital. Sin jerga
        técnica, sin prisa, con acompañamiento real. Porque tener conexión no es lo mismo que saber usarla bien.
      </p>
      <blockquote
        className="mt-8 max-w-3xl pl-5"
        style={{
          borderLeft: "3px solid #DB5227",
          color: "#A0A0A0",
          fontSize: "1.05rem",
          lineHeight: 1.6,
        }}
      >
        El 96,5% de Chile tiene conectividad. Eso no significa que todos naveguen con autonomía y sin riesgos. Esa brecha
        es la que cerramos.
      </blockquote>
    </header>
  );
}
