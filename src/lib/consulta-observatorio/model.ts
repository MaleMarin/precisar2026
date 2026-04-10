/** Modelo de datos del observatorio (alineado al prototipo HTML). */

export type QuestionType = "multi" | "scale" | "text" | "demo";

export type SlotDef = { l: string; c: string };

export type QuestionDef =
  | {
      t: "multi";
      s: string;
      f: string;
      why: string;
      slots: SlotDef[];
    }
  | {
      t: "scale";
      s: string;
      f: string;
      why: string;
    }
  | {
      t: "text" | "demo";
      s: string;
      f: string;
      why: string;
    };

export const QDEFS: QuestionDef[] = [
  {
    t: "multi",
    s: "¿Por dónde?",
    f: "¿Por dónde te informas más en este momento?",
    why: "El canal define el tipo de información que recibes y cómo te llega.",
    slots: [
      { l: "Redes sociales", c: "#9D2A80" },
      { l: "WhatsApp/TG", c: "#155D84" },
      { l: "YouTube/Pod.", c: "#155D84" },
      { l: "TV/Radio/Prensa", c: "#D03F37" },
      { l: "IA/Personas", c: "#9D2A80" },
    ],
  },
  {
    t: "multi",
    s: "¿Por qué?",
    f: "¿Por qué usas más esos canales?",
    why: "La motivación revela las barreras reales para acceder a información de calidad.",
    slots: [
      { l: "Rápido/Cómodo", c: "#155D84" },
      { l: "Hábito", c: "#9D2A80" },
      { l: "Confianza", c: "#155D84" },
      { l: "Me ayuda a entender", c: "#D03F37" },
      { l: "Primero/Gratis", c: "#9D2A80" },
    ],
  },
  {
    t: "multi",
    s: "Temas",
    f: "¿Qué temas sigues para entender lo que pasa a tu alrededor?",
    why: "Los temas que seguimos revelan qué narrativas moldean la percepción pública.",
    slots: [
      { l: "Política/Seguridad", c: "#9D2A80" },
      { l: "Economía/Trabajo", c: "#D03F37" },
      { l: "Salud/Educación", c: "#155D84" },
      { l: "Tecnología/IA", c: "#155D84" },
      { l: "Cultura/Derechos", c: "#9D2A80" },
    ],
  },
  {
    t: "multi",
    s: "Preocupaciones",
    f: "¿Qué te preocupa más de la información que recibes?",
    why: "Conocer los miedos permite diseñar herramientas de protección efectivas.",
    slots: [
      { l: "Noticias falsas", c: "#9D2A80" },
      { l: "Manipulación/Sesgo", c: "#155D84" },
      { l: "Titulares engañosos", c: "#D03F37" },
      { l: "Privacidad/Datos", c: "#155D84" },
      { l: "Exceso/Violencia", c: "#9D2A80" },
    ],
  },
  {
    t: "multi",
    s: "¿Qué ayudaría?",
    f: "¿Qué te ayudaría más a sentir seguridad y confianza?",
    why: "Las respuestas guían el diseño de educación mediática con impacto real.",
    slots: [
      { l: "Saber la fuente", c: "#155D84" },
      { l: "Comparar fuentes", c: "#9D2A80" },
      { l: "Lenguaje simple", c: "#155D84" },
      { l: "Detectar/Verificar", c: "#D03F37" },
      { l: "Señales IA/Datos", c: "#9D2A80" },
    ],
  },
  {
    t: "scale",
    s: "Nivel de confianza",
    f: "¿Cuánta confianza te generan las noticias y contenidos que recibes?",
    why: "La confianza ciudadana es el termómetro de la salud informativa de una sociedad.",
  },
  {
    t: "multi",
    s: "Ante la duda",
    f: "Cuando dudas de una información, ¿qué haces normalmente?",
    why: "La respuesta ante la duda define si la desinformación circula o se detiene.",
    slots: [
      { l: "Busco más info", c: "#155D84" },
      { l: "Reviso con calma", c: "#9D2A80" },
      { l: "Pregunto a alguien", c: "#155D84" },
      { l: "Le pregunto a IA", c: "#D03F37" },
      { l: "Nada/Comparto igual", c: "#9D2A80" },
    ],
  },
  {
    t: "multi",
    s: "Formato preferido",
    f: "¿Qué formato te ayuda más a entender un tema importante?",
    why: "El formato preferido orienta el diseño de materiales educativos accesibles.",
    slots: [
      { l: "Video corto", c: "#9D2A80" },
      { l: "Texto simple", c: "#155D84" },
      { l: "Infografía", c: "#155D84" },
      { l: "Audio", c: "#D03F37" },
      { l: "Chat/Preguntas", c: "#9D2A80" },
    ],
  },
  {
    t: "multi",
    s: "Adaptaciones",
    f: "¿Necesitas alguna adaptación para informarte mejor?",
    why: "La inclusión en el acceso a la información es un derecho, no un extra.",
    slots: [
      { l: "Sin adaptación", c: "#155D84" },
      { l: "Letra grande", c: "#9D2A80" },
      { l: "Lectura fácil", c: "#155D84" },
      { l: "Subtítulos/Audio", c: "#D03F37" },
      { l: "Contraste/Idioma", c: "#9D2A80" },
    ],
  },
  {
    t: "multi",
    s: "IA y transparencia",
    f: "Cuando un contenido menciona o usa IA, ¿qué querrías saber?",
    why: "La transparencia sobre IA es urgente en un ecosistema de contenido generado.",
    slots: [
      { l: "Si fue con IA", c: "#155D84" },
      { l: "Qué parte IA", c: "#9D2A80" },
      { l: "Quién revisó", c: "#155D84" },
      { l: "Fuentes/Margen", c: "#D03F37" },
      { l: "No es importante", c: "#9D2A80" },
    ],
  },
  {
    t: "text",
    s: "Experiencia ideal",
    f: "Imagina tu experiencia informativa ideal. ¿Cómo te gustaría informarte?",
    why: "Las respuestas abiertas revelan deseos que los datos cerrados no capturan.",
  },
  {
    t: "demo",
    s: "Datos demográficos",
    f: "Datos básicos para contextualizar las respuestas (todo opcional)",
    why: "El contexto demográfico permite identificar brechas y necesidades específicas.",
  },
];

