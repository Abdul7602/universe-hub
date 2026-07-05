"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Satellite() {
  const ref = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const r = 5;

    if (ref.current) {
      ref.current.position.x = Math.cos(t * 0.5) * r;
      ref.current.position.z = Math.sin(t * 0.5) * r;
      ref.current.position.y = Math.sin(t * 0.7) * 0.5;
    }

    if (glowRef.current && ref.current) {
      glowRef.current.position.copy(ref.current.position);
      const glowPulse = 1 + Math.sin(t * 3) * 0.2;
      glowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
    }

    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        2.5 + Math.sin(t * 4) * 1;
    }
  });

  return (
    <group>
      {/* Soft glow halo — follows satellite, no raycast */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial
          color="#5ee4ff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh ref={ref}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#ffffff"
          emissive="#5ee4ff"
          emissiveIntensity={3}
          metalness={0.6}
          roughness={0.15}
        />
      </mesh>
    </group>
  );
}
