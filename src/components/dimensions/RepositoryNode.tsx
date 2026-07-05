"use client";

import { useRepositoryStore } from "@/stores/repositoryStore";
import { repositoryData } from "@/data/repositoryData";

type RepositoryNodeProps = {
  repositoryKey: string;
};

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

  return (
    <div
      onClick={() =>
        setRepository(
          repositoryKey
        )
      }
      style={{
        padding: "16px",
        minWidth: "220px",
        cursor: "pointer",

        borderRadius: "12px",

        border: isSelected
          ? `1px solid ${repository.color}`
          : "1px solid rgba(255,255,255,0.2)",

        background: isSelected
          ? `${repository.color}20`
          : "rgba(255,255,255,0.03)",

        boxShadow: isSelected
          ? `0 0 30px ${repository.color}`
          : "0 0 15px rgba(255,255,255,0.05)",

        transition:
          "all 0.3s ease",
      }}
    >
      <h3
        style={{
          color:
            repository.color,
          marginBottom:
            "8px",
        }}
      >
        {repository.title}
      </h3>

      <p
        style={{
          opacity: 0.8,
        }}
      >
        {
          repository.description
        }
      </p>
    </div>
  );
}