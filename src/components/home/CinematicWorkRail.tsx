import Link from "next/link";
import styles from "./CinematicWorkRail.module.css";

export type CinematicWorkItem = {
  id: string;
  title: string;
  tags: string[];
  href: string;
};

export type CinematicWorkRailProps = {
  items: CinematicWorkItem[];
};

export function CinematicWorkRail({ items }: CinematicWorkRailProps) {
  return (
    <ul className={styles.list}>
      {items.map((item, i) => (
        <li key={item.id} className={styles.row}>
          <Link href={item.href} className={styles.link}>
            <span className={styles.index}>{String(i + 1).padStart(2, "0")}</span>
            <div className={styles.titleBlock}>
              <p className={styles.title}>{item.title}</p>
              <p className={styles.meta}>{item.tags.join(" · ")}</p>
            </div>
            <span className={styles.arrow} aria-hidden>
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
