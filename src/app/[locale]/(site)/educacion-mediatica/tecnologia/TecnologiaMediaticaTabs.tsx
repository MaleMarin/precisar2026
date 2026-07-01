"use client";

import { MediaticaTabs, type MediaticaTab } from "@/components/educacion-mediatica/MediaticaTabs";
import { useTranslations } from "next-intl";
import pageStyles from "./TecnologiaInterior.module.css";

export function TecnologiaMediaticaTabs() {
  const t = useTranslations("educacionMediaticaTabs.tecnologia");
  const tAria = useTranslations("educacionMediaticaTabs");
  const tabs = t.raw("tabs") as MediaticaTab[];

  return (
    <MediaticaTabs
      headingId="claves-tecnologia-heading"
      idPrefix="tech"
      sectionTitle={t("sectionTitle")}
      tabs={tabs}
      tablistAriaLabel={tAria("ariaTopics")}
      sectionClassName={pageStyles.tabsAccent}
    />
  );
}
