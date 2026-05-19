const RESEND_API = "https://api.resend.com/emails";

export type SendPrecisarEmailInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

/** Envía correo interno vía Resend (mismas variables que el formulario de contacto). */
export async function sendPrecisarEmail(input: SendPrecisarEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.FOOTER_CONTACT_FROM?.trim();
  const to =
    process.env.PRECISAR_NOTIFY_TO?.trim() ||
    process.env.FOOTER_CONTACT_TO?.trim() ||
    "male@precisar.net";

  if (!apiKey || !from) {
    console.warn("[sendPrecisarEmail] Falta RESEND_API_KEY o FOOTER_CONTACT_FROM");
    return false;
  }

  try {
    const res = await fetch(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: input.replyTo || undefined,
        subject: input.subject.slice(0, 200),
        text: input.text,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[sendPrecisarEmail] Resend error", res.status, body);
      return false;
    }
    return true;
  } catch (err) {
    console.error("[sendPrecisarEmail]", err);
    return false;
  }
}
