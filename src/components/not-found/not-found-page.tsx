import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { documentTitle } from "@/lib/seo";
import { DocumentTitle } from "./DocumentTitle";
import { NotFoundView } from "./NotFoundView";

export async function notFoundMetadata(): Promise<Metadata> {
  const t = await getTranslations("notFound");
  return {
    title: { absolute: documentTitle(t("metaTitle")) },
    robots: { index: false, follow: true },
  };
}

export async function NotFoundPage() {
  const t = await getTranslations("notFound");
  return (
    <>
      <DocumentTitle title={documentTitle(t("metaTitle"))} />
      <NotFoundView
        label={t("label")}
        title={t("title")}
        body={t("body")}
        cta={t("cta")}
      />
    </>
  );
}
