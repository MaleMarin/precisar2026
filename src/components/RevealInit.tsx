"use client";

import { usePathname } from "next/navigation";
import { useRevealAnimations } from "@/hooks/useRevealAnimations";

export function RevealInit() {
  const pathname = usePathname();
  useRevealAnimations(pathname);
  return null;
}
