"use client";

import { useCallback, useState, type FormEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { footerContactRedirect } from "@/app/[locale]/(site)/participa/actions";
import {
  EXTERNAL,
  FOOTER_CONTACT_ANCHOR_ID,
  FOOTER_MEDIA,
  NAV_PRIMARY,
  NAV_PRIMARY_I18N_KEY,
  NEWSLETTER,
} from "@/lib/site";
import styles from "./SiteFooter.module.css";

function isHomePath(pathname: string): boolean {
  const n = pathname.replace(/\/+$/, "") || "/";
  return n === "/";
}

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={22} height={22} aria-hidden>
      <path
        fill="currentColor"
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
      />
    </svg>
  );
}

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={22} height={22} aria-hidden>
      <path
        fill="currentColor"
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.439 1.441 1.439c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={22} height={22} aria-hidden>
      <path
        fill="currentColor"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

function IconYouTube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width={22} height={22} aria-hidden>
      <path
        fill="currentColor"
        d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
      />
    </svg>
  );
}

function ccByDeedUrl(locale: string): string {
  if (locale === "en") return "https://creativecommons.org/licenses/by/4.0/deed.en";
  if (locale === "pt") return "https://creativecommons.org/licenses/by/4.0/deed.pt";
  return "https://creativecommons.org/licenses/by/4.0/deed.es";
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const tFooter = useTranslations("footer");
  const pathname = usePathname();
  const isHome = isHomePath(pathname);

  const [newsletterThanks, setNewsletterThanks] = useState(false);

  const onNewsletterSubmit = (e: FormEvent<HTMLFormElement>) => {
    if (!NEWSLETTER.formActionUrl) {
      e.preventDefault();
      const form = e.currentTarget;
      const input = form.elements.namedItem("email") as HTMLInputElement | null;
      if (!input?.value?.trim() || !input.validity.valid) {
        input?.reportValidity();
        return;
      }
    }
    setNewsletterThanks(true);
  };

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

  const newsletterForm = newsletterThanks ? (
    <p className={styles.newsBody} role="status">
      Ya estás dentro. Pronto recibirás noticias que vale la pena leer.
    </p>
  ) : NEWSLETTER.formActionUrl ? (
    <form
      action={NEWSLETTER.formActionUrl}
      method="post"
      target="_blank"
      className={styles.newsFormInner}
      onSubmit={onNewsletterSubmit}
    >
      <label className={styles.visuallyHidden} htmlFor="footer-newsletter-email">
        Correo electrónico
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
    <form className={styles.newsFormInner} onSubmit={onNewsletterSubmit}>
      <label className={styles.visuallyHidden} htmlFor="footer-newsletter-email">
        Correo electrónico
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
  );

  return (
    <footer className={styles.footer}>
      {/* 1 · Wordmark + newsletter (centrado, editorial) */}
      <div className={styles.footerBrandZone}>
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

        <div className={`prec-container ${styles.newsletterBand}`}>
          <section className={styles.newsletterSection} aria-labelledby="footer-newsletter-heading">
            <h2 id="footer-newsletter-heading" className={styles.visuallyHidden}>
              Newsletter
            </h2>
            <p className={styles.newsTitle}>Hay conversaciones que no caben en un post.</p>
            <p className={styles.newsBody}>
              Únete a nuestra comunidad y recibe análisis más profundos, recursos exclusivos y perspectivas del
              entorno digital.
            </p>
            <div className={styles.newsForm}>{newsletterForm}</div>
          </section>
        </div>
      </div>

      {/* 2 · Navegación | Contacto */}
      <div className={styles.footerMid}>
        <div className="prec-container">
          <div className={styles.midDivider} aria-hidden />
          <div className={styles.midGrid}>
            <nav className={styles.navColumn} aria-label={tNav("main")}>
              <p className={styles.midEyebrow}>Menú</p>
              <ul className={styles.navList}>
                {NAV_PRIMARY.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${styles.navLink}${item.href === "/#convoca" ? ` ${styles.navLinkPreline}` : ""}`}
                      onClick={(e) => scrollToHomeSection(e, item.href)}
                    >
                      {NAV_PRIMARY_I18N_KEY[item.href] ? tNav(NAV_PRIMARY_I18N_KEY[item.href]) : item.label}
                    </Link>
                  </li>
                ))}
                <li className={styles.navBotOndaItem}>
                  <a
                    href={EXTERNAL.botOnda}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLinkBotOnda}
                  >
                    <span className={styles.navBotOndaLabel}>{tNav("botOnda")}</span>
                    <span className={styles.navBotOndaBeta}>{tNav("botOndaBeta")}</span>
                  </a>
                </li>
              </ul>
            </nav>

            <div className={styles.contactColumn}>
              <h2 className={styles.contactTitle}>Contáctanos</h2>
              <p className={styles.contactLead}>Escribe tu mensaje y te respondemos.</p>
              <form id={FOOTER_CONTACT_ANCHOR_ID} action={footerContactRedirect} className={styles.contactForm}>
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

      {/* 3 · Institucional + legal + Bot Onda integrado */}
      <div className={styles.legal}>
        <div className="prec-container">
          <div className={styles.legalGrid}>
            <div className={styles.legalPrimary}>
              <p className={styles.legalTagline}>
                Precisar. Hecho con criterio en Chile 🇨🇱 y México 🇲🇽.
              </p>
              <div className={styles.socialBlock}>
                <ul className={styles.socialList} aria-label={tFooter("socialEyebrow")}>
                  <li>
                    <a
                      href={EXTERNAL.xTwitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={tFooter("socialX")}
                    >
                      <IconX />
                    </a>
                  </li>
                  <li>
                    <a
                      href={EXTERNAL.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={tFooter("socialInstagram")}
                    >
                      <IconInstagram />
                    </a>
                  </li>
                  <li>
                    <a
                      href={EXTERNAL.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={tFooter("socialFacebook")}
                    >
                      <IconFacebook />
                    </a>
                  </li>
                  <li>
                    <a
                      href={EXTERNAL.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialLink}
                      aria-label={tFooter("socialYouTube")}
                    >
                      <IconYouTube />
                    </a>
                  </li>
                </ul>
              </div>
              <a
                href={EXTERNAL.botOnda}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.legalOndaInline}
                aria-label={tNav("botOndaAria")}
              >
                <img
                  src={FOOTER_MEDIA.navOndaMark}
                  alt=""
                  width={72}
                  height={72}
                  decoding="async"
                  className={styles.legalOndaMark}
                />
                <span className={styles.legalOndaText}>{tNav("botOnda")}</span>
                <span className={styles.legalOndaBetaTag}>{tNav("botOndaBeta")}</span>
              </a>
            </div>
            <div className={styles.legalMeta}>
              <Link href="/legal/privacidad-consulta-2026" className={styles.privacyLink}>
                Política de Privacidad
              </Link>
              <p className={styles.legalLicense}>
                {tFooter("ccLicenseBefore", { year })}
                <a
                  href={ccByDeedUrl(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.licenseLink}
                >
                  {tFooter("ccLicenseName")}
                </a>
                {tFooter("ccLicenseAfter")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
