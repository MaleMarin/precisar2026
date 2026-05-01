'use client'

import { useEffect, useRef } from 'react'

export type EstadoPersonaje =
  | 'saluda'
  | 'celebra'
  | 'sorpresa'
  | 'curioso'
  | 'explica'
  | 'anima'
  | 'aprueba'
  | 'escucha'
  | 'despide'

export const FRASES_PERSONAJE: Record<EstadoPersonaje, string> = {
  saluda: '¡Hola! Empecemos juntos.',
  celebra: '¡Excelente! Completaste el paso.',
  sorpresa: '¡Ojo! Este dato es importante.',
  curioso: '¿Lo habías pensado antes?',
  explica: 'Mira esto — te ayuda a entender.',
  anima: '¡Tú puedes, sigue adelante!',
  aprueba: '¡Sí! Eso es exactamente.',
  escucha: 'Te escucho. Cuando quieras.',
  despide: '¡Hasta pronto! Fue un gusto.',
}

/** Mapeo del número de paso del contenido (0–8) al estado del guía */
export function estadoGuiaPorNumeroPaso(numero: number): EstadoPersonaje {
  if (numero === 0) return 'saluda'
  if (numero >= 1 && numero <= 3) return 'explica'
  if (numero === 4) return 'sorpresa'
  if (numero === 5) return 'curioso'
  if (numero === 6 || numero === 7) return 'escucha'
  if (numero === 8) return 'aprueba'
  return 'saluda'
}

type Props = {
  color: string
  estado: EstadoPersonaje
  size?: number
}

export function PersonajeGuia({ color, estado, size = 120 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number | undefined>(undefined)
  const frameRef = useRef(0)
  const estadoRef = useRef(estado)

  useEffect(() => {
    estadoRef.current = estado
  }, [estado])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const cx = canvas.getContext('2d')
    if (!cx) return

    const scale = size / 160

    function draw(ft: number) {
      const c = cx
      if (!c || !canvas) return
      c.clearRect(0, 0, canvas.width, canvas.height)
      c.save()
      c.scale(scale, scale)
      drawPersonaje(c, color, estadoRef.current, ft)
      c.restore()
    }

    function loop() {
      frameRef.current += 1
      draw(frameRef.current)
      animRef.current = requestAnimationFrame(loop)
    }

    loop()
    return () => {
      if (animRef.current !== undefined) cancelAnimationFrame(animRef.current)
    }
  }, [color, size])

  const h = Math.round(size * 1.06)
  return <canvas ref={canvasRef} width={size} height={h} style={{ display: 'block' }} />
}

const PI = Math.PI

function roundRectFilled(cx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2)
  cx.beginPath()
  cx.moveTo(x + rr, y)
  cx.arcTo(x + w, y, x + w, y + h, rr)
  cx.arcTo(x + w, y + h, x, y + h, rr)
  cx.arcTo(x, y + h, x, y, rr)
  cx.arcTo(x, y, x + w, y, rr)
  cx.closePath()
}

function dibujarOjosNormales(cx: CanvasRenderingContext2D, color: string, ex1: number, ex2: number, ey: number) {
  for (const ex of [ex1, ex2]) {
    cx.fillStyle = '#ffffff'
    cx.beginPath()
    cx.arc(ex, ey, 11, 0, PI * 2)
    cx.fill()
    cx.fillStyle = color
    cx.beginPath()
    cx.arc(ex + 1, ey + 1, 6, 0, PI * 2)
    cx.fill()
    cx.fillStyle = '#ffffff'
    cx.beginPath()
    cx.arc(ex - 2, ey - 2, 3, 0, PI * 2)
    cx.fill()
  }
}

