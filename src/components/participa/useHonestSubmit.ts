"use client";

import { useEffect, useRef, useState } from "react";

/** Candado, estado de carga y foco al error: mismo criterio que los formularios del pie. */
export function useHonestSubmit() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lockRef = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!error) return;
    const node = statusRef.current;
    if (!node) return;
    queueMicrotask(() => node.focus());
  }, [error]);

  const start = () => {
    if (lockRef.current || submitting) return false;
    lockRef.current = true;
    setSubmitting(true);
    setError(null);
    return true;
  };

  const fail = (message: string) => {
    setError(message);
    lockRef.current = false;
    setSubmitting(false);
  };

  const succeed = () => {
    /* El candado sigue activo para no disparar otro envío mientras se confirma. */
  };

  return { submitting, error, statusRef, start, fail, succeed };
}
