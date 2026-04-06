import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { Link } from "@/i18n/navigation";
import { PropuestaPoliticaPart1 } from "./content/Part1";
import { PropuestaPoliticaPart2 } from "./content/Part2";
import { PropuestaPoliticaPart3 } from "./content/Part3";
import { PropuestaPoliticaPart4 } from "./content/Part4";
import styles from "./PropuestaPolitica.module.css";
import { POLICY_TOC } from "./policy-toc";

export const metadata: Metadata = {
  title: "Propuesta de política de alfabetización mediática y digital",
  description:
    "Marco estratégico, competencias, implementación sectorial y principios rectores de la política de alfabetización mediática y digital de Precisar.",
};

export default function PropuestaPoliticaAlfabetizacionPage() {
  return (
    <PageShell
      variant="article"
      bare
      title="Propuesta de política de alfabetización mediática y digital"
      kicker="Educación mediática · Política"
    >
      <div className={styles.layout}>
        <nav className={styles.toc} aria-label="En esta página">
          <p className={styles.tocTitle}>En esta página</p>
          <ul className={styles.tocList}>
            {POLICY_TOC.map((item) => (
              <li key={item.id}>
                <a className={styles.tocLink} href={`#${item.id}`}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={`${styles.main} prose-precisar prec-article-body max-w-none`}>
          <PropuestaPoliticaPart1 />
          <PropuestaPoliticaPart2 />
          <PropuestaPoliticaPart3 />
          <PropuestaPoliticaPart4 />
          <p className="mt-14 border-t border-[var(--border)] pt-8 text-sm text-[var(--muted)]">
            <Link href="/educaciónmediática">← Volver a Educación mediática</Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
