"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function DNAHelix() {
const helixRef =
useRef<THREE.Group>(null);

useFrame(({ clock }) => {
if (!helixRef.current) return;


helixRef.current.rotation.y +=
  0.01;

helixRef.current.position.y =
  Math.sin(
    clock.elapsedTime * 2
  ) * 0.15;


});

return ( <group ref={helixRef}>
<mesh position={[0.35, 0.0, 0.2]}>
<sphereGeometry
args={[0.05, 16, 16]}
/> <meshBasicMaterial
       color="#66e0ff"
     /> </mesh>


  <mesh position={[-0.35, 0.2, -0.2]}>
    <sphereGeometry
      args={[0.05, 16, 16]}
    />
    <meshBasicMaterial
      color="#66e0ff"
    />
  </mesh>

  <mesh position={[0.35, 0.4, 0.2]}>
    <sphereGeometry
      args={[0.05, 16, 16]}
    />
    <meshBasicMaterial
      color="#66e0ff"
    />
  </mesh>

  <mesh position={[-0.35, 0.6, -0.2]}>
    <sphereGeometry
      args={[0.05, 16, 16]}
    />
    <meshBasicMaterial
      color="#66e0ff"
    />
  </mesh>

  <mesh position={[0.35, 0.8, 0.2]}>
    <sphereGeometry
      args={[0.05, 16, 16]}
    />
    <meshBasicMaterial
      color="#66e0ff"
    />
  </mesh>

  <mesh position={[-0.35, 1.0, -0.2]}>
    <sphereGeometry
      args={[0.05, 16, 16]}
    />
    <meshBasicMaterial
      color="#66e0ff"
    />
  </mesh>

  <mesh position={[0.35, 1.2, 0.2]}>
    <sphereGeometry
      args={[0.05, 16, 16]}
    />
    <meshBasicMaterial
      color="#66e0ff"
    />
  </mesh>

  <mesh position={[-0.35, 1.4, -0.2]}>
    <sphereGeometry
      args={[0.05, 16, 16]}
    />
    <meshBasicMaterial
      color="#66e0ff"
    />
  </mesh>

  <mesh position={[0, 0.1, 0]}>
    <boxGeometry
      args={[0.7, 0.02, 0.02]}
    />
    <meshBasicMaterial
      color="#99ffff"
    />
  </mesh>

  <mesh position={[0, 0.5, 0]}>
    <boxGeometry
      args={[0.7, 0.02, 0.02]}
    />
    <meshBasicMaterial
      color="#99ffff"
    />
  </mesh>

  <mesh position={[0, 0.9, 0]}>
    <boxGeometry
      args={[0.7, 0.02, 0.02]}
    />
    <meshBasicMaterial
      color="#99ffff"
    />
  </mesh>

  <mesh position={[0, 1.3, 0]}>
    <boxGeometry
      args={[0.7, 0.02, 0.02]}
    />
    <meshBasicMaterial
      color="#99ffff"
    />
  </mesh>
</group>


);
}
