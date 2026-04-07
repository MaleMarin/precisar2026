import type { ReactNode } from "react";
import shell from "./ProgramShell.module.css";

export type ProgramModularKey = "aprender" | "leer-noticias";

type Props = {
  program: ProgramModularKey;
  heroEyebrow: string;
  heroTitle: string;
  heroSub?: string;
  children: ReactNode;
};

export function ProgramModularShell({ program, heroEyebrow, heroTitle, heroSub, children }: Props) {
  return (
    <main className={shell.page} data-program={program}>
      <header className={shell.hero} aria-labelledby="program-modular-hero-title">
        <div className={shell.heroInner}>
          <p className={shell.heroEyebrow}>{heroEyebrow}</p>
          <h1 id="program-modular-hero-title" className={shell.heroTitle}>
            {heroTitle}
          </h1>
          {heroSub ? <p className={shell.heroSub}>{heroSub}</p> : null}
        </div>
      </header>

      <section
        className={`${shell.modularBand} ${shell.padSection}`}
        aria-label="Contenido del programa"
      >
        <div className="prec-container">
          <div
            className={`prose-precisar prose-precisar--program prec-program-canvas prec-program-canvas--modular ${shell.modularCanvas}`}
          >
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
