import { Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import type { ReactNode } from "react";

const consultaVivaFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-consulta-viva",
});

export const metadata: Metadata = {
  title: "Consulta viva",
  description:
    "Observatorio regional: mapa de América Latina y el Caribe con señales por país, corrientes por fuente y participación en vivo (prototipo).",
};

export default function ConsultaVivaLayout({ children }: { children: ReactNode }) {
  return <div className={`${consultaVivaFont.variable} min-h-dvh`}>{children}</div>;
}
