import { Kicker } from "@/components/ui/Kicker";

const items = [
  {
    title: "Ciudadanía activa",
    body: "Vecinos que cuestionan, contrastan y participan con argumentos.",
  },
  {
    title: "Mayor seguridad digital",
    body: "Comunidades más resilientes frente a fraudes y amenazas en línea.",
  },
  {
    title: "Comprensión de la IA",
    body: "Personas que evalúan el contenido generado por algoritmos, no solo lo consumen.",
  },
  {
    title: "Bienestar colectivo",
    body: "Menos brecha digital, más inclusión social y vínculos comunitarios fortalecidos.",
  },
  {
    title: "Gobernanza transparente",
    body: "Equipos municipales con herramientas para comunicar mejor y rendir cuentas.",
  },
  {
    title: "Red de información",
    body: "Cultura digital que llega a plazas, centros de salud y espacios urbanos.",
  },
];

export function ImpactoGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ IMPACTO EN EL MUNICIPIO</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
        }}
      >
        Impacto
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