function dibujarOjosArcoFeliz(cx: CanvasRenderingContext2D, ex1: number, ex2: number, ey: number, conMejillas: boolean, mejillasGrandes: boolean) {
  cx.strokeStyle = '#ffffff'
  cx.lineWidth = 3.5
  cx.lineCap = 'round'
  cx.beginPath()
  cx.arc(ex1, ey + 5, 10, PI * 1.1, PI * 1.9)
  cx.stroke()
  cx.beginPath()
  cx.arc(ex2, ey + 5, 10, PI * 1.1, PI * 1.9)
  cx.stroke()
  if (!conMejillas) return
  const rx = mejillasGrandes ? 10 : 8
  const ry = mejillasGrandes ? 6 : 5
  cx.fillStyle = 'rgba(255,255,255,0.22)'
  cx.beginPath()
  cx.ellipse(ex1 - 10, ey + 13, rx, ry, 0, 0, PI * 2)
  cx.fill()
  cx.beginPath()
  cx.ellipse(ex2 + 10, ey + 13, rx, ry, 0, 0, PI * 2)
  cx.fill()
}

function dibujarOjosSorpresa(cx: CanvasRenderingContext2D, color: string, ex1: number, ex2: number, ey: number) {
  for (const ex of [ex1, ex2]) {
    cx.fillStyle = '#ffffff'
    cx.beginPath()
    cx.arc(ex, ey, 14, 0, PI * 2)
    cx.fill()
    cx.fillStyle = color
    cx.beginPath()
    cx.arc(ex + 1, ey + 1, 8, 0, PI * 2)
    cx.fill()
    cx.fillStyle = '#ffffff'
    cx.beginPath()
    cx.arc(ex - 2, ey - 3, 3.5, 0, PI * 2)
    cx.fill()
  }
}

function dibujarOjosCurioso(cx: CanvasRenderingContext2D, color: string, ex1: number, ex2: number, ey: number) {
  cx.fillStyle = '#ffffff'
  cx.beginPath()
  cx.arc(ex1, ey, 11, 0, PI * 2)
  cx.fill()
  cx.fillStyle = color
  cx.beginPath()
  cx.arc(ex1 + 1, ey + 1, 6, 0, PI * 2)
  cx.fill()
  cx.fillStyle = '#ffffff'
  cx.beginPath()
  cx.arc(ex1 - 2, ey - 2, 3, 0, PI * 2)
  cx.fill()
  cx.strokeStyle = 'rgba(255,255,255,0.35)'
  cx.lineWidth = 2
  cx.beginPath()
  cx.moveTo(ex1 - 8, ey - 13)
  cx.quadraticCurveTo(ex1, ey - 17, ex1 + 10, ey - 13)
  cx.stroke()

  cx.fillStyle = '#ffffff'
  cx.beginPath()
  cx.arc(ex2, ey, 11, 0, PI * 2)
  cx.fill()
  cx.fillStyle = color
  cx.beginPath()
  cx.arc(ex2 + 4, ey - 3, 6, 0, PI * 2)
  cx.fill()
  cx.strokeStyle = 'rgba(255,255,255,0.5)'
  cx.lineWidth = 2
  cx.beginPath()
  cx.moveTo(ex2 - 4, ey - 16)
  cx.quadraticCurveTo(ex2 + 8, ey - 22, ex2 + 18, ey - 14)
  cx.stroke()
}

function dibujarOjosEscucha(cx: CanvasRenderingContext2D, color: string, ex1: number, ex2: number, ey: number) {
  for (const ex of [ex1, ex2]) {
    cx.fillStyle = '#ffffff'
    cx.beginPath()
    cx.arc(ex, ey, 10, 0, PI * 2)
    cx.fill()
    cx.fillStyle = color
    cx.beginPath()
    cx.arc(ex, ey + 1, 5, 0, PI * 2)
    cx.fill()
    cx.fillStyle = '#ffffff'
    cx.beginPath()
    cx.arc(ex - 2, ey - 1, 2.5, 0, PI * 2)
    cx.fill()
  }
  cx.strokeStyle = 'rgba(255,255,255,0.55)'
  cx.lineWidth = 2
  cx.lineCap = 'round'
  cx.beginPath()
  cx.moveTo(ex1 - 10, ey - 14)
  cx.quadraticCurveTo(ex1, ey - 20, ex1 + 12, ey - 13)
  cx.stroke()
  cx.beginPath()
  cx.moveTo(ex2 - 12, ey - 13)
  cx.quadraticCurveTo(ex2, ey - 20, ex2 + 10, ey - 14)
  cx.stroke()
  cx.fillStyle = 'rgba(255,255,255,0.18)'
  cx.beginPath()
  cx.ellipse(ex1 - 8, ey + 11, 7, 4, 0, 0, PI * 2)
  cx.fill()
  cx.beginPath()
  cx.ellipse(ex2 + 8, ey + 11, 7, 4, 0, 0, PI * 2)
  cx.fill()
}

