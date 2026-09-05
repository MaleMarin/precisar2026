const RESEND_API = "https://api.resend.com/emails";
const MAX_MSG = 8000;

export type FooterContactFields = {
  nombre: string;
  apellido: string;
  email: string;
  mensaje: string;
};

export type FooterContactResult =
  | { ok: true }
  | { ok: false; reason: "config" | "resend" | "network" };

function safeField(s: unknown, max: number): string {
  const t = String(s ?? "").replace(/\r\n/g, "\n").trim();
  return t.slice(0, max);
}

export function fieldsFromFormData(formData: FormData): FooterContactFields {
  return {
    nombre: safeField(formData.get("nombre"), 200),
    apellido: safeField(formData.get("apellido"), 200),
    email: safeField(formData.get("email"), 320),
    mensaje: safeField(formData.get("mensaje"), MAX_MSG),
  };
}

export async function sendFooterContactEmail(
  fields: FooterContactFields,
  deps?: { fetchImpl?: typeof fetch; env?: NodeJS.ProcessEnv },
): Promise<FooterContactResult> {
  const fetchImpl = deps?.fetchImpl ?? fetch;
  const env = deps?.env ?? process.env;
  const apiKey = env.RESEND_API_KEY;
  const to = env.FOOTER_CONTACT_TO?.trim() || "male@precisar.net";
  const from = env.FOOTER_CONTACT_FROM?.trim();

  if (!apiKey || !from) {
    console.warn(
      "[footerContact] Falta RESEND_API_KEY o FOOTER_CONTACT_FROM; el correo no se envió.",
    );
    return { ok: false, reason: "config" };
  }

  const text = [
    "Mensaje desde el pie del sitio (Precisar).",
    "",
    `Nombre: ${fields.nombre}`,
    `Apellido: ${fields.apellido}`,
    `Correo (reply): ${fields.email}`,
    "",
    "Mensaje:",
    fields.mensaje || "(vacío)",
  ].join("\n");

  const subject = `[Precisar · pie] ${fields.nombre} ${fields.apellido}`.slice(0, 200);

  try {
    const res = await fetchImpl(RESEND_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: fields.email || undefined,
        subject,
        text,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[footerContact] Resend error", res.status, body);
      return { ok: false, reason: "resend" };
    }
    return { ok: true };
  } catch (e) {
    console.error("[footerContact]", e);
    return { ok: false, reason: "network" };
  }
}
