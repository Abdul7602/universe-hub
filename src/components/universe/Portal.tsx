"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import PortalParticles from "./PortalParticles";

type PortalProps = {
position: [number, number, number];
};

export default function Portal({
position,
}: PortalProps) {
const portalRef =
useRef<THREE.Mesh>(null);

useFrame(({ clock }) => {
if (!portalRef.current) return;

portalRef.current.rotation.z += 0.01;

const pulse =
  2 +
  Math.sin(
    clock.elapsedTime * 3
  ) *
    1.2;

(
  portalRef.current
    .material as THREE.MeshStandardMaterial
).emissiveIntensity = pulse;


});

return (
  <group position={position}>
    <mesh ref={portalRef}>
      <torusGeometry
        args={[1.5, 0.08, 16, 100]}
      />

      <meshStandardMaterial
        color="#66e0ff"
        emissive="#66e0ff"
        emissiveIntensity={2}
      />
    </mesh>

    <mesh>
      <sphereGeometry
        args={[1.2, 32, 32]}
      />

      <meshStandardMaterial
        color="#99ffff"
        emissive="#99ffff"
        emissiveIntensity={10}
        transparent
        opacity={0.8}
      />
    </mesh>

    <PortalParticles />
  </group>

);
}

