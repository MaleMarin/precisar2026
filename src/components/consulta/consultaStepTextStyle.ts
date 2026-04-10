/**
 * Estilos en línea para copy del paso: el tema del mapa vivo hereda tinta clara sobre panel claro
 * y el CSS del módulo a veces pierde frente a otras hojas. `style` garantiza contraste.
 * Paleta consulta: en superficie clara, títulos Royal Purple y cuerpo Carbon Black.
 */
export const consultaStepTextStyle = {
  eyebrow: {
    color: "rgba(96, 69, 244, 0.88)",
    WebkitTextFillColor: "rgba(96, 69, 244, 0.88)",
  } as const,
  prompt: {
    color: "#6045F4",
    WebkitTextFillColor: "#6045F4",
  } as const,
  helper: {
    color: "rgba(15, 20, 23, 0.88)",
    WebkitTextFillColor: "rgba(15, 20, 23, 0.88)",
  } as const,
  capHint: {
    color: "rgba(15, 20, 23, 0.62)",
    WebkitTextFillColor: "rgba(15, 20, 23, 0.62)",
  } as const,
};
