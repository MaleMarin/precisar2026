import { PageShell } from "@/components/PageShell";
import { PDFS } from "@/lib/site";

export const metadata = { title: "Una Pregunta al Día" };

export default function Page() {
  return (
    <PageShell title="Una Pregunta al Día" kicker="Recurso">
      <p>Explora tu vida digital con una pregunta al día</p>
      <p>
        Cada una de las 30 preguntas está diseñada para invitarte a pensar, sentir y
        conversar sobre cómo vivimos conectados.
      </p>
      <h2>Pasa el mouse o toca la tarjeta</h2>
      <p>
        Descubrirás el reverso con: una idea para reflexionar, un pequeño desafío
        personal, otra forma de mirar lo que haces en línea
      </p>
      <p>
        Desliza hasta el final y descarga este recurso en PDF para compartirlo en tu
        trabajo, tu clase, tus amistades o tu familia.
      </p>
      <h3>30 preguntas para explorar tu vida digital</h3>
      <p>
        Este recurso reúne 30 preguntas que invitan a observar con más atención nuestros
        hábitos digitales, emociones, decisiones y relaciones en línea. No están hechas
        para evaluar, sino para provocar curiosidad, conversación y pensamiento crítico.
      </p>
      <p>
        <a href={PDFS.saberes30Preguntas} target="_blank" rel="noreferrer">
          DESCARGA
        </a>
      </p>
    </PageShell>
  );
}
