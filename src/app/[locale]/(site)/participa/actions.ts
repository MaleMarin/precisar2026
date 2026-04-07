"use server";

import { redirect } from "next/navigation";

/** Formulario “Contáctanos” del pie; sin backend aún → página de gracias. */
export async function footerContactRedirect(_formData: FormData) {
  redirect("/participa/gracias");
}
