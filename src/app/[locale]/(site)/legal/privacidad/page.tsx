import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LegalPageTemplate } from "@/components/templates/PageTemplates";
import { SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legalPrivacidad" });
  return { title: t("metaTitle") };
}

export default async function Page() {
  const t = await getTranslations("legalPrivacidad");
  const contactEmail = SITE.contactEmail as string;
  const privacyEmail = SITE.privacyEmail as string;
  const siteHost = SITE.url.replace(/^https:\/\//, "");
  const s3Items = t.raw("s3Items") as { strong: string; text: string }[];
  const s6Links = t.raw("s6Links") as { href: string; label: string }[];

  return (
    <LegalPageTemplate
      title={t("title")}
      kicker={t("kicker", { siteHost })}
    >
      <p className="text-sm text-[var(--muted)]">{t("lastUpdated")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s1Title")}</h2>
      <p>{t("s1Body", { siteName: SITE.name, siteUrl: SITE.url })}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s2Title")}</h2>
      <p>
        {t("s2BodyBefore", { siteName: SITE.name })}{" "}
        <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        {privacyEmail !== contactEmail ? (
          <>
            {" "}
            {t("s2BodyOrSensitive")}{" "}
            <a href={`mailto:${privacyEmail}`}>{privacyEmail}</a>
          </>
        ) : null}
        .
      </p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s3Title")}</h2>
      <ul className="list-disc space-y-2 pl-5">
        {s3Items.map((item) => (
          <li key={item.strong}>
            <strong>{item.strong}</strong>
            {item.text}
          </li>
        ))}
      </ul>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s4Title")}</h2>
      <p>{t("s4Body")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s5Title")}</h2>
      <p>{t("s5Body")}</p>

      <h2 className="mt-10 font-[family-name:var(--font-display)] text-xl font-medium">{t("s6Title")}</h2>
      <p>{t("s6Intro", { siteName: SITE.name })}</p>
      <ul className="list-disc space-y-2 pl-5">
        {s6Links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="underline underline-offset-2">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </LegalPageTemplate>
  );
}
