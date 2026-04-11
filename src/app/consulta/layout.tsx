import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

const consultaFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-consulta",
});

const consultaCanonical = `${SITE.url}/consulta`;

export const metadata: Metadata = {
  title: "Consulta",
  description:
    "¿Cómo te informas hoy? Menos ruido, más criterio. Consulta anónima en menos de un minuto.",
  alternates: { canonical: consultaCanonical },
  openGraph: {
    title: "Consulta · Precisar",
    description:
      "¿Cómo te informas hoy? Menos ruido, más criterio. Consulta anónima en menos de un minuto.",
    url: consultaCanonical,
    siteName: SITE.name,
    locale: "es_CL",
    type: "website",
  },
};

export default function ConsultaLayout({ children }: { children: ReactNode }) {
  return <div className={consultaFont.variable}>{children}</div>;
}
