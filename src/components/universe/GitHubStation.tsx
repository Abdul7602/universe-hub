"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNavigationStore } from "@/stores/navigationStore";
import * as THREE from "three";
import DestinationLabel from "./DestinationLabel";

function disableRaycast(mesh: THREE.Mesh | null) {
  if (mesh) mesh.raycast = () => {};
}

export default function GitHubStation() {
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

  const isSelected = selectedDestination === "github";
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const auraRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const base = isSelected ? 4 : 1.5;
    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        base + Math.sin(t * 2.5) * 0.3;
    }
    if (auraRef.current) {
      const pulse = 1 + Math.sin(t * 1.8) * 0.08;
      auraRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group
      position={[10, 0, -2]}
      scale={isSelected ? 1.2 : 1}
    >
      {/* Cyan aura shell */}
      <mesh
        ref={(el) => {
          auraRef.current = el;
          disableRaycast(el);
        }}
      >
        <octahedronGeometry args={[1.15, 0]} />
        <meshBasicMaterial
          color="#5ee4ff"
          transparent
          opacity={isSelected ? 0.12 : 0.06}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Orbital accent ring */}
      <mesh
        ref={disableRaycast}
        rotation={[Math.PI / 4, Math.PI / 6, 0]}
      >
        <torusGeometry args={[1.1, 0.012, 8, 48]} />
        <meshBasicMaterial
          color="#5ee4ff"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh
        onPointerOver={() => setHoveredDestination("github")}
        onPointerOut={() => setHoveredDestination(null)}
        onClick={() => {
          setSelectedDestination("github");
          setCameraTarget([10, 0, -2]);
        }}
      >
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#7df9ff"
          emissive="#5ee4ff"
          emissiveIntensity={isSelected ? 4 : 1.5}
          metalness={0.5}
          roughness={0.2}
        />
      </mesh>

      <DestinationLabel text="GitHub" position={[0, 1.5, 0]} />
    </group>
  );
}
