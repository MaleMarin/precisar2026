import type { Metadata } from "next";
import PrecisarInteractivePanelsSitePreview from "./cinematic/_components/InteractivePanelsPreview";

export const metadata: Metadata = {
  title: { absolute: "Precisar · Potencia el uso de la tecnología" },
  description:
    "Potencia el uso de la tecnología. Sitio inmersivo por capítulos: scroll, máscaras y capas reactivas al cursor.",
};

export default function HomePage() {
  return <PrecisarInteractivePanelsSitePreview />;
}
