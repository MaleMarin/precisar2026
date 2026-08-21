"use client";

import { articlesSortedByDate } from "@/data/articles";
import { MotionStackPanels } from "@/components/motion/MotionStackPanels";
import { RecorridoList } from "./PrecisarHomeMarquee";

/**
 * Paneles full-viewport que se van apilando al hacer scroll (sesiones tipo “archivos”).
 * El primer panel es `#recorrido` (misma plantilla que Programas); el resto arranca en Programas.
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
        introPanel={<RecorridoList />}
      />
    </section>
  );
}
