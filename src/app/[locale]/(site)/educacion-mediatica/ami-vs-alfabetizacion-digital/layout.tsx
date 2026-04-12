import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "AMI vs Alfabetización Digital — Precisar",
  description:
    "¿En qué se diferencian la Alfabetización Mediática e Informacional (AMI) y la alfabetización digital? Tabla comparativa, ejercicio interactivo y tres razones clave para entender el enfoque de Precisar.",
  openGraph: {
    title: "AMI vs Alfabetización Digital",
    description:
      "Compara los dos marcos, practica con el ejercicio de clasificación y entiende por qué la AMI va más allá del uso de herramientas.",
    url: "https://precisar.net/educacion-mediatica/ami-vs-alfabetizacion-digital",
  },
};

export default function AmiVsDigitalLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
