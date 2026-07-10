"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNavigationStore } from "@/stores/navigationStore";
import * as THREE from "three";
import DestinationLabel from "./DestinationLabel";
import { createFresnelMaterial, getLunarSurface } from "./visuals";

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
    () => getLunarSurface("contact-moon"),
    []
  );

  // Warm-neutral rim: gray moon body, but the rim ties it to the
  // scene's warm sun key light so it belongs to the same universe
  const rimMaterial = useMemo(
    () =>
      createFresnelMaterial({
        color: "#f5ddb0",
        power: 3.2,
        intensity: 1.45,
        opacity: 0.45,
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

    // Slow axial rotation around the moon's own tilted vertical
    // axis — one revolution every ~2.5 minutes, stationary in space
    if (moonRef.current) moonRef.current.rotation.y = t * 0.04;

    rimMaterial.uniforms.uIntensity.value =
      1.45 + Math.sin(t * 0.4 + 2.5) * 0.22;
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
        color="#f2ddb8"
      />

      {/* Warm-neutral fresnel rim glow */}
      <mesh
        ref={(el) => disableRaycast(el)}
        material={rimMaterial}
      >
        <sphereGeometry args={[0.735, 48, 48]} />
      </mesh>

      {/* Moon body — lunar surface, handlers unchanged */}
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
          bumpScale={0.055}
          roughnessMap={surface.roughnessMap}
          color="#dfe2e8"
          emissive="#d8ccb4"
          emissiveIntensity={isSelected ? 1.2 : 0.25}
          metalness={0}
          roughness={1}
        />
      </mesh>

      <DestinationLabel text="Contact" position={[0, 1.5, 0]} />
    </group>
  );
}
