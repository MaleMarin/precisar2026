import type { Metadata } from "next";
import type { ReactNode } from "react";
import { absoluteLocaleUrl, hreflangAlternates, SITE } from "@/lib/site";

const pathname = "/educacion-mediatica/ami-vs-alfabetizacion-digital";

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const canonical = absoluteLocaleUrl(locale, pathname);
  const ogLocale =
    locale === "es" ? "es_CL" : locale === "pt" ? "pt_BR" : "en_US";

  return {
    title: "AMI vs alfabetización digital — Precisar",
    description:
      "Compara la alfabetización mediática e informacional (AMI) con la alfabetización digital: foco, competencias y ejemplos. Incluye tabla comparativa y ejercicio interactivo.",
    alternates: {
      canonical,
      languages: hreflangAlternates(pathname),
    },
    openGraph: {
      title: "¿En qué se diferencian AMI y la Alfabetización Digital?",
      description:
        "AMI: pensamiento crítico sobre medios e información. Alfabetización digital: uso seguro y eficiente de herramientas tecnológicas.",
      url: canonical,
      siteName: SITE.name,
      type: "website",
      locale: ogLocale,
    },
  };
}

export default function AmiVsAlfabetizacionDigitalLayout({ children }: Props) {
  return children;
}
