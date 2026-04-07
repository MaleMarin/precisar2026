import { BeneficiosGrid } from "@/components/funcionarios/BeneficiosGrid";
import { FuncionariosHero } from "@/components/funcionarios/FuncionariosHero";
import { SesionesSection } from "@/components/funcionarios/SesionesSection";
import { CtaBlock } from "@/components/ui/CtaBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funcionarios públicos",
  description: "Formación en educación mediática para la administración pública — Precisar.",
};

export default function QueHacemosFuncionariosPage() {
  return (
    <main>
      <FuncionariosHero />
      <SesionesSection />
      <BeneficiosGrid />
      <CtaBlock
        headline="Consideramos esta capacitación una inversión estratégica en la resiliencia de la administración pública."
        description="Adaptamos el programa a las necesidades específicas de tu institución. Propuesta formal con inversión y logística incluidas."
        buttonLabel="Solicitar propuesta →"
      />
    </main>
  );
}
