"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type MutableRefObject,
  type RefObject,
} from "react";
import { LenisContext } from "@/components/SmoothScrollProvider";
import { CINEMATIC_PANELS } from "./panels.data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type CinematicDeckController = {
  containerRef: RefObject<HTMLDivElement | null>;
  progressRef: MutableRefObject<number>;
  webglOn: boolean;
  reduceMotion: boolean;
  uiIndex: number;
  goToIndex: (i: number) => void;
};

export function useCinematicDeck(): CinematicDeckController {
  const lenis = useContext(LenisContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const animatingRef = useRef(false);
  const progressRef = useRef(0);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const transitionToRef = useRef<(target: number) => void>(() => {});
  const [uiIndex, setUiIndex] = useState(0);
  const [webglOn, setWebglOn] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const panelCount = CINEMATIC_PANELS.length;

  useLayoutEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    setWebglOn(!mq.matches);
    const onChange = () => {
      setReduceMotion(mq.matches);
      setWebglOn(!mq.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    lenis?.stop();
    return () => {
      lenis?.start();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    };
  }, [lenis]);

  useLayoutEffect(() => {
    const maxIdx = panelCount - 1;
    progressRef.current = maxIdx > 0 ? indexRef.current / maxIdx : 0;
  }, [uiIndex, panelCount]);

  useLayoutEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = gsap.utils.toArray<HTMLElement>(
      root.querySelectorAll("[data-cinematic-panel]"),
    );
    sectionsRef.current = sections;
    const maxIdx = sections.length - 1;

    const transitionTo = (target: number) => {
      if (animatingRef.current) return;
      if (target < 0 || target > maxIdx) return;
      const cur = indexRef.current;
      if (target === cur) return;

      const direction: 1 | -1 = target > cur ? 1 : -1;
      animatingRef.current = true;
      const currentEl = sections[cur];
      const nextEl = sections[target];

      const tl = gsap.timeline({
        defaults: { duration: 1.05, ease: "power4.inOut" },
        onComplete: () => {
          animatingRef.current = false;
          indexRef.current = target;
          setUiIndex(target);
          progressRef.current = maxIdx > 0 ? target / maxIdx : 0;
        },
      });

      tl.to(
        currentEl,
        { opacity: 0, yPercent: -100 * direction, scale: 0.9 },
        0,
      ).fromTo(
        nextEl,
        { opacity: 0, yPercent: 100 * direction, scale: 1.05 },
        { opacity: 1, yPercent: 0, scale: 1 },
        0,
      );

      const inner = nextEl.querySelectorAll("[data-cinematic-animate]");
      if (inner.length) {
        tl.from(
          inner,
          { y: 36, opacity: 0, stagger: 0.12, duration: 0.75, ease: "power2.out" },
          "-=0.55",
        );
      }
    };

    transitionToRef.current = transitionTo;

    if (reduced) {
      sections.forEach((el, i) => {
        gsap.set(el, { opacity: i === 0 ? 1 : 0, yPercent: 0, scale: 1 });
      });
      indexRef.current = 0;
      setUiIndex(0);
      return;
    }

    gsap.set(sections, { opacity: 0, yPercent: 100, scale: 1 });
    gsap.set(sections[0], { opacity: 1, yPercent: 0 });
    indexRef.current = 0;
    setUiIndex(0);

    const wheelThreshold = 16;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (animatingRef.current) return;
      if (e.deltaY > wheelThreshold) transitionToRef.current(indexRef.current + 1);
      else if (e.deltaY < -wheelThreshold) transitionToRef.current(indexRef.current - 1);
    };

    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (animatingRef.current) return;
      const y = e.changedTouches[0].clientY;
      const dy = touchStartY - y;
      if (dy > 56) transitionToRef.current(indexRef.current + 1);
      else if (dy < -56) transitionToRef.current(indexRef.current - 1);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, [panelCount]);

  useLayoutEffect(() => {
    if (!reduceMotion) return;
    const sections = sectionsRef.current;
    if (!sections.length) return;
    sections.forEach((el, i) => {
      gsap.set(el, { opacity: i === uiIndex ? 1 : 0, yPercent: 0, scale: 1 });
    });
    indexRef.current = uiIndex;
    const maxIdx = panelCount - 1;
    progressRef.current = maxIdx > 0 ? uiIndex / maxIdx : 0;
  }, [reduceMotion, uiIndex, panelCount]);

  const goToIndex = (i: number) => {
    if (reduceMotion) {
      setUiIndex(i);
      return;
    }
    transitionToRef.current(i);
  };

  return {
    containerRef,
    progressRef,
    webglOn,
    reduceMotion,
    uiIndex,
    goToIndex,
  };
}
