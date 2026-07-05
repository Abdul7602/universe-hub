"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNavigationStore } from "@/stores/navigationStore";
import * as THREE from "three";
import DestinationLabel from "./DestinationLabel";

function disableRaycast(mesh: THREE.Mesh | null) {
  if (mesh) mesh.raycast = () => {};
}

export default function ContactMoon() {
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

  const isSelected = selectedDestination === "contact";
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const base = isSelected ? 3 : 1;
    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        base + Math.sin(t * 1.8) * 0.2;
    }
    if (glowRef.current) {
      const breath = 1 + Math.sin(t * 1.2) * 0.06;
      glowRef.current.scale.set(breath, breath, breath);
    }
  });

  return (
    <group
      position={[0, -8, -8]}
      scale={isSelected ? 1.2 : 1}
    >
      {/* Moon glow halo */}
      <mesh
        ref={(el) => {
          glowRef.current = el;
          disableRaycast(el);
        }}
      >
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshBasicMaterial
          color="#f7c65f"
          transparent
          opacity={isSelected ? 0.1 : 0.05}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Crater-like surface detail (decorative low-opacity spots) */}
      <mesh
        ref={disableRaycast}
        position={[0.15, 0.1, 0.55]}
      >
        <sphereGeometry args={[0.12, 12, 12]} />
        <meshBasicMaterial
          color="#c8a040"
          transparent
          opacity={0.15}
        />
      </mesh>
      <mesh
        ref={disableRaycast}
        position={[-0.25, -0.15, 0.5]}
      >
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshBasicMaterial
          color="#c8a040"
          transparent
          opacity={0.12}
        />
      </mesh>

      <mesh
        onPointerOver={() => setHoveredDestination("contact")}
        onPointerOut={() => setHoveredDestination(null)}
        onClick={() => {
          setSelectedDestination("contact");
          setCameraTarget([0, -8, -8]);
        }}
      >
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#f7c65f"
          emissive="#ffd080"
          emissiveIntensity={isSelected ? 3 : 1}
          metalness={0.15}
          roughness={0.65}
        />
      </mesh>

      <DestinationLabel text="Contact" position={[0, 1.5, 0]} />
    </group>
  );
}
