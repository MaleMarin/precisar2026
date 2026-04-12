import { Kicker } from "@/components/ui/Kicker";

const steps = [
  {
    n: 1,
    title: "Elige tu formato",
    body: "Pixel, Vector o Holo según tu espacio, duración y objetivos.",
    accent: true,
  },
  {
    n: 2,
    title: "Cuéntanos tu contexto",
    body: "Indica el evento, para quién es y dónde será. Cuántos más detalles compartas, mejor el resultado.",
    accent: false,
  },
  {
    n: 3,
    title: "Co-creamos juntos",
    body: "Afinamos contenidos, montaje y cronograma. Tú no instalas nada, nosotros nos encargamos del impacto.",
    accent: false,
  },
];

export function StepsSection() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ CÓMO FUNCIONA</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
        }}
      >
        Tres pasos
      </h2>
      <ol className="mt-10 space-y-8">
        {steps.map((s) => (
          <li key={s.n} className="flex gap-4 sm:gap-6">
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold"
              style={{
                backgroundColor: s.accent ? "#DB5227" : "#023661",
                color: "#ffffff",
              }}
              aria-hidden
            >
              {s.n}
            </div>
            <div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
                {s.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
