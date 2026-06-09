"use client";

import { useNavigationStore } from "@/stores/navigationStore";
import DestinationLabel from "./DestinationLabel";

export default function ProjectsPlanet() {
  const setHoveredDestination =
    useNavigationStore(
      (state) => state.setHoveredDestination
    );

  const setSelectedDestination =
    useNavigationStore(
      (state) => state.setSelectedDestination
    );

  const selectedDestination =
    useNavigationStore(
      (state) => state.selectedDestination
    );

  const isSelected =
    selectedDestination === "projects";

  return (
    <group
      position={[-12, 2, -4]}
      scale={isSelected ? 1.2 : 1}
    >
      <mesh
        onPointerOver={() =>
          setHoveredDestination("projects")
        }
        onPointerOut={() =>
          setHoveredDestination(null)
        }
        onClick={() =>
          setSelectedDestination("projects")
        }
      >
        <sphereGeometry args={[1.2, 64, 64]} />

        <meshStandardMaterial
          color="#8a5fff"
          emissive="#8a5fff"
          emissiveIntensity={
            isSelected ? 3 : 1
          }
        />
      </mesh>

      <DestinationLabel
        text="Projects"
        position={[0, 2, 0]}
      />
    </group>
  );
}
