"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import {
  projectUnit,
  randomLatLngLatam,
  unitToCanvas,
} from "@/lib/consulta/liveMapProjection";
import styles from "./ConsultaLiveMap.module.css";

export type ConsultaLiveMapHandle = {
  burst: (count?: number) => void;
};

type InternalPoint = {
  lat: number;
  lng: number;
  born: number;
};

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

const PAD = 28;
const MAX_POINTS = 440;
const BUCKET = 48;
const MOCK_MS_MIN = 1000;
const MOCK_MS_MAX = 2200;

export const ConsultaLiveMapCanvas = forwardRef<ConsultaLiveMapHandle>(function ConsultaLiveMapCanvas(
  _props,
  ref,
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<InternalPoint[]>([]);
  const sizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef(0);
  const mockTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function trimPoints() {
    const pts = pointsRef.current;
    if (pts.length > MAX_POINTS) {
      pointsRef.current = pts.slice(-MAX_POINTS);
    }
  }

  const burst = (count = 10) => {
    const n = Math.min(Math.max(1, count), 28);
    const now = performance.now();
    for (let i = 0; i < n; i++) {
      const { lat, lng } = randomLatLngLatam();
      pointsRef.current.push({ lat, lng, born: now - i * 25 });
    }
    trimPoints();
  };

  useImperativeHandle(ref, () => ({ burst }));

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
    /* Segundo frame: tras layout/portal el clientWidth a veces sigue en 0 */
    requestAnimationFrame(() => {
      requestAnimationFrame(resize);
    });
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    window.addEventListener("resize", resize);

    const t0 = performance.now();
    for (let i = 0; i < 48; i++) {
      const { lat, lng } = randomLatLngLatam();
      pointsRef.current.push({ lat, lng, born: t0 - i * 90 });
    }
    trimPoints();

    const scheduleMock = () => {
      mockTimeoutRef.current = null;
      const ms = MOCK_MS_MIN + Math.random() * (MOCK_MS_MAX - MOCK_MS_MIN);
      mockTimeoutRef.current = setTimeout(() => {
        const { lat, lng } = randomLatLngLatam();
        pointsRef.current.push({ lat, lng, born: performance.now() });
        trimPoints();
        scheduleMock();
      }, ms);
    };
    scheduleMock();

    const drawFrame = (now: number) => {
      const { w, h } = sizeRef.current;
      if (w < 2 || h < 2) {
        rafRef.current = requestAnimationFrame(drawFrame);
        return;
      }

      ctx.fillStyle = "#03060f";
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.globalAlpha = 0.055;
      ctx.strokeStyle = "#4da3ff";
      ctx.lineWidth = 1;
      for (let i = 0; i < 6; i++) {
        const x = (i / 5) * w;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.quadraticCurveTo(x + 50 + i * 10, h * 0.52, x - 24, h);
        ctx.stroke();
      }
      ctx.restore();

      const pts = pointsRef.current.map((p) => {
        const { ux, uy } = projectUnit(p.lat, p.lng);
        const { x, y } = unitToCanvas(ux, uy, w, h, PAD);
        const age = now - p.born;
        const t = Math.min(1, age / 780);
        const ez = easeOutCubic(t);
        const r = 2 + ez * 6.5;
        const hue = 198 + ux * 132;
        return { x, y, r, age, hue, n: 1 };
      });

      const bucketMap = new Map<
        string,
        { sx: number; sy: number; n: number; minAge: number; hueSum: number }
      >();

      for (const p of pts) {
        const bx = Math.floor(p.x / BUCKET);
        const by = Math.floor(p.y / BUCKET);
        const key = `${bx},${by}`;
        const cur = bucketMap.get(key);
        if (!cur) {
          bucketMap.set(key, { sx: p.x, sy: p.y, n: 1, minAge: p.age, hueSum: p.hue });
        } else {
          cur.sx += p.x;
          cur.sy += p.y;
          cur.n += 1;
          cur.minAge = Math.min(cur.minAge, p.age);
          cur.hueSum += p.hue;
        }
      }

      for (const b of bucketMap.values()) {
        const cx = b.sx / b.n;
        const cy = b.sy / b.n;
        const age = b.minAge;
        const t = Math.min(1, age / 780);
        const ez = easeOutCubic(t);
        const avgHue = b.hueSum / b.n;
        const baseR = 2.5 + ez * 5.5;
        const clusterBoost = b.n > 1 ? Math.min(18, 3.5 + Math.sqrt(b.n) * 2.4) : 0;
        const r = baseR + clusterBoost;

        const alphaGlow = 0.2 + ez * 0.38;
        const alphaCore = 0.42 + ez * 0.48;

        ctx.save();
        ctx.shadowBlur = 16 + clusterBoost * 1.15;
        ctx.shadowColor = `hsla(${avgHue}, 82%, 55%, ${0.32 + ez * 0.38})`;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 2.35);
        grad.addColorStop(0, `hsla(${avgHue}, 92%, 70%, ${alphaCore})`);
        grad.addColorStop(0.42, `hsla(${avgHue}, 78%, 48%, ${alphaGlow})`);
        grad.addColorStop(1, `hsla(${avgHue}, 65%, 38%, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, r * 2.35, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (b.n >= 5) {
          ctx.save();
          const fs = Math.min(12, 7 + b.n * 0.32);
          ctx.font = `600 ${fs}px system-ui, sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = `rgba(230, 245, 255, ${0.5 + ez * 0.4})`;
          ctx.fillText(String(b.n), cx, cy + 0.5);
          ctx.restore();
        }
      }

      rafRef.current = requestAnimationFrame(drawFrame);
    };

    rafRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (mockTimeoutRef.current) clearTimeout(mockTimeoutRef.current);
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={styles.layer} aria-hidden>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.gradient} />
      <div className={styles.vignette} />
    </div>
  );
});
