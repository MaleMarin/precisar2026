/** Proyección simple para visualización (no cartografía exacta). América Latina aproximada. */
export const LATAM_BOUNDS = {
  minLat: -56,
  maxLat: 33,
  minLng: -119,
  maxLng: -34,
} as const;

export function randomLatLngLatam(): { lat: number; lng: number } {
  const { minLat, maxLat, minLng, maxLng } = LATAM_BOUNDS;
  return {
    lat: minLat + Math.random() * (maxLat - minLat),
    lng: minLng + Math.random() * (maxLng - minLng),
  };
}

/** Coordenadas normalizadas 0–1 (x este, y norte visual arriba). */
export function projectUnit(lat: number, lng: number): { ux: number; uy: number } {
  const { minLat, maxLat, minLng, maxLng } = LATAM_BOUNDS;
  const ux = (lng - minLng) / (maxLng - minLng);
  const uy = 1 - (lat - minLat) / (maxLat - minLat);
  return {
    ux: Math.min(1, Math.max(0, ux)),
    uy: Math.min(1, Math.max(0, uy)),
  };
}

export function unitToCanvas(
  ux: number,
  uy: number,
  w: number,
  h: number,
  pad: number,
): { x: number; y: number } {
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  return {
    x: pad + ux * innerW,
    y: pad + uy * innerH,
  };
}
