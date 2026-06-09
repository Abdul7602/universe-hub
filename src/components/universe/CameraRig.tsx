"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { useNavigationStore } from "@/stores/navigationStore";

export default function CameraRig() {
  const { camera, mouse } = useThree();

  const cameraTarget =
    useNavigationStore(
      (state) => state.cameraTarget
    );

  const targetX = useRef(0);
  const targetY = useRef(0);

  useFrame(({ clock }) => {
    if (cameraTarget) {
      const targetZ =
        cameraTarget[0] === 0 &&
        cameraTarget[1] === 0 &&
        cameraTarget[2] === 0
          ? 18
          : cameraTarget[2] + 8;

      camera.position.x +=
        (cameraTarget[0] - camera.position.x) * 0.03;

      camera.position.y +=
        (cameraTarget[1] - camera.position.y) * 0.03;

      camera.position.z +=
        (targetZ - camera.position.z) * 0.03;

      camera.lookAt(
        cameraTarget[0],
        cameraTarget[1],
        cameraTarget[2]
      );

      return;
    }

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
