"use client";

import { useCareerStore } from "@/stores/careerStore";
import { careerData } from "@/data/careerData";

type ExperienceNodeProps = {
  year: string;
  title: string;
};

export default function ExperienceNode({
  year,
  title,
}: ExperienceNodeProps) {
  const setNode =
    useCareerStore(
      (state) => state.setNode
    );

  const selectedYear =
    useCareerStore(
      (state) => state.selectedYear
    );

  const isSelected =
    selectedYear === year;

  const color =
    careerData[
      year as keyof typeof careerData
    ].color;

  return (
    <>
      <style>
        {`
          @keyframes activePulse {
            0% {
              box-shadow:
                0 0 20px rgba(102,224,255,0.4);
            }

            50% {
              box-shadow:
                0 0 50px rgba(102,224,255,0.9);
            }

            100% {
              box-shadow:
                0 0 20px rgba(102,224,255,0.4);
            }
          }

          @keyframes floatNode {
            0% {
              transform:
                translateY(0px);
            }

            50% {
              transform:
                translateY(-6px);
            }

            100% {
              transform:
                translateY(0px);
            }
          }
        `}
      </style>

      <div
        onClick={() =>
          setNode(
            year,
            title,
            color
          )
        }
        style={{
          padding: "16px",

          border: isSelected
            ? `1px solid ${color}`
            : "1px solid rgba(102,224,255,0.3)",

          borderRadius: "12px",

          background: isSelected
            ? `${color}20`
            : "rgba(255,255,255,0.03)",

          boxShadow: isSelected
            ? `0 0 35px ${color}`
            : "0 0 20px rgba(102,224,255,0.1)",

          cursor: "pointer",

          transition:
            "all 0.3s ease",

          transform: isSelected
            ? "scale(1.08)"
            : "scale(1)",

          animation: isSelected
            ? "activePulse 2s infinite, floatNode 4s ease-in-out infinite"
            : "none",
        }}
      >
        <h3
          style={{
            color: isSelected
              ? color
              : "white",

            marginBottom: "8px",
          }}
        >
          {year}
        </h3>

        <p
          style={{
            opacity: isSelected
              ? 1
              : 0.8,
          }}
        >
          {title}
        </p>
      </div>
    </>
  );
}