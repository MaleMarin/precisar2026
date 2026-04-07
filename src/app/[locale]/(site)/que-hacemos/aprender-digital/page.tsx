import { AprenderHero } from "@/components/aprender/AprenderHero";
import { ImpactoGrid } from "@/components/aprender/ImpactoGrid";
import { MetodologiaGrid } from "@/components/aprender/MetodologiaGrid";
import { ModulosSection } from "@/components/aprender/ModulosSection";
import { CtaBlock } from "@/components/ui/CtaBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aprender Digital",
  description: "Programa para adultos y mayores — autonomía y criterio digital con Precisar.",
};

export default function QueHacemosAprenderPage() {
  return (
    <main>
      <AprenderHero />
      <ModulosSection />
      <MetodologiaGrid />
      <ImpactoGrid />
      <CtaBlock
        headline="¿Representas a un municipio, junta de vecinos o centro comunitario? Llevamos el programa a tu espacio."
        buttonLabel="Hablemos →"
      />
    </main>
  );
}
