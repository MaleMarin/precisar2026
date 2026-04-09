import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

const consultaVivaFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-consulta-viva",
});

const consultaVivaCanonical = `${SITE.url}/consulta-viva`;

export const metadata: Metadata = {
  title: "Consulta viva",
  description:
    "Observatorio regional: mapa de América Latina y el Caribe con señales por país, corrientes por fuente y participación en vivo.",
  alternates: { canonical: consultaVivaCanonical },
  openGraph: {
    title: "Consulta viva · Precisar",
    description:
      "Mira cómo se informa América Latina y el Caribe en vivo: señales por país y participación.",
    url: consultaVivaCanonical,
    siteName: SITE.name,
    locale: "es_CL",
    type: "website",
  },
};

export default function ConsultaVivaLayout({ children }: { children: ReactNode }) {
  return <div className={`${consultaVivaFont.variable} min-h-dvh`}>{children}</div>;
}
