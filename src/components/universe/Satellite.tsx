"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Satellite() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.elapsedTime;
    const r = 5;

    ref.current.position.x = Math.cos(t * 0.5) * r;
    ref.current.position.z = Math.sin(t * 0.5) * r;
    ref.current.position.y = Math.sin(t * 0.7) * 0.5;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.15, 32, 32]} />
      <meshStandardMaterial
        color="#ffffff"
        emissive="#66ffff"
        emissiveIntensity={3}
      />
    </mesh>
  );
}
