import type { DominantSource } from "./types";

export const SOURCE_LABELS: Record<DominantSource, string> = {
  whatsapp: "WhatsApp / Telegram",
  social: "Redes sociales",
  tv_radio: "TV / radio",
  news: "Portales / diarios",
  ai: "IA / buscadores",
};

/** Color por tipo de fuente (hex). */
export const SOURCE_COLORS: Record<DominantSource, string> = {
  whatsapp: "#25d366",
  social: "#6c8cff",
  tv_radio: "#ffb84d",
  news: "#7ee0d0",
  ai: "#c77dff",
};

export function sourceColorRgb(source: DominantSource): [number, number, number] {
  const hex = SOURCE_COLORS[source].replace("#", "");
  return [parseInt(hex.slice(0, 2), 16), parseInt(hex.slice(2, 4), 16), parseInt(hex.slice(4, 6), 16)];
}
