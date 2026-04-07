import { PageShell } from "@/components/PageShell";
import { PreguntaDiaCards } from "@/components/saberes/PreguntaDiaCards";
import { PDF_DOWNLOAD_UI } from "@/lib/pdfDownloads";

export const metadata = {
  title: "Una Pregunta al Día",
  description:
    "Treinta días, treinta preguntas sobre cómo vives en línea. Tarjetas con frente y reverso; descarga el PDF para compartir en clase, trabajo o familia.",
};

export default function Page() {
  return (
    <PageShell title="Una Pregunta al Día" kicker="Recurso" bare>
      <div className="prose-precisar max-w-none space-y-6">
        <div className="space-y-3">
          <p className="text-xl font-semibold leading-snug tracking-tight text-[var(--fg)] sm:text-2xl">
            Treinta días. Treinta preguntas sobre cómo vives en línea.
          </p>
          <p className="text-lg text-[var(--muted)]">No para juzgarte. Para que te conozcas un poco mejor.</p>
        </div>

        <div className="space-y-4">
          <h2 className="!mt-2 text-xl font-semibold tracking-tight text-[var(--fg)]">
            Cada tarjeta tiene dos caras
          </h2>
          <p>
            En el frente, la pregunta del día. En el reverso, algo para ir más lejos: una idea, un pequeño
            desafío, otra manera de mirar lo que haces todos los días con una pantalla.
          </p>
          <p className="font-medium text-[var(--fg)]">No hay respuestas correctas. Solo las tuyas.</p>
        </div>

        <div className="space-y-4">
          <h2 className="!mt-2 text-xl font-semibold tracking-tight text-[var(--fg)]">Cómo usarlo</h2>
          <p>
            Pasa el mouse o toca la tarjeta para ver el reverso. Desliza hasta el final para descargar el
            recurso completo en PDF, para compartirlo en tu clase, tu trabajo, tu familia o con quien quieras
            empezar una conversación.
          </p>
        </div>
      </div>

      <PreguntaDiaCards pdf={PDF_DOWNLOAD_UI.saberes30Preguntas} />
    </PageShell>
  );
}
