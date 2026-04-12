import { Kicker } from "@/components/ui/Kicker";

export function CiudadesHero() {
  return (
    <header className="mx-auto w-full max-w-5xl px-4 pt-16 sm:px-6 sm:pt-24">
      <Kicker>■ CIUDADES · PRECISAR</Kicker>
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
        Cultura digital{"\n"}para toda la ciudad.
      </h1>
      <p
        className="mt-6 max-w-[600px]"
        style={{ color: "#A0A0A0", fontSize: 16, lineHeight: 1.65 }}
      >
        Llevamos formación en criterio digital directamente a los municipios. Talleres para vecinos de todas las
        edades, y estrategias para que educadores, bibliotecarios y equipos municipales multipliquen el impacto en
        sus comunidades.
      </p>
      <p
        className="mt-5 max-w-2xl italic"
        style={{ color: "#DB5227", fontSize: 14, lineHeight: 1.55 }}
      >
        Inspirado en el marco &apos;Ciudades AMI&apos; de la UNESCO, adaptado a la realidad local.
      </p>
    </header>
  );
}
