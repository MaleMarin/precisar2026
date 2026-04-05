"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function numAttr(el: Element, name: string, fallback: number): number {
  const v = el.getAttribute(name);
  if (v == null || v === "") return fallback;
  const n = parseFloat(v);
  return Number.isFinite(n) ? n : fallback;
}

function prepareLineReveal(el: HTMLElement): HTMLElement[] {
  if (el.querySelector("[data-reveal-line]")) {
    return Array.from(el.querySelectorAll<HTMLElement>("[data-reveal-line]"));
  }

  const html = el.innerHTML.replace(/<br\s*\/?>/gi, "\n");
  const lines = html.split("\n").map((s) => s.trim()).filter(Boolean);
  if (lines.length === 0) return [];

  el.textContent = "";
  const inners: HTMLElement[] = [];

  for (const text of lines) {
    const outer = document.createElement("div");
    outer.style.overflow = "hidden";
    const inner = document.createElement("div");
    inner.setAttribute("data-reveal-line", "true");
    inner.textContent = text;
    outer.appendChild(inner);
    el.appendChild(outer);
    inners.push(inner);
  }

  return inners;
}

function ioFallbackReveal(el: HTMLElement): void {
  el.style.opacity = "0";
  const obs = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "none";
          obs.disconnect();
        }
      }
    },
    { rootMargin: "0px 0px -15% 0px", threshold: 0 },
  );
  obs.observe(el);
}

function childElements(container: HTMLElement): HTMLElement[] {
  return Array.from(container.children).filter((n): n is HTMLElement => n instanceof HTMLElement);
}

/** Lenis + ScrollTrigger: el scroller debe ser el mismo elemento del proxy (html). */
function scrollTriggerBase(scroller: HTMLElement) {
  return {
    scroller,
    start: "top 78%",
    toggleActions: "play none none none" as const,
    invalidateOnRefresh: true,
  };
}

function scheduleScrollTriggerRefresh(): void {
  const refresh = () => ScrollTrigger.refresh();
  requestAnimationFrame(refresh);
  requestAnimationFrame(() => requestAnimationFrame(refresh));
}

export function useRevealAnimations(routeKey: string): void {
  useLayoutEffect(() => {
    if (typeof window === "undefined" || prefersReducedMotion()) return;

    let ctx: gsap.Context | undefined;
    const scroller = document.documentElement;

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    try {
      ctx = gsap.context(() => {
        const stBase = scrollTriggerBase(scroller);

        document.querySelectorAll<HTMLElement>("[data-reveal-stagger-group]").forEach((container) => {
          const children = childElements(container);
          if (children.length === 0) return;

          const duration = numAttr(container, "data-reveal-duration", 0.95);
          const stagger = numAttr(container, "data-reveal-stagger", 0.11);
          const delay = numAttr(container, "data-reveal-delay", 0);
          const dist = numAttr(container, "data-reveal-distance", 3.6) * 10;

          gsap.set(children, { y: dist, opacity: 0, force3D: true });
          gsap.to(children, {
            y: 0,
            opacity: 1,
            duration,
            delay,
            stagger,
            ease: "power4.out",
            scrollTrigger: {
              trigger: container,
              ...stBase,
            },
          });
        });

        document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
          const type = el.getAttribute("data-reveal");
          if (!type) return;

          const duration = numAttr(el, "data-reveal-duration", 0.85);
          const delay = numAttr(el, "data-reveal-delay", 0);
          const stagger = numAttr(el, "data-reveal-stagger", 0.05);
          const useFade = el.hasAttribute("data-reveal-fade");
          const startOpacity = useFade || type === "title" || type === "lines" || type === "object" ? 0 : 1;

          if (type === "title") {
            gsap.from(el, {
              rotateX: -40,
              opacity: startOpacity,
              duration,
              delay,
              ease: "power4.out",
              transformPerspective: 1000,
              transformOrigin: "50% 100%",
              scrollTrigger: { trigger: el, ...stBase },
            });
            return;
          }

          if (type === "lines") {
            const targets = prepareLineReveal(el);
            if (targets.length === 0) return;
            gsap.set(targets, { y: "100%", opacity: 0 });
            gsap.to(targets, {
              y: "0%",
              opacity: 1,
              duration,
              delay,
              stagger,
              ease: "power4.out",
              scrollTrigger: { trigger: el, ...stBase },
            });
            return;
          }

          if (type === "border") {
            gsap.from(el, {
              scaleX: 0,
              opacity: 1,
              duration,
              delay,
              ease: "power4.out",
              transformOrigin: "left center",
              scrollTrigger: { trigger: el, ...stBase },
            });
            return;
          }

          if (type === "object") {
            const dist = numAttr(el, "data-reveal-distance", 2) * 10;
            gsap.from(el, {
              y: dist,
              opacity: startOpacity,
              duration,
              delay,
              ease: "power4.out",
              scrollTrigger: { trigger: el, ...stBase },
            });
          }
        });

        scheduleScrollTriggerRefresh();
      });
    } catch {
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach(ioFallbackReveal);
    }

    return () => {
      window.removeEventListener("load", onLoad);
      ctx?.revert();
    };
  }, [routeKey]);
}
