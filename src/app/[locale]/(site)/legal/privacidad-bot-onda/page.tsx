import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LegalPageTemplate } from "@/components/templates/PageTemplates";
import { renderBotListItem, renderBotPara } from "@/components/legal/LegalStructuredContent";
import { pageSeo } from "@/lib/seo";
import { SITE } from "@/lib/site";

type ListItem = string | { strong?: string; text: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legalPrivacidadBotOnda" });
  return pageSeo({
    locale,
    pathname: "/legal/privacidad-bot-onda",
    title: t("metaTitle"),
  });
}

export default async function Page() {
  const t = await getTranslations("legalPrivacidadBotOnda");
  const siteHost = SITE.url.replace(/^https:\/\//, "");
  const s2WebItems = t.raw("s2WebItems") as ListItem[];
  const s2WaItems = t.raw("s2WaItems") as ListItem[];
  const s3Items = t.raw("s3Items") as ListItem[];
  const s4Providers = t.raw("s4Providers") as ListItem[];
  const s5Paras = t.raw("s5Paras") as ListItem[];
  const s7Rights = t.raw("s7Rights") as string[];
  const s9Paras = t.raw("s9Paras") as string[];

  return (
    <LegalPageTemplate title={t("title")} kicker={t("kicker")}>
      <p className="text-sm text-[var(--muted)]">{t("lastUpdated")}</p>
      <p className="mt-2 text-sm">
        <strong>{t("responsible")}</strong> {t("responsibleValue", { siteHost })}
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s1Title")}</h2>
      <p>{t("s1Body")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s2Title")}</h2>
      <h3 className="mt-6 text-base font-medium">{t("s2WebTitle")}</h3>
      <ul className="list-disc space-y-2 pl-5">
        {s2WebItems.map((item, i) => renderBotListItem(item, i))}
      </ul>

      <h3 className="mt-6 text-base font-medium">{t("s2WaTitle")}</h3>
      <ul className="list-disc space-y-2 pl-5">
        {s2WaItems.map((item, i) => renderBotListItem(item, i))}
      </ul>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s3Title")}</h2>
      <ul className="list-disc space-y-2 pl-5">
        {s3Items.map((item, i) => renderBotListItem(item, i))}
      </ul>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s4Title")}</h2>
      <p>
        <strong>{t("s4Intro")}</strong>
      </p>
      <ul className="mt-2 list-disc space-y-2 pl-5">
        {s4Providers.map((item, i) => renderBotListItem(item, i))}
      </ul>
      <p className="mt-4">{t("s4Closing")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s5Title")}</h2>
      {s5Paras.map((para, i) => (
        <p key={i}>{renderBotPara(para)}</p>
      ))}

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s6Title")}</h2>
      <p>{t("s6Body")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s7Title")}</h2>
      <p>{t("s7Intro")}</p>
      <ul className="mt-4 list-disc space-y-1 pl-5">
        {s7Rights.map((right) => (
          <li key={right}>{right}</li>
        ))}
      </ul>
      <p className="mt-4">{t("s7Closing")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s8Title")}</h2>
      <p>{t("s8Org")}</p>
      <p>
        {t("s8WebLabel")}{" "}
        <a href={SITE.url}>{siteHost}</a>
      </p>
      <p>
        {t("s8PrivacyLabel")}{" "}
        <a href={`mailto:${SITE.privacyEmail}`}>{SITE.privacyEmail}</a>
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s9Title")}</h2>
      {s9Paras.map((para, i) => (
        <p key={i} className={i > 0 ? "mt-4" : undefined}>
          {para}
        </p>
      ))}
    </LegalPageTemplate>
  );
}
