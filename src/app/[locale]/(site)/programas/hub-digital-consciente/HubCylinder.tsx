"use client";
import {
  useState,
  useRef,
  useEffect,
  useCallback,
  type MouseEvent,
  type TouchEvent,
  type WheelEvent,
  type ReactNode,
} from "react";
import { useTranslations } from "next-intl";
import "@/app/globals-hub-print.css";
import styles from "./HubCylinder.module.css";
import { HubDownloadButton } from "./HubDownloadButton";

type GroupItem = string | { text: string; pdf?: string };
type HubGroup = { id?: string; label: string; items: GroupItem[] };
type HubSection = {
  kicker: string;
  title: string;
  sub?: string;
  subItinerantes?: boolean;
  subSuffix?: string;
  body: string;
  bg: string;
  tc: string;
  groups: HubGroup[];
};

const PDF_HREFS: Record<string, string> = {
  desinformacion: "/hub-edicion-desinformacion.pdf",
  "ia-algoritmos": "/hub-edicion-ia-algoritmos.pdf",
};

function cardSubContent(section: HubSection): ReactNode {
  if (section.subItinerantes) {
    return (
      <>
        <span lang="es">
          i<wbr />ti<wbr />ne<wbr />ran<wbr />tes.
        </span>
        {section.subSuffix}
      </>
    );
  }
  return section.sub;
}

function itemText(item: GroupItem): string {
  return typeof item === "string" ? item : item.text;
}

function itemPdf(item: GroupItem): string | null {
  if (typeof item === "string") return null;
  return item.pdf ? PDF_HREFS[item.pdf] ?? null : null;
}

