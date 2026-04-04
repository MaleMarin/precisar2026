import type { ReactNode } from "react";
import { ProgramModShell } from "./ProgramModShell";

export function ProgramResourceModule(props: {
  title: string;
  description?: ReactNode;
  links: { href: string; label: string; hint?: string }[];
  id?: string;
}) {
  return (
    <ProgramModShell
      id={props.id}
      className="prec-program-mod prec-program-mod--resources not-prose"
    >
      <h2 className="prec-program-mod__title">{props.title}</h2>
      {props.description ? (
        <div className="prec-program-mod__resource-desc">{props.description}</div>
      ) : null}
      <ul className="prec-program-mod__resource-list">
        {props.links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="prec-program-mod__resource-link"
            >
              <span className="prec-program-mod__resource-link-label">{l.label}</span>
              {l.hint ? (
                <span className="prec-program-mod__resource-link-hint">{l.hint}</span>
              ) : (
                <span className="prec-program-mod__resource-link-hint">PDF</span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </ProgramModShell>
  );
}
