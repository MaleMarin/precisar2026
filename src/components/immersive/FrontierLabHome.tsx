"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";
import type { LabMouseRef } from "./WebGLBackground";
import styles from "./FrontierLabHome.module.css";

const WebGLBackground = dynamic(() => import("./WebGLBackground"), { ssr: false });

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BRAND = "Atelier";

const HERO_LINES = [
  ["Donde", "la", "luz"],
  ["se", "detiene", "y", "habita"],
] as const;

const GALLERY = [
  { title: "I · Respiro", meta: "Forma y vacío" },
  { title: "II · Tensión", meta: "Equilibrio inestable" },
  { title: "III · Eco", meta: "Memoria del gesto" },
] as const;

const H_SLIDES = [
  {
    n: "01",
    title: "Ritmo",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit — el scroll aquí no libera, conduce.",
  },
  {
    n: "02",
    title: "Materia",
    body: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
  },
  {
    n: "03",
    title: "Superficie",
    body: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium.",
  },
  {
    n: "04",
    title: "Horizonte",
    body: "Omnis enim res quæ dolor opposita est dilatatur, si crescere potest, augebitur.",
  },
] as const;

const NAV = [
  { href: "#a-galeria", label: "Galería" },
  { href: "#a-horizonte", label: "Horizonte" },
  { href: "#a-canto", label: "Canto" },
  { href: "#a-fin", label: "Fin" },
] as const;

