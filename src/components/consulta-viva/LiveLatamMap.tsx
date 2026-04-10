"use client";

import { useCallback, useEffect, useRef } from "react";
import { countryByIso, projectUnit, unitToCanvas } from "@/lib/consulta-viva/countries";
import type { CountrySignal } from "@/lib/consulta-viva/types";
import styles from "./LiveLatamMap.module.css";

const PAD = 44;

/** Océano / tierra / nodos: paleta consulta (soft gray, carbón, royal purple, mint). */
const OCEAN = "#ebebed";
const LAND_FILL = "#4a4658";
const LAND_STROKE = "rgba(96, 69, 244, 0.22)";
const NODE_FILL = "#6045f4";
const NODE_EMPTY = "rgba(96, 69, 244, 0.38)";
const ACCENT = { r: 83, g: 230, b: 212 };
const LABEL_ON_NODE = "rgba(255,255,255,0.95)";
const LABEL_EMPTY = "rgba(255,255,255,0.78)";

/**
 * Silueta esquemática en coordenadas normalizadas (misma proyección que los países).
 */
const LAND_RING: [number, number][] = [
  [0.06, 0.28],
  [0.18, 0.11],
  [0.36, 0.13],
  [0.46, 0.22],
  [0.54, 0.2],
  [0.66, 0.18],
  [0.82, 0.22],
  [0.93, 0.36],
  [0.9, 0.55],
  [0.78, 0.72],
  [0.55, 0.82],
  [0.38, 0.74],
  [0.22, 0.52],
  [0.1, 0.38],
];

export type ConsultaVivaLayerMode = "resultados" | "region" | "cruce";

type Props = {
  signals: CountrySignal[];
  selectedIso: string | null;
  hoveredIso: string | null;
  activeCountryName: string | null;
  layerMode: ConsultaVivaLayerMode;
  crossPair: { fromIso: string; toIso: string } | null;
  onHover: (iso: string | null) => void;
  onSelect: (iso: string | null) => void;
};

