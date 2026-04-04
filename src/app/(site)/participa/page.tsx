import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { EXTERNAL, NEWSLETTER, SITE } from "@/lib/site";
import { participaContactRedirect } from "./actions";

export const metadata = { title: "¿Cómo te informas hoy?" };

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
      <p className="text-sm text-[var(--muted)]">
        Formulario de demostración: al enviar se redirige a{" "}
        <Link href="/participa/gracias" className="text-[var(--fg)] underline-offset-2 hover:underline">
          /participa/gracias
        </Link>
        . Conectar luego a correo, CRM o API según operación real.
      </p>
      <form action={participaContactRedirect} className="mt-8 max-w-lg space-y-5">
        <div>
          <label className="prec-kicker mb-2 block">Nombre</label>
          <input name="nombre" type="text" autoComplete="name" className="prec-input" />
        </div>
        <div>
          <label className="prec-kicker mb-2 block">Correo</label>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className="prec-input"
            required
          />
        </div>
        <div>
          <label className="prec-kicker mb-2 block">Mensaje</label>
          <textarea name="mensaje" rows={4} className="prec-input min-h-[8rem] resize-y" />
        </div>
        <button type="submit" className="prec-btn prec-btn--primary">
          Enviar
        </button>
      </form>

      <h2 className="mt-16 font-[family-name:var(--font-display)] text-xl font-medium tracking-tight md:text-2xl">
        Newsletter
      </h2>
      {NEWSLETTER.formActionUrl ? (
        <form action={NEWSLETTER.formActionUrl} method="post" className="mt-6 max-w-lg space-y-5">
          <p className="text-sm text-[var(--muted)]">
            Alta gestionada por el proveedor en{" "}
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
      ) : (
        <p className="mt-4 max-w-xl text-sm text-[var(--muted)]">
          El boletín aún no tiene <code className="font-mono text-[10px]">action</code> pública
          configurada. Define el proveedor (Mailchimp, Brevo, Buttondown, etc.), crea el formulario
          allí y asigna la URL en{" "}
          <code className="font-mono text-[10px]">NEXT_PUBLIC_NEWSLETTER_FORM_ACTION</code>. Textos
          legales en{" "}
          <Link href="/legal/privacidad-consulta-2026" className="text-[var(--fg)] underline-offset-2 hover:underline">
            privacidad consulta
          </Link>{" "}
          y{" "}
          <Link href="/legal/privacidad-bot-onda" className="text-[var(--fg)] underline-offset-2 hover:underline">
            Bot ONDA
          </Link>
          .
        </p>
      )}

      <p className="mt-12 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)]">
        Contacto directo:{" "}
        <a href={`mailto:${SITE.contactEmail}`} className="font-medium text-[var(--fg)] hover:text-[var(--accent)]">
          {SITE.contactEmail}
        </a>
      </p>
    </PageShell>
  );
}
