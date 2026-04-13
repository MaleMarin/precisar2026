"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  getStepDefinition,
  mergeDemographics,
  validateStep,
} from "@/lib/consulta/questions";
import { persistConsultaSubmission } from "@/lib/consulta/persistConsultaSubmission";
import type {
  ConsultaAnswers,
  ConsultaDemographics,
  ConsultaFlowPhase,
  ConsultaMultiId,
} from "@/lib/consulta/types";

export type AdvanceResult = { ok: true } | { ok: false; error: string };

export type ConsultaFlowContextValue = {
  phase: ConsultaFlowPhase;
  enterFlow: () => void;
  questionIndex: number;
  answers: ConsultaAnswers;
  setMultiAnswer: (id: ConsultaMultiId, value: string[]) => void;
  setScaleAnswer: (value: number) => void;
  setOpenAnswer: (value: string) => void;
  patchDemographics: (patch: Partial<ConsultaDemographics>) => void;
  advance: () => Promise<AdvanceResult>;
  back: () => void;
  restartEntire: () => void;
};

const ConsultaFlowContext = createContext<ConsultaFlowContextValue | null>(null);

export function useConsultaFlow(): ConsultaFlowContextValue {
  const ctx = useContext(ConsultaFlowContext);
  if (!ctx) {
    throw new Error("useConsultaFlow debe usarse dentro de ConsultaFlowProvider");
  }
  return ctx;
}

export function ConsultaFlowProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<ConsultaFlowPhase>("awaiting_entry");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswersState] = useState<ConsultaAnswers>({});

  const enterFlow = useCallback(() => {
    setPhase("active");
    setQuestionIndex(0);
    setAnswersState({});
  }, []);

  const setMultiAnswer = useCallback((id: ConsultaMultiId, value: string[]) => {
    setAnswersState((prev) => ({ ...prev, [id]: value }));
  }, []);

  const setScaleAnswer = useCallback((value: number) => {
    setAnswersState((prev) => ({ ...prev, p6: value }));
  }, []);

  const setOpenAnswer = useCallback((value: string) => {
    setAnswersState((prev) => ({ ...prev, p11: value }));
  }, []);

  const patchDemographics = useCallback((patch: Partial<ConsultaDemographics>) => {
    setAnswersState((prev) => ({
      ...prev,
      p12: mergeDemographics(prev.p12, patch),
    }));
  }, []);

  const advance = useCallback(async (): Promise<AdvanceResult> => {
    if (phase !== "active") {
      return { ok: false, error: "Algo salió mal. Intenta de nuevo." };
    }

    const step = getStepDefinition(questionIndex);
    if (!step) return { ok: false, error: "Algo salió mal. Intenta de nuevo." };

    const err = validateStep(step, answers);
    if (err) return { ok: false, error: err };

    if (questionIndex >= 11) {
      try {
        await persistConsultaSubmission(answers);
      } catch (e) {
        console.error("[consulta] Firestore persist failed", e);
        if (e instanceof Error && e.message === "MISSING_FIREBASE_ENCUESTA_CONFIG") {
          return {
            ok: false,
            error:
              "Falta la configuración del servicio de respuestas. Si eres quien administra el sitio, revisa las variables de entorno de Firebase.",
          };
        }
        return {
          ok: false,
          error:
            "No pudimos guardar tus respuestas. Revisa tu conexión e inténtalo de nuevo. Si el problema continúa, vuelve más tarde.",
        };
      }
      setPhase("complete");
      return { ok: true };
    }

    setQuestionIndex((i) => i + 1);
    return { ok: true };
  }, [phase, questionIndex, answers]);

  const back = useCallback(() => {
    if (phase !== "active") return;
    if (questionIndex > 0) {
      setQuestionIndex((i) => i - 1);
    }
  }, [phase, questionIndex]);

  const restartEntire = useCallback(() => {
    setPhase("awaiting_entry");
    setQuestionIndex(0);
    setAnswersState({});
  }, []);

  const value = useMemo(
    () =>
      ({
        phase,
        enterFlow,
        questionIndex,
        answers,
        setMultiAnswer,
        setScaleAnswer,
        setOpenAnswer,
        patchDemographics,
        advance,
        back,
        restartEntire,
      }) satisfies ConsultaFlowContextValue,
    [
      phase,
      enterFlow,
      questionIndex,
      answers,
      setMultiAnswer,
      setScaleAnswer,
      setOpenAnswer,
      patchDemographics,
      advance,
      back,
      restartEntire,
    ],
  );

  return <ConsultaFlowContext.Provider value={value}>{children}</ConsultaFlowContext.Provider>;
}
