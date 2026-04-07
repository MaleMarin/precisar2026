"use client";

import { articlesSortedByDate } from "@/data/articles";
import { MotionStackPanels } from "@/components/motion/MotionStackPanels";

/**
 * Paneles full-viewport que se van apilando al hacer scroll (sesiones tipo “archivos”).
 */
export function PrecisarHomeStackPanelsSection({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const featured = articlesSortedByDate().slice(0, 4).map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
  }));

  return (
    <section id="home-stack-panels" aria-label="Recorrido por secciones del sitio">
      <MotionStackPanels
        featuredArticles={featured}
        omitFooter
        reduceMotion={reduceMotion}
      />
    </section>
  );
}
