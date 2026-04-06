"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMemo, useRef, type ComponentType, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { MultiStepForm } from "@/components/home/MultiStepForm";
import { EXTERNAL, FOOTER_COLUMNS, SITE, SABERES_NAV_LINKS } from "@/lib/site";
import styles from "./MotionStackPanels.module.css";

const MotionLink = motion.create(Link);

const stackEase = [0.22, 1, 0.36, 1] as const;

export type StackArticle = { slug: string; title: string; category: string };

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconBlocks({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="13" width="8" height="8" rx="1" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function IconDownload({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 4v12m0 0l-4-4m4 4l4-4M5 20h14"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconNewspaper({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 4h11a2 2 0 012 2v13H6a2 2 0 01-2-2V6a2 2 0 012-2zM8 8h6M8 12h6M8 16h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MiniList({
  items,
  dark = false,
  glass = false,
  glassExtraMargin = false,
  hideIndex = false,
  reduceMotion = false,
}: {
  items: { label: string; href: string; external?: boolean }[];
  dark?: boolean;
  /** Lista tipo cristal (claro: Programas/Saberes; oscuro: Precisando). */
  glass?: boolean;
  /** Más margen superior (alinear la lista bajo el titular). */
  glassExtraMargin?: boolean;
  /** Sin columna 01, 02… (p. ej. lista editorial Precisando). */
  hideIndex?: boolean;
  reduceMotion?: boolean;
}) {
  const listClass = [
    styles.miniList,
    dark ? styles.miniListDark : "",
    !dark && glass ? styles.miniListGlass : "",
    !dark && glass && glassExtraMargin ? styles.miniListGlassExtraMargin : "",
    dark && glass ? styles.miniListDarkGlass : "",
    dark && glass && glassExtraMargin ? styles.miniListDarkGlassExtraMargin : "",
    hideIndex ? styles.miniListHideIndex : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={listClass}>
      {items.map((item, i) => {
        const rowClass = dark ? `${styles.miniRow} ${styles.miniRowDark}` : styles.miniRow;
        const idxClass = dark ? `${styles.miniIndex} ${styles.miniIndexDark}` : styles.miniIndex;
        const labelClass = dark ? `${styles.miniLabel} ${styles.miniLabelDark}` : styles.miniLabel;
        const inner = (
          <>
            {!hideIndex ? <span className={idxClass}>{String(i + 1).padStart(2, "0")}</span> : null}
            <span className={labelClass}>{item.label}</span>
            <ArrowIcon className={`${styles.iconSm} ${styles.miniRowArrow}`} />
          </>
        );
        const rowCls = `${rowClass} ${styles.miniRowMotion}`;
        const motionRowProps = reduceMotion
          ? { className: rowCls }
          : {
              className: rowCls,
              initial: { opacity: 0, x: 36 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true, margin: "0px 0px -12% 0px" },
              transition: { duration: 0.52, ease: stackEase, delay: i * 0.065 },
              whileHover: {
                x: 10,
                transition: { type: "spring" as const, stiffness: 420, damping: 30 },
              },
              whileTap: { scale: 0.985 },
            };

        return item.external ? (
          <motion.a
            key={item.href + item.label}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            {...motionRowProps}
          >
            {inner}
          </motion.a>
        ) : (
          <MotionLink key={item.href + item.label} href={item.href} {...motionRowProps}>
            {inner}
          </MotionLink>
        );
      })}
    </div>
  );
}

/** Primer panel apilado: “Qué nos convoca” (mismo formato archivo que el resto). */
function HomeConvocaStackPanelContent() {
  const t = useTranslations("homeConvoca");

  return (
    <div className={styles.convocaStackRoot}>
      <header className={styles.convocaStackHeader}>
        <p className={styles.convocaStackKicker}>
          <span className={styles.convocaStackKickerSq} aria-hidden />
          <span>{t("kickerLine1")}</span>
          <span className={styles.convocaStackKickerSep} aria-hidden>
            ·
          </span>
          <span>{t("kickerLine2")}</span>
        </p>
        <h2 className={styles.convocaStackHeadline} id="stack-convoca-heading">
          <span className={styles.convocaStackHeadlineLine}>{t("headline.line1")}</span>
          <span className={styles.convocaStackHeadlineAccent}>{t("headline.line2")}</span>
        </h2>
      </header>

      <div className={styles.convocaStackImpact}>
        <div className={styles.convocaStackImpactItem}>
          <span className={styles.convocaStackImpactNum}>{t("metrics.exabytesValue")}</span>
          <span className={styles.convocaStackImpactCap}>{t("metrics.exabytesLabel")}</span>
        </div>
        <div className={styles.convocaStackImpactItem}>
          <span className={styles.convocaStackImpactNum}>{t("metrics.yearsValue")}</span>
          <span className={styles.convocaStackImpactCap}>{t("metrics.yearsLabel")}</span>
        </div>
      </div>

      <p className={styles.convocaStackIntroSlate}>{t("intro")}</p>

      <section className={styles.convocaStackChile} aria-labelledby="convoca-chile-heading">
        <h3 className={styles.convocaStackChileTitle} id="convoca-chile-heading">
          {t("chile.title")}
        </h3>
        <p className={styles.convocaStackChileStat}>{t("chile.statValue")}</p>
        <p className={styles.convocaStackChileBody}>{t("chile.bodyAfterStat")}</p>
        <p className={styles.convocaStackChilePull}>{t("chile.pull")}</p>
      </section>

      <section className={styles.convocaStackIa} aria-labelledby="convoca-ia-heading">
        <h3 className={styles.convocaStackIaTitle} id="convoca-ia-heading">
          {t("ia.title")}
        </h3>
        <span className={styles.convocaStackIaRule} aria-hidden />
        <p className={styles.convocaStackIaBody}>{t("ia.body")}</p>
      </section>

      <div className={styles.convocaStackPropuesta}>
        <p className={styles.convocaStackPropuestaText}>{t("propuesta.body1")}</p>
        <p className={styles.convocaStackPropuestaText}>{t("propuesta.body2")}</p>
      </div>

      <p className={styles.convocaStackClosing}>{t("closing")}</p>
    </div>
  );
}

type StackPanelProps = {
  index: number;
  total: number;
  theme?: "light" | "dark" | "accent";
  kicker: string;
  label?: string;
  headline: string;
  body: string;
  icon?: ComponentType<{ className?: string }>;
  id?: string;
  children?: ReactNode;
  reduceMotion?: boolean;
  /** Contenido editorial a ancho completo (primer panel “Qué nos convoca”). */
  editorialContent?: ReactNode;
};

function StackPanel({
  index,
  total,
  theme = "light",
  kicker,
  label,
  headline,
  body,
  icon: Icon,
  id,
  children,
  reduceMotion = false,
  editorialContent,
}: StackPanelProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Scroll más marcado: encoge más, sube más, más perspectiva y parallax interno */
  const scale = useTransform(
    scrollYProgress,
    [0, 0.42, 1],
    reduceMotion ? [1, 1, 1] : [1, 0.9, 0.76],
  );
  const y = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -268]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 52]);
  const contentY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -96]);
  const rotateX = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 10]);
  const lineScale = useTransform(scrollYProgress, [0, 0.22], [0.12, 1]);

  const mainBlockVariants = useMemo(
    () => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: reduceMotion ? 0 : 0.11,
          delayChildren: reduceMotion ? 0 : 0.05,
        },
      },
    }),
    [reduceMotion],
  );

  const mainItemVariants = useMemo(
    () => ({
      hidden: {
        opacity: reduceMotion ? 1 : 0,
        y: reduceMotion ? 0 : 44,
      },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.58, ease: stackEase },
      },
    }),
    [reduceMotion],
  );

  const asideVariants = useMemo(
    () => ({
      hidden: { opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 32 },
      show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: stackEase, delay: reduceMotion ? 0 : 0.22 },
      },
    }),
    [reduceMotion],
  );

  const isDark = theme === "dark";
  const isAccent = theme === "accent";

  const panelClass = [
    styles.stickyPanel,
    isDark ? styles.stickyPanelDark : isAccent ? styles.stickyPanelAccent : styles.stickyPanelLight,
  ].join(" ");

  const glowClass = [
    styles.panelGlow,
    isDark ? styles.glowDark : isAccent ? styles.glowAccent : styles.glowLight,
  ].join(" ");

  const lineClass = [
    styles.topLine,
    isDark || isAccent ? styles.lineDark : styles.lineLight,
  ].join(" ");

  const kickerClass = [
    styles.kicker,
    isAccent ? styles.kickerOnAccent : "",
    isDark ? styles.kickerSquareOnDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  const kickerSqClass = [
    styles.kickerSquare,
    isAccent ? styles.kickerSquareOnAccent : "",
    isDark ? styles.kickerSquareOnDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  const titleRowClass = [styles.titleRow, isDark || isAccent ? styles.titleRowOnDark : ""]
    .filter(Boolean)
    .join(" ");

  const bodyClass = [
    styles.body,
    isDark ? styles.bodyOnDark : isAccent ? styles.bodyOnAccent : "",
  ]
    .filter(Boolean)
    .join(" ");

  const glowDrift = !reduceMotion ? styles.panelGlowDrift : "";

  const panelMotionStyle = {
    scale,
    y,
    rotateX,
    borderRadius,
    top: `${index * 32}px`,
    zIndex: total - index,
    transformPerspective: 880,
  };

  if (editorialContent) {
    return (
      <section ref={ref} className={styles.panelSection} id={id}>
        <motion.div style={panelMotionStyle} className={panelClass}>
          <div className={`${glowClass} ${glowDrift}`.trim()} aria-hidden />
          <motion.div style={{ scaleX: lineScale }} className={lineClass} aria-hidden />
          <motion.div style={{ y: contentY }} className={styles.editorialPanelBody}>
            {editorialContent}
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section ref={ref} className={styles.panelSection} id={id}>
      <motion.div style={panelMotionStyle} className={panelClass}>
        <div className={`${glowClass} ${glowDrift}`.trim()} aria-hidden />

        <motion.div style={{ scaleX: lineScale }} className={lineClass} aria-hidden />

        <motion.div style={{ y: contentY }} className={styles.grid}>
          <motion.div
            className={styles.colMain}
            variants={mainBlockVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            <div>
              <motion.div className={kickerClass} variants={mainItemVariants}>
                <span className={kickerSqClass} />
                <span>{kicker}</span>
              </motion.div>
              {Icon ? (
                <motion.div className={titleRowClass} variants={mainItemVariants}>
                  <Icon className={styles.iconSm} />
                  <span>{label ?? ""}</span>
                </motion.div>
              ) : null}
              <motion.h2 className={styles.displayTitle} variants={mainItemVariants}>
                {headline}
              </motion.h2>
              <motion.p className={bodyClass} variants={mainItemVariants}>
                {body}
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            className={styles.colAside}
            variants={asideVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className={styles.asideSlot}>{children}</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export type MotionStackPanelsProps = {
  featuredArticles: StackArticle[];
  formCategories: string[];
  /** En portada Precisar: solo paneles apilados, sin pie duplicado (el sitio ya tiene SiteFooter). */
  omitFooter?: boolean;
  /** Si true, se atenúan animaciones (respeta preferencia del sistema si no se pasa). */
  reduceMotion?: boolean;
};

export function MotionStackPanels({
  featuredArticles,
  formCategories,
  omitFooter = false,
  reduceMotion: reduceMotionProp,
}: MotionStackPanelsProps) {
  const systemReduceMotion = useReducedMotion() ?? false;
  const reduceMotion = reduceMotionProp ?? systemReduceMotion;
  const tPrograms = useTranslations("homePrograms");
  const tPrecisando = useTranslations("homePrecisando");
  const tSaberes = useTranslations("homeSaberes");
  const programLinks = [
    { label: tPrograms("stackLinkCiudades"), href: "/programas/ciudades" },
    { label: tPrograms("stackLinkHub"), href: "/programas/hub-digital-consciente" },
    { label: tPrograms("stackLinkAprender"), href: "/programas/aprender-digital" },
    { label: tPrograms("stackLinkDocentes"), href: "/programas/docentes" },
    { label: tPrograms("stackLinkPensamientoCritico"), href: "/programas/leer-noticias-era-digital" },
    { label: tPrograms("stackLinkFuncionarios"), href: "/programas/funcionarios-publicos" },
    { label: tPrograms("stackLinkBotOnda"), href: EXTERNAL.botOnda, external: true },
  ];

  const saberesLinks = SABERES_NAV_LINKS.filter(
    (l) => l.href !== "/saberes" && l.href !== "/marco/comunicacion",
  ).map((l) => ({ label: l.label, href: l.href }));

  const precisandoLinks = featuredArticles.slice(0, 4).map((a) => ({
    label: a.title,
    href: `/precisando/${encodeURI(a.slug)}`,
  }));

  const participaLinks = [
    { label: "Participa / consulta", href: "/participa" },
    { label: SITE.contactEmail, href: `mailto:${SITE.contactEmail}`, external: true },
    { label: "Consulta ciudadana 2026", href: EXTERNAL.consultaCiudadana, external: true },
    { label: "Bot ONDA (conversar)", href: EXTERNAL.botOnda, external: true },
  ];

  const footerCols = FOOTER_COLUMNS;

  const panels = [
    {
      id: "convoca",
      theme: "dark" as const,
      kicker: "",
      label: undefined,
      headline: "",
      body: "",
      icon: undefined,
      editorialContent: <HomeConvocaStackPanelContent />,
    },
    {
      id: "programas",
      theme: "light" as const,
      kicker: "02 · Programas",
      label: "Iniciativas",
      headline: tPrograms("stackHeadline"),
      body: tPrograms("body"),
      icon: IconBlocks,
      child: <MiniList reduceMotion={reduceMotion} glass items={programLinks} />,
    },
    {
      id: "saberes",
      theme: "light" as const,
      kicker: tSaberes("stackKicker"),
      label: tSaberes("label"),
      headline: tSaberes("stackHeadline"),
      body: tSaberes("stackBody"),
      icon: IconDownload,
      child: <MiniList reduceMotion={reduceMotion} glass glassExtraMargin items={saberesLinks} />,
    },
    {
      id: "precisando",
      theme: "accent" as const,
      kicker: tPrecisando("stackKicker"),
      label: tPrecisando("label"),
      headline: tPrecisando("stackHeadline"),
      body: tPrecisando("stackBody"),
      icon: IconNewspaper,
      child: (
        <MiniList
          dark
          glass
          glassExtraMargin
          hideIndex
          reduceMotion={reduceMotion}
          items={precisandoLinks}
        />
      ),
    },
    {
      id: "participa",
      theme: "dark" as const,
      kicker: "05 · Participa",
      headline: "Escribinos: territorio, institución y la necesidad que querés abordar.",
      body:
        "Consulta ciudadana, newsletter y canales abiertos. Contanos desde dónde trabajás y qué tema querés abordar.",
      child: (
        <>
          <MiniList dark reduceMotion={reduceMotion} items={participaLinks} />
          <div className={`${styles.asideSlot} ${styles.formScroll}`}>
            <MultiStepForm categories={formCategories} />
          </div>
        </>
      ),
    },
  ];

  const total = panels.length;

  return (
    <div className={styles.stackRoot}>
      <div>
        {panels.map((panel, index) => (
          <StackPanel
            key={panel.id}
            id={panel.id}
            index={index}
            total={total}
            theme={panel.theme}
            kicker={panel.kicker}
            label={panel.label}
            headline={panel.headline}
            body={panel.body}
            icon={panel.icon}
            reduceMotion={reduceMotion}
            editorialContent={"editorialContent" in panel ? panel.editorialContent : undefined}
          >
            {"child" in panel ? panel.child : undefined}
          </StackPanel>
        ))}

        {!omitFooter ? (
          <section className={styles.footerSection} aria-label="Pie de página">
            <div className={styles.footerGrid}>
              <div className={styles.footerBrandCol}>
                <h2 className={styles.footerBrandTitle}>{SITE.name}</h2>
                <p className={styles.footerBrandTag}>{SITE.tagline}</p>
              </div>
              <div className={styles.footerCols}>
                {footerCols.map((col) => (
                  <div key={col.title}>
                    <div className={styles.footerColTitle}>{col.title}</div>
                    <div className={styles.footerLinkList}>
                      {col.links.map((link) => {
                        const isExt = link.href.startsWith("http");
                        return isExt ? (
                          <a
                            key={link.label + link.href}
                            href={link.href}
                            className={styles.footerLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <span>{link.label}</span>
                            <ArrowIcon className={styles.footerLinkIcon} />
                          </a>
                        ) : (
                          <Link key={link.label + link.href} href={link.href} className={styles.footerLink}>
                            <span>{link.label}</span>
                            <ArrowIcon className={styles.footerLinkIcon} />
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
