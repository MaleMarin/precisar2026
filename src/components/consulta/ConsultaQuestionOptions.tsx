"use client";

import st from "./ConsultaSteps.module.css";
import type { ConsultaOption } from "@/lib/consulta/types";

type Props = {
  options: ConsultaOption[];
  selected: string[];
  dense: boolean;
  headingId: string;
  onToggle: (optionId: string) => void;
};

/**
 * Lista de opciones (multi) — solo presentación; la lógica de selección vive en el padre.
 */
export function ConsultaQuestionOptions({
  options,
  dense,
  headingId,
  onToggle,
  selected,
}: Props) {
  return (
    <div
      className={[st.optionsGrid, dense ? st.dense : ""].filter(Boolean).join(" ")}
      role="group"
      aria-labelledby={headingId}
    >
      {options.map((opt) => {
        const on = selected.includes(opt.id);
        return (
          <button
            key={opt.id}
            type="button"
            className={st.optionBtn}
            aria-pressed={on}
            data-selected={on ? "true" : "false"}
            onClick={() => onToggle(opt.id)}
          >
            <span className={st.optionLightCard}>
              <span className={st.optionLabel}>{opt.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