export type CountryPin = { iso: string; name: string; x: number; y: number };

export const OBSERVATORIO_COUNTRIES: CountryPin[] = [
  { iso: "MX", name: "México", x: 44, y: 80 },
  { iso: "BR", name: "Brasil", x: 132, y: 80 },
  { iso: "CO", name: "Colombia", x: 220, y: 80 },
  { iso: "AR", name: "Argentina", x: 308, y: 80 },
  { iso: "CL", name: "Chile", x: 396, y: 80 },
  { iso: "PE", name: "Perú", x: 44, y: 176 },
  { iso: "VE", name: "Venezuela", x: 132, y: 176 },
  { iso: "EC", name: "Ecuador", x: 220, y: 176 },
  { iso: "GT", name: "Guatemala", x: 308, y: 176 },
  { iso: "DO", name: "R. Dom.", x: 396, y: 176 },
  { iso: "CU", name: "Cuba", x: 44, y: 272 },
  { iso: "PA", name: "Panamá", x: 132, y: 272 },
  { iso: "BO", name: "Bolivia", x: 220, y: 272 },
  { iso: "PY", name: "Paraguay", x: 308, y: 272 },
  { iso: "UY", name: "Uruguay", x: 396, y: 272 },
];

export type MockResponseRow = {
  iso: string;
  ts: number;
  /** Por índice de pregunta: escala numérica, multi como índices de slot, o [] para texto/demo */
  qa: Array<number | number[]>;
};

export function scaleColor(v: number): string {
  if (!v) return "rgba(21,93,132,0.35)";
  if (v < 2) return "#D03F37";
  if (v < 3) return "#9D2A80";
  if (v < 4) return "#155D84";
  return "#D03F37";
}

