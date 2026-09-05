import type { Metadata } from "next";
import { ConsultaObservatorioLive } from "@/components/consulta-observatorio/ConsultaObservatorioLive";
import { rootPageSeo } from "@/lib/seo";

export const metadata: Metadata = rootPageSeo({
  pathname: "/consulta-observatorio",
  title: "Observatorio de la consulta — Precisar",
  description:
    "Panel en vivo del observatorio de Precisar: seguimiento de respuestas de la consulta ciudadana «¿Cómo te informas hoy?» actualizadas en tiempo real.",
});

export default function ConsultaObservatorioPage() {
  return (
    <main id="contenido-principal" tabIndex={-1} className="flex h-full min-h-screen w-full min-w-0 flex-1 flex-col">
      <ConsultaObservatorioLive />
    </main>
  );
}
