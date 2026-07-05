"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNavigationStore } from "@/stores/navigationStore";
import * as THREE from "three";
import DestinationLabel from "./DestinationLabel";

function disableRaycast(mesh: THREE.Mesh | null) {
  if (mesh) mesh.raycast = () => {};
}

export default function ProjectsPlanet() {
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

  const isSelected = selectedDestination === "projects";
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const base = isSelected ? 3 : 1;
    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        base + Math.sin(t * 2) * 0.25;
    }
    if (atmosphereRef.current) {
      const breath = 1 + Math.sin(t * 1.5) * 0.05;
      atmosphereRef.current.scale.set(breath, breath, breath);
    }
  });

  return (
    <group
      position={[-12, 2, -4]}
      scale={isSelected ? 1.2 : 1}
    >
      {/* Atmosphere shell */}
      <mesh
        ref={(el) => {
          atmosphereRef.current = el;
          disableRaycast(el);
        }}
      >
        <sphereGeometry args={[1.45, 32, 32]} />
        <meshBasicMaterial
          color="#8a5fff"
          transparent
          opacity={isSelected ? 0.1 : 0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Planetary ring */}
      <mesh
        ref={disableRaycast}
        rotation={[Math.PI / 2.5, 0.3, 0]}
      >
        <torusGeometry args={[1.6, 0.015, 8, 64]} />
        <meshBasicMaterial
          color="#7b4fff"
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <mesh
        onPointerOver={() => setHoveredDestination("projects")}
        onPointerOut={() => setHoveredDestination(null)}
        onClick={() => {
          setSelectedDestination("projects");
          setCameraTarget([-12, 2, -4]);
        }}
      >
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#8a5fff"
          emissive="#7b4fff"
          emissiveIntensity={isSelected ? 3 : 1}
          metalness={0.35}
          roughness={0.45}
        />
      </mesh>

      <DestinationLabel text="Projects" position={[0, 2, 0]} />
    </group>
  );
}
