import type { Metadata } from "next";
import { ConsultaFlowProvider } from "@/components/consulta/ConsultaFlowContext";
import { ConsultaLiveMapProvider } from "@/components/consulta/ConsultaLiveMapProvider";
import { ConsultaPageShell } from "@/components/consulta/ConsultaPageShell";
import { ConsultaViewportCenter } from "@/components/consulta/ConsultaViewportCenter";
import { SiteFooter } from "@/components/SiteFooter";
import { ConsultaStackedLayout } from "./ConsultaStackedLayout";

export const metadata: Metadata = {
  title: "¿Cómo te informas hoy? — Precisar",
  description:
    "Consulta ciudadana anónima de Precisar: 12 preguntas sobre cómo recibes, evalúas y compartes información. Menos de un minuto.",
  openGraph: {
    title: "¿Cómo te informas hoy?",
    description:
      "12 preguntas anónimas sobre tu relación con la información. Una iniciativa de Precisar.",
    url: "https://precisar.net/consulta",
  },
};

export default function ConsultaPage() {
  return (
    <ConsultaLiveMapProvider>
      <ConsultaPageShell variant="liveMap">
        <ConsultaFlowProvider>
          <ConsultaViewportCenter>
            <ConsultaStackedLayout />
          </ConsultaViewportCenter>
        </ConsultaFlowProvider>
      </ConsultaPageShell>
      <SiteFooter />
    </ConsultaLiveMapProvider>
  );
}
