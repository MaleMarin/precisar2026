import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageSeo } from "@/lib/seo";
import { CulturaDigitalTirasClient } from "./CulturaDigitalTirasClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "culturaDigitalPage" });
  return pageSeo({
    locale,
    pathname: "/culturadigital",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default function Page() {
  return <CulturaDigitalTirasClient />;
}
