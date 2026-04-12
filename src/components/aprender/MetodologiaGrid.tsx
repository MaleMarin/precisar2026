import { Kicker } from "@/components/ui/Kicker";

const items = [
  {
    title: "Sesiones híbridas",
    body: "Presencial y virtual, con apoyo individualizado en cada instancia.",
  },
  {
    title: "Aprendizaje entre pares",
    body: "Los participantes se apoyan mutuamente y co-crean materiales del taller.",
  },
  {
    title: "Acompañamiento continuo",
    body: "Línea de ayuda y encuentros mensuales de repaso para resolver dudas después del taller.",
  },
  {
    title: "Materiales accesibles",
    body: "Guías impresas y videos paso a paso para repasar a tu propio ritmo.",
  },
];

export function MetodologiaGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ CÓMO TRABAJAMOS</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
        }}
      >
        Metodología
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {items.map((it) => (
          <article key={it.title} className="rounded-lg p-5" style={{ backgroundColor: "#111827" }}>
            <h3 className="text-base font-semibold">{it.title}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
              {it.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
