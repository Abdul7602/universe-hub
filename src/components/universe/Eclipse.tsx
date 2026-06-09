"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function Eclipse() {
  const coronaRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!coronaRef.current) return;

    const pulse =
      1 +
      Math.sin(clock.elapsedTime * 1.5) * 0.08;

    coronaRef.current.scale.set(
      pulse,
      pulse,
      pulse
    );

    coronaRef.current.rotation.z += 0.0008;
  });

  return (
    <group>
      {/* Corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[2.8, 64, 64]} />

        <meshBasicMaterial
          color="#f7c65f"
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Secondary Halo */}
      <mesh>
        <sphereGeometry args={[3.4, 64, 64]} />

        <meshBasicMaterial
          color="#ffdd88"
          transparent
          opacity={0.04}
        />
      </mesh>

      {/* Eclipse Core */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}
