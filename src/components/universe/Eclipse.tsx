"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function disableRaycast(mesh: THREE.Mesh | null) {
  if (mesh) mesh.raycast = () => {};
}

export default function Eclipse() {
  const coronaRef = useRef<THREE.Mesh>(null);
  const innerGlowRef = useRef<THREE.Mesh>(null);
  const outerHaloRef = useRef<THREE.Mesh>(null);
  const rimRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 1.5) * 0.08;
    const slowBreath = 1 + Math.sin(t * 0.6) * 0.05;

    if (coronaRef.current) {
      coronaRef.current.scale.set(pulse, pulse, pulse);
      coronaRef.current.rotation.z += 0.0008;
    }

    if (innerGlowRef.current) {
      const innerPulse = 1 + Math.sin(t * 2.2) * 0.06;
      innerGlowRef.current.scale.set(innerPulse, innerPulse, innerPulse);
    }

    if (outerHaloRef.current) {
      outerHaloRef.current.scale.set(slowBreath, slowBreath, slowBreath);
      outerHaloRef.current.rotation.z -= 0.0004;
    }

    if (rimRef.current) {
      const rimPulse = 1 + Math.sin(t * 3) * 0.03;
      rimRef.current.scale.set(rimPulse, rimPulse, rimPulse);
    }
  });

  return (
    <group>
      {/* Outermost diffuse halo */}
      <mesh ref={disableRaycast}>
        <sphereGeometry args={[4.2, 48, 48]} />
        <meshBasicMaterial
          color="#ffb340"
          transparent
          opacity={0.025}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Secondary halo */}
      <mesh ref={outerHaloRef}>
        <sphereGeometry args={[3.4, 64, 64]} />
        <meshBasicMaterial
          color="#ffdd88"
          transparent
          opacity={0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Primary corona */}
      <mesh ref={coronaRef}>
        <sphereGeometry args={[2.8, 64, 64]} />
        <meshBasicMaterial
          color="#f7c65f"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Inner warm glow */}
      <mesh ref={innerGlowRef}>
        <sphereGeometry args={[2.3, 48, 48]} />
        <meshBasicMaterial
          color="#ffe8a0"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Bright corona rim */}
      <mesh ref={rimRef}>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshBasicMaterial
          color="#fff0c0"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Eclipse core */}
      <mesh ref={disableRaycast}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}
