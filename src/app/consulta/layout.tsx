import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

const consultaFont = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-consulta",
});

export const metadata: Metadata = {
  title: "Consulta",
  description:
    "Queremos entender cómo te informas hoy. Es anónima, rápida y no tiene respuestas correctas.",
};

export default function ConsultaLayout({ children }: { children: ReactNode }) {
  return <div className={consultaFont.variable}>{children}</div>;
}
