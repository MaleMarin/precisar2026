import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LegalPageTemplate } from "@/components/templates/PageTemplates";
import { pageSeo } from "@/lib/seo";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legalTerminos" });
  return pageSeo({ locale, pathname: "/legal/terminos", title: t("metaTitle") });
}

export default async function Page() {
  const t = await getTranslations("legalTerminos");
  const siteHost = SITE.url.replace(/^https:\/\//, "");
  const contactEmail = SITE.contactEmail as string;

  return (
    <LegalPageTemplate title={t("title")} kicker={t("kicker", { siteHost })}>
      <p className="text-sm text-[var(--muted)]">{t("lastUpdated")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s1Title")}</h2>
      <p>{t("s1Body")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s2Title")}</h2>
      <p>{t("s2Body")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s3Title")}</h2>
      <p>{t("s3Body")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s4Title")}</h2>
      <p>{t("s4Body")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s5Title")}</h2>
      <p>{t("s5Body")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s6Title")}</h2>
      <p>
        {t("s6BodyBefore")}
        <Link href="/legal/privacidad" className="underline underline-offset-2">
          {t("s6PrivacyLink")}
        </Link>
        {t("s6BodyMid")}
        <Link href="/legal/privacidad-bot-onda" className="underline underline-offset-2">
          {t("s6BotLink")}
        </Link>
        {t("s6BodyAfter")}
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s7Title")}</h2>
      <p>{t("s7Body")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s8Title")}</h2>
      <p>
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
      </p>
    </LegalPageTemplate>
  );
}
