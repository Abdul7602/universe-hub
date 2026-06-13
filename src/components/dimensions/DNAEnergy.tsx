"use client";

import { useCareerStore } from "@/stores/careerStore";

export default function DNAEnergy() {
  const color =
    useCareerStore(
      (state) => state.selectedColor
    ) || "#66e0ff";

  return (
    <>
      <style>
        {`
          @keyframes pulseEnergy {
            0% {
              opacity: 0.4;
              transform:
                translate(-50%, -50%)
                scale(1);
            }

            50% {
              opacity: 1;
              transform:
                translate(-50%, -50%)
                scale(1.05);
            }

            100% {
              opacity: 0.4;
              transform:
                translate(-50%, -50%)
                scale(1);
            }
          }
        `}
      </style>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",

          width: "320px",
          height: "320px",

          border:
            `2px solid ${color}`,

          borderRadius: "50%",

          transform:
            "translate(-50%, -50%)",

          animation:
            "pulseEnergy 2s infinite",

          boxShadow:
            `0 0 60px ${color}`,

          transition:
            "all 0.5s ease",
        }}
      />
    </>
  );
}