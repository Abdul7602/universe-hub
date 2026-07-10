"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import PortalParticles from "./PortalParticles";
import { createFresnelMaterial, getRadialGlowTexture } from "./visuals";

type PortalProps = {
  position: [number, number, number];
};

function disableRaycast(object: THREE.Object3D | null) {
  if (object) object.raycast = () => {};
}

export default function Portal({ position }: PortalProps) {
  const ringRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);
  const horizonRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Sprite>(null);

  const horizonMaterial = useMemo(
    () =>
      createFresnelMaterial({
        color: "#7deeff",
        power: 1.8,
        intensity: 1.6,
        opacity: 0.55,
      }),
    []
  );

  const coreTexture = useMemo(
    () =>
      getRadialGlowTexture("portal-core", [
        [0, "rgba(255,255,255,0.95)"],
        [0.2, "rgba(200,248,255,0.6)"],
        [0.55, "rgba(94,228,255,0.18)"],
        [1, "rgba(94,228,255,0)"],
      ]),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01;
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 2.0 + Math.sin(t * 1.6) * 0.55;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z -= 0.007;
      const mat = innerRingRef.current
        .material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 3.6 + Math.sin(t * 2.1 + 0.8) * 0.9;
      const pulse = 1 + Math.sin(t * 1.3) * 0.04;
      innerRingRef.current.scale.set(pulse, pulse, pulse);
    }

    if (horizonRef.current) {
      const breath = 1 + Math.sin(t * 0.9) * 0.05;
      horizonRef.current.scale.set(breath, breath, breath);
      horizonMaterial.uniforms.uIntensity.value =
        1.6 + Math.sin(t * 1.1 + 2) * 0.4;
    }

    if (coreRef.current) {
      const corePulse = 1 + Math.sin(t * 1.7) * 0.08;
      coreRef.current.scale.set(corePulse * 2.4, corePulse * 2.4, 1);
      const mat = coreRef.current.material as THREE.SpriteMaterial;
      mat.opacity = 0.75 + Math.sin(t * 2.3) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Outer portal ring — slow spin, gentle emissive pulse */}
      <mesh ref={(el) => { ringRef.current = el; disableRaycast(el); }}>
        <torusGeometry args={[1.5, 0.07, 24, 120]} />
        <meshStandardMaterial
          color="#2a6a80"
          emissive="#5ee4ff"
          emissiveIntensity={2.2}
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>

      {/* Inner counter-rotating ring */}
      <mesh ref={(el) => { innerRingRef.current = el; disableRaycast(el); }}>
        <torusGeometry args={[1.22, 0.028, 16, 100]} />
        <meshStandardMaterial
          color="#8ff4ff"
          emissive="#99ffff"
          emissiveIntensity={4}
          transparent
          opacity={0.85}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      {/* Event-horizon shell — fresnel edge glow, hollow center */}
      <mesh
        ref={(el) => { horizonRef.current = el; disableRaycast(el); }}
        material={horizonMaterial}
      >
        <sphereGeometry args={[1.18, 48, 48]} />
      </mesh>

      {/* Soft luminous core */}
      <sprite
        ref={(el) => { coreRef.current = el; disableRaycast(el); }}
        scale={[2.4, 2.4, 1]}
      >
        <spriteMaterial
          map={coreTexture}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fog={false}
        />
      </sprite>

      <PortalParticles />
    </group>
  );
}
