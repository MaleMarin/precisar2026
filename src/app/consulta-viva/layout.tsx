import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Mapa vivo de la consulta — Precisar",
  description:
    "Resultados en tiempo real de la consulta ciudadana «¿Cómo te informas hoy?» en América Latina y el Caribe. Explora por país, cruza datos y suma tu señal al mapa.",
  openGraph: {
    title: "Mapa vivo de la consulta — Precisar",
    description:
      "América Latina en un tablero: países, capas de lectura y señales que se actualizan en vivo. Una iniciativa de Precisar.",
    url: "https://precisar.net/consulta-viva",
  },
};

export default function ConsultaVivaLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
