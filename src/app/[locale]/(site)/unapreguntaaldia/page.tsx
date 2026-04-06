import { PageShell } from "@/components/PageShell";
import { PreguntaDiaCards } from "@/components/saberes/PreguntaDiaCards";
import { PDFS } from "@/lib/site";

export const metadata = { title: "Una Pregunta al Día" };

export default function Page() {
  return (
    <PageShell title="Una Pregunta al Día" kicker="Recurso" bare>
      <div className="prose-precisar max-w-none space-y-5">
        <p className="text-lg text-[var(--muted)]">Explora tu vida digital con una pregunta al día.</p>
        <p>
          Cada una de las 30 preguntas está diseñada para invitarte a pensar, sentir y conversar sobre
          cómo vivimos conectados.
        </p>
        <h2 className="!mt-10 text-xl font-semibold tracking-tight text-[var(--fg)]">
          Pasá el mouse o tocá la tarjeta
        </h2>
        <p>
          Descubrirás el reverso con: una idea para reflexionar, un pequeño desafío personal, otra forma
          de mirar lo que hacés en línea. El contenido completo está en el PDF oficial.
        </p>
        <p>
          Deslizá hasta el final y descargá el recurso para compartirlo en tu trabajo, tu clase, tus
          amistades o tu familia.
        </p>
      </div>

      <PreguntaDiaCards pdfHref={PDFS.saberes30Preguntas} />
    </PageShell>
  );
}
