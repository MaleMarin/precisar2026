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
  title: "Mapa vivo de los resultados de la consulta",
  description:
    "Visualización en vivo de las respuestas en América Latina y el Caribe. La consulta paso a paso está en /consulta.",
  alternates: { canonical: consultaVivaCanonical },
  openGraph: {
    title: "Mapa vivo de los resultados de la consulta · Precisar",
    description:
      "Mirá cómo se reparten las respuestas en el mapa. La consulta principal sigue en precisar.net/consulta.",
    url: consultaVivaCanonical,
    siteName: SITE.name,
    locale: "es_CL",
    type: "website",
  },
};

export default function ConsultaVivaLayout({ children }: { children: ReactNode }) {
  return <div className={`${consultaVivaFont.variable} min-h-dvh`}>{children}</div>;
}
