import { formatConsultaForEmail } from "@/lib/email/formatConsultaForEmail";
import { sendPrecisarEmail } from "@/lib/email/sendPrecisarEmail";
import type { ConsultaAnswers } from "@/lib/consulta/types";
import type { NewsletterSource } from "@/lib/newsletter/persistNewsletterSubscription";

function sourceLabel(source: NewsletterSource): string {
  if (source === "site-footer") return "Pie del sitio (precisar.net)";
  if (source === "participa") return "Página /participa";
  return source;
}

/** Aviso interno: nueva suscripción al newsletter (no falla el alta si el correo falla). */
export async function notifyNewsletterSubscription(input: {
  email: string;
  source: NewsletterSource;
  locale?: string;
  path?: string;
}): Promise<void> {
  const text = [
    "Nueva suscripción al newsletter de Precisar.",
    "",
    `Correo: ${input.email}`,
    `Origen: ${sourceLabel(input.source)}`,
    input.locale ? `Idioma: ${input.locale}` : null,
    input.path ? `Ruta: ${input.path}` : null,
    "",
    "Guardado en Firestore → newsletter_suscripciones (proyecto Encuesta Información).",
  ]
    .filter(Boolean)
    .join("\n");

  await sendPrecisarEmail({
    subject: `[Precisar · newsletter] ${input.email}`,
    text,
    replyTo: input.email,
  });
}

/** Aviso interno: consulta ciudadana completada. */
export async function notifyConsultaSubmission(answers: ConsultaAnswers): Promise<void> {
  const replyTo = answers.p12?.correo?.trim();
  await sendPrecisarEmail({
    subject: `[Precisar · consulta] Nueva respuesta${replyTo ? ` · ${replyTo}` : ""}`,
    text: formatConsultaForEmail(answers),
    replyTo: replyTo || undefined,
  });
}
