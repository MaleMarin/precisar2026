"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { MutableRefObject } from "react";
import * as THREE from "three";

const N = 6;
const RADIUS = 10;

const PANELS = [
  { title: "Cultura digital\nque viaja", bg: "#DB5227", light: true },
  { title: "Lo que\nencontrarás", bg: "#023661", light: true },
  { title: "Modelos de\ninstalación", bg: "#F5F2EC", light: false },
  { title: "10 formas de\nimplementar", bg: "#DB5227", light: true },
  { title: "Ediciones\ntemáticas", bg: "#023661", light: true },
  { title: "Lleva el Hub\na tu espacio", bg: "#F5F2EC", light: false },
] as const;

type Panel = (typeof PANELS)[number];

function makeTexture(p: Panel, idx: number): THREE.CanvasTexture {
  const cw = 1200;
  const ch = 1200;
  const cv = document.createElement("canvas");
  cv.width = cw;
  cv.height = ch;
  const ctx = cv.getContext("2d");
  if (!ctx) {
    throw new Error("HubCylinderScene: 2d context unavailable");
  }
  ctx.fillStyle = p.bg;
  ctx.fillRect(0, 0, cw, ch);
  ctx.fillStyle = p.light ? "rgba(245,242,236,0.06)" : "rgba(10,12,18,0.05)";
  ctx.font = "bold 320px Arial";
  ctx.fillText(String(idx + 1).padStart(2, "0"), 30, 360);
  const tc = p.light ? "#F5F2EC" : "#0A0C12";
  ctx.fillStyle = tc;
  ctx.font = "bold 148px Arial Black, Arial";
  p.title.split("\n").forEach((line, i) => ctx.fillText(line, 40, 560 + i * 162));
  ctx.fillStyle = p.light ? "rgba(245,242,236,0.25)" : "rgba(10,12,18,0.22)";
  ctx.font = "34px Arial";
  ctx.fillText("click para leer →", 40, 1140);
  return new THREE.CanvasTexture(cv);
}

interface Props {
  targetRotationYRef: MutableRefObject<number>;
  onSectionChange: (idx: number) => void;
}

export default function HubCylinderScene({ targetRotationYRef, onSectionChange }: Props) {
  const currentRotY = useRef(0);
  const activeRef = useRef(0);

  const meshes = useMemo(() => {
    return PANELS.map((p, i) => {
      const angle = (i / N) * Math.PI * 2;
      const geo = new THREE.PlaneGeometry(9, 7);
      const mat = new THREE.MeshBasicMaterial({
        map: makeTexture(p, i),
        side: THREE.FrontSide,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(Math.sin(angle) * RADIUS, 0, -Math.cos(angle) * RADIUS);
      mesh.rotation.y = angle;
      return mesh;
    });
  }, []);

  useFrame((state) => {
    const targetY = targetRotationYRef.current;
    currentRotY.current += (targetY - currentRotY.current) * 0.1;
    state.camera.rotation.y = currentRotY.current;

    const norm = ((currentRotY.current % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const idx = Math.round((norm / (Math.PI * 2)) * N) % N;
    const front = (N - idx) % N;
    if (front !== activeRef.current) {
      activeRef.current = front;
      onSectionChange(front);
    }
  });

  return (
    <group>
      {meshes.map((mesh, i) => (
        <primitive key={i} object={mesh} />
      ))}
    </group>
  );
}
