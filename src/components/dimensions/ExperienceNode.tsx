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

  const activeMemoryChain =
    useCareerStore(
      (state) =>
        state.activeMemoryChain
    );

  const color =
    careerData[
      year as keyof typeof careerData
    ].color;

  const isSelected =
    selectedYear === year;

  const isChainActive =
    activeMemoryChain.includes(
      year
    );

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

          @keyframes chainGlow {
            0% {
              opacity: 0.5;
            }

            50% {
              opacity: 1;
            }

            100% {
              opacity: 0.5;
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

          border:
            isSelected
              ? `1px solid ${color}`
              : isChainActive
              ? `1px solid ${color}`
              : "1px solid rgba(102,224,255,0.3)",

          borderRadius: "12px",

          background:
            isSelected
              ? `${color}20`
              : isChainActive
              ? `${color}15`
              : "rgba(255,255,255,0.03)",

          boxShadow:
            isSelected
              ? `0 0 35px ${color}`
              : isChainActive
              ? `0 0 25px ${color}`
              : "0 0 20px rgba(102,224,255,0.1)",

          cursor: "pointer",

          transition:
            "all 0.3s ease",

          transform:
            isSelected
              ? "scale(1.08)"
              : isChainActive
              ? "scale(1.04)"
              : "scale(1)",

          animation:
            isSelected
              ? "activePulse 2s infinite, floatNode 4s ease-in-out infinite"
              : isChainActive
              ? "chainGlow 1.5s infinite"
              : "none",
        }}
      >
        <h3
          style={{
            color:
              isSelected ||
              isChainActive
                ? color
                : "white",

            marginBottom: "8px",
          }}
        >
          {year}
        </h3>

        <p
          style={{
            opacity:
              isSelected ||
              isChainActive
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