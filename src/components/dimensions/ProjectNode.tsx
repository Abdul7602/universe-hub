"use client";

import { useProjectStore } from "@/stores/projectStore";
import { projectData } from "@/data/projectData";

type ProjectNodeProps = {
  projectKey: string;
};

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

  return (
    <div
      onClick={() =>
        setProject(projectKey)
      }
      style={{
        padding: "16px",

        border: isSelected
          ? `1px solid ${project.color}`
          : "1px solid rgba(255,255,255,0.2)",

        borderRadius: "12px",

        background: isSelected
          ? `${project.color}20`
          : "rgba(255,255,255,0.03)",

        boxShadow: isSelected
          ? `0 0 30px ${project.color}`
          : "0 0 15px rgba(255,255,255,0.05)",

        cursor: "pointer",

        transition:
          "all 0.3s ease",

        minWidth: "220px",
      }}
    >
      <h3
        style={{
          color: project.color,
          marginBottom: "8px",
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          opacity: 0.8,
        }}
      >
        {project.description}
      </p>
    </div>
  );
}