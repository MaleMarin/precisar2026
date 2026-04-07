import { Kicker } from "@/components/ui/Kicker";

const items = [
  {
    title: "Talleres prácticos online",
    body: "4 sesiones en vivo por Zoom con actividades manos a la obra y trabajo autónomo en plataforma.",
  },
  {
    title: "Comunidad de práctica",
    body: "Conexión con otros docentes para compartir experiencias, co-crear materiales y resolver desafíos.",
  },
  {
    title: "Recursos didácticos",
    body: "Guías, plantillas, videos y ejemplos listos para usar y adaptar en clases.",
  },
  {
    title: "Acompañamiento continuo",
    body: "Soporte y seguimiento personalizado para la implementación en sala.",
  },
];

export function MetodologiaGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ CÓMO TRABAJAMOS</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{ fontFamily: "var(--font-bebas), sans-serif", letterSpacing: "0.04em" }}
      >
        Metodología
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
        {items.map((it) => (
          <article
            key={it.title}
            style={{
              border: "0.5px solid rgba(219, 82, 39, 0.3)",
              borderRadius: 8,
              padding: "1rem",
            }}
          >
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
