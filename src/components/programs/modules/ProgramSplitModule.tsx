import type { ReactNode } from "react";
import { ProgramModShell } from "./ProgramModShell";

export function ProgramSplitModule(props: {
  title?: string;
  main: ReactNode;
  side: ReactNode;
  /** Columna principal más angosta (40/60). */
  mainNarrow?: boolean;
  sideEmphasis?: boolean;
  /** Carril oscuro tipo editorial (p. ej. curso Aquí No Pasa). */
  sideVariant?: "default" | "ink";
  id?: string;
}) {
  const mainSpan = props.mainNarrow ? "lg:col-span-5" : "lg:col-span-7";
  const sideSpan = props.mainNarrow ? "lg:col-span-7" : "lg:col-span-5";
  const sideInk = props.sideVariant === "ink" ? "prec-program-mod__split-side--ink" : "";
  return (
    <ProgramModShell
      id={props.id}
      className="prec-program-mod prec-program-mod--split not-prose"
    >
      {props.title ? (
        <h2 className="prec-program-mod__title prec-program-mod__title--split">{props.title}</h2>
      ) : null}
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-6">
        <div className={mainSpan}>{props.main}</div>
        <div
          className={`${sideSpan} prec-program-mod__split-side ${
            props.sideEmphasis ? "prec-program-mod__split-side--emphasis" : ""
          } ${sideInk}`}
        >
          {props.side}
        </div>
      </div>
    </ProgramModShell>
  );
}
