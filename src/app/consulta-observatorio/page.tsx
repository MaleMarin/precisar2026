import type { Metadata } from "next";
import { ConsultaObservatorioLive } from "@/components/consulta-observatorio/ConsultaObservatorioLive";

export const metadata: Metadata = {
  title: "Observatorio de la consulta — Precisar",
  description:
    "Panel en vivo del observatorio de Precisar: seguimiento de respuestas de la consulta ciudadana «¿Cómo te informas hoy?» actualizadas en tiempo real.",
  openGraph: {
    title: "Observatorio de la consulta — Precisar",
    description:
      "Seguimiento en tiempo real de la consulta ciudadana de Precisar sobre hábitos informativos en Chile y México.",
    url: "https://precisar.net/consulta-observatorio",
  },
};

export default function ConsultaObservatorioPage() {
  return (
    <main className="flex h-full min-h-screen w-full min-w-0 flex-1 flex-col">
      <ConsultaObservatorioLive />
    </main>
  );
}
