"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Eclipse() {
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!glowRef.current) return;

    const scale =
      1 +
      Math.sin(clock.elapsedTime * 1.2) * 0.05;

    glowRef.current.scale.set(
      scale,
      scale,
      scale
    );
  });

  return (
    <group>
      <mesh ref={glowRef}>
        <sphereGeometry args={[2.6, 64, 64]} />
        <meshBasicMaterial
          color="#f7c65f"
          transparent
          opacity={0.12}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}