type NodeLayout = { iso: string; x: number; y: number; r: number };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function drawLandmass(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  pad: number,
) {
  ctx.beginPath();
  for (let i = 0; i < LAND_RING.length; i++) {
    const [ux, uy] = LAND_RING[i]!;
    const { x, y } = unitToCanvas(ux, uy, w, h, pad);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = LAND_FILL;
  ctx.fill();
  ctx.strokeStyle = LAND_STROKE;
  ctx.lineWidth = 1.25;
  ctx.stroke();
}

function nodeCenter(
  iso: string,
  w: number,
  h: number,
  pad: number,
): { x: number; y: number } | null {
  const meta = countryByIso.get(iso);
  if (!meta) return null;
  const { ux, uy } = projectUnit(meta.lat, meta.lng);
  return unitToCanvas(ux, uy, w, h, pad);
}

/** Punto de lectura fijo dentro del mapa (no “sumidero” de red). */
function readingHub(w: number, h: number, pad: number) {
  return { x: w * 0.5, y: clamp(h * 0.58, pad + 40, h - pad - 24) };
}

function drawSingleCurve(
  ctx: CanvasRenderingContext2D,
  x0: number,
  y0: number,
  x1: number,
  y1: number,
) {
  const mx = (x0 + x1) * 0.5;
  const my = Math.min(y0, y1) - Math.abs(x1 - x0) * 0.12 - 18;
  ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.85)`;
  ctx.lineWidth = 2.25;
  ctx.lineCap = "round";
  ctx.setLineDash([]);
  ctx.beginPath();
  ctx.moveTo(x0, y0);
  ctx.quadraticCurveTo(mx, my, x1, y1);
  ctx.stroke();
}

export function LiveLatamMap({
  signals,
  selectedIso,
  hoveredIso,
  activeCountryName,
  layerMode,
  crossPair,
  onHover,
  onSelect,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const layoutRef = useRef<NodeLayout[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef(0);
  const signalsRef = useRef(signals);
  const selectedRef = useRef(selectedIso);
  const hoveredRef = useRef(hoveredIso);
  const layerModeRef = useRef(layerMode);
  const crossPairRef = useRef(crossPair);

  useEffect(() => {
    signalsRef.current = signals;
  }, [signals]);
  useEffect(() => {
    selectedRef.current = selectedIso;
  }, [selectedIso]);
  useEffect(() => {
    hoveredRef.current = hoveredIso;
  }, [hoveredIso]);
  useEffect(() => {
    layerModeRef.current = layerMode;
  }, [layerMode]);
  useEffect(() => {
    crossPairRef.current = crossPair;
  }, [crossPair]);

  const pickIso = useCallback((cx: number, cy: number): string | null => {
    const nodes = layoutRef.current;
    for (let i = nodes.length - 1; i >= 0; i--) {
      const n = nodes[i]!;
      const dx = cx - n.x;
      const dy = cy - n.y;
      const hitR = Math.max(n.r, 10);
      if (dx * dx + dy * dy <= hitR * hitR) return n.iso;
    }
    return null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      sizeRef.current = { w, h };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    requestAnimationFrame(() => requestAnimationFrame(resize));
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      onHover(pickIso(e.clientX - rect.left, e.clientY - rect.top));
    };
    const onLeave = () => onHover(null);
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      onSelect(pickIso(e.clientX - rect.left, e.clientY - rect.top));
    };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("click", onClick);

    const touchXY = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (!touch) return { x: 0, y: 0 };
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    };
    const onTouchStart = (e: TouchEvent) => {
      const { x, y } = touchXY(e);
      const iso = pickIso(x, y);
      if (iso) {
        e.preventDefault();
        onSelect(iso);
        onHover(iso);
      }
    };
    const onTouchEnd = () => onHover(null);
    canvas.addEventListener("touchstart", onTouchStart, { passive: false });
    canvas.addEventListener("touchend", onTouchEnd);

    const draw = () => {
      const { w, h } = sizeRef.current;
      const sigs = signalsRef.current;
      const sel = selectedRef.current;
      const hov = hoveredRef.current;
      const mode = layerModeRef.current;
      const pair = crossPairRef.current;

      if (w < 4 || h < 4) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.fillStyle = OCEAN;
      ctx.fillRect(0, 0, w, h);

      drawLandmass(ctx, w, h, PAD);

      if (mode === "region" && sel) {
        const from = nodeCenter(sel, w, h, PAD);
        const hub = readingHub(w, h, PAD);
        if (from) drawSingleCurve(ctx, from.x, from.y, hub.x, hub.y);
      } else if (mode === "cruce" && pair) {
        const a = nodeCenter(pair.fromIso, w, h, PAD);
        const b = nodeCenter(pair.toIso, w, h, PAD);
        if (a && b) drawSingleCurve(ctx, a.x, a.y, b.x, b.y);
      }

      const maxTotal = Math.max(...sigs.map((s) => s.responsesTotal), 1);
      const nodes: NodeLayout[] = [];
      for (const s of sigs) {
        const meta = countryByIso.get(s.iso);
        if (!meta) continue;
        const { ux, uy } = projectUnit(meta.lat, meta.lng);
        const { x: cx, y: cy } = unitToCanvas(ux, uy, w, h, PAD);
        const base =
          s.responsesTotal > 0
            ? Math.max(6, 7 + 20 * Math.sqrt(s.responsesTotal / maxTotal))
            : 4.5;
        const r = sel === s.iso ? base * 1.14 : base;
        nodes.push({ iso: s.iso, x: cx, y: cy, r });
      }
      layoutRef.current = nodes;

      for (const s of sigs) {
        const meta = countryByIso.get(s.iso);
        if (!meta) continue;
        const { ux, uy } = projectUnit(meta.lat, meta.lng);
        const { x: cx, y: cy } = unitToCanvas(ux, uy, w, h, PAD);
        const base =
          s.responsesTotal > 0
            ? Math.max(6, 7 + 20 * Math.sqrt(s.responsesTotal / maxTotal))
            : 4.5;
        const r = sel === s.iso ? base * 1.14 : base;
        const isSel = sel === s.iso;
        const isHov = hov === s.iso;
        const pulse = s.pulseIntensity;

        if (pulse > 0.05) {
          ctx.save();
          ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},${0.12 + pulse * 0.22})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(cx, cy, r + 4 + pulse * 5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        if (isSel) {
          ctx.save();
          ctx.strokeStyle = `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.95)`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cx, cy, r + 3.5, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fillStyle = s.responsesTotal > 0 ? NODE_FILL : NODE_EMPTY;
        ctx.fill();
        ctx.strokeStyle = isSel
          ? `rgba(${ACCENT.r},${ACCENT.g},${ACCENT.b},0.9)`
          : isHov
            ? "rgba(255,255,255,0.75)"
            : "rgba(255,255,255,0.35)";
        ctx.lineWidth = isSel ? 2.2 : 1.1;
        ctx.stroke();

        ctx.fillStyle = s.responsesTotal > 0 ? LABEL_ON_NODE : LABEL_EMPTY;
        ctx.font = `${Math.max(7, Math.min(10, r * 0.38))}px var(--font-mono-family), ui-monospace, monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.iso, cx, cy);
      }

      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchend", onTouchEnd);
    };
  }, [onHover, onSelect, pickIso]);

  return (
    <div className={styles.stage}>
      <canvas ref={canvasRef} className={styles.canvas} aria-label="Mapa de América Latina y el Caribe" />
      {activeCountryName ? (
        <div className={styles.activeLabel}>
          <span className={styles.activeLabelMuted}>País activo</span>
          <span className={styles.activeLabelName}>{activeCountryName}</span>
        </div>
      ) : null}
    </div>
  );
}
