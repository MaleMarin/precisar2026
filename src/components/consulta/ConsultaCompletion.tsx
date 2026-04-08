"use client";

import cx from "./ConsultaWizard.module.css";
import st from "./ConsultaSteps.module.css";
import flowShell from "@/app/consulta/ConsultaFlowSlot.module.css";
import type { ConsultaModo } from "@/lib/consulta/types";

type Props = {
  modo: ConsultaModo | null;
  quickExtended: boolean;
  onRestart: () => void;
};

export function ConsultaCompletion({ modo, quickExtended, onRestart }: Props) {
  const detail =
    modo === "rapido" && !quickExtended
      ? "Dejaste el recorrido rápido en el punto intermedio."
      : modo === "rapido" && quickExtended
        ? "Completaste el recorrido rápido, con las preguntas extra."
        : "Completaste el recorrido completo.";

  return (
    <div>
      <p className={flowShell.kicker}>Listo</p>
      <h3 className={cx.completeTitle} tabIndex={-1} id="consulta-completion-title">
        Gracias por tu tiempo
      </h3>
      <p className={cx.completeText}>
        {detail} Lo que compartiste nos ayuda a entender cómo llega la información al día a día de las
        personas.
      </p>
      <div className={st.navLightDock}>
        <button type="button" className={cx.restartBtn} onClick={onRestart}>
          <span className={st.completionRestart}>Volver al inicio</span>
        </button>
      </div>
    </div>
  );
}
