"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function disableRaycast(object: THREE.Object3D | null) {
  if (object) object.raycast = () => {};
}

export default function Satellite() {
  const bodyRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const r = 5;

    if (bodyRef.current) {
      bodyRef.current.position.x = Math.cos(t * 0.5) * r;
      bodyRef.current.position.z = Math.sin(t * 0.5) * r;
      bodyRef.current.position.y = Math.sin(t * 0.7) * 0.5;

      // Face along direction of travel, panels catching the light
      bodyRef.current.rotation.y = -t * 0.5;
      bodyRef.current.rotation.z = Math.sin(t * 0.4) * 0.15;
    }

    if (glowRef.current && bodyRef.current) {
      glowRef.current.position.copy(bodyRef.current.position);
      const glowPulse = 1 + Math.sin(t * 1.2) * 0.12;
      glowRef.current.scale.set(glowPulse, glowPulse, glowPulse);
    }

    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        2.2 + Math.sin(t * 1.6) * 0.5;
    }
  });

  return (
    <group>
      {/* Soft glow halo — follows satellite */}
      <mesh ref={(el) => { glowRef.current = el; disableRaycast(el); }}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshBasicMaterial
          color="#5ee4ff"
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <group ref={bodyRef}>
        {/* Body */}
        <mesh ref={(el) => disableRaycast(el)}>
          <sphereGeometry args={[0.13, 24, 24]} />
          <meshStandardMaterial
            ref={materialRef}
            color="#d8e4f0"
            emissive="#5ee4ff"
            emissiveIntensity={2.2}
            metalness={0.7}
            roughness={0.25}
          />
        </mesh>

        {/* Solar panel wings */}
        <mesh
          ref={(el) => disableRaycast(el)}
          position={[0.28, 0, 0]}
        >
          <boxGeometry args={[0.3, 0.008, 0.12]} />
          <meshStandardMaterial
            color="#1a2c5a"
            emissive="#2a4a9a"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.35}
          />
        </mesh>
        <mesh
          ref={(el) => disableRaycast(el)}
          position={[-0.28, 0, 0]}
        >
          <boxGeometry args={[0.3, 0.008, 0.12]} />
          <meshStandardMaterial
            color="#1a2c5a"
            emissive="#2a4a9a"
            emissiveIntensity={0.4}
            metalness={0.9}
            roughness={0.35}
          />
        </mesh>
      </group>
    </group>
  );
}
