"use client";

import { useProjectStore } from "@/stores/projectStore";
import { projectData } from "@/data/projectData";
import type { CSSProperties } from "react";

type ProjectNodeProps = {
  projectKey: string;
};

/** Deterministic per-node phase so idle floats desynchronize. */
function phaseFor(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 97;
  return (h / 97) * 5;
}

export default function ProjectNode({
  projectKey,
}: ProjectNodeProps) {
  const setProject =
    useProjectStore(
      (state) => state.setProject
    );

  const selectedProject =
    useProjectStore(
      (state) => state.selectedProject
    );

  const project =
    projectData[
      projectKey as keyof typeof projectData
    ];

  if (!project) return null;

  const isSelected =
    selectedProject === projectKey;

  const delay = phaseFor(projectKey);

  return (
    <>
      <style>
        {`
          @keyframes pjnFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }

          @keyframes pjnChipSpin {
            0%, 100% { transform: rotate(45deg) scale(1); }
            50% { transform: rotate(45deg) scale(1.12); }
          }

          @keyframes pjnSelected {
            0%, 100% { box-shadow: 0 0 24px -4px var(--pc); }
            50% { box-shadow: 0 0 44px -2px var(--pc); }
          }

          .pjn-node {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            animation: pjnFloat 7s ease-in-out infinite;
          }

          .pjn-chip {
            width: 16px;
            height: 16px;
            background: linear-gradient(135deg, rgba(255,255,255,0.9), var(--pc) 60%);
            box-shadow: 0 0 14px -2px var(--pc);
            animation: pjnChipSpin 5s ease-in-out infinite;
          }

          .pjn-plate {
            position: relative;
            min-width: 220px;
            padding: 14px 18px;
            background: rgba(10, 6, 26, 0.74);
            backdrop-filter: blur(6px);
            clip-path: polygon(
              10px 0, 100% 0, 100% calc(100% - 10px),
              calc(100% - 10px) 100%, 0 100%, 0 10px
            );
            transition:
              transform 0.3s ease,
              box-shadow 0.3s ease,
              border-color 0.3s ease,
              background 0.3s ease;
          }

          .pjn-node:hover .pjn-plate {
            transform: translateY(-3px);
            box-shadow: 0 0 26px -8px var(--pc);
          }

          .pjn-node:hover .pjn-chip {
            box-shadow: 0 0 22px 0px var(--pc);
          }

          .pjn-selected .pjn-plate {
            animation: pjnSelected 3s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .pjn-node,
            .pjn-chip,
            .pjn-selected .pjn-plate {
              animation: none !important;
            }
          }
        `}
      </style>

      <div
        className={`pjn-node${isSelected ? " pjn-selected" : ""}`}
        onClick={() =>
          setProject(projectKey)
        }
        style={
          {
            "--pc": project.color,
            animationDelay: `-${delay}s`,
          } as CSSProperties
        }
      >
        {/* Module chip marker */}
        <div className="pjn-chip" />

        {/* Chamfered engineering plate */}
        <div
          className="pjn-plate"
          style={{
            border: isSelected
              ? `1px solid ${project.color}`
              : `1px solid ${project.color}40`,
            background: isSelected
              ? `linear-gradient(160deg, ${project.color}1e, rgba(10,6,26,0.82))`
              : undefined,
            boxShadow: isSelected
              ? `0 0 34px -6px ${project.color}`
              : "0 0 14px rgba(0,0,0,0.5)",
          }}
        >
          <h3
            style={{
              color: project.color,
              marginBottom: "8px",
              fontSize: "15px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textShadow: `0 0 12px ${project.color}66`,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              opacity: 0.72,
              fontSize: "13px",
              lineHeight: 1.55,
            }}
          >
            {project.description}
          </p>
        </div>
      </div>
    </>
  );
}
