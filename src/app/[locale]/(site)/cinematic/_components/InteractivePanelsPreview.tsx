"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FOOTER_MEDIA } from "@/lib/site";
import {
  CHAPTER_IDS,
  detectInitialLocale,
  getImmersiveChapters,
  IMMERSIVE_LOCALE_LABEL,
  IMMERSIVE_LOCALES,
  immersiveCopy,
  type ImmersiveChapter,
  type ImmersiveCopy,
  type ImmersiveLocale,
} from "./immersive-i18n";
import { PotenciaRotatingHeadline } from "@/components/potencia-headline/PotenciaRotatingHeadline";

const EASE = [0.22, 1, 0.36, 1] as const;

type ImmersiveLocaleContextValue = {
  locale: ImmersiveLocale;
  setLocale: (l: ImmersiveLocale) => void;
  copy: ImmersiveCopy;
  chapters: ImmersiveChapter[];
};

const ImmersiveLocaleContext = createContext<ImmersiveLocaleContextValue | null>(null);

function useImmersiveLocale() {
  const ctx = useContext(ImmersiveLocaleContext);
  if (!ctx) throw new Error("useImmersiveLocale must be used within ImmersiveLocaleProvider");
  return ctx;
}

function ImmersiveLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<ImmersiveLocale>("es");

  useEffect(() => {
    queueMicrotask(() => {
      setLocaleState(detectInitialLocale());
    });
  }, []);

  const setLocale = useCallback((l: ImmersiveLocale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("precisar-immersive-locale", l);
    } catch {
      /* noop */
    }
  }, []);

  const copy = immersiveCopy[locale];
  const chapters = useMemo(() => getImmersiveChapters(locale), [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, copy, chapters }),
    [locale, setLocale, copy, chapters]
  );

  return <ImmersiveLocaleContext.Provider value={value}>{children}</ImmersiveLocaleContext.Provider>;
}

type PointerState = { x: number; y: number; active: boolean };

const ViewportPointerContext = createContext<PointerState>({ x: 0.5, y: 0.5, active: false });

function ViewportPointerProvider({ children }: { children: React.ReactNode }) {
  const [pointer, setPointer] = useState<PointerState>({ x: 0.5, y: 0.5, active: false });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPointer({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
        active: true,
      });
    };
    const onLeave = () => setPointer((p) => ({ ...p, active: false }));
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, []);
  return <ViewportPointerContext.Provider value={pointer}>{children}</ViewportPointerContext.Provider>;
}

function useViewportPointer() {
  return useContext(ViewportPointerContext);
}

function useActiveChapter(ids: readonly string[]) {
  const [active, setActive] = useState(ids[0] ?? "");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.5 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

function AtmosphericFilm() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[35] opacity-[0.04] mix-blend-multiply"
        aria-hidden
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-[36] shadow-[inset_0_0_100px_rgba(0,0,0,0.06)]"
        aria-hidden
      />
    </>
  );
}

function ImmersiveCursor({ reduceMotion }: { reduceMotion: boolean }) {
  const pointer = useViewportPointer();
  if (reduceMotion || !pointer.active) return null;
  return (
    <motion.div
      animate={{ left: `${pointer.x * 100}%`, top: `${pointer.y * 100}%` }}
      transition={{ type: "spring", stiffness: 140, damping: 20, mass: 0.45 }}
      className="pointer-events-none fixed z-[80] hidden h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-black/10 bg-[radial-gradient(circle,rgba(0,0,0,0.10),rgba(0,0,0,0.025)_38%,transparent_70%)] mix-blend-multiply lg:block"
    />
  );
}

function MagneticButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 280, damping: 20 });
  const sy = useSpring(y, { stiffness: 280, damping: 20 });

  return (
    <Link
      href={href}
      onMouseMove={(e) => {
        const rect = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
        x.set(((e.clientX - rect.left) / rect.width - 0.5) * 18);
        y.set(((e.clientY - rect.top) / rect.height - 0.5) * 18);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className="group relative inline-flex overflow-hidden border border-black bg-black px-6 py-4 text-[11px] uppercase tracking-[0.34em] text-white"
    >
      <motion.span style={{ x: sx, y: sy }} className="relative z-10">
        {children}
      </motion.span>
      <span className="absolute inset-0 bg-white opacity-0 transition group-hover:opacity-[0.08]" />
    </Link>
  );
}

function LanguageSwitcher() {
  const { locale, setLocale } = useImmersiveLocale();
  return (
    <div
      className="flex gap-0.5 border-l border-white/25 pl-3 md:pl-4"
      role="group"
      aria-label="Language"
    >
      {IMMERSIVE_LOCALES.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => setLocale(loc)}
          className={`min-w-[1.75rem] px-1 py-0.5 text-[10px] tracking-[0.2em] transition md:text-[11px] ${
            locale === loc ? "text-white" : "text-white/45 hover:text-white/85"
          }`}
        >
          {IMMERSIVE_LOCALE_LABEL[loc]}
        </button>
      ))}
    </div>
  );
}

