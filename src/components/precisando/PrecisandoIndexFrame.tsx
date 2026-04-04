import type { ReactNode } from "react";

/** Misma rejilla editorial que el índice principal: carril + panel. */
export function PrecisandoIndexFrame({
  rail,
  children,
}: {
  rail: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="overflow-hidden border border-[var(--border)] lg:grid lg:grid-cols-12 lg:gap-0">
      <div className="prec-precisando-rail px-6 py-12 md:px-8 md:py-16 lg:col-span-5 lg:px-10 lg:py-20">
        {rail}
      </div>
      <div className="border-t border-[var(--border)] bg-[var(--elevated)] px-6 py-10 md:px-10 md:py-14 lg:col-span-7 lg:border-l lg:border-t-0">
        {children}
      </div>
    </div>
  );
}
