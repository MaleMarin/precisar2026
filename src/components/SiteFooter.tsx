"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { footerContactRedirect } from "@/app/[locale]/(site)/participa/actions";
import { EXTERNAL, FOOTER_MEDIA, NAV_PRIMARY, NAV_PRIMARY_I18N_KEY, NEWSLETTER } from "@/lib/site";
import styles from "./SiteFooter.module.css";

function isHomePath(pathname: string): boolean {
  const n = pathname.replace(/\/+$/, "") || "/";
  return n === "/";
}

const WHATSAPP_HREF = "https://wa.me/56991553279";

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
  const tNav = useTranslations("nav");
  const pathname = usePathname();
  const isHome = isHomePath(pathname);

  const scrollToHomeSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const i = href.indexOf("#");
      if (i < 0 || !isHome) return;
      const id = href.slice(i + 1);
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      const nextHash = `#${id}`;
      if (typeof window !== "undefined" && window.location.hash !== nextHash) {
        window.history.pushState(null, "", nextHash);
      }
    },
    [isHome],
  );

  return (
    <footer className={styles.footer}>
      <div className={styles.block1}>
        <div className={styles.brandStrip}>
          <Link href="/" className={styles.brandLogoLink}>
            <img
              src={FOOTER_MEDIA.footerBrandStrip}
              alt="Precisar"
              width={1920}
              height={1080}
              className={styles.brandLogo}
              decoding="async"
            />
          </Link>
        </div>
      </div>

      <div className={styles.main}>
        <div className="prec-container">
          <section className={styles.newsletterSection} aria-labelledby="footer-newsletter-heading">
            <h2 id="footer-newsletter-heading" className={styles.visuallyHidden}>
              Newsletter
            </h2>
            <p className={styles.newsTitle}>Hay conversaciones que no caben en un post.</p>
            <p className={styles.newsBody}>
              Únete a nuestra comunidad y recibe análisis más profundos, recursos exclusivos y perspectivas del
              entorno digital.
            </p>
            <p className={styles.newsCta}>Suscríbete aquí.</p>

            <div className={styles.newsForm}>
              {NEWSLETTER.formActionUrl ? (
                <form action={NEWSLETTER.formActionUrl} method="post" className={styles.newsFormInner}>
                  <label className={styles.newsFieldLabel} htmlFor="footer-newsletter-email">
                    Correo electrónico <span aria-hidden>*</span>
                  </label>
                  <div className={styles.newsRow}>
                    <input
                      id="footer-newsletter-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="Escribe tu correo"
                      className={styles.newsletterField}
                    />
                    <button type="submit" className={styles.btnSubscribe}>
                      Suscribirme
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <div className={styles.newsRow}>
                    <Link href="/participa#boletin" className={styles.btnSubscribe}>
                      Suscribirme
                    </Link>
                  </div>
                  <p className={styles.fallbackNote}>
                    Completa tu correo en la sección Newsletter de Participa.
                  </p>
                </>
              )}
            </div>
          </section>

          <div className={styles.bottomGrid}>
            <nav aria-label={tNav("main")}>
              <ul className={styles.navList}>
                {NAV_PRIMARY.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={styles.navLink}
                      onClick={(e) => scrollToHomeSection(e, item.href)}
                    >
                      {NAV_PRIMARY_I18N_KEY[item.href] ? tNav(NAV_PRIMARY_I18N_KEY[item.href]) : item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={EXTERNAL.botOnda}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                  >
                    <span className={styles.footerBotOndaLine}>
                      {tNav("botOnda")}
                      <span className={styles.footerBotOndaBeta}>{tNav("botOndaBeta")}</span>
                    </span>
                  </a>
                </li>
              </ul>
            </nav>

            <div>
              <h2 className={styles.contactTitle}>Contáctanos</h2>
              <form action={footerContactRedirect} className={styles.contactForm}>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="footer-nombre">
                    Nombre
                  </label>
                  <input
                    id="footer-nombre"
                    name="nombre"
                    type="text"
                    autoComplete="given-name"
                    required
                    className={styles.inputLine}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="footer-apellido">
                    Apellido
                  </label>
                  <input
                    id="footer-apellido"
                    name="apellido"
                    type="text"
                    autoComplete="family-name"
                    required
                    className={styles.inputLine}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="footer-email">
                    Email
                  </label>
                  <input
                    id="footer-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className={styles.inputLine}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="footer-mensaje">
                    Mensaje
                  </label>
                  <textarea
                    id="footer-mensaje"
                    name="mensaje"
                    rows={3}
                    required
                    className={`${styles.inputLine} ${styles.textareaLine}`}
                  />
                </div>
                <div className={styles.btnSendWrap}>
                  <button type="submit" className={styles.btnSend}>
                    Enviar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.legal}>
        <div className="prec-container">
          <div className={styles.legalGrid}>
            <p className={styles.legalLeft}>
              Precisar. Hecho con criterio en Chile 🇨🇱 y México 🇲🇽.
            </p>
            <div className={styles.legalRightCol}>
              <p className={styles.legalRight}>
                © {year} Precisar. Todos los derechos reservados. Onda de Precisar es una marca registrada y un servicio
                oficial de comunicación de la Fundación Precisar.
              </p>
              <Link href="/legal/privacidad-consulta-2026" className={styles.privacyLink}>
                Política de Privacidad
              </Link>
            </div>
          </div>
          <div className={styles.footerOndaWrap}>
            <a
              href={EXTERNAL.botOnda}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.footerOndaLink}
              aria-label={tNav("botOndaAria")}
            >
              <img
                src={FOOTER_MEDIA.navOndaMark}
                alt=""
                width={96}
                height={96}
                decoding="async"
                className={styles.footerOndaLogo}
              />
              <span className={styles.footerOndaBeta}>{tNav("botOndaBeta")}</span>
            </a>
          </div>
        </div>
      </div>

      <a
        href={WHATSAPP_HREF}
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
