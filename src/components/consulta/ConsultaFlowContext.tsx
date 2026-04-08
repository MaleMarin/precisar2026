"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  getStepDefinition,
  mergeDemographics,
  validateStep,
} from "@/lib/consulta/questions";
import type {
  ConsultaActiveView,
  ConsultaAnswers,
  ConsultaDemographics,
  ConsultaFlowPhase,
  ConsultaModo,
  ConsultaMultiId,
} from "@/lib/consulta/types";

export type AdvanceResult = { ok: true } | { ok: false; error: string };

export type ConsultaFlowContextValue = {
  modo: ConsultaModo | null;
  setModo: (m: ConsultaModo | null) => void;
  phase: ConsultaFlowPhase;
  enterFlow: () => void;
  activeView: ConsultaActiveView;
  questionIndex: number;
  quickExtended: boolean;
  answers: ConsultaAnswers;
  setMultiAnswer: (id: ConsultaMultiId, value: string[]) => void;
  setScaleAnswer: (value: number) => void;
  setOpenAnswer: (value: string) => void;
  patchDemographics: (patch: Partial<ConsultaDemographics>) => void;
  advance: () => AdvanceResult;
  back: () => void;
  finishQuickNow: () => void;
  continueQuickMore: () => void;
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
  const [modo, setModoState] = useState<ConsultaModo | null>(null);
  const [phase, setPhase] = useState<ConsultaFlowPhase>("awaiting_entry");
  const [activeView, setActiveView] = useState<ConsultaActiveView>("question");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [quickExtended, setQuickExtended] = useState(false);
  const [answers, setAnswersState] = useState<ConsultaAnswers>({});
  const prevModoRef = useRef<ConsultaModo | null | undefined>(undefined);

  useEffect(() => {
    if (prevModoRef.current === undefined) {
      prevModoRef.current = modo;
      return;
    }
    if (prevModoRef.current === modo) return;
    prevModoRef.current = modo;
    setPhase("awaiting_entry");
    setActiveView("question");
    setQuestionIndex(0);
    setQuickExtended(false);
    setAnswersState({});
  }, [modo]);

  const setModo = useCallback((m: ConsultaModo | null) => {
    setModoState(m);
  }, []);

  const enterFlow = useCallback(() => {
    if (modo == null) return;
    setPhase("active");
    setActiveView("question");
    setQuestionIndex(0);
    setQuickExtended(false);
    setAnswersState({});
  }, [modo]);

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

  const advance = useCallback((): AdvanceResult => {
    if (modo == null) {
      return { ok: false, error: "Primero elige arriba cómo quieres responder." };
    }
    if (phase !== "active" || activeView !== "question") {
      return { ok: false, error: "Algo salió mal. Intenta de nuevo." };
    }

    const step = getStepDefinition(questionIndex);
    if (!step) return { ok: false, error: "Algo salió mal. Intenta de nuevo." };

    const err = validateStep(step, answers);
    if (err) return { ok: false, error: err };

    if (modo === "rapido" && questionIndex === 5) {
      setActiveView("interstitial");
      return { ok: true };
    }

    if (questionIndex >= 11) {
      setPhase("complete");
      return { ok: true };
    }

    setQuestionIndex((i) => i + 1);
    return { ok: true };
  }, [modo, phase, activeView, questionIndex, answers]);

  const back = useCallback(() => {
    if (phase !== "active") return;
    if (activeView === "interstitial") {
      setActiveView("question");
      return;
    }
    if (questionIndex > 0) {
      setQuestionIndex((i) => i - 1);
    }
  }, [phase, activeView, questionIndex]);

  const finishQuickNow = useCallback(() => {
    setPhase("complete");
  }, []);

  const continueQuickMore = useCallback(() => {
    setQuickExtended(true);
    setActiveView("question");
    setQuestionIndex(6);
  }, []);

  const restartEntire = useCallback(() => {
    setModoState(null);
    setPhase("awaiting_entry");
    setActiveView("question");
    setQuestionIndex(0);
    setQuickExtended(false);
    setAnswersState({});
  }, []);

  const value = useMemo(
    () =>
      ({
        modo,
        setModo,
        phase,
        enterFlow,
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
      }) satisfies ConsultaFlowContextValue,
    [
      modo,
      setModo,
      phase,
      enterFlow,
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
    ],
  );

  return <ConsultaFlowContext.Provider value={value}>{children}</ConsultaFlowContext.Provider>;
}