export default function HubCylinder() {
  const t = useTranslations("programsHub.cylinder");
  const CONTENT = t.raw("sections") as HubSection[];
  const N = CONTENT.length;

  const [current, setCurrent] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedIdx, setExpandedIdx] = useState(0);
  const [rotation, setRotation] = useState(0);

  const isExpandedRef = useRef(isExpanded);
  isExpandedRef.current = isExpanded;

  const isDrag = useRef(false);
  const pointerLastX = useRef(0);
  const rotRef = useRef(0);
  const animRef = useRef<number | undefined>(undefined);
  const targetRot = useRef(0);
  const velYRef = useRef(0);
  const lastDeltaRef = useRef(0);
  const snapTimerRef = useRef<number | null>(null);
  const hubFocusedRef = useRef(false);

  const R = 480;
  const stepDeg = 360 / N;

  const goTo = useCallback(
    (i: number) => {
      if (snapTimerRef.current !== null) {
        window.clearTimeout(snapTimerRef.current);
        snapTimerRef.current = null;
      }
      velYRef.current = 0;
      const idx = ((i % N) + N) % N;
      const dest = -(idx / N) * 360;
      const currentRot = rotRef.current;
      let diff = dest - currentRot;
      while (diff > 180) diff -= 360;
      while (diff < -180) diff += 360;
      targetRot.current = currentRot + diff;
      setCurrent(idx);
    },
    [N],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const animate = () => {
      if (!isDrag.current && !isExpandedRef.current && Math.abs(velYRef.current) > 1e-4) {
        targetRot.current += velYRef.current;
        velYRef.current *= 0.88;
      }
      const distance = Math.abs(targetRot.current - rotRef.current);
      const lerpFactor = distance > 30 ? 0.06 : distance > 5 ? 0.04 : 0.025;
      rotRef.current += (targetRot.current - rotRef.current) * lerpFactor;
      setRotation(rotRef.current);
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current !== undefined) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const snapCarouselToNearest = useCallback(() => {
    const k = Math.round(-targetRot.current / stepDeg);
    const idx = ((k % N) + N) % N;
    targetRot.current = -(idx / N) * 360;
    setCurrent(idx);
  }, [N, stepDeg]);

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      if (!isDrag.current || isExpanded) return;
      const cx = e.clientX;
      const delta = cx - pointerLastX.current;
      pointerLastX.current = cx;
      lastDeltaRef.current = delta;
      targetRot.current += delta * 0.02;
      velYRef.current = delta * 0.02;
    };
    const onMoveT = (e: globalThis.TouchEvent) => {
      if (!isDrag.current || isExpanded) return;
      const cx = e.touches[0].clientX;
      const delta = cx - pointerLastX.current;
      pointerLastX.current = cx;
      lastDeltaRef.current = delta;
      targetRot.current += delta * 0.02;
      velYRef.current = delta * 0.02;
    };
    const onUp = () => {
      if (!isDrag.current || isExpanded) return;
      isDrag.current = false;
      velYRef.current = lastDeltaRef.current * 0.02;
      if (snapTimerRef.current !== null) {
        window.clearTimeout(snapTimerRef.current);
      }
      snapTimerRef.current = window.setTimeout(() => {
        snapCarouselToNearest();
        velYRef.current = 0;
        snapTimerRef.current = null;
      }, 900);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMoveT, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      if (snapTimerRef.current !== null) {
        window.clearTimeout(snapTimerRef.current);
        snapTimerRef.current = null;
      }
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMoveT);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [isExpanded, snapCarouselToNearest]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (isExpanded) return;
    if (snapTimerRef.current !== null) {
      window.clearTimeout(snapTimerRef.current);
      snapTimerRef.current = null;
    }
    velYRef.current = 0;
    isDrag.current = true;
    hubFocusedRef.current = true;
    pointerLastX.current = e.clientX;
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (isExpanded) return;
    if (snapTimerRef.current !== null) {
      window.clearTimeout(snapTimerRef.current);
      snapTimerRef.current = null;
    }
    velYRef.current = 0;
    isDrag.current = true;
    pointerLastX.current = e.touches[0].clientX;
  };

  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (isExpanded) return;
    if (!hubFocusedRef.current) return;
    e.preventDefault();
    if (e.deltaY > 0) next();
    else prev();
  };

  const openExpand = (idx: number) => {
    if (snapTimerRef.current !== null) {
      window.clearTimeout(snapTimerRef.current);
      snapTimerRef.current = null;
    }
    velYRef.current = 0;
    setExpandedIdx(idx);
    setIsExpanded(true);
  };

  const closeExpand = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const exp = CONTENT[expandedIdx]!;
  const isLight = exp.tc === "#F5F2EC";

  return (
    <div
      className={styles.wrap}
      style={{
        height: isExpanded ? "auto" : "100vh",
        overflow: isExpanded ? "visible" : "hidden",
        cursor: isExpanded ? "default" : undefined,
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onWheel={handleWheel}
    >
      <div className={styles.blobOrange} aria-hidden />
      <div className={styles.blobBlue} aria-hidden />

      <div className={styles.scene}>
        <div
          className={styles.carousel}
          style={{
            transform: `rotateY(${rotation}deg)`,
            willChange: "transform",
          }}
        >
          {CONTENT.map((s, i) => {
            const angle = (i / N) * 360;
            const isDark = s.tc === "#0A0C12";
            return (
              <div
                key={i}
                className={styles.card}
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${R}px)`,
                  background: s.bg,
                  border: isDark
                    ? "1px solid rgba(10,12,18,0.1)"
                    : "1px solid rgba(245,242,236,0.15)",
                  boxShadow: isDark
                    ? "0 8px 40px rgba(0,0,0,0.12)"
                    : "0 8px 40px rgba(0,0,0,0.4)",
                }}
                onClick={() => openExpand(i)}
              >
                <span className={styles.cardNum} style={{ color: s.tc }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3
                  className={styles.cardTitle}
                  style={{
                    color: s.tc,
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical" as const,
                    overflow: "hidden",
                  }}
                >
                  {s.title.split("\n").map((l, j, lines) => (
                    <span key={j}>
                      {l}
                      {j < lines.length - 1 && <br />}
                    </span>
                  ))}
                </h3>
                <p className={styles.cardSub} style={{ color: s.tc }}>
                  {cardSubContent(s)}
                </p>
                <p className={styles.cardHint} style={{ color: s.tc }}>
                  {t("clickHint")}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.topLabel}>
        <p className={styles.topTitle}>{t("topTitle")}</p>
        <p className={styles.topHint}>{t("topHint")}</p>
      </div>

      <button type="button" className={styles.arrowLeft} onClick={prev} aria-label={t("prevSection")}>
        ←
      </button>
      <button type="button" className={styles.arrowRight} onClick={next} aria-label={t("nextSection")}>
        →
      </button>

      <nav className={styles.dots} aria-label={t("sectionsAria")}>
        {CONTENT.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goTo(i)}
            className={i === current ? styles.dotActive : styles.dot}
            aria-label={t("sectionN", { n: i + 1 })}
          />
        ))}
      </nav>

      <div
        id="hub-expand-panel"
        className={`${styles.expand} ${isExpanded ? styles.expandOpen : styles.expandClosed}`}
        style={{ background: exp.bg }}
      >
        <div className={styles.expandInner}>
          <div className={styles.expandHeader}>
            <button
              type="button"
              onClick={closeExpand}
              className={styles.closeBtn}
              style={{
                color: isLight ? "rgba(245,242,236,0.6)" : "rgba(10,12,18,0.5)",
                borderColor: isLight ? "rgba(245,242,236,0.25)" : "rgba(10,12,18,0.2)",
              }}
            >
              {t("backToHub")}
            </button>
            <p
              className={styles.expandCounter}
              style={{
                color: isLight ? "rgba(245,242,236,0.3)" : "rgba(10,12,18,0.3)",
              }}
            >
              {String(expandedIdx + 1).padStart(2, "0")} / {N}
            </p>
          </div>

          <p
            className={styles.expandKicker}
            style={{
              color: isLight ? "#F5F2EC" : "#DB5227",
            }}
          >
            {exp.kicker}
          </p>
          <h2 className={styles.expandTitle} style={{ color: exp.tc }}>
            {exp.title.split("\n").map((l, i, lines) => (
              <span key={i}>
                {l}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </h2>
          <p
            className={styles.expandBody}
            style={{
              color: isLight ? "#F5F2EC" : "#0A0C12",
            }}
          >
            {exp.body}
          </p>

          {exp.groups.map((group, gi) => (
            <div key={gi}>
              <p
                className={styles.groupLabel}
                style={{
                  color: isLight ? "rgba(245,242,236,0.7)" : "#DB5227",
                  borderTopColor: isLight ? "rgba(245,242,236,0.1)" : "rgba(10,12,18,0.1)",
                }}
              >
                {group.label}
              </p>
              <ul className={styles.groupList}>
                {group.items.map((item, ii) => {
                  const itemStyle = {
                    color: isLight ? "#F5F2EC" : "rgba(10,12,18,0.68)",
                    borderBottomColor: isLight ? "rgba(245,242,236,0.1)" : "rgba(10,12,18,0.1)",
                  } as const;
                  const dotStyle = {
                    background: isLight ? "#F5F2EC" : "#DB5227",
                  } as const;
                  const pdfHref = itemPdf(item);
                  const text = itemText(item);
                  return (
                    <li key={ii} className={styles.groupItem} style={itemStyle}>
                      <span className={styles.groupDot} style={dotStyle} />
                      {pdfHref ? (
                        <a
                          href={pdfHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "inherit",
                            textDecoration: "underline",
                            textUnderlineOffset: "3px",
                          }}
                        >
                          {text}
                        </a>
                      ) : (
                        text
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {expandedIdx === 5 && (
            <div className={styles.actionBtns}>
              <HubDownloadButton />
            </div>
          )}

          <div className={styles.expandNav}>
            {expandedIdx > 0 ? (
              <button
                type="button"
                className={styles.expandNavBtn}
                style={{
                  color: isLight ? "rgba(245,242,236,0.6)" : "rgba(10,12,18,0.5)",
                  borderColor: isLight ? "rgba(245,242,236,0.2)" : "rgba(10,12,18,0.15)",
                }}
                onClick={() => {
                  setExpandedIdx(expandedIdx - 1);
                }}
              >
                ← {CONTENT[expandedIdx - 1]!.kicker}
              </button>
            ) : (
              <div />
            )}
            {expandedIdx < N - 1 ? (
              <button
                type="button"
                className={styles.expandNavBtnPrimary}
                onClick={() => {
                  setExpandedIdx(expandedIdx + 1);
                }}
              >
                {t("nextNav", { kicker: CONTENT[expandedIdx + 1]!.kicker })}
              </button>
            ) : (
              <button type="button" className={styles.expandNavBtnPrimary} onClick={closeExpand}>
                {t("backToHub")}
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="hub-print-content" aria-hidden>
        <div className="hub-print-header">
          <img src="/precisar-footer-wordmark.png" alt="Precisar" style={{ height: 32 }} />
          <div style={{ textAlign: "right" }}>
            <p>precisar.net</p>
            <p>@precisar_ · @_precisar</p>
          </div>
        </div>

        <h1>{t("printTitle")}</h1>
        <p>{t("printSubtitle")}</p>

        {CONTENT.map((section, i) => (
          <div key={i} className={i > 0 ? "hub-print-section" : undefined}>
            <h2>{section.kicker}</h2>
            <h1>{section.title.replace(/\n/g, " ")}</h1>
            <p>{section.body}</p>
            {section.groups.map((group, gi) => (
              <div key={gi}>
                <h2>{group.label}</h2>
                <ul>
                  {group.items.map((item, ii) => (
                    <li key={ii}>{itemText(item)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}

        <div className="hub-print-section">
          <h2>{t("printSocialTitle")}</h2>
          <p>{t("printWeb")}</p>
          <p>{t("printX")}</p>
          <p>{t("printInstagram")}</p>
          <p>{t("printFacebook")}</p>
          <p>{t("printYouTube")}</p>
          <p>{t("printMadeIn", { year: new Date().getFullYear() })}</p>
          <p>{t("printLicense")}</p>
        </div>
      </div>
    </div>
  );
}
