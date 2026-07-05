"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function disableRaycast(mesh: THREE.Mesh | null) {
  if (mesh) mesh.raycast = () => {};
}

const STRAND_POSITIONS: [number, number, number][] = [
  [0.35, 0.0, 0.2],
  [-0.35, 0.2, -0.2],
  [0.35, 0.4, 0.2],
  [-0.35, 0.6, -0.2],
  [0.35, 0.8, 0.2],
  [-0.35, 1.0, -0.2],
  [0.35, 1.2, 0.2],
  [-0.35, 1.4, -0.2],
];

const RUNG_POSITIONS = [0.1, 0.5, 0.9, 1.3];

export default function DNAHelix() {
  const helixRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!helixRef.current) return;

    const t = clock.elapsedTime;
    helixRef.current.rotation.y += 0.01;
    helixRef.current.position.y = Math.sin(t * 2) * 0.15;

    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 2.5) * 0.1;
      glowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={helixRef}>
      {/* Soft helix glow envelope */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
          ref={disableRaycast}
          color="#5ee4ff"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {STRAND_POSITIONS.map((pos, i) => (
        <mesh
          key={`node-${i}`}
          ref={disableRaycast}
          position={pos}
        >
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            color={i % 2 === 0 ? "#5ee4ff" : "#99ffff"}
            emissive={i % 2 === 0 ? "#5ee4ff" : "#99ffff"}
            emissiveIntensity={1.5}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      ))}

      {RUNG_POSITIONS.map((y, i) => (
        <mesh
          key={`rung-${i}`}
          ref={disableRaycast}
          position={[0, y, 0]}
        >
          <boxGeometry args={[0.7, 0.02, 0.02]} />
          <meshStandardMaterial
            color="#c8f8ff"
            emissive="#99ffff"
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}
