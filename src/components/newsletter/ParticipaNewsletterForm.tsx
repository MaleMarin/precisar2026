"use client";

import { useState, type FormEvent } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useHonestSubmit } from "@/components/participa/useHonestSubmit";
import { subscribeNewsletter } from "@/lib/newsletter/subscribeNewsletter";
import { NEWSLETTER } from "@/lib/site";

export function ParticipaNewsletterForm() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("newsletterForm");
  const [thanks, setThanks] = useState(false);
  const { submitting, error, statusRef, start, fail, succeed } = useHonestSubmit();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (NEWSLETTER.formActionUrl) {
      if (submitting) {
        e.preventDefault();
        return;
      }
      if (!e.currentTarget.reportValidity()) {
        e.preventDefault();
        return;
      }
      start();
      return;
    }

    e.preventDefault();
    if (submitting) return;
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
    if (!start()) return;

    try {
      await subscribeNewsletter({
        email: emailInput.value,
        source: "participa",
        locale,
        path: pathname,
      });
      succeed();
      setThanks(true);
    } catch (err) {
      console.error("[newsletter participa]", err);
      fail(t("errorFailed"));
    }
  };

  if (thanks) {
    return (
      <p className="mt-4 max-w-xl text-sm text-[var(--fg)]" role="status">
        {t("thanks")}
      </p>
    );
  }

  return (
    <form
      className="mt-6 max-w-lg space-y-5"
      action={NEWSLETTER.formActionUrl ?? undefined}
      method={NEWSLETTER.formActionUrl ? "post" : undefined}
      onSubmit={onSubmit}
    >
      <p className="text-sm text-[var(--muted)]">
        {NEWSLETTER.formActionUrl ? (
          <>
            {t("providerNoteBefore")}{" "}
            <code className="rounded bg-[var(--surface)] px-1 font-mono text-[10px]">
              NEXT_PUBLIC_NEWSLETTER_FORM_ACTION
            </code>
            {t("providerNoteAfter")}
          </>
        ) : (
          <>
            {t("firebaseNoteBefore")}{" "}
            <code className="font-mono text-[10px]">newsletter_suscripciones</code>
            {t("firebaseNoteAfter")}
          </>
        )}
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
        <div
          ref={statusRef}
          className="text-sm text-[#b42318]"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          tabIndex={-1}
        >
          {error}
        </div>
      ) : null}
      <button type="submit" className="prec-btn prec-btn--ghost" disabled={submitting}>
        {submitting ? t("sending") : t("subscribe")}
      </button>
    </form>
  );
}
