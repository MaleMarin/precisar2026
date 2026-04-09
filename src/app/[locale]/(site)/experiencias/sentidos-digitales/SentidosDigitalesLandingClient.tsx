"use client";

import { useEffect, useState } from "react";
import { escapeHtml, useTextScramble } from "@/lib/use-text-scramble";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import { SentidosDigitalesCarouselHero } from "./SentidosDigitalesCarouselHero";
import styles from "./SentidosDigitalesLanding.module.css";

const TITLE = "Sentidos digitales";

export function SentidosDigitalesLandingClient() {
  const reducedMotion = usePrefersReducedMotion();
  const [titleClient, setTitleClient] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setTitleClient(true);
    });
  }, []);

  const scrambleHtml = useTextScramble(TITLE, reducedMotion, styles.dud, { enabled: titleClient });

  return (
    <div className={styles.root}>
      <div className={styles.heroBlock}>
        <h1 className={`${styles.scrambleTitle} ${styles.heroHeading}`}>
          {titleClient ? (
            <span
              dangerouslySetInnerHTML={{
                __html: scrambleHtml || escapeHtml(TITLE),
              }}
            />
          ) : (
            TITLE
          )}
        </h1>
        <SentidosDigitalesCarouselHero landingHero />
      </div>

      <div className={styles.inner}>
        <div className={styles.intro}>
          <p>
            Así como nuestros sentidos físicos nos permiten percibir e interactuar con el mundo, los
            sentidos digitales son habilidades que desarrollamos para:
          </p>
          <ul>
            <li>Navegar de forma consciente en entornos digitales</li>
            <li>Filtrar la sobrecarga de información</li>
            <li>Establecer límites saludables con la tecnología</li>
            <li>Proteger nuestro bienestar digital integral</li>
          </ul>
          <p>
            Desarrollar estos sentidos es esencial para una relación equilibrada con la tecnología en el
            mundo actual.
          </p>
        </div>
      </div>
    </div>
  );
}
