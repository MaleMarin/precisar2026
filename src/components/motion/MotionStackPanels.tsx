"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
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

      <section className={styles.convocaStackIa} aria-labelledby="convoca-ia-heading">
        <div className={styles.convocaStackIaColLeft}>
          <p className={styles.convocaStackIaEyebrow}>{t("ia.eyebrow")}</p>
          <h3 className={styles.convocaStackIaHeadline} id="convoca-ia-heading">
            {t("ia.headline")}
          </h3>
        </div>
        <div className={styles.convocaStackIaColRight}>
          <p className={styles.convocaStackIaBody}>{t("ia.body")}</p>
        </div>
      </section>

      <div className={styles.convocaStackPropuesta}>
        <p className={styles.convocaStackPropuestaEyebrow}>{t("propuesta.eyebrow")}</p>
        <p className={styles.convocaStackPropuestaText}>{t("propuesta.body1")}</p>
        <p className={styles.convocaStackPropuestaText}>{t("propuesta.body2")}</p>
      </div>

      <div className={styles.convocaStackClosingWrap}>
        <p className={styles.convocaStackClosing}>
          <span className={styles.convocaStackClosingText}>{t("closing.before")}</span>
          <span className={styles.convocaStackClosingBrand}>Precisar</span>
          <span className={styles.convocaStackClosingText}>{t("closing.after")}</span>
        </p>
      </div>
    </div>
  );
}

/** Panel Participa (#participa): consulta ciudadana antes del footer del sitio. */
function ParticipaStackPanelContent() {
  return (
    <div className={styles.participaStackRoot}>
      <div className={styles.participaStackMain}>
        <header className={styles.participaStackHeader}>
          <p className={`${styles.kicker} ${styles.kickerOnAccent}`}>06 · Participa</p>
          <h2 className={styles.displayTitle} id="stack-participa-heading">
            ¿Cómo te informas hoy?
          </h2>
          <p className={`${styles.body} ${styles.bodyOnAccent} ${styles.participaTagline}`}>
            Menos ruido, más criterio.
          </p>
        </header>
        <div className={styles.participaStackCopy}>
          <p
            className={`${styles.body} ${styles.bodyOnAccent} ${styles.participaCopyFirst}`}
          >
            En medio de titulares, audios, redes y mensajes, todos tomamos decisiones todos los días.
          </p>
          <p className={`${styles.body} ${styles.bodyOnAccent} ${styles.participaCopyFollow}`}>
            Queremos entender cómo lo haces tú.
          </p>
          <p
            className={`${styles.body} ${styles.bodyOnAccent} ${styles.participaCopyFollow} ${styles.participaEmphasis}`}
          >
            No es una prueba.
            <br />
            Es anónima.
            <br />Y toma menos de un minuto.
          </p>
        </div>
      </div>
      <div className={styles.participaStackAside}>
        <NextLink href="/consulta" className={styles.participaStackCta}>
          Responder ahora
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
  reduceMotion?: boolean;
  /** Contenido editorial a ancho completo (primer panel “Qué nos convoca”). */
  editorialContent?: ReactNode;
  /** `tall` = scroll largo (convoca); `standard` = panel compacto (participa). */
  editorialHeight?: "tall" | "standard";
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
  editorialHeight = "tall",
}: StackPanelProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Sin useSpring: Lenis ya suaviza el scroll; otro resorte encima retrasaba los paneles (“freno”). */
  const progress = scrollYProgress;

  /* Escala suave y sin rotateX: la perspectiva deformaba titulares y cuerpo al cambiar de sesión. */
  const scale = useTransform(
    progress,
    [0, 0.2, 0.45, 0.78, 1],
    reduceMotion ? [1, 1, 1, 1, 1] : [1, 0.992, 0.985, 0.978, 0.972],
  );
  const y = useTransform(
    progress,
    [0, 0.22, 0.52, 1],
    reduceMotion ? [0, 0, 0, 0] : [0, -48, -112, -180],
  );
  const borderRadius = useTransform(progress, [0, 0.35, 1], reduceMotion ? [0, 0, 0] : [0, 24, 52]);
  const contentY = useTransform(
    progress,
    [0, 0.28, 1],
    reduceMotion ? [0, 0, 0] : [0, -24, -64],
  );
  const lineScale = useTransform(progress, [0, 0.14, 0.3], [0.12, 0.62, 1]);

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

  const isTwoColIntroLayout = id === "saberes" || id === "educacion-mediatica";
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
    id === "educacion-mediatica" ? `${bodyClass} ${styles.saberesBodyPreline}`.trim() : bodyClass;

  const glowDrift = !reduceMotion ? styles.panelGlowDrift : "";

  const stackTopGap = 48;
  const panelMotionStyle = {
    scale,
    y,
    borderRadius,
    top: `${index * stackTopGap}px`,
    zIndex: total - index,
  };

  if (editorialContent) {
    const isTall = editorialHeight === "tall";
    const sectionClass = isTall
      ? `${styles.panelSection} ${styles.panelSectionEditorial}`
      : styles.panelSection;
    const panelClassEditorial = isTall
      ? `${panelClass} ${styles.stickyPanelEditorial}`.trim()
      : `${panelClass} ${styles.stickyPanelParticipaFit}`.trim();
    const bodyClass = isTall ? styles.editorialPanelBody : styles.participaPanelBody;
    return (
      <section ref={ref} className={sectionClass} id={id}>
        <motion.div style={panelMotionStyle} className={panelClassEditorial}>
          <div className={`${glowClass} ${glowDrift}`.trim()} aria-hidden />
          <motion.div style={{ scaleX: lineScale }} className={lineClass} aria-hidden />
          <motion.div style={{ y: contentY }} className={bodyClass}>
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
  const tEducacionMediatica = useTranslations("homeEducacionMediatica");
  const programLinks: MiniListItem[] = [
    { label: tPrograms("stackLinkCiudades"), href: "/programas/ciudades" },
    { label: tPrograms("stackLinkHub"), href: "/programas/hub-digital-consciente" },
    { label: tPrograms("stackLinkAprender"), href: "/programas/aprender-digital" },
    { label: tPrograms("stackLinkDocentes"), href: "/programas/docentes" },
    { label: tPrograms("stackLinkPensamientoCritico"), href: "/programas/leer-noticias-era-digital" },
    { label: tPrograms("stackLinkFuncionarios"), href: "/programas/funcionarios-publicos" },
    {
      label: (
        <span className={styles.botOndaStack}>
          <span className={styles.botOndaLead}>{tPrograms("stackBotOndaLead")}</span>
          <span className={styles.botOndaLine}>
            <strong>{tPrograms("stackBotOndaManoName")}</strong> — {tPrograms("stackBotOndaManoDesc")}
          </span>
          <span className={styles.botOndaLine}>
            <strong>{tPrograms("stackBotOndaCivitaName")}</strong> — {tPrograms("stackBotOndaCivitaDesc")}
          </span>
          <span className={styles.botOndaLine}>
            <strong>{tPrograms("stackBotOndaProfesName")}</strong> — {tPrograms("stackBotOndaProfesDesc")}
          </span>
        </span>
      ),
      href: EXTERNAL.botOnda,
      external: true,
      itemKey: "programas-bot-onda",
      multiline: true,
    },
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
      child: (
        <MiniList dark glass glassExtraMargin reduceMotion={reduceMotion} items={saberesLinks} />
      ),
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
      child: <MiniList reduceMotion={reduceMotion} glass items={educacionMediaticaLinks} />,
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
              <div className={styles.footerBrandCol}>
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
