import type { Metadata } from "next";
import { FrontierLabHome } from "@/components/immersive/FrontierLabHome";

export const metadata: Metadata = {
  title: { absolute: "Atelier · Experiencia digital" },
  description:
    "Laboratorio editorial: tipografía serif, WebGL escultórico, scroll coreografiado.",
};

export default function AtelierLabPage() {
  return <FrontierLabHome />;
}
