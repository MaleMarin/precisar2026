import { Kicker } from "@/components/ui/Kicker";

const modulos = [
  {
    title: "Educación Mediática Digital",
    body: "Cómo identificar desinformación, reconocer sesgos y distinguir imágenes manipuladas. Pensamiento crítico aplicado a lo que llega al celular todos los días.",
  },
  {
    title: "Navegación Segura",
    body: "Fraudes, phishing, contraseñas, privacidad en redes. Herramientas para navegar sin miedo y sin ingenuidad.",
  },
  {
    title: "Inteligencia Artificial",
    body: "Qué puede hacer la IA hoy, cómo opera en los asistentes de voz y recomendaciones, y cómo interactuar con ella de forma consciente.",
  },
  {
    title: "Bienestar Digital",
    body: "Tiempo de pantalla, relaciones digitales y vínculos presenciales. La tecnología como complemento, no como sustituto.",
  },
];

function Dot() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden className="mt-2 shrink-0">
      <circle cx="5" cy="5" r="4" fill="#DB5227" />
    </svg>
  );
}

export function ModulosSection() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ MÓDULOS</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          letterSpacing: "-0.035em",
          lineHeight: 1.1,
        }}
      >
        Cuatro módulos
      </h2>
      <ul className="mt-10 divide-y" style={{ borderColor: "rgba(219, 82, 39, 0.25)" }}>
        {modulos.map((m) => (
          <li key={m.title} className="flex gap-4 py-8 first:pt-0">
            <Dot />
            <div>
              <h3 className="text-lg font-semibold">{m.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
                {m.body}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
