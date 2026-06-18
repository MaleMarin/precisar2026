"use client";

import { useState, type FormEvent } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { subscribeNewsletter } from "@/lib/newsletter/subscribeNewsletter";
import { NEWSLETTER } from "@/lib/site";

export function ParticipaNewsletterForm() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("newsletterForm");
  const [thanks, setThanks] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (NEWSLETTER.formActionUrl) return;

    e.preventDefault();
    const form = e.currentTarget;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const consent = form.elements.namedItem("consent") as HTMLInputElement | null;

    if (!emailInput?.value?.trim() || !emailInput.validity.valid) {
      emailInput?.reportValidity();
      return;
    }
    if (consent && !consent.checked) {
      consent.reportValidity();
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await subscribeNewsletter({
        email: emailInput.value,
        source: "participa",
        locale,
        path: pathname,
      });
      setThanks(true);
    } catch (err) {
      console.error("[newsletter participa]", err);
      const msg = err instanceof Error ? err.message : "";
      setError(
        msg && msg !== "SUBSCRIBE_FAILED"
          ? msg
          : t("errorFailed"),
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (thanks) {
    return (
      <p className="mt-4 max-w-xl text-sm text-[var(--fg)]" role="status">
        {t("thanks")}
      </p>
    );
  }

  if (NEWSLETTER.formActionUrl) {
    return (
      <form action={NEWSLETTER.formActionUrl} method="post" className="mt-6 max-w-lg space-y-5">
        <p className="text-sm text-[var(--muted)]">
          {t("providerNoteBefore")}{" "}
          <code className="rounded bg-[var(--surface)] px-1 font-mono text-[10px]">
            NEXT_PUBLIC_NEWSLETTER_FORM_ACTION
          </code>
          {t("providerNoteAfter")}
        </p>
        <input
          type="email"
          name="email"
          placeholder={t("emailPlaceholder")}
          required
          className="prec-input"
        />
        <label className="flex items-start gap-3 text-sm leading-snug">
          <input type="checkbox" name="consent" required className="mt-1 size-3.5 accent-[var(--fg)]" />
          <span>
            {t("consentBefore")}{" "}
            <Link href="/legal/privacidad-consulta-2026" className="underline underline-offset-2">
              {t("privacyPolicy")}
            </Link>{" "}
            {t("consentAfter")}
          </span>
        </label>
        <button type="submit" className="prec-btn prec-btn--ghost">
          {t("subscribe")}
        </button>
      </form>
    );
  }

  return (
    <form className="mt-6 max-w-lg space-y-5" onSubmit={onSubmit}>
      <p className="text-sm text-[var(--muted)]">
        {t("firebaseNoteBefore")}{" "}
        <code className="font-mono text-[10px]">newsletter_suscripciones</code>
        {t("firebaseNoteAfter")}
      </p>
      <input
        type="email"
        name="email"
        placeholder={t("emailPlaceholder")}
        required
        autoComplete="email"
        disabled={submitting}
        className="prec-input"
      />
      <label className="flex items-start gap-3 text-sm leading-snug">
        <input
          type="checkbox"
          name="consent"
          required
          disabled={submitting}
          className="mt-1 size-3.5 accent-[var(--fg)]"
        />
        <span>
          {t("consentBefore")}{" "}
          <Link href="/legal/privacidad-consulta-2026" className="underline underline-offset-2">
            {t("privacyPolicy")}
          </Link>{" "}
          {t("consentAfter")}
        </span>
      </label>
      {error ? (
        <p className="text-sm text-[#b42318]" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        className="prec-btn prec-btn--ghost"
        disabled={submitting}
      >
        {submitting ? t("sending") : t("subscribe")}
      </button>
    </form>
  );
}
