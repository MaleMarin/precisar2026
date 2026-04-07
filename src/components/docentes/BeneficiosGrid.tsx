import { Kicker } from "@/components/ui/Kicker";

const items = [
  {
    title: "Estudiantes reflexivos y resilientes",
    body: "Habilidades para pensar críticamente, reconocer contenidos falsos y actuar con confianza en el mundo digital.",
  },
  {
    title: "Docentes empoderados",
    body: "Herramientas prácticas y enfoque pedagógico actualizado para liderar innovación educativa.",
  },
  {
    title: "Comunidad educativa fortalecida",
    body: "Estudiantes, docentes y familias colaborando en un uso más consciente de la tecnología.",
  },
  {
    title: "Seguridad y privacidad",
    body: "Reducción significativa de riesgos de ciberacoso y usos indebidos de la tecnología.",
  },
];

export function BeneficiosGrid() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ QUÉ SE LLEVA TU ESTABLECIMIENTO</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{ fontFamily: "var(--font-bebas), sans-serif", letterSpacing: "0.04em" }}
      >
        Beneficios para la comunidad escolar
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
