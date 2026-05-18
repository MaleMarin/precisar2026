import { Link } from "@/i18n/navigation";
import { PageShell } from "@/components/PageShell";
import { ParticipaNewsletterForm } from "@/components/newsletter/ParticipaNewsletterForm";
import { EXTERNAL, SITE } from "@/lib/site";
import { participaContactRedirect } from "./actions";

export const metadata = { title: "¿Cómo te informas hoy?" };

const contactFormReady = Boolean(
  process.env.RESEND_API_KEY?.trim() && process.env.FOOTER_CONTACT_FROM?.trim(),
);

export default function Page() {
  return (
    <PageShell title="¿Cómo te informas hoy?" kicker="Participa">
      <p>
        Ayúdanos a entender qué información te sirve, cuál te preocupa y qué formatos realmente
        funcionan en tu día a día.
      </p>

      <div className="mt-10 max-w-2xl border border-[var(--border)] bg-[var(--surface)] p-6 md:p-8">
        <p className="prec-kicker">Consulta ciudadana</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
          Entrega tu opinión en el formulario externo y revisa la política de privacidad asociada.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href={EXTERNAL.consultaCiudadana} className="prec-btn prec-btn--primary" target="_blank" rel="noreferrer">
            Abrir consulta
          </a>
          <Link href="/legal/privacidad-consulta-2026" className="prec-btn prec-btn--ghost">
            Privacidad
          </Link>
        </div>
      </div>

      <h2 className="mt-16 font-[family-name:var(--font-display)] text-xl font-medium tracking-tight md:text-2xl">
        Escribir al equipo
      </h2>
      {!contactFormReady ? (
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-[var(--muted)]">
          Este formulario está en construcción. Escríbenos directo a contacto@precisar.net
        </p>
      ) : (
        <>
          <p className="mt-4 text-sm text-[var(--muted)]">
            Al enviar, te redirigiremos a{" "}
            <Link href="/participa/gracias" className="text-[var(--fg)] underline-offset-2 hover:underline">
              /participa/gracias
            </Link>
            .
          </p>
          <form action={participaContactRedirect} className="mt-8 max-w-lg space-y-5">
            <div>
              <label className="prec-kicker mb-2 block" htmlFor="participa-contact-nombre">
                Nombre
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
                Correo
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
                Mensaje
              </label>
              <textarea
                id="participa-contact-mensaje"
                name="mensaje"
                rows={4}
                className="prec-input min-h-[8rem] resize-y"
              />
            </div>
            <button type="submit" className="prec-btn prec-btn--primary">
              Enviar
            </button>
          </form>
        </>
      )}

      <h2 className="mt-16 font-[family-name:var(--font-display)] text-xl font-medium tracking-tight md:text-2xl">
        Newsletter
      </h2>
      <ParticipaNewsletterForm />

      <p className="mt-12 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)]">
        Contacto directo:{" "}
        <a href={`mailto:${SITE.contactEmail}`} className="font-medium text-[var(--fg)] hover:text-[var(--accent)]">
          {SITE.contactEmail}
        </a>
      </p>
    </PageShell>
  );
}
