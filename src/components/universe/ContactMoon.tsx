"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNavigationStore } from "@/stores/navigationStore";
import * as THREE from "three";
import DestinationLabel from "./DestinationLabel";
import { createFresnelMaterial, getCrateredSurface } from "./visuals";

function disableRaycast(object: THREE.Object3D | null) {
  if (object) object.raycast = () => {};
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
  const hoveredDestination = useNavigationStore(
    (state) => state.hoveredDestination
  );

  const isSelected = selectedDestination === "contact";
  const isHovered = hoveredDestination === "contact";
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const emissiveLevel = useRef(0.25);

  const surface = useMemo(
    () => getCrateredSurface("contact-moon", "#c9b090", 17, 110),
    []
  );

  const rimMaterial = useMemo(
    () =>
      createFresnelMaterial({
        color: "#ffcf88",
        power: 3,
        intensity: 1.6,
        opacity: 0.5,
      }),
    []
  );

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;

    const target = isSelected ? 1.2 : isHovered ? 0.6 : 0.25;
    emissiveLevel.current +=
      (target - emissiveLevel.current) * Math.min(delta * 4, 1);

    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        emissiveLevel.current + Math.sin(t * 0.3) * 0.05;
    }

    rimMaterial.uniforms.uIntensity.value =
      1.6 + Math.sin(t * 0.4 + 2.5) * 0.25;
  });

  return (
    <group
      position={[0, -8, -8]}
      scale={isSelected ? 1.2 : 1}
    >
      {/* Faint warm local light — quiet ambience */}
      <pointLight
        intensity={0.35}
        distance={6}
        decay={2}
        color="#ffd8a0"
      />

      {/* Warm fresnel rim glow */}
      <mesh
        ref={(el) => disableRaycast(el)}
        material={rimMaterial}
      >
        <sphereGeometry args={[0.735, 48, 48]} />
      </mesh>

      {/* Moon body — cratered surface, static (no axial rotation) */}
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
          map={surface.map}
          bumpMap={surface.bumpMap}
          bumpScale={0.04}
          color="#e8d4b0"
          emissive="#ffd080"
          emissiveIntensity={isSelected ? 1.2 : 0.25}
          metalness={0}
          roughness={0.92}
        />
      </mesh>

      <DestinationLabel text="Contact" position={[0, 1.5, 0]} />
    </group>
  );
}
