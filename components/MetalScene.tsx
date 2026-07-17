"use client";

import { Float, RoundedBox } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Group } from "three";

function Plate({ small = false }: { small?: boolean }) {
  const group = useRef<Group>(null);
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * (small ? 0.055 : 0.035);
  });

  const holes = small ? 5 : 7;
  return (
    <group ref={group} scale={small ? .72 : 1} rotation={[.54, -.2, small ? -.11 : .08]}>
      <RoundedBox args={[4.2, .18, .78]} radius={.19} smoothness={5}>
        <meshStandardMaterial color="#e7e7e4" metalness={.58} roughness={.24} />
      </RoundedBox>
      {Array.from({ length: holes }).map((_, index) => (
        <mesh key={index} position={[-1.55 + index * (3.1 / Math.max(holes - 1, 1)), .12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[.19, .075, 18, 36]} />
          <meshStandardMaterial color="#d2d2cf" metalness={.52} roughness={.3} />
        </mesh>
      ))}
    </group>
  );
}

export default function MetalScene() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 900px)").matches;
    try {
      const canvas = document.createElement("canvas");
      const webgl = Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
      setEnabled(!reduced && !mobile && webgl);
    } catch {
      setEnabled(false);
    }
  }, []);

  if (!enabled) return null;

  return (
    <Canvas camera={{ position: [0, 2.8, 6.5], fov: 34 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={1.6} />
      <hemisphereLight args={["#ffffff", "#b7b7b7", 3]} />
      <directionalLight position={[4, 7, 5]} intensity={4.5} color="#ffffff" />
      <directionalLight position={[-4, 1, 2]} intensity={2} color="#e1e1e1" />
      <Float speed={1.1} rotationIntensity={.08} floatIntensity={.18}>
        <group position={[.45, -.7, 0]}><Plate /></group>
      </Float>
      <Float speed={.9} rotationIntensity={.06} floatIntensity={.12}>
        <group position={[-.55, -1.15, .8]}><Plate small /></group>
      </Float>
    </Canvas>
  );
}
