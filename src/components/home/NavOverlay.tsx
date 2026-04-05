"use client";

import gsap from "gsap";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import styles from "./NavOverlay.module.css";

export type NavOverlayLink = { href: string; label: string };

export type NavOverlayContactLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type NavOverlayProps = {
  links: NavOverlayLink[];
  /** Video de fondo (desktop); en móvil se usa `mobileSrc`. */
  videoWebm?: string;
  videoMp4?: string;
  /** Imagen WebP (u otro) como fallback móvil y poster del video. */
  mobileSrc: string;
  /** Enlaces secundarios bajo la navegación (redes, email, etc.). */
  contactLinks?: NavOverlayContactLink[];
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function NavOverlay({
  links,
  videoWebm,
  videoMp4,
  mobileSrc,
  contactLinks,
}: NavOverlayProps) {
  const [isOpen, setIsOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const animateOpen = useCallback(() => {
    const el = overlayRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.add(styles.overlayOpen);
      gsap.set(el, { opacity: 1, clipPath: "inset(0 0 0% 0)" });
      return;
    }
    el.classList.add(styles.overlayOpen);
    gsap.killTweensOf(el);
    tlRef.current?.kill();
    const tl = gsap.timeline();
    tl.fromTo(
      el,
      { opacity: 0, clipPath: "inset(0 0 100% 0)" },
      {
        opacity: 1,
        clipPath: "inset(0 0 0% 0)",
        duration: 0.55,
        ease: "power3.out",
      },
    );
    tlRef.current = tl;
  }, []);

  const animateClose = useCallback((onComplete?: () => void) => {
    const el = overlayRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.classList.remove(styles.overlayOpen);
      gsap.set(el, { opacity: 0, clipPath: "inset(0 0 100% 0)" });
      onComplete?.();
      return;
    }
    gsap.killTweensOf(el);
    tlRef.current?.kill();
    const tl = gsap.timeline({
      onComplete: () => {
        el.classList.remove(styles.overlayOpen);
        onComplete?.();
      },
    });
    tl.to(el, {
      opacity: 0,
      clipPath: "inset(0 0 100% 0)",
      duration: 0.45,
      ease: "power3.in",
    });
    tlRef.current = tl;
  }, []);

  useLayoutEffect(() => {
    if (!isOpen) return;
    animateOpen();
    return () => {
      tlRef.current?.kill();
    };
  }, [isOpen, animateOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const open = () => setIsOpen(true);
  const close = () => {
    animateClose(() => setIsOpen(false));
  };

  const toggle = () => {
    if (isOpen) close();
    else setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        className={styles.menuButton}
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="nav-overlay-panel"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
      >
        <span className={styles.menuBurger} aria-hidden>
          <span className={styles.menuBurgerBar} />
          <span className={styles.menuBurgerBar} />
          <span className={styles.menuBurgerBar} />
        </span>
      </button>

      <div
        id="nav-overlay-panel"
        ref={overlayRef}
        className={styles.overlay}
        role="dialog"
        aria-modal="true"
        aria-hidden={!isOpen}
      >
        {videoMp4 ? (
          <video
            className={styles.videoBg}
            autoPlay
            muted
            playsInline
            loop
            poster={mobileSrc}
            aria-hidden
          >
            {videoWebm ? <source src={videoWebm} type="video/webm" /> : null}
            <source src={videoMp4} type="video/mp4" />
          </video>
        ) : null}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={videoMp4 ? styles.videoBgFallback : styles.posterFull}
          src={mobileSrc}
          alt=""
          decoding="async"
        />

        <div className={styles.scrim} aria-hidden />

        <button
          type="button"
          className={styles.closeButton}
          onClick={close}
          aria-label="Cerrar menú"
        >
          ×
        </button>

        <nav className={styles.content} aria-label="Principal">
          <ul className={styles.navList}>
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.navLink}
                  onClick={() => close()}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {contactLinks?.length ? (
            <ul className={styles.contactList}>
              {contactLinks.map((c) => (
                <li key={c.href + c.label}>
                  {c.external ? (
                    <a
                      href={c.href}
                      className={styles.contactLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {c.label}
                    </a>
                  ) : (
                    <Link href={c.href} className={styles.contactLink} onClick={() => close()}>
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </nav>
      </div>
    </>
  );
}
