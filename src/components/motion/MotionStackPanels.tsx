"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import NextLink from "next/link";
import { useMemo, useRef, type ComponentType, type ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PRECISANDO_ARTICLES_UNDER_CONSTRUCTION } from "@/lib/precisando-access";
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

type MiniListItem = {
  label: ReactNode;
  href?: string;
  external?: boolean;
  /** Clave estable si `label` no es string (p. ej. fila Bot Onda). */
  itemKey?: string;
  /** Varias líneas: alinea la flecha arriba y da más aire al bloque. */
  multiline?: boolean;
  /** Solo texto; sin enlace ni flecha (p. ej. sección en construcción). */
  disabled?: boolean;
};

function MiniList({
  items,
  dark = false,
  glass = false,
  glassExtraMargin = false,
  reduceMotion = false,
}: {
  items: MiniListItem[];
  dark?: boolean;
  /** Lista tipo cristal (claro: Programas/Saberes; oscuro: Precisando). */
  glass?: boolean;
  /** Más margen superior (alinear la lista bajo el titular). */
  glassExtraMargin?: boolean;
  reduceMotion?: boolean;
}) {
  const listClass = [
    styles.miniList,
    dark ? styles.miniListDark : "",
    !dark && glass ? styles.miniListGlass : "",
    !dark && glass && glassExtraMargin ? styles.miniListGlassExtraMargin : "",
    dark && glass ? styles.miniListDarkGlass : "",
    dark && glass && glassExtraMargin ? styles.miniListDarkGlassExtraMargin : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={listClass}>
      {items.map((item, i) => {
        const rowClass = dark ? `${styles.miniRow} ${styles.miniRowDark}` : styles.miniRow;
        const labelClass = dark ? `${styles.miniLabel} ${styles.miniLabelDark}` : styles.miniLabel;
        const rowMultiline = item.multiline ? ` ${styles.miniRowMultiline}` : "";
        const disabledCls = item.disabled ? ` ${styles.miniRowDisabled}` : "";
        const inner = (
          <>
            <span className={labelClass}>{item.label}</span>
            {!item.disabled ? (
              <ArrowIcon className={`${styles.iconSm} ${styles.miniRowArrow}`} />
            ) : null}
          </>
        );
        const rowCls = `${rowClass}${rowMultiline}${disabledCls} ${styles.miniRowMotion}`.trim();
        const motionRowProps = item.disabled
          ? { className: rowCls }
          : reduceMotion
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

        const rowKey = item.itemKey ?? `${item.href ?? "row"}-${i}`;

        if (item.disabled) {
          return (
            <motion.div key={rowKey} role="status" {...motionRowProps}>
              {inner}
            </motion.div>
          );
        }

        const href = item.href ?? "/";

        return item.external ? (
          <motion.a
            key={rowKey}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            {...motionRowProps}
          >
            {inner}
          </motion.a>
        ) : (
          <MotionLink key={rowKey} href={href} {...motionRowProps}>
            {inner}
          </MotionLink>
        );
      })}
    </div>
  );
}

/** Columna Saberes: lista de recursos + CTA recursos. */
function HomeSaberesAside({ reduceMotion, items }: { reduceMotion: boolean; items: MiniListItem[] }) {
  return (
    <div className={styles.saberesAsideStack}>
      <MiniList dark glass glassExtraMargin reduceMotion={reduceMotion} items={items} />
      <Link href="/saberes/recursos" className={styles.recursosBtn}>
        Material para descargar →
      </Link>
    </div>
  );
}

