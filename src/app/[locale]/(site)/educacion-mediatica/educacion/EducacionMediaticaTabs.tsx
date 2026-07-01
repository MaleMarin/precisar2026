"use client";

import { MediaticaTabs, type MediaticaTab } from "@/components/educacion-mediatica/MediaticaTabs";
import { useTranslations } from "next-intl";
import pageStyles from "./EducacionInterior.module.css";

export function EducacionMediaticaTabs() {
  const t = useTranslations("educacionMediaticaTabs.educacion");
  const tAria = useTranslations("educacionMediaticaTabs");
  const tabs = t.raw("tabs") as MediaticaTab[];

  return (
    <MediaticaTabs
      headingId="claves-educacion-heading"
      idPrefix="edu"
      sectionTitle={t("sectionTitle")}
      tabs={tabs}
      tablistAriaLabel={tAria("ariaTopics")}
      sectionClassName={pageStyles.tabsAccent}
    />
  );
}
