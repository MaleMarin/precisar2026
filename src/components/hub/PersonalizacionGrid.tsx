import { Kicker } from "@/components/ui/Kicker";

const cards = [
  {
    title: "Ediciones temáticas",
    body: "IA y algoritmos, desinformación, privacidad digital. Contenidos especializados según el foco del evento.",
  },
  {
    title: "Edición comunitaria",
    body: "Adaptada a la realidad de tu comuna. Con dinámicas de participación local y fórums vecinales.",
  },
  {
    title: "Componentes a la carta",
    body: "Pósters sueltos, mini-experimentos, kits de cultura digital para complementar lo que ya tienes.",
  },
  {
    title: "Activación previa al evento",
    body: "Módulos en pasillos o vestíbulos para que la audiencia llegue con la cabeza activada.",
  },
];

export function PersonalizacionGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ PERSONALIZACIÓN</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
        }}
      >
        A medida
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {cards.map((c) => (
          <article key={c.title} className="rounded-lg p-5" style={{ backgroundColor: "#111827" }}>
            <h3 className="text-base font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
              {c.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
