import type { Metadata } from "next";
import { pageSeo } from "@/lib/seo";
import { SentidosDigitalesLandingClient } from "./SentidosDigitalesLandingClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageSeo({
    locale,
    pathname: "/experiencias/sentidos-digitales",
    title: "Sentidos digitales",
    description:
      "Seis sentidos digitales: navegar con criterio, filtrar información, límites saludables y bienestar integral en pantalla.",
  });
}

export default function Page() {
  return <SentidosDigitalesLandingClient />;
}
