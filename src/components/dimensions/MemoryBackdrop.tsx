"use client";

import { useCareerStore } from "@/stores/careerStore";

export default function MemoryBackdrop() {
  const color =
    useCareerStore(
      (state) => state.selectedColor
    ) || "#66e0ff";

  return (
    <>
      <style>
        {`
          @keyframes fadeBackdrop {
            from {
              opacity: 0;
            }

            to {
              opacity: 1;
            }
          }

          @keyframes memoryField {
            0% {
              opacity: 0.3;
            }

            50% {
              opacity: 0.7;
            }

            100% {
              opacity: 0.3;
            }
          }
        `}
      </style>

      <div
        style={{
          position: "fixed",
          inset: 0,

          background:
            `radial-gradient(
              circle at center,
              ${color}15,
              rgba(0,0,0,0.75)
            )`,

          backdropFilter:
            "blur(10px)",

          animation:
            "fadeBackdrop 0.3s ease-out",

          zIndex: 99998,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,

            background:
              `radial-gradient(
                circle,
                transparent 20%,
                ${color}08 100%
              )`,

            animation:
              "memoryField 3s infinite",
          }}
        />
      </div>
    </>
  );
}