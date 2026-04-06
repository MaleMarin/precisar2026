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
    <div className="overflow-hidden rounded-sm border border-[var(--border)] bg-[var(--elevated)] shadow-[var(--shadow-card)] lg:grid lg:grid-cols-12 lg:gap-0">
      <div className="prec-precisando-rail px-6 py-10 md:px-8 md:py-12 lg:col-span-5 lg:px-9 lg:py-14">
        {rail}
      </div>
      <div className="border-t border-[var(--border)] bg-[var(--elevated)] px-6 py-9 md:px-10 md:py-12 lg:col-span-7 lg:border-l lg:border-t-0">
        {children}
      </div>
    </div>
  );
}
