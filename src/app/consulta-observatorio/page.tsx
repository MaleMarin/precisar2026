import type { Metadata } from "next";
import { ConsultaObservatorioLive } from "@/components/consulta-observatorio/ConsultaObservatorioLive";
import { SITE } from "@/lib/site";

const canonical = `${SITE.url}/consulta-observatorio`;

export const metadata: Metadata = {
  title: "Consulta Viva · Observatorio en vivo",
  description:
    "Visualización en tiempo real de las respuestas de la consulta «¿Cómo te informas hoy?» en América Latina. Responde en /consulta.",
  alternates: { canonical },
  openGraph: {
    title: "Consulta Viva · Observatorio en vivo · Precisar",
    description:
      "Señales en vivo por país. La consulta paso a paso está en precisar.net/consulta.",
    url: canonical,
    siteName: SITE.name,
    locale: "es_CL",
    type: "website",
  },
};

export default function ConsultaObservatorioPage() {
  return (
    <main className="flex h-full min-h-screen w-full min-w-0 flex-1 flex-col">
      <ConsultaObservatorioLive />
    </main>
  );
}
