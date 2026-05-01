export const COLORES_CURSO: Record<string, string> = {
  'antes-de-compartir': '#E8342A',
  'quien-hablo': '#7E84E8',
  'el-que-mas-grita': '#FF0066',
  'salud-sin-panico': '#2EA8E6',
  'grupo-de-profes': '#00D96F',
  'mis-datos-mi-decision': '#FF6A00',
  'clima-sin-catastrofe': '#FFD400',
  'cuentame-sin-asustarme': '#3037D8',
}

export function getColorCurso(courseId: string): string {
  return COLORES_CURSO[courseId] || '#E8342A'
}
