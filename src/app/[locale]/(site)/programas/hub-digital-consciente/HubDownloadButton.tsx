"use client"

export function HubDownloadButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      style={{
        alignSelf: "flex-start",
        marginBottom: "1.5rem",
        padding: "14px 24px",
        border: "none",
        borderRadius: "4px",
        background: "#DB5227",
        color: "#F5F2EC",
        fontFamily: '"Avenir Next", "Avenir", sans-serif',
        fontSize: "12px",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: "pointer",
      }}
    >
      Descargar información completa ↓
    </button>
  )
}
