import { ConsultaFlowProvider } from "@/components/consulta/ConsultaFlowContext";
import { ConsultaHero } from "@/components/consulta/ConsultaHero";
import { ConsultaIntro } from "@/components/consulta/ConsultaIntro";
import { ConsultaLiveMapProvider } from "@/components/consulta/ConsultaLiveMapProvider";
import { ConsultaPageShell } from "@/components/consulta/ConsultaPageShell";
import shell from "@/components/consulta/ConsultaShell.module.css";
import { ConsultaWizardSlot } from "./ConsultaWizardSlot";

export default function ConsultaPage() {
  return (
    <ConsultaLiveMapProvider>
      <ConsultaPageShell variant="liveMap">
        <ConsultaFlowProvider>
          <ConsultaHero />
          <div className={shell.contentSheet} data-consulta-sheet>
            <ConsultaIntro />
            <ConsultaWizardSlot />
          </div>
        </ConsultaFlowProvider>
      </ConsultaPageShell>
    </ConsultaLiveMapProvider>
  );
}
