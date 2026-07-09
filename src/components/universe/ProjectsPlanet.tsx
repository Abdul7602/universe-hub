"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNavigationStore } from "@/stores/navigationStore";
import * as THREE from "three";
import DestinationLabel from "./DestinationLabel";
import {
  createFresnelMaterial,
  getCloudShellTexture,
  getQualityTier,
  getRingTexture,
  getTerrainSurface,
} from "./visuals";

function disableRaycast(object: THREE.Object3D | null) {
  if (object) object.raycast = () => {};
}

/** RingGeometry with UVs remapped radially so band textures work. */
function createRadialRingGeometry(
  innerRadius: number,
  outerRadius: number
): THREE.RingGeometry {
  const geometry = new THREE.RingGeometry(innerRadius, outerRadius, 96, 1);
  const pos = geometry.attributes.position;
  const uv = geometry.attributes.uv;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const r = Math.sqrt(x * x + y * y);
    uv.setXY(i, (r - innerRadius) / (outerRadius - innerRadius), 0.5);
  }
  uv.needsUpdate = true;
  return geometry;
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
  const hoveredDestination = useNavigationStore(
    (state) => state.hoveredDestination
  );

  const isSelected = selectedDestination === "projects";
  const isHovered = hoveredDestination === "projects";
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);
  const planetRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const emissiveLevel = useRef(0.35);

  const surface = useMemo(
    () =>
      getTerrainSurface("projects-terrain", {
        base: "#4a3585",
        low: "#241a55",
        high: "#9a7fe0",
      }),
    []
  );

  const cloudTexture = useMemo(
    () => getCloudShellTexture("projects-clouds"),
    []
  );

  const ringGeometry = useMemo(
    () => createRadialRingGeometry(1.7, 2.55),
    []
  );

  const ringTexture = useMemo(
    () => getRingTexture("projects-ring", "#9a7fff"),
    []
  );

  const atmosphereMaterial = useMemo(
    () =>
      createFresnelMaterial({
        color: "#8a5fff",
        power: 2.6,
        intensity: 1.5,
        opacity: 0.5,
      }),
    []
  );

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;

    const target = isSelected ? 1.4 : isHovered ? 0.75 : 0.35;
    emissiveLevel.current +=
      (target - emissiveLevel.current) * Math.min(delta * 4, 1);

    if (materialRef.current) {
      materialRef.current.emissiveIntensity =
        emissiveLevel.current + Math.sin(t * 0.45) * 0.08;
    }

    // Slow planetary rotation; clouds drift slightly faster
    if (planetRef.current) planetRef.current.rotation.y = t * 0.03;
    if (cloudsRef.current) cloudsRef.current.rotation.y = t * 0.045;

    atmosphereMaterial.uniforms.uIntensity.value =
      1.5 + Math.sin(t * 0.5 + 1) * 0.2;
  });

  return (
    <group
      position={[-12, 2, -4]}
      scale={isSelected ? 1.2 : 1}
    >
      {/* Local violet light grounding the planet */}
      <pointLight
        intensity={0.45}
        distance={7}
        decay={2}
        color="#8a5fff"
      />

      {/* Atmosphere — fresnel rim */}
      <mesh
        ref={(el) => disableRaycast(el)}
        material={atmosphereMaterial}
      >
        <sphereGeometry args={[1.34, 48, 48]} />
      </mesh>

      {/* Cloud shell — wispy alpha texture, independent drift.
          Skipped entirely on low-end devices. */}
      {getQualityTier() === "high" && (
      <mesh
        ref={(el) => { cloudsRef.current = el; disableRaycast(el); }}
      >
        <sphereGeometry args={[1.235, 48, 48]} />
        <meshStandardMaterial
          color="#d8dcff"
          alphaMap={cloudTexture}
          transparent
          opacity={0.55}
          depthWrite={false}
          roughness={1}
          metalness={0}
        />
      </mesh>
      )}

      {/* Banded ring with radial gradient texture */}
      <mesh
        ref={(el) => disableRaycast(el)}
        geometry={ringGeometry}
        rotation={[Math.PI / 2.5, 0.3, 0]}
      >
        <meshBasicMaterial
          map={ringTexture}
          color="#b9a4ff"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Planet body — terrain color + bump, handlers unchanged */}
      <mesh
        ref={planetRef}
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
          map={surface.map}
          bumpMap={surface.bumpMap}
          bumpScale={0.035}
          color="#cabdf5"
          emissive="#3a2080"
          emissiveIntensity={isSelected ? 1.4 : 0.35}
          metalness={0.08}
          roughness={0.75}
        />
      </mesh>

      <DestinationLabel text="Projects" position={[0, 2, 0]} />
    </group>
  );
}
