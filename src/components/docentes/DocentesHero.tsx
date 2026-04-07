import { Kicker } from "@/components/ui/Kicker";

export function DocentesHero() {
  return (
    <header className="mx-auto w-full max-w-5xl px-4 pt-16 sm:px-6 sm:pt-24">
      <Kicker>■ DOCENTES · PRECISAR</Kicker>
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
        Herramientas para el aula.{"\n"}No más carga de trabajo.
      </h1>
      <p className="mt-6 max-w-3xl" style={{ color: "#A0A0A0", fontSize: 16, lineHeight: 1.65 }}>
        Recursos didácticos, guías y actividades listas para incorporar en cualquier asignatura. Para que tus estudiantes
        desarrollen criterio digital sin que eso signifique más horas de preparación para ti.
      </p>
    </header>
  );
}
