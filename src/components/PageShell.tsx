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
  /** Texto bajo el título en índices editoriales (`variant="editorial-index"`). */
  indexIntro,
  /** Texto bajo el título en cabecera estándar (p. ej. Saberes). */
  headerLead,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
  bare?: boolean;
  contentClassName?: string;
  variant?: PageShellVariant;
  programCanvas?: boolean;
  indexIntro?: string;
  headerLead?: string;
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
          <header className="prec-page-head prec-page-head--editorial-index">
            <span className="prec-page-head__marker" aria-hidden />
            <div className="prec-page-head__text">
              {kicker ? <p className="prec-kicker prec-kicker--accent">{kicker}</p> : null}
              <h1 className="prec-title-xl mt-3 md:mt-4">{title}</h1>
              <p className="mt-3 max-w-2xl text-base leading-relaxed text-[var(--muted)]">
                {indexIntro ?? "Publicación editorial de Precisar."}
              </p>
            </div>
          </header>
        ) : variant === "article" ? (
          <header className="prec-page-head prec-page-head--article mb-12 md:mb-16">
            <div className="border-l-[3px] border-[var(--accent)] pl-6 md:pl-9">
              {kicker ? <p className="prec-kicker prec-kicker--accent">{kicker}</p> : null}
              <h1 className="prec-title-xl prec-title-xl--article mt-4">{title}</h1>
            </div>
          </header>
        ) : (
          <header className="prec-page-head">
            <span className="prec-page-head__marker" aria-hidden />
            <div className="prec-page-head__text">
              {kicker ? <p className="prec-kicker">{kicker}</p> : null}
              <h1 className="prec-title-xl mt-3">{title}</h1>
              {headerLead ? (
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-[var(--muted)] md:text-lg">
                  {headerLead}
                </p>
              ) : null}
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
