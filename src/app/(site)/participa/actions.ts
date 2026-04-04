"use server";

import { redirect } from "next/navigation";

/**
 * Destino temporal del formulario de contacto en /participa.
 * Sustituir por envío a CRM, email o API cuando exista backend.
 */
export async function participaContactRedirect(_formData: FormData) {
  redirect("/participa/gracias");
}
