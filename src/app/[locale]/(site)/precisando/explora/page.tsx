import type { Metadata } from "next";
import Link from "next/link";
import { articlesSortedByDate } from "@/data/articles";
import { SITE } from "@/lib/site";
import styles from "./ExploraPage.module.css";

export const metadata: Metadata = {
  title: "Explora · Precisando · Precisar",
  description:
    "Todos los textos de Precisando: análisis, informes y educación mediática. El nuevo recorrido editorial de Precisar.",
  alternates: { canonical: `${SITE.url}/precisando/explora` },
};

export default function PrecisandoExploraPage() {
  const posts = articlesSortedByDate();

  return (
    <article className={styles.root}>
      <div className="prec-container">
        <header className={styles.intro}>
          <p className={styles.kicker}>Precisando · Índice</p>
          <h1 className={styles.title}>Explora</h1>
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
          También puedes filtrar por categoría o ver la paginación desde la{" "}
          <Link href="/precisando/pagina/2">vista por páginas</Link> (p. ej. página 2 en adelante) o{" "}
          <Link href="/precisando/categoria/informes">una categoría</Link>.
        </p>
      </div>
    </article>
  );
}
