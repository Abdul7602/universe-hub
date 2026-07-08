"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getRadialGlowTexture } from "./visuals";

function disableRaycast(object: THREE.Object3D | null) {
  if (object) object.raycast = () => {};
}

export default function OrbitRing() {
  const groupRef = useRef<THREE.Group>(null);
  const primaryRef = useRef<THREE.MeshBasicMaterial>(null);
  const ghostRef = useRef<THREE.MeshBasicMaterial>(null);
  const outerRef = useRef<THREE.MeshBasicMaterial>(null);
  const sparkRef = useRef<THREE.Sprite>(null);

  const sparkTexture = useMemo(
    () =>
      getRadialGlowTexture("orbit-spark", [
        [0, "rgba(240,255,255,0.9)"],
        [0.3, "rgba(94,228,255,0.45)"],
        [1, "rgba(94,228,255,0)"],
      ]),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    // Gentle breathing — slower than before, no strobing
    const pulse = 0.3 + Math.sin(t * 0.7) * 0.08;
    const ghostPulse = 0.12 + Math.sin(t * 0.9 + 1.2) * 0.04;

    if (primaryRef.current) primaryRef.current.opacity = pulse;
    if (ghostRef.current) ghostRef.current.opacity = ghostPulse;
    if (outerRef.current) {
      outerRef.current.opacity = 0.06 + Math.sin(t * 0.5) * 0.02;
    }

    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.015;
    }

    // Bright spark travelling the ring — a slow sheen sweep
    if (sparkRef.current) {
      const a = t * 0.22;
      sparkRef.current.position.set(
        Math.cos(a) * 4,
        Math.sin(a) * 4,
        0
      );
      const mat = sparkRef.current.material as THREE.SpriteMaterial;
      mat.opacity = 0.5 + Math.sin(t * 0.9) * 0.2;
    }
  });

  return (
    <group ref={groupRef} rotation={[Math.PI / 2, 0, 0]}>
      {/* Primary holographic ring */}
      <mesh ref={(el) => disableRaycast(el)}>
        <torusGeometry args={[4, 0.018, 16, 200]} />
        <meshBasicMaterial
          ref={primaryRef}
          color="#5ee4ff"
          transparent
          opacity={0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Ghost ring — slightly larger, offset */}
      <mesh
        ref={(el) => disableRaycast(el)}
        rotation={[0, 0, Math.PI / 6]}
      >
        <torusGeometry args={[4.08, 0.008, 12, 200]} />
        <meshBasicMaterial
          ref={ghostRef}
          color="#8a5fff"
          transparent
          opacity={0.12}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Outer soft glow halo */}
      <mesh ref={(el) => disableRaycast(el)}>
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
      <mesh ref={(el) => disableRaycast(el)}>
        <torusGeometry args={[4, 0.006, 8, 200]} />
        <meshBasicMaterial
          color="#c8f8ff"
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Travelling spark */}
      <sprite
        ref={(el) => { sparkRef.current = el; disableRaycast(el); }}
        scale={[0.55, 0.55, 1]}
      >
        <spriteMaterial
          map={sparkTexture}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fog={false}
        />
      </sprite>
    </group>
  );
}
