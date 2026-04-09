"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ARTICLES } from "@/data/articles";
import { NavOverlay } from "@/components/home/NavOverlay";
import { EXTERNAL, HOME_HERO_MEDIA, NAV_PRIMARY, SITE } from "@/lib/site";
import styles from "./MotionDemoPage.module.css";
import { MotionHomeRails } from "./MotionHomeRails";
import { Marquee } from "./Marquee";
import { MotionStackPanels } from "./MotionStackPanels";

/** Texto de la franja en movimiento bajo el hero (titular + tagline). */
const HERO_STRIP_TEXT = `Información con criterio · ${SITE.tagline} · `;

/** En desktop: accesos rápidos en barra fija; en móvil solo logo + menú hamburguesa. */
const HOME_QUICK_NAV = NAV_PRIMARY;

const HERO_EASE = [0.22, 1, 0.36, 1] as const;

export function MotionDemoPage() {
  const reduceMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const imgParallaxY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 118]);
  const scrimParallaxY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 44]);
  const contentParallaxY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -24]);

  const featured = ARTICLES.slice(0, 4);
  const railArticles = ARTICLES.slice(0, 6);

  return (
    <div className={styles.page}>
      <header className={styles.homeTopBar}>
        <Link href="/" className={styles.homeLogo}>
          {SITE.name}
        </Link>
        <nav className={styles.homeQuickNav} aria-label="Accesos rápidos">
          {HOME_QUICK_NAV.map((item) => (
            <Link key={item.href} href={item.href} className={styles.homeQuickLink}>
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <NavOverlay
        links={NAV_PRIMARY.map((n) => ({ href: n.href, label: n.label }))}
        mobileSrc="/studio/menu-bg.svg"
        contactLinks={[
          { label: SITE.contactEmail, href: `mailto:${SITE.contactEmail}` },
          { label: "Instagram", href: EXTERNAL.instagram, external: true },
          { label: "YouTube", href: EXTERNAL.youtube, external: true },
          { label: "Bot ONDA", href: EXTERNAL.botOnda, external: true },
        ]}
      />

      <motion.header ref={heroRef} className={styles.hero}>
        <motion.div className={styles.heroMediaWrap} style={{ y: imgParallaxY }} aria-hidden>
          {/* Imagen estática: ilustra flujos sin peso de video; URL vía HOME_HERO_MEDIA.poster / env */}
          { }
          <img
            className={styles.heroMediaImg}
            src={HOME_HERO_MEDIA.poster}
            alt=""
            decoding="async"
            fetchPriority="high"
          />
        </motion.div>
        <motion.div className={styles.heroScrim} style={{ y: scrimParallaxY }} aria-hidden />

        <motion.div className={styles.heroContentParallax} style={{ y: contentParallaxY }}>
          <motion.div
            className={styles.heroContent}
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: HERO_EASE }}
          >
            <h1 className={styles.heroTitle}>Información con criterio</h1>
            <p className={styles.heroTag}>{SITE.tagline}</p>
            <div className={styles.heroCtas}>
              <Link href="/programas" className={styles.heroCtaPrimary}>
                Ver programas
              </Link>
              <Link href="/participa" className={styles.heroCtaGhost}>
                Participa
              </Link>
            </div>
          </motion.div>
        </motion.div>

        <p className={styles.heroScrollHint} aria-hidden>
          Scroll
        </p>
      </motion.header>

      <Marquee
        text={HERO_STRIP_TEXT.repeat(3)}
        bgColor="var(--color-bg, #0e0e0e)"
        textColor="var(--color-text-light, #f0f0ec)"
        height="lg"
        uppercase={false}
      />

      <MotionHomeRails articles={railArticles} />

      <MotionStackPanels featuredArticles={featured} />
    </div>
  );
}
