import { Kicker } from "@/components/ui/Kicker";

const cards = [
  {
    title: "Carteles temáticos",
    body: "Diseñados para provocar, no para decorar. Cada póster es un abre ojos: información clave presentada de forma visual e inmediata.",
  },
  {
    title: "Animaciones de video",
    body: "Historias visuales sobre privacidad, noticias falsas, IA y dilemas éticos digitales. Para ver, no solo leer.",
  },
  {
    title: "Aplicaciones interactivas",
    body: "Simuladores, juegos y experiencias táctiles que muestran cómo operan los algoritmos y qué pasa con tus datos. Con realidad aumentada cuando el contexto lo amerita.",
  },
  {
    title: "Experiencias para el debate",
    body: "Dinámicas para activar conversación entre participantes. El complemento ideal antes de talleres, charlas o actividades programadas.",
  },
];

export function ElementosGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ QUÉ INCLUYE</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
        }}
      >
        Qué hay en cada instalación
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
            <h3 className="text-base font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
              {c.body}
            </p>
          </article>
        ))}
      </div>
      <p className="mt-8 text-[13px]" style={{ color: "#A0A0A0" }}>
        Pensado para cualquier edad y nivel educacional. Sin requisitos previos.
      </p>
    </section>
  );
}
