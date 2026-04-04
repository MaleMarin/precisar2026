import type { ReactNode } from "react";

export type PageShellVariant = "default" | "editorial-index" | "article";

export function PageShell({
  title,
  kicker,
  children,
  /** Sin envoltorio prose (listados editoriales, layouts compuestos). */
  bare = false,
  /** Añade modificadores a `.prose-precisar` (p. ej. `prose-precisar--program`). */
  contentClassName,
  /** Ritmo visual: índice tipo revista o cabecera de artículo. */
  variant = "default",
  /** Contenedor extra para landings de programa (ritmo modular en CSS). */
  programCanvas = false,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
  bare?: boolean;
  contentClassName?: string;
  variant?: PageShellVariant;
  programCanvas?: boolean;
}) {
  const bodyClass = bare
    ? contentClassName ?? ""
    : ["prose-precisar", contentClassName].filter(Boolean).join(" ");

  const innerBody = programCanvas ? (
    <div className="prec-program-canvas prec-program-canvas--modular">{children}</div>
  ) : (
    children
  );

  return (
    <article className="prec-page">
      <div className="prec-container">
        {variant === "editorial-index" ? (
          <header className="prec-page-head prec-page-head--magazine mb-14 md:mb-20">
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <span className="size-2 shrink-0 bg-[var(--fg)]" aria-hidden />
              {kicker ? <p className="prec-kicker prec-kicker--accent">{kicker}</p> : null}
            </div>
            <h1 className="prec-title-xl mt-6 max-w-[14ch] text-[clamp(2.5rem,7vw,4.25rem)] font-medium leading-[0.98] tracking-[-0.045em] sm:max-w-none md:mt-8">
              {title}
            </h1>
            <div className="mt-8 flex items-center gap-4">
              <div className="h-px w-16 shrink-0 bg-[var(--accent)] md:w-24" aria-hidden />
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted-2)]">
                Publicación · Precisar
              </p>
            </div>
          </header>
        ) : variant === "article" ? (
          <header className="prec-page-head prec-page-head--article mb-12 md:mb-16">
            <div className="border-l-[3px] border-[var(--accent)] pl-6 md:pl-9">
              {kicker ? <p className="prec-kicker prec-kicker--accent">{kicker}</p> : null}
              <h1 className="prec-title-xl mt-4 max-w-[22ch] text-[clamp(1.85rem,4.2vw,2.95rem)] leading-[1.05] tracking-[-0.038em] md:max-w-[30ch]">
                {title}
              </h1>
              <div className="mt-8 h-px max-w-md bg-[var(--border)]" aria-hidden />
            </div>
          </header>
        ) : (
          <header className="prec-page-head">
            <span className="prec-page-head__marker" aria-hidden />
            <div className="prec-page-head__text">
              {kicker ? <p className="prec-kicker">{kicker}</p> : null}
              <h1 className="prec-title-xl mt-3 max-w-4xl text-3xl md:text-[2.35rem]">{title}</h1>
            </div>
          </header>
        )}
        {bare ? (
          <div className={contentClassName}>{children}</div>
        ) : (
          <div className={bodyClass}>{innerBody}</div>
        )}
      </div>
    </article>
  );
}
