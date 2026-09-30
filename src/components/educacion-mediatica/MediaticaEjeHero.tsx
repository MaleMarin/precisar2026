import { MediaticaEjesNav, type MediaticaEjeSlug } from "./MediaticaEjesNav";
import styles from "./MediaticaEjeHero.module.css";

const TONE_CLASS = {
  flame: styles.toneFlame,
  navy: styles.toneNavy,
  charcoal: styles.toneCharcoal,
  void: styles.toneVoid,
} as const;

type MediaticaEjeHeroProps = {
  current: MediaticaEjeSlug;
  title: string;
  intro: string;
  tone: keyof typeof TONE_CLASS;
};

export function MediaticaEjeHero({ current, title, intro, tone }: MediaticaEjeHeroProps) {
  return (
    <header className={`${styles.hero} ${TONE_CLASS[tone]}`}>
      <MediaticaEjesNav current={current} />
      <div className={styles.heroGrid}>
        <div className={styles.heroTitleCell}>
          <h1 className={styles.heroTitle}>{title}</h1>
        </div>
        <p className={styles.heroIntro}>{intro}</p>
      </div>
    </header>
  );
}
