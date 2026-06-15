"use client";

import { useCareerStore } from "@/stores/careerStore";
import { careerData } from "@/data/careerData";

const nodePositions = {
  "2025": { x: 0, y: -280 },
  "2024": { x: -280, y: 0 },
  "2023": { x: 280, y: 0 },
  "2022": { x: 0, y: 280 },
};

export default function DependencyGraph() {
  const selectedYear =
    useCareerStore(
      (state) => state.selectedYear
    );

  const color =
    useCareerStore(
      (state) => state.selectedColor
    ) || "#66e0ff";

  if (!selectedYear) return null;

  const current =
    careerData[
      selectedYear as keyof typeof careerData
    ];

  return (
    <>
      {current.dependsOn.map(
        (dependency) => {
          const from =
            nodePositions[
              selectedYear as keyof typeof nodePositions
            ];

          const to =
            nodePositions[
              dependency as keyof typeof nodePositions
            ];

          const dx =
            to.x - from.x;

          const dy =
            to.y - from.y;

          const length =
            Math.sqrt(
              dx * dx +
                dy * dy
            );

          const angle =
            Math.atan2(
              dy,
              dx
            ) *
            (180 / Math.PI);

          return (
            <div
              key={
                selectedYear +
                dependency
              }
              style={{
                position:
                  "absolute",

                left: "50%",
                top: "50%",

                width:
                  `${length}px`,

                height: "2px",

                background:
                  color,

                boxShadow:
                  `0 0 20px ${color}`,

                transform:
                  `
                  translate(
                    ${from.x}px,
                    ${from.y}px
                  )
                  rotate(${angle}deg)
                `,

                transformOrigin:
                  "0 0",

                zIndex: 12,
              }}
            />
          );
        }
      )}
    </>
  );
}