import { Link } from "@/i18n/navigation";
import type { ReactNode } from "react";

export type CtaBlockProps = {
  headline: ReactNode;
  description?: ReactNode;
  buttonLabel: string;
  href?: string;
};

export function CtaBlock({
  headline,
  description,
  buttonLabel,
  href = "/contacto",
}: CtaBlockProps) {
  return (
    <section
      className="mx-auto w-full max-w-5xl px-4 sm:px-6 pb-20 sm:pb-28"
      aria-label="Llamada a la acción"
    >
      <div
        style={{
          border: "0.5px solid #DB5227",
          borderRadius: 8,
          padding: "clamp(1.5rem, 4vw, 2.5rem)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-bebas), sans-serif",
            fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
            lineHeight: 1.15,
            letterSpacing: "0.02em",
            marginBottom: description ? "0.75rem" : "1.25rem",
          }}
        >
          {headline}
        </p>
        {description ? (
          <p
            style={{
              color: "#A0A0A0",
              fontSize: 15,
              lineHeight: 1.6,
              marginBottom: "1.25rem",
              maxWidth: 640,
            }}
          >
            {description}
          </p>
        ) : null}
        <Link
          href={href}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            backgroundColor: "#DB5227",
            color: "#ffffff",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: "0.04em",
            padding: "0.65rem 1.25rem",
            borderRadius: 6,
            textDecoration: "none",
          }}
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
