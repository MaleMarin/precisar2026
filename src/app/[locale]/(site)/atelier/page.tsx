import type { Metadata } from "next";
import { FrontierLabHome } from "@/components/immersive/FrontierLabHome";
import { pageSeo } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageSeo({
    locale,
    pathname: "/atelier",
    title: "Atelier · Experiencia digital",
    description:
      "Laboratorio editorial: tipografía serif, WebGL escultórico, scroll coreografiado.",
  });
}

export default function AtelierLabPage() {
  return <FrontierLabHome />;
}
