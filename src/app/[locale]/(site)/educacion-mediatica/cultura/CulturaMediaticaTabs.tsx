"use client";

import { MediaticaTabs, type MediaticaTab } from "@/components/educacion-mediatica/MediaticaTabs";
import { useTranslations } from "next-intl";
import pageStyles from "./CulturaInterior.module.css";

export function CulturaMediaticaTabs() {
  const t = useTranslations("educacionMediaticaTabs.cultura");
  const tAria = useTranslations("educacionMediaticaTabs");
  const tabs = t.raw("tabs") as MediaticaTab[];

  return (
    <MediaticaTabs
      headingId="claves-cultura-heading"
      idPrefix="cult"
      sectionTitle={t("sectionTitle")}
      tabs={tabs}
      longSectionTitle
      tablistAriaLabel={tAria("ariaTopics")}
      sectionClassName={pageStyles.tabsAccent}
    />
  );
}
