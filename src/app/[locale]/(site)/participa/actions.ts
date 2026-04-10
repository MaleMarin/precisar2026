"use server";

import { redirect } from "next/navigation";

const RESEND_API = "https://api.resend.com/emails";
const MAX_MSG = 8000;

function safeField(s: unknown, max: number): string {
  const t = String(s ?? "").replace(/\r\n/g, "\n").trim();
  return t.slice(0, max);
}

/**
 * Formulario «Contáctanos» del pie.
 * Envío vía Resend (solo servidor): destino y remitente en variables de entorno; no se muestran en la web.
 */
export async function footerContactRedirect(formData: FormData) {
  const nombre = safeField(formData.get("nombre"), 200);
  const apellido = safeField(formData.get("apellido"), 200);
  const email = safeField(formData.get("email"), 320);
  const mensaje = safeField(formData.get("mensaje"), MAX_MSG);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FOOTER_CONTACT_TO?.trim() || "male@precisar.net";
  const from = process.env.FOOTER_CONTACT_FROM?.trim();

  if (apiKey && from) {
    const text = [
      "Mensaje desde el pie del sitio (Precisar).",
      "",
      `Nombre: ${nombre}`,
      `Apellido: ${apellido}`,
      `Correo (reply): ${email}`,
      "",
      "Mensaje:",
      mensaje || "(vacío)",
    ].join("\n");

    const subject = `[Precisar · pie] ${nombre} ${apellido}`.slice(0, 200);

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
          reply_to: email || undefined,
          subject,
          text,
        }),
      });
      if (!res.ok) {
        const body = await res.text();
        console.error("[footerContactRedirect] Resend error", res.status, body);
      }
    } catch (e) {
      console.error("[footerContactRedirect]", e);
    }
  } else {
    console.warn(
      "[footerContactRedirect] Falta RESEND_API_KEY o FOOTER_CONTACT_FROM; el correo no se envió.",
    );
  }

  redirect("/participa/gracias");
}

/**
 * Formulario de contacto en /participa (página dedicada).
 * Mismas variables Resend que el pie; asunto distinto para identificar el origen.
 */
export async function participaContactRedirect(formData: FormData) {
  const nombre = safeField(formData.get("nombre"), 200);
  const email = safeField(formData.get("email"), 320);
  const mensaje = safeField(formData.get("mensaje"), MAX_MSG);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.FOOTER_CONTACT_TO?.trim() || "male@precisar.net";
  const from = process.env.FOOTER_CONTACT_FROM?.trim();

  if (!apiKey || !from) {
    console.warn(
      "[participaContactRedirect] Falta RESEND_API_KEY o FOOTER_CONTACT_FROM; no se envió correo.",
    );
    redirect("/participa");
  }

  const text = [
    "Mensaje desde /participa (Precisar).",
    "",
    `Nombre: ${nombre}`,
    `Correo (reply): ${email}`,
    "",
    "Mensaje:",
    mensaje || "(vacío)",
  ].join("\n");

  const subject = `[Precisar · participa] ${nombre || "Sin nombre"}`.slice(0, 200);

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
        reply_to: email || undefined,
        subject,
        text,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error("[participaContactRedirect] Resend error", res.status, body);
    }
  } catch (e) {
    console.error("[participaContactRedirect]", e);
  }

  redirect("/participa/gracias");
}
