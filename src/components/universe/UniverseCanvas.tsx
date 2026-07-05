"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import CameraRig from "./CameraRig";
import SceneManager from "./SceneManager";

export default function UniverseCanvas() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 18],
        fov: 50,
      }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
        antialias: true,
      }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2("#01030a", 0.012);
      }}
    >
      <color attach="background" args={["#01030a"]} />

      <hemisphereLight
        color="#1a2848"
        groundColor="#0c0818"
        intensity={0.55}
      />

      <ambientLight intensity={0.18} color="#8899bb" />

      <pointLight
        position={[0, 0, 0]}
        intensity={4.5}
        color="#ffd080"
        distance={40}
        decay={2}
      />

      <pointLight
        position={[-8, 6, 12]}
        intensity={0.6}
        color="#5ee4ff"
        distance={50}
        decay={2}
      />

      <pointLight
        position={[10, -4, 8]}
        intensity={0.35}
        color="#8a5fff"
        distance={45}
        decay={2}
      />

      <CameraRig />

      <SceneManager />
    </Canvas>
  );
}
