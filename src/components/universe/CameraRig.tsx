"use client";

import { useFrame } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";

export default function CameraRig() {
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    camera.position.x = Math.sin(t * 0.08) * 0.8;
    camera.position.y = Math.cos(t * 0.06) * 0.5;

    camera.lookAt(0, 0, 0);
  });

  return null;
}
