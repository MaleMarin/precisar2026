"use client";

import { consultaStepTextStyle } from "./consultaStepTextStyle";
import st from "./ConsultaSteps.module.css";
import sc from "./ConsultaScaleStep.module.css";
import type { ConsultaScaleStep as ConsultaScaleStepDef } from "@/lib/consulta/types";

type Props = {
  step: ConsultaScaleStepDef;
  value: number | undefined;
  onChange: (n: number) => void;
  error?: string | null;
  headingId: string;
  onInteraction?: () => void;
};

export function ConsultaScaleStep({ step, value, onChange, error, headingId, onInteraction }: Props) {
  return (
    <div>
      <div className={st.stepHead}>
        <p className={st.eyebrow} style={consultaStepTextStyle.eyebrow}>
          Tu respuesta
        </p>
        <h3 id={headingId} className={st.prompt} style={consultaStepTextStyle.prompt} tabIndex={-1}>
          {step.prompt}
        </h3>
      </div>
      {error ? <p className={st.softError}>{error}</p> : null}

      <div className={st.stepPanel}>
        <div className={[st.stepPanelInner, sc.scalePad].join(" ")}>
          <div className={sc.row} role="radiogroup" aria-labelledby={headingId}>
              {step.options.map((opt, index) => {
                const on = value === opt.value;
                const blue = index % 2 === 0;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    className={sc.scaleBtn}
                    data-selected={on ? "true" : "false"}
                    data-accent={blue ? "blue" : "coral"}
                    onClick={() => {
                      onChange(opt.value);
                      onInteraction?.();
                    }}
                  >
                    <span
                      className={[sc.scaleRail, blue ? sc.scaleRailBlue : sc.scaleRailCoral].join(" ")}
                      aria-hidden="true"
                    />
                    <span className={sc.scaleLightCard}>
                      <span className={sc.num}>{opt.value}</span>
                      <span className={sc.word}>{opt.label}</span>
                    </span>
                  </button>
                );
              })}
            </div>
        </div>
      </div>
    </div>
  );
}
