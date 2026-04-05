"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ComponentType, type ReactNode } from "react";
import { MultiStepForm } from "@/components/home/MultiStepForm";
import { EXTERNAL, FOOTER_COLUMNS, SITE, SABERES_NAV_LINKS } from "@/lib/site";
import styles from "./MotionStackPanels.module.css";

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

function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M4 19a5 5 0 0110 0M16 11a3 3 0 013 3v1"
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
}: {
  items: { label: string; href: string; external?: boolean }[];
  dark?: boolean;
}) {
  const listClass = dark ? `${styles.miniList} ${styles.miniListDark}` : styles.miniList;
  return (
    <div className={listClass}>
      {items.map((item, i) => {
        const rowClass = dark ? `${styles.miniRow} ${styles.miniRowDark}` : styles.miniRow;
        const idxClass = dark ? `${styles.miniIndex} ${styles.miniIndexDark}` : styles.miniIndex;
        const labelClass = dark ? `${styles.miniLabel} ${styles.miniLabelDark}` : styles.miniLabel;
        const inner = (
          <>
            <span className={idxClass}>{String(i + 1).padStart(2, "0")}</span>
            <span className={labelClass}>{item.label}</span>
            <ArrowIcon className={styles.iconSm} />
          </>
        );
        return item.external ? (
          <a
            key={item.href + item.label}
            href={item.href}
            className={rowClass}
            target="_blank"
            rel="noreferrer"
          >
            {inner}
          </a>
        ) : (
          <Link key={item.href + item.label} href={item.href} className={rowClass}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}

function StackPanel({
  index,
  total,
  theme = "light",
  kicker,
  label,
  headline,
  body,
  aside,
  icon: Icon,
  id,
  children,
  primaryCta,
  secondaryCta,
}: {
  index: number;
  total: number;
  theme?: "light" | "dark" | "accent";
  kicker: string;
  label: string;
  headline: string;
  body: string;
  aside: string;
  icon: ComponentType<{ className?: string }>;
  id?: string;
  children?: ReactNode;
  primaryCta: { href: string; label: string; external?: boolean };
  secondaryCta?: { href: string; label: string; external?: boolean };
}) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.965, 0.925]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const lineScale = useTransform(scrollYProgress, [0, 0.35], [0.35, 1]);

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

  const chipClass = [
    styles.brandChip,
    isDark || isAccent ? styles.brandChipOnDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  const brandDotClass = [styles.brandDot, isDark || isAccent ? styles.brandDotLight : ""]
    .filter(Boolean)
    .join(" ");

  const brandSubClass = [
    styles.brandSub,
    isDark || isAccent ? styles.brandSubMutedOnDark : styles.brandSubMuted,
  ].join(" ");

  const metaClass = [styles.panelMeta, isDark ? styles.panelMetaOnDark : ""]
    .filter(Boolean)
    .join(" ");

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

  const asideBoxClass = [
    styles.asideBox,
    isDark || isAccent ? styles.asideBoxOnDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  const asideLabelClass = [
    styles.asideLabel,
    isDark || isAccent ? styles.asideLabelOnDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  const primaryCtaClass = [
    styles.cta,
    isDark || isAccent ? styles.ctaInverse : styles.ctaLight,
  ].join(" ");

  const secClass = [
    styles.secondaryLink,
    isDark || isAccent ? styles.secondaryLinkOnDark : "",
  ]
    .filter(Boolean)
    .join(" ");

  const PrimaryInner = (
    <>
      {primaryCta.label}
      <ArrowIcon className={styles.iconSm} />
    </>
  );

  return (
    <section ref={ref} className={styles.panelSection} id={id}>
      <motion.div
        style={{
          scale,
          y,
          borderRadius,
          top: `${index * 14}px`,
          zIndex: total - index,
        }}
        className={panelClass}
      >
        <div className={glowClass} aria-hidden />

        <motion.div style={{ scaleX: lineScale }} className={lineClass} aria-hidden />

        <motion.div
          style={{ y: contentY }}
          className={styles.grid}
        >
          <div className={styles.rowTop}>
            <div className={chipClass}>
              <span className={brandDotClass} />
              <div>
                <div className={styles.brandName}>{SITE.name}</div>
                <div className={brandSubClass}>Cultura digital</div>
              </div>
            </div>
            <div className={metaClass}>
              Scroll dirigido · panel {String(index + 1).padStart(2, "0")}
            </div>
          </div>

          <div className={styles.colMain}>
            <div>
              <div className={kickerClass}>
                <span className={kickerSqClass} />
                <span>{kicker}</span>
              </div>
              <div className={titleRowClass}>
                <Icon className={styles.iconSm} />
                <span>{label}</span>
              </div>
              <h2 className={styles.displayTitle}>{headline}</h2>
              <p className={bodyClass}>{body}</p>
            </div>

            <div className={styles.actions}>
              {primaryCta.external ? (
                <a href={primaryCta.href} className={primaryCtaClass}>
                  {PrimaryInner}
                </a>
              ) : (
                <Link href={primaryCta.href} className={primaryCtaClass}>
                  {PrimaryInner}
                </Link>
              )}
              {secondaryCta ? (
                secondaryCta.external ? (
                  <a href={secondaryCta.href} className={secClass}>
                    {secondaryCta.label}
                    <ArrowIcon className={styles.iconSm} />
                  </a>
                ) : (
                  <Link href={secondaryCta.href} className={secClass}>
                    {secondaryCta.label}
                    <ArrowIcon className={styles.iconSm} />
                  </Link>
                )
              ) : null}
            </div>
          </div>

          <div className={styles.colAside}>
            <div className={asideBoxClass}>
              <div className={asideLabelClass}>Función de esta sección</div>
              <p className={styles.asideText}>{aside}</p>
            </div>
            <div className={styles.asideSlot}>{children}</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export type MotionStackPanelsProps = {
  featuredArticles: StackArticle[];
  formCategories: string[];
};

export function MotionStackPanels({ featuredArticles, formCategories }: MotionStackPanelsProps) {
  const programLinks = [
    { label: "Hub Digital Consciente", href: "/programas/hub-digital-consciente" },
    { label: "Ciudades conectadas", href: "/programas/ciudades" },
    { label: "Aprender Digital", href: "/programas/aprender-digital" },
    { label: "Educación mediática · docentes", href: "/programas/docentes" },
  ];

  const saberesLinks = SABERES_NAV_LINKS.map((l) => ({ label: l.label, href: l.href }));

  const precisandoLinks = featuredArticles.slice(0, 4).map((a) => ({
    label: a.title,
    href: `/precisando/${encodeURI(a.slug)}`,
  }));

  const participaLinks = [
    { label: "Participa / consulta", href: "/participa" },
    { label: "Consulta ciudadana 2026", href: EXTERNAL.consultaCiudadana, external: true },
    { label: "Bot ONDA (conversar)", href: EXTERNAL.botOnda, external: true },
  ];

  const footerCols = FOOTER_COLUMNS;

  const panels = [
    {
      id: "programas",
      theme: "dark" as const,
      kicker: "01 · Programas",
      label: "Iniciativas",
      headline: "Territorio, aula y ciudad: programas con peso y jerarquía.",
      body:
        "Líneas de trabajo pensadas para el criterio, no para el ruido. Un panel protagonista con inventario claro: lo central manda el ritmo del recorrido, como en un sitio estudio.",
      aside:
        "Traducir la lógica de pieza fuerte a Precisar: una sección grande, memorable, con accesos directos a cada programa.",
      icon: IconBlocks,
      primaryCta: { href: "/programas", label: "Explorar programas" },
      secondaryCta: { href: "/somos", label: "Somos Precisar" },
      child: <MiniList dark items={programLinks} />,
    },
    {
      id: "saberes",
      theme: "light" as const,
      kicker: "02 · Saberes",
      label: "Colección",
      headline: "Recursos curados: guías, actividades y marcos para leer lo digital.",
      body:
        "La brecha ya no es solo conectividad: es comprensión. Saberes se comporta como catálogo editorial: numeración, borde y ritmo de lectura — menos grilla neutra, más colección organizada.",
      aside:
        "Dar jerarquía a los materiales abiertos y enlazar hacia marcos (comunicación, educación, tecnología, cultura).",
      icon: IconDownload,
      primaryCta: { href: "/saberes", label: "Ir a Saberes" },
      secondaryCta: { href: "/marco/comunicacion", label: "Marco comunicación" },
      child: <MiniList items={saberesLinks} />,
    },
    {
      id: "precisando",
      theme: "accent" as const,
      kicker: "03 · Precisando",
      label: "Editorial",
      headline: "Análisis y debates: cómo circula la información y qué efectos tiene.",
      body:
        "La publicación entra con peso de revista: una cara de entrada, lecturas recientes y salida clara hacia el archivo completo.",
      aside:
        "Que el blog se sienta continuidad editorial, no solo índice: titulares con categoría y lectura en profundidad.",
      icon: IconNewspaper,
      primaryCta: { href: "/precisando", label: "Ver Precisando" },
      secondaryCta: { href: "/agenda", label: "Agenda" },
      child: <MiniList dark items={precisandoLinks} />,
    },
    {
      id: "participa",
      theme: "dark" as const,
      kicker: "04 · Participa",
      label: "Cierre",
      headline: "Escribinos: territorio, institución y la necesidad que querés abordar.",
      body:
        "Cierre con conversión real: formulario local (conectá tu endpoint cuando esté listo), consulta ciudadana y canales abiertos. El scroll termina con una invitación que pesa.",
      aside:
        "Una sola zona de acción importante con contraste suficiente para cerrar la experiencia arriba, no desinflada.",
      icon: IconUsers,
      primaryCta: { href: "/participa", label: "Ir a Participa" },
      secondaryCta: { href: `mailto:${SITE.contactEmail}`, label: SITE.contactEmail },
      child: (
        <>
          <MiniList dark items={participaLinks} />
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
      <main>
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
            aside={panel.aside}
            icon={panel.icon}
            primaryCta={panel.primaryCta}
            secondaryCta={panel.secondaryCta}
          >
            {panel.child}
          </StackPanel>
        ))}

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
      </main>
    </div>
  );
}
