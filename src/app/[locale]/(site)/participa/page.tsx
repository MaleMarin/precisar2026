import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { ParticipaNewsletterForm } from "@/components/newsletter/ParticipaNewsletterForm";
import { EXTERNAL, SITE } from "@/lib/site";
import { participaContactRedirect } from "./actions";

const contactFormReady = Boolean(
  process.env.RESEND_API_KEY?.trim() && process.env.FOOTER_CONTACT_FROM?.trim(),
);

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "participaPage" });
  return { title: t("metaTitle") };
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
      {!contactFormReady ? (
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
          {t("writeTeamBuilding")}
        </p>
      ) : (
        <>
          <p className="mt-4 text-sm text-[var(--muted)]">
            {t("writeTeamRedirectBefore")}
            <Link href="/participa/gracias" className="text-[var(--fg)] underline-offset-2 hover:underline">
              /participa/gracias
            </Link>
            {t("writeTeamRedirectAfter")}
          </p>
          <form action={participaContactRedirect} className="mt-8 max-w-lg space-y-5">
            <div>
              <label className="prec-kicker mb-2 block" htmlFor="participa-contact-nombre">
                {t("labelName")}
              </label>
              <input
                id="participa-contact-nombre"
                name="nombre"
                type="text"
                autoComplete="name"
                className="prec-input"
              />
            </div>
            <div>
              <label className="prec-kicker mb-2 block" htmlFor="participa-contact-email">
                {t("labelEmail")}
              </label>
              <input
                id="participa-contact-email"
                name="email"
                type="email"
                autoComplete="email"
                className="prec-input"
                required
              />
            </div>
            <div>
              <label className="prec-kicker mb-2 block" htmlFor="participa-contact-mensaje">
                {t("labelMessage")}
              </label>
              <textarea
                id="participa-contact-mensaje"
                name="mensaje"
                rows={4}
                className="prec-input min-h-[8rem] resize-y"
              />
            </div>
            <button type="submit" className="prec-btn prec-btn--primary">
              {t("send")}
            </button>
          </form>
        </>
      )}

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
