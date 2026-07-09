"use client";

import { useProjectStore } from "@/stores/projectStore";
import { projectData } from "@/data/projectData";

export default function ProjectModal() {
  const selectedProject =
    useProjectStore(
      (state) =>
        state.selectedProject
    );

  const clearProject =
    useProjectStore(
      (state) =>
        state.clearProject
    );

  if (!selectedProject)
    return null;

  const project =
    projectData[
      selectedProject as keyof typeof projectData
    ];

  const chipStyle: React.CSSProperties = {
    padding: "6px 12px",
    border: `1px solid ${project.color}44`,
    borderRadius: "999px",
    background: `${project.color}12`,
    fontSize: "13px",
    color: "rgba(255,255,255,0.9)",
  };

  const sectionHeader: React.CSSProperties = {
    fontSize: "13px",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    opacity: 0.8,
  };

  return (
    <>
      <style>
        {`
          @keyframes pjmEnter {
            from {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.96);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }

          @keyframes pjmBeam {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }

          .pjm-panel {
            animation: pjmEnter 0.35s cubic-bezier(0.2, 0.8, 0.3, 1);
          }

          .pjm-close {
            transition: color 0.25s ease, text-shadow 0.25s ease;
          }

          .pjm-close:hover {
            color: #ffffff;
            text-shadow: 0 0 12px rgba(255,255,255,0.8);
          }

          .pjm-cta {
            transition: box-shadow 0.3s ease, transform 0.3s ease;
          }

          .pjm-cta:hover {
            transform: translateY(-2px);
          }

          .pjm-corner {
            position: absolute;
            width: 14px;
            height: 14px;
            border-style: solid;
            opacity: 0.9;
          }

          .pjm-corner.tl { top: -1px; left: -1px; border-width: 1px 0 0 1px; }
          .pjm-corner.tr { top: -1px; right: -1px; border-width: 1px 1px 0 0; }
          .pjm-corner.bl { bottom: -1px; left: -1px; border-width: 0 0 1px 1px; }
          .pjm-corner.br { bottom: -1px; right: -1px; border-width: 0 1px 1px 0; }

          @media (prefers-reduced-motion: reduce) {
            .pjm-panel { animation: none !important; }
          }
        `}
      </style>

      <div
        className="pjm-panel"
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
            "linear-gradient(170deg, rgba(12,7,26,0.96), rgba(6,3,16,0.97))",

          border: `1px solid ${project.color}66`,

          boxShadow:
            `0 0 70px -12px ${project.color}55, 0 24px 60px -24px rgba(0,0,0,0.9)`,

          backdropFilter:
            "blur(20px)",

          color: "white",

          zIndex: 100001,
        }}
      >
        {/* Corner brackets */}
        <span className="pjm-corner tl" style={{ borderColor: project.color }} />
        <span className="pjm-corner tr" style={{ borderColor: project.color }} />
        <span className="pjm-corner bl" style={{ borderColor: project.color }} />
        <span className="pjm-corner br" style={{ borderColor: project.color }} />

        {/* Top edge beam */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${project.color}, transparent)`,
            animation: "pjmBeam 4s ease-in-out infinite",
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
          className="pjm-close"
          onClick={clearProject}
          style={{
            position: "absolute",

            right: "20px",
            top: "20px",

            background:
              "none",

            border: "none",

            color: "rgba(255,255,255,0.6)",

            cursor: "pointer",

            fontSize: "24px",
          }}
        >
          ×
        </button>

        <p
          style={{
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: `${project.color}bb`,
            marginBottom: "10px",
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          Project Dossier
        </p>

        <h1
          style={{
            color:
              project.color,
            marginBottom:
              "12px",
            letterSpacing: "0.04em",
            textShadow: `0 0 18px ${project.color}55`,
          }}
        >
          {project.title}
        </h1>

        <p
          style={{
            opacity: 0.85,
            lineHeight: 1.8,
            marginBottom:
              "24px",
          }}
        >
          {project.description}
        </p>

        <h3 style={sectionHeader}>
          Technologies
        </h3>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",

            marginTop: "12px",
            marginBottom:
              "24px",
          }}
        >
          {project.technologies.map(
            (tech) => (
              <span
                key={tech}
                style={chipStyle}
              >
                {tech}
              </span>
            )
          )}
        </div>

        <h3 style={sectionHeader}>
          Achievements
        </h3>

        <ul
          style={{
            paddingLeft: "20px",
            marginTop: "12px",
            opacity: 0.9,
          }}
        >
          {project.achievements.map(
            (
              achievement
            ) => (
              <li
                key={
                  achievement
                }
                style={{
                  marginBottom:
                    "8px",
                  lineHeight: 1.6,
                }}
              >
                {achievement}
              </li>
            )
          )}
        </ul>

        <div
          style={{
            display: "flex",
            gap: "12px",

            marginTop: "24px",
          }}
        >
          {project.github && (
            <a
              className="pjm-cta"
              href={
                project.github
              }
              target="_blank"
              rel="noreferrer"
              style={{
                padding:
                  "10px 16px",

                background:
                  project.color,

                color:
                  "#000",

                borderRadius:
                  "8px",

                textDecoration:
                  "none",

                fontWeight:
                  600,

                boxShadow: `0 0 26px -8px ${project.color}`,
              }}
            >
              GitHub
            </a>
          )}

          {project.live && (
            <a
              className="pjm-cta"
              href={
                project.live
              }
              target="_blank"
              rel="noreferrer"
              style={{
                padding:
                  "10px 16px",

                border: `1px solid ${project.color}`,

                borderRadius:
                  "8px",

                color:
                  "white",

                textDecoration:
                  "none",

                background: `${project.color}14`,
              }}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </>
  );
}
