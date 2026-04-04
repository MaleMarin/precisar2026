import Link from "next/link";
import type { ReactNode } from "react";
import { ProgramModShell } from "./ProgramModShell";

export function ProgramClosingModule(props: {
  title?: string;
  children?: ReactNode;
  primaryCta?: { href: string; label: string };
  secondaryCta?: { href: string; label: string };
}) {
  return (
    <ProgramModShell className="prec-program-mod prec-program-mod--closing not-prose">
      {props.title ? (
        <h2 className="prec-program-mod__title prec-program-mod__title--closing">{props.title}</h2>
      ) : null}
      {props.children ? <div className="prec-program-mod__closing-body">{props.children}</div> : null}
      <div className="mt-8 flex flex-wrap gap-3">
        {props.primaryCta ? (
          <Link href={props.primaryCta.href} className="prec-btn prec-btn--primary">
            {props.primaryCta.label}
          </Link>
        ) : null}
        {props.secondaryCta ? (
          <Link href={props.secondaryCta.href} className="prec-btn prec-btn--ghost">
            {props.secondaryCta.label}
          </Link>
        ) : null}
      </div>
    </ProgramModShell>
  );
}
