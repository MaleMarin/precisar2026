import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import layers from "./LiquidGlassLayers.module.css";
import field from "./GlassField.module.css";

export type GlassInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: boolean;
};

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(function GlassInput(
  { label, hint, error, className, id, ...rest },
  ref,
) {
  const uid = useId();
  const inputId = id ?? (typeof rest.name === "string" && rest.name ? rest.name : `lg-in-${uid}`);

  return (
    <div className={[field.wrap, error ? field.error : ""].filter(Boolean).join(" ")}>
      {label ? (
        <label className={field.label} htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      <div className={[layers.shell, layers.shellSm, field.inputShell].join(" ")}>
        <div className={[layers.plate, layers.plateSm, field.inputPlate].join(" ")}>
          <div className={[layers.plateInner, field.innerPad].join(" ")}>
            <input
              ref={ref}
              id={inputId}
              className={[field.field, className].filter(Boolean).join(" ")}
              {...rest}
            />
          </div>
        </div>
      </div>
      {hint ? <p className={field.hint}>{hint}</p> : null}
    </div>
  );
});