export function FrontierLabHome() {
  const progressRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 }) as LabMouseRef;
  const mainRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [webglOn, setWebglOn] = useState(false);

  useLayoutEffect(() => {
    queueMicrotask(() => {
      setWebglOn(!prefersReducedMotion);
    });
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!webglOn) return;
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [webglOn]);

  useLayoutEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const ctx = gsap.context(() => {
      if (webglOn) {
        ScrollTrigger.create({
          trigger: main,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onUpdate: (self) => {
            progressRef.current = self.progress;
          },
        });
      }

      if (webglOn) {
        const words = main.querySelectorAll("[data-hero-word]");
        if (words.length) {
          gsap.from(words, {
            yPercent: 118,
            opacity: 0,
            duration: 1.35,
            stagger: 0.05,
            ease: "power4.out",
            delay: 0.12,
          });
        }
      }

      const track = trackRef.current;
      const pin = pinRef.current;
      if (webglOn && track && pin) {
        const scrollW = () => Math.max(0, track.scrollWidth - window.innerWidth);
        gsap.to(track, {
          x: () => -scrollW(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${scrollW()}`,
            pin: true,
            scrub: 0.72,
            invalidateOnRefresh: true,
          },
        });
      }

      const panels = gsap.utils.toArray<HTMLElement>("[data-lab-panel]");
      panels.forEach((panel) => {
        if (panel.id === "lab-hero") return;
        const targets = panel.querySelectorAll("[data-lab-animate]");
        if (targets.length === 0) return;
        gsap.from(targets, {
          immediateRender: false,
          scrollTrigger: {
            trigger: panel,
            scroller: document.documentElement,
            start: "top 86%",
            toggleActions: "play none none reverse",
          },
          y: 56,
          opacity: 0,
          duration: 1,
          stagger: 0.07,
          ease: "power3.out",
        });
      });
    }, main);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(() => requestAnimationFrame(refresh));

    return () => ctx.revert();
  }, [webglOn]);

  return (
    <div className={styles.shell}>
      {webglOn ? (
        <WebGLBackground progressRef={progressRef} mouseRef={mouseRef} />
      ) : (
        <div className={styles.fallbackBg} aria-hidden />
      )}
      <div className={styles.noise} aria-hidden />
      <div className={styles.gridLines} aria-hidden />

      <header className={styles.topBar}>
        <Link href="/" className={styles.brand}>
          {BRAND}
        </Link>
        <nav className={styles.nav} aria-label="Secciones">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
          <Link href="/" className={`${styles.navLink} ${styles.navCta}`}>
            Inicio inmersivo
          </Link>
        </nav>
      </header>

      <main ref={mainRef} className={styles.main}>
        <section className={styles.hero} id="lab-hero">
          <div className={styles.heroMain}>
            <p className={styles.heroEyebrow}>Experiencia digital · laboratorio</p>
            <h1 className={styles.heroTitle}>
              {HERO_LINES.map((line, lineIdx) => (
                <span key={String(lineIdx)} className={styles.heroTitleRow}>
                  <span className={styles.heroTitleRowInner}>
                    {line.map((word, wIdx) => (
                      <span
                        key={`${lineIdx}-${wIdx}`}
                        className={styles.heroWord}
                        data-hero-word
                      >
                        {word}
                      </span>
                    ))}
                  </span>
                </span>
              ))}
            </h1>
            <p className={styles.heroLead}>
              Una pieza pensada como galería: tipografía serif, luz cálida, escultura digital suave y
              scroll coreografiado. Nada de ruido innecesario — solo presencia, ritmo y detalle.
            </p>
            <div className={styles.ctaRow}>
              <a href="#a-galeria" className={styles.ctaPrimary}>
                Recorrer
              </a>
              <Link href="/" className={styles.ctaGhost}>
                Capítulos
              </Link>
            </div>
          </div>
          <aside className={styles.heroAside}>
            <p className={styles.vine}>
              El silencio también es una forma del sonido.
            </p>
            <span className={styles.vineSource}>Notas de estudio · MMXXVI</span>
          </aside>
        </section>

        <div className={styles.rule}>
          <span className={styles.ruleLine} aria-hidden />
          <span className={styles.ruleText}>Lente · tiempo · materia</span>
          <span className={styles.ruleLine} aria-hidden />
        </div>

        <section className={styles.statement} id="a-statement" data-lab-panel>
          <div className={styles.statementInner}>
            <div className={styles.statementMark} aria-hidden>
              “
            </div>
            <p className={styles.statementText} data-lab-animate>
              Lo esencial es invisible a la prisa.
            </p>
          </div>
        </section>

        <section className={styles.gallerySection} id="a-galeria" data-lab-panel>
          <div className={styles.sectionHead}>
            <p className={styles.sectionEyebrow} data-lab-animate>
              Colección
            </p>
            <h2 className={styles.sectionTitle} data-lab-animate>
              Tres piezas, tres pesos en el espacio
            </h2>
          </div>
          <div className={styles.gallery}>
            {GALLERY.map((item) => (
              <article key={item.title} className={styles.galleryCard} data-lab-animate>
                <div className={styles.galleryFrame} />
                <div className={styles.galleryBody}>
                  <h3 className={styles.galleryCardTitle}>{item.title}</h3>
                  <p className={styles.galleryCardMeta}>{item.meta}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {webglOn ? (
          <section
            ref={pinRef}
            className={styles.horizontalPin}
            id="a-horizonte"
            data-lab-panel
          >
            <div ref={trackRef} className={styles.horizontalTrack}>
              {H_SLIDES.map((s) => (
                <div key={s.n} className={styles.horizontalSlide}>
                  <div>
                    <div className={styles.horizontalSlideNum}>{s.n}</div>
                    <h3 className={styles.horizontalSlideTitle}>{s.title}</h3>
                  </div>
                  <p className={styles.horizontalSlideText}>{s.body}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className={styles.horizontalFallback} id="a-horizonte" data-lab-panel>
            {H_SLIDES.map((s) => (
              <div key={s.n} className={styles.horizontalSlide}>
                <div>
                  <div className={styles.horizontalSlideNum}>{s.n}</div>
                  <h3 className={styles.horizontalSlideTitle}>{s.title}</h3>
                </div>
                <p className={styles.horizontalSlideText}>{s.body}</p>
              </div>
            ))}
          </section>
        )}

        <section className={styles.canto} id="a-canto" data-lab-panel>
          <p className={styles.sectionEyebrow} data-lab-animate>
            Canto
          </p>
          <h2 className={styles.sectionTitle} data-lab-animate>
            Texto que respira
          </h2>
          <p className={styles.body} data-lab-animate>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
            consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
            est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
          </p>
          <p className={styles.pull} data-lab-animate>
            Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.
          </p>
        </section>

        <footer className={styles.colophon} id="a-fin" data-lab-panel>
          <h2 className={styles.colophonTitle} data-lab-animate>
            Gratia subtilitas
          </h2>
          <Link href="/" className={styles.colophonLink} data-lab-animate>
            Ir al inicio inmersivo
          </Link>
        </footer>
      </main>
    </div>
  );
}
