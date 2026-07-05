"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function disableRaycast(mesh: THREE.Mesh | null) {
  if (mesh) mesh.raycast = () => {};
}

export default function OrbitRing() {
  const groupRef = useRef<THREE.Group>(null);
  const primaryRef = useRef<THREE.MeshBasicMaterial>(null);
  const ghostRef = useRef<THREE.MeshBasicMaterial>(null);
  const outerRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pulse = 0.32 + Math.sin(t * 1.8) * 0.12;
    const ghostPulse = 0.14 + Math.sin(t * 2.4 + 1.2) * 0.06;

    if (primaryRef.current) primaryRef.current.opacity = pulse;
    if (ghostRef.current) ghostRef.current.opacity = ghostPulse;
    if (outerRef.current) {
      outerRef.current.opacity = 0.06 + Math.sin(t * 1.2) * 0.03;
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.015;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 2, 0, 0]}>
      {/* Primary holographic ring */}
      <mesh ref={disableRaycast}>
        <torusGeometry args={[4, 0.018, 16, 200]} />
        <meshBasicMaterial
          ref={primaryRef}
          color="#5ee4ff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Ghost ring — slightly larger, counter-rotating feel via offset */}
      <mesh
        ref={disableRaycast}
        rotation={[0, 0, Math.PI / 6]}
      >
        <torusGeometry args={[4.08, 0.008, 12, 200]} />
        <meshBasicMaterial
          ref={ghostRef}
          color="#8a5fff"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer soft glow halo */}
      <mesh ref={disableRaycast}>
        <torusGeometry args={[4.15, 0.04, 8, 128]} />
        <meshBasicMaterial
          ref={outerRef}
          color="#5ee4ff"
          transparent
          opacity={0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner bright core line */}
      <mesh ref={disableRaycast}>
        <torusGeometry args={[4, 0.006, 8, 200]} />
        <meshBasicMaterial
          color="#c8f8ff"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
