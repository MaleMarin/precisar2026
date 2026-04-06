"use client";

import { ARTICLES } from "@/data/articles";
import { MotionStackPanels } from "@/components/motion/MotionStackPanels";

const STACK_FORM_CATEGORIES = [
  "Programas territoriales / ciudades",
  "Formación docente",
  "Hub y cultura digital",
  "Cursos abiertos",
  "Consulta o alianza",
  "Prensa / medios",
];

/**
 * Paneles full-viewport que se van apilando al hacer scroll (sesiones tipo “archivos”).
 */
export function PrecisarHomeStackPanelsSection({ reduceMotion = false }: { reduceMotion?: boolean }) {
  const featured = ARTICLES.slice(0, 4).map((a) => ({
    slug: a.slug,
    title: a.title,
    category: a.category,
  }));

  return (
    <section id="home-stack-panels" aria-label="Recorrido por secciones del sitio">
      <MotionStackPanels
        featuredArticles={featured}
        formCategories={STACK_FORM_CATEGORIES}
        omitFooter
        reduceMotion={reduceMotion}
      />
    </section>
  );
}
