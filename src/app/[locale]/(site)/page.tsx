import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { pageSeo } from "@/lib/seo";
import { PrecisarHomeClient } from "./precisar-home/PrecisarHomeClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return pageSeo({
    locale,
    pathname: "/",
    title: t("homeTitle"),
    description: t("homeDescription"),
    home: true,
  });
}

export default function HomePage() {
  return <PrecisarHomeClient />;
}
