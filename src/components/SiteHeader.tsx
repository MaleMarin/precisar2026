"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FOOTER_MEDIA, NAV_PRIMARY } from "@/lib/site";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <div className="relative z-[70]">
        <div className={styles.brandStrip}>
          <div className="prec-container">
            <div className={styles.brandInner}>
              <Link href="/" className={styles.brandLogoLink} onClick={() => setOpen(false)}>
                <img
                  src={FOOTER_MEDIA.logoWordmark}
                  alt="Precisar"
                  className={styles.brandLogoImg}
                  width={360}
                  height={72}
                  decoding="async"
                />
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-b border-[var(--border)] bg-[var(--bg)]/92 backdrop-blur-xl backdrop-saturate-150">
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 flex h-[3px] justify-start"
            aria-hidden
          >
            <div className="h-full w-[min(28%,11rem)] bg-[var(--accent)]" />
            <div className="h-px flex-1 self-center bg-[var(--border)]" />
          </div>
          <div className="prec-container relative flex h-12 items-center justify-end gap-2 md:h-[var(--header-h-md)]">
            <nav
              className="hidden max-w-[min(100%,52rem)] flex-wrap items-center justify-end gap-x-0 gap-y-1 lg:flex"
              aria-label="Principal"
            >
              {NAV_PRIMARY.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative px-2.5 py-2 font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)] xl:px-3 xl:text-[10px] xl:tracking-[0.16em]"
                >
                  <span className="relative z-10">{item.label}</span>
                  <span
                    className="pointer-events-none absolute inset-x-2 bottom-1 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 ease-out group-hover:scale-x-100"
                    aria-hidden
                  />
                </Link>
              ))}
            </nav>
            <button
              type="button"
              className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              onClick={() => setOpen((o) => !o)}
            >
              <span
                className={`h-px w-6 bg-[var(--fg)] transition-transform duration-300 ease-out ${open ? "translate-y-1.5 rotate-45" : ""}`}
              />
              <span
                className={`h-px w-6 bg-[var(--fg)] transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`h-px w-6 bg-[var(--fg)] transition-transform duration-300 ease-out ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
              />
            </button>
          </div>

          <div
            className={`absolute left-0 right-0 top-full z-[58] max-h-[min(70vh,calc(100dvh-9rem))] overflow-y-auto border-b-2 border-[var(--fg)] bg-[var(--bg)] shadow-[0_24px_48px_-16px_rgba(12,12,11,0.2)] transition-[transform,opacity,visibility] duration-500 ease-out lg:hidden ${
              open
                ? "visible translate-y-0 opacity-100"
                : "invisible -translate-y-3 opacity-0 pointer-events-none"
            }`}
          >
            <nav className="prec-container flex flex-col gap-1 py-8 pb-12" aria-label="Principal móvil">
              {NAV_PRIMARY.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="border-b border-[var(--border)] py-4 font-[family-name:var(--font-display)] text-xl font-medium tracking-tight text-[var(--fg)] transition-colors hover:text-[var(--accent)]"
                  style={{ transitionDelay: open ? `${i * 35}ms` : "0ms" }}
                  onClick={() => setOpen(false)}
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[var(--muted)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="mt-1 block">{item.label}</span>
                </Link>
              ))}
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
