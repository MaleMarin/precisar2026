"use client";

import { usePathname } from "@/i18n/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./SiteChrome.module.css";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudioHome = pathname === "/cinematic" || pathname === "/atelier";
  const isSaberesClic = pathname.includes("/saberes/clic");
  const isCulturaDigital = pathname.includes("/culturadigital");
  const isHome = pathname === "/" || pathname === "";
  const usePageInner = !isStudioHome && !isHome && !isSaberesClic;

  const chromeCls = [styles.chrome, isSaberesClic ? styles.chromeSaberesClicScroll : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={chromeCls}>
      {!isStudioHome && !isSaberesClic ? <SiteHeader /> : null}
      <main
        className={
          isStudioHome
            ? styles.mainHome
            : isSaberesClic
              ? styles.mainSaberesClicFlow
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
