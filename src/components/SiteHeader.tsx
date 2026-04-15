"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  EXTERNAL,
  FOOTER_MEDIA,
  NAV_PRIMARY,
  NAV_PRIMARY_I18N_KEY,
} from "@/lib/site";
import styles from "./SiteHeader.module.css";

function isHomePath(pathname: string): boolean {
  const n = pathname.replace(/\/+$/, "") || "/";
  return n === "/";
}

const LOCALE_PREFIXES = new Set(routing.locales.map((l) => l.toLowerCase()));

export function SiteHeader() {
  const pathname = usePathname();
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const tLang = useTranslations("language");
  const isHome = isHomePath(pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeMenuBtnRef = useRef<HTMLButtonElement>(null);

  const scrollToHomeSection = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const i = href.indexOf("#");
      if (i < 0) return;
      const id = href.slice(i + 1);
      if (!id || !isHome) return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      const nextHash = `#${id}`;
      if (window.location.hash !== nextHash) {
        window.history.pushState(null, "", nextHash);
      }
      setOpen(false);
    },
    [isHome],
  );

  useEffect(() => {
    const htmlLang = locale === "en" ? "en" : locale === "es" ? "es" : "pt";
    document.documentElement.lang = htmlLang;
  }, [locale]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open) {
      queueMicrotask(() => closeMenuBtnRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (mq.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /**
   * Navegación completa: evita que el cliente se quede con mensajes/RSC del locale anterior
   * (en algunos entornos `router.replace` + next-intl no refrescaba `NextIntlClientProvider`).
   */
  const switchLocale = useCallback((loc: (typeof routing.locales)[number]) => {
    if (locale === loc) return;
    if (typeof window === "undefined") return;
    const segments = window.location.pathname.split("/").filter(Boolean);
    const first = segments[0]?.toLowerCase();
    if (first && LOCALE_PREFIXES.has(first)) {
      segments[0] = loc;
    } else {
      segments.unshift(loc);
    }
    const nextPath = segments.length ? `/${segments.join("/")}` : `/${loc}`;
    window.location.assign(`${nextPath}${window.location.search}${window.location.hash}`);
    setOpen(false);
  }, [locale]);

  useEffect(() => {
    if (!isHome) {
      queueMicrotask(() => {
        setScrolled(false);
      });
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    queueMicrotask(() => {
      onScroll();
    });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, pathname]);

  const navOnHero = isHome && !scrolled;
  const navHomeGlass = isHome && scrolled;

  const shellClass = [
    "relative transition-[background-color,backdrop-filter,border-color] duration-300 ease-out",
    /* Sin borde sobre el hero: evita la línea gris entre barra y gradiente */
    navOnHero
      ? "border-b-0"
      : "border-b border-[var(--border)] md:border-b-0",
    !isHome && "bg-[var(--bg)]/92 backdrop-blur-xl backdrop-saturate-150",
    /* No transparente puro: si no, se ve el --bg del body (#f0f2f6) y parece “franja blanca” sobre el hero. */
    navOnHero &&
      "bg-[linear-gradient(165deg,rgba(2,54,97,0.92)_0%,rgba(10,12,18,0.88)_52%,rgba(10,12,18,0.82)_100%)] backdrop-blur-[10px]",
    navHomeGlass && "border-white/10 bg-[rgba(10,12,18,0.92)] backdrop-blur-[12px]",
  ]
    .filter(Boolean)
    .join(" ");

  const linkDesktop = [
    styles.navLinkDesktop,
    "relative z-10 px-0.5 py-2 transition-colors duration-300 md:px-1",
    navOnHero || navHomeGlass
      ? "text-white/85 hover:text-white"
      : "text-[var(--muted)] hover:text-[var(--fg)]",
  ].join(" ");

  const barClass =
    navOnHero || navHomeGlass
      ? "h-px w-6 bg-white transition-transform duration-300 ease-out"
      : "h-px w-6 bg-[var(--fg)] transition-transform duration-300 ease-out";

  const onDarkNav = navOnHero || navHomeGlass;

  const logoClass = [styles.navBarLogo, navOnHero || navHomeGlass ? styles.navLogoLight : ""]
    .filter(Boolean)
    .join(" ");

  const localeLinkClass = (loc: string) =>
    [
      styles.navLocaleLink,
      locale === loc
        ? onDarkNav
          ? styles.navLocaleLinkActiveOnDark
          : styles.navLocaleLinkActiveOnLight
        : onDarkNav
          ? styles.navLocaleLinkOnDark
          : styles.navLocaleLinkOnLight,
    ].join(" ");

  return (
    <header className="sticky top-0 z-50 min-w-0 max-w-full overflow-x-clip">
      <div className="relative z-[70] min-w-0 max-w-full">
        <div className={shellClass}>
          <div
            className={`${styles.navBarOuter} relative flex min-h-[5rem] min-w-0 items-center py-2 md:min-h-0 md:py-3 ${styles.navBarRow}`}
          >
            <Link href="/" className={styles.navBarLogoLink} onClick={() => setOpen(false)}>
              <Image
                src={FOOTER_MEDIA.headerLogoBlack}
                alt="Precisar"
                className={logoClass}
                width={550}
                height={138}
                priority
              />
            </Link>
            <nav className={`hidden md:flex ${styles.navDesktop}`} aria-label={tNav("main")}>
              {NAV_PRIMARY.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkDesktop}
                  onClick={(e) => scrollToHomeSection(e, item.href)}
                >
                  {NAV_PRIMARY_I18N_KEY[item.href] ? tNav(NAV_PRIMARY_I18N_KEY[item.href]) : item.label}
                </Link>
              ))}
            </nav>
            <div className={styles.navBarAside}>
              <div
                className={`${styles.navLocaleGroup} ${onDarkNav ? styles.navLocaleGroupOnDark : ""}`}
                role="group"
                aria-label={tLang("switch")}
              >
                {routing.locales.map((loc, i) => (
                  <Fragment key={loc}>
                    {i > 0 ? (
                      <span className={styles.navLocaleSep} aria-hidden>
                        |
                      </span>
                    ) : null}
                    <button
                      type="button"
                      className={localeLinkClass(loc)}
                      aria-current={locale === loc ? "true" : undefined}
                      aria-label={tLang(loc)}
                      onClick={() => switchLocale(loc)}
                    >
                      {loc.toUpperCase()}
                    </button>
                  </Fragment>
                ))}
              </div>
              <a
                href={EXTERNAL.botOnda}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.navOndaLink} ${styles.navOndaDesktop}`}
                aria-label={tNav("botOndaAria")}
              >
                <span className={styles.navOndaWithBeta}>
                  <Image
                    src={FOOTER_MEDIA.navOndaMark}
                    alt=""
                    width={72}
                    height={72}
                    className={`${styles.navOndaIcon} ${styles.navOndaMarkImg}`}
                  />
                  <span className={styles.navOndaNavBadge}>{tNav("botOndaNavBadge")}</span>
                </span>
              </a>
              <button
                type="button"
                className="relative z-[60] flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center gap-1.5 md:hidden"
                aria-expanded={open}
                aria-controls="site-nav-mobile-panel"
                aria-label={open ? tNav("closeMenu") : tNav("openMenu")}
                onClick={() => setOpen((o) => !o)}
              >
                <span className={`${barClass} ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                <span
                  className={`${barClass} transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
                />
                <span className={`${barClass} ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
              </button>
              <a
                href={EXTERNAL.botOnda}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.navOndaLink} ${styles.navOndaLinkMobileBar}`}
                aria-label={tNav("botOndaAria")}
              >
                <span className={styles.navOndaWithBeta}>
                  <Image
                    src={FOOTER_MEDIA.navOndaMark}
                    alt=""
                    width={72}
                    height={72}
                    className={`${styles.navOndaIcon} ${styles.navOndaMarkImg}`}
                  />
                  <span className={styles.navOndaNavBadge}>{tNav("botOndaNavBadge")}</span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {open ? (
        <>
          <div
            className="fixed inset-0 z-[999] bg-black/20 md:hidden"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            id="site-nav-mobile-panel"
            className="fixed top-0 right-0 z-[1000] flex h-dvh w-[min(92vw,380px)] max-w-full flex-col border-l border-[var(--border)] bg-[var(--bg)] shadow-[0_24px_48px_-16px_rgba(12,12,11,0.25)] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={tNav("mainMobile")}
          >
            <div className="flex shrink-0 items-center justify-end border-b border-[var(--border)] px-4 py-3">
              <button
                ref={closeMenuBtnRef}
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-sm text-[var(--fg)] transition-colors hover:bg-[var(--surface)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--fg)]"
                aria-label={tNav("closeMenu")}
                onClick={() => setOpen(false)}
              >
                <span className="relative block h-5 w-5" aria-hidden>
                  <span className="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current" />
                  <span className="absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current" />
                </span>
              </button>
            </div>
            <nav
              className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overflow-x-hidden px-4 py-4 pb-10 break-words"
              aria-label={tNav("main")}
            >
              {NAV_PRIMARY.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLinkMobile} border-b border-[var(--border)] py-4 text-[var(--fg)] transition-colors hover:text-[var(--accent)]`}
                  style={{ transitionDelay: open ? `${i * 35}ms` : "0ms" }}
                  onClick={(e) => {
                    scrollToHomeSection(e, item.href);
                    if (!isHome) setOpen(false);
                  }}
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`mt-1 block break-words ${item.href === "/#convoca" ? styles.navLinkMobileConvoca : ""}`.trim()}
                  >
                    {NAV_PRIMARY_I18N_KEY[item.href] ? tNav(NAV_PRIMARY_I18N_KEY[item.href]) : item.label}
                  </span>
                </Link>
              ))}
              <div className="mt-6 border-t border-[var(--border)] pt-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">{tLang("switch")}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {routing.locales.map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => switchLocale(loc)}
                      className={
                        locale === loc
                          ? "rounded-sm border border-[var(--fg)] bg-[var(--fg)] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--elevated)]"
                          : "rounded-sm border border-[var(--border)] bg-[var(--elevated)] px-3 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--fg)] transition-colors hover:border-[var(--fg)]"
                      }
                      aria-current={locale === loc ? "true" : undefined}
                      aria-label={tLang(loc)}
                    >
                      {loc.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
              <a
                href={EXTERNAL.botOnda}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navOndaMobile}
                onClick={() => setOpen(false)}
              >
                <Image
                  src={FOOTER_MEDIA.navOndaMark}
                  alt=""
                  width={88}
                  height={88}
                  className={styles.navOndaMobileIcon}
                />
                <span className={styles.navOndaMobileLabel}>{tNav("botOndaNavBadge")}</span>
              </a>
            </nav>
          </div>
        </>
      ) : null}
    </header>
  );
}
