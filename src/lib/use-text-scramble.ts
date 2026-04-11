"use client";

import { useEffect, useRef, useState } from "react";

const CHARSET = "!<>-_\\/[]{}—=+*^?#________";

/** Escapado para fragmentos HTML generados por el scramble (reutilizable en el cliente). */
export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

type QueueItem = { from: string; to: string; start: number; end: number; char?: string };

export type TextScrambleOptions = {
  enabled?: boolean;
  /** `intro`: pausa + desde vacío (hero). `swap`: de texto anterior al nuevo (verbos). */
  variant?: "intro" | "swap";
  onSettle?: () => void;
  /** Si cambia (p. ej. locale), el swap reinicia desde vacío. */
  swapResetKey?: string;
  /** `swap`: menos frames por carácter (p. ej. hero con pausa corta tras el texto final). */
  swapQuick?: boolean;
};

/**
 * Efecto “Text Scramble” (Justin Windle / variante clásica).
 * Devuelve HTML seguro para el título animado; al terminar, texto final escapado.
 */
export function useTextScramble(
  finalText: string,
  respectReducedMotion: boolean,
  dudClassName: string,
  options: TextScrambleOptions = {},
) {
  const { enabled = true, variant = "intro", swapResetKey, swapQuick = false } = options;
  const onSettleRef = useRef(options.onSettle);
  onSettleRef.current = options.onSettle;

  const [html, setHtml] = useState("");
  const prevSwapRef = useRef("");
  const prevResetKeyRef = useRef(swapResetKey);

  useEffect(() => {
    if (!enabled) return;

    const fireSettle = () => {
      onSettleRef.current?.();
    };

    if (respectReducedMotion) {
      setHtml(escapeHtml(finalText));
      fireSettle();
      return;
    }

    let cancelled = false;
    let raf = 0;
    let frame = 0;
    let queue: QueueItem[] = [];
    let resolveAnim: (() => void) | undefined;

    const randomChar = () => CHARSET[Math.floor(Math.random() * CHARSET.length)]!;

    function tick() {
      if (cancelled) return;
      let output = "";
      let complete = 0;
      for (const item of queue) {
        let char = item.char;
        if (frame >= item.end) {
          complete++;
          output += escapeHtml(item.to);
        } else if (frame >= item.start) {
          if (!char || Math.random() < 0.28) {
            char = randomChar();
            item.char = char;
          }
          output += `<span class="${dudClassName}">${escapeHtml(char)}</span>`;
        } else {
          output += escapeHtml(item.from);
        }
      }
      setHtml(output);
      if (complete === queue.length) {
        resolveAnim?.();
        resolveAnim = undefined;
      } else {
        raf = requestAnimationFrame(tick);
        frame++;
      }
    }

    function startAnim(newText: string, oldText: string): Promise<void> {
      const len = Math.max(oldText.length, newText.length);
      const startMax = swapQuick ? 10 : 40;
      const spanMax = swapQuick ? 14 : 40;
      queue = [];
      for (let i = 0; i < len; i++) {
        const from = oldText[i] ?? "";
        const to = newText[i] ?? "";
        const start = Math.floor(Math.random() * startMax);
        const end = start + Math.floor(Math.random() * spanMax);
        queue.push({ from, to, start, end });
      }
      frame = 0;
      cancelAnimationFrame(raf);
      return new Promise((res) => {
        resolveAnim = res;
        tick();
      });
    }

    if (variant === "swap") {
      if (swapResetKey !== undefined && swapResetKey !== prevResetKeyRef.current) {
        prevSwapRef.current = "";
        prevResetKeyRef.current = swapResetKey;
      }
      const from = prevSwapRef.current;
      (async () => {
        await startAnim(finalText, from);
        if (!cancelled) {
          prevSwapRef.current = finalText;
          fireSettle();
        }
      })().catch(() => {});
    } else {
      (async () => {
        await startAnim("", "");
        await sleep(800);
        if (!cancelled) {
          await startAnim(finalText, "");
          if (!cancelled) fireSettle();
        }
      })().catch(() => {});
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [finalText, respectReducedMotion, dudClassName, enabled, variant, swapResetKey, swapQuick]);

  return html;
}
