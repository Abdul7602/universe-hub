"use client";

import { useEffect, useState } from "react";

import { useCareerStore } from "@/stores/careerStore";

export default function MemoryPulse() {
  const pulseTrigger =
    useCareerStore(
      (state) => state.pulseTrigger
    );

  const color =
    useCareerStore(
      (state) => state.selectedColor
    ) || "#66e0ff";

  const [visible, setVisible] =
    useState(false);

  useEffect(() => {
    if (!pulseTrigger) return;

    setVisible(true);

    const timeout =
      setTimeout(() => {
        setVisible(false);
      }, 900);

    return () =>
      clearTimeout(timeout);
  }, [pulseTrigger]);

  if (!visible) return null;

  return (
    <>
      <style>
        {`
          @keyframes memoryBeam {
            0% {
              opacity: 0;
              transform:
                translate(-50%, -50%)
                scaleY(0);
            }

            30% {
              opacity: 1;
            }

            100% {
              opacity: 0;
              transform:
                translate(-50%, -50%)
                scaleY(1);
            }
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",

          left: "50%",
          top: "50%",

          width: "6px",
          height: "320px",

          background:
            `linear-gradient(
              transparent,
              ${color},
              transparent
            )`,

          transform:
            "translate(-50%, -50%)",

          boxShadow:
            `0 0 30px ${color}`,

          animation:
            "memoryBeam 0.9s ease-out",

          zIndex: 15,
        }}
      />
    </>
  );
}