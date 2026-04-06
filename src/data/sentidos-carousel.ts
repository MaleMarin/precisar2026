/**
 * Carrusel Sentidos digitales — ilustraciones alineadas a cada ficha (mismas que las páginas internas).
 * Degradados y fallbacks en paleta Precisar 2026 (void, navy, flame, superficies claras).
 */
export type SentidoCarouselAssets = {
  /** Ilustración principal (PNG Wix / CDN) */
  bg: string;
  /** Textura detrás del degradado (opcional; vacío si no hay archivo local) */
  backdrop?: string;
  front?: string;
  fallback: string;
  cardGradient: string;
  cardLabel: string;
};

const WIX = "https://static.wixstatic.com/media";

/** Ilustración por sentido (coherente con VisionDigitalExperience, Escucha, etc.) */
const ILLU: Record<string, string> = {
  vision: `${WIX}/4c5e66_1d8d497349824658bf6b4a0c0921048c~mv2.png`,
  oido: `${WIX}/4c5e66_59c5017d451942419550e187f5b479e5~mv2.png`,
  tacto: `${WIX}/4c5e66_ff35c2220a9c4397927b2d084d708999~mv2.png`,
  sabor: `${WIX}/4c5e66_6c359ba2ddb448e7ba8550bb136f910c~mv2.png`,
  olfato: `${WIX}/4c5e66_be2e7dd1e2294f2b871e1a4e51f99850~mv2.png`,
  equilibrio: `${WIX}/4c5e66_402017c5087f4db1bee19ba883fb69ec~mv2.png`,
};

export const SENTIDOS_CAROUSEL: Record<string, SentidoCarouselAssets> = {
  tacto: {
    bg: ILLU.tacto,
    fallback: "#2c4766",
    cardGradient:
      "linear-gradient(168deg, rgba(233, 238, 245, 0.96) 0%, rgba(205, 218, 235, 0.94) 48%, rgba(175, 198, 225, 0.92) 100%)",
    cardLabel: "Sentido digital del tacto",
  },
  olfato: {
    bg: ILLU.olfato,
    fallback: "#1e3d4a",
    cardGradient:
      "linear-gradient(175deg, rgba(238, 242, 244, 0.96) 0%, rgba(210, 224, 230, 0.94) 50%, rgba(185, 208, 218, 0.92) 100%)",
    cardLabel: "Sentido digital del olfato",
  },
  vision: {
    bg: ILLU.vision,
    fallback: "#023661",
    cardGradient:
      "linear-gradient(175deg, rgba(232, 238, 245, 0.96) 0%, rgba(200, 218, 235, 0.94) 42%, rgba(165, 195, 220, 0.92) 100%)",
    cardLabel: "Sentido digital de la visión",
  },
  sabor: {
    bg: ILLU.sabor,
    fallback: "#9e3b1f",
    cardGradient:
      "linear-gradient(180deg, rgba(245, 235, 231, 0.96) 0%, rgba(235, 212, 200, 0.94) 50%, rgba(225, 195, 180, 0.92) 100%)",
    cardLabel: "Sentido digital del sabor",
  },
  equilibrio: {
    bg: ILLU.equilibrio,
    fallback: "#3a634c",
    cardGradient:
      "linear-gradient(180deg, rgba(237, 244, 239, 0.96) 0%, rgba(215, 230, 220, 0.94) 48%, rgba(195, 218, 205, 0.92) 100%)",
    cardLabel: "Sentido digital del equilibrio",
  },
  oido: {
    bg: ILLU.oido,
    fallback: "#a63d1e",
    cardGradient:
      "linear-gradient(180deg, rgba(243, 234, 230, 0.96) 0%, rgba(237, 210, 200, 0.94) 45%, rgba(228, 195, 185, 0.92) 100%)",
    cardLabel: "Sentido digital del oído",
  },
};

export function sentidoCarouselAssets(slug: string): SentidoCarouselAssets {
  return (
    SENTIDOS_CAROUSEL[slug] ?? {
      bg: "",
      fallback: "#3f3a42",
      cardGradient: "linear-gradient(180deg, rgba(240, 242, 246, 0.95) 0%, rgba(228, 234, 241, 0.93) 100%)",
      cardLabel: "Sentido digital",
    }
  );
}
