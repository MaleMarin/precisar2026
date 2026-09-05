"use client";

import { type FormEvent } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useHonestSubmit } from "./useHonestSubmit";

export function ParticipaContactForm() {
  const t = useTranslations("participaPage");
  const router = useRouter();
  const { submitting, error, statusRef, start, fail, succeed } = useHonestSubmit();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    if (!start()) return;

    try {
      const res = await fetch("/api/participa-contact", {
        method: "POST",
        body: new FormData(form),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) {
        fail(t("formError"));
        return;
      }
      succeed();
      router.push("/participa/gracias");
    } catch (err) {
      console.error("[contact participa]", err);
      fail(t("formError"));
    }
  };

  return (
    <form className="mt-8 max-w-lg space-y-5" onSubmit={onSubmit}>
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
          disabled={submitting}
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
          disabled={submitting}
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
          disabled={submitting}
        />
      </div>
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
      <button type="submit" className="prec-btn prec-btn--primary" disabled={submitting}>
        {submitting ? t("sending") : t("send")}
      </button>
    </form>
  );
}
