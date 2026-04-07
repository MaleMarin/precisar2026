export function ModalidadesRow() {
  return (
    <section className="mx-auto w-full max-w-5xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <article
          className="rounded-lg p-6"
          style={{ border: "0.5px solid rgba(219, 82, 39, 0.35)", backgroundColor: "rgba(2, 54, 97, 0.2)" }}
        >
          <p style={{ color: "#DB5227", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em" }}>ONLINE</p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
            Una sesión semanal, 90 min. Con facilitador/a. Actividades prácticas en tiempo real.
          </p>
        </article>
        <article
          className="rounded-lg p-6"
          style={{ border: "0.5px solid rgba(219, 82, 39, 0.35)", backgroundColor: "rgba(2, 54, 97, 0.2)" }}
        >
          <p style={{ color: "#DB5227", fontSize: 11, fontWeight: 600, letterSpacing: "0.14em" }}>PRESENCIAL</p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "#A0A0A0" }}>
            Grupos de hasta 15 personas. Talleres vivenciales, dinámicas grupales, materiales impresos.
          </p>
        </article>
      </div>
    </section>
  );
}
