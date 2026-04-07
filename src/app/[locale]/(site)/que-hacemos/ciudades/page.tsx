import { CiudadesHero } from "@/components/ciudades/CiudadesHero";
import { ContenidosGrid } from "@/components/ciudades/ContenidosGrid";
import { ImpactoGrid } from "@/components/ciudades/ImpactoGrid";
import { ModosLlegada } from "@/components/ciudades/ModosLlegada";
import { ProgramasTab } from "@/components/ciudades/ProgramasTab";
import { CtaBlock } from "@/components/ui/CtaBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ciudades",
  description: "Cultura digital para toda la ciudad — programas municipales Precisar.",
};

export default function QueHacemosCiudadesPage() {
  return (
    <main>
      <CiudadesHero />
      <ContenidosGrid />
      <ModosLlegada />
      <ProgramasTab />
      <ImpactoGrid />
      <CtaBlock
        headline="Modular, flexible y 100% adaptable a las prioridades de tu municipio."
        buttonLabel="Diseñemos juntos →"
      />
    </main>
  );
}