function Header() {
  const { copy } = useImmersiveLocale();
  return (
    <header className="fixed left-0 right-0 top-0 z-50 mix-blend-difference pointer-events-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-6 lg:px-10">
        <div className="pointer-events-auto flex items-center gap-4 md:gap-5">
          <Link href="/" className="isolate flex items-center mix-blend-normal">
            <img
              src={FOOTER_MEDIA.logoWordmark}
              alt="Precisar"
              width={360}
              height={86}
              className="h-12 w-auto max-w-[min(72vw,360px)] object-contain object-left brightness-0 sm:h-14 md:h-16 lg:h-[4.5rem]"
              decoding="async"
            />
          </Link>
          <LanguageSwitcher />
        </div>
        <div className="pointer-events-auto flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-[10px] uppercase tracking-[0.28em] text-white/82 md:gap-x-8 md:text-[11px] md:tracking-[0.32em]">
          <Link href="/#programas" className="hidden sm:inline">
            {copy.nav.programas}
          </Link>
          <Link href="/#saberes" className="hidden sm:inline">
            {copy.nav.saberes}
          </Link>
          <Link href="/#precisando" className="hidden md:inline">
            {copy.nav.precisando}
          </Link>
          <Link href="/#participa" className="hidden md:inline">
            {copy.nav.participa}
          </Link>
          <Link href="/somos" className="text-white/60 transition hover:text-white">
            {copy.nav.somos}
          </Link>
        </div>
      </div>
    </header>
  );
}

