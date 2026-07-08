"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { getRadialGlowTexture } from "./visuals";

const PARTICLE_COUNT = 10;
const ORBIT_RADIUS = 2;

function disableRaycast(object: THREE.Object3D | null) {
  if (object) object.raycast = () => {};
}

export default function PortalParticles() {
  const groupRef = useRef<THREE.Group>(null);
  const particlesRef = useRef<THREE.Sprite[]>([]);

  const texture = useMemo(
    () =>
      getRadialGlowTexture("portal-particle", [
        [0, "rgba(220,250,255,0.9)"],
        [0.35, "rgba(150,240,255,0.4)"],
        [1, "rgba(94,228,255,0)"],
      ]),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.25;
    }

    particlesRef.current.forEach((particle, i) => {
      if (!particle) return;

      const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
      // Gentle radial ease in/out rather than fast wobble
      const wobble = Math.sin(t * 0.9 + i * 1.5) * 0.18;
      const r = ORBIT_RADIUS + wobble;

      particle.position.x = Math.cos(angle + t * 0.12) * r;
      particle.position.y = Math.sin(angle + t * 0.12) * r;

      const mat = particle.material as THREE.SpriteMaterial;
      mat.opacity = 0.45 + Math.sin(t * 1.4 + i * 0.8) * 0.3;

      const scale = 0.22 + Math.sin(t * 1.1 + i) * 0.06;
      particle.scale.set(scale, scale, 1);
    });
  });

  return (
    <group ref={groupRef}>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <sprite
          key={i}
          ref={(el) => {
            if (el) particlesRef.current[i] = el;
            disableRaycast(el);
          }}
          scale={[0.22, 0.22, 1]}
        >
          <spriteMaterial
            map={texture}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            fog={false}
          />
        </sprite>
      ))}
    </group>
  );
}
