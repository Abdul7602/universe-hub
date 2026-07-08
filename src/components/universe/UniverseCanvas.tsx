"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import CameraRig from "./CameraRig";
import SceneManager from "./SceneManager";

export default function UniverseCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{
        position: [0, 0, 18],
        fov: 50,
      }}
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
        antialias: true,
        powerPreference: "high-performance",
      }}
      onCreated={({ scene }) => {
        scene.fog = new THREE.FogExp2("#020411", 0.0135);
      }}
    >
      <color attach="background" args={["#020411"]} />

      {/* Ambient sky bounce — cool blue above, near-black below */}
      <hemisphereLight
        color="#16244a"
        groundColor="#080614"
        intensity={0.45}
      />

      {/* Floor ambient kept low so shadows stay deep */}
      <ambientLight intensity={0.12} color="#7d8fbb" />

      {/* KEY — warm sun light emanating from the Eclipse core */}
      <pointLight
        position={[0, 0, 0]}
        intensity={5.5}
        color="#ffcf78"
        distance={45}
        decay={2}
      />

      {/* FILL — cool violet from upper camera-left, soft */}
      <pointLight
        position={[-10, 7, 10]}
        intensity={0.5}
        color="#8a5fff"
        distance={50}
        decay={2}
      />

      {/* FILL 2 — faint teal from lower camera-right */}
      <pointLight
        position={[10, -5, 8]}
        intensity={0.3}
        color="#3ec8e0"
        distance={45}
        decay={2}
      />

      {/* RIM — faint cyan backlight from deep behind the scene,
          separates silhouettes from the nebula background */}
      <directionalLight
        position={[4, 6, -18]}
        intensity={0.35}
        color="#5ee4ff"
      />

      <CameraRig />

      <SceneManager />
    </Canvas>
  );
}
