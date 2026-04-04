import type { ReactNode } from "react";
import { ProgramModShell } from "./ProgramModShell";

export function ProgramBandModule(props: {
  children: ReactNode;
  variant?: "ink" | "fg" | "surface" | "line";
  id?: string;
}) {
  const v = props.variant ?? "ink";
  return (
    <ProgramModShell
      id={props.id}
      className={`prec-program-mod prec-program-mod--band prec-program-mod--band-${v} not-prose`}
    >
      <div className="prec-program-mod__band-inner">{props.children}</div>
    </ProgramModShell>
  );
}
