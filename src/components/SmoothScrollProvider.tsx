"use client";

import { createContext, useLayoutEffect, useState, type ReactNode } from "react";
import type Lenis from "lenis";
import styles from "./SmoothScrollProvider.module.css";

export const LenisContext = createContext<Lenis | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useLayoutEffect(() => {
    let lenisInstance: Lenis | null = null;

    async function init() {
      const [{ default: gsap }, { ScrollTrigger }, { default: LenisClass }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("lenis"),
        ]);

      await import("lenis/dist/lenis.css");

      gsap.registerPlugin(ScrollTrigger);

      lenisInstance = new LenisClass({
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
            lenisInstance!.scrollTo(value, { immediate: true });
          }
          return lenisInstance!.scroll;
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

      lenisInstance.on("scroll", ScrollTrigger.update);
      gsap.ticker.lagSmoothing(500, 33);

      queueMicrotask(() => setLenis(lenisInstance));
    }

    init();

    return () => {
      if (!lenisInstance) return;
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.scrollerProxy(document.documentElement, {});
        lenisInstance!.destroy();
        queueMicrotask(() => setLenis(null));
        ScrollTrigger.refresh();
      });
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <div className={styles.flexFill}>{children}</div>
    </LenisContext.Provider>
  );
}
