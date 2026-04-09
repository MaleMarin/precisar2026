"use client";

import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { useConsultaLivePulse } from "./ConsultaLiveMapProvider";
import { useConsultaFlow } from "./ConsultaFlowContext";
import { ConsultaCompletion } from "./ConsultaCompletion";
import { ConsultaDemographicsStep } from "./ConsultaDemographicsStep";
import { ConsultaInterstitialStep } from "./ConsultaInterstitialStep";
import { ConsultaOpenTextStep } from "./ConsultaOpenTextStep";
import { ConsultaProgress } from "./ConsultaProgress";
import { ConsultaQuestionStep } from "./ConsultaQuestionStep";
import { ConsultaScaleStep } from "./ConsultaScaleStep";
import st from "./ConsultaSteps.module.css";
import wz from "./ConsultaWizard.module.css";
import flowShell from "@/app/consulta/ConsultaFlowSlot.module.css";
import { getStepDefinition, progressCurrent } from "@/lib/consulta/questions";

const STEP_HEADING_ID = "consulta-step-title";

export function ConsultaWizard() {
  const {
    modo,
    phase,
    activeView,
    questionIndex,
    quickExtended,
    answers,
    setMultiAnswer,
    setScaleAnswer,
    setOpenAnswer,
    patchDemographics,
    advance,
    back,
    finishQuickNow,
    continueQuickMore,
    restartEntire,
  } = useConsultaFlow();

  const { pulseOnAnswer, pulseOnSelect } = useConsultaLivePulse();

  const [softError, setSoftError] = useState<string | null>(null);

  const step = phase === "active" && activeView === "question" ? getStepDefinition(questionIndex) : undefined;

  const liveMsg = useMemo(() => {
    if (phase === "active" && activeView === "question" && step) {
      return `Pregunta ${questionIndex + 1}. ${step.prompt.slice(0, 80)}`;
    }
    if (phase === "active" && activeView === "interstitial") {
      return "Mitad del recorrido: puedes terminar aquí o seguir con más preguntas.";
    }
    if (phase === "complete") {
      return "Gracias, terminaste el recorrido.";
    }
    return "";
  }, [phase, activeView, step, questionIndex]);

  useEffect(() => {
    queueMicrotask(() => {
      setSoftError(null);
    });
  }, [questionIndex, activeView, phase]);

  useEffect(() => {
    if (phase === "complete") {
      document.getElementById("consulta-completion-title")?.focus();
      return;
    }
    if (phase === "awaiting_entry") {
      return;
    }
    if (phase === "active" && activeView === "interstitial") {
      document.getElementById("consulta-interstitial-title")?.focus();
      return;
    }
    document.getElementById(STEP_HEADING_ID)?.focus();
  }, [questionIndex, activeView, phase]);

  const onPrimary = useCallback(() => {
    const r = advance();
    if (!r.ok) {
      setSoftError(r.error);
      return;
    }
    pulseOnAnswer();
  }, [advance, pulseOnAnswer]);

  const prog =
    modo && phase === "active"
      ? progressCurrent({
          modo,
          quickExtended,
          activeView,
          questionIndex,
        })
      : null;

  const isLastQuestion = questionIndex >= 11;
  const canBack =
    phase === "active" &&
    (activeView === "interstitial" || (activeView === "question" && questionIndex > 0));

  let body: ReactNode;

  if (phase === "complete") {
    body = (
      <ConsultaCompletion modo={modo} quickExtended={quickExtended} onRestart={restartEntire} />
    );
  } else if (phase === "awaiting_entry") {
    body = null;
  } else if (activeView === "interstitial") {
    body = (
      <>
        {prog ? (
          <ConsultaProgress
            current={prog.current}
            total={prog.total}
            remainingAfterThis={0}
            modeLabel="interstitial"
          />
        ) : null}
        <ConsultaInterstitialStep
          onFinishNow={finishQuickNow}
          onMore={continueQuickMore}
          onBack={back}
        />
      </>
    );
  } else if (step) {
    body = (
      <>
        {prog ? (
          <ConsultaProgress
            current={prog.current}
            total={prog.total}
            remainingAfterThis={prog.remainingAfterThis}
          />
        ) : null}

        {step.kind === "multi" ? (
          <ConsultaQuestionStep
            step={step}
            value={answers[step.id]}
            onChange={setMultiAnswer}
            error={softError}
            headingId={STEP_HEADING_ID}
            onInteraction={pulseOnSelect}
          />
        ) : null}
        {step.kind === "scale" ? (
          <ConsultaScaleStep
            step={step}
            value={answers.p6}
            onChange={setScaleAnswer}
            error={softError}
            headingId={STEP_HEADING_ID}
            onInteraction={pulseOnSelect}
          />
        ) : null}
        {step.kind === "open" ? (
          <ConsultaOpenTextStep
            step={step}
            value={answers.p11}
            onChange={setOpenAnswer}
            error={softError}
            headingId={STEP_HEADING_ID}
          />
        ) : null}
        {step.kind === "demographics" ? (
          <ConsultaDemographicsStep
            step={step}
            value={answers.p12}
            onPatch={patchDemographics}
            error={softError}
            headingId={STEP_HEADING_ID}
          />
        ) : null}

        <div className={st.navChrome}>
          <div className={st.navLightDock}>
            <div className={st.navRow}>
              <button type="button" className={st.navGhost} onClick={back} disabled={!canBack}>
                Volver
              </button>
              <button type="button" className={st.navPrimary} onClick={onPrimary}>
                <div className={st.navPrimarySolid}>
                  <div className={st.navPrimarySolidInner}>
                    {isLastQuestion ? "Terminar" : "Continuar"}
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    body = null;
  }

  return (
    <section
      id="consulta-flujo"
      className={flowShell.canvas}
      aria-label="Preguntas"
      data-consulta-live="true"
    >
      <span className={wz.liveRegion} aria-live="polite">
        {liveMsg}
      </span>
      {phase !== "awaiting_entry" ? (
        <div className={flowShell.flowAnchor} data-consulta-cluster="flow-entry">
          <div className={flowShell.wizChrome}>
            <div className={flowShell.inner} data-consulta-wizard-inner="true">
              <div className={[flowShell.flowBody, wz.wizardFlow].join(" ")}>{body}</div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
