"use client";

import { consultaStepTextStyle } from "./consultaStepTextStyle";
import st from "./ConsultaSteps.module.css";

type Props = {
  onFinishNow: () => void;
  onMore: () => void;
  onBack: () => void;
};

export function ConsultaInterstitialStep({ onFinishNow, onMore, onBack }: Props) {
  return (
    <div>
      <div className={st.stepHead}>
        <p className={st.eyebrow} style={consultaStepTextStyle.eyebrow}>
          Si quieres, un poco más
        </p>
        <h3
          id="consulta-interstitial-title"
          className={st.prompt}
          style={consultaStepTextStyle.prompt}
          tabIndex={-1}
        >
          ¿Seguimos un momento más?
        </h3>
        <p className={st.helper} style={consultaStepTextStyle.helper}>
          Con lo que ya respondiste nos ayudas mucho. Si te queda un poco de tiempo, puedes contestar
          algunas preguntas más y contarnos con más detalle.
        </p>
        <p className={st.capHint} style={consultaStepTextStyle.capHint}>
          Si sigues, son 6 preguntas más.
        </p>
      </div>

      <div className={st.navChrome}>
        <div className={st.navLightDock}>
          <div className={st.navRow}>
            <button type="button" className={st.navGhost} onClick={onBack}>
              Volver
            </button>
            <div className={st.navCluster}>
              <button type="button" className={st.navSecondary} onClick={onFinishNow}>
                <span className={st.navSecondaryLabel}>Terminar ahora</span>
              </button>
              <button type="button" className={st.navPrimary} onClick={onMore}>
                <div className={st.navPrimarySolid}>
                  <div className={st.navPrimarySolidInner}>Responder algunas más</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
