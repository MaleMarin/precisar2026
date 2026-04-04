import Link from "next/link";
import { EXTERNAL, HOME_HERO_MEDIA, homeHeroHasVideo, SITE } from "@/lib/site";
import styles from "./PrecisarHeroLegacy.module.css";

/**
 * Hero de inicio: capa opcional de video (env) + tipografía PDS.
 * El embed de Wix u otro iframe puede colocarse dentro de `.mediaLayer` si lo reemplazas.
 */
export function PrecisarHeroLegacy() {
  const hasVideo = homeHeroHasVideo();

  return (
    <section id="precisar-hero-legacy" aria-label="Inicio" className={styles.section}>
      {hasVideo ? (
        <div className={styles.mediaLayer} aria-hidden>
          <video
            className={styles.video}
            autoPlay
            muted
            playsInline
            loop
            poster={HOME_HERO_MEDIA.poster ?? undefined}
          >
            {HOME_HERO_MEDIA.videoWebm ? (
              <source src={HOME_HERO_MEDIA.videoWebm} type="video/webm" />
            ) : null}
            {HOME_HERO_MEDIA.videoMp4 ? (
              <source src={HOME_HERO_MEDIA.videoMp4} type="video/mp4" />
            ) : null}
          </video>
          <div className={styles.mediaScrim} />
        </div>
      ) : null}

      <div className={styles.inner}>
        <p className={styles.kicker}>{SITE.name}</p>
        <h1 className={styles.title}>{SITE.tagline}</h1>
        {hasVideo ? null : (
          <p className={styles.lead}>
            El video del hero aún no está enlazado. Añade en{" "}
            <code className={styles.code}>.env.local</code> las variables{" "}
            <code className={styles.code}>NEXT_PUBLIC_PRECISAR_HERO_MP4</code> (obligatoria para
            activar el video), y opcionalmente{" "}
            <code className={styles.code}>NEXT_PUBLIC_PRECISAR_HERO_WEBM</code> y{" "}
            <code className={styles.code}>NEXT_PUBLIC_PRECISAR_HERO_POSTER</code>. Los archivos
            pueden vivir en <code className={styles.code}>public/media/</code> (ej.{" "}
            <code className={styles.code}>/media/hero.mp4</code>).
          </p>
        )}
        <div className={styles.actions}>
          <Link href={EXTERNAL.botOnda} className={styles.btnPrimary}>
            Bot Onda
          </Link>
          <Link href="/#precisar-main" className={styles.btnGhost}>
            Continuar
          </Link>
        </div>
      </div>
    </section>
  );
}
