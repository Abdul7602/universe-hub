"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";

export default function CameraRig() {
  const { camera, mouse } = useThree();

  const targetX = useRef(0);
  const targetY = useRef(0);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    targetX.current =
      Math.sin(t * 0.08) * 0.8 +
      mouse.x * 1.2;

    targetY.current =
      Math.cos(t * 0.06) * 0.5 +
      mouse.y * 0.8;

    camera.position.x +=
      (targetX.current - camera.position.x) * 0.03;

    camera.position.y +=
      (targetY.current - camera.position.y) * 0.03;

    camera.lookAt(0, 0, 0);
  });

  return null;
}
