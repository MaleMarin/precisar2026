import Link from "next/link";
import { footerContactRedirect } from "@/app/(site)/participa/actions";
import { EXTERNAL, FOOTER_MEDIA, NEWSLETTER, SITE } from "@/lib/site";
import styles from "./SiteFooter.module.css";

const FOOTER_NAV = [
  { label: "Inicio", href: "/" },
  { label: "Participa", href: "/participa" },
  { label: "Qué Hacemos", href: "/programas" },
  { label: "Educación Mediática", href: "/educaciónmediática" },
  { label: "Saberes", href: "/saberes" },
  { label: "Precisando", href: "/precisando" },
  { label: "Somos Precisar", href: "/somos" },
] as const;

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={26} height={26} aria-hidden>
      <path
        fill="currentColor"
        d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
      />
    </svg>
  );
}

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={`mt-auto font-[family-name:var(--font-sans-family)]`}>
      <div className={styles.brandStrip}>
        <div className="prec-container">
          <div className={styles.brandLogoWrap}>
            <div className={styles.brandLogoCrop}>
              <img
                src={FOOTER_MEDIA.logoWordmark}
                alt={SITE.name}
                className={styles.logoWordmark}
                width={1200}
                height={280}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
          <div className={styles.brandMarkRow}>
            <img
              src={FOOTER_MEDIA.symbol}
              alt=""
              aria-hidden
              className={styles.logoSymbol}
              width={96}
              height={96}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div className={`${styles.root} pt-5 pb-16 md:pt-6 md:pb-20 lg:pb-24`}>
        <div className="prec-container">
          <div className="mb-12 max-w-2xl md:mb-16">
          <p className="text-lg font-medium leading-snug text-white md:text-xl">
            Hay conversaciones que no caben en un post.
          </p>
          <p className="mt-5 text-sm leading-relaxed text-white/75 md:text-base">
            Únete a nuestra comunidad y recibe análisis más profundos, recursos exclusivos y perspectivas del entorno
            digital.
          </p>
          <p className="mt-6 text-sm font-medium text-white/90">Suscríbete aquí.</p>

          <div className="mt-4">
            <label className="mb-2 block text-xs tracking-wide text-white/70">
              Correo electrónico <span className="text-white">*</span>
            </label>
            {NEWSLETTER.formActionUrl ? (
              <form
                action={NEWSLETTER.formActionUrl}
                method="post"
                className="flex flex-col gap-3 sm:flex-row sm:items-stretch"
              >
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="escribe tu correo"
                  className={styles.newsletterField}
                />
                <button type="submit" className={styles.btnSubscribe}>
                  Suscribirme
                </button>
              </form>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                <Link
                  href="/participa#boletin"
                  className={`${styles.btnSubscribe} inline-flex w-full items-center justify-center text-center no-underline sm:w-auto`}
                >
                  Suscribirme
                </Link>
                <p className="text-xs text-white/45 sm:max-w-xs sm:pb-2">
                  Completa tu correo en la sección Newsletter de Participa.
                </p>
              </div>
            )}
          </div>
          </div>

          <div className="mb-12 grid gap-12 lg:mb-16 lg:grid-cols-2 lg:gap-16">
          <nav aria-label="Pie de página">
            <ul className="space-y-4 text-sm md:text-base">
              {FOOTER_NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-white/90 transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-lg font-medium tracking-tight text-white md:text-xl">Contáctanos</h2>
            <form action={footerContactRedirect} className="mt-8 space-y-6">
              <div>
                <label className="mb-1 block text-xs text-white/65">
                  Nombre <span className="text-white">*</span>
                </label>
                <input name="nombre" type="text" autoComplete="given-name" required className={styles.inputLine} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/65">
                  Apellido <span className="text-white">*</span>
                </label>
                <input name="apellido" type="text" autoComplete="family-name" required className={styles.inputLine} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/65">
                  Email <span className="text-white">*</span>
                </label>
                <input name="email" type="email" autoComplete="email" required className={styles.inputLine} />
              </div>
              <div>
                <label className="mb-1 block text-xs text-white/65">
                  Mensaje <span className="text-white">*</span>
                </label>
                <textarea name="mensaje" rows={3} required className={`${styles.inputLine} resize-y min-h-[4.5rem]`} />
              </div>
              <button type="submit" className={styles.btnSend}>
                Enviar
              </button>
            </form>
          </div>
          </div>

          <div className="border-t border-white/10 pt-10 text-xs leading-relaxed text-white/55 md:text-sm">
          <p className="max-w-xl">
            Precisar. Hecho con criterio en Chile 🇨🇱 y México 🇲🇽.
          </p>
          <p className="mt-6 max-w-4xl">
            © {year} Precisar. Todos los derechos reservados. Onda de Precisar es una marca registrada y un servicio
            oficial de comunicación de la Fundación Precisar.
          </p>
          <Link
            href="/legal/privacidad-consulta-2026"
            className="mt-4 inline-block border-b border-white/30 pb-px text-white/80 transition-colors hover:border-white hover:text-white"
          >
            Política de Privacidad
          </Link>
          </div>
        </div>
      </div>

      <a
        href={EXTERNAL.whatsappShare}
        target="_blank"
        rel="noreferrer"
        className={styles.whatsappFab}
        aria-label="WhatsApp"
      >
        <WhatsAppIcon />
      </a>
    </footer>
  );
}
