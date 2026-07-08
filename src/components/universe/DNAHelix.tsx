"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function disableRaycast(object: THREE.Object3D | null) {
  if (object) object.raycast = () => {};
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
  const nodeMaterials = useRef<THREE.MeshStandardMaterial[]>([]);

  useFrame(({ clock }) => {
    if (!helixRef.current) return;

    const t = clock.elapsedTime;

    // Slow rotation, gentle drift — no abrupt motion
    helixRef.current.rotation.y += 0.006;
    helixRef.current.position.y = Math.sin(t * 0.6) * 0.09;

    if (glowRef.current) {
      const pulse = 1 + Math.sin(t * 0.8) * 0.07;
      glowRef.current.scale.set(pulse, pulse, pulse);
    }

    // Desynchronized breathing per node
    nodeMaterials.current.forEach((mat, i) => {
      if (!mat) return;
      mat.emissiveIntensity =
        1.4 + Math.sin(t * 0.9 + i * 0.85) * 0.45;
    });
  });

  return (
    <group ref={helixRef}>
      {/* Soft helix glow envelope */}
      <mesh ref={(el) => { glowRef.current = el; disableRaycast(el); }}>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshBasicMaterial
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
          ref={(el) => disableRaycast(el)}
          position={pos}
        >
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial
            ref={(el) => {
              if (el) nodeMaterials.current[i] = el;
            }}
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
          ref={(el) => disableRaycast(el)}
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
