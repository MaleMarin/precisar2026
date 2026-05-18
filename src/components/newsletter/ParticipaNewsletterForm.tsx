"use client";

import { useState, type FormEvent } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import {
  isNewsletterFirebaseReady,
  persistNewsletterSubscription,
} from "@/lib/newsletter/persistNewsletterSubscription";
import { NEWSLETTER } from "@/lib/site";

export function ParticipaNewsletterForm() {
  const locale = useLocale();
  const pathname = usePathname();
  const [thanks, setThanks] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const firebaseReady = isNewsletterFirebaseReady();

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

    if (!firebaseReady) {
      setError(
        "El boletín aún no está conectado. Configura Firebase (NEXT_PUBLIC_FIREBASE_ENCUESTA_*) o un proveedor externo (NEXT_PUBLIC_NEWSLETTER_FORM_ACTION).",
      );
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      await persistNewsletterSubscription({
        email: emailInput.value,
        source: "participa",
        locale,
        path: pathname,
      });
      setThanks(true);
    } catch (err) {
      console.error("[newsletter participa]", err);
      setError("No pudimos registrar tu correo. Intenta de nuevo en unos minutos.");
    } finally {
      setSubmitting(false);
    }
  };

  if (thanks) {
    return (
      <p className="mt-4 max-w-xl text-sm text-[var(--fg)]" role="status">
        Ya estás dentro. Pronto recibirás novedades de Precisar.
      </p>
    );
  }

  if (NEWSLETTER.formActionUrl) {
    return (
      <form action={NEWSLETTER.formActionUrl} method="post" className="mt-6 max-w-lg space-y-5">
        <p className="text-sm text-[var(--muted)]">
          Alta gestionada por el proveedor configurado en{" "}
          <code className="rounded bg-[var(--surface)] px-1 font-mono text-[10px]">
            NEXT_PUBLIC_NEWSLETTER_FORM_ACTION
          </code>
          .
        </p>
        <input
          type="email"
          name="email"
          placeholder="correo@ejemplo.cl"
          required
          className="prec-input"
        />
        <label className="flex items-start gap-3 text-sm leading-snug">
          <input type="checkbox" name="consent" required className="mt-1 size-3.5 accent-[var(--fg)]" />
          <span>
            Acepto la{" "}
            <Link href="/legal/privacidad-consulta-2026" className="underline underline-offset-2">
              política de privacidad
            </Link>{" "}
            y el tratamiento de datos para recibir novedades.
          </span>
        </label>
        <button type="submit" className="prec-btn prec-btn--ghost">
          Suscribirme
        </button>
      </form>
    );
  }

  return (
    <form className="mt-6 max-w-lg space-y-5" onSubmit={onSubmit}>
      {firebaseReady ? (
        <p className="text-sm text-[var(--muted)]">
          Tu correo se guarda de forma segura en nuestra base de datos (Firebase · proyecto Encuesta
          Información) para enviarte novedades de Precisar.
        </p>
      ) : (
        <p className="text-sm text-[var(--muted)]">
          El boletín aún no tiene proveedor ni Firebase configurado. Revisa las variables en{" "}
          <code className="font-mono text-[10px]">.env.example</code>.
        </p>
      )}
      <input
        type="email"
        name="email"
        placeholder="correo@ejemplo.cl"
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
          Acepto la{" "}
          <Link href="/legal/privacidad-consulta-2026" className="underline underline-offset-2">
            política de privacidad
          </Link>{" "}
          y el tratamiento de datos para recibir novedades.
        </span>
      </label>
      {error ? (
        <p className="text-sm text-[#b42318]" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" className="prec-btn prec-btn--ghost" disabled={submitting || !firebaseReady}>
        {submitting ? "Enviando…" : "Suscribirme"}
      </button>
    </form>
  );
}
