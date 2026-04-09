import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-consulta-observatorio",
});

const path = "/consulta-observatorio";

export const metadata: Metadata = {
  title: "Consulta Viva · Observatorio en vivo",
  description:
    "Visualización en tiempo real de las respuestas de la consulta «¿Cómo te informas hoy?» en América Latina. Responde en /consulta.",
  alternates: { canonical: `${SITE.url}${path}` },
  openGraph: {
    title: "Consulta Viva · Observatorio en vivo · Precisar",
    description:
      "Mapa y señales en vivo. La consulta paso a paso está en precisar.net/consulta.",
    url: `${SITE.url}${path}`,
    siteName: SITE.name,
    locale: "es_CL",
    type: "website",
  },
};

export default function LocaleConsultaObservatorioLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${font.variable} min-h-dvh bg-[#021740] text-white antialiased`}
      style={{ fontFamily: "var(--font-consulta-observatorio), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
