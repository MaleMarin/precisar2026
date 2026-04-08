export type ConsultaModo = "rapido" | "completo";

export type ConsultaFlowPhase = "awaiting_entry" | "active" | "complete";

export type ConsultaActiveView = "question" | "interstitial";

export type ConsultaStepKind = "multi" | "scale" | "open" | "demographics";

export type ConsultaOption = { id: string; label: string };

export type ConsultaMultiId = "p1" | "p2" | "p3" | "p4" | "p5" | "p7" | "p8" | "p9" | "p10";

export type ConsultaMultiStep = {
  id: ConsultaMultiId;
  kind: "multi";
  prompt: string;
  helper: string;
  maxSelections: number;
  options: ConsultaOption[];
};

export type ConsultaScaleStep = {
  id: "p6";
  kind: "scale";
  prompt: string;
  min: 1;
  max: 5;
  options: { value: number; label: string }[];
};

export type ConsultaOpenStep = {
  id: "p11";
  kind: "open";
  prompt: string;
  helper: string;
  placeholder: string;
  rows: number;
};

export type ConsultaDemographicsFieldType = "text" | "select" | "email";

export type ConsultaDemographicsField = {
  key: keyof ConsultaDemographics;
  label: string;
  type: ConsultaDemographicsFieldType;
  placeholder?: string;
  options?: { value: string; label: string }[];
};

export type ConsultaDemographicsStep = {
  id: "p12";
  kind: "demographics";
  prompt: string;
  helper: string;
  fields: ConsultaDemographicsField[];
};

export type ConsultaStepDef =
  | ConsultaMultiStep
  | ConsultaScaleStep
  | ConsultaOpenStep
  | ConsultaDemographicsStep;

export type ConsultaDemographics = {
  pais: string;
  region: string;
  entorno: string;
  edad: string;
  genero: string;
  educacion: string;
  idioma: string;
  correo: string;
};

export type ConsultaAnswers = {
  p1?: string[];
  p2?: string[];
  p3?: string[];
  p4?: string[];
  p5?: string[];
  p6?: number;
  p7?: string[];
  p8?: string[];
  p9?: string[];
  p10?: string[];
  p11?: string;
  p12?: Partial<ConsultaDemographics>;
};

export const emptyDemographics = (): ConsultaDemographics => ({
  pais: "",
  region: "",
  entorno: "",
  edad: "",
  genero: "",
  educacion: "",
  idioma: "",
  correo: "",
});
