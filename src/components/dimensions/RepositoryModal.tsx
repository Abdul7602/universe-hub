"use client";

import { useRepositoryStore } from "@/stores/repositoryStore";
import { repositoryData } from "@/data/repositoryData";

export default function RepositoryModal() {
  const selectedRepository =
    useRepositoryStore(
      (state) =>
        state.selectedRepository
    );

  const clearRepository =
    useRepositoryStore(
      (state) =>
        state.clearRepository
    );

  if (!selectedRepository)
    return null;

  const repository =
    repositoryData[
      selectedRepository as keyof typeof repositoryData
    ];

  return (
    <>
      <style>
        {`
          @keyframes ghmEnter {
            from {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes ghmBeam {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }

          .ghm-panel {
            animation: ghmEnter 0.35s cubic-bezier(0.2, 0.8, 0.3, 1);
          }

          .ghm-close {
            transition: color 0.25s ease, text-shadow 0.25s ease;
          }

          .ghm-close:hover {
            color: #ffffff;
            text-shadow: 0 0 12px rgba(255,255,255,0.8);
          }

          .ghm-cta {
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }

          .ghm-cta:hover {
            transform: translateY(-2px);
          }

          .ghm-corner {
            position: absolute;
            width: 14px;
            height: 14px;
            border-style: solid;
            opacity: 0.9;
          }

          .ghm-corner.tl { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
          .ghm-corner.tr { top: -1px; right: -1px; border-width: 1px 1px 0 0; }
          .ghm-corner.bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
          .ghm-corner.br { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

          @media (prefers-reduced-motion: reduce) {
            .ghm-panel { animation: none; }
          }
        `}
      </style>

      <div
        className="ghm-panel"
        style={{
          position: "fixed",

          left: "50%",
          top: "50%",

          transform:
            "translate(-50%, -50%)",

          width: "700px",
          maxWidth: "90vw",

          maxHeight: "80vh",
          overflowY: "auto",

          padding: "44px 40px 40px",

          borderRadius: "10px",

          background:
            "linear-gradient(170deg, rgba(6,14,24,0.96), rgba(3,8,14,0.97))",

          border: `1px solid ${repository.color}66`,

          boxShadow:
            `0 0 70px -12px ${repository.color}55, 0 24px 60px -24px rgba(0,0,0,0.9)`,

          backdropFilter:
            "blur(20px)",

          color: "white",

          zIndex: 100001,
        }}
      >
        {/* Corner brackets */}
        <span
          className="ghm-corner tl"
          style={{ borderColor: repository.color }}
        />
        <span
          className="ghm-corner tr"
          style={{ borderColor: repository.color }}
        />
        <span
          className="ghm-corner bl"
          style={{ borderColor: repository.color }}
        />
        <span
          className="ghm-corner br"
          style={{ borderColor: repository.color }}
        />

        {/* Top edge beam */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${repository.color}, transparent)`,
            animation: "ghmBeam 4s ease-in-out infinite",
          }}
        />

        {/* Scanline texture — very faint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            borderRadius: "10px",
            background:
              "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 4px)",
          }}
        />

        <button
          className="ghm-close"
          onClick={
            clearRepository
          }
          style={{
            position:
              "absolute",

            right: "20px",
            top: "20px",

            border: "none",

            background:
              "none",

            color: "rgba(255,255,255,0.6)",

            fontSize: "24px",

            cursor: "pointer",
          }}
        >
          ×
        </button>

        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: `${repository.color}bb`,
            marginBottom: "10px",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          Repository Record
        </p>

        <h1
          style={{
            color:
              repository.color,
            letterSpacing: "0.04em",
            textShadow: `0 0 18px ${repository.color}55`,
          }}
        >
          {repository.title}
        </h1>

        <p
          style={{
            marginTop: "16px",
            lineHeight: 1.8,
            opacity: 0.85,
          }}
        >
          {
            repository.description
          }
        </p>

        <h3
          style={{
            marginTop: "24px",
            fontSize: "13px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            opacity: 0.75,
          }}
        >
          Languages
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "12px",
          }}
        >
          {repository.languages.map(
            (language) => (
              <span
                key={language}
                style={{
                  padding:
                    "6px 12px",

                  border:
                    `1px solid ${repository.color}44`,

                  background: `${repository.color}12`,

                  borderRadius:
                    "999px",

                  fontSize: "13px",

                  color: "rgba(255,255,255,0.9)",
                }}
              >
                {language}
              </span>
            )
          )}
        </div>

        <div
          style={{
            marginTop: "24px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: 0.9,
          }}
        >
          <span style={{ color: repository.color }}>⭐</span>
          Stars:
          {" "}
          {repository.stars}
        </div>

        <a
          className="ghm-cta"
          href={
            repository.github
          }
          target="_blank"
          rel="noreferrer"
          style={{
            display:
              "inline-block",

            marginTop: "24px",

            padding:
              "10px 16px",

            background:
              repository.color,

            color: "#000",

            borderRadius:
              "8px",

            textDecoration:
              "none",

            fontWeight: 600,

            boxShadow: `0 0 26px -8px ${repository.color}`,
          }}
        >
          Open Repository
        </a>
      </div>
    </>
  );
}
