"use client";

import { useNavigationStore } from "@/stores/navigationStore";
import DestinationLabel from "./DestinationLabel";

export default function LinkedInGalaxy() {
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
    selectedDestination === "linkedin";

  return (
    <group
      position={[0, 8, -8]}
      scale={isSelected ? 1.2 : 1}
    >
      <mesh
        onPointerOver={() =>
          setHoveredDestination("linkedin")
        }
        onPointerOut={() =>
          setHoveredDestination(null)
        }
        onClick={() => {
          setSelectedDestination("linkedin");
          setCameraTarget([0, 8, -8]);
        }}
      >
        <icosahedronGeometry args={[0.9, 0]} />

        <meshStandardMaterial
          color="#4fc3ff"
          emissive="#4fc3ff"
          emissiveIntensity={
            isSelected ? 3 : 1
          }
        />
      </mesh>

      <DestinationLabel
        text="LinkedIn"
        position={[0, 1.8, 0]}
      />
    </group>
  );
}