export function makeResp(iso: string): MockResponseRow {
  const qa = QDEFS.map((q, qi) => {
    if (q.t === "scale") return 1 + Math.random() * 4;
    if (q.t === "text" || q.t === "demo") return [] as number[];
    const n = qi === 2 ? 2 : 1;
    const h = (iso.charCodeAt(0) + iso.charCodeAt(1) + qi * 13) % 5;
    const w = [5, 4, 3, 2, 1].map((v, j) => v + (((j + h) % 5 === 0) ? 4 : 0));
    const tot = w.reduce((a, b) => a + b, 0);
    const slots = new Set<number>();
    let att = 0;
    while (slots.size < n && att < 20) {
      let r = Math.random() * tot;
      for (let j = 0; j < 5; j++) {
        r -= w[j] ?? 0;
        if (r <= 0) {
          slots.add(j);
          break;
        }
      }
      att++;
    }
    return [...slots];
  });
  return { iso, ts: Date.now() - Math.random() * 9 * 60 * 1000, qa };
}

export type AggMulti = {
  tp: "multi";
  counts: number[];
  cTotal: number;
  domIdx: number;
  total: number;
  recent: number;
  last: number | null;
};

export type AggScale = {
  tp: "scale";
  avg: number;
  total: number;
  recent: number;
  last: number | null;
};

export type AggOpen = {
  tp: "text" | "demo";
  total: number;
  recent: number;
  last: number | null;
};

export type AggResult = AggMulti | AggScale | AggOpen;

/** Radio del círculo país según volumen de respuestas (mock). */
export function observatorioBubbleRadius(responseCount: number): number {
  const raw = 7 + Math.sqrt(responseCount) * 1.8;
  return Math.min(Math.max(raw, 7), 28);
}

export function agg(
  responses: MockResponseRow[],
  iso: string | null,
  qi: number,
  nowTs: number,
): AggResult {
  const q = QDEFS[qi];
  if (!q) {
    return { tp: "text", total: 0, recent: 0, last: null };
  }
  const rows = iso ? responses.filter((r) => r.iso === iso) : responses;
  const cut = nowTs - 5 * 60 * 1000;
  const recent = iso ? rows.filter((r) => r.ts >= cut).length : 0;
  const last = iso && rows.length ? Math.max(...rows.map((r) => r.ts)) : null;
  const total = rows.length;

  if (q.t === "scale") {
    const vals = rows
      .map((r) => r.qa[qi])
      .filter((v): v is number => typeof v === "number" && v > 0);
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    return { tp: "scale", avg, total, recent, last };
  }
  if (q.t === "text" || q.t === "demo") {
    return { tp: q.t, total, recent, last };
  }
  const counts = [0, 0, 0, 0, 0];
  rows.forEach((r) => {
    const a = r.qa[qi];
    if (Array.isArray(a)) {
      a.forEach((s) => {
        if (s >= 0 && s < 5) counts[s]++;
      });
    }
  });
  const cTotal = counts.reduce((a, b) => a + b, 0);
  const domIdx = counts.indexOf(Math.max(...counts));
  return { tp: "multi", counts, cTotal, domIdx, total, recent, last };
}

export type LiveFinding = { c: string; text: string } | null;

export function liveFinding(
  responses: MockResponseRow[],
  qi: number,
  nowTs: number,
): LiveFinding {
  const q = QDEFS[qi];
  if (!q) return null;

  if (q.t === "scale") {
    const scores = OBSERVATORIO_COUNTRIES.map((c) => agg(responses, c.iso, qi, nowTs)).filter(
      (d) => d.tp === "scale" && d.avg > 0,
    ) as AggScale[];
    if (!scores.length) return null;
    const avg = (
      scores.reduce((a, b) => a + b.avg, 0) / scores.length
    ).toFixed(1);
    return {
      c: scaleColor(parseFloat(avg)),
      text: `Promedio regional: ${avg}★ de confianza`,
    };
  }
  if (q.t === "text" || q.t === "demo") {
    return {
      c: "rgba(21,93,132,0.5)",
      text: `${responses.length} personas han respondido la consulta`,
    };
  }
  if (q.t !== "multi") return null;
  const slotCounts = q.slots.map((_, si: number) =>
    OBSERVATORIO_COUNTRIES.filter((c) => {
      const d = agg(responses, c.iso, qi, nowTs);
      return d.tp === "multi" && d.cTotal > 0 && d.domIdx === si;
    }).length,
  );
  const topSi = slotCounts.indexOf(Math.max(...slotCounts));
  const n = slotCounts[topSi];
  if (n === 0 || topSi < 0) return null;
  return {
    c: q.slots[topSi].c,
    text: `"${q.slots[topSi].l}" lidera en ${n} de ${OBSERVATORIO_COUNTRIES.length} países`,
  };
}

