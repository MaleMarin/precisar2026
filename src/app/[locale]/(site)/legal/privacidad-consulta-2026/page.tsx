import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPageTemplate } from "@/components/templates/PageTemplates";
import {
  renderLegalBlock,
  type LegalSection,
} from "@/components/legal/LegalStructuredContent";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legalPrivacidadConsulta2026" });
  return { title: t("metaTitle") };
}

export default async function Page() {
  const t = await getTranslations("legalPrivacidadConsulta2026");
  const sections = t.raw("sections") as LegalSection[];
  const footerNotes = t.raw("footerNotes") as { bold: string; text: string }[];

  return (
    <LegalPageTemplate title={t("title")} kicker={t("kicker")}>
      <p className="text-sm text-[var(--muted)]">{t("lastUpdated")}</p>

      {sections.map((section, si) => (
        <div key={section.title}>
          <h2
            className={
              si === 0
                ? "mt-12 font-[family-name:var(--font-display)] text-xl font-medium"
                : "mt-10 font-[family-name:var(--font-display)] text-xl font-medium"
            }
          >
            {section.title}
          </h2>
          {section.blocks.map((block, bi) => renderLegalBlock(block, si * 100 + bi))}
        </div>
      ))}

      {footerNotes.map((note, i) => (
        <p key={note.bold} className={`${i === 0 ? "mt-4" : ""} text-sm text-[var(--muted)]`.trim()}>
          <strong>{note.bold}</strong>
          {note.text}
        </p>
      ))}
      <p className="mt-6 text-sm text-[var(--muted)]">{t("versionLine")}</p>
      <p className="text-sm text-[var(--muted)]">{t("complianceNote")}</p>
    </LegalPageTemplate>
  );
}
