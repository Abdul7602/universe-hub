"use client";

import { useCareerStore } from "@/stores/careerStore";
import { careerData } from "@/data/careerData";

export default function MemoryModal() {
  const selectedYear =
    useCareerStore(
      (state) => state.selectedYear
    );

  const clearNode =
    useCareerStore(
      (state) => state.clearNode
    );

  if (!selectedYear) return null;

  const current =
    careerData[
      selectedYear as keyof typeof careerData
    ];

  return (
    <>
      <style>
        {`
          @keyframes openMemory {
            from {
              opacity: 0;
              transform:
                translate(-50%, -50%)
                scale(0.9);
            }

            to {
              opacity: 1;
              transform:
                translate(-50%, -50%)
                scale(1);
            }
          }
        `}
      </style>

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
          border:
            "1px solid rgba(102,224,255,0.3)",
          backdropFilter:
            "blur(20px)",
          boxShadow:
            "0 0 60px rgba(102,224,255,0.15)",
          animation:
            "openMemory 0.4s ease-out",
          zIndex: 100001,
          color: "white",
        }}
      >
        <button
          onClick={clearNode}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            border: "none",
            background: "none",
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
              current.color ||
              "#66e0ff",
            marginBottom: "8px",
          }}
        >
          {selectedYear}
        </h1>

        <h2
          style={{
            marginBottom: "24px",
          }}
        >
          {current.title}
        </h2>

        <p
          style={{
            opacity: 0.85,
            lineHeight: 1.8,
            marginBottom: "32px",
          }}
        >
          {current.description}
        </p>

        {current.dependsOn.length > 0 && (
          <>
            <h3
              style={{
                color:
                  current.color ||
                  "#66e0ff",
                marginBottom: "12px",
              }}
            >
              Dependency Chain
            </h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "32px",
              }}
            >
              {current.dependsOn.map(
                (dependency) => (
                  <span
                    key={dependency}
                    style={{
                      padding:
                        "6px 12px",
                      border:
                        "1px solid rgba(255,255,255,0.2)",
                      borderRadius:
                        "999px",
                      background:
                        "rgba(255,255,255,0.05)",
                      fontSize:
                        "12px",
                    }}
                  >
                    {dependency}
                  </span>
                )
              )}
            </div>
          </>
        )}

        {current.technologies && (
          <>
            <h3
              style={{
                color:
                  current.color ||
                  "#66e0ff",
                marginBottom: "12px",
              }}
            >
              Technologies
            </h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "32px",
              }}
            >
              {current.technologies.map(
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
                      background:
                        "rgba(255,255,255,0.05)",
                      fontSize:
                        "12px",
                    }}
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </>
        )}

        {current.achievements && (
          <>
            <h3
              style={{
                color:
                  current.color ||
                  "#66e0ff",
                marginBottom: "12px",
              }}
            >
              Achievements
            </h3>

            <ul
              style={{
                paddingLeft: "20px",
                opacity: 0.9,
              }}
            >
              {current.achievements.map(
                (
                  achievement
                ) => (
                  <li
                    key={
                      achievement
                    }
                    style={{
                      marginBottom:
                        "10px",
                      lineHeight:
                        1.6,
                    }}
                  >
                    {achievement}
                  </li>
                )
              )}
            </ul>
          </>
        )}
      </div>
    </>
  );
}