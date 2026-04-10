import type { Metadata } from "next";
import Link from "next/link";
import { articlesSortedByDate } from "@/data/articles";
import styles from "./ExploraPage.module.css";

export const metadata: Metadata = {
  title: "Explora · Precisar",
  description:
    "Todos los textos de Precisando: análisis, informes y educación mediática. El nuevo recorrido editorial de Precisar.",
};

export default function ExploraPage() {
  const posts = articlesSortedByDate();

  return (
    <article className={styles.root}>
      <div className="prec-container">
        <header className={styles.intro}>
          <p className={styles.kicker}>Sitio nuevo · Editorial</p>
          <h1 className={styles.title}>Explora</h1>
          <p className={styles.lede}>
            La información está por todas partes. Aquí reunimos los artículos de{" "}
            <strong className="font-medium text-[var(--fg)]">Precisando</strong>: abre cada tarjeta para
            leer el texto en esta versión del sitio.
          </p>
        </header>

        <ul className={styles.grid}>
          {posts.map((a) => (
            <li key={a.slug}>
              <Link href={`/precisando/${encodeURI(a.slug)}`} className={styles.card}>
                <div className={styles.cardMeta}>
                  <span className={styles.cardCat}>{a.category}</span>
                  <time className={styles.cardDate} dateTime={a.pubDate}>
                    {a.pubDate}
                  </time>
                </div>
                <h2 className={styles.cardTitle}>{a.title}</h2>
                <p className={styles.cardExcerpt}>{a.excerpt}</p>
                <span className={styles.cardCta}>Leer artículo →</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className={styles.footerNote}>
          También puedes filtrar por categoría en la{" "}
          <Link href="/precisando">vista clásica de Precisando</Link>.
        </p>
      </div>
    </article>
  );
}
