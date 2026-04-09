"use client";

import { consultaStepTextStyle } from "./consultaStepTextStyle";
import st from "./ConsultaSteps.module.css";
import dm from "./ConsultaDemographicsStep.module.css";
import type { ConsultaDemographics, ConsultaDemographicsStep as DemoStepDef } from "@/lib/consulta/types";
import { emptyDemographics } from "@/lib/consulta/types";

type Props = {
  step: DemoStepDef;
  value: Partial<ConsultaDemographics> | undefined;
  onPatch: (patch: Partial<ConsultaDemographics>) => void;
  error?: string | null;
  headingId: string;
};

export function ConsultaDemographicsStep({ step, value, onPatch, error, headingId }: Props) {
  const v = { ...emptyDemographics(), ...value };

  return (
    <div>
      <div className={st.stepHead}>
        <p className={st.eyebrow} style={consultaStepTextStyle.eyebrow}>
          Opcional
        </p>
        <h3 id={headingId} className={st.prompt} style={consultaStepTextStyle.prompt} tabIndex={-1}>
          {step.prompt}
        </h3>
        <p className={st.helper} style={consultaStepTextStyle.helper}>
          {step.helper}
        </p>
      </div>
      {error ? <p className={st.softError}>{error}</p> : null}

      <div className={st.stepPanel}>
        <div className={[st.stepPanelInner, st.stepPanelPad].join(" ")}>
          <div className={dm.grid}>
              {step.fields.map((field) => (
                <div key={field.key} className={dm.field}>
                  <label className={dm.fieldLabel} htmlFor={`consulta-demo-${field.key}`}>
                    {field.label}
                  </label>
                  {field.type === "select" && field.options ? (
                    <div className={dm.fieldShell}>
                      <select
                        id={`consulta-demo-${field.key}`}
                        className={dm.select}
                        value={String(v[field.key] ?? "")}
                        onChange={(e) => onPatch({ [field.key]: e.target.value } as Partial<ConsultaDemographics>)}
                      >
                        {field.options.map((o) => (
                          <option key={o.value || "empty"} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <div className={dm.fieldShell}>
                      <input
                        id={`consulta-demo-${field.key}`}
                        className={dm.input}
                        type={field.type === "email" ? "email" : "text"}
                        placeholder={field.placeholder}
                        value={String(v[field.key] ?? "")}
                        onChange={(e) => onPatch({ [field.key]: e.target.value } as Partial<ConsultaDemographics>)}
                        autoComplete="off"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}
