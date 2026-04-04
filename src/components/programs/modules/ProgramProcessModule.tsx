import type { ReactNode } from "react";
import { ProgramModShell } from "./ProgramModShell";

export type ProcessStep = { title: string; body?: ReactNode };

export function ProgramProcessModule(props: {
  title: string;
  steps: ProcessStep[];
  /** Números grandes a la izquierda */
  numbered?: boolean;
  id?: string;
}) {
  return (
    <ProgramModShell
      id={props.id}
      className="prec-program-mod prec-program-mod--process not-prose"
    >
      <h2 className="prec-program-mod__title">{props.title}</h2>
      <ol className={`prec-program-mod__process ${props.numbered ? "" : "prec-program-mod__process--plain"}`}>
        {props.steps.map((step, i) => (
          <li key={step.title} className="prec-program-mod__process-step">
            {props.numbered ? (
              <span className="prec-program-mod__process-num" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
            ) : null}
            <div>
              <h3 className="prec-program-mod__process-title">{step.title}</h3>
              {step.body ? (
                <div className="prec-program-mod__process-body">{step.body}</div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </ProgramModShell>
  );
}
