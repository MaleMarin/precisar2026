"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import styles from "./SiteChrome.module.css";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudioHome = pathname === "/cinematic" || pathname === "/atelier";
  const isCulturaDigital = pathname.includes("/culturadigital");

  return (
    <div className={styles.chrome}>
      {!isStudioHome ? <SiteHeader /> : null}
      <main
        className={
          isStudioHome
            ? styles.mainHome
            : [styles.mainDefault, isCulturaDigital ? styles.mainCulturaDigital : ""].filter(Boolean).join(" ")
        }
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
