"use client";

import { MediaticaTabs, type MediaticaTab } from "@/components/educacion-mediatica/MediaticaTabs";
import { useTranslations } from "next-intl";
import pageStyles from "./ComunicacionInterior.module.css";

export function ComunicacionMediaticaTabs() {
  const t = useTranslations("educacionMediaticaTabs.comunicacion");
  const tAria = useTranslations("educacionMediaticaTabs");
  const tabs = t.raw("tabs") as MediaticaTab[];

  return (
    <MediaticaTabs
      headingId="claves-mediaticas-heading"
      idPrefix="com"
      sectionTitle={t("sectionTitle")}
      tabs={tabs}
      tablistAriaLabel={tAria("ariaTopics")}
      sectionClassName={pageStyles.tabsAccent}
    />
  );
}
