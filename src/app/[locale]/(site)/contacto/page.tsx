import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import { ContactoScrollClient } from "./ContactoScrollClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageSeo({
    locale,
    pathname: "/contacto",
    title: "Contacto",
    description: "Escribe en el formulario Contáctanos del pie de página.",
  });
}

export default function ContactoPage() {
  return <ContactoScrollClient />;
}
