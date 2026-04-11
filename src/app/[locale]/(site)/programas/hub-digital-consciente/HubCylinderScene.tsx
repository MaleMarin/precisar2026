"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import * as THREE from "three";

const N = 6;
const R = 500;

const SECTIONS = [
  { title: "Cultura digital\nque viaja", bg: "#DB5227", light: true, idx: 0 },
  { title: "Lo que\nencontrarás", bg: "#023661", light: true, idx: 1 },
  { title: "Modelos de\ninstalación", bg: "#F5F2EC", light: false, idx: 2 },
  { title: "10 formas de\nimplementar", bg: "#DB5227", light: true, idx: 3 },
  { title: "Ediciones\ntemáticas", bg: "#023661", light: true, idx: 4 },
  { title: "Lleva el Hub\na tu espacio", bg: "#F5F2EC", light: false, idx: 5 },
] as const;

type Section = (typeof SECTIONS)[number];

function makeTexture(s: Section): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = 512;
  cv.height = 512;
  const ctx = cv.getContext("2d");
  if (!ctx) {
    throw new Error("HubCylinderScene: 2d context unavailable");
  }
  ctx.fillStyle = s.bg;
  ctx.fillRect(0, 0, 512, 512);
  ctx.fillStyle = s.light ? "rgba(245,242,236,0.07)" : "rgba(10,12,18,0.05)";
  ctx.font = "bold 160px Arial";
  ctx.fillText("0" + (s.idx + 1), 16, 180);
  const tc = s.light ? "#F5F2EC" : "#0A0C12";
  ctx.fillStyle = tc;
  ctx.font = "bold 62px Arial Black, Arial";
  s.title.split("\n").forEach((l, j) => ctx.fillText(l, 24, 280 + j * 70));
  return new THREE.CanvasTexture(cv);
}

interface Props {
  targetRotation: number;
  onSectionChange: (idx: number) => void;
}

export default function HubCylinderScene({ targetRotation, onSectionChange }: Props) {
  const groupRef = useRef<Group>(null);
  const currentRotRef = useRef(0);
  const activeRef = useRef(0);

  const meshes = useMemo(() => {
    return SECTIONS.map((s, i) => {
      const angle = (i / N) * Math.PI * 2;
      const geo = new THREE.PlaneGeometry(380, 380);
      const mat = new THREE.MeshBasicMaterial({
        map: makeTexture(s),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.x = Math.sin(angle) * R;
      mesh.position.z = Math.cos(angle) * R;
      mesh.rotation.y = -angle;
      return mesh;
    });
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    currentRotRef.current += (targetRotation - currentRotRef.current) * 0.06;
    groupRef.current.rotation.y = currentRotRef.current;

    const norm =
      ((currentRotRef.current % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const idx = Math.round((norm / (Math.PI * 2)) * N) % N;
    const front = (N - idx) % N;
    if (front !== activeRef.current) {
      activeRef.current = front;
      onSectionChange(front);
    }

    meshes.forEach((p, i) => {
      const a = (i / N) * Math.PI * 2 + currentRotRef.current;
      const dist = (Math.cos(a) * R + R) / (R * 2);
      (p.material as THREE.MeshBasicMaterial).opacity = 0.12 + dist * 0.88;
    });
  });

  return (
    <group ref={groupRef}>
      {meshes.map((mesh, i) => (
        <primitive key={i} object={mesh} />
      ))}
    </group>
  );
}
