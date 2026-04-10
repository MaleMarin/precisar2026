import type { Metadata } from "next";
import { ContactoScrollClient } from "./ContactoScrollClient";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribe en el formulario Contáctanos del pie de página.",
};

export default function ContactoPage() {
  return <ContactoScrollClient />;
}
