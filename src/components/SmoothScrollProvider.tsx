"use client";
import { createContext, useLayoutEffect, useState, type ReactNode } from "react";
import type Lenis from "lenis";
import styles from "./SmoothScrollProvider.module.css";

export const LenisContext = createContext<Lenis | null>(null);

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useLayoutEffect(() => {
    let cancelled = false;
    let lenisInstance: Lenis | null = null;

    async function init() {
      try {
        const [{ default: gsap }, { ScrollTrigger }, { default: LenisClass }] =
          await Promise.all([
            import("gsap"),
            import("gsap/ScrollTrigger"),
            import("lenis"),
          ]);

        if (cancelled) return;

        await import("lenis/dist/lenis.css");

        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);

        lenisInstance = new LenisClass({
          lerp: 0.072,
          wheelMultiplier: 1.12,
          orientation: "vertical",
          smoothWheel: true,
          autoRaf: true,
        });

        if (cancelled) {
          lenisInstance.destroy();
          lenisInstance = null;
          return;
        }

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
        if (cancelled) {
          lenisInstance.destroy();
          lenisInstance = null;
          return;
        }
        queueMicrotask(() => setLenis(lenisInstance));
      } catch {
        queueMicrotask(() => setLenis(null));
      }
    }

    void init();

    return () => {
      cancelled = true;
      if (!lenisInstance) return;
      const inst = lenisInstance;
      lenisInstance = null;
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.scrollerProxy(document.documentElement, {});
        inst.destroy();
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
