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

        border: `1px solid ${repository.color}`,

        boxShadow:
          `0 0 60px ${repository.color}33`,

        backdropFilter:
          "blur(20px)",

        color: "white",

        zIndex: 100001,
      }}
    >
      <button
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

          color: "white",

          fontSize: "24px",

          cursor: "pointer",
        }}
      >
        ×
      </button>

      <h1
        style={{
          color:
            repository.color,
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
                  "1px solid rgba(255,255,255,0.2)",

                borderRadius:
                  "999px",
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
        }}
      >
        ⭐ Stars:
        {" "}
        {repository.stars}
      </div>

      <a
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
        }}
      >
        Open Repository
      </a>
    </div>
  );
}