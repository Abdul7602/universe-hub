"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Nebula() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.z =
      clock.elapsedTime * 0.01;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-12, 4, -20]}>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial
          color="#472f87"
          transparent
          opacity={0.06}
        />
      </mesh>

      <mesh position={[10, -3, -18]}>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial
          color="#1e8aa6"
          transparent
          opacity={0.04}
        />
      </mesh>

      <mesh position={[0, 8, -25]}>
        <sphereGeometry args={[10, 32, 32]} />
        <meshBasicMaterial
          color="#8a5fff"
          transparent
          opacity={0.03}
        />
      </mesh>
    </group>
  );
}
