"use client";

import gsap from "gsap";
import { useCallback, useRef } from "react";
import styles from "./MotionFaq.module.css";

export type MotionFaqItem = { question: string; answer: string };

export function MotionFaq({ items }: { items: MotionFaqItem[] }) {
  return (
    <div className={styles.list}>
      {items.map((item) => (
        <FaqRow key={item.question} item={item} />
      ))}
    </div>
  );
}

function FaqRow({ item }: { item: MotionFaqItem }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const lastOpenHeight = useRef(0);

  const onToggle = useCallback(() => {
    const panel = panelRef.current;
    const det = detailsRef.current;
    if (!panel || !det) return;

    if (det.open) {
      gsap.set(panel, { height: 0 });
      gsap.to(panel, {
        height: "auto",
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => {
          lastOpenHeight.current = panel.scrollHeight;
        },
      });
    } else {
      const h = lastOpenHeight.current || Math.max(panel.scrollHeight, 48);
      gsap.fromTo(
        panel,
        { height: h },
        {
          height: 0,
          duration: 0.32,
          ease: "power2.in",
        },
      );
    }
  }, []);

  return (
    <details ref={detailsRef} className={styles.item} onToggle={onToggle}>
      <summary className={styles.summary}>{item.question}</summary>
      <div ref={panelRef} className={styles.panel}>
        <p className={styles.answer}>{item.answer}</p>
      </div>
    </details>
  );
}
