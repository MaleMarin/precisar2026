import { ElementosGrid } from "@/components/hub/ElementosGrid";
import { FormatosGrid } from "@/components/hub/FormatosGrid";
import { HubHero } from "@/components/hub/HubHero";
import { PersonalizacionGrid } from "@/components/hub/PersonalizacionGrid";
import { StepsSection } from "@/components/hub/StepsSection";
import { CtaBlock } from "@/components/ui/CtaBlock";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hub Digital Consciente",
  description: "La cultura digital entra por la puerta — instalación itinerante Precisar.",
};

export default function QueHacemosHubPage() {
  return (
    <main>
      <HubHero />
      <ElementosGrid />
      <FormatosGrid />
      <PersonalizacionGrid />
      <StepsSection />
      <CtaBlock
        headline="Tu próximo evento puede provocar una conversación necesaria."
        description="Trabajamos con municipios, universidades, organizaciones sociales y empresas."
        buttonLabel="Conversemos →"
      />
    </main>
  );
}
