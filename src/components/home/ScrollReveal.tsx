"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Children,
  isValidElement,
  useLayoutEffect,
  useRef,
  type ReactNode,
} from "react";
import styles from "./ScrollReveal.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type ScrollRevealProps = {
  children: ReactNode;
  delay?: number;
  /** Si es true, cada hijo directo recibe animación con stagger. */
  stagger?: boolean;
  className?: string;
};

function reducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function ScrollReveal({
  children,
  delay = 0,
  stagger = false,
  className,
}: ScrollRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (reducedMotion()) {
      const nodes = stagger
        ? root.querySelectorAll<HTMLElement>("[data-scroll-reveal]")
        : [root];
      nodes.forEach((el) => {
        gsap.set(el, { opacity: 1, y: 0 });
      });
      return;
    }

    const ctx = gsap.context(() => {
      if (stagger) {
        const targets = root.querySelectorAll<HTMLElement>("[data-scroll-reveal]");
        gsap.fromTo(
          targets,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            delay,
            stagger: 0.08,
            scrollTrigger: {
              trigger: root,
              scroller: document.documentElement,
              start: "top 88%",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
      } else {
        gsap.fromTo(
          root,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power2.out",
            delay,
            scrollTrigger: {
              trigger: root,
              scroller: document.documentElement,
              start: "top 88%",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
      }
    }, root);

    return () => {
      ctx.revert();
    };
  }, [children, delay, stagger]);

  const rootClass = [styles.root, className].filter(Boolean).join(" ");

  if (stagger) {
    const wrapped = Children.toArray(children).map((child, index) => {
      const k = isValidElement(child) && child.key != null ? String(child.key) : `sr-${index}`;
      return (
        <div key={k} data-scroll-reveal className={styles.child}>
          {child}
        </div>
      );
    });

    return (
      <div ref={rootRef} className={rootClass}>
        {wrapped}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={rootClass}>
      {children}
    </div>
  );
}
