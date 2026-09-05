import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { ParticipaNewsletterForm } from "@/components/newsletter/ParticipaNewsletterForm";
import { ParticipaContactForm } from "@/components/participa/ParticipaContactForm";
import { pageSeo } from "@/lib/seo";
import { EXTERNAL, SITE } from "@/lib/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "participaPage" });
  return pageSeo({ locale, pathname: "/participa", title: t("metaTitle") });
}

export default async function Page() {
  const t = await getTranslations("participaPage");

  return (
    <PageShell title={t("title")} kicker={t("kicker")}>
      <p>{t("lead")}</p>

      <div className="mt-10 max-w-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
        <p className="prec-kicker">{t("consultaKicker")}</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{t("consultaBody")}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={EXTERNAL.consultaCiudadana} className="prec-btn prec-btn--primary" target="_blank" rel="noreferrer">
            {t("consultaOpen")}
          </a>
          <Link href="/legal/privacidad-consulta-2026" className="prec-btn prec-btn--ghost">
            {t("consultaPrivacy")}
          </Link>
        </div>
      </div>

      <h2 className="mt-16 font-[family-name:var(--font-display)] text-xl font-medium tracking-tight md:text-2xl">
        {t("writeTeamTitle")}
      </h2>
      <p className="mt-4 text-sm text-[var(--muted)]">
        {t("writeTeamRedirectBefore")}
        <Link href="/participa/gracias" className="text-[var(--fg)] underline-offset-2 hover:underline">
          /participa/gracias
        </Link>
        {t("writeTeamRedirectAfter")}
      </p>
      <ParticipaContactForm />

      <h2 className="mt-16 font-[family-name:var(--font-display)] text-xl font-medium tracking-tight md:text-2xl">
        {t("newsletterTitle")}
      </h2>
      <ParticipaNewsletterForm />

      <p className="mt-12 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)]">
        {t("directContact")}{" "}
        <a href={`mailto:${SITE.contactEmail}`} className="font-medium text-[var(--fg)] hover:text-[var(--accent)]">
          {SITE.contactEmail}
        </a>
      </p>
    </PageShell>
  );
}
