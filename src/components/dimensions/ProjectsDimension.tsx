"use client";

import { useNavigationStore } from "@/stores/navigationStore";
import { useProjectStore } from "@/stores/projectStore";

import ProjectNode from "./ProjectNode";
import ProjectOrbit from "./ProjectOrbit";
import ProjectModal from "./ProjectModal";
import MemoryBackdrop from "./MemoryBackdrop";

export default function ProjectsDimension() {
  const resetUniverse =
    useNavigationStore(
      (state) => state.resetUniverse
    );

  const selectedProject =
    useProjectStore(
      (state) => state.selectedProject
    );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "radial-gradient(circle at center, #0f172a, #020617)",
        color: "white",
        zIndex: 99999,
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => resetUniverse()}
        style={{
          position: "fixed",
          top: "24px",
          left: "24px",
          padding: "12px 18px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 100000,
        }}
      >
        Return To Universe
      </button>

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            marginBottom: "12px",
          }}
        >
          Projects Dimension
        </h1>

        <p
          style={{
            opacity: 0.8,
            marginBottom: "40px",
          }}
        >
          Interactive Project Galaxy
        </p>

        <div
          style={{
            position: "relative",
            width: "900px",
            height: "900px",
            maxWidth: "95vw",
            maxHeight: "75vh",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              transform:
                "translate(-50%, -50%)",
              background:
                "radial-gradient(circle, #66e0ff, #0ea5e9)",
              boxShadow:
                "0 0 60px rgba(102,224,255,0.5)",
            }}
          />

          {selectedProject && (
            <>
              <MemoryBackdrop />
              <ProjectModal />
            </>
          )}

          <ProjectOrbit
            radius={280}
            speed={0.0015}
            startAngle={-1.57}
          >
            <ProjectNode
              projectKey="universeHub"
            />
          </ProjectOrbit>

          <ProjectOrbit
            radius={280}
            speed={0.0015}
            startAngle={3.14}
          >
            <ProjectNode
              projectKey="clearCV"
            />
          </ProjectOrbit>

          <ProjectOrbit
            radius={280}
            speed={0.0015}
            startAngle={0}
          >
            <ProjectNode
              projectKey="schedulePlanner"
            />
          </ProjectOrbit>

          <ProjectOrbit
            radius={280}
            speed={0.0015}
            startAngle={1.57}
          >
            <ProjectNode
              projectKey="kukaRobot"
            />
          </ProjectOrbit>
        </div>
      </div>
    </div>
  );
}