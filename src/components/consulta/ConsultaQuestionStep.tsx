"use client";

import { useCallback, useMemo, useState } from "react";
import { consultaStepTextStyle } from "./consultaStepTextStyle";
import st from "./ConsultaSteps.module.css";
import type { ConsultaMultiId, ConsultaMultiStep } from "@/lib/consulta/types";

type Props = {
  step: ConsultaMultiStep;
  value: string[] | undefined;
  onChange: (id: ConsultaMultiId, next: string[]) => void;
  error?: string | null;
  headingId: string;
  /** Mapa vivo: pulso al elegir opción */
  onInteraction?: () => void;
};

export function ConsultaQuestionStep({ step, value, onChange, error, headingId, onInteraction }: Props) {
  const selected = useMemo(() => value ?? [], [value]);
  const [capMsg, setCapMsg] = useState<string | null>(null);

  const toggle = useCallback(
    (optionId: string) => {
      setCapMsg(null);
      const has = selected.includes(optionId);
      if (has) {
        onChange(step.id, selected.filter((x) => x !== optionId));
        return;
      }
      if (selected.length >= step.maxSelections) {
        setCapMsg(
          `Puedes elegir hasta ${step.maxSelections} opciones. Quita una si quieres cambiar.`,
        );
        return;
      }
      onChange(step.id, [...selected, optionId]);
      onInteraction?.();
    },
    [onChange, onInteraction, selected, step.id, step.maxSelections],
  );

  const dense = step.options.length >= 8;

  return (
    <div>
      <div className={st.stepHead}>
        <p className={st.eyebrow} style={consultaStepTextStyle.eyebrow}>
          Tu respuesta
        </p>
        <h3 id={headingId} className={st.prompt} style={consultaStepTextStyle.prompt} tabIndex={-1}>
          {step.prompt}
        </h3>
        <p className={st.helper} style={consultaStepTextStyle.helper}>
          {step.helper}
        </p>
      </div>
      {error ? <p className={st.softError}>{error}</p> : null}
      {capMsg ? <p className={st.softError}>{capMsg}</p> : null}

      <div
        className={[st.optionsGrid, dense ? st.dense : ""].filter(Boolean).join(" ")}
        role="group"
        aria-labelledby={headingId}
      >
        {step.options.map((opt) => {
          const on = selected.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              className={st.optionBtn}
              aria-pressed={on}
              data-selected={on ? "true" : "false"}
              onClick={() => toggle(opt.id)}
            >
              <span className={st.optionLightCard}>
                <span className={st.optionLabel}>{opt.label}</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
