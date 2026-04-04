import Link from "next/link";
import { EXTERNAL, FOOTER_COLUMNS, SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[var(--surface)]">
      <div className="flex h-1.5 w-full" aria-hidden>
        <div className="h-full w-[min(40%,14rem)] bg-[var(--accent)]" />
        <div className="h-full flex-1 bg-[var(--border)]" />
      </div>
      <div className="border-t-2 border-[var(--border-strong)]">
        <div className="prec-container py-16 md:py-24">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-4">
              <div className="relative pl-1">
                <div
                  className="absolute left-0 top-0 h-full w-[3px] bg-[var(--accent)]"
                  aria-hidden
                />
                <p className="pl-5 font-[family-name:var(--font-display)] text-[clamp(1.85rem,4vw,2.75rem)] font-semibold leading-[0.95] tracking-[-0.04em]">
                  {SITE.name}
                </p>
                <p className="mt-5 max-w-xs pl-5 text-sm leading-relaxed text-[var(--muted)]">
                  {SITE.tagline}
                </p>
              </div>
            </div>
            <div className="grid gap-12 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4 lg:gap-8">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title}>
                  <p className="prec-kicker border-b-2 border-[var(--fg)] pb-2.5">{col.title}</p>
                  <ul className="mt-5 space-y-3">
                    {col.links.map((l) => (
                      <li key={l.href + l.label}>
                        <Link
                          href={l.href}
                          className="group inline-flex text-sm leading-snug text-[var(--fg)]/90 transition-colors duration-300 hover:text-[var(--accent)]"
                        >
                          <span className="mr-2 font-mono text-[9px] text-[var(--muted-2)] opacity-0 transition-opacity group-hover:opacity-100">
                            →
                          </span>
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="prec-container flex flex-col gap-6 py-9 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-x-10 gap-y-3">
            <a
              href={EXTERNAL.instagram}
              className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)]"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href={EXTERNAL.youtube}
              className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)]"
              target="_blank"
              rel="noreferrer"
            >
              YouTube
            </a>
            <a
              href={EXTERNAL.whatsappShare}
              className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--muted)] transition-colors duration-300 hover:text-[var(--fg)]"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
          <p className="font-mono text-[10px] leading-relaxed text-[var(--muted)]">
            © {new Date().getFullYear()} {SITE.name}
            <span className="mx-2 text-[var(--border)]">·</span>
            <a
              href={`mailto:${SITE.contactEmail}`}
              className="underline-offset-2 transition-colors hover:text-[var(--fg)] hover:underline"
            >
              {SITE.contactEmail}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