/** Sesión Bot Onda en portada: tarjeta con las tres ondas y enlace al chat. */
function HomeBotOndaAside() {
  const tBot = useTranslations("homeBotOnda");
  const tPrograms = useTranslations("homePrograms");

  return (
    <div className={styles.botOndaHomeAside}>
      <a
        href={EXTERNAL.botOnda}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.botOndaHomeLightBlock}
      >
        <span className={`${styles.botOndaStack} ${styles.botOndaHomeLightPersonas}`}>
          <span className={styles.botOndaLine}>
            <strong>{tPrograms("stackBotOndaManoName")}</strong> — {tPrograms("stackBotOndaManoDesc")}
          </span>
          <span className={styles.botOndaLine}>
            <strong>{tPrograms("stackBotOndaCivitaName")}</strong> — {tPrograms("stackBotOndaCivitaDesc")}
          </span>
          <span className={styles.botOndaLine}>
            <strong>{tPrograms("stackBotOndaProfesName")}</strong> — {tPrograms("stackBotOndaProfesDesc")}
          </span>
          <span className={styles.botOndaLine}>
            <strong>{tPrograms("stackBotOndaEscuchaName")}</strong> — {tPrograms("stackBotOndaEscuchaDesc")}
          </span>
        </span>
        <span className={styles.botOndaHomeLightCta}>{tBot("ctaOpenChat")}</span>
      </a>
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

      <div className={styles.convocaStackMetricsIntro}>
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
      </div>

      <section className={styles.convocaStackPropuesta} aria-labelledby="convoca-propuesta-lead">
        <div className={styles.convocaStackPropuestaCopy}>
          <p className={styles.convocaStackPropuestaLead} id="convoca-propuesta-lead">
            {t("propuesta.body1")}
          </p>
          <p className={styles.convocaStackPropuestaClosing}>{t("propuesta.body2")}</p>
        </div>
      </section>

      <section className={styles.convocaStackChile} aria-labelledby="convoca-chile-heading">
        <h3 className={styles.convocaStackChileEyebrow} id="convoca-chile-heading">
          {t("chile.eyebrow")}
        </h3>
        <div className={styles.convocaStackChileGrid}>
          <div className={styles.convocaStackChileItem}>
            <span className={styles.convocaStackChileNum}>{t("chile.stat1Value")}</span>
            <span className={styles.convocaStackChileCap}>{t("chile.stat1Label")}</span>
          </div>
          <div className={styles.convocaStackChileItem}>
            <span className={styles.convocaStackChileNum}>{t("chile.stat2Value")}</span>
            <span className={styles.convocaStackChileCap}>{t("chile.stat2Label")}</span>
          </div>
          <div className={styles.convocaStackChileItem}>
            <span className={styles.convocaStackChileNum}>{t("chile.stat3Value")}</span>
            <span className={styles.convocaStackChileCap}>{t("chile.stat3Label")}</span>
          </div>
        </div>
        <p className={styles.convocaStackChileOutro}>{t("chile.outro")}</p>
      </section>
    </div>
  );
}

/** Panel Participa (#participa): consulta ciudadana antes del footer del sitio. */
function ParticipaStackPanelContent() {
  const t = useTranslations("homeParticipa");
  return (
    <div className={styles.participaStackRoot}>
      <div className={styles.participaStackMain}>
        <header className={styles.participaStackHeader}>
          <p className={`${styles.kicker} ${styles.kickerOnAccent}`}>{t("stackKicker")}</p>
          <h2 className={styles.displayTitle} id="stack-participa-heading">
            {t("stackHeadline")}
          </h2>
          <p className={`${styles.body} ${styles.bodyOnAccent} ${styles.participaTagline}`}>{t("stackTagline")}</p>
        </header>
        <div className={styles.participaStackCopy}>
          <p className={`${styles.body} ${styles.bodyOnAccent} ${styles.participaCopyFirst}`}>{t("stackBody")}</p>
        </div>
      </div>
      <div className={styles.participaStackAside}>
        <NextLink href="/consulta" className={styles.participaStackCta}>
          {t("ctaLabel")}
        </NextLink>
      </div>
    </div>
  );
}