function dibujarBocaGranSonrisa(cx: CanvasRenderingContext2D, my: number) {
  cx.strokeStyle = 'rgba(255,255,255,0.95)'
  cx.lineWidth = 3
  cx.lineCap = 'round'
  cx.beginPath()
  cx.moveTo(50, my)
  cx.bezierCurveTo(52, my + 20, 108, my + 20, 110, my)
  cx.stroke()
}

function dibujarBocaSorpresa(cx: CanvasRenderingContext2D, color: string, my: number) {
  cx.fillStyle = '#ffffff'
  cx.beginPath()
  cx.ellipse(80, my + 8, 10, 14, 0, 0, PI * 2)
  cx.fill()
  cx.fillStyle = color
  cx.beginPath()
  cx.ellipse(80, my + 10, 6, 9, 0, 0, PI * 2)
  cx.fill()
}

function dibujarBocaCurioso(cx: CanvasRenderingContext2D, my: number) {
  cx.strokeStyle = 'rgba(255,255,255,0.9)'
  cx.lineWidth = 2.8
  cx.lineCap = 'round'
  cx.beginPath()
  cx.moveTo(58, my + 4)
  cx.bezierCurveTo(68, my + 2, 84, my + 10, 96, my + 2)
  cx.stroke()
}

function dibujarBocaEscuchaSuave(cx: CanvasRenderingContext2D, my: number) {
  cx.strokeStyle = 'rgba(255,255,255,0.88)'
  cx.lineWidth = 2.5
  cx.beginPath()
  cx.moveTo(62, my + 4)
  cx.bezierCurveTo(70, my + 11, 90, my + 11, 98, my + 4)
  cx.stroke()
}

function dibujarBocaMedia(cx: CanvasRenderingContext2D, my: number) {
  cx.strokeStyle = 'rgba(255,255,255,0.92)'
  cx.lineWidth = 2.8
  cx.beginPath()
  cx.moveTo(54, my + 2)
  cx.bezierCurveTo(62, my + 14, 98, my + 14, 106, my + 2)
  cx.stroke()
}

