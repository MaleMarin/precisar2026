"use client";

import Link from "next/link";
import type { ArticleMeta } from "@/data/articles";
import styles from "./MotionHomeRails.module.css";
import { TiltCard } from "./TiltCard";

const TESTIMONIALS = [
  {
    quote:
      "El programa nos dio un lenguaje común para trabajar educación mediática con las familias y con el municipio.",
    author: "Coordinación pedagógica",
    meta: "Red de establecimientos",
  },
  {
    quote:
      "Por fin pudimos ordenar la conversación sobre desinformación sin culpar solo a las redes: hay método y acompañamiento.",
    author: "Equipo de desarrollo comunitario",
    meta: "Territorio urbano",
  },
  {
    quote:
      "Los docentes salieron con herramientas concretas para el aula, no solo teoría. Se nota en las planificaciones.",
    author: "Jefatura de UTP",
    meta: "Educación municipal",
  },
] as const;

function excerptShort(text: string, max = 140): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}…`;
}

export type MotionHomeRailsProps = {
  articles: ArticleMeta[];
};

export function MotionHomeRails({ articles }: MotionHomeRailsProps) {
  const picks = articles.slice(0, 6);

  return (
    <div className={styles.wrap}>
      <section className={styles.block} aria-labelledby="home-rails-voces">
        <div className={styles.blockHead}>
          <h2 id="home-rails-voces" className={styles.title}>
            Voces del territorio
          </h2>
          <p className={styles.hint}>Desplazamiento horizontal · testimonios breves</p>
        </div>
        <div className={styles.track} role="list">
          {TESTIMONIALS.map((t) => (
            <TiltCard key={t.quote.slice(0, 24)} className={styles.railTilt} asListItem>
              <article className={styles.cardQuote}>
                <p className={styles.quote}>&ldquo;{t.quote}&rdquo;</p>
                <footer className={styles.quoteFooter}>
                  <span className={styles.author}>{t.author}</span>
                  <span className={styles.meta}>{t.meta}</span>
                </footer>
              </article>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className={styles.blockAlt} aria-labelledby="home-rails-precisando">
        <div className={styles.blockHead}>
          <h2 id="home-rails-precisando" className={styles.title}>
            Último en Precisando
          </h2>
          <p className={styles.hint}>Publicaciones recientes · deslizá para ver más</p>
          <Link href="/precisando" className={styles.indexLink}>
            Ver archivo
          </Link>
        </div>
        <div className={styles.track} role="list">
          {picks.map((a) => (
            <TiltCard key={a.slug} className={styles.railTiltPost} asListItem>
              <Link href={`/precisando/${encodeURI(a.slug)}`} className={styles.cardPost}>
                <span className={styles.postKicker}>{a.category}</span>
                <h3 className={styles.postTitle}>{a.title}</h3>
                <p className={styles.postExcerpt}>{excerptShort(a.excerpt)}</p>
              </Link>
            </TiltCard>
          ))}
        </div>
      </section>
    </div>
  );
}
