import { Kicker } from "@/components/ui/Kicker";

export function HubHero() {
  return (
    <header className="mx-auto w-full max-w-5xl px-4 pt-16 sm:px-6 sm:pt-24">
      <Kicker>■ HUB DIGITAL CONSCIENTE · PRECISAR</Kicker>
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
        La cultura digital{"\n"}entra por la puerta.
      </h1>
      <p
        className="mt-6 max-w-3xl"
        style={{ color: "#A0A0A0", fontFamily: "var(--font-body)", fontSize: 16, lineHeight: 1.65 }}
      >
        Una experiencia itinerante que lleva desinformación, algoritmos, privacidad e inteligencia artificial a plazas,
        municipios, bibliotecas, auditorios y eventos. Sin clase, sin sermón. Con conversación real.
      </p>
      <blockquote
        className="mt-8 max-w-3xl pl-5 italic"
        style={{
          borderLeft: "3px solid #DB5227",
          color: "#A0A0A0",
          fontFamily: "var(--font-body)",
          fontSize: "1.05rem",
          lineHeight: 1.6,
        }}
      >
        Traducimos conceptos complejos en experiencias que la gente toca, ve y debate. El pensamiento crítico no se
        enseña: se provoca.
      </blockquote>
    </header>
  );
}