function ProgressHUD({ active }: { active: string }) {
  const { chapters } = useImmersiveLocale();
  return (
    <div className="fixed bottom-8 right-6 top-24 z-40 hidden w-28 lg:block">
      <div className="relative h-full">
        <div className="absolute right-3 top-0 h-full w-px bg-black/10" />
        {chapters.map((chapter, index) => {
          const isActive = active === chapter.id;
          return (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className="absolute right-0 flex items-center gap-4"
              style={{ top: `${11 + index * 21}%` }}
            >
              <motion.div
                animate={{ opacity: isActive ? 1 : 0.28, x: isActive ? 0 : 10 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="text-[10px] uppercase tracking-[0.34em] text-black/55"
              >
                {chapter.label}
              </motion.div>
              <motion.div
                animate={{ scale: isActive ? 2.2 : 1, backgroundColor: isActive ? "#000" : "#fff" }}
                transition={{ duration: 0.35, ease: EASE }}
                className="h-2.5 w-2.5 rounded-full border border-black"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

function HeroConstellation({ reduceMotion }: { reduceMotion: boolean }) {
  const points = useMemo(
    () => Array.from({ length: 64 }, (_, i) => ({ id: i, x: (i * 19) % 100, y: (i * 31) % 100, s: (i % 4) + 1 })),
    []
  );
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70">
      {points.map((p) =>
        reduceMotion ? (
          <span
            key={p.id}
            className="absolute rounded-full bg-black/30"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.s * 2}px`,
              height: `${p.s * 2}px`,
            }}
          />
        ) : (
          <motion.span
            key={p.id}
            animate={{ y: [0, (p.id % 5) - 2, 0], opacity: [0.15, 0.45, 0.15] }}
            transition={{
              duration: 4 + (p.id % 4),
              repeat: Infinity,
              ease: "easeInOut",
              delay: p.id * 0.03,
            }}
            className="absolute rounded-full bg-black"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.s * 2}px`, height: `${p.s * 2}px` }}
          />
        )
      )}
    </div>
  );
}

function Hero({ reduceMotion }: { reduceMotion: boolean }) {
  const { copy } = useImmersiveLocale();
  const pointer = useViewportPointer();
  const glow = `radial-gradient(circle at ${pointer.x * 100}% ${pointer.y * 100}%, rgba(0,0,0,0.12), transparent 18%)`;
  return (
    <section className="relative overflow-x-clip border-b border-black/8 bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.12]" />
      <HeroConstellation reduceMotion={reduceMotion} />
      <div className="absolute inset-0" style={{ background: glow }} />
      {!reduceMotion ? (
        <motion.div
          animate={{ opacity: [0.15, 0.45, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(to_top,rgba(0,0,0,0.07),transparent)]"
        />
      ) : (
        <div className="absolute inset-x-0 bottom-0 h-36 bg-[linear-gradient(to_top,rgba(0,0,0,0.05),transparent)]" />
      )}
      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-6 pb-12 pt-28 lg:px-10 lg:pb-16 lg:pt-32">
        <div className="max-w-sm text-[11px] uppercase tracking-[0.38em] text-black/38">{copy.heroEyebrow}</div>

        <div className="mt-6 max-w-[1450px] sm:mt-9 lg:mt-11">
          <motion.div
            className="pt-2 pb-6 sm:pt-3 sm:pb-8"
            initial={reduceMotion ? false : { opacity: 0, y: 44 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.95, ease: EASE }}
          >
            <PotenciaRotatingHeadline reduceMotion={reduceMotion} surface="light" />
          </motion.div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.15, delay: reduceMotion ? 0 : 0.12, ease: EASE }}
            className="mt-8 max-w-2xl text-lg leading-8 text-black/56 md:text-xl"
          >
            {copy.heroLead}
          </motion.div>
        </div>

        <div className="flex flex-col gap-6 border-t border-black/10 pt-8 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <div className="max-w-xl text-base leading-7 text-black/46 lg:text-lg lg:leading-8">{copy.heroBottom}</div>
          <MagneticButton href="/#programas">{copy.heroCta}</MagneticButton>
        </div>
      </div>
    </section>
  );
}

function WhisperField({ words, right, reduceMotion }: { words: string[]; right: boolean; reduceMotion: boolean }) {
  return (
    <div className={`pointer-events-none absolute inset-0 ${right ? "text-right" : "text-left"}`}>
      {words.map((word, index) => {
        const cls = `absolute text-[10px] uppercase tracking-[0.36em] text-black/25 ${right ? "right-8" : "left-8"}`;
        const style = { top: `${16 + index * 11}%` } as const;
        if (reduceMotion) {
          return (
            <div key={word} className={cls} style={{ ...style, opacity: 0.14 }}>
              {word}
            </div>
          );
        }
        return (
          <motion.div
            key={word}
            animate={{ y: [0, (index % 3) * -12 - 6, 0], opacity: [0.08, 0.22, 0.08] }}
            transition={{ duration: 5 + index, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
            className={cls}
            style={style}
          >
            {word}
          </motion.div>
        );
      })}
    </div>
  );
}

function setPointerFromClient(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  setLocalPointer: React.Dispatch<React.SetStateAction<{ x: number; y: number; entered: boolean }>>
) {
  setLocalPointer({
    x: (clientX - rect.left) / rect.width,
    y: (clientY - rect.top) / rect.height,
    entered: true,
  });
}

function ChapterPanel({
  chapter,
  index,
  total,
  reduceMotion,
}: {
  chapter: ImmersiveChapter;
  index: number;
  total: number;
  reduceMotion: boolean;
}) {
  const { copy } = useImmersiveLocale();
  const ref = useRef<HTMLDivElement | null>(null);
  const [localPointer, setLocalPointer] = useState({ x: 0.5, y: 0.5, entered: false });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y = useTransform(scrollYProgress, [0, 0.24, 1], [320, 0, -16]);
  const scale = useTransform(scrollYProgress, [0, 0.24, 1], [0.94, 1, 0.998]);
  const opacity = useTransform(scrollYProgress, [0, 0.08, 1], [0.45, 1, 1]);
  const veilOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [1, 0.55, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.18, 1], [180, 0, -8]);
  const textY = useTransform(scrollYProgress, [0, 0.22, 1], [210, 0, -4]);
  const ghostY = useTransform(scrollYProgress, [0, 1], [180, -110]);
  const railScale = useTransform(scrollYProgress, [0, 0.22], [0, 1]);
  const panelClip = useTransform(scrollYProgress, [0, 0.16], ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]);
  const titleClip = useTransform(scrollYProgress, [0, 0.18], ["inset(100% 0 0 0)", "inset(0 0 0 0)"]);

  const right = chapter.align === "right";
  const glow = `radial-gradient(circle at ${localPointer.x * 100}% ${localPointer.y * 100}%, rgba(0,0,0,0.12), transparent 20%)`;

  const onPointerInPanel = useCallback(
    (clientX: number, clientY: number, el: HTMLDivElement) => {
      setPointerFromClient(clientX, clientY, el.getBoundingClientRect(), setLocalPointer);
    },
    []
  );

  return (
    <section id={chapter.id} ref={ref} className="relative h-[195svh] bg-white">
      <motion.div
        onMouseMove={(e) => onPointerInPanel(e.clientX, e.clientY, e.currentTarget as HTMLDivElement)}
        onMouseLeave={() => setLocalPointer((p) => ({ ...p, entered: false }))}
        onTouchMove={(e) => {
          const t = e.touches[0];
          if (!t) return;
          onPointerInPanel(t.clientX, t.clientY, e.currentTarget as HTMLDivElement);
        }}
        onTouchEnd={() => setLocalPointer((p) => ({ ...p, entered: false }))}
        style={{ y, scale, opacity, zIndex: total - index, clipPath: panelClip }}
        className="sticky top-0 h-[100svh] overflow-hidden border-y border-black/8 bg-white"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.022)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.022)_1px,transparent_1px)] bg-[size:88px_88px] opacity-[0.1]" />
        <WhisperField words={chapter.whisper} right={right} reduceMotion={reduceMotion} />
        <motion.div
          animate={{ opacity: localPointer.entered ? 1 : 0.5 }}
          className="absolute inset-0"
          style={{ background: glow }}
        />
        <motion.div style={{ opacity: veilOpacity }} className="absolute inset-0 bg-black" />

        <motion.div
          style={{ scaleY: railScale, transformOrigin: "top center", left: chapter.accentX }}
          className="absolute top-0 h-[55vh] w-px -translate-x-1/2 bg-black/18"
        />

        <motion.div
          style={{
            y: ghostY,
            x: reduceMotion ? 0 : (localPointer.x - 0.5) * (right ? -52 : 52),
          }}
          className={`absolute ${right ? "right-2 text-right lg:right-6" : "left-2 text-left lg:left-6"} top-1/2 -translate-y-1/2`}
        >
          <div className="text-[22vw] font-semibold leading-none tracking-[-0.13em] text-black/[0.03] lg:text-[19vw]">
            {chapter.label}
          </div>
        </motion.div>

        <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-between px-6 py-10 lg:px-10 lg:py-14">
          <div className="flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-[0.36em] text-black/34">
              {chapter.step} · {chapter.label}
            </div>
            <div className="hidden text-[11px] uppercase tracking-[0.3em] text-black/24 md:block">
              {copy.sceneWord} {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <motion.div
              style={{
                y: titleY,
                x: reduceMotion ? 0 : (localPointer.x - 0.5) * (right ? -22 : 22),
                clipPath: titleClip,
              }}
              className={right ? "lg:col-span-5 lg:order-2 lg:text-right" : "lg:col-span-9"}
            >
              <div className="text-[11px] uppercase tracking-[0.36em] text-black/34">{chapter.label}</div>
              <h2 className="mt-5 text-[17vw] font-semibold leading-[0.68] tracking-[-0.12em] text-black sm:text-[13vw] lg:text-[160px]">
                {chapter.title}
              </h2>
            </motion.div>
            <motion.div
              style={{
                y: textY,
                x: reduceMotion ? 0 : (localPointer.x - 0.5) * (right ? 14 : -14),
              }}
              className={right ? "lg:col-span-7 lg:order-1 lg:flex lg:items-end" : "lg:col-span-3 lg:flex lg:items-end"}
            >
              <p className={`max-w-xl text-lg leading-8 text-black/56 md:text-xl ${right ? "lg:text-left" : ""}`}>
                {chapter.text}
              </p>
            </motion.div>
          </div>

          <div className="grid gap-8 border-t border-black/10 pt-8 lg:grid-cols-12 lg:items-end">
            <div className={right ? "lg:col-span-4 lg:order-2 lg:flex lg:justify-end" : "lg:col-span-4 lg:flex lg:justify-end"}>
              <MagneticButton href={chapter.href}>{chapter.cta}</MagneticButton>
            </div>
            <div className={right ? "lg:col-span-8 lg:order-1" : "lg:col-span-8"}>
              <div
                className={`max-w-3xl text-base leading-7 text-black/48 lg:text-lg lg:leading-8 ${right ? "lg:ml-auto lg:text-right" : ""}`}
              >
                {chapter.text}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Chapters({ reduceMotion }: { reduceMotion: boolean }) {
  const { chapters } = useImmersiveLocale();
  return (
    <>
      {chapters.map((chapter, index) => (
        <ChapterPanel
          key={chapter.id}
          chapter={chapter}
          index={index}
          total={chapters.length}
          reduceMotion={reduceMotion}
        />
      ))}
    </>
  );
}

const CHAPTER_FREQ: Record<string, number> = Object.fromEntries(
  CHAPTER_IDS.map((id, i) => [id, 196 + i * 28])
);

function ImmersiveAmbience({ activeId, enabled }: { activeId: string; enabled: boolean }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const prevRef = useRef<string | null>(null);

  useEffect(() => {
    if (!enabled) {
      prevRef.current = null;
      return;
    }
    if (!activeId) return;
    if (prevRef.current === activeId) return;
    prevRef.current = activeId;

    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = ctxRef.current ?? new AudioContextClass();
    ctxRef.current = ctx;
    if (ctx.state === "suspended") void ctx.resume();

    const freq = CHAPTER_FREQ[activeId] ?? 220;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 420;
    osc.type = "sine";
    osc.frequency.value = freq;
    osc.connect(filter);
    filter.connect(g);
    g.connect(ctx.destination);

    const t0 = ctx.currentTime;
    g.gain.setValueAtTime(0, t0);
    g.gain.linearRampToValueAtTime(0.028, t0 + 0.03);
    g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.22);

    osc.start(t0);
    osc.stop(t0 + 0.24);

    return () => {
      try {
        osc.disconnect();
        filter.disconnect();
        g.disconnect();
      } catch {
        /* noop */
      }
    };
  }, [activeId, enabled]);

  return null;
}

function SoundToggle({
  on,
  onToggle,
  reduceMotion,
  labelOn,
  labelOff,
}: {
  on: boolean;
  onToggle: () => void;
  reduceMotion: boolean;
  labelOn: string;
  labelOff: string;
}) {
  if (reduceMotion) return null;
  return (
    <button
      type="button"
      onClick={onToggle}
      className="pointer-events-auto fixed bottom-6 left-6 z-[85] border border-black/15 bg-white/90 px-4 py-2.5 text-[10px] uppercase tracking-[0.32em] text-black/55 shadow-sm backdrop-blur-sm transition hover:border-black/30 hover:text-black"
    >
      {on ? labelOn : labelOff}
    </button>
  );
}

function ImmersiveInner() {
  const reduceMotion = useReducedMotion() ?? false;
  const active = useActiveChapter(CHAPTER_IDS);
  const [soundOn, setSoundOn] = useState(false);
  const { copy } = useImmersiveLocale();

  return (
    <div className="min-h-screen bg-white text-black">
      <AtmosphericFilm />
      <ImmersiveCursor reduceMotion={reduceMotion} />
      <SoundToggle
        on={soundOn}
        onToggle={() => setSoundOn((v) => !v)}
        reduceMotion={reduceMotion}
        labelOn={copy.soundOn}
        labelOff={copy.soundOff}
      />
      <ImmersiveAmbience activeId={active} enabled={soundOn} />
      <Header />
      <ProgressHUD active={active} />
      <Hero reduceMotion={reduceMotion} />
      <Chapters reduceMotion={reduceMotion} />
      {/* El cierre del sitio (logo, newsletter, mapa, contacto, legal, WhatsApp) es el <SiteFooter /> global en SiteChrome. */}
    </div>
  );
}

export default function PrecisarInteractivePanelsSitePreview() {
  return (
    <ViewportPointerProvider>
      <ImmersiveLocaleProvider>
        <ImmersiveInner />
      </ImmersiveLocaleProvider>
    </ViewportPointerProvider>
  );
}