type StackPanelProps = {
  index: number;
  total: number;
  theme?: "light" | "dark" | "accent" | "navy";
  kicker: string;
  label?: string;
  headline: string;
  body: string;
  icon?: ComponentType<{ className?: string }>;
  id?: string;
  children?: ReactNode;
  /** Contenido opcional bajo la bajada del bloque principal (columna izquierda). */
  mainFooter?: ReactNode;
  reduceMotion?: boolean;
  /** Contenido editorial a ancho completo (primer panel “Qué nos convoca”). */
  editorialContent?: ReactNode;
  /** `tall` = scroll largo; `auto` = flujo natural (convoca); `standard` = panel compacto (participa). */
  editorialHeight?: "tall" | "standard" | "auto";
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
  mainFooter,
  reduceMotion = false,
  editorialContent,
  editorialHeight = "tall",
}: StackPanelProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Resorte suave sobre el progreso (stiffness baja + Lenis): transición menos brusca entre sesiones. */
  const progress = useSpring(scrollYProgress, {
    stiffness: reduceMotion ? 10_000 : 72,
    damping: reduceMotion ? 100 : 26,
    mass: reduceMotion ? 0.08 : 0.95,
    restDelta: 0.0004,
  });

  /* Escala y desplazamiento con más puntos de mando = curva más fluida al apilar. */
  const scale = useTransform(
    progress,
    [0, 0.14, 0.32, 0.52, 0.74, 0.9, 1],
    reduceMotion ? [1, 1, 1, 1, 1, 1, 1] : [1, 0.994, 0.984, 0.972, 0.958, 0.948, 0.938],
  );
  const y = useTransform(
    progress,
    [0, 0.2, 0.42, 0.62, 0.82, 1],
    reduceMotion ? [0, 0, 0, 0, 0, 0] : [0, -24, -58, -96, -138, -182],
  );
  const borderRadius = useTransform(
    progress,
    [0, 0.22, 0.55, 1],
    reduceMotion ? [0, 0, 0, 0] : [0, 22, 44, 68],
  );
  const contentY = useTransform(
    progress,
    [0, 0.22, 0.52, 1],
    reduceMotion ? [0, 0, 0, 0] : [0, -14, -44, -72],
  );
  const lineScale = useTransform(progress, [0, 0.1, 0.26, 0.42], [0.1, 0.48, 0.82, 1]);

  /* Muy plano al centro; inclinación fuerte solo al salir de vista. */
  const rotateX = useTransform(
    progress,
    [0, 0.36, 0.5, 0.62, 0.78, 1],
    reduceMotion ? [0, 0, 0, 0, 0, 0] : [0, 0, -2.2, -9, -18, -26],
  );

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
  const isNavy = theme === "navy";
  const isColoredPanel = isAccent || isNavy;

  const panelClass = [
    styles.stickyPanel,
    isDark
      ? styles.stickyPanelDark
      : isAccent
        ? styles.stickyPanelAccent
        : isNavy
          ? styles.stickyPanelNavy
          : styles.stickyPanelLight,
  ].join(" ");

  const glowClass = [
    styles.panelGlow,
    isDark ? styles.glowDark : isAccent ? styles.glowAccent : isNavy ? styles.glowNavy : styles.glowLight,
  ].join(" ");

  const lineClass = [
    styles.topLine,
    isDark || isColoredPanel ? styles.lineDark : styles.lineLight,
  ].join(" ");

  const kickerClass = [
    styles.kicker,
    isColoredPanel ? styles.kickerOnAccent : "",
    isDark && !isColoredPanel ? styles.kickerSquareOnDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  const kickerSqClass = [
    styles.kickerSquare,
    isColoredPanel ? styles.kickerSquareOnAccent : "",
    isDark && !isColoredPanel ? styles.kickerSquareOnDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  const titleRowClass = [styles.titleRow, isDark || isColoredPanel ? styles.titleRowOnDark : ""]
    .filter(Boolean)
    .join(" ");

  const bodyClass = [
    styles.body,
    isDark ? styles.bodyOnDark : isColoredPanel ? styles.bodyOnAccent : "",
  ]
    .filter(Boolean)
    .join(" ");

  const isTwoColIntroLayout = id === "saberes" || id === "educacion-mediatica" || id === "bot-onda";
  const gridClass = isTwoColIntroLayout ? `${styles.grid} ${styles.gridSaberes}` : styles.grid;
  const colMainClass = [styles.colMain, isTwoColIntroLayout ? styles.colMainSaberes : ""]
    .filter(Boolean)
    .join(" ");
  const colAsideClass = [styles.colAside, isTwoColIntroLayout ? styles.colAsideSaberes : ""]
    .filter(Boolean)
    .join(" ");
  /** Misma tipografía en la columna izquierda que Precisando / Programas (titular display + bajada .body). */
  const stackTitleClass = styles.displayTitle;
  const stackBodyClass =
    id === "educacion-mediatica" || id === "bot-onda"
      ? `${bodyClass} ${styles.saberesBodyPreline}`.trim()
      : bodyClass;

  const glowDrift = !reduceMotion ? styles.panelGlowDrift : "";

  /** Pila junta (no pegada): ~8px entre tarjetas. */
  const stackTopGap = 8;
  const panelMotionStyle = {
    scale,
    y,
    borderRadius,
    rotateX,
    transformOrigin: "50% 88%",
    top: `${index * stackTopGap}px`,
    zIndex: total - index,
  };

  /** Entrada al viewport: inclinación leve hacia “adentro” → plano (capa interior; el exterior sigue el scroll). */
  const panelDepthEnterProps = useMemo(
    () =>
      reduceMotion
        ? { className: styles.panelDepthEnter }
        : {
            className: styles.panelDepthEnter,
            initial: { rotateX: 2, scale: 0.98 },
            whileInView: { rotateX: 0, scale: 1 },
            viewport: { once: true, amount: 0.22 },
            transition: { duration: 0.6, ease: "easeOut" as const },
          },
    [reduceMotion],
  );

  if (editorialContent) {
    const isTall = editorialHeight === "tall";
    const isAuto = editorialHeight === "auto";
    const sectionClass = isAuto
      ? styles.panelSectionAuto
      : isTall
        ? `${styles.panelSection} ${styles.panelSectionEditorial}`
        : styles.panelSection;
    const panelClassEditorial = isAuto
      ? `${styles.stickyPanelDark} ${styles.stickyPanelAutoHeight}`.trim()
      : isTall
        ? `${panelClass} ${styles.stickyPanelEditorial}`.trim()
        : `${panelClass} ${styles.stickyPanelParticipaFit}`.trim();
    const bodyClass = isAuto || isTall ? styles.editorialPanelBody : styles.participaPanelBody;
    return (
      <section ref={ref} className={sectionClass} id={id}>
        <motion.div style={panelMotionStyle} className={panelClassEditorial}>
          <motion.div {...panelDepthEnterProps}>
            <div className={`${glowClass} ${glowDrift}`.trim()} aria-hidden />
            <motion.div style={{ scaleX: lineScale }} className={lineClass} aria-hidden />
            <motion.div style={{ y: contentY }} className={bodyClass}>
              {editorialContent}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  return (
    <section ref={ref} className={styles.panelSection} id={id}>
      <motion.div style={panelMotionStyle} className={panelClass}>
        <motion.div {...panelDepthEnterProps}>
          <div className={`${glowClass} ${glowDrift}`.trim()} aria-hidden />

          <motion.div style={{ scaleX: lineScale }} className={lineClass} aria-hidden />

          <motion.div style={{ y: contentY }} className={gridClass}>
            <motion.div
              className={colMainClass}
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
                <motion.h2 className={stackTitleClass} variants={mainItemVariants}>
                  {headline}
                </motion.h2>
                <motion.p className={stackBodyClass} variants={mainItemVariants}>
                  {body}
                </motion.p>
                {mainFooter ? (
                  <motion.div variants={mainItemVariants}>{mainFooter}</motion.div>
                ) : null}
              </div>
            </motion.div>

            <motion.div
              className={colAsideClass}
              variants={asideVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className={styles.asideSlot}>{children}</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export type MotionStackPanelsProps = {
  featuredArticles: StackArticle[];
  /** En portada Precisar: solo paneles apilados, sin pie duplicado (el sitio ya tiene SiteFooter). */
  omitFooter?: boolean;
  /** Si true, se atenúan animaciones (respeta preferencia del sistema si no se pasa). */
  reduceMotion?: boolean;
};

export function MotionStackPanels({
  featuredArticles,
  omitFooter = false,
  reduceMotion: reduceMotionProp,
}: MotionStackPanelsProps) {
  const systemReduceMotion = useReducedMotion() ?? false;
  const reduceMotion = reduceMotionProp ?? systemReduceMotion;
  const tPrograms = useTranslations("homePrograms");
  const tPrecisando = useTranslations("homePrecisando");
  const tSaberes = useTranslations("homeSaberes");
  const tBotOnda = useTranslations("homeBotOnda");
  const tEducacionMediatica = useTranslations("homeEducacionMediatica");
  const programLinks: MiniListItem[] = [
    { label: tPrograms("stackLinkCiudades"), href: "/programas/ciudades", multiline: true },
    { label: tPrograms("stackLinkHub"), href: "/programas/hub-digital-consciente", multiline: true },
    { label: tPrograms("stackLinkAprender"), href: "/programas/aprender-digital", multiline: true },
    {
      label: tPrograms("stackLinkPensamientoCritico"),
      href: "/programas/leer-noticias-era-digital",
      multiline: true,
    },
    { label: tPrograms("stackLinkFuncionarios"), href: "/programas/funcionarios-publicos", multiline: true },
  ];

  const saberesLinks = SABERES_NAV_LINKS.filter(
    (l) => l.href !== "/saberes" && l.href !== "/educacion-mediatica/comunicacion",
  ).map((l) => ({ label: l.label, href: l.href }));

  const educacionMediaticaLinks = [
    { label: tEducacionMediatica("linkComunicacion"), href: "/educacion-mediatica/comunicacion" },
    { label: tEducacionMediatica("linkEducacion"), href: "/educacion-mediatica/educacion" },
    { label: tEducacionMediatica("linkTecnologia"), href: "/educacion-mediatica/tecnologia" },
    { label: tEducacionMediatica("linkCultura"), href: "/educacion-mediatica/cultura" },
  ];

  const precisandoLinks: MiniListItem[] = PRECISANDO_ARTICLES_UNDER_CONSTRUCTION
    ? [
        {
          label: tPrecisando("stackUnderConstruction"),
          disabled: true,
          itemKey: "precisando-under-construction",
          multiline: true,
        },
      ]
    : featuredArticles.slice(0, 4).map((a) => ({
        label: a.title,
        href: `/precisando/${encodeURI(a.slug)}`,
        itemKey: `precisando-${a.slug}`,
      }));

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
      editorialHeight: "auto" as const,
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
      theme: "accent" as const,
      kicker: tSaberes("stackKicker"),
      label: undefined,
      headline: tSaberes("stackHeadline"),
      body: tSaberes("stackBody"),
      icon: undefined,
      child: <HomeSaberesAside reduceMotion={reduceMotion} items={saberesLinks} />,
    },
    {
      id: "bot-onda",
      theme: "light" as const,
      kicker: tBotOnda("stackKicker"),
      label: undefined,
      headline: tBotOnda("stackHeadline"),
      body: tBotOnda("stackBody"),
      icon: undefined,
      child: <HomeBotOndaAside />,
    },
    {
      id: "precisando",
      theme: "navy" as const,
      kicker: tPrecisando("stackKicker"),
      label: undefined,
      headline: tPrecisando("stackHeadline"),
      body: tPrecisando("stackBody"),
      icon: undefined,
      child: (
        <MiniList dark glass glassExtraMargin reduceMotion={reduceMotion} items={precisandoLinks} />
      ),
    },
    {
      id: "educacion-mediatica",
      theme: "light" as const,
      kicker: tEducacionMediatica("stackKicker"),
      label: undefined,
      headline: tEducacionMediatica("stackHeadline"),
      body: tEducacionMediatica("stackBody"),
      icon: undefined,
      child: (
        <>
          <MiniList reduceMotion={reduceMotion} glass items={educacionMediaticaLinks} />
          <div className={styles.amiBtnStack}>
            <Link href="/educacion-mediatica/propuesta-politica-alfabetizacion" className={styles.amiBtn}>
              Educación Mediática para Chile →
            </Link>
            <Link href="/educacion-mediatica/ami-vs-alfabetizacion-digital" className={styles.amiBtn}>
              AMI vs Alfabetización Digital →
            </Link>
          </div>
        </>
      ),
    },
    {
      id: "participa",
      theme: "accent" as const,
      kicker: "",
      headline: "",
      body: "",
      editorialContent: <ParticipaStackPanelContent />,
      editorialHeight: "standard" as const,
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
            editorialHeight={"editorialHeight" in panel ? panel.editorialHeight : "tall"}
          >
            {"child" in panel ? panel.child : undefined}
          </StackPanel>
        ))}

        {!omitFooter ? (
          <section className={styles.footerSection} aria-label="Pie de página">
            <div className={styles.footerGrid}>
              <h2 className={styles.footerBrandTitle}>{SITE.name}</h2>
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
