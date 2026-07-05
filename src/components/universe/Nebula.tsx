"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function disableRaycast(mesh: THREE.Mesh | null) {
  if (mesh) mesh.raycast = () => {};
}

export default function Nebula() {
  const groupRef = useRef<THREE.Group>(null);
  const breathRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;

    const t = clock.elapsedTime;
    groupRef.current.rotation.z = t * 0.008;

    if (breathRef.current) {
      const breath = 1 + Math.sin(t * 0.4) * 0.04;
      breathRef.current.scale.set(breath, breath, breath);
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={breathRef}>
        {/* Primary purple cloud */}
        <mesh
          ref={disableRaycast}
          position={[-12, 4, -20]}
        >
          <sphereGeometry args={[8, 32, 32]} />
          <meshBasicMaterial
            color="#5a3a9a"
            transparent
            opacity={0.07}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Teal accent layer — offset for color mixing */}
        <mesh
          ref={disableRaycast}
          position={[-10, 2, -19]}
        >
          <sphereGeometry args={[6, 32, 32]} />
          <meshBasicMaterial
            color="#1a9eb8"
            transparent
            opacity={0.05}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Secondary teal cloud */}
        <mesh
          ref={disableRaycast}
          position={[10, -3, -18]}
        >
          <sphereGeometry args={[6, 32, 32]} />
          <meshBasicMaterial
            color="#1488aa"
            transparent
            opacity={0.055}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Violet highlight on teal region */}
        <mesh
          ref={disableRaycast}
          position={[12, -1, -17]}
        >
          <sphereGeometry args={[4, 24, 24]} />
          <meshBasicMaterial
            color="#7b4fff"
            transparent
            opacity={0.04}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Upper crown nebula */}
        <mesh
          ref={disableRaycast}
          position={[0, 8, -25]}
        >
          <sphereGeometry args={[10, 32, 32]} />
          <meshBasicMaterial
            color="#8a5fff"
            transparent
            opacity={0.045}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Soft magenta wash for warmth */}
        <mesh
          ref={disableRaycast}
          position={[2, 6, -24]}
        >
          <sphereGeometry args={[7, 24, 24]} />
          <meshBasicMaterial
            color="#6a3080"
            transparent
            opacity={0.03}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>

        {/* Deep background wash */}
        <mesh
          ref={disableRaycast}
          position={[0, 0, -30]}
        >
          <sphereGeometry args={[14, 24, 24]} />
          <meshBasicMaterial
            color="#1a1040"
            transparent
            opacity={0.025}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
