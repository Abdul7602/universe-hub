"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function PortalParticles() {
const groupRef =
useRef<THREE.Group>(null);

useFrame(() => {
if (!groupRef.current) return;


groupRef.current.rotation.z += 0.01;


});

return ( <group ref={groupRef}>
<mesh position={[2, 0, 0]}>
<sphereGeometry
args={[0.05, 16, 16]}
/> <meshBasicMaterial
       color="#99ffff"
     /> </mesh>


  <mesh position={[-2, 0, 0]}>
    <sphereGeometry
      args={[0.05, 16, 16]}
    />
    <meshBasicMaterial
      color="#99ffff"
    />
  </mesh>

  <mesh position={[0, 2, 0]}>
    <sphereGeometry
      args={[0.05, 16, 16]}
    />
    <meshBasicMaterial
      color="#99ffff"
    />
  </mesh>

  <mesh position={[0, -2, 0]}>
    <sphereGeometry
      args={[0.05, 16, 16]}
    />
    <meshBasicMaterial
      color="#99ffff"
    />
  </mesh>
</group>


);
}
