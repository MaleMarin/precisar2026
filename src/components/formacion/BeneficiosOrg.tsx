import { Kicker } from "@/components/ui/Kicker";

const items = [
  {
    title: "Mejores decisiones",
    body: "Equipos que saben evaluar información actúan más rápido y con menos errores.",
  },
  {
    title: "Menos riesgo reputacional",
    body: "Nadie comparte ni actúa sobre datos falsos sin darse cuenta.",
  },
  {
    title: "Cultura interna más sólida",
    body: "Pensamiento crítico compartido reduce polarización y mejora la colaboración.",
  },
  {
    title: "Impacto que se expande",
    body: "Cada participante lleva las herramientas a su familia y comunidad.",
  },
];

export function BeneficiosOrg() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ PARA ORGANIZACIONES</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{ fontFamily: "var(--font-bebas), sans-serif", letterSpacing: "0.04em" }}
      >
        Qué se lleva tu equipo
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
