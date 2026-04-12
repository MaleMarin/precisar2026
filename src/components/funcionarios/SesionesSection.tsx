import { Kicker } from "@/components/ui/Kicker";

const sesiones = [
  {
    title: "Sesión 1 · Una vida llena de medios",
    body: "El rol central de los medios en la sociedad. Cuatro niveles de análisis: plataforma, contenido, industria y entorno.",
  },
  {
    title: "Sesión 2 · Cómo funcionan los medios digitales",
    body: "Digitalización, algoritmos, cámaras de eco y polarización. Qué pasa dentro de las plataformas.",
  },
  {
    title: "Sesiones 3 y 4 · Confiabilidad y evaluación de la información",
    body: "Gestión de la sobrecarga informativa. Cómo evaluar fuentes: autor, contexto y contenido. Deepfakes y desinformación intencional.",
  },
  {
    title: "Sesión 5 · Interacción en medios de comunicación",
    body: "Herramientas para comunicación efectiva y fomento de la participación ciudadana.",
  },
  {
    title: "Sesión 6 · Uso de redes sociales en la administración pública",
    body: "Oportunidades y responsabilidades. Los funcionarios deben actuar de forma imparcial, independiente y justa.",
  },
  {
    title: "Sesiones 7 y 8 · Resumen y autoevaluación",
    body: "Reflexión sobre los objetivos de la educación mediática en el trabajo público. Evaluación del aprendizaje para llevarlo a la práctica.",
  },
];

export function SesionesSection() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ 8 SESIONES</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
        }}
      >
        Estructura del curso
      </h2>
      <ul className="mt-10 divide-y" style={{ borderColor: "rgba(219, 82, 39, 0.25)" }}>
        {sesiones.map((s) => (
          <li key={s.title} className="py-8 first:pt-0">
            <h3 className="text-base font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
              {s.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
