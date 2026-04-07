import { BeneficiosGrid } from "@/components/docentes/BeneficiosGrid";
import { DocentesHero } from "@/components/docentes/DocentesHero";
import { MetodologiaGrid } from "@/components/docentes/MetodologiaGrid";
import { ModulosTab } from "@/components/docentes/ModulosTab";
import { ObjetivosGrid } from "@/components/docentes/ObjetivosGrid";
import { CtaBlock } from "@/components/ui/CtaBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Docentes",
  description: "Herramientas para el aula — educación mediática y criterio digital con Precisar.",
};

export default function QueHacemosDocentesPage() {
  return (
    <main>
      <DocentesHero />
      <ObjetivosGrid />
      <ModulosTab />
      <MetodologiaGrid />
      <BeneficiosGrid />
      <CtaBlock
        headline="Estamos listos para diseñar un programa adaptado a las necesidades de tu establecimiento."
        buttonLabel="Coordinar una presentación →"
      />
    </main>
  );
}
