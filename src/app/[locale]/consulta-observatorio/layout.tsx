import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { rootPageSeo } from "@/lib/seo";

const font = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-consulta-observatorio",
});

export const metadata: Metadata = rootPageSeo({
  pathname: "/consulta-observatorio",
  title: "Consulta Viva · Observatorio en vivo",
  description:
    "Visualización en tiempo real de las respuestas de la consulta «¿Cómo te informas hoy?» en América Latina. Responde en /consulta.",
});

export default function LocaleConsultaObservatorioLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${font.variable} flex min-h-screen w-full flex-1 flex-col overflow-hidden bg-[#4E0722] text-white antialiased`}
      style={{ fontFamily: "var(--font-consulta-observatorio), system-ui, sans-serif" }}
    >
      {children}
    </div>
  );
}
