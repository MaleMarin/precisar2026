import Link from "next/link";
import type { ReactNode } from "react";
import { ProgramModShell } from "./ProgramModShell";

export type ProgramLeadTone =
  | "flagship"
  | "institutional"
  | "warm"
  | "pedagogical"
  | "applied"
  | "immersive";

const toneClass: Record<ProgramLeadTone, string> = {
  flagship:
    "prec-program-mod prec-program-mod--lead prec-program-mod--lead-flagship",
  institutional:
    "prec-program-mod prec-program-mod--lead prec-program-mod--lead-institutional",
  warm: "prec-program-mod prec-program-mod--lead prec-program-mod--lead-warm",
  pedagogical:
    "prec-program-mod prec-program-mod--lead prec-program-mod--lead-pedagogical",
  applied: "prec-program-mod prec-program-mod--lead prec-program-mod--lead-applied",
  immersive:
    "prec-program-mod prec-program-mod--lead prec-program-mod--lead-immersive",
};

export function ProgramLeadModule(props: {
  tone: ProgramLeadTone;
  eyebrow?: string;
  children: ReactNode;
  cta?: { href: string; label: string };
}) {
  return (
    <ProgramModShell className={toneClass[props.tone]}>
      {props.eyebrow ? (
        <p className="prec-program-mod__eyebrow">{props.eyebrow}</p>
      ) : null}
      <div className="prec-program-mod__lead-body not-prose">{props.children}</div>
      {props.cta ? (
        <Link href={props.cta.href} className="prec-btn prec-btn--primary mt-10 inline-flex">
          {props.cta.label}
        </Link>
      ) : null}
    </ProgramModShell>
  );
}
