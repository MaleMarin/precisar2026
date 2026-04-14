import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { absoluteLocaleUrl, SITE } from "@/lib/site";
import { PrecisarHomeClient } from "./precisar-home/PrecisarHomeClient";

function ogLocale(locale: string): string {
  if (locale === "pt") return "pt_BR";
  if (locale === "en") return "en_US";
  return "es_CL";
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const title = t("homeTitle");
  const description = t("homeDescription");
  const url = absoluteLocaleUrl(locale, "/");
  return {
    title: { absolute: title },
    description,
    openGraph: {
      type: "website",
      locale: ogLocale(locale),
      siteName: SITE.name,
      title,
      description,
      url,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function HomePage() {
  return <PrecisarHomeClient />;
}
