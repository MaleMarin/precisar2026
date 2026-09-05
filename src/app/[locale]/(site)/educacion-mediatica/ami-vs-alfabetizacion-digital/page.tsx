import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageSeo } from "@/lib/seo";
import { AmiVsDigitalClient } from "./AmiVsDigitalClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "amiVsAlfabetizacionDigital" });
  return pageSeo({
    locale,
    pathname: "/educacion-mediatica/ami-vs-alfabetizacion-digital",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function AmiVsDigitalPage() {
  return <AmiVsDigitalClient />;
}
