import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PrecisarHomeClient } from "./precisar-home/PrecisarHomeClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: { absolute: t("homeTitle") },
    description: t("homeDescription"),
  };
}

export default function HomePage() {
  return <PrecisarHomeClient />;
}
