import type { Metadata } from "next";
import { rootPageSeo } from "@/lib/seo";
import { ConsultaFlowProvider } from "@/components/consulta/ConsultaFlowContext";
import { ConsultaLiveMapProvider } from "@/components/consulta/ConsultaLiveMapProvider";
import { ConsultaPageShell } from "@/components/consulta/ConsultaPageShell";
import { ConsultaViewportCenter } from "@/components/consulta/ConsultaViewportCenter";
import { ConsultaStackedLayout } from "./ConsultaStackedLayout";

export const metadata: Metadata = rootPageSeo({
  pathname: "/consulta",
  title: "¿Cómo te informas hoy? — Precisar",
  description:
    "Consulta ciudadana anónima de Precisar: 12 preguntas sobre cómo recibes, evalúas y compartes información. Menos de un minuto.",
});

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
    </ConsultaLiveMapProvider>
  );
}
