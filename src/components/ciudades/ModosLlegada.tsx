import { Kicker } from "@/components/ui/Kicker";

export function ModosLlegada() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <Kicker>■ CÓMO LLEGAMOS</Kicker>
      <h2
        className="mt-3 text-xl sm:text-2xl"
        style={{ fontFamily: "var(--font-bebas), sans-serif", letterSpacing: "0.04em" }}
      >
        Dos modos
      </h2>
      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <article
          style={{
            border: "1px solid #DB5227",
            borderRadius: 8,
            padding: "1.25rem",
          }}
        >
          <p style={{ color: "#DB5227", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em" }}>DIRECTO</p>
          <h3 className="mt-2 text-lg font-semibold">Talleres para vecinos</h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
            Experiencias para llegar a cualquier persona, sin importar edad ni nivel educacional.
          </p>
        </article>
        <article
          style={{
            border: "0.5px solid rgba(219, 82, 39, 0.25)",
            borderRadius: 8,
            padding: "1.25rem",
          }}
        >
          <p style={{ color: "#A0A0A0", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em" }}>
            MULTIPLICADOR
          </p>
          <h3 className="mt-2 text-lg font-semibold">Formación de formadores</h3>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
            Capacitamos a educadores, bibliotecarios y equipos municipales para que el impacto se expanda solo.
          </p>
        </article>
      </div>
    </section>
  );
}
