"use server";

import {
  fieldsFromFormData,
  participaFieldsFromFormData,
  sendFooterContactEmail,
  sendParticipaContactEmail,
  type FooterContactResult,
} from "@/lib/footer-contact";

/**
 * Formulario «Contáctanos» del pie.
 * Devuelve el resultado real: no redirige a /participa/gracias si Resend o la config fallan.
 */
export async function submitFooterContact(formData: FormData): Promise<FooterContactResult> {
  return sendFooterContactEmail(fieldsFromFormData(formData));
}

/**
 * Formulario de contacto en /participa (página dedicada).
 * Mismas variables Resend que el pie; asunto distinto para identificar el origen.
 * No redirige: el cliente confirma o redirige solo si `ok` es verdadero.
 */
export async function submitParticipaContact(formData: FormData): Promise<FooterContactResult> {
  return sendParticipaContactEmail(participaFieldsFromFormData(formData));
}
