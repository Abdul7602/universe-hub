"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 8;
const ORBIT_RADIUS = 2;

function disableRaycast(mesh: THREE.Mesh | null) {
  if (mesh) mesh.raycast = () => {};
}

export default function PortalParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Mesh[]>([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.4;
    }

    particlesRef.current.forEach((particle, i) => {
      if (!particle) return;

      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      const wobble = Math.sin(t * 3 + i * 1.5) * 0.15;
      const r = ORBIT_RADIUS + wobble;

      particle.position.x = Math.cos(angle + t * 0.2) * r;
      particle.position.y = Math.sin(angle + t * 0.2) * r;

      const mat = particle.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.5 + Math.sin(t * 4 + i * 0.8) * 0.4;

      const scale = 0.8 + Math.sin(t * 5 + i) * 0.3;
      particle.scale.set(scale, scale, scale);
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el;
            disableRaycast(el);
          }}
        >
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial
            color="#c8f8ff"
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}