function drawPersonaje(
  cx: CanvasRenderingContext2D,
  color: string,
  estado: EstadoPersonaje,
  t: number
) {
  const fy = estado === 'escucha' ? Math.sin(t * 0.03) * 1.5 : Math.sin(t * 0.05) * 3
  const by = 16 + fy
  const ex1 = 58
  const ex2 = 102
  const ey = by + 36
  const my = by + 66

  cx.fillStyle = 'rgba(0,0,0,0.07)'
  cx.beginPath()
  cx.ellipse(80, 158 - fy * 0.3, 30, 8, 0, 0, PI * 2)
  cx.fill()

  cx.fillStyle = color
  cx.beginPath()
  cx.arc(50, by - 10, 10, 0, PI * 2)
  cx.fill()
  cx.beginPath()
  cx.arc(110, by - 10, 10, 0, PI * 2)
  cx.fill()
  cx.fillStyle = 'rgba(255,255,255,0.28)'
  cx.beginPath()
  cx.arc(50, by - 10, 6, 0, PI * 2)
  cx.fill()
  cx.beginPath()
  cx.arc(110, by - 10, 6, 0, PI * 2)
  cx.fill()

  cx.fillStyle = color
  roundRectFilled(cx, 22, by, 116, 108, 54)
  cx.fill()
  cx.fillStyle = 'rgba(255,255,255,0.14)'
  cx.beginPath()
  cx.ellipse(80, by + 20, 38, 16, 0, 0, PI * 2)
  cx.fill()

  switch (estado) {
    case 'saluda':
    case 'explica':
    case 'aprueba':
      dibujarOjosNormales(cx, color, ex1, ex2, ey)
      dibujarBocaMedia(cx, my)
      break
    case 'celebra':
    case 'anima':
      dibujarOjosArcoFeliz(cx, ex1, ex2, ey, true, false)
      dibujarBocaGranSonrisa(cx, my)
      break
    case 'sorpresa':
      dibujarOjosSorpresa(cx, color, ex1, ex2, ey)
      dibujarBocaSorpresa(cx, color, my)
      break
    case 'curioso':
      dibujarOjosCurioso(cx, color, ex1, ex2, ey)
      dibujarBocaCurioso(cx, my)
      break
    case 'escucha':
      dibujarOjosEscucha(cx, color, ex1, ex2, ey)
      dibujarBocaEscuchaSuave(cx, my)
      break
    case 'despide':
      dibujarOjosArcoFeliz(cx, ex1, ex2, ey, true, true)
      dibujarBocaGranSonrisa(cx, my)
      break
    default:
      dibujarOjosNormales(cx, color, ex1, ex2, ey)
      dibujarBocaMedia(cx, my)
  }

  function brazoIzqAbajo() {
    cx.save()
    cx.translate(26, by + 52)
    cx.rotate(0.35)
    cx.fillStyle = color
    cx.beginPath()
    cx.ellipse(0, 0, 9, 22, 0, 0, PI * 2)
    cx.fill()
    cx.fillStyle = 'rgba(255,255,255,0.85)'
    cx.beginPath()
    cx.arc(0, 20, 9, 0, PI * 2)
    cx.fill()
    cx.restore()
  }

  const wave = Math.sin(t * 0.16) * 0.45
  const bounce = Math.sin(t * 0.12) * 0.25
  const bounceFuerte = Math.sin(t * 0.18) * 0.38
  const waveDespide = Math.sin(t * 0.12) * 0.75

  switch (estado) {
    case 'saluda': {
      brazoIzqAbajo()
      cx.save()
      cx.translate(138, by + 46)
      cx.rotate(-1 + wave)
      cx.fillStyle = color
      cx.beginPath()
      cx.ellipse(0, 0, 9, 22, 0, 0, PI * 2)
      cx.fill()
      cx.fillStyle = '#ffffff'
      cx.beginPath()
      cx.arc(0, -24, 11, 0, PI * 2)
      cx.fill()
      cx.restore()
      break
    }
    case 'celebra':
    case 'anima': {
      const ba = estado === 'anima' ? bounceFuerte : bounce
      cx.save()
      cx.translate(28, by + 42)
      cx.rotate(-1.4 + ba)
      cx.fillStyle = color
      cx.beginPath()
      cx.ellipse(0, 0, 9, 24, 0, 0, PI * 2)
      cx.fill()
      cx.fillStyle = '#ffffff'
      cx.beginPath()
      cx.arc(-2, -26, 10, 0, PI * 2)
      cx.fill()
      cx.restore()
      cx.save()
      cx.translate(134, by + 42)
      cx.rotate(1.35 - ba)
      cx.fillStyle = color
      cx.beginPath()
      cx.ellipse(0, 0, 9, 24, 0, 0, PI * 2)
      cx.fill()
      cx.fillStyle = '#ffffff'
      cx.beginPath()
      cx.arc(2, -26, 10, 0, PI * 2)
      cx.fill()
      cx.restore()
      for (let i = 0; i < 10; i++) {
        const ang = (i / 10) * PI * 2 + t * 0.06
        const dist = 55 + Math.sin(t * 0.09 + i) * 8
        const px = 80 + Math.cos(ang) * dist
        const py = by + 30 + Math.sin(ang) * dist * 0.6
        cx.fillStyle = i % 2 === 0 ? '#ffffff' : color
        cx.globalAlpha = 0.55 + Math.sin(t * 0.1 + i) * 0.25
        cx.beginPath()
        cx.arc(px, py, 3 + (i % 3), 0, PI * 2)
        cx.fill()
        cx.globalAlpha = 1
      }
      break
    }
    case 'sorpresa': {
      const up = Math.sin(t * 0.08) * 0.2
      cx.save()
      cx.translate(30, by + 46)
      cx.rotate(-0.95 - up)
      cx.fillStyle = color
      cx.beginPath()
      cx.ellipse(0, -8, 9, 28, 0, 0, PI * 2)
      cx.fill()
      cx.fillStyle = '#ffffff'
      cx.beginPath()
      cx.arc(-4, -32, 10, 0, PI * 2)
      cx.fill()
      cx.restore()
      cx.save()
      cx.translate(132, by + 46)
      cx.rotate(0.95 + up)
      cx.fillStyle = color
      cx.beginPath()
      cx.ellipse(0, -8, 9, 28, 0, 0, PI * 2)
      cx.fill()
      cx.fillStyle = '#ffffff'
      cx.beginPath()
      cx.arc(4, -32, 10, 0, PI * 2)
      cx.fill()
      cx.restore()
      break
    }
    case 'curioso': {
      brazoIzqAbajo()
      cx.save()
      cx.translate(128, by + 58)
      cx.rotate(0.85)
      cx.fillStyle = color
      cx.beginPath()
      cx.ellipse(0, -6, 8, 18, 0, 0, PI * 2)
      cx.fill()
      cx.fillStyle = '#ffffff'
      cx.beginPath()
      cx.arc(6, -16, 8, 0, PI * 2)
      cx.fill()
      cx.restore()
      for (let b = 0; b < 3; b++) {
        const off = (t * 0.045 + b * 0.7) % 3
        const bx = 128 + off * 10
        const byb = by - 34 - off * 16
        cx.strokeStyle = 'rgba(255,255,255,0.5)'
        cx.lineWidth = 2
        cx.beginPath()
        cx.arc(bx, byb, 6 + b * 2, 0, PI * 1.35)
        cx.stroke()
      }
      break
    }
    case 'explica': {
      brazoIzqAbajo()
      const poke = Math.sin(t * 0.14) * 4
      cx.save()
      cx.translate(136 + poke, by + 52)
      cx.rotate(-0.65)
      cx.fillStyle = color
      cx.beginPath()
      cx.ellipse(0, 0, 9, 20, 0, 0, PI * 2)
      cx.fill()
      cx.fillStyle = '#ffffff'
      cx.beginPath()
      cx.arc(-2, -22, 9, 0, PI * 2)
      cx.fill()
      cx.restore()
      cx.save()
      cx.setLineDash([4, 6])
      cx.lineDashOffset = -(t * 0.4) % 20
      cx.strokeStyle = 'rgba(255,255,255,0.55)'
      cx.lineWidth = 2
      cx.beginPath()
      cx.moveTo(145 + poke, by + 35)
      cx.lineTo(175 + poke, by + 12)
      cx.stroke()
      cx.restore()
      break
    }
    case 'aprueba': {
      brazoIzqAbajo()
      cx.save()
      cx.translate(132, by + 40)
      cx.rotate(-0.3 + Math.sin(t * 0.11) * 0.15)
      cx.fillStyle = color
      cx.beginPath()
      cx.ellipse(2, -6, 9, 22, 0, 0, PI * 2)
      cx.fill()
      cx.fillStyle = '#ffffff'
      roundRectFilled(cx, -4, -38, 14, 22, 4)
      cx.fill()
      cx.strokeStyle = 'rgba(255,255,255,0.8)'
      cx.lineWidth = 2
      for (let s = 0; s < 4; s++) {
        const a = t * 0.08 + s * 1.2
        const sx = 10 + Math.cos(a) * 22
        const sy = -18 + Math.sin(a) * 18
        cx.globalAlpha = 0.4 + Math.sin(t * 0.15 + s) * 0.35
        cx.beginPath()
        cx.moveTo(sx, sy)
        cx.lineTo(sx + 3, sy - 6)
        cx.lineTo(sx + 8, sy - 2)
        cx.closePath()
        cx.fillStyle = '#ffffff'
        cx.fill()
      }
      cx.globalAlpha = 1
      cx.restore()
      break
    }
    case 'escucha': {
      cx.save()
      cx.translate(32, by + 46)
      cx.rotate(-0.25)
      cx.fillStyle = color
      cx.beginPath()
      cx.ellipse(0, 0, 9, 20, 0, 0, PI * 2)
      cx.fill()
      cx.fillStyle = '#ffffff'
      cx.beginPath()
      cx.arc(-2, 18, 9, 0, PI * 2)
      cx.fill()
      cx.restore()
      cx.save()
      cx.translate(130, by + 46)
      cx.rotate(0.25)
      cx.fillStyle = color
      cx.beginPath()
      cx.ellipse(0, 0, 9, 20, 0, 0, PI * 2)
      cx.fill()
      cx.fillStyle = '#ffffff'
      cx.beginPath()
      cx.arc(2, 18, 9, 0, PI * 2)
      cx.fill()
      cx.restore()
      cx.strokeStyle = 'rgba(255,255,255,0.35)'
      cx.lineWidth = 2
      for (let r = 0; r < 3; r++) {
        const rad = 50 + r * 16 + Math.sin(t * 0.05 + r) * 6
        cx.beginPath()
        cx.arc(80, by + 55, rad, -0.45, 0.45)
        cx.stroke()
      }
      break
    }
    case 'despide': {
      brazoIzqAbajo()
      cx.save()
      cx.translate(140, by + 48)
      cx.rotate(-0.95 + waveDespide)
      cx.fillStyle = color
      cx.beginPath()
      cx.ellipse(0, 0, 9, 24, 0, 0, PI * 2)
      cx.fill()
      cx.fillStyle = '#ffffff'
      cx.beginPath()
      cx.arc(0, -28, 12, 0, PI * 2)
      cx.fill()
      cx.restore()
      for (let st = 0; st < 5; st++) {
        const tw = Math.sin(t * 0.12 + st * 1.1)
        const al = tw > 0 ? 0.85 : 0.2
        cx.globalAlpha = al
        const sx = 20 + st * 28
        const sy = by + 8 + Math.sin(st + t * 0.06) * 4
        cx.fillStyle = '#ffffff'
        cx.save()
        cx.translate(sx, sy)
        cx.rotate(st * 0.4 + t * 0.03)
        cx.beginPath()
        for (let k = 0; k < 8; k++) {
          const ra = k * PI * 0.25 - PI * 0.125
          const rr = k % 2 === 0 ? 5 : 2
          cx.lineTo(Math.cos(ra) * rr, Math.sin(ra) * rr)
        }
        cx.closePath()
        cx.fill()
        cx.restore()
        cx.globalAlpha = 1
      }
      break
    }
    default:
      brazoIzqAbajo()
      cx.save()
      cx.translate(136, by + 50)
      cx.rotate(-0.5 + bounce)
      cx.fillStyle = color
      cx.beginPath()
      cx.ellipse(0, 0, 9, 22, 0, 0, PI * 2)
      cx.fill()
      cx.fillStyle = '#ffffff'
      cx.beginPath()
      cx.arc(0, -22, 9, 0, PI * 2)
      cx.fill()
      cx.restore()
  }

  cx.fillStyle = color
  cx.beginPath()
  cx.ellipse(60, by + 116, 14, 10, 0, 0, PI * 2)
  cx.fill()
  cx.beginPath()
  cx.ellipse(100, by + 116, 14, 10, 0, 0, PI * 2)
  cx.fill()
}
