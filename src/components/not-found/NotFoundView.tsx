import { Link } from "@/i18n/navigation";
import styles from "./NotFoundView.module.css";

type NotFoundViewProps = {
  label: string;
  title: string;
  body: string;
  cta: string;
};

export function NotFoundView({ label, title, body, cta }: NotFoundViewProps) {
  return (
    <section className={styles.page} aria-labelledby="not-found-title">
      <p className={styles.label}>{label}</p>
      <h1 id="not-found-title" className={styles.title}>
        {title}
      </h1>
      <p className={styles.body}>{body}</p>
      <Link href="/" className={styles.cta}>
        {cta}
      </Link>
    </section>
  );
}
