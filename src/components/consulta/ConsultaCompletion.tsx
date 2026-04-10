"use client";

import cx from "./ConsultaWizard.module.css";
import st from "./ConsultaSteps.module.css";
import { consultaStepTextStyle } from "./consultaStepTextStyle";
import flowShell from "@/app/consulta/ConsultaFlowSlot.module.css";

type Props = {
  onRestart: () => void;
};

export function ConsultaCompletion({ onRestart }: Props) {
  return (
    <div>
      <p className={flowShell.kicker} style={consultaStepTextStyle.eyebrow}>
        Listo
      </p>
      <h3
        className={cx.completeTitle}
        style={consultaStepTextStyle.prompt}
        tabIndex={-1}
        id="consulta-completion-title"
      >
        Gracias por tu tiempo
      </h3>
      <p className={cx.completeText} style={consultaStepTextStyle.helper}>
        Completaste las 12 preguntas y el bloque de datos básicos. Lo que compartiste nos ayuda a
        entender cómo llega la información al día a día de las personas.
      </p>
      <div className={st.navLightDock}>
        <button type="button" className={cx.restartBtn} onClick={onRestart}>
          <span className={st.completionRestart}>Volver al inicio</span>
        </button>
      </div>
    </div>
  );
}
