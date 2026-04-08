import { ConsultaFlowProvider } from "@/components/consulta/ConsultaFlowContext";
import { ConsultaHero } from "@/components/consulta/ConsultaHero";
import { ConsultaIntro } from "@/components/consulta/ConsultaIntro";
import { ConsultaModeSelector } from "@/components/consulta/ConsultaModeSelector";
import { ConsultaPageShell } from "@/components/consulta/ConsultaPageShell";
import shell from "@/components/consulta/ConsultaShell.module.css";
import { ConsultaWizardSlot } from "./ConsultaWizardSlot";

export default function ConsultaPage() {
  return (
    <ConsultaPageShell>
      <ConsultaFlowProvider>
        <ConsultaHero />
        <div className={shell.contentSheet} data-consulta-sheet>
          <ConsultaIntro />
          <ConsultaModeSelector />
          <ConsultaWizardSlot />
        </div>
      </ConsultaFlowProvider>
    </ConsultaPageShell>
  );
}
