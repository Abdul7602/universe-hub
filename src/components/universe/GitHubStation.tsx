"use client";

import { useNavigationStore } from "@/stores/navigationStore";
import DestinationLabel from "./DestinationLabel";

export default function GitHubStation() {
  const setHoveredDestination =
    useNavigationStore(
      (state) => state.setHoveredDestination
    );

  const setSelectedDestination =
    useNavigationStore(
      (state) => state.setSelectedDestination
    );

  const setCameraTarget =
    useNavigationStore(
      (state) => state.setCameraTarget
    );

  const selectedDestination =
    useNavigationStore(
      (state) => state.selectedDestination
    );

  const isSelected =
    selectedDestination === "github";

  return (
    <group
      position={[10, 0, -2]}
      scale={isSelected ? 1.2 : 1}
    >
      <mesh
        onPointerOver={() =>
          setHoveredDestination("github")
        }
        onPointerOut={() =>
          setHoveredDestination(null)
        }
        onClick={() => {
          setSelectedDestination("github");
          setCameraTarget([10, 0, -2]);
        }}
      >
        <octahedronGeometry args={[0.8, 0]} />

        <meshStandardMaterial
          color="#7df9ff"
          emissive="#7df9ff"
          emissiveIntensity={
            isSelected ? 4 : 1.5
          }
        />
      </mesh>

      <DestinationLabel
        text="GitHub"
        position={[0, 1.5, 0]}
      />
    </group>
  );
}
