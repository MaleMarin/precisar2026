import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from "react";
import layers from "./LiquidGlassLayers.module.css";
import field from "./GlassField.module.css";

export type GlassTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: ReactNode;
  hint?: ReactNode;
  error?: boolean;
};

export const GlassTextarea = forwardRef<HTMLTextAreaElement, GlassTextareaProps>(
  function GlassTextarea({ label, hint, error, className, id, ...rest }, ref) {
    const uid = useId();
    const tid = id ?? (typeof rest.name === "string" && rest.name ? rest.name : `lg-ta-${uid}`);

    return (
      <div className={[field.wrap, error ? field.error : ""].filter(Boolean).join(" ")}>
        {label ? (
          <label className={field.label} htmlFor={tid}>
            {label}
          </label>
        ) : null}
        <div className={[layers.shell, layers.shellSm, field.inputShell].join(" ")}>
          <div className={[layers.plate, layers.plateSm, field.inputPlate].join(" ")}>
            <div className={[layers.plateInner, field.textareaInner].join(" ")}>
              <textarea
                ref={ref}
                id={tid}
                className={[field.field, field.fieldTextarea, className].filter(Boolean).join(" ")}
                {...rest}
              />
            </div>
          </div>
        </div>
        {hint ? <p className={field.hint}>{hint}</p> : null}
      </div>
    );
  },
);
