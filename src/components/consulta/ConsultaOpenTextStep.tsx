"use client";

import st from "./ConsultaSteps.module.css";
import type { ConsultaOpenStep } from "@/lib/consulta/types";

type Props = {
  step: ConsultaOpenStep;
  value: string | undefined;
  onChange: (v: string) => void;
  error?: string | null;
  headingId: string;
};

export function ConsultaOpenTextStep({ step, value, onChange, error, headingId }: Props) {
  return (
    <div>
      <div className={st.stepHead}>
        <p className={st.eyebrow}>Tu respuesta</p>
        <h3 id={headingId} className={st.prompt} tabIndex={-1}>
          {step.prompt}
        </h3>
        <p className={st.helper}>{step.helper}</p>
      </div>
      {error ? <p className={st.softError}>{error}</p> : null}

      <div className={st.stepPanel}>
        <div className={[st.stepPanelInner, st.stepPanelPad].join(" ")}>
          <div className={st.textAreaWrap}>
            <div className={st.textAreaInner}>
              <textarea
                className={st.textArea}
                rows={step.rows}
                placeholder={step.placeholder}
                value={value ?? ""}
                onChange={(e) => onChange(e.target.value)}
                autoComplete="off"
                aria-labelledby={headingId}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
