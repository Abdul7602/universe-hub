"use client";

import { useRepositoryStore } from "@/stores/repositoryStore";
import { repositoryData } from "@/data/repositoryData";
import type { CSSProperties } from "react";

type RepositoryNodeProps = {
  repositoryKey: string;
};

/** Deterministic per-node phase offset so idle floats desynchronize. */
function phaseFor(key: string): number {
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) % 97;
  return (h / 97) * 5;
}

export default function RepositoryNode({
  repositoryKey,
}: RepositoryNodeProps) {
  const setRepository =
    useRepositoryStore(
      (state) =>
        state.setRepository
    );

  const selectedRepository =
    useRepositoryStore(
      (state) =>
        state.selectedRepository
    );

  const repository =
    repositoryData[
      repositoryKey as keyof typeof repositoryData
    ];

  if (!repository) return null;

  const isSelected =
    selectedRepository ===
    repositoryKey;

  const delay = phaseFor(repositoryKey);

  return (
    <>
      <style>
        {`
          @keyframes ghnFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-6px); }
          }

          @keyframes ghnOrbPulse {
            0%, 100% { opacity: 0.85; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.12); }
          }

          @keyframes ghnHalo {
            0%, 100% { opacity: 0.35; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(1.25); }
          }

          .ghn-node {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            animation: ghnFloat 7s ease-in-out infinite;
          }

          .ghn-orb-wrap {
            position: relative;
            width: 34px;
            height: 34px;
          }

          .ghn-orb {
            position: absolute;
            inset: 0;
            border-radius: 50%;
            background: radial-gradient(
              circle at 35% 32%,
              rgba(255,255,255,0.95),
              var(--rc) 45%,
              rgba(0,0,0,0) 72%
            );
            box-shadow: 0 0 16px -2px var(--rc);
            animation: ghnOrbPulse 4s ease-in-out infinite;
          }

          .ghn-halo {
            position: absolute;
            inset: -10px;
            border-radius: 50%;
            border: 1px solid var(--rc);
            opacity: 0;
          }

          .ghn-selected .ghn-halo {
            animation: ghnHalo 3s ease-in-out infinite;
          }

          .ghn-plate {
            position: relative;
            min-width: 220px;
            padding: 14px 18px;
            border-radius: 6px;
            background: rgba(4, 12, 20, 0.72);
            backdrop-filter: blur(6px);
            transition:
              transform 0.3s ease,
              box-shadow 0.3s ease,
              border-color 0.3s ease,
              background 0.3s ease;
          }

          .ghn-node:hover .ghn-plate {
            transform: translateY(-3px);
            box-shadow: 0 0 26px -8px var(--rc);
          }

          .ghn-node:hover .ghn-orb {
            box-shadow: 0 0 24px 0px var(--rc);
          }

          .ghn-corner {
            position: absolute;
            width: 9px;
            height: 9px;
            border-color: var(--rc);
            border-style: solid;
            opacity: 0.8;
          }

          .ghn-corner.tl { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
          .ghn-corner.tr { top: -1px; right: -1px; border-width: 1px 1px 0 0; }
          .ghn-corner.bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
          .ghn-corner.br { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

          @media (prefers-reduced-motion: reduce) {
            .ghn-node,
            .ghn-orb,
            .ghn-halo {
              animation: none;
            }
          }
        `}
      </style>

      <div
        className={`ghn-node${isSelected ? " ghn-selected" : ""}`}
        onClick={() =>
          setRepository(
            repositoryKey
          )
        }
        style={
          {
            "--rc": repository.color,
            animationDelay: `-${delay}s`,
          } as CSSProperties
        }
      >
        {/* Satellite orb */}
        <div className="ghn-orb-wrap">
          <div className="ghn-halo" />
          <div className="ghn-orb" />
        </div>

        {/* Holographic data plate */}
        <div
          className="ghn-plate"
          style={{
            border: isSelected
              ? `1px solid ${repository.color}`
              : `1px solid ${repository.color}40`,
            background: isSelected
              ? `linear-gradient(160deg, ${repository.color}1e, rgba(4,12,20,0.8))`
              : undefined,
            boxShadow: isSelected
              ? `0 0 34px -6px ${repository.color}`
              : `0 0 14px rgba(0,0,0,0.5)`,
          }}
        >
          <span className="ghn-corner tl" />
          <span className="ghn-corner tr" />
          <span className="ghn-corner bl" />
          <span className="ghn-corner br" />

          <h3
            style={{
              color: repository.color,
              marginBottom: "8px",
              fontSize: "15px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textShadow: `0 0 12px ${repository.color}66`,
            }}
          >
            {repository.title}
          </h3>

          <p
            style={{
              opacity: 0.72,
              fontSize: "13px",
              lineHeight: 1.55,
            }}
          >
            {
              repository.description
            }
          </p>
        </div>
      </div>
    </>
  );
}
