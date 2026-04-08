"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ConsultaLiveMapCanvas, type ConsultaLiveMapHandle } from "./ConsultaLiveMapCanvas";
import styles from "./ConsultaLiveMap.module.css";

type PulseApi = {
  pulseOnAnswer: () => void;
  pulseOnSelect: () => void;
};

const defaultApi: PulseApi = {
  pulseOnAnswer: () => {},
  pulseOnSelect: () => {},
};

const ConsultaLivePulseContext = createContext<PulseApi>(defaultApi);

export function useConsultaLivePulse(): PulseApi {
  return useContext(ConsultaLivePulseContext);
}

export function ConsultaLiveMapProvider({ children }: { children: ReactNode }) {
  const mapRef = useRef<ConsultaLiveMapHandle>(null);
  const lastSoftRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const pulseOnAnswer = useCallback(() => {
    mapRef.current?.burst(14);
  }, []);

  const pulseOnSelect = useCallback(() => {
    const now = performance.now();
    if (now - lastSoftRef.current < 320) return;
    lastSoftRef.current = now;
    mapRef.current?.burst(4);
  }, []);

  const value = useMemo(() => ({ pulseOnAnswer, pulseOnSelect }), [pulseOnAnswer, pulseOnSelect]);

  const mapPortal =
    mounted &&
    createPortal(
      <div className={styles.portalMount} data-consulta-live-map-portal>
        <ConsultaLiveMapCanvas ref={mapRef} />
        <div className={styles.badge} role="status">
          <span className={styles.pulseDot} aria-hidden />
          En vivo · LATAM
        </div>
      </div>,
      document.body,
    );

  return (
    <ConsultaLivePulseContext.Provider value={value}>
      {mapPortal}
      {children}
    </ConsultaLivePulseContext.Provider>
  );
}
