"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef, type MutableRefObject } from "react";
import type { Group } from "three";

export type LabMouseRef = MutableRefObject<{ x: number; y: number }>;

type WebGLBackgroundProps = {
  progressRef: MutableRefObject<number>;
  mouseRef?: LabMouseRef;
};

function CameraRig({ mouseRef }: { mouseRef: LabMouseRef }) {
  const { camera } = useThree();
  const cur = useRef({ x: 0, y: 0 });
  useFrame(() => {
    const tx = mouseRef.current.x * 0.22;
    const ty = mouseRef.current.y * 0.14;
    cur.current.x += (tx - cur.current.x) * 0.035;
    cur.current.y += (ty - cur.current.y) * 0.035;
    camera.position.x = cur.current.x;
    camera.position.y = cur.current.y;
    camera.lookAt(0, 0.05, 0);
  });
  return null;
}

function PearlSculpture({
  progressRef,
  mouseRef,
}: {
  progressRef: MutableRefObject<number>;
  mouseRef: LabMouseRef;
}) {
  const groupRef = useRef<Group>(null);
  const haloRef = useRef<Group>(null);

  useFrame((_s, dt) => {
    const g = groupRef.current;
    const h = haloRef.current;
    if (!g) return;
    const p = progressRef.current;
    const mx = mouseRef.current.x * 0.12;
    const my = mouseRef.current.y * 0.08;
    const t = performance.now() * 0.00012;
    g.rotation.y = p * Math.PI * 1.15 + mx + t * 0.15;
    g.rotation.x = p * 0.18 + my * 0.2 + Math.sin(t * 0.8) * 0.04;
    g.position.z = -0.05 + p * 0.28;
    if (h) {
      h.rotation.z = -p * 0.4 + t * 0.05;
    }
  });

  return (
    <>
      <CameraRig mouseRef={mouseRef} />
      <hemisphereLight args={["#f8f0e4", "#0d0a08", 0.55]} />
      <ambientLight intensity={0.18} />
      <spotLight
        position={[4, 6, 7]}
        angle={0.35}
        penumbra={0.85}
        intensity={1.1}
        color="#fff5eb"
        castShadow={false}
      />
      <pointLight position={[-5, -2, 4]} intensity={0.35} color="#c9a87a" />
      <pointLight position={[2, -4, 3]} intensity={0.22} color="#6b8cff" />

      <Sparkles
        count={48}
        scale={[16, 12, 10]}
        size={1.8}
        speed={0.22}
        opacity={0.22}
        color="#d4bc8a"
      />

      <group ref={groupRef}>
        <Float speed={0.55} rotationIntensity={0.06} floatIntensity={0.12}>
          <mesh scale={1.12}>
            <sphereGeometry args={[1, 96, 96]} />
            <meshPhysicalMaterial
              color="#9a8e7e"
              emissive="#1a1410"
              emissiveIntensity={0.08}
              metalness={0.45}
              roughness={0.22}
              clearcoat={1}
              clearcoatRoughness={0.08}
              reflectivity={0.9}
              sheen={0.35}
              sheenRoughness={0.5}
              sheenColor="#e8dcc8"
            />
          </mesh>
        </Float>
      </group>

      <group ref={haloRef} position={[0, 0, -0.55]}>
        <mesh rotation={[1.15, 0.4, 0.2]}>
          <torusGeometry args={[1.45, 0.004, 12, 120]} />
          <meshBasicMaterial color="#c9a87a" transparent opacity={0.35} />
        </mesh>
      </group>

      <group position={[0.35, -0.2, -0.35]}>
        <mesh>
          <icosahedronGeometry args={[0.42, 1]} />
          <meshBasicMaterial
            color="#f5ebe0"
            wireframe
            transparent
            opacity={0.04}
          />
        </mesh>
      </group>
    </>
  );
}

export default function WebGLBackground({ progressRef, mouseRef }: WebGLBackgroundProps) {
  const fallbackMouse = useRef({ x: 0, y: 0 });
  const m = mouseRef ?? fallbackMouse;

  return (
    <div className="immersive-webgl-root" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 36 }}
        dpr={[1, 2]}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <fog attach="fog" args={["#050403", 8, 26]} />
        <PearlSculpture progressRef={progressRef} mouseRef={m} />
      </Canvas>
    </div>
  );
}
