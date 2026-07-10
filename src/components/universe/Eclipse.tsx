"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { createFresnelMaterial, getRadialGlowTexture } from "./visuals";

function disableRaycast(object: THREE.Object3D | null) {
  if (object) object.raycast = () => {};
}

/**
 * Central eclipse: black disc occluding a warm sun. Corona rendered
 * with two gradient sprites (broad halo + tight bright corona) plus a
 * fresnel "ring of fire" shell hugging the black core.
 */
export default function Eclipse() {
  const outerCoronaRef = useRef<THREE.Sprite>(null);
  const innerCoronaRef = useRef<THREE.Sprite>(null);
  const rimRef = useRef<THREE.Mesh>(null);

  const outerTexture = useMemo(
    () =>
      getRadialGlowTexture("eclipse-outer", [
        [0, "rgba(255,214,138,0.55)"],
        [0.25, "rgba(255,179,64,0.28)"],
        [0.55, "rgba(220,120,40,0.1)"],
        [1, "rgba(180,80,20,0)"],
      ]),
    []
  );

  const innerTexture = useMemo(
    () =>
      getRadialGlowTexture("eclipse-inner", [
        [0, "rgba(255,244,214,0.9)"],
        [0.35, "rgba(255,220,140,0.5)"],
        [0.7, "rgba(255,180,80,0.14)"],
        [1, "rgba(255,150,50,0)"],
      ]),
    []
  );

  const rimMaterial = useMemo(
    () =>
      createFresnelMaterial({
        color: "#ffd894",
        power: 3.5,
        intensity: 2.4,
        opacity: 0.85,
      }),
    []
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    if (outerCoronaRef.current) {
      const breath = 1 + Math.sin(t * 0.35) * 0.05;
      outerCoronaRef.current.scale.set(breath * 11, breath * 11, 1);
      const mat = outerCoronaRef.current
        .material as THREE.SpriteMaterial;
      mat.rotation = t * 0.01;
    }

    if (innerCoronaRef.current) {
      const pulse = 1 + Math.sin(t * 0.9 + 1.4) * 0.04;
      innerCoronaRef.current.scale.set(pulse * 6.2, pulse * 6.2, 1);
      const mat = innerCoronaRef.current
        .material as THREE.SpriteMaterial;
      mat.rotation = -t * 0.015;
    }

    if (rimRef.current) {
      const rimPulse = 1 + Math.sin(t * 1.4) * 0.012;
      rimRef.current.scale.set(rimPulse, rimPulse, rimPulse);
      rimMaterial.uniforms.uIntensity.value =
        2.4 + Math.sin(t * 0.7) * 0.35;
    }
  });

  return (
    <group>
      {/* Broad warm outer halo */}
      <sprite ref={(el) => { outerCoronaRef.current = el; disableRaycast(el); }} scale={[11, 11, 1]}>
        <spriteMaterial
          map={outerTexture}
          transparent
          opacity={0.5}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fog={false}
        />
      </sprite>

      {/* Tight bright corona */}
      <sprite ref={(el) => { innerCoronaRef.current = el; disableRaycast(el); }} scale={[6.2, 6.2, 1]}>
        <spriteMaterial
          map={innerTexture}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          fog={false}
        />
      </sprite>

      {/* Ring-of-fire rim hugging the black disc */}
      <mesh
        ref={(el) => { rimRef.current = el; disableRaycast(el); }}
        material={rimMaterial}
      >
        <sphereGeometry args={[2.06, 64, 64]} />
      </mesh>

      {/* Eclipse core — pure occluder */}
      <mesh ref={disableRaycast}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>
    </group>
  );
}
