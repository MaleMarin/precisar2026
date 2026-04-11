"use client";

import { useState } from "react";
import {
  GlassBadge,
  GlassButton,
  GlassInput,
  GlassOptionPill,
  GlassPanel,
  GlassProgressBar,
  GlassStepCard,
  GlassTextarea,
  LiquidGlassRoot,
} from "@/components/ui/glass";
import styles from "./GlassPreviewPage.module.css";

const PILL_OPTIONS = [
  { id: "a", label: "Primera opción" },
  { id: "b", label: "Segunda opción" },
  { id: "c", label: "Tercera opción" },
  { id: "d", label: "Cuarta opción" },
] as const;

export default function DevGlassPreviewPage() {
  const [pillSelected, setPillSelected] = useState<string>("b");
  const [stepPill, setStepPill] = useState<string | null>(null);

  return (
    <LiquidGlassRoot className={styles.root}>
      <div className={styles.inner}>
        <section className={styles.section} aria-labelledby="glass-demo-hero">
          <p className={styles.sectionLabel} id="glass-demo-hero">
            Hero demo
          </p>
          <GlassPanel padding="lg" radius="xl" accent="electric">
            <h1 className={styles.heroPanelTitle}>¿Cómo te informas hoy?</h1>
            <p className={styles.heroPanelLead}>Menos ruido, más criterio.</p>
            <p className={styles.heroPanelBody}>
              Entre titulares, audios, redes y mensajes, todos nos informamos y tomamos decisiones cada día.
              Queremos entender cómo lo haces tú.
            </p>
          </GlassPanel>
        </section>

        <section className={styles.section} aria-labelledby="glass-demo-buttons">
          <p className={styles.sectionLabel} id="glass-demo-buttons">
            Botones
          </p>
          <div className={styles.row}>
            <GlassButton variant="primary">Primary</GlassButton>
            <GlassButton variant="default">Default</GlassButton>
            <GlassButton variant="ghost">Ghost</GlassButton>
            <GlassButton variant="danger">Danger</GlassButton>
          </div>
          <div className={styles.row}>
            <GlassButton variant="primary" disabled>
              Primary disabled
            </GlassButton>
            <GlassButton variant="default" disabled>
              Default disabled
            </GlassButton>
            <GlassButton variant="ghost" disabled>
              Ghost disabled
            </GlassButton>
            <GlassButton variant="danger" disabled>
              Danger disabled
            </GlassButton>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="glass-demo-badges">
          <p className={styles.sectionLabel} id="glass-demo-badges">
            Badges
          </p>
          <div className={styles.rowTight}>
            <GlassBadge variant="neutral">Anónima</GlassBadge>
            <GlassBadge variant="electric">Breve</GlassBadge>
            <GlassBadge variant="violet">Sin respuestas correctas</GlassBadge>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="glass-demo-pills">
          <p className={styles.sectionLabel} id="glass-demo-pills">
            Pills de opción
          </p>
          <p className={styles.panelSampleText}>
            Idle / hover (nativo) / seleccionado / deshabilitado.
          </p>
          <div className={styles.rowTight}>
            {PILL_OPTIONS.map((opt, i) => (
              <GlassOptionPill
                key={opt.id}
                selected={pillSelected === opt.id}
                onClick={() => setPillSelected(opt.id)}
                disabled={i === 3}
              >
                {opt.label}
                {i === 3 ? " · disabled" : ""}
              </GlassOptionPill>
            ))}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="glass-demo-fields">
          <p className={styles.sectionLabel} id="glass-demo-fields">
            Campos
          </p>
          <GlassInput
            name="demo-input"
            label="Etiqueta de campo"
            placeholder="Escribí algo breve para probar foco y placa…"
            hint="Hint secundario en tono apagado."
            autoComplete="off"
          />
          <GlassTextarea
            name="demo-textarea"
            label="Área de texto"
            placeholder="Varias líneas. Mismo material, misma luz."
            rows={4}
            hint="Resize vertical permitido."
          />
        </section>

        <section className={styles.section} aria-labelledby="glass-demo-step">
          <p className={styles.sectionLabel} id="glass-demo-step">
            Step card
          </p>
          <GlassStepCard step={2} title="¿Por dónde te informas más en este momento?">
            <p className={styles.panelSampleText}>
              Elige una opción para ver estado y contraste sobre la tarjeta.
            </p>
            <div className={styles.stepOptions}>
              <GlassOptionPill selected={stepPill === "1"} onClick={() => setStepPill("1")}>
                Opción uno
              </GlassOptionPill>
              <GlassOptionPill selected={stepPill === "2"} onClick={() => setStepPill("2")}>
                Opción dos
              </GlassOptionPill>
              <GlassOptionPill selected={stepPill === "3"} onClick={() => setStepPill("3")}>
                Opción tres
              </GlassOptionPill>
            </div>
            <p className={styles.stepHint}>Sin iconos. Solo material, tipo y estado.</p>
          </GlassStepCard>
        </section>

        <section className={styles.section} aria-labelledby="glass-demo-progress">
          <p className={styles.sectionLabel} id="glass-demo-progress">
            Progress
          </p>
          <div className={styles.progressStack}>
            <GlassProgressBar label="Progreso 0%" value={0} />
            <GlassProgressBar label="Progreso 25%" value={25} />
            <GlassProgressBar label="Progreso 63%" value={63} />
            <GlassProgressBar label="Progreso 100%" value={100} />
            <GlassProgressBar label="Indeterminado" indeterminate showValue={false} />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="glass-demo-panels">
          <p className={styles.sectionLabel} id="glass-demo-panels">
            Variantes de panel
          </p>
          <div className={styles.panelGrid}>
            <GlassPanel padding="md" accent="electric">
              <p className={styles.panelSampleTitle}>Accent electric</p>
              <p className={styles.panelSampleText}>
                Borde y halo fríos. Reflejo contenido, sin relleno plano chillón.
              </p>
            </GlassPanel>
            <GlassPanel padding="md" accent="warm">
              <p className={styles.panelSampleTitle}>Accent warm</p>
              <p className={styles.panelSampleText}>
                Profundidad cálida en el contorno. Misma placa, otra lectura de luz.
              </p>
            </GlassPanel>
            <GlassPanel padding="sm" radius="md">
              <p className={styles.panelSampleTitle}>Dense</p>
              <p className={styles.panelSampleText}>
                Radio y padding reducidos. Más tensión, menos aire.
              </p>
            </GlassPanel>
            <GlassPanel padding="lg" radius="xl">
              <p className={styles.panelSampleTitle}>Hero panel</p>
              <p className={styles.heroPanelBody}>
                Superficie amplia para titulares o bloques principales. Sombra larga, placa estable.
              </p>
            </GlassPanel>
          </div>
        </section>
      </div>
    </LiquidGlassRoot>
  );
}
