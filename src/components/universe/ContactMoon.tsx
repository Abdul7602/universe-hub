"use client";

import { useNavigationStore } from "@/stores/navigationStore";
import DestinationLabel from "./DestinationLabel";

export default function ContactMoon() {
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
    selectedDestination === "contact";

  return (
    <group
      position={[0, -8, -8]}
      scale={isSelected ? 1.2 : 1}
    >
      <mesh
        onPointerOver={() =>
          setHoveredDestination("contact")
        }
        onPointerOut={() =>
          setHoveredDestination(null)
        }
        onClick={() =>
          setSelectedDestination("contact")
        }
      >
        <sphereGeometry args={[0.7, 64, 64]} />

        <meshStandardMaterial
          color="#f7c65f"
          emissive="#f7c65f"
          emissiveIntensity={
            isSelected ? 3 : 1
          }
        />
      </mesh>

      <DestinationLabel
        text="Contact"
        position={[0, 1.5, 0]}
      />
    </group>
  );
}
