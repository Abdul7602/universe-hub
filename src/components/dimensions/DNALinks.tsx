"use client";

import { useCareerStore } from "@/stores/careerStore";

export default function DNALinks() {
  const selectedYear =
    useCareerStore(
      (state) => state.selectedYear
    );

  const color =
    useCareerStore(
      (state) => state.selectedColor
    ) || "#66e0ff";

  const activeYears =
    selectedYear === "2022"
      ? ["bottom"]
      : selectedYear === "2023"
      ? ["bottom", "right"]
      : selectedYear === "2024"
      ? ["bottom", "right", "left"]
      : selectedYear === "2025"
      ? [
          "bottom",
          "right",
          "left",
          "top",
        ]
      : [];

  const glow = (
    side: string
  ) =>
    activeYears.includes(side);

  return (
    <>
      <style>
        {`
          @keyframes neuralFlow {
            0% {
              opacity: 0.3;
            }

            50% {
              opacity: 1;
            }

            100% {
              opacity: 0.3;
            }
          }
        `}
      </style>

      {/* TOP */}

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "130px",

          width: "2px",
          height: "120px",

          background: glow("top")
            ? color
            : "linear-gradient(#66e0ff, transparent)",

          transform:
            "translateX(-50%)",

          boxShadow: glow("top")
            ? `0 0 40px ${color}`
            : "0 0 20px #66e0ff",

          animation: glow("top")
            ? "neuralFlow 1s infinite"
            : "none",
        }}
      />

      {/* LEFT */}

      <div
        style={{
          position: "absolute",
          left: "350px",
          top: "350px",

          width: "220px",
          height: "2px",

          background: glow("left")
            ? color
            : "linear-gradient(to right, #66e0ff, transparent)",

          boxShadow: glow("left")
            ? `0 0 40px ${color}`
            : "0 0 20px #66e0ff",

          animation: glow("left")
            ? "neuralFlow 1s infinite"
            : "none",
        }}
      />

      {/* RIGHT */}

      <div
        style={{
          position: "absolute",
          right: "350px",
          top: "350px",

          width: "220px",
          height: "2px",

          background: glow("right")
            ? color
            : "linear-gradient(to left, #66e0ff, transparent)",

          boxShadow: glow("right")
            ? `0 0 40px ${color}`
            : "0 0 20px #66e0ff",

          animation: glow("right")
            ? "neuralFlow 1s infinite"
            : "none",
        }}
      />

      {/* BOTTOM */}

      <div
        style={{
          position: "absolute",
          left: "50%",
          bottom: "130px",

          width: "2px",
          height: "120px",

          background: glow("bottom")
            ? color
            : "linear-gradient(transparent, #66e0ff)",

          transform:
            "translateX(-50%)",

          boxShadow: glow("bottom")
            ? `0 0 40px ${color}`
            : "0 0 20px #66e0ff",

          animation: glow("bottom")
            ? "neuralFlow 1s infinite"
            : "none",
        }}
      />
    </>
  );
}