export type InsightLine = { c: string; t: string };

export function generateInsights(
  responses: MockResponseRow[],
  qi: number,
  nowTs: number,
): InsightLine[] {
  const q = QDEFS[qi];
  if (!q) return [];

  if (q.t === "scale") {
    const scores = OBSERVATORIO_COUNTRIES.map((c) => ({
      name: c.name,
      d: agg(responses, c.iso, qi, nowTs),
    })).filter((x) => x.d.tp === "scale" && (x.d as AggScale).avg > 0) as {
      name: string;
      d: AggScale;
    }[];
    if (!scores.length) return [];
    scores.sort((a, b) => b.d.avg - a.d.avg);
    const avg = (
      scores.reduce((a, b) => a + b.d.avg, 0) / scores.length
    ).toFixed(1);
    return [
      { c: "#155D84", t: `Más confianza: ${scores[0].name} (${scores[0].d.avg.toFixed(1)}★)` },
      {
        c: "#D03F37",
        t: `Menos confianza: ${scores[scores.length - 1].name} (${scores[scores.length - 1].d.avg.toFixed(1)}★)`,
      },
      { c: "#9D2A80", t: `Promedio regional: ${avg} de 5 estrellas` },
    ];
  }
  if (q.t === "text" || q.t === "demo") {
    return [{ c: "rgba(21,93,132,0.5)", t: "Selecciona un país para leer sus respuestas." }];
  }
  if (q.t !== "multi") return [];

  const result: InsightLine[] = [];
  q.slots.forEach((s, si) => {
    const cs = OBSERVATORIO_COUNTRIES.filter((c) => {
      const d = agg(responses, c.iso, qi, nowTs);
      return d.tp === "multi" && d.cTotal > 0 && d.domIdx === si;
    });
    if (cs.length > 0) {
      result.push({ c: s.c, t: `${s.l}: ${cs.map((c) => c.name).join(", ")}` });
    }
  });
  return result.slice(0, 4);
}

const SEED_WEIGHTS: Record<string, number> = {
  MX: 6,
  BR: 6,
  CO: 5,
  AR: 5,
  CL: 5,
  PE: 4,
  VE: 3,
  EC: 2,
  GT: 2,
  DO: 2,
  CU: 2,
  PA: 2,
  BO: 2,
  PY: 1,
  UY: 1,
};

export function seedObservatorioResponses(): MockResponseRow[] {
  const pool: string[] = [];
  OBSERVATORIO_COUNTRIES.forEach((c) => {
    const w = SEED_WEIGHTS[c.iso] ?? 1;
    for (let j = 0; j < w; j++) pool.push(c.iso);
  });
  const responses: MockResponseRow[] = [];
  for (let i = 0; i < 110; i++) {
    responses.push(makeResp(pool[Math.floor(Math.random() * pool.length)] ?? "CL"));
  }
  return responses;
}

export function addFakeResponse(responses: MockResponseRow[]): MockResponseRow[] {
  const pool = [
    "MX",
    "MX",
    "BR",
    "AR",
    "CO",
    "CL",
    "PE",
    "VE",
    "GT",
    "EC",
    "DO",
    "CU",
    "PA",
    "BO",
    "PY",
    "UY",
  ];
  const next = [
    ...responses,
    makeResp(pool[Math.floor(Math.random() * pool.length)] ?? "CL"),
  ];
  if (next.length > 300) return next.slice(-300);
  return next;
}
