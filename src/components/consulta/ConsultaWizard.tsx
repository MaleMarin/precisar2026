"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { useConsultaLivePulse } from "./ConsultaLiveMapProvider";
import { useConsultaFlow } from "./ConsultaFlowContext";
import { ConsultaCompletion } from "./ConsultaCompletion";
import { ConsultaDemographicsStep } from "./ConsultaDemographicsStep";
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
    phase,
    questionIndex,
    answers,
    setMultiAnswer,
    setScaleAnswer,
    setOpenAnswer,
    patchDemographics,
    advance,
    back,
    restartEntire,
  } = useConsultaFlow();

  const { pulseOnAnswer, pulseOnSelect } = useConsultaLivePulse();

  const [softError, setSoftError] = useState<string | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitLockRef = useRef(false);

  const step = phase === "active" ? getStepDefinition(questionIndex) : undefined;

  const liveMsg = useMemo(() => {
    if (phase === "active" && step) {
      return `Pregunta ${questionIndex + 1}. ${step.prompt.slice(0, 80)}`;
    }
    if (phase === "complete") {
      return "Gracias, terminaste el recorrido.";
    }
    return "";
  }, [phase, step, questionIndex]);

  useEffect(() => {
    queueMicrotask(() => {
      setSoftError(null);
    });
  }, [questionIndex, phase]);

  useEffect(() => {
    if (step?.kind !== "demographics") {
      setPrivacyAccepted(false);
    }
  }, [questionIndex, step?.kind]);

  useEffect(() => {
    if (phase === "complete") {
      document.getElementById("consulta-completion-title")?.focus();
      return;
    }
    if (phase === "awaiting_entry") {
      return;
    }
    document.getElementById(STEP_HEADING_ID)?.focus();
  }, [questionIndex, phase]);

  const isDemographicsStep = step?.kind === "demographics";

  const onPrimary = useCallback(async () => {
    if (isDemographicsStep && !privacyAccepted) {
      setSoftError("Marca la casilla verde para confirmar que leíste la política de privacidad. Así podemos enviar tus respuestas.");
      return;
    }
    if (submitLockRef.current) return;
    submitLockRef.current = true;
    setIsSubmitting(true);
    try {
      const r = await advance();
      if (!r.ok) {
        setSoftError(r.error);
        return;
      }
      pulseOnAnswer();
    } finally {
      submitLockRef.current = false;
      setIsSubmitting(false);
    }
  }, [advance, pulseOnAnswer, isDemographicsStep, privacyAccepted]);

  const prog = phase === "active" ? progressCurrent({ questionIndex }) : null;

  const isLastQuestion = questionIndex >= 11;
  const canBack = phase === "active" && questionIndex > 0;

  let body: ReactNode;

  if (phase === "complete") {
    body = <ConsultaCompletion onRestart={restartEntire} />;
  } else if (phase === "awaiting_entry") {
    body = null;
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

        {isDemographicsStep ? (
          <div className={st.privacyConsentWrap}>
            <div className={st.privacyRow}>
              <input
                id="consulta-privacy-consent"
                className={st.privacyCheckbox}
                type="checkbox"
                checked={privacyAccepted}
                onChange={(e) => {
                  setPrivacyAccepted(e.target.checked);
                  if (e.target.checked) setSoftError(null);
                }}
              />
              <label className={st.privacyLabel} htmlFor="consulta-privacy-consent">
                Confirmo que leí la{" "}
                <a
                  className={st.privacyLink}
                  href="/legal/privacidad-consulta-2026"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  política de privacidad
                </a>{" "}
                de esta consulta ciudadana.
              </label>
            </div>
          </div>
        ) : null}

        <div className={st.navChrome}>
          <div className={st.navLightDock}>
            <div className={st.navRow}>
              <button type="button" className={st.navGhost} onClick={back} disabled={!canBack}>
                Volver
              </button>
              <button
                type="button"
                className={st.navPrimary}
                onClick={() => {
                  void onPrimary();
                }}
                disabled={(isDemographicsStep && !privacyAccepted) || isSubmitting}
              >
                <div className={st.navPrimarySolid}>
                  <div className={st.navPrimarySolidInner}>
                    {isSubmitting && isLastQuestion ? "Guardando…" : isLastQuestion ? "Terminar" : "Continuar"}
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
