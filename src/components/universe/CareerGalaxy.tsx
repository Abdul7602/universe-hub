"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNavigationStore } from "@/stores/navigationStore";
import * as THREE from "three";
import DestinationLabel from "./DestinationLabel";
import DNAHelix from "./DNAHelix";

function disableRaycast(mesh: THREE.Mesh | null) {
  if (mesh) mesh.raycast = () => {};
}

export default function CareerGalaxy() {
  const setHoveredDestination = useNavigationStore(
    (state) => state.setHoveredDestination
  );
  const setSelectedDestination = useNavigationStore(
    (state) => state.setSelectedDestination
  );
  const setCameraTarget = useNavigationStore(
    (state) => state.setCameraTarget
  );
  const selectedDestination = useNavigationStore(
    (state) => state.selectedDestination
  );

  const isSelected = selectedDestination === "career";
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const base = isSelected ? 3 : 1;
    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        base + Math.sin(t * 2.2) * 0.3;
    }
    if (haloRef.current) {
      haloRef.current.rotation.y = t * 0.15;
      const pulse = 1 + Math.sin(t * 1.6) * 0.06;
      haloRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group
      position={[0, 8, -8]}
      scale={isSelected ? 1.2 : 1}
    >
      {/* Galaxy particle halo */}
      <mesh
        ref={(el) => {
          haloRef.current = el;
          disableRaycast(el);
        }}
      >
        <icosahedronGeometry args={[1.35, 1]} />
        <meshBasicMaterial
          color="#4fc3ff"
          transparent
          opacity={isSelected ? 0.08 : 0.04}
          wireframe
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Soft outer glow */}
      <mesh ref={disableRaycast}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshBasicMaterial
          color="#5ee4ff"
          transparent
          opacity={0.04}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh
        onPointerOver={() => setHoveredDestination("career")}
        onPointerOut={() => setHoveredDestination(null)}
        onClick={() => {
          setSelectedDestination("career");
          setCameraTarget([0, 8, -8]);
        }}
      >
        <icosahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#4fc3ff"
          emissive="#5ee4ff"
          emissiveIntensity={isSelected ? 3 : 1}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>

      <group position={[0, 2.2, 0]}>
        <DNAHelix />
      </group>

      <DestinationLabel text="Career" position={[0, 1.8, 0]} />
    </group>
  );
}
