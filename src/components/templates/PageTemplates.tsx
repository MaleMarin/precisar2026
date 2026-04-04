import type { ReactNode } from "react";
import { PageShell } from "@/components/PageShell";
import { ProgramFlowFooter } from "@/components/programs/ProgramFlowFooter";

/** Institucional (Somos, Marco, etc.). */
export function InstitutionalTemplate(props: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return <PageShell title={props.title} kicker={props.kicker}>{props.children}</PageShell>;
}

/** Landing de programa. */
export function ProgramLandingTemplate(props: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <PageShell
      title={props.title}
      kicker={props.kicker}
      contentClassName="prose-precisar--program"
      programCanvas
    >
      {props.children}
      <ProgramFlowFooter />
    </PageShell>
  );
}

/** Biblioteca Saberes. */
export function SaberesLibraryTemplate(props: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return <PageShell title={props.title} kicker={props.kicker}>{props.children}</PageShell>;
}

/** Índice editorial Precisando. */
export function EditorialIndexTemplate(props: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <PageShell title={props.title} kicker={props.kicker} bare variant="editorial-index">
      {props.children}
    </PageShell>
  );
}

/** Artículo / entrada Precisando. */
export function ArticleTemplate(props: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return (
    <PageShell title={props.title} kicker={props.kicker} bare variant="article">
      <div className="prec-article-body space-y-8 md:space-y-10">{props.children}</div>
    </PageShell>
  );
}

/** Landing de curso. */
export function CourseLandingTemplate(props: {
  title: string;
  kicker?: string;
  children: ReactNode;
  /** Misma envoltura modular que programas (Fase 5.3). */
  moduleCanvas?: boolean;
}) {
  return (
    <PageShell
      title={props.title}
      kicker={props.kicker}
      contentClassName={props.moduleCanvas ? "prose-precisar--program" : undefined}
      programCanvas={!!props.moduleCanvas}
    >
      {props.children}
      {props.moduleCanvas ? <ProgramFlowFooter /> : null}
    </PageShell>
  );
}

/** Módulo de curso. */
export function CourseModuleTemplate(props: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return <PageShell title={props.title} kicker={props.kicker}>{props.children}</PageShell>;
}

/** Legal. */
export function LegalPageTemplate(props: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return <PageShell title={props.title} kicker={props.kicker}>{props.children}</PageShell>;
}

/** Gracias post-formulario. */
export function ThanksTemplate(props: {
  title: string;
  kicker?: string;
  children: ReactNode;
}) {
  return <PageShell title={props.title} kicker={props.kicker}>{props.children}</PageShell>;
}
