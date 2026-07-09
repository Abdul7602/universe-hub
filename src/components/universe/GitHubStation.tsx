"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useNavigationStore } from "@/stores/navigationStore";
import * as THREE from "three";
import DestinationLabel from "./DestinationLabel";
import { createFresnelMaterial } from "./visuals";

function disableRaycast(object: THREE.Object3D | null) {
  if (object) object.raycast = () => {};
}

const SPOKE_ANGLES = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];

export default function GitHubStation() {
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

  const isSelected = selectedDestination === "github";
  const isHovered = hoveredDestination === "github";
  const coreMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const habitatRef = useRef<THREE.Group>(null);
  const beaconRef = useRef<THREE.MeshStandardMaterial>(null);
  const navLightARef = useRef<THREE.MeshStandardMaterial>(null);
  const navLightBRef = useRef<THREE.MeshStandardMaterial>(null);
  const droneARef = useRef<THREE.Group>(null);
  const droneBRef = useRef<THREE.Group>(null);
  const emissiveLevel = useRef(1.5);

  const shellMaterial = useMemo(
    () =>
      createFresnelMaterial({
        color: "#5ee4ff",
        power: 3,
        intensity: 1,
        opacity: 0.3,
      }),
    []
  );

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;

    const target = isSelected ? 4 : isHovered ? 2.4 : 1.5;
    emissiveLevel.current +=
      (target - emissiveLevel.current) * Math.min(delta * 4, 1);

    if (coreMaterialRef.current) {
      coreMaterialRef.current.emissiveIntensity =
        emissiveLevel.current + Math.sin(t * 0.8) * 0.25;
    }

    // Habitat ring rotates slowly about the station axis
    if (habitatRef.current) {
      habitatRef.current.rotation.z = t * 0.12;
    }

    // Beacon: sharp periodic blink, ~0.5 Hz
    if (beaconRef.current) {
      const blink = Math.pow(
        Math.max(0, Math.sin(t * 3.1)),
        12
      );
      beaconRef.current.emissiveIntensity = 0.4 + blink * 6;
    }

    // Nav lights alternate
    if (navLightARef.current) {
      navLightARef.current.emissiveIntensity =
        1 + Math.max(0, Math.sin(t * 2)) * 3;
    }
    if (navLightBRef.current) {
      navLightBRef.current.emissiveIntensity =
        1 + Math.max(0, Math.sin(t * 2 + Math.PI)) * 3;
    }

    // Maintenance drones on inclined orbits
    if (droneARef.current) {
      const a = t * 0.45;
      droneARef.current.position.set(
        Math.cos(a) * 1.7,
        Math.sin(a * 1.3) * 0.35,
        Math.sin(a) * 1.7
      );
    }
    if (droneBRef.current) {
      const a = -t * 0.32 + 2;
      droneBRef.current.position.set(
        Math.cos(a) * 2,
        Math.cos(a * 0.9) * 0.5,
        Math.sin(a) * 2
      );
    }
  });

  return (
    <group
      position={[10, 0, -2]}
      scale={isSelected ? 1.2 : 1}
    >
      {/* Local cyan work-light */}
      <pointLight
        intensity={0.5}
        distance={7}
        decay={2}
        color="#5ee4ff"
      />

      {/* Fresnel energy shell */}
      <mesh
        ref={(el) => disableRaycast(el)}
        material={shellMaterial}
      >
        <sphereGeometry args={[1.35, 32, 32]} />
      </mesh>

      {/* Station superstructure — tilted as one assembly */}
      <group rotation={[0.35, 0.2, 0]}>
        {/* Rotating habitat ring + docking spokes */}
        <group ref={habitatRef}>
          <mesh ref={(el) => disableRaycast(el)}>
            <torusGeometry args={[1.15, 0.07, 12, 72]} />
            <meshStandardMaterial
              color="#8a98ac"
              metalness={0.85}
              roughness={0.35}
            />
          </mesh>

          {SPOKE_ANGLES.map((angle, i) => (
            <mesh
              key={i}
              ref={(el) => disableRaycast(el)}
              position={[
                Math.cos(angle) * 0.575,
                Math.sin(angle) * 0.575,
                0,
              ]}
              rotation={[0, 0, angle]}
            >
              <boxGeometry args={[1.15, 0.045, 0.045]} />
              <meshStandardMaterial
                color="#5a6678"
                metalness={0.8}
                roughness={0.45}
              />
            </mesh>
          ))}

          {/* Alternating navigation lights on the ring */}
          <mesh
            ref={(el) => disableRaycast(el)}
            position={[1.15, 0, 0.09]}
          >
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial
              ref={navLightARef}
              color="#ffffff"
              emissive="#5ee4ff"
              emissiveIntensity={2}
            />
          </mesh>
          <mesh
            ref={(el) => disableRaycast(el)}
            position={[-1.15, 0, 0.09]}
          >
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial
              ref={navLightBRef}
              color="#ffffff"
              emissive="#ffb340"
              emissiveIntensity={2}
            />
          </mesh>
        </group>

        {/* Antenna mast + blinking beacon */}
        <group position={[0, 0, 0]}>
          <mesh
            ref={(el) => disableRaycast(el)}
            position={[0, 0.78, 0]}
          >
            <cylinderGeometry args={[0.018, 0.028, 0.7, 8]} />
            <meshStandardMaterial
              color="#6a7688"
              metalness={0.85}
              roughness={0.4}
            />
          </mesh>
          <mesh
            ref={(el) => disableRaycast(el)}
            position={[0, 1.16, 0]}
          >
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial
              ref={beaconRef}
              color="#ffffff"
              emissive="#ff5e5e"
              emissiveIntensity={0.4}
            />
          </mesh>
        </group>

        {/* Maintenance drones */}
        <group ref={droneARef}>
          <mesh ref={(el) => disableRaycast(el)}>
            <octahedronGeometry args={[0.055, 0]} />
            <meshStandardMaterial
              color="#aab8cc"
              emissive="#5ee4ff"
              emissiveIntensity={1.6}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </group>
        <group ref={droneBRef}>
          <mesh ref={(el) => disableRaycast(el)}>
            <octahedronGeometry args={[0.045, 0]} />
            <meshStandardMaterial
              color="#aab8cc"
              emissive="#99ffff"
              emissiveIntensity={1.4}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
        </group>
      </group>

      {/* Interactive station core — geometry and handlers unchanged */}
      <mesh
        onPointerOver={() => setHoveredDestination("github")}
        onPointerOut={() => setHoveredDestination(null)}
        onClick={() => {
          setSelectedDestination("github");
          setCameraTarget([10, 0, -2]);
        }}
      >
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          ref={coreMaterialRef}
          color="#3c4a5c"
          emissive="#5ee4ff"
          emissiveIntensity={isSelected ? 4 : 1.5}
          metalness={0.85}
          roughness={0.28}
          flatShading
        />
      </mesh>

      <DestinationLabel text="GitHub" position={[0, 1.5, 0]} />
    </group>
  );
}
