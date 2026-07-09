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
            0%, 100% {
              box-shadow:
                0 0 22px -4px rgba(102,224,255,0.45);
            }

            50% {
              box-shadow:
                0 0 42px -2px rgba(102,224,255,0.8);
            }
          }

          @keyframes chainGlow {
            0%, 100% {
              opacity: 0.6;
            }

            50% {
              opacity: 1;
            }
          }

          @keyframes floatNode {
            0%, 100% {
              transform:
                translateY(0px);
            }

            50% {
              transform:
                translateY(-5px);
            }
          }

          .cxn-node:hover {
            box-shadow: 0 0 26px -6px var(--nc) !important;
            border-color: var(--nc) !important;
          }

          @media (prefers-reduced-motion: reduce) {
            .cxn-node {
              animation: none !important;
            }
          }
        `}
      </style>

      <div
        className="cxn-node"
        onClick={() =>
          setNode(
            year,
            title,
            color
          )
        }
        style={{
          "--nc": color,

          position: "relative",

          padding: "14px 16px 14px 20px",

          minWidth: "190px",

          border:
            isSelected
              ? `1px solid ${color}`
              : isChainActive
              ? `1px solid ${color}aa`
              : "1px solid rgba(102,224,255,0.22)",

          borderRadius: "8px",

          background:
            isSelected
              ? `linear-gradient(160deg, ${color}1e, rgba(5,12,26,0.85))`
              : isChainActive
              ? `linear-gradient(160deg, ${color}12, rgba(5,12,26,0.82))`
              : "rgba(5,12,26,0.72)",

          backdropFilter: "blur(6px)",

          boxShadow:
            isSelected
              ? `0 0 34px -4px ${color}`
              : isChainActive
              ? `0 0 24px -6px ${color}`
              : "0 0 16px rgba(0,0,0,0.5)",

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
              ? "activePulse 3s ease-in-out infinite, floatNode 6s ease-in-out infinite"
              : isChainActive
              ? "chainGlow 2.4s ease-in-out infinite"
              : "floatNode 7s ease-in-out infinite",
        } as React.CSSProperties}
      >
        {/* Accent bar — knowledge-stream marker */}
        <span
          style={{
            position: "absolute",
            left: 0,
            top: "10px",
            bottom: "10px",
            width: "2px",
            borderRadius: "2px",
            background: `linear-gradient(${color}, transparent)`,
            boxShadow:
              isSelected || isChainActive
                ? `0 0 10px ${color}`
                : "none",
          }}
        />

        <h3
          style={{
            color:
              isSelected ||
              isChainActive
                ? color
                : "#e6f6ff",

            marginBottom: "6px",

            fontSize: "20px",

            letterSpacing: "0.08em",

            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",

            textShadow:
              isSelected || isChainActive
                ? `0 0 14px ${color}88`
                : "none",
          }}
        >
          {year}
        </h3>

        <p
          style={{
            opacity:
              isSelected ||
              isChainActive
                ? 0.95
                : 0.7,

            fontSize: "13px",

            lineHeight: 1.5,
          }}
        >
          {title}
        </p>
      </div>
    </>
  );
}
