"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { SENTIDOS_DIGITALES } from "@/data/sentidos-digitales";
import { sentidoCarouselAssets } from "@/data/sentidos-carousel";
import styles from "./SentidosDigitalesLanding.module.css";

function CarouselSlide({
  slug,
  index,
  landingHero,
}: {
  slug: string;
  index: number;
  landingHero?: boolean;
}) {
  const assets = sentidoCarouselAssets(slug);
  const [backdropOk, setBackdropOk] = useState(true);
  const [bgOk, setBgOk] = useState(true);
  const [frontOk, setFrontOk] = useState(true);

  const slideClass = landingHero ? `${styles.slide} ${styles.heroSlide}` : styles.slide;

  return (
    <Link
      href={`/experiencias/sentidos-digitales/${slug}`}
      className={slideClass}
      style={{ backgroundColor: assets.fallback }}
      aria-label={`${assets.cardLabel}: abrir ficha`}
      data-slide-index={index}
    >
      {assets.backdrop && backdropOk ? (
        <div className={styles.slideBackdrop}>
          <Image
            src={assets.backdrop}
            alt=""
            fill
            sizes={landingHero ? "(max-width: 640px) 92vw, 640px" : "(max-width: 640px) 85vw, 560px"}
            className={styles.slideBackdropImg}
            onError={() => setBackdropOk(false)}
            priority={index === 0}
          />
        </div>
      ) : null}
      <div
        className={styles.slideGradientLayer}
        style={{ backgroundImage: assets.cardGradient }}
        aria-hidden
      />
      <div className={styles.slideSheen} aria-hidden />
      {assets.bg && bgOk ? (
        <div className={styles.slideImageFrame}>
          <div className={styles.slideImageInner}>
            <Image
              src={assets.bg}
              alt=""
              fill
              sizes={landingHero ? "(max-width: 640px) 92vw, 640px" : "(max-width: 640px) 85vw, 560px"}
              className={styles.slideBgImg}
              onError={() => setBgOk(false)}
              priority={index === 0 && !assets.backdrop}
            />
          </div>
        </div>
      ) : null}
      {assets.front && frontOk ? (
        <div className={styles.slideFront}>
          <img
            src={assets.front}
            alt=""
            className={styles.frontImg}
            onError={() => setFrontOk(false)}
          />
        </div>
      ) : null}
      <div className={styles.slideCaption}>
        <div className={styles.slideCaptionInner}>
          <h2 className={styles.slideTitle}>{assets.cardLabel}</h2>
        </div>
      </div>
    </Link>
  );
}

function useCarouselOffset(index: number, total: number, landingHero: boolean) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ vpw: 0, slideW: 300, gap: 14 });

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const measure = () => {
      const vpw = el.clientWidth;
      if (vpw < 1) return;
      const gap = Math.round(landingHero ? 12 + vpw * 0.008 : 16 + vpw * 0.01);

      if (landingHero) {
        const vph = window.visualViewport?.height ?? window.innerHeight;
        const maxSlideH = Math.min(640, vph * 0.58);
        const idealW = (maxSlideH * 3) / 4.12;
        const slideW = Math.max(260, Math.round(Math.min(idealW, vpw * 0.93)));
        setDim({ vpw, slideW, gap });
        return;
      }

      const slideW = Math.min(560, Math.max(260, Math.round(vpw * 0.82)));
      setDim({ vpw, slideW, gap });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.visualViewport?.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.visualViewport?.removeEventListener("resize", measure);
    };
  }, [landingHero]);

  const maxIndex = Math.max(0, total - 1);
  const clampedIndex = Math.min(Math.max(0, index), maxIndex);
  const offset =
    dim.vpw > 0 ? dim.vpw / 2 - dim.slideW / 2 - clampedIndex * (dim.slideW + dim.gap) : 0;

  return { viewportRef, offset, slideW: dim.slideW, gap: dim.gap };
}

/**
 * Carrusel de Sentidos digitales (mismo bloque que en la landing de la experiencia).
 * `embed`: envoltorio para usar arriba de otras páginas (p. ej. Saberes).
 * `landingHero`: tarjetas acotadas al alto del hero (solo landing Sentidos digitales).
 */
export function SentidosDigitalesCarouselHero({
  embed = false,
  landingHero = false,
}: {
  embed?: boolean;
  landingHero?: boolean;
}) {
  const carouselId = useId();
  const [index, setIndex] = useState(0);
  const n = SENTIDOS_DIGITALES.length;
  const { viewportRef, offset, slideW, gap } = useCarouselOffset(index, n, landingHero);

  const go = useCallback(
    (dir: -1 | 1) => {
      setIndex((i) => (i + dir + n) % n);
    },
    [n],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const sectionClass = `${styles.carouselHero} ${landingHero ? styles.carouselHeroLanding : ""}`;
  const innerClass = `${styles.carouselHeroInner} ${landingHero ? styles.carouselHeroInnerLanding : ""}`;
  const viewportClass = `${styles.viewport} ${landingHero ? styles.viewportHero : ""}`;
  const trackClass = `${styles.track} ${landingHero ? styles.trackHero : ""}`;
  const controlsClass = `${styles.controls} ${landingHero ? styles.controlsHero : ""}`;

  const section = (
    <section
      className={sectionClass}
      aria-labelledby={`${carouselId}-label`}
      aria-roledescription="carrusel"
    >
      <div className={innerClass}>
        <div
          ref={viewportRef}
          className={viewportClass}
          tabIndex={0}
          role="group"
          aria-label="Carrusel de sentidos digitales"
        >
          <div
            className={styles.aspect}
            style={
              {
                "--sd-slide-w": `${slideW}px`,
                "--sd-gap": `${gap}px`,
              } as CSSProperties
            }
          >
            <div
              className={trackClass}
              style={{
                transform: `translate3d(${offset}px, 0, 0)`,
              }}
            >
              {SENTIDOS_DIGITALES.map((s, i) => (
                <CarouselSlide key={s.slug} slug={s.slug} index={i} landingHero={landingHero} />
              ))}
            </div>
          </div>
        </div>

        <div className={controlsClass}>
          <button type="button" className={styles.navBtn} onClick={() => go(-1)} aria-label="Anterior">
            <span aria-hidden>←</span>
          </button>
          <div className={styles.dots} role="tablist" aria-label="Ir a un sentido">
            {SENTIDOS_DIGITALES.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={sentidoCarouselAssets(s.slug).cardLabel}
                className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button type="button" className={styles.navBtn} onClick={() => go(1)} aria-label="Siguiente">
            <span aria-hidden>→</span>
          </button>
        </div>

        <p id={`${carouselId}-label`} className={styles.carouselCta}>
          Haz clic en cada sentido para conocerlos
        </p>
      </div>
    </section>
  );

  if (embed) {
    return <div className={styles.carouselEmbed}>{section}</div>;
  }

  return section;
}
