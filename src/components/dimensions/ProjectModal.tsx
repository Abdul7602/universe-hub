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

  return (
    <div
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

        padding: "40px",

        borderRadius: "24px",

        background:
          "rgba(8,12,24,0.95)",

        border: `1px solid ${project.color}`,

        boxShadow:
          `0 0 60px ${project.color}33`,

        backdropFilter:
          "blur(20px)",

        color: "white",

        zIndex: 100001,
      }}
    >
      <button
        onClick={clearProject}
        style={{
          position: "absolute",

          right: "20px",
          top: "20px",

          background:
            "none",

          border: "none",

          color: "white",

          cursor: "pointer",

          fontSize: "24px",
        }}
      >
        ×
      </button>

      <h1
        style={{
          color:
            project.color,
          marginBottom:
            "12px",
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

      <h3>
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
              style={{
                padding:
                  "6px 12px",

                border:
                  "1px solid rgba(255,255,255,0.2)",

                borderRadius:
                  "999px",
              }}
            >
              {tech}
            </span>
          )
        )}
      </div>

      <h3>
        Achievements
      </h3>

      <ul>
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
            }}
          >
            GitHub
          </a>
        )}

        {project.live && (
          <a
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
            }}
          >
            Live Demo
          </a>
        )}
      </div>
    </div>
  );
}