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
  const moonRef = useRef<THREE.Mesh>(null);
  const emissiveLevel = useRef(0.25);

  const surface = useMemo(
    () => getCrateredSurface("contact-moon", "#a8a49c", 17, 150),
    []
  );

  const rimMaterial = useMemo(
    () =>
      createFresnelMaterial({
        color: "#f2d6a0",
        power: 3.2,
        intensity: 1.4,
        opacity: 0.42,
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

    // Quiet, slow lunar rotation about a gently tilted axis
    if (moonRef.current) moonRef.current.rotation.y = t * 0.015;

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

      {/* Moon body — cratered surface, handlers unchanged */}
      <mesh
        ref={moonRef}
        rotation={[0.06, 0, 0.18]}
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
          bumpScale={0.05}
          color="#d2cec6"
          emissive="#d8c8a8"
          emissiveIntensity={isSelected ? 1.2 : 0.25}
          metalness={0}
          roughness={0.97}
        />
      </mesh>

      <DestinationLabel text="Contact" position={[0, 1.5, 0]} />
    </group>
  );
}
