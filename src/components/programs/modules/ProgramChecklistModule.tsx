import type { ReactNode } from "react";
import { ProgramModShell } from "./ProgramModShell";

export type ChecklistItem = {
  title: string;
  body?: ReactNode;
};

export function ProgramChecklistModule(props: {
  title: string;
  items: ChecklistItem[];
  columns?: 1 | 2;
  id?: string;
}) {
  const cols = props.columns === 2 ? "prec-program-mod__checklist--2col" : "";
  return (
    <ProgramModShell
      id={props.id}
      className="prec-program-mod prec-program-mod--checklist not-prose"
    >
      <h2 className="prec-program-mod__title">{props.title}</h2>
      <ul className={`prec-program-mod__checklist ${cols}`}>
        {props.items.map((item) => (
          <li key={item.title} className="prec-program-mod__checklist-item">
            <span className="prec-program-mod__checklist-marker" aria-hidden />
            <div>
              <span className="prec-program-mod__checklist-title">{item.title}</span>
              {item.body ? (
                <div className="prec-program-mod__checklist-body">{item.body}</div>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </ProgramModShell>
  );
}
