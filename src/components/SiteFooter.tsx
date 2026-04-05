import Link from "next/link";
import { footerContactRedirect } from "@/app/(site)/participa/actions";
import { EXTERNAL, FOOTER_COLUMNS, FOOTER_MEDIA, NEWSLETTER } from "@/lib/site";
import styles from "./SiteFooter.module.css";

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
    <footer className={styles.footer}>
      <div className={styles.block1}>
        <div className="prec-container">
          <Link href="/" className={styles.wordmarkLink}>
            <img
              src={FOOTER_MEDIA.logoWordmarkFooter}
              alt="Precisar"
              className={styles.logoWordmarkImg}
              width={720}
              height={160}
              loading="lazy"
              decoding="async"
            />
          </Link>
        </div>
      </div>

      <div className={styles.main}>
        <div className="prec-container">
        <div className={styles.threeCol}>
          <div>
            <p className={styles.newsTitle}>Hay conversaciones que no caben en un post.</p>
            <p className={styles.newsBody}>
              Únete a nuestra comunidad y recibe análisis más profundos, recursos exclusivos y perspectivas del entorno
              digital.
            </p>
            <p className={styles.newsCta}>Suscríbete aquí.</p>

            <div className={styles.newsForm}>
              <label className={styles.newsLabel}>
                Correo electrónico <span className="text-white">*</span>
              </label>
              {NEWSLETTER.formActionUrl ? (
                <form
                  action={NEWSLETTER.formActionUrl}
                  method="post"
                  className={styles.newsRow}
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
          </div>

          <nav aria-label="Mapa del sitio">
            <div className={styles.sitemapGrid}>
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title} className={styles.sitemapBlock}>
                  <p className={styles.sitemapHeading}>{col.title}</p>
                  <ul className={styles.sitemapList}>
                    {col.links.map((item) => {
                      const ext = item.href.startsWith("http");
                      return (
                        <li key={`${col.title}-${item.label}`}>
                          {ext ? (
                            <a
                              href={item.href}
                              className={styles.sitemapLink}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item.label}
                            </a>
                          ) : (
                            <Link href={item.href} className={styles.sitemapLink}>
                              {item.label}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          <div>
            <h2 className={styles.contactTitle}>Contáctanos</h2>
            <form action={footerContactRedirect} className={styles.contactForm}>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor="footer-nombre">
                  Nombre <span className="text-white">*</span>
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
                  Apellido <span className="text-white">*</span>
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
                  Email <span className="text-white">*</span>
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
                  Mensaje <span className="text-white">*</span>
                </label>
                <textarea
                  id="footer-mensaje"
                  name="mensaje"
                  rows={3}
                  required
                  className={`${styles.inputLine} min-h-[4.5rem] resize-y`}
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
          <div>
            <p className={styles.legalRight}>
              © {year} Precisar. Todos los derechos reservados. Onda de Precisar es una marca registrada y un servicio
              oficial de comunicación de la Fundación Precisar.
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
              <Link href="/legal/privacidad-consulta-2026" className={styles.privacyLink}>
                Política de privacidad
              </Link>
              <Link href="/legal/privacidad-bot-onda" className={styles.privacyLink}>
                Privacidad Bot ONDA
              </Link>
            </div>
          </div>
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
