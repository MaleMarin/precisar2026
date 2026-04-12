import { Kicker } from "@/components/ui/Kicker";

const items = [
  {
    title: "Toma de decisiones informada",
    body: "Funcionarios capaces de buscar, filtrar y evaluar información relevante y fiable. Mejor desempeño, menos errores.",
  },
  {
    title: "Comunicación pública más efectiva",
    body: "Herramientas para una comunicación transparente a través de medios y redes. Más confianza ciudadana en la institución.",
  },
  {
    title: "Reducción de riesgos institucionales",
    body: "Comprensión de algoritmos, cámaras de eco, deepfakes y propaganda. Protección activa de la reputación institucional.",
  },
  {
    title: "Cultura de pensamiento crítico",
    body: "Mentalidad analítica entre colaboradores. Gestión pública moderna, responsable y menos vulnerable a la manipulación.",
  },
];

export function BeneficiosGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ QUÉ SE LLEVA TU INSTITUCIÓN</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
        }}
      >
        Beneficios
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
