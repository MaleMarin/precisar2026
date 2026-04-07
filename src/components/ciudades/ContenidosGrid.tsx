import { Kicker } from "@/components/ui/Kicker";

const cards = [
  {
    title: "Inteligencia artificial",
    body: "Qué es, cómo opera en tu vida diaria y qué hacer cuando algo no cuadra.",
  },
  {
    title: "Desinformación",
    body: "Hechos vs. sentimientos. Cómo los titulares manipulan y cómo desarrollar criterio propio.",
  },
  {
    title: "Fraudes y estafas en línea",
    body: "Señales de alerta, contraseñas seguras, compras sin riesgo. Y qué hacer si ya fuiste víctima.",
  },
  {
    title: "Bienestar digital",
    body: "Pantallas, sueño, atención y relaciones. Cómo encontrar equilibrio sin dejar de estar conectado.",
  },
];

export function ContenidosGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ CONTENIDOS</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{ fontFamily: "var(--font-bebas), sans-serif", letterSpacing: "0.04em" }}
      >
        Qué abordamos
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {cards.map((c) => (
          <article
            key={c.title}
            style={{
              border: "0.5px solid rgba(219, 82, 39, 0.3)",
              borderRadius: 8,
              padding: "1rem",
            }}
          >
            <h3 className="text-base font-semibold" style={{ color: "#ffffff" }}>
              {c.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
              {c.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
