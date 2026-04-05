import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SaberesResource } from "@/data/saberes-resources";
import styles from "./SaberesMaterialGrid.module.css";

/** Tonos de portada (sin imagen): contraste claro sobre degradados oscuros. */
const POSTER_PALETTE = [
  { mid: "#5c6cfa", deep: "#1e2a6e", fg: "#f4f6ff" },
  { mid: "#e85d4c", deep: "#6b1f18", fg: "#fff5f3" },
  { mid: "#2dd4bf", deep: "#0f4a42", fg: "#ecfffc" },
  { mid: "#c084fc", deep: "#4a1d6e", fg: "#faf5ff" },
  { mid: "#fbbf24", deep: "#713f12", fg: "#fffbeb" },
  { mid: "#38bdf8", deep: "#0c4a6e", fg: "#f0f9ff" },
  { mid: "#a3e635", deep: "#365314", fg: "#f7fee7" },
] as const;

export function SaberesMaterialGrid({ items }: { items: SaberesResource[] }) {
  return (
    <div className={styles.grid}>
      {items.map((item, index) => {
        const n = String(index + 1).padStart(2, "0");
        const tone = POSTER_PALETTE[index % POSTER_PALETTE.length];
        const posterStyle = {
          "--poster-mid": tone.mid,
          "--poster-deep": tone.deep,
          "--poster-fg": tone.fg,
        } as CSSProperties;

        return (
          <article key={item.href} className={styles.card}>
            <div
              className={`${styles.poster} ${item.coverImage ? styles.posterHasCover : ""}`}
              style={posterStyle}
              aria-hidden
            >
              <div className={styles.posterGrain} aria-hidden />
              {item.coverImage ? (
                <Image
                  src={item.coverImage}
                  alt=""
                  fill
                  className={styles.coverImg}
                  sizes="(max-width: 640px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
              ) : null}
              <div className={styles.posterTop}>
                <span className={styles.index}>{n}</span>
                <span className={styles.badge}>PDF</span>
              </div>
              <p className={styles.posterTitle}>{item.title}</p>
            </div>
            <div className={styles.body}>
              <h2 className={styles.titleRepeat}>{item.title}</h2>
              {item.body ? (
                <p className={styles.excerpt}>{item.body}</p>
              ) : (
                <p className={styles.excerptPlaceholder}>Descripción en el documento.</p>
              )}
              <div className={styles.actions}>
                {item.experienceHref ? (
                  <Link href={item.experienceHref} className={styles.btnSecondary}>
                    {item.experienceLabel ?? "Ver en el sitio"}
                  </Link>
                ) : null}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.btnPrimary}
                >
                  {item.label}
                </a>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
