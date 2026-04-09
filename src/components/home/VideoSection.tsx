import type { ReactNode } from "react";
import styles from "./VideoSection.module.css";

export type VideoSectionProps = {
  /** URL del video MP4 (obligatorio si hay video). */
  srcMp4: string;
  srcWebm?: string;
  /** Imagen WebP (u otro) visible en viewport estrecho en lugar del video. */
  mobileSrc: string;
  poster?: string;
  children?: ReactNode;
  className?: string;
};

/**
 * Video a pantalla con contenido superpuesto; en móvil muestra `mobileSrc`.
 */
export function VideoSection({
  srcMp4,
  srcWebm,
  mobileSrc,
  poster,
  children,
  className,
}: VideoSectionProps) {
  const rootClass = className ? `${styles.root} ${className}` : styles.root;

  return (
    <section className={rootClass}>
      <div className={styles.mediaLayer}>
        <video
          className={styles.video}
          autoPlay
          muted
          playsInline
          loop
          poster={poster ?? mobileSrc}
          aria-hidden
        >
          {srcWebm ? <source src={srcWebm} type="video/webm" /> : null}
          <source src={srcMp4} type="video/mp4" />
        </video>
        { }
        <img
          className={styles.poster}
          src={mobileSrc}
          alt=""
          decoding="async"
        />
      </div>
      <div className={styles.overlayChildren}>
        <div className={styles.scrim} aria-hidden />
        <div className={styles.childrenSlot}>{children}</div>
      </div>
    </section>
  );
}
