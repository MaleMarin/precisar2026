import styles from "./ConsultaProgress.module.css";

type Props = {
  current: number;
  total: number;
  remainingAfterThis: number;
};

export function ConsultaProgress({ current, total, remainingAfterThis }: Props) {
  const pct = total > 0 ? (current / total) * 100 : 0;
  const showSegments = total <= 12 && total >= 1;

  return (
    <div className={styles.outer}>
      <div className={styles.progressDock}>
        <div className={styles.inner}>
          <div className={styles.row}>
            <p className={styles.label}>Tu avance</p>
            <p className={styles.count} aria-hidden="true">
              {current} / {total}
            </p>
          </div>
          {remainingAfterThis > 0 ? (
            <p className={styles.remaining}>Quedan {remainingAfterThis} preguntas</p>
          ) : null}

          {showSegments ? (
            <div className={styles.segments} aria-hidden="true">
              {Array.from({ length: total }, (_, i) => {
                const n = i + 1;
                const altBlue = i % 2 === 0;
                let cls = styles.segment;
                if (n < current) {
                  cls += ` ${altBlue ? styles.segmentDoneBlue : styles.segmentDoneCoral}`;
                } else if (n === current) {
                  cls += ` ${altBlue ? styles.segmentCurrentBlue : styles.segmentCurrentCoral}`;
                }
                return <span key={n} className={cls} />;
              })}
            </div>
          ) : null}

          <div
            className={styles.track}
            role="progressbar"
            aria-valuenow={current}
            aria-valuemin={1}
            aria-valuemax={total}
            aria-label={`Pregunta ${current} de ${total}`}
          >
            <div className={styles.fill} style={{ width: `${pct}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}
