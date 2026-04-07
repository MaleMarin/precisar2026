"use client";

import { useLocale, useTranslations } from "next-intl";
import { startTransition, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname as useNextPathname, useRouter as useNextRouter } from "next/navigation";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  EXTERNAL,
  FOOTER_MEDIA,
  NAV_PRIMARY,
  primaryNavIndexFromHash,
  primaryNavIndexFromPathname,
} from "@/lib/site";
import styles from "./SiteHeader.module.css";

const NAV_HREF_TO_KEY: Record<
  string,
  "programas" | "saberes" | "precisando" | "educacionMediatica" | "participa" | "somos"
> = {
  "/#programas": "programas",
  "/#saberes": "saberes",
  "/#precisando": "precisando",
  "/#educacion-mediatica": "educacionMediatica",
  "/educacion-mediatica/comunicacion": "educacionMediatica",
  "/#participa": "participa",
  "/#convoca": "somos",
};

function isHomePath(pathname: string): boolean {
  const n = pathname.replace(/\/+$/, "") || "/";
  return n === "/";
}

const LOCALE_PREFIXES = new Set(routing.locales.map((l) => l.toLowerCase()));

export function SiteHeader() {
  const pathname = usePathname();
  const nextPathname = useNextPathname();
  const nextRouter = useNextRouter();
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const tLang = useTranslations("language");
  const isHome = isHomePath(pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const [hash, setHash] = useState("");

  const trackRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const read = () => setHash(typeof window !== "undefined" ? window.location.hash : "");
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const fromHash = isHome ? primaryNavIndexFromHash(hash) : -1;
  const fromPath = primaryNavIndexFromPathname(pathname);
  const activeIndex = fromHash >= 0 ? fromHash : fromPath;
  const displayIndex = hoverIndex !== null ? hoverIndex : activeIndex;

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
        setHash(nextHash);
      }
      setOpen(false);
    },
    [isHome],
  );

  const measureIndicator = useCallback(() => {
    if (typeof window === "undefined") return;
    if (displayIndex < 0) {
      setIndicator({ left: 0, width: 0, visible: false });
      return;
    }
    const track = trackRef.current;
    const link = linkRefs.current[displayIndex];
    if (!track || !link) {
      setIndicator((prev) => ({ ...prev, visible: false }));
      return;
    }
    const tr = track.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    setIndicator({
      left: lr.left - tr.left,
      width: lr.width,
      visible: true,
    });
  }, [displayIndex]);

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

  const switchLocale = useCallback(
    (loc: (typeof routing.locales)[number]) => {
      if (locale === loc) return;
      const raw = nextPathname || "/";
      const segments = raw.split("/").filter(Boolean);
      const first = segments[0]?.toLowerCase();
      if (first && LOCALE_PREFIXES.has(first)) {
        segments[0] = loc;
      } else {
        segments.unshift(loc);
      }
      const href = `/${segments.join("/")}`;
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      startTransition(() => {
        nextRouter.replace(href + hash, { scroll: false });
      });
      setOpen(false);
    },
    [locale, nextPathname, nextRouter],
  );

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome, pathname]);

  const navOnHero = isHome && !scrolled;
  const navHomeGlass = isHome && scrolled;

  useLayoutEffect(() => {
    measureIndicator();
    const id = requestAnimationFrame(() => measureIndicator());
    return () => cancelAnimationFrame(id);
  }, [measureIndicator, pathname, locale, hash]);

  useEffect(() => {
    const onResize = () => measureIndicator();
    window.addEventListener("resize", onResize);
    const track = trackRef.current;
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    if (track && ro) ro.observe(track);
    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, [measureIndicator]);

  const shellClass = [
    "relative transition-[background-color,backdrop-filter,border-color] duration-300 ease-out",
    /* Sin borde sobre el hero: evita la línea gris entre barra y gradiente */
    navOnHero
      ? "border-b-0"
      : "border-b border-[var(--border)] lg:border-b-0",
    !isHome && "bg-[var(--bg)]/92 backdrop-blur-xl backdrop-saturate-150",
    navOnHero && "bg-transparent",
    navHomeGlass && "border-white/10 bg-[rgba(10,12,18,0.92)] backdrop-blur-[12px]",
  ]
    .filter(Boolean)
    .join(" ");

  const linkDesktop = [
    styles.navLinkDesktop,
    "relative z-10 px-2.5 py-2 transition-colors duration-300 xl:px-3",
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

  /* En portada sobre el hero: sin franja horizontal (solo el segmento naranja) */
  const trackBaseClass = navOnHero
    ? "bg-transparent"
    : onDarkNav
      ? "bg-white/18"
      : "bg-[var(--border)]";

  return (
    <header className="sticky top-0 z-50">
      <div className="relative z-[70]">
        <div className={shellClass}>
          <div className="flex flex-col">
            <div
              className={`${styles.navBarOuter} relative flex min-h-[4rem] items-center py-2 md:min-h-[6.5rem] md:py-2.5 ${styles.navBarRow}`}
            >
              <Link href="/" className={styles.navBarLogoLink} onClick={() => setOpen(false)}>
                <img
                  src={FOOTER_MEDIA.headerLogoBlack}
                  alt="Precisar"
                  className={logoClass}
                  width={440}
                  height={110}
                  decoding="async"
                />
              </Link>
              <div className={styles.navBarEnd}>
                <nav
                  className="hidden max-w-[min(100%,52rem)] flex-wrap items-center justify-end gap-x-0 gap-y-1 lg:flex"
                  aria-label={tNav("main")}
                >
                  {NAV_PRIMARY.map((item, i) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={linkDesktop}
                      ref={(el) => {
                        linkRefs.current[i] = el;
                      }}
                      onClick={(e) => scrollToHomeSection(e, item.href)}
                      onMouseEnter={() => setHoverIndex(i)}
                      onMouseLeave={() => setHoverIndex(null)}
                      onFocus={() => setHoverIndex(i)}
                      onBlur={() => setHoverIndex(null)}
                    >
                      {NAV_HREF_TO_KEY[item.href] ? tNav(NAV_HREF_TO_KEY[item.href]) : item.label}
                    </Link>
                  ))}
                  <a
                    href={EXTERNAL.botOnda}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navOndaLink}
                    aria-label={tNav("botOndaAria")}
                  >
                    <img
                      src={FOOTER_MEDIA.navOndaMark}
                      alt=""
                      width={64}
                      height={64}
                      decoding="async"
                      className={`${styles.navOndaIcon} ${styles.navOndaMarkImg}`}
                    />
                  </a>
                  <div
                    className={`${styles.navLocaleGroup} ${onDarkNav ? styles.navLocaleGroupOnDark : ""}`}
                    role="group"
                    aria-label={tLang("switch")}
                  >
                    {routing.locales.map((loc) => (
                      <button
                        key={loc}
                        type="button"
                        className={localeLinkClass(loc)}
                        aria-current={locale === loc ? "true" : undefined}
                        aria-label={tLang(loc)}
                        onClick={() => switchLocale(loc)}
                      >
                        {loc.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </nav>
                <a
                  href={EXTERNAL.botOnda}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.navOndaLink} ${styles.navOndaLinkMobileBar}`}
                  aria-label={tNav("botOndaAria")}
                >
                  <img
                    src={FOOTER_MEDIA.navOndaMark}
                    alt=""
                    width={64}
                    height={64}
                    decoding="async"
                    className={`${styles.navOndaIcon} ${styles.navOndaMarkImg}`}
                  />
                </a>
                <button
                  type="button"
                  className="relative z-[60] flex h-11 w-11 flex-shrink-0 flex-col items-center justify-center gap-1.5 lg:hidden"
                  aria-expanded={open}
                  aria-label={open ? tNav("closeMenu") : tNav("openMenu")}
                  onClick={() => setOpen((o) => !o)}
                >
                  <span className={`${barClass} ${open ? "translate-y-1.5 rotate-45" : ""}`} />
                  <span
                    className={`${barClass} transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
                  />
                  <span className={`${barClass} ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
                </button>
              </div>
            </div>

            <div className={`${styles.navBarOuter} hidden pb-0 pt-0 lg:block`}>
              <div ref={trackRef} className={styles.navTrack}>
                <div className={`${styles.navTrackBase} ${trackBaseClass}`} aria-hidden />
                <div
                  className={styles.navTrackAccent}
                  style={{
                    left: indicator.left,
                    width: indicator.visible ? indicator.width : 0,
                    opacity: indicator.visible && indicator.width > 0 ? 1 : 0,
                  }}
                  aria-hidden
                />
              </div>
            </div>
          </div>

          <div
            className={`absolute left-0 right-0 top-full z-[58] max-h-[min(70vh,calc(100dvh-9rem))] overflow-y-auto border-b-2 border-[var(--fg)] bg-[var(--bg)] shadow-[0_24px_48px_-16px_rgba(12,12,11,0.2)] transition-[transform,opacity,visibility] duration-500 ease-out lg:hidden ${
              open
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-3 opacity-0 pointer-events-none"
            }`}
          >
            <nav className="prec-container flex flex-col gap-1 py-8 pb-12" aria-label={tNav("mainMobile")}>
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
                  <span className="mt-1 block">
                    {NAV_HREF_TO_KEY[item.href] ? tNav(NAV_HREF_TO_KEY[item.href]) : item.label}
                  </span>
                </Link>
              ))}
              <a
                href={EXTERNAL.botOnda}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.navOndaMobile}
                onClick={() => setOpen(false)}
              >
                <img
                  src={FOOTER_MEDIA.navOndaMark}
                  alt=""
                  width={80}
                  height={80}
                  decoding="async"
                  className={styles.navOndaMobileIcon}
                />
                <span className={styles.navOndaMobileLabel}>{tNav("botOnda")}</span>
              </a>
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
            </nav>
          </div>
        </div>
      </div>
      <div
        className={`fixed inset-0 z-[60] bg-[var(--fg)]/45 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
        onClick={() => setOpen(false)}
      />
    </header>
  );
}
