"use client";

import { createContext, useLayoutEffect, useState, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import styles from "./SmoothScrollProvider.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const LenisContext = createContext<Lenis | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useLayoutEffect(() => {
    /**
     * Scroll más suave en home / sitio:
     * - `lerp` bajo (~0.07): inercia más fluida (valores altos se sienten “secos” o duros).
     * - `wheelMultiplier` > 1: menos esfuerzo por tick de rueda, menos sensación de frenado.
     * - `autoRaf: true`: RAF del navegador (sin ticker GSAP dedicado a Lenis).
     */
    const lenis = new Lenis({
      lerp: 0.072,
      wheelMultiplier: 1.12,
      orientation: "vertical",
      smoothWheel: true,
      autoRaf: true,
    });

    const scroller = document.documentElement;
    ScrollTrigger.scrollerProxy(scroller, {
      scrollTop(value) {
        if (arguments.length && typeof value === "number" && Number.isFinite(value)) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    lenis.on("scroll", ScrollTrigger.update);

    /* Default de GSAP: suaviza picos cuando el frame rate cae (lagSmoothing(0) lo desactivaba y endurecía todo). */
    gsap.ticker.lagSmoothing(500, 33);

    queueMicrotask(() => {
      setLenis(lenis);
    });

    return () => {
      ScrollTrigger.scrollerProxy(scroller, {});
      lenis.destroy();
      queueMicrotask(() => {
        setLenis(null);
      });
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <div className={styles.flexFill}>{children}</div>
    </LenisContext.Provider>
  );
}
