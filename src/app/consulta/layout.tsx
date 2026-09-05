import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import esMessages from "../../../messages/es.json";
import { rootPageSeo } from "@/lib/seo";

const consultaFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-consulta",
});

export const metadata: Metadata = rootPageSeo({
  pathname: "/consulta",
  title: "Consulta",
  description:
    "¿Cómo te informas hoy? Menos ruido, más criterio. Consulta anónima en menos de un minuto.",
});

export default function ConsultaLayout({ children }: { children: ReactNode }) {
  return (
    <div className={consultaFont.variable}>
      <NextIntlClientProvider locale="es" messages={esMessages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
}
