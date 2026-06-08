"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Satellite() {
  const satelliteRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!satelliteRef.current) return;

    const t = clock.elapsedTime;

    const radius = 5;

    satelliteRef.current.position.x =
      Math.cos(t * 0.6) * radius;

    satelliteRef.current.position.z =
      Math.sin(t * 0.6) * radius;

    satelliteRef.current.position.y =
      Math.sin(t * 0.3) * 0.5;
  });

  return (
    <mesh ref={satelliteRef}>
      <sphereGeometry args={[0.12, 32, 32]} />

      <meshStandardMaterial
        color="#ffffff"
        emissive="#00ffff"
        emissiveIntensity={2}
      />
    </mesh>
  );
}
