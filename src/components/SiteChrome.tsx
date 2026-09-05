"use client";

import type { MouseEvent } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./SiteChrome.module.css";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const tNav = useTranslations("nav");
  const isStudioHome = pathname === "/cinematic" || pathname === "/atelier";
  const isCulturaDigital = pathname.includes("/culturadigital");
  const isHome = pathname === "/" || pathname === "";
  const usePageInner = !isStudioHome && !isHome;

  const onSkipToContent = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = document.getElementById("contenido-principal");
    if (!target) return;
    e.preventDefault();
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "start" });
  };

  return (
    <div className={styles.chrome}>
      <a href="#contenido-principal" className={styles.skipLink} onClick={onSkipToContent}>
        {tNav("skipToContent")}
      </a>
      {!isStudioHome ? <SiteHeader /> : null}
      <main
        id="contenido-principal"
        tabIndex={-1}
        className={
          isStudioHome
            ? styles.mainHome
            : [styles.mainDefault, isCulturaDigital ? styles.mainCulturaDigital : ""].filter(Boolean).join(" ")
        }
      >
        {usePageInner ? (
          <div className="mx-auto w-full min-w-0 max-w-screen-xl px-4 sm:px-6 lg:px-8">{children}</div>
        ) : (
          children
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
