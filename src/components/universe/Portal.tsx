"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import PortalParticles from "./PortalParticles";

type PortalProps = {
  position: [number, number, number];
};

function disableRaycast(mesh: THREE.Mesh | null) {
  if (mesh) mesh.raycast = () => {};
}

export default function Portal({ position }: PortalProps) {
  const portalRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (portalRef.current) {
      portalRef.current.rotation.z += 0.012;
      const mat = portalRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2 + Math.sin(t * 3) * 1.2;
    }

    if (innerRef.current) {
      innerRef.current.rotation.z -= 0.008;
      const mat = innerRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 6 + Math.sin(t * 4) * 2;
      const innerPulse = 1 + Math.sin(t * 2.5) * 0.06;
      innerRef.current.scale.set(innerPulse, innerPulse, innerPulse);
    }

    if (outerGlowRef.current) {
      const glowPulse = 1 + Math.sin(t * 1.8) * 0.08;
      outerGlowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
    }

    if (coreRef.current) {
      const corePulse = 1 + Math.sin(t * 5) * 0.1;
      coreRef.current.scale.set(corePulse, corePulse, corePulse);
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 12 + Math.sin(t * 6) * 4;
    }
  });

  return (
    <group position={position}>
      {/* Outer volumetric glow */}
      <mesh ref={disableRaycast}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshBasicMaterial
          color="#5ee4ff"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Portal torus ring */}
      <mesh ref={portalRef}>
        <torusGeometry args={[1.5, 0.08, 16, 100]} />
        <meshStandardMaterial
          color="#5ee4ff"
          emissive="#5ee4ff"
          emissiveIntensity={2}
          metalness={0.3}
          roughness={0.2}
        />
      </mesh>

      {/* Secondary inner ring */}
      <mesh ref={innerRef}>
        <torusGeometry args={[1.2, 0.04, 12, 80]} />
        <meshStandardMaterial
          color="#99ffff"
          emissive="#99ffff"
          emissiveIntensity={6}
          transparent
          opacity={0.7}
          metalness={0.4}
          roughness={0.15}
        />
      </mesh>

      {/* Inner glowing sphere */}
      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#99ffff"
          emissive="#99ffff"
          emissiveIntensity={10}
          transparent
          opacity={0.75}
          metalness={0.2}
          roughness={0.1}
        />
      </mesh>

      {/* Bright core */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#c8f8ff"
          emissiveIntensity={12}
          transparent
          opacity={0.9}
        />
      </mesh>

      <PortalParticles />
    </group>
  );
}
