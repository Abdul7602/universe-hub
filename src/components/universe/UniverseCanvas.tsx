"use client";

import { Canvas } from "@react-three/fiber";

import CameraRig from "./CameraRig";
import SceneManager from "./SceneManager";

export default function UniverseCanvas() {
  return (
    <Canvas
      camera={{
        position: [0, 0, 18],
        fov: 50,
      }}
    >
      <color attach="background" args={["#010204"]} />

      <ambientLight intensity={0.4} />

      <pointLight
        position={[0, 0, 0]}
        intensity={5}
      />

      <CameraRig />

      <SceneManager />
    </Canvas>
  );
}
