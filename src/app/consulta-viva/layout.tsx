import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ConsultaSkipLink } from "@/components/consulta/ConsultaSkipLink";
import { rootPageSeo } from "@/lib/seo";

export const metadata: Metadata = rootPageSeo({
  pathname: "/consulta-viva",
  title: "Mapa vivo de la consulta — Precisar",
  description:
    "Resultados en tiempo real de la consulta ciudadana «¿Cómo te informas hoy?» en América Latina y el Caribe. Explora por país, cruza datos y suma tu señal al mapa.",
});

export default function ConsultaVivaLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ConsultaSkipLink label="Saltar al contenido" />
      {children}
    </>
  );
}